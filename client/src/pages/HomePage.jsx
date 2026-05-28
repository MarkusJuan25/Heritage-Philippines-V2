import { Link } from "react-router-dom";

const pillars = [
  { label: "Provinces", value: "27" },
  { label: "Local Partners", value: "60+" },
  { label: "Years Curating", value: "12" },
];

const trust = [
  "Curated by Filipino travel specialists",
  "Built for families, groups, and cultural explorers",
  "Designed for meaningful journeys",
];

const journeys = [
  {
    eyebrow: "Heritage Cities",
    title: "Ancestral Cities",
    body: "Walk Vigan, Intramuros, and Silay — colonial-era streets and the families still keeping them alive.",
    tag: "Architecture · Cuisine",
    gradient: "from-coffee-700 via-coffee-800 to-coffee-900",
  },
  {
    eyebrow: "Islands & Faith",
    title: "Island Faith & Culture",
    body: "Coral-stone basilicas, healing wells, and fiestas across the Visayan seas — slow, reverent, and bright with colour.",
    tag: "Pilgrimage · Sea",
    gradient: "from-forest-600 via-forest-800 to-forest-900",
  },
  {
    eyebrow: "Living Traditions",
    title: "Living Traditions",
    body: "Weavers, brass casters, and rice-terrace keepers — heritage you can hold, taste, and learn with your hands.",
    tag: "Crafts · Highlands",
    gradient: "from-gold-600 via-coffee-700 to-coffee-900",
  },
];

const highlights = [
  {
    title: "Curated Heritage Routes",
    body: "Hand-picked itineraries crossing centuries of indigenous, Spanish-era, and revolutionary heritage.",
  },
  {
    title: "Local Stewards",
    body: "Guides who live the stories — keepers of language, ritual, food, and craft.",
  },
  {
    title: "Slow, Intentional Travel",
    body: "Small groups. Generous time. Real conversations. No rushing past the meaning.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-forest-900 text-cream-50">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(190,142,43,0.28),transparent_55%),radial-gradient(circle_at_82%_82%,rgba(47,93,80,0.7),transparent_60%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-forest-900 via-forest-900/85 to-coffee-900"
        />
        <div
          aria-hidden="true"
          className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl"
        />

        <div className="container-page relative py-24 md:py-28 lg:py-32">
          <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
            {/* Left */}
            <div>
              <span className="eyebrow text-gold-300">
                Heritage Philippines
              </span>
              <h1 className="mt-5 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
                Walk the stories that shaped a nation.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-cream-100/85 sm:text-lg">
                Cinematic, slow-paced journeys through Filipino heritage —
                coral-stone churches, weaving villages, and ancestral kitchens.
                Designed for travelers who arrive curious and leave changed.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link to="/packages" className="btn-primary">
                  Browse Packages
                </Link>
                <Link to="/contact" className="btn-outline-light">
                  Plan with Us
                </Link>
              </div>

              <dl className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-cream-50/15 pt-8">
                {pillars.map((p) => (
                  <div key={p.label}>
                    <dt className="text-xs uppercase tracking-widest text-cream-100/60">
                      {p.label}
                    </dt>
                    <dd className="mt-1 font-serif text-3xl text-gold-300">
                      {p.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Right — layered visual composition (CSS only) */}
            <div className="relative hidden h-[500px] lg:block">
              <div
                aria-hidden="true"
                className="absolute right-4 top-12 h-72 w-72 rounded-full bg-gold-500/20 blur-3xl"
              />

              {/* Main destination card */}
              <div className="absolute right-0 top-6 h-[420px] w-[330px] overflow-hidden rounded-3xl border border-gold-500/30 bg-gradient-to-br from-forest-600 via-forest-800 to-coffee-900 p-7 shadow-soft">
                <div
                  aria-hidden="true"
                  className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gold-500/15 blur-2xl"
                />
                <span className="eyebrow text-gold-300">Featured Journey</span>
                <h3 className="mt-4 font-serif text-3xl leading-tight text-cream-50">
                  Vigan & the Ilocos Coast
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-cream-100/80">
                  Coral-stone churches, calesa mornings, and ancestral
                  suppers across five unhurried days.
                </p>
                <div className="absolute inset-x-7 bottom-7 flex items-center justify-between text-[11px] uppercase tracking-widest text-cream-100/70">
                  <span>5 days · Small group</span>
                  <span className="text-gold-300">View →</span>
                </div>
              </div>

              {/* Top-left overlay card */}
              <div className="absolute -left-2 top-0 w-[230px] -rotate-3 rounded-2xl border border-cream-200 bg-cream-50 p-5 text-coffee-900 shadow-soft">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-gold-600">
                  Now booking
                </span>
                <p className="mt-2 font-serif text-base">
                  Cordillera Highland Loop
                </p>
                <p className="mt-1 text-xs text-coffee-700/70">
                  November departures
                </p>
              </div>

              {/* Bottom-left info pill */}
              <div className="absolute bottom-16 left-0 rounded-2xl border border-cream-50/15 bg-coffee-900/60 px-4 py-3 backdrop-blur">
                <span className="text-[10px] uppercase tracking-widest text-cream-100/70">
                  Next departure
                </span>
                <p className="mt-1 font-serif text-sm text-cream-50">
                  10 March 2026
                </p>
              </div>

              {/* Bottom-right gold badge */}
              <div className="absolute -bottom-2 right-8 rotate-2 rounded-2xl bg-gold-500 px-5 py-4 text-coffee-900 shadow-soft">
                <span className="block text-[10px] font-semibold uppercase tracking-widest">
                  Curated since
                </span>
                <span className="font-serif text-xl">2013</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-cream-200 bg-cream-100">
        <div className="container-page grid gap-6 py-8 md:grid-cols-3">
          {trust.map((t) => (
            <div
              key={t}
              className="flex items-center justify-center gap-3 text-sm text-coffee-800"
            >
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rounded-full bg-gold-500"
              />
              <span className="text-center md:text-left">{t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SIGNATURE JOURNEYS */}
      <section className="container-page py-20 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="eyebrow">Signature Heritage Journeys</span>
            <h2 className="section-heading mt-3">Where the journeys begin.</h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-coffee-800/90">
              Three story-led routes through the country&apos;s richest
              heritage regions — each designed to be walked slowly, with the
              people who live them.
            </p>
          </div>
          <Link
            to="/packages"
            className="text-sm font-semibold text-forest-700 transition hover:text-forest-800"
          >
            View all packages →
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {journeys.map((j) => (
            <article
              key={j.title}
              className="group flex flex-col overflow-hidden rounded-2xl border border-cream-200 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className={`relative h-44 w-full bg-gradient-to-br ${j.gradient}`}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.18),transparent_55%)]"
                />
                <span className="absolute bottom-4 left-5 inline-flex items-center rounded-full bg-cream-50/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-cream-50 backdrop-blur">
                  {j.tag}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="eyebrow">{j.eyebrow}</span>
                <h3 className="mt-3 font-serif text-2xl text-coffee-900">
                  {j.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-coffee-800/80">
                  {j.body}
                </p>
                <Link
                  to="/packages"
                  className="mt-5 inline-flex text-sm font-semibold text-forest-700 transition hover:text-forest-800"
                >
                  Explore journey →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* WHY HERITAGE */}
      <section className="bg-cream-100">
        <div className="container-page py-20">
          <div className="max-w-2xl">
            <span className="eyebrow">Why Heritage</span>
            <h2 className="section-heading mt-3">
              Tourism that honors the story.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-coffee-800/90">
              Heritage Philippines crafts immersive journeys that move at the
              pace of the place — built around local scholars, families, and
              culture-bearers across the islands.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {highlights.map((h) => (
              <article key={h.title} className="card">
                <span
                  aria-hidden="true"
                  className="inline-block h-1 w-10 rounded-full bg-gold-500"
                />
                <h3 className="mt-4 font-serif text-xl text-coffee-900">
                  {h.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-coffee-800/80">
                  {h.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CINEMATIC FEATURED BAND */}
      <section className="bg-coffee-900 text-cream-50">
        <div className="container-page grid gap-10 py-20 md:grid-cols-[2fr_1fr] md:items-center">
          <div>
            <span className="eyebrow text-gold-300">Featured Journey</span>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
              Ilocos Heritage Trail
            </h2>
            <p className="mt-5 max-w-2xl text-cream-100/80">
              Five unhurried days through Vigan, Paoay, and the highland
              weaving towns — sunrise calesa rides, candlelit ancestral
              suppers, and quiet conversations with the keepers of the old
              crafts.
            </p>
          </div>
          <div className="flex md:justify-end">
            <Link to="/packages" className="btn-outline-light">
              See Itinerary
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
