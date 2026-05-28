import { Link } from "react-router-dom";

const regions = [
  "All journeys",
  "Northern Luzon",
  "Visayas",
  "Mountain Province",
  "Metro Manila",
];

const packages = [
  {
    title: "Ilocos Heritage Trail",
    region: "Northern Luzon",
    days: "5 days",
    note: "Calesa towns, indigo weavers, and coral-stone basilicas.",
    image: "/images/a-glimpse-of-vigan-city.jpg",
  },
  {
    title: "Vis-Min Spice Route",
    region: "Cebu · Bohol · Negros",
    days: "7 days",
    note: "Cacao farms, dive heritage, and Spanish-era port cities.",
    image: "/images/chocolate-hills.jpg",
  },
  {
    title: "Cordillera Highland Loop",
    region: "Mountain Province",
    days: "6 days",
    note: "Living rice terraces, woven futures, and forest rituals.",
    image: "/images/banaue-rice-terreces.jpg",
  },
  {
    title: "Manila Old Town Immersion",
    region: "Metro Manila",
    days: "3 days",
    note: "Intramuros at dawn, Binondo at dusk, and the river between.",
    image: "/images/townscape-in-night-at-manila.jpg",
  },
];

export default function PackagesPage() {
  return (
    <>
      {/* HERO */}
      <section className="page-header">
        <div className="page-header__media">
          <img
            src="/images/banaue-rice-terreces.jpg"
            alt=""
            className="page-header__image"
            loading="eager"
          />
          <div className="page-header__shade" />
        </div>
        <div className="container-page relative pb-16 pt-36 sm:pt-40 md:pb-20 md:pt-44">
          <p className="eyebrow-light">Curated Journeys</p>
          <h1 className="mt-4 font-serif text-4xl text-balance text-cream-50 sm:text-5xl lg:text-6xl">
            Packages designed at the{" "}
            <span className="italic text-accent-gold">pace of place.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream-100/85">
            Hand-built heritage routes across the archipelago. Travel small,
            travel slowly, and travel with the people who know the land
            best.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-warm-cream py-16 md:py-20">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-heritage"
        />
        <div className="container-page relative">
        <div className="mb-10 flex flex-wrap items-center gap-3">
          <span className="eyebrow mr-2">Browse by region</span>
          {regions.map((r, i) => (
            <span
              key={r}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium tracking-wide transition ${
                i === 0
                  ? "border-forest-700 bg-forest-700 text-cream-50 shadow-warm"
                  : "border-cream-200 bg-white text-coffee-800 hover:border-gold-400/60"
              }`}
            >
              {r}
            </span>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {packages.map((p) => (
            <article
              key={p.title}
              className="group flex flex-col overflow-hidden rounded-2xl border border-cream-200/80 bg-gradient-to-b from-white to-cream-50 shadow-warm transition duration-500 hover:-translate-y-1 hover:shadow-premium"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/55 to-transparent"
                />
                <div className="absolute inset-x-5 top-5 flex items-center justify-between">
                  <span className="inline-flex items-center rounded-full bg-coffee-950/55 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gold-300 backdrop-blur">
                    {p.region}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-gold-400/85 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-coffee-950">
                    {p.days}
                  </span>
                </div>
                <p className="absolute inset-x-5 bottom-4 font-serif text-2xl text-cream-50">
                  {p.title}
                </p>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-sm leading-relaxed text-coffee-800/85">
                  {p.note}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-cream-200 pt-5">
                  <span className="text-xs uppercase tracking-widest text-coffee-700/70">
                    Small group
                  </span>
                  <Link
                    to="/contact"
                    className="text-sm font-semibold text-forest-700 transition group-hover:gap-2 hover:text-forest-800"
                  >
                    Inquire →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-cream-200/80 bg-gradient-to-b from-white to-cream-50 p-8 text-center shadow-warm md:p-12">
          <span className="eyebrow">Bespoke Itineraries</span>
          <h2 className="mt-3 font-serif text-2xl text-coffee-900 sm:text-3xl">
            Don&apos;t see your journey?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-coffee-800/80">
            Tell us what calls you — a region, a craft, a memory — and we
            will build the trip around it.
          </p>
          <Link to="/contact" className="btn-outline-dark mt-6">
            Plan with Us
          </Link>
        </div>
        </div>
      </section>
    </>
  );
}
