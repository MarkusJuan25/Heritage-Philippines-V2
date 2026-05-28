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
      {/* HERO */}
      <section className="page-header">
        <div className="page-header__media">
          <img
            src="/images/a-festive-that-cant-miss.jpg"
            alt=""
            className="page-header__image"
            loading="eager"
          />
          <div className="page-header__shade" />
        </div>
        <div className="container-page relative pb-16 pt-36 sm:pt-40 md:pb-20 md:pt-44">
          <p className="eyebrow-light">A day on tour</p>
          <h1 className="mt-4 font-serif text-4xl text-balance text-cream-50 sm:text-5xl lg:text-6xl">
            Mornings without alarms.{" "}
            <span className="italic text-accent-gold">
              Conversations without scripts.
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream-100/85">
            Every Heritage Philippines tour is paced like a long conversation
            — rooms with windows, mornings without alarms, and time for the
            stories that don&apos;t fit on a brochure.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-warm-cream py-16">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-heritage opacity-80"
        />
        <div className="container-page relative">
          <div className="grid gap-6 md:grid-cols-3">
            {dayPlan.map((d) => (
              <article key={d.time} className="card-warm">
                <span
                  aria-hidden="true"
                  className="inline-block h-1 w-10 rounded-full bg-gradient-to-r from-gold-400 to-gold-600"
                />
                <span className="eyebrow mt-4 block">{d.time}</span>
                <h3 className="mt-2 font-serif text-xl text-coffee-900">
                  {d.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-coffee-800/85">
                  {d.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-forest-900 text-cream-50">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_85%_18%,rgba(216,177,109,0.22),transparent_55%),radial-gradient(circle_at_10%_90%,rgba(58,117,103,0.4),transparent_60%)]"
        />
        <div className="container-page relative grid gap-10 py-20 md:grid-cols-2 md:items-center">
          <div>
            <span className="eyebrow-light">What&apos;s included</span>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
              Everything except the rush.
            </h2>
          </div>
          <ul className="grid grid-cols-2 gap-3 text-sm text-cream-100/85">
            {included.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-cream-50/15 bg-cream-50/[0.05] px-4 py-3 backdrop-blur"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative overflow-hidden bg-warm-cream py-20">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-heritage opacity-70"
        />
        <div className="container-page relative">
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
        </div>
      </section>
    </>
  );
}
