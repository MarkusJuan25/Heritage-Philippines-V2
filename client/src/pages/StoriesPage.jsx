const stories = [
  {
    kicker: "Field Notes",
    title: "The kitchens still teaching Vigan",
    excerpt:
      "Inside the empanada stalls and ancestral homes where Ilocano cooking is still apprenticed, recipe by patient recipe.",
    read: "8 min read",
    image: "/images/kamayan-style.jpg",
  },
  {
    kicker: "Conversation",
    title: "A weaver in Mountain Province on slowness",
    excerpt:
      "A loom takes a day to set up. A blanket takes a season to finish. Why the speed of weaving is the point.",
    read: "6 min read",
    image: "/images/banaue-rice-terreces.jpg",
  },
  {
    kicker: "Essay",
    title: "What heritage tourism owes the islands",
    excerpt:
      "Notes on travel that gives back — to restoration, to language keepers, and to the futures of small towns.",
    read: "10 min read",
    image: "/images/marlboro-country-batanes-lanscapes.jpg",
  },
];

export default function StoriesPage() {
  return (
    <>
      {/* HERO */}
      <section className="page-header">
        <div className="page-header__media">
          <img
            src="/images/homecoming.jpg"
            alt=""
            className="page-header__image"
            loading="eager"
          />
          <div className="page-header__shade" />
        </div>
        <div className="container-page relative pb-16 pt-36 sm:pt-40 md:pb-20 md:pt-44">
          <p className="eyebrow-light">From the road</p>
          <h1 className="mt-4 font-serif text-4xl text-balance text-cream-50 sm:text-5xl lg:text-6xl">
            Stories that arrive{" "}
            <span className="italic text-accent-gold">
              when the writing is ready.
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream-100/85">
            Long-form pieces from our guides, partners, and travelers — the
            voices behind the journeys.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-warm-cream py-16">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-heritage opacity-80"
        />
        <div className="container-page relative">
        <div className="grid gap-8 lg:grid-cols-3">
          {stories.map((s) => (
            <article
              key={s.title}
              className="group flex flex-col overflow-hidden rounded-2xl border border-cream-200/80 bg-gradient-to-b from-white to-cream-50 shadow-warm transition duration-500 hover:-translate-y-1 hover:shadow-premium"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/45 to-transparent"
                />
                <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-coffee-950/55 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gold-300 backdrop-blur">
                  {s.kicker}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-serif text-xl text-coffee-900">
                  {s.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-coffee-800/80">
                  {s.excerpt}
                </p>
                <div className="mt-6 flex items-center justify-between text-xs uppercase tracking-widest text-coffee-700/70">
                  <span>{s.read}</span>
                  <span className="font-semibold text-forest-700">
                    Read soon →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-warm-cream">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-heritage opacity-70"
        />
        <div className="container-page relative py-16 text-center">
          <span className="eyebrow">Field journal</span>
          <h2 className="section-heading mt-3 text-3xl">
            New stories every season.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-coffee-800/80">
            Slow dispatches from our guides and partners — sent when the
            writing is ready, never on a schedule.
          </p>
        </div>
      </section>
    </>
  );
}
