import { Link } from "react-router-dom";

const principles = [
  {
    title: "Story first",
    body: "Every route begins with a story worth telling — the rest of the trip is built around it.",
  },
  {
    title: "Local always",
    body: "We hire, source, and sleep local. The communities we visit are partners, not stops.",
  },
  {
    title: "Honest pacing",
    body: "We would rather see less, deeper, than more, faster. Slowness is the design.",
  },
  {
    title: "Quiet luxury",
    body: "Heritage stays, small groups, thoughtful food — comfort without spectacle.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-cream-100">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent"
        />
        <div className="container-page py-20 md:py-24">
          <span className="eyebrow">Our intention</span>
          <h1 className="section-heading mt-3">About Heritage Philippines</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-coffee-800/90">
            We are a small team of storytellers, historians, and traveling
            cooks who believe the Philippines is best understood slowly —
            over long meals, in old rooms, and on the roads our grandparents
            walked.
          </p>
        </div>
      </section>

      <section className="container-page grid gap-12 py-16 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <span className="eyebrow">The studio</span>
          <h2 className="section-heading mt-3 text-3xl">
            Curators of a quieter trip.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-coffee-800/90">
            Heritage Philippines was founded to give travelers a way to meet
            the country the way locals do — without rush, without script.
          </p>
          <p className="mt-4 text-base leading-relaxed text-coffee-800/90">
            We design fewer trips a year than most operators run in a month,
            because every route is researched, walked, and rebuilt with the
            people who live it.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {principles.map((p) => (
            <article key={p.title} className="card">
              <span
                aria-hidden="true"
                className="inline-block h-1 w-10 rounded-full bg-gold-500"
              />
              <h3 className="mt-4 font-serif text-lg text-coffee-900">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-coffee-800/80">
                {p.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-coffee-900 text-cream-50">
        <div className="container-page grid gap-8 py-16 md:grid-cols-[2fr_1fr] md:items-center">
          <div>
            <span className="eyebrow text-gold-300">
              Begin the conversation
            </span>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
              Tell us where you&apos;d like to go.
            </h2>
            <p className="mt-4 max-w-xl text-cream-100/80">
              Every Heritage Philippines journey starts with a long
              conversation. Yours can too.
            </p>
          </div>
          <div className="flex md:justify-end">
            <Link to="/contact" className="btn-outline-light">
              Plan with Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
