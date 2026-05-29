import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Site-wide scroll restoration on route change.
 * Whenever the path changes, jump the window back to the top so a new page
 * never opens mid-scroll (e.g. near the footer). Hash navigation is left
 * alone so in-page anchor links keep working.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}
