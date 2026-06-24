#!/usr/bin/env node
// Generates client/public/sitemap.xml and client/public/robots.txt.
// Executed automatically via the npm `prebuild` lifecycle hook.

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { provincePackages } from "../src/data/philippinesPackages.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

// ---------------------------------------------------------------------------
// env helpers
// ---------------------------------------------------------------------------

function parseEnvFile(filePath) {
  try {
    const lines = readFileSync(filePath, "utf8").split("\n");
    const out = {};
    for (const line of lines) {
      const t = line.trim();
      if (!t || t.startsWith("#") || !t.includes("=")) continue;
      const eq  = t.indexOf("=");
      const key = t.slice(0, eq).trim();
      const val = t.slice(eq + 1).trim();
      if (key && val) out[key] = val;
    }
    return out;
  } catch {
    return {};
  }
}

function resolveSiteUrl() {
  // Priority: shell env -> .env.local -> .env.example (holds the prod default)
  if (process.env.VITE_SITE_URL) return process.env.VITE_SITE_URL;

  const local   = parseEnvFile(join(__dirname, "../.env.local"));
  if (local.VITE_SITE_URL)   return local.VITE_SITE_URL;

  const example = parseEnvFile(join(__dirname, "../.env.example"));
  if (example.VITE_SITE_URL) return example.VITE_SITE_URL;

  console.warn("[seo] VITE_SITE_URL not found - using built-in default.");
  return "https://heritagephilippines.com";
}

// ---------------------------------------------------------------------------
// XML helpers
// ---------------------------------------------------------------------------

function xmlEscape(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function urlEntry({ loc, lastmod, changefreq, priority }) {
  return [
    "  <url>",
    `    <loc>${xmlEscape(loc)}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ].join("\n");
}

// ---------------------------------------------------------------------------
// resolve config
// ---------------------------------------------------------------------------

const siteUrl = resolveSiteUrl().replace(/\/+$/, "");
const today   = new Date().toISOString().slice(0, 10);

console.log(`[seo] site URL : ${siteUrl}`);
console.log(`[seo] lastmod  : ${today}`);

// ---------------------------------------------------------------------------
// validate tour data
// ---------------------------------------------------------------------------

if (!Array.isArray(provincePackages) || provincePackages.length === 0) {
  console.error("[seo] ERROR: provincePackages is empty or not an array - aborting.");
  process.exit(1);
}

// ---------------------------------------------------------------------------
// static pages
// ---------------------------------------------------------------------------

const STATIC_PAGES = [
  { path: "/",                     changefreq: "weekly",  priority: "1.0" },
  { path: "/packages",             changefreq: "weekly",  priority: "0.9" },
  { path: "/tour",                 changefreq: "weekly",  priority: "0.9" },
  { path: "/gallery",              changefreq: "monthly", priority: "0.7" },
  { path: "/stories",              changefreq: "monthly", priority: "0.7" },
  { path: "/about",                changefreq: "monthly", priority: "0.6" },
  { path: "/contact",              changefreq: "monthly", priority: "0.6" },
  { path: "/privacy-policy",       changefreq: "yearly",  priority: "0.3" },
  { path: "/terms-and-conditions", changefreq: "yearly",  priority: "0.3" },
];

const staticEntries = STATIC_PAGES.map(({ path, changefreq, priority }) =>
  urlEntry({ loc: `${siteUrl}${path}`, lastmod: today, changefreq, priority })
);

// ---------------------------------------------------------------------------
// tour-detail pages (derived from live package data)
// ---------------------------------------------------------------------------

const seenSlugs    = new Set();
const tourEntries  = [];

for (const pkg of provincePackages) {
  if (!pkg.slug || typeof pkg.slug !== "string") {
    console.warn(`[seo] Skipping package with missing slug: ${pkg.title ?? "(unknown)"}`);
    continue;
  }
  if (seenSlugs.has(pkg.slug)) {
    console.warn(`[seo] Duplicate slug skipped: ${pkg.slug}`);
    continue;
  }
  seenSlugs.add(pkg.slug);
  tourEntries.push(
    urlEntry({
      loc:        `${siteUrl}/tour/${pkg.slug}`,
      lastmod:    today,
      changefreq: "monthly",
      priority:   "0.8",
    })
  );
}

// ---------------------------------------------------------------------------
// assemble sitemap.xml
// ---------------------------------------------------------------------------

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...staticEntries,
  ...tourEntries,
  "</urlset>",
  "",
].join("\n");

// ---------------------------------------------------------------------------
// assemble robots.txt
// ---------------------------------------------------------------------------

const robots = [
  "User-agent: *",
  "Allow: /",
  "",
  "Disallow: /member",
  "Disallow: /admin",
  "",
  `Sitemap: ${siteUrl}/sitemap.xml`,
  "",
].join("\n");

// ---------------------------------------------------------------------------
// write output files
// ---------------------------------------------------------------------------

const publicDir = join(__dirname, "../public");
mkdirSync(publicDir, { recursive: true });

writeFileSync(join(publicDir, "sitemap.xml"), sitemap, "utf8");
writeFileSync(join(publicDir, "robots.txt"),  robots,  "utf8");

const totalUrls = STATIC_PAGES.length + tourEntries.length;
console.log(
  `[seo] sitemap.xml : ${STATIC_PAGES.length} static + ${tourEntries.length} tour-detail = ${totalUrls} URLs`
);
console.log("[seo] robots.txt  : written");
console.log("[seo] done.");
