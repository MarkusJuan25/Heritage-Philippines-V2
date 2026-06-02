/**
 * HeritageSection
 * A single post-hero body section that owns ONE heritage background image.
 * Sections alternate their `variant` down the page so the two artworks never
 * overlap or double-expose — each section shows exactly one image under a
 * strong cream readability veil.
 *
 * Props:
 *   - variant     : "primary" -> background-page-optimized.jpg
 *                   "secondary" -> heritage-background-v1.png
 *   - grow        : when true, the section flexes to fill the remaining body
 *                   height (used on the last section so the background reaches
 *                   the footer with no stray cream strip).
 *   - className   : extra classes on the <section> (spacing, padding, etc.).
 *   - innerClassName : extra classes on the content wrapper.
 */
export default function HeritageSection({
  children,
  variant = "primary",
  grow = false,
  className = "",
  innerClassName = "",
}) {
  const bg =
    variant === "secondary"
      ? "/images/heritage-background-v1.png"
      : "/images/background-page-optimized.jpg";

  return (
    <section
      className={`relative isolate overflow-hidden ${grow ? "flex-1" : ""} ${className}`}
    >
      {/* Section-owned artwork — one image only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${bg}')` }}
      />
      {/* Cream readability veil — strong enough to keep the artwork a quiet
          texture; no blur. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-cream-50/85"
      />
      <div className={`relative z-10 ${innerClassName}`}>{children}</div>
    </section>
  );
}
