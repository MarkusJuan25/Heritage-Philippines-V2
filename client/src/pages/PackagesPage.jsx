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
  },
  {
    title: "Vis-Min Spice Route",
    region: "Cebu · Bohol · Negros",
    days: "7 days",
    note: "Cacao farms, dive heritage, and Spanish-era port cities.",
  },
  {
    title: "Cordillera Highland Loop",
    region: "Mountain Province",
    days: "6 days",
    note: "Living rice terraces, woven futures, and forest rituals.",
  },
  {
    title: "Manila Old Town Immersion",
    region: "Metro Manila",
    days: "3 days",
    note: "Intramuros at dawn, Binondo at dusk, and the river between.",
  },
];

export default function PackagesPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-cream-100">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent"
        />
        <div className="container-page py-20 md:py-24">
          <span className="eyebrow">Curated Journeys</span>
          <h1 className="section-heading mt-3">Packages</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-coffee-800/90">
            Hand-built heritage routes across the archipelago. Travel small,
            travel slowly, and travel with the people who know the land best.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="mb-10 flex flex-wrap items-center gap-3">
          <span className="eyebrow mr-2">Browse by region</span>
          {regions.map((r, i) => (
            <span
              key={r}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium tracking-wide ${
                i === 0
                  ? "border-forest-700 bg-forest-700 text-cream-50"
                  : "border-cream-200 bg-white text-coffee-800"
              }`}
            >
              {r}
            </span>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {packages.map((p) => (
            <article key={p.title} className="card flex flex-col">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-coffee-700/70">
                <span>{p.region}</span>
                <span>{p.days}</span>
              </div>
              <h3 className="mt-3 font-serif text-2xl text-coffee-900">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-coffee-800/80">
                {p.note}
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-cream-200 pt-5">
                <span className="text-xs uppercase tracking-widest text-coffee-700/70">
                  Small group
                </span>
                <Link
                  to="/contact"
                  className="text-sm font-semibold text-forest-700 transition hover:text-forest-800"
                >
                  Inquire →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-cream-200 bg-white p-8 text-center shadow-soft md:p-12">
          <span className="eyebrow">Bespoke Itineraries</span>
          <h2 className="mt-3 font-serif text-2xl text-coffee-900 sm:text-3xl">
            Don&apos;t see your journey?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-coffee-800/80">
            Tell us what calls you — a region, a craft, a memory — and we will
            build the trip around it.
          </p>
          <Link to="/contact" className="btn-outline-dark mt-6">
            Plan with Us
          </Link>
        </div>
      </section>
    </>
  );
}
