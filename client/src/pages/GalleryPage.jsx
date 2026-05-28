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
    kicker: "Ilocos Sur",
    image: "/images/a-glimpse-of-vigan-city.jpg",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    caption: "Cordillera terraces",
    kicker: "Mountain Province",
    image: "/images/banaue-rice-terreces.jpg",
  },
  {
    caption: "Mayon at dawn",
    kicker: "Albay",
    image: "/images/mt-mayon.jpg",
  },
  {
    caption: "Manila at night",
    kicker: "Metro Manila",
    image: "/images/townscape-in-night-at-manila.jpg",
  },
  {
    caption: "El Nido sunsets",
    kicker: "Palawan",
    image: "/images/palawan-sunset-el-nido-sunset-crimson-and-gold.jpg",
  },
  {
    caption: "Batanes coast",
    kicker: "Batanes",
    image: "/images/marlboro-country-batanes-lanscapes.jpg",
    span: "md:col-span-2",
  },
];

export default function GalleryPage() {
  return (
    <>
      {/* HERO */}
      <section className="page-header">
        <div className="page-header__media">
          <img
            src="/images/palawan-sunset-el-nido-sunset-crimson-and-gold.jpg"
            alt=""
            className="page-header__image"
            loading="eager"
          />
          <div className="page-header__shade" />
        </div>
        <div className="container-page relative pb-16 pt-36 sm:pt-40 md:pb-20 md:pt-44">
          <p className="eyebrow-light">Frames of the archipelago</p>
          <h1 className="mt-4 font-serif text-4xl text-balance text-cream-50 sm:text-5xl lg:text-6xl">
            A visual memory{" "}
            <span className="italic text-accent-gold">of the islands.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream-100/85">
            Moments collected on the road — quiet plazas, working hands, and
            the light that only the Philippines gives.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-warm-cream py-16">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-heritage opacity-80"
        />
        <div className="container-page relative">
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <span className="eyebrow mr-2">Browse</span>
          {filters.map((f, i) => (
            <span
              key={f}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium tracking-wide transition ${
                i === 0
                  ? "border-forest-700 bg-forest-700 text-cream-50 shadow-soft"
                  : "border-cream-200 bg-white text-coffee-800 hover:border-gold-400/60"
              }`}
            >
              {f}
            </span>
          ))}
        </div>

        <div className="grid auto-rows-[200px] gap-4 md:auto-rows-[240px] md:grid-cols-3">
          {tiles.map((t) => (
            <figure
              key={t.caption}
              className={`group relative overflow-hidden rounded-2xl shadow-soft ring-1 ring-cream-200 transition duration-500 hover:shadow-premium ${t.span ?? ""}`}
            >
              <img
                src={t.image}
                alt={t.caption}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5 text-cream-50">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold-300/90">
                  {t.kicker}
                </span>
                <span className="font-serif text-lg sm:text-xl">
                  {t.caption}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        </div>
      </section>
    </>
  );
}
