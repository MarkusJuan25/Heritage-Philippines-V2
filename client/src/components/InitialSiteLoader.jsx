import { useEffect, useState } from "react";

const MIN_VISIBLE_MS = 800;
const MAX_VISIBLE_MS = 2500;
const FADE_MS = 400;

export default function InitialSiteLoader() {
  const [isHomepageInitialLoad] = useState(
    () => typeof window !== "undefined" && window.location.pathname === "/"
  );
  const [visible, setVisible] = useState(isHomepageInitialLoad);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    if (!isHomepageInitialLoad) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let minTimeElapsed = false;
    let pageLoaded = document.readyState === "complete";
    let fadeTimer = null;

    const close = () => {
      document.body.style.overflow = previousOverflow;
      setFadingOut(true);
      fadeTimer = window.setTimeout(() => setVisible(false), FADE_MS);
    };

    const tryClose = () => {
      if (minTimeElapsed && pageLoaded) close();
    };

    const handleLoad = () => {
      pageLoaded = true;
      tryClose();
    };

    if (!pageLoaded) {
      window.addEventListener("load", handleLoad);
    }

    const minTimer = window.setTimeout(() => {
      minTimeElapsed = true;
      tryClose();
    }, MIN_VISIBLE_MS);

    const maxTimer = window.setTimeout(() => {
      minTimeElapsed = true;
      pageLoaded = true;
      close();
    }, MAX_VISIBLE_MS);

    return () => {
      window.clearTimeout(minTimer);
      window.clearTimeout(maxTimer);
      if (fadeTimer) window.clearTimeout(fadeTimer);
      window.removeEventListener("load", handleLoad);
      document.body.style.overflow = previousOverflow;
    };
  }, [isHomepageInitialLoad]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-coffee-950 text-cream-50 transition-opacity ease-out ${
        fadingOut ? "opacity-0" : "opacity-100"
      }`}
      style={{ transitionDuration: `${FADE_MS}ms` }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 32%, rgba(242,215,122,0.16), transparent 55%), radial-gradient(circle at 12% 88%, rgba(190,142,43,0.12), transparent 60%)",
        }}
      />

      <div className="relative flex flex-col items-center gap-5 px-6 text-center">
        <div className="relative flex h-28 w-28 items-center justify-center">
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full border border-dashed border-gold-400/40 motion-safe:animate-spin"
            style={{ animationDuration: "9s" }}
          />
          <span
            aria-hidden="true"
            className="absolute inset-3 rounded-full bg-gold-400/15 blur-lg motion-safe:animate-pulse"
          />
          <span className="relative grid h-20 w-20 place-items-center overflow-hidden rounded-full bg-coffee-900/70 ring-1 ring-gold-400/40 shadow-glow">
            <img
              src="/images/heritage-logo.png"
              alt="Heritage Philippines"
              className="h-12 w-12 object-contain"
            />
          </span>
        </div>

        <div>
          <p className="font-serif text-xl tracking-[0.04em] text-cream-50 sm:text-2xl">
            Heritage Philippines
          </p>
          <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-300/80">
            Loading your journey&hellip;
          </p>
        </div>
      </div>
    </div>
  );
}
