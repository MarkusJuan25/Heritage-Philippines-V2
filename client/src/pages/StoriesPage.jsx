const stories = [
  {
    kicker: "Field Notes",
    title: "The kitchens still teaching Vigan",
    excerpt:
      "Inside the empanada stalls and ancestral homes where Ilocano cooking is still apprenticed, recipe by patient recipe.",
    read: "8 min read",
  },
  {
    kicker: "Conversation",
    title: "A weaver in Mountain Province on slowness",
    excerpt:
      "A loom takes a day to set up. A blanket takes a season to finish. Why the speed of weaving is the point.",
    read: "6 min read",
  },
  {
    kicker: "Essay",
    title: "What heritage tourism owes the islands",
    excerpt:
      "Notes on travel that gives back — to restoration, to language keepers, and to the futures of small towns.",
    read: "10 min read",
  },
];

export default function StoriesPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-cream-100">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent"
        />
        <div className="container-page py-20 md:py-24">
          <span className="eyebrow">From the road</span>
          <h1 className="section-heading mt-3">Stories</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-coffee-800/90">
            Long-form pieces from our guides, partners, and travelers — the
            voices behind the journeys.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-8 lg:grid-cols-3">
          {stories.map((s) => (
            <article
              key={s.title}
              className="flex flex-col overflow-hidden rounded-2xl border border-cream-200 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                aria-hidden="true"
                className="relative h-44 w-full bg-gradient-to-br from-forest-700 via-coffee-800 to-coffee-900"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.18),transparent_60%)]" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="eyebrow">{s.kicker}</span>
                <h3 className="mt-3 font-serif text-xl text-coffee-900">
                  {s.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-coffee-800/80">
                  {s.excerpt}
                </p>
                <div className="mt-6 flex items-center justify-between text-xs uppercase tracking-widest text-coffee-700/70">
                  <span>{s.read}</span>
                  <span className="text-forest-700">Read soon →</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-cream-100">
        <div className="container-page py-16 text-center">
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
