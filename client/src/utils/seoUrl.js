/**
 * Resolves a URL or asset path to a fully serialized absolute URL.
 *
 * Uses the WHATWG URL constructor so spaces, em dashes, and other
 * Unicode characters in asset paths are percent-encoded automatically.
 * No manual string replacement is performed.
 *
 * @param {unknown} pathOrUrl - A root-relative path, relative path, or absolute URL.
 * @param {string}  base      - The base URL used when pathOrUrl is not absolute.
 * @returns {string|null}       Serialized absolute URL (.href), or null on failure.
 */
export function resolveAbsoluteUrl(pathOrUrl, base) {
  if (!pathOrUrl || typeof pathOrUrl !== "string") return null;
  try {
    if (/^https?:\/\//i.test(pathOrUrl)) {
      return new URL(pathOrUrl).href;
    }
    if (!base || typeof base !== "string") return null;
    return new URL(pathOrUrl, base).href;
  } catch {
    return null;
  }
}
