const filters = [
  "All moments",
  "Architecture",
  "Crafts",
  "Landscapes",
  "Festivals",
  "Food",
];

const tiles = [
  {
    caption: "Vigan at first light",
    classes:
      "bg-gradient-to-br from-coffee-700 via-coffee-900 to-forest-900 md:col-span-2 md:row-span-2",
  },
  {
    caption: "Cordillera terraces",
    classes: "bg-gradient-to-br from-forest-600 to-forest-900",
  },
  {
    caption: "Paoay basilica",
    classes: "bg-gradient-to-br from-gold-500 to-coffee-700",
  },
  {
    caption: "Binondo at dusk",
    classes: "bg-gradient-to-br from-coffee-800 to-forest-800",
  },
  {
    caption: "Negros cacao",
    classes: "bg-gradient-to-br from-coffee-600 to-gold-600",
  },
  {
    caption: "Bohol coast",
    classes: "bg-gradient-to-br from-forest-700 to-forest-900 md:col-span-2",
  },
];

export default function GalleryPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-cream-100">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent"
        />
        <div className="container-page py-20 md:py-24">
          <span className="eyebrow">Frames of the archipelago</span>
          <h1 className="section-heading mt-3">Gallery</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-coffee-800/90">
            Moments collected on the road — quiet plazas, working hands, and
            the light that only the Philippines gives.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <span className="eyebrow mr-2">Browse</span>
          {filters.map((f, i) => (
            <span
              key={f}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium tracking-wide ${
                i === 0
                  ? "border-forest-700 bg-forest-700 text-cream-50"
                  : "border-cream-200 bg-white text-coffee-800"
              }`}
            >
              {f}
            </span>
          ))}
        </div>

        <div className="grid auto-rows-[180px] gap-4 md:auto-rows-[220px] md:grid-cols-3">
          {tiles.map((t) => (
            <figure
              key={t.caption}
              className={`group relative overflow-hidden rounded-2xl shadow-soft ${t.classes}`}
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_60%)]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 text-cream-50">
                <span className="font-serif text-base sm:text-lg">
                  {t.caption}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-cream-100/70">
                  Coming soon
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
