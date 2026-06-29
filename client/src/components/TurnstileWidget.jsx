import { useEffect, useRef } from "react";

const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const SCRIPT_ID = "cf-turnstile-script";

// Module-level promise so the script is loaded at most once per page.
let scriptLoadPromise = null;

function loadTurnstileScript() {
  if (scriptLoadPromise) return scriptLoadPromise;

  const existing = document.getElementById(SCRIPT_ID);
  if (existing) {
    if (window.turnstile) {
      scriptLoadPromise = Promise.resolve();
      return scriptLoadPromise;
    }
    scriptLoadPromise = new Promise((resolve, reject) => {
      existing.addEventListener("load", resolve, { once: true });
      existing.addEventListener(
        "error",
        (e) => {
          existing.remove();
          scriptLoadPromise = null;
          reject(e);
        },
        { once: true },
      );
    });
    return scriptLoadPromise;
  }

  scriptLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = SCRIPT_SRC;
    script.async = true;
    script.addEventListener("load", resolve, { once: true });
    script.addEventListener(
      "error",
      (e) => {
        script.remove();
        scriptLoadPromise = null;
        reject(e);
      },
      { once: true },
    );
    document.head.appendChild(script);
  });

  return scriptLoadPromise;
}

/**
 * Renders a Cloudflare Turnstile widget explicitly.
 *
 * Props:
 *   siteKey        – Cloudflare Turnstile site key (public)
 *   onSuccess(tok) – called with the token when verification succeeds
 *   onExpire()     – called when the token expires
 *   onError()      – called when the widget encounters an error
 *   resetVersion   – increment this number to remove and re-render the widget
 */
export default function TurnstileWidget({
  siteKey,
  onSuccess,
  onExpire,
  onError,
  resetVersion,
}) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);

  // Track mounted state to prevent state updates after unmount.
  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Keep callback refs current so the widget always invokes the latest closures
  // without the render effect needing to re-run on every parent re-render.
  const onSuccessRef = useRef(onSuccess);
  const onExpireRef = useRef(onExpire);
  const onErrorRef = useRef(onError);
  useEffect(() => { onSuccessRef.current = onSuccess; }, [onSuccess]);
  useEffect(() => { onExpireRef.current = onExpire; }, [onExpire]);
  useEffect(() => { onErrorRef.current = onError; }, [onError]);

  // Load script and render (or re-render) the widget whenever siteKey or
  // resetVersion changes.
  useEffect(() => {
    if (!siteKey || !containerRef.current) return;

    let cancelled = false;

    // Remove any widget already occupying this container.
    if (widgetIdRef.current != null && window.turnstile) {
      try {
        window.turnstile.remove(widgetIdRef.current);
      } catch {
        // widget may already be gone
      }
      widgetIdRef.current = null;
    }

    loadTurnstileScript()
      .then(() => {
        if (cancelled || !mountedRef.current || !containerRef.current) return;
        if (!window.turnstile) return;

        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token) => {
            if (mountedRef.current) onSuccessRef.current?.(token);
          },
          "expired-callback": () => {
            if (mountedRef.current) onExpireRef.current?.();
          },
          "timeout-callback": () => {
            // Challenge timed out before completion — treat as expiry.
            if (mountedRef.current) onExpireRef.current?.();
          },
          "error-callback": (errorCode) => {
            if (mountedRef.current) onErrorRef.current?.(errorCode);
            // Returning true signals that the application handled the failure;
            // Turnstile will not automatically recreate the widget.
            return true;
          },
          // Automatically refresh an expired token without user interaction.
          "refresh-expired": "auto",
        });
      })
      .catch(() => {
        if (mountedRef.current) onErrorRef.current?.();
      });

    return () => {
      cancelled = true;
      if (widgetIdRef.current != null && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // widget may already be gone
        }
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, resetVersion]); // eslint-disable-line react-hooks/exhaustive-deps

  return <div ref={containerRef} />;
}
