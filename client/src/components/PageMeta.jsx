import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { resolveAbsoluteUrl } from "../utils/seoUrl.js";

const SITE_NAME = "Heritage Philippines";

function setMeta(attr, key, content) {
  const selector = `meta[${attr}="${key}"]`;
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function PageMeta({
  title,
  description,
  image = "/images/heritage-logo.png",
  type = "website",
  robots = "index, follow",
  structuredData,
}) {
  const { pathname } = useLocation();

  useEffect(() => {
    const base = (
      import.meta.env.VITE_SITE_URL || window.location.origin
    ).replace(/\/+$/, "");

    const canonical = resolveAbsoluteUrl(pathname, base) ?? `${base}${pathname}`;

    const absImage =
      resolveAbsoluteUrl(image, base) ??
      resolveAbsoluteUrl("/images/heritage-logo.png", base) ??
      "";

    document.title = title;

    setMeta("name", "description", description);
    setMeta("name", "robots", robots);

    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", type);
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:image", absImage);
    setMeta("property", "og:site_name", SITE_NAME);

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", absImage);

    setCanonical(canonical);

    // JSON-LD structured data — remove stale scripts, then inject fresh ones
    document.head
      .querySelectorAll('script[data-page-meta-jsonld="true"]')
      .forEach((s) => s.remove());

    const injected = [];
    if (structuredData != null) {
      const items = Array.isArray(structuredData) ? structuredData : [structuredData];
      for (const item of items) {
        if (item == null || typeof item !== "object" || Array.isArray(item)) continue;
        let json;
        try {
          json = JSON.stringify(item);
        } catch {
          continue;
        }
        if (typeof json !== "string" || !json) continue;
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute("data-page-meta-jsonld", "true");
        script.textContent = json;
        document.head.appendChild(script);
        injected.push(script);
      }
    }

    return () => {
      injected.forEach((s) => s.remove());
    };
  }, [title, description, image, type, robots, pathname, structuredData]);

  return null;
}
