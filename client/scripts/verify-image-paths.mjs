#!/usr/bin/env node
/**
 * verify-image-paths.mjs
 *
 * Exits with code 1 if any of the following are detected:
 *
 *  1. Any file or directory under public/images has an unsafe name
 *     (spaces, commas, parentheses, Unicode/em dashes, non-ASCII chars,
 *     or uppercase letters).
 *
 *  2. Any /images/... reference in source files contains unsafe characters
 *     or URL-encoded unsafe characters (%20, %E2, etc.).
 *
 *  3. Any /images/... reference in source files points to a path that does
 *     not exist on disk.
 *
 * Usage:
 *   node client/scripts/verify-image-paths.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CLIENT_DIR = path.resolve(__dirname, "..");
const IMAGES_DIR = path.resolve(CLIENT_DIR, "public", "images");

const SOURCE_EXTS = new Set([
  ".js", ".jsx", ".ts", ".tsx", ".css", ".html", ".json", ".md",
]);

const SCAN_EXCLUDE_DIRS = new Set([
  path.resolve(CLIENT_DIR, "dist"),
  path.resolve(CLIENT_DIR, "node_modules"),
  IMAGES_DIR,
]);

const SCAN_ROOTS = [
  path.resolve(CLIENT_DIR, "src"),
  path.resolve(CLIENT_DIR, "index.html"),
  path.resolve(CLIENT_DIR, "public"),
];

// OS metadata files that are not real content.
const OS_METADATA = new Set([
  "thumbs.db",
  ".ds_store",
  "desktop.ini",
  ".directory",
]);

// A safe path segment is lowercase ASCII letters, digits, hyphens, and dots only.
const SAFE_SEGMENT_RE = /^[a-z0-9.-]+$/;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

let failures = 0;

function fail(msg) {
  console.error(`  FAIL  ${msg}`);
  failures++;
}

// ---------------------------------------------------------------------------
// Check 1 — filesystem
// ---------------------------------------------------------------------------

function checkFilesystem() {
  console.log("1. Checking filesystem (public/images) ...");
  let checked = 0;

  function walk(dir) {
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      if (OS_METADATA.has(e.name.toLowerCase())) continue;

      const rel = path.relative(IMAGES_DIR, path.join(dir, e.name)).replace(/\\/g, "/");

      if (!SAFE_SEGMENT_RE.test(e.name)) {
        fail(`Unsafe name in public/images: ${rel}`);
      }
      checked++;
      if (e.isDirectory()) walk(path.join(dir, e.name));
    }
  }

  walk(IMAGES_DIR);
  console.log(`   Checked ${checked} filesystem entries.\n`);
}

// ---------------------------------------------------------------------------
// Check 2 + 3 — source references
// ---------------------------------------------------------------------------

function collectSourceFiles() {
  const results = [];
  function walk(current) {
    if (SCAN_EXCLUDE_DIRS.has(current)) return;
    let stat;
    try { stat = fs.statSync(current); } catch { return; }

    if (stat.isFile()) {
      if (SOURCE_EXTS.has(path.extname(current).toLowerCase())) {
        results.push(current);
      }
      return;
    }

    if (stat.isDirectory()) {
      let entries;
      try { entries = fs.readdirSync(current, { withFileTypes: true }); } catch { return; }
      for (const e of entries) {
        const full = path.join(current, e.name);
        if (!SCAN_EXCLUDE_DIRS.has(full)) walk(full);
      }
    }
  }
  for (const root of SCAN_ROOTS) walk(root);
  return results;
}

/**
 * Extract all /images/... token strings from source text.
 * Handles string literals, JSX attributes, and JSON values.
 */
function extractImageRefs(text) {
  const refs = [];
  // Match /images/ followed by non-whitespace, non-delimiter characters.
  const RE = /\/images\/[^\s"'`\)\],}\\]+/g;
  let m;
  while ((m = RE.exec(text)) !== null) {
    refs.push(m[0]);
  }
  return refs;
}

/**
 * Return true if the ref contains unsafe characters or URL-encoded sequences.
 * Safe refs contain only lowercase ASCII letters, digits, hyphens, dots, and
 * forward slashes between "/images/" and end.
 */
function isUnsafeRef(ref) {
  // Any percent-encoding indicates an encoded character (spaces, dashes, Unicode…).
  if (/%[0-9A-Fa-f]{2}/.test(ref)) return true;

  const afterImages = ref.slice("/images/".length);
  const segments = afterImages.split("/");
  for (const seg of segments) {
    if (seg === "") continue; // trailing slash
    if (!SAFE_SEGMENT_RE.test(seg)) return true;
  }
  return false;
}

/**
 * Return true if the image file exists under public/.
 * Strips query strings and hash fragments before checking.
 */
function refExistsOnDisk(ref) {
  const clean = ref.split("?")[0].split("#")[0];
  return fs.existsSync(path.join(CLIENT_DIR, "public", clean));
}

function checkSourceRefs() {
  console.log("2. Checking source file references ...");
  const sourceFiles = collectSourceFiles();
  let refsChecked = 0;

  for (const file of sourceFiles) {
    let text;
    try { text = fs.readFileSync(file, "utf8"); } catch { continue; }

    const refs = extractImageRefs(text);
    for (const ref of refs) {
      refsChecked++;
      const relFile = path.relative(CLIENT_DIR, file).replace(/\\/g, "/");

      if (isUnsafeRef(ref)) {
        fail(`Unsafe ref in ${relFile}: ${ref}`);
      } else if (!refExistsOnDisk(ref)) {
        fail(`Missing image in ${relFile}: ${ref}`);
      }
    }
  }

  console.log(`   Checked ${refsChecked} image refs across ${sourceFiles.length} source files.\n`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

console.log("\n=== verify-image-paths ===\n");

if (!fs.existsSync(IMAGES_DIR)) {
  console.error("ABORT: public/images directory not found.");
  process.exit(1);
}

checkFilesystem();
checkSourceRefs();

if (failures > 0) {
  console.error(
    `${failures} verification failure(s). Fix image paths before building for production.\n`
  );
  process.exit(1);
}

console.log("All image-path checks passed.");
