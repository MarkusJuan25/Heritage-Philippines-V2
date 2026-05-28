const dayPlan = [
  {
    time: "Dawn",
    title: "Quiet arrivals",
    body: "Sunrise calesa, slow coffee, and a stroll through waking plazas before the heat finds them.",
  },
  {
    time: "Midday",
    title: "Hands on heritage",
    body: "A weaving studio, an ancestral kitchen, or a coral-stone restoration site — always working, never staged.",
  },
  {
    time: "Dusk",
    title: "Candlelit suppers",
    body: "Long tables, family recipes, and the kind of unhurried conversation that turns trips into memories.",
  },
];

const included = [
  "Heritage-led guides",
  "Boutique heritage stays",
  "Private transfers",
  "Curated tastings",
  "Small group access",
  "On-trip concierge",
];

export default function TourPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-cream-100">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent"
        />
        <div className="container-page py-20 md:py-24">
          <span className="eyebrow">A day on tour</span>
          <h1 className="section-heading mt-3">Tour</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-coffee-800/90">
            Every Heritage Philippines tour is paced like a long conversation —
            rooms with windows, mornings without alarms, and time for the
            stories that don&apos;t fit on a brochure.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {dayPlan.map((d) => (
            <article key={d.time} className="card">
              <span className="eyebrow">{d.time}</span>
              <h3 className="mt-3 font-serif text-xl text-coffee-900">
                {d.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-coffee-800/80">
                {d.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-forest-900 text-cream-50">
        <div className="container-page grid gap-10 py-20 md:grid-cols-2 md:items-center">
          <div>
            <span className="eyebrow text-gold-300">What&apos;s included</span>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
              Everything except the rush.
            </h2>
          </div>
          <ul className="grid grid-cols-2 gap-3 text-sm text-cream-100/85">
            {included.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-cream-50/15 px-4 py-3"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-page py-20">
        <figure className="mx-auto max-w-3xl text-center">
          <span
            aria-hidden="true"
            className="mx-auto mb-6 block h-1 w-12 rounded-full bg-gold-500"
          />
          <blockquote className="font-serif text-2xl leading-snug text-coffee-900 sm:text-3xl">
            &ldquo;We didn&apos;t just see the Philippines — we were welcomed
            into it. Every meal, every story, felt like a homecoming.&rdquo;
          </blockquote>
          <figcaption className="mt-6 text-xs uppercase tracking-widest text-coffee-700/70">
            Anna &amp; Ben · Cordillera Highland Loop, 2024
          </figcaption>
        </figure>
      </section>
    </>
  );
}
