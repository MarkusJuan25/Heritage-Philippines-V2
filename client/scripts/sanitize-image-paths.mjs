#!/usr/bin/env node
/**
 * sanitize-image-paths.mjs
 *
 * Renames image files whose paths contain whitespace or non-safe characters
 * to lowercase ASCII kebab-case, then updates /images/... URL references in
 * source files under client/src, client/index.html, and public text files
 * (outside client/public/images).
 *
 * Usage:
 *   node client/scripts/sanitize-image-paths.mjs          # dry-run (default)
 *   node client/scripts/sanitize-image-paths.mjs --apply  # rename + patch refs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const APPLY = process.argv.includes("--apply");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CLIENT_DIR = path.resolve(__dirname, "..");
const IMAGES_DIR = path.resolve(CLIENT_DIR, "public", "images");

// Extensions of image files we may rename
const IMAGE_EXTS = new Set([
  ".jpg", ".jpeg", ".png", ".gif", ".webp", ".avif",
  ".svg", ".ico", ".mp4", ".webm", ".mov",
]);

// Extensions of source files we scan for URL references
const SOURCE_EXTS = new Set([
  ".js", ".jsx", ".ts", ".tsx", ".css", ".html", ".json", ".md",
]);

// Directory trees excluded from source scanning
const SCAN_EXCLUDE_DIRS = new Set([
  path.resolve(CLIENT_DIR, "dist"),
  path.resolve(CLIENT_DIR, "node_modules"),
  IMAGES_DIR,
]);

// Roots for source reference scanning (files and directories)
const SCAN_ROOTS = [
  path.resolve(CLIENT_DIR, "src"),
  path.resolve(CLIENT_DIR, "index.html"),
  path.resolve(CLIENT_DIR, "public"), // text files outside images
];

// ---------------------------------------------------------------------------
// Slug conversion
// ---------------------------------------------------------------------------

/**
 * Convert a single path segment (not including the final file extension)
 * to safe lowercase kebab-case.
 *
 * Conversion order:
 *  1. & → "and"
 *  2. Apostrophes removed entirely.
 *  3. Anything that is not an ASCII letter, digit, dot, or hyphen
 *     (including underscores, spaces, Unicode dashes, commas, parens, etc.)
 *     becomes a hyphen.
 *  4. Lowercase.
 *  5. Collapse consecutive hyphens.
 *  6. Strip leading/trailing hyphens.
 *
 * Dots are preserved so that stems like "poster.jpg" inside a ".mp4"
 * filename survive correctly.
 */
function toKebab(raw) {
  return raw
    .replace(/&/g, "and")
    .replace(/[''ʼ`]/g, "")                // apostrophe variants → nothing
    .replace(/[^a-zA-Z0-9.-]/g, "-")        // underscore, space, Unicode, punct → hyphen
    .toLowerCase()
    .replace(/-+/g, "-")                    // collapse repeated hyphens
    .replace(/^-+|-+$/g, "");               // trim leading/trailing hyphens
}

/** Return true if a segment is already fully safe (lowercase kebab). */
function isSafe(segment) {
  return /^[a-z0-9.-]+$/.test(segment);
}

/** Build the safe relative path for an image's relative path from IMAGES_DIR. */
function safifyRelPath(relPath) {
  const parts = relPath.split(/[\\/]/);
  return parts
    .map((part, i) => {
      const isLast = i === parts.length - 1;
      if (isLast) {
        // Keep extension, kebab-ify stem
        const dotIdx = part.lastIndexOf(".");
        if (dotIdx === -1) return toKebab(part);
        const stem = part.slice(0, dotIdx);
        const ext = part.slice(dotIdx).toLowerCase();
        return toKebab(stem) + ext;
      }
      return toKebab(part);
    })
    .join("/");
}

/** Return true if the relative path needs any renaming. */
function needsRename(relPath) {
  const safe = safifyRelPath(relPath);
  // case-insensitive comparison because some hosts are case-insensitive
  return safe.toLowerCase() !== relPath.toLowerCase() || safe !== relPath;
}

// ---------------------------------------------------------------------------
// File collection
// ---------------------------------------------------------------------------

/** Collect all image files recursively under dir. Returns absolute paths. */
function collectImages(dir) {
  const results = [];
  function walk(current) {
    let entries;
    try {
      entries = fs.readdirSync(current, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (IMAGE_EXTS.has(ext)) results.push(full);
      }
    }
  }
  walk(dir);
  return results;
}

/** Collect source files to scan for URL references. */
function collectSourceFiles(roots) {
  const results = [];
  function walk(current) {
    // Skip excluded trees
    if (SCAN_EXCLUDE_DIRS.has(current)) return;

    let stat;
    try {
      stat = fs.statSync(current);
    } catch {
      return;
    }

    if (stat.isFile()) {
      const ext = path.extname(current).toLowerCase();
      if (SOURCE_EXTS.has(ext)) results.push(current);
      return;
    }

    if (stat.isDirectory()) {
      let entries;
      try {
        entries = fs.readdirSync(current, { withFileTypes: true });
      } catch {
        return;
      }
      for (const entry of entries) {
        const full = path.join(current, entry.name);
        if (SCAN_EXCLUDE_DIRS.has(full)) continue;
        walk(full);
      }
    }
  }
  for (const root of roots) walk(root);
  return results;
}

// ---------------------------------------------------------------------------
// Post-conversion validation
// ---------------------------------------------------------------------------

/**
 * Verify that every generated destination URL is genuinely safe.
 * Returns an array of human-readable failure descriptions, empty if all pass.
 */
function validateNewPaths(renameMap) {
  const failures = [];
  for (const { newUrl } of renameMap) {
    // Strip "/images/" prefix and check each path segment
    const rel = newUrl.slice("/images/".length);
    const parts = rel.split("/");
    for (const part of parts) {
      if (/_/.test(part))
        failures.push(`  underscore still present: ${newUrl}`);
      if (/\s/.test(part))
        failures.push(`  whitespace still present: ${newUrl}`);
      if (/[A-Z]/.test(part))
        failures.push(`  uppercase letter still present: ${newUrl}`);
      if (/[^\x00-\x7F]/.test(part))
        failures.push(`  non-ASCII character still present: ${newUrl}`);
      if (/--/.test(part))
        failures.push(`  repeated hyphen still present: ${newUrl}`);
    }
  }
  return failures;
}

// ---------------------------------------------------------------------------
// Build rename map
// ---------------------------------------------------------------------------

function buildRenameMap() {
  const allImages = collectImages(IMAGES_DIR);
  const renameMap = []; // [{oldAbs, newAbs, oldUrl, newUrl}]
  const collisions = []; // [{oldUrl, newUrl, conflictingOld}]

  // Map from lower-cased target absolute path → original source (for collision detection)
  const targetsSeen = new Map();

  for (const oldAbs of allImages) {
    const relFromImages = path.relative(IMAGES_DIR, oldAbs).replace(/\\/g, "/");
    if (!needsRename(relFromImages)) continue;

    const safeRel = safifyRelPath(relFromImages);
    const newAbs = path.join(IMAGES_DIR, safeRel.split("/").join(path.sep));

    const oldUrl = "/images/" + relFromImages;
    const newUrl = "/images/" + safeRel;

    // Collision check (case-insensitive)
    const targetKey = newAbs.toLowerCase();
    if (targetsSeen.has(targetKey)) {
      collisions.push({ oldUrl, newUrl, conflictingOld: targetsSeen.get(targetKey) });
      continue;
    }
    // Also check if the target already exists on disk and is not the source itself
    if (
      fs.existsSync(newAbs) &&
      newAbs.toLowerCase() !== oldAbs.toLowerCase()
    ) {
      collisions.push({ oldUrl, newUrl, conflictingOld: newAbs });
      continue;
    }

    targetsSeen.set(targetKey, oldUrl);
    renameMap.push({ oldAbs, newAbs, oldUrl, newUrl });
  }

  return { renameMap, collisions };
}

// ---------------------------------------------------------------------------
// Source reference scanning
// ---------------------------------------------------------------------------

/** Count exact occurrences of oldUrl (as a string literal) in text. */
function countRefs(text, oldUrl) {
  let count = 0;
  let idx = 0;
  while ((idx = text.indexOf(oldUrl, idx)) !== -1) {
    count++;
    idx += oldUrl.length;
  }
  return count;
}

/** Replace all occurrences of oldUrl with newUrl in text. */
function replaceRefs(text, oldUrl, newUrl) {
  // Escape for use in a literal string — not regex
  let result = "";
  let idx = 0;
  while (true) {
    const found = text.indexOf(oldUrl, idx);
    if (found === -1) {
      result += text.slice(idx);
      break;
    }
    result += text.slice(idx, found) + newUrl;
    idx = found + oldUrl.length;
  }
  return result;
}

/** Scan all source files, return [{file, oldUrl, count}] for each match. */
function scanReferences(renameMap, sourceFiles) {
  const refReport = []; // [{oldUrl, newUrl, file, count}]

  for (const { oldUrl, newUrl } of renameMap) {
    for (const file of sourceFiles) {
      let text;
      try {
        text = fs.readFileSync(file, "utf8");
      } catch {
        continue;
      }
      const count = countRefs(text, oldUrl);
      if (count > 0) {
        refReport.push({ oldUrl, newUrl, file, count });
      }
    }
  }
  return refReport;
}

// ---------------------------------------------------------------------------
// Directory rename planning
// ---------------------------------------------------------------------------

/**
 * Walk every entry in renameMap and collect the unique set of directory renames
 * implied by the file-level mappings.  Returns entries sorted shallowest-first
 * (depth ascending) so that parent directories are renamed before children.
 *
 * Each entry: { oldDirAbs, newDirAbs, caseOnly, depth }
 *   caseOnly – true when old and new differ only in letter case (Windows needs
 *              the temp-rename trick for these).
 */
function gatherDirRenames(renameMap) {
  const seen = new Map(); // oldDirAbs.toLowerCase() → entry

  for (const { oldAbs, newAbs } of renameMap) {
    const relOld = path.relative(IMAGES_DIR, oldAbs).replace(/\\/g, "/");
    const relNew = path.relative(IMAGES_DIR, newAbs).replace(/\\/g, "/");

    const oldParts = relOld.split("/");
    const newParts = relNew.split("/");

    // Walk directory components (everything except the last filename segment).
    for (let i = 0; i < oldParts.length - 1; i++) {
      const oldDirRel = oldParts.slice(0, i + 1).join("/");
      const newDirRel = newParts.slice(0, i + 1).join("/");
      if (oldDirRel === newDirRel) continue; // already matches

      const oldDirAbs = path.join(IMAGES_DIR, ...oldDirRel.split("/"));
      const newDirAbs = path.join(IMAGES_DIR, ...newDirRel.split("/"));
      const lowerKey = oldDirAbs.toLowerCase();

      if (!seen.has(lowerKey)) {
        const caseOnly = oldDirAbs.toLowerCase() === newDirAbs.toLowerCase();
        seen.set(lowerKey, { oldDirAbs, newDirAbs, caseOnly, depth: i + 1 });
      }
    }
  }

  // Shallowest first → parents renamed before children.
  return [...seen.values()].sort((a, b) => a.depth - b.depth);
}

// ---------------------------------------------------------------------------
// Apply: rename directories, rename files, patch source refs
// ---------------------------------------------------------------------------

/**
 * Generate a temporary directory path that does not exist on disk.
 * Retries up to maxAttempts times with fresh randomness each try.
 */
function uniqueTempPath(basePath, maxAttempts = 8) {
  for (let i = 0; i < maxAttempts; i++) {
    const candidate =
      basePath +
      `.__sanitize_tmp_${Date.now().toString(36)}_${Math.random()
        .toString(36)
        .slice(2, 8)}`;
    if (!fs.existsSync(candidate)) return candidate;
  }
  throw new Error(`Cannot generate a unique temp path near ${basePath}`);
}

/**
 * Phase 1 – rename directories.
 * Case-only renames use a temp intermediate to work on Windows NTFS.
 * Content-change renames are applied directly.
 *
 * Returns a substitutions array [{oldPrefix (lower-cased), newPrefix}] that
 * callers use to update stale oldAbs paths in the file rename map.
 */
function applyDirRenames(dirRenames) {
  const substitutions = []; // built up as dirs are successfully renamed
  let dirsRenamed = 0;

  for (const { oldDirAbs, newDirAbs, caseOnly } of dirRenames) {
    // Resolve oldDirAbs through any earlier parent-level renames.
    let resolvedOld = oldDirAbs;
    for (const { oldPrefix, newPrefix } of substitutions) {
      if (resolvedOld.toLowerCase().startsWith(oldPrefix)) {
        resolvedOld = newPrefix + resolvedOld.slice(oldPrefix.length);
        break;
      }
    }

    if (!fs.existsSync(resolvedOld)) continue; // already moved by a parent rename

    if (caseOnly) {
      // ── Two-step case-only rename via unique temp ────────────────────────
      const tempDir = uniqueTempPath(resolvedOld);
      try {
        fs.renameSync(resolvedOld, tempDir);
        fs.renameSync(tempDir, newDirAbs);
        substitutions.push({
          oldPrefix: oldDirAbs.toLowerCase(),
          newPrefix: newDirAbs,
        });
        dirsRenamed++;
      } catch (err) {
        // Best-effort rollback: put the temp back to the original name.
        if (fs.existsSync(tempDir)) {
          try { fs.renameSync(tempDir, resolvedOld); } catch { /* ignore */ }
        }
        throw new Error(
          `Case-only dir rename failed (${resolvedOld} → ${newDirAbs}): ${err.message}`
        );
      }
    } else {
      // ── Direct content-change rename ─────────────────────────────────────
      const newParent = path.dirname(newDirAbs);
      if (!fs.existsSync(newParent)) fs.mkdirSync(newParent, { recursive: true });
      try {
        fs.renameSync(resolvedOld, newDirAbs);
        substitutions.push({
          oldPrefix: oldDirAbs.toLowerCase(),
          newPrefix: newDirAbs,
        });
        dirsRenamed++;
      } catch (err) {
        throw new Error(
          `Dir rename failed (${resolvedOld} → ${newDirAbs}): ${err.message}`
        );
      }
    }
  }

  return { substitutions, dirsRenamed };
}

/**
 * Apply all renames: directories first, then remaining individual file renames.
 *
 * After a directory is renamed, file oldAbs paths inside it are updated via
 * the substitution table so that fs.renameSync receives valid source paths.
 * Files whose resolved source already matches the destination (case-insensitive)
 * are skipped — the directory rename already placed them correctly.
 */
function applyRenames(renameMap) {
  const dirRenames = gatherDirRenames(renameMap);

  // Phase 1 – directories
  const { substitutions, dirsRenamed } = applyDirRenames(dirRenames);

  // Phase 2 – individual files
  let filesRenamed = 0;
  for (const { oldAbs, newAbs } of renameMap) {
    // Update oldAbs to reflect any parent directory renames.
    let resolvedOld = oldAbs;
    for (const { oldPrefix, newPrefix } of substitutions) {
      if (resolvedOld.toLowerCase().startsWith(oldPrefix)) {
        resolvedOld = newPrefix + resolvedOld.slice(oldPrefix.length);
        break;
      }
    }

    // Skip if the resolved source is already the destination (case-insensitive).
    // This covers files that were implicitly moved by a directory rename.
    if (resolvedOld.toLowerCase() === newAbs.toLowerCase()) continue;
    if (!fs.existsSync(resolvedOld)) continue;

    const newDir = path.dirname(newAbs);
    if (!fs.existsSync(newDir)) fs.mkdirSync(newDir, { recursive: true });
    fs.renameSync(resolvedOld, newAbs);
    filesRenamed++;
  }

  return { dirsRenamed, filesRenamed };
}

function patchSourceFiles(renameMap, sourceFiles) {
  let filesPatched = 0;
  let totalReplaced = 0;

  for (const file of sourceFiles) {
    let text;
    try {
      text = fs.readFileSync(file, "utf8");
    } catch {
      continue;
    }

    let patched = text;
    let fileChanged = false;

    for (const { oldUrl, newUrl } of renameMap) {
      if (patched.includes(oldUrl)) {
        patched = replaceRefs(patched, oldUrl, newUrl);
        fileChanged = true;
        totalReplaced++;
      }
    }

    if (fileChanged) {
      fs.writeFileSync(file, patched, "utf8");
      filesPatched++;
    }
  }

  return { filesPatched, totalReplaced };
}

function removeEmptyDirs(baseDir) {
  function tryRemove(dir) {
    if (dir === baseDir) return;
    let entries;
    try {
      entries = fs.readdirSync(dir);
    } catch {
      return;
    }
    if (entries.length === 0) {
      fs.rmdirSync(dir);
      tryRemove(path.dirname(dir));
    }
  }
  function walk(dir) {
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      if (e.isDirectory()) walk(path.join(dir, e.name));
    }
    tryRemove(dir);
  }
  walk(baseDir);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

(function main() {
  console.log(`\n=== sanitize-image-paths (${APPLY ? "APPLY" : "DRY RUN"}) ===\n`);

  const { renameMap, collisions } = buildRenameMap();

  // Report collisions — always abort if any
  if (collisions.length > 0) {
    console.error("ABORT: Collisions detected — two sources would map to the same target:");
    for (const c of collisions) {
      console.error(`  ${c.oldUrl}  →  ${c.newUrl}`);
      console.error(`    conflicts with: ${c.conflictingOld}`);
    }
    process.exit(1);
  }

  // Validate every generated destination path before touching anything
  const validationFailures = validateNewPaths(renameMap);
  if (validationFailures.length > 0) {
    console.error("ABORT: Generated paths failed safety validation:");
    for (const f of validationFailures) console.error(f);
    console.error("\nFix toKebab() so all outputs are lowercase, hyphen-only, ASCII.");
    process.exit(1);
  }

  if (renameMap.length === 0) {
    console.log("No image files need renaming. Nothing to do.");
    return;
  }

  const sourceFiles = collectSourceFiles(SCAN_ROOTS);
  const refReport = scanReferences(renameMap, sourceFiles);

  // Build per-oldUrl ref summary
  const refsByUrl = new Map();
  for (const r of refReport) {
    const key = r.oldUrl;
    refsByUrl.set(key, (refsByUrl.get(key) || 0) + r.count);
  }

  const dirRenames = gatherDirRenames(renameMap);
  const caseOnlyDirs = dirRenames.filter((d) => d.caseOnly);

  console.log(`Image files to rename:     ${renameMap.length}`);
  console.log(`Directories to rename:     ${dirRenames.length} (${caseOnlyDirs.length} case-only — require temp rename on Windows)`);
  console.log(`Source files scanned:      ${sourceFiles.length}\n`);

  if (dirRenames.length > 0) {
    console.log("── Directory renames ──────────────────────────────────────────────────");
    for (const { oldDirAbs, newDirAbs, caseOnly } of dirRenames) {
      const relOld = path.relative(IMAGES_DIR, oldDirAbs).replace(/\\/g, "/");
      const relNew = path.relative(IMAGES_DIR, newDirAbs).replace(/\\/g, "/");
      const tag = caseOnly ? "  [case-only → temp rename]" : "";
      console.log(`  /images/${relOld}`);
      console.log(`  → /images/${relNew}${tag}`);
      console.log("");
    }
  }

  console.log("── File renames ───────────────────────────────────────────────────────");
  for (const { oldUrl, newUrl } of renameMap) {
    const refs = refsByUrl.get(oldUrl) || 0;
    const warn = refs === 0 ? "  ⚠ no source references found" : "";
    console.log(`  ${oldUrl}`);
    console.log(`  → ${newUrl}  (${refs} ref${refs === 1 ? "" : "s"})${warn}`);
    console.log("");
  }

  if (!APPLY) {
    console.log("Dry-run complete. Pass --apply to rename files and patch references.");
    return;
  }

  // Apply
  console.log("Applying renames...");
  const { dirsRenamed, filesRenamed } = applyRenames(renameMap);
  console.log(`  Renamed ${dirsRenamed} director${dirsRenamed === 1 ? "y" : "ies"}, ${filesRenamed} file(s).`);

  console.log("Patching source references...");
  const { filesPatched, totalReplaced } = patchSourceFiles(renameMap, sourceFiles);
  console.log(`  Patched ${filesPatched} file(s), ${totalReplaced} reference(s) updated.`);

  console.log("Removing empty legacy directories...");
  removeEmptyDirs(IMAGES_DIR);

  console.log("\nDone.");
})();
