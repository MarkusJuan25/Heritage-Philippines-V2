import { useEffect } from "react";
import { useLocation } from "react-router-dom";

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
}) {
  const { pathname } = useLocation();

  useEffect(() => {
    const base = (
      import.meta.env.VITE_SITE_URL || window.location.origin
    ).replace(/\/+$/, "");

    const canonical = `${base}${pathname}`;

    const absImage = image.startsWith("http")
      ? image
      : `${base}${image.startsWith("/") ? image : `/${image}`}`;

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
  }, [title, description, image, type, robots, pathname]);

  return null;
}
