import { Link } from "react-router-dom";
import HeritageSection from "../components/HeritageSection";

const WHY_CARDS = [
  {
    title: "Rooted Heritage Routes",
    body: "Every itinerary is built around genuine Philippine heritage — colonial towns, living traditions, ancestral homes, and stories that belong to the land.",
  },
  {
    title: "Family & Group-Ready",
    body: "We design for families, multi-generational groups, and small parties who want depth, not just distance covered.",
  },
  {
    title: "Guided by Local Knowledge",
    body: "Our coordination draws from decades of Philippine travel expertise. Routes are researched, walked, and curated by people who know the country intimately.",
  },
  {
    title: "Hotel & Transfer Support",
    body: "We handle accommodation recommendations, airport transfers, and inter-destination logistics so your group can focus on the journey.",
  },
  {
    title: "Visa & Insurance Assistance",
    body: "Our team can guide you through entry requirements and travel insurance options so you arrive prepared and covered.",
  },
  {
    title: "Direct & Personal Service",
    body: "No agency layers. Every inquiry reaches a real person who will walk through your options and build a proposal around your specific needs.",
  },
];

const PRINCIPLES = [
  {
    title: "Meaningful routes",
    body: "Every route is designed around what makes a place worth knowing — its history, its people, and the stories that are still being lived.",
  },
  {
    title: "Careful coordination",
    body: "Logistics are handled with attention to detail — from hotel selection and transfers to itinerary pacing — so the journey feels effortless.",
  },
  {
    title: "Respect for communities",
    body: "The destinations we visit are treated as partners. We travel with care for the culture, the environment, and the people who call these places home.",
  },
];

const SUPPORT_ITEMS = [
  "Itinerary planning & coordination",
  "Domestic & international ticketing",
  "Hotel & transfer arrangements",
  "Visa guidance & insurance coordination",
];

export default function AboutPage() {
  return (
    <>
      {/* ── Section 1: Editorial intro + brand card ──────────────────── */}
      <HeritageSection variant="primary" className="pb-16 pt-28 sm:pt-32 md:pt-36">
        <div className="container-page grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">

          {/* Left: editorial copy */}
          <div>
            <p className="eyebrow">About Heritage Philippines</p>
            <h1 className="mt-4 font-serif text-3xl text-coffee-900 sm:text-4xl lg:text-5xl">
              Created for travelers who want{" "}
              <span className="italic text-forest-700">
                more than sightseeing.
              </span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-coffee-800/90">
              Heritage Philippines is a travel service dedicated to the real
              Philippines — its colonial towns, highland communities, island
              heritage, and the living traditions that define each region. We
              plan journeys that go beyond the postcard.
            </p>
            <p className="mt-4 text-base leading-relaxed text-coffee-800/90">
              Every inquiry is handled personally. Every itinerary is built
              around your family, your pace, and the memories you want to carry
              home. Whether you are tracing ancestral roots, celebrating a
              milestone, or simply looking to experience the country at its
              most authentic, we are here to build that with you.
            </p>
            <p className="mt-4 text-base leading-relaxed text-coffee-800/90">
              Heritage Philippines is supported by High Light Tours Inc., a
              licensed Philippine travel agency, ensuring full travel-care
              coverage — from ticketing and hotel arrangements to visa guidance
              and insurance coordination.
            </p>
          </div>

          {/* Right: brand / support card */}
          <div className="card-warm p-7">
            <div className="mb-5 flex items-center gap-3">
              <img
                src="/images/logo.png"
                alt="Heritage Philippines"
                className="h-10 w-auto object-contain"
                loading="lazy"
              />
            </div>
            <h2 className="font-serif text-xl text-coffee-900">
              Heritage Philippines
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-coffee-800/80">
              A curated Philippine heritage travel service — personal, rooted,
              and family-ready.
            </p>

            <div className="mt-5 border-t border-cream-200 pt-5">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-coffee-700/55">
                Travel support by
              </p>
              <p className="mt-1 text-sm font-semibold text-coffee-900">
                High Light Tours Inc.
              </p>
              <p className="mt-1 text-xs leading-relaxed text-coffee-700/70">
                Licensed Philippine travel agency · ticketing · hotel &amp;
                transfers · visa assistance · travel insurance coordination
              </p>
            </div>

            <div className="mt-5 border-t border-cream-200 pt-5">
              <p className="text-xs leading-relaxed text-coffee-700/65">
                To start an inquiry, reach out through the Contact Us page.
                Our team will respond within two business days.
              </p>
              <Link
                to="/contact"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-forest-700 transition-colors hover:text-forest-900"
              >
                Go to Contact Us →
              </Link>
            </div>
          </div>

        </div>
      </HeritageSection>

      {/* ── Section 2: Why choose us ─────────────────────────────────── */}
      <HeritageSection variant="secondary" className="py-16">
        <div className="container-page">
          <div className="mb-10 max-w-xl">
            <p className="eyebrow">Why Heritage Philippines</p>
            <h2 className="section-heading mt-3">
              What makes our service different.
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_CARDS.map((c) => (
              <article key={c.title} className="card-warm p-6">
                <h3 className="font-serif text-lg text-coffee-900">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-coffee-800/80">
                  {c.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </HeritageSection>

      {/* ── Section 3: Vision & Mission ──────────────────────────────── */}
      <HeritageSection variant="primary" className="py-16">
        <div className="container-page">
          <div className="mb-10 max-w-xl">
            <p className="eyebrow">Our direction</p>
            <h2 className="section-heading mt-3">Vision &amp; Mission</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="card-warm p-7">
              <span
                aria-hidden="true"
                className="inline-block h-1 w-10 rounded-full bg-gradient-to-r from-gold-400 to-gold-600"
              />
              <h3 className="mt-4 font-serif text-xl text-coffee-900">
                Vision
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-coffee-800/85">
                To be the most trusted guide for meaningful Philippine heritage
                travel — connecting families and travelers to the living
                culture, history, and beauty of the Philippines in a way that
                is personal, responsible, and lasting.
              </p>
            </div>
            <div className="card-warm p-7">
              <span
                aria-hidden="true"
                className="inline-block h-1 w-10 rounded-full bg-gradient-to-r from-forest-600 to-forest-800"
              />
              <h3 className="mt-4 font-serif text-xl text-coffee-900">
                Mission
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-coffee-800/85">
                To design and coordinate heritage journeys across the Philippine
                archipelago that honor local culture, support communities, and
                give every traveler a story worth telling — handled with care,
                precision, and genuine warmth from the first inquiry to the
                last day of the trip.
              </p>
            </div>
          </div>
        </div>
      </HeritageSection>

      {/* ── Section 4: Guiding principles ────────────────────────────── */}
      <HeritageSection variant="secondary" className="py-16">
        <div className="container-page">
          <div className="mb-10 max-w-xl">
            <p className="eyebrow">How we work</p>
            <h2 className="section-heading mt-3">Guiding principles.</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <article key={p.title} className="card-warm p-6">
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
        </div>
      </HeritageSection>

      {/* ── Section 5: Trust / High Light Tours support panel ────────── */}
      <section className="relative isolate overflow-hidden bg-coffee-950 text-cream-50">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(58,117,103,0.30),transparent_55%),radial-gradient(circle_at_85%_75%,rgba(216,177,109,0.18),transparent_55%)]"
        />
        <div className="container-page relative py-16">
          <p className="eyebrow-light">Travel care &amp; support</p>
          <h2 className="mt-3 font-serif text-3xl text-cream-50 sm:text-4xl">
            Full support from inquiry to return.
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-cream-100/80">
            Heritage Philippines journeys are supported by{" "}
            <strong className="font-semibold text-cream-100">
              High Light Tours Inc.
            </strong>
            , a licensed Philippine travel agency. This means your travel care
            is covered end-to-end — from itinerary planning and ticketing, to
            hotel arrangements, transfer coordination, visa guidance, and
            travel insurance assistance.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SUPPORT_ITEMS.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-cream-50/10 bg-cream-50/[0.06] px-5 py-4 text-sm text-cream-100/85 backdrop-blur-sm"
              >
                <span
                  aria-hidden="true"
                  className="mb-2 block h-0.5 w-8 rounded-full bg-gold-400/60"
                />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 6: Final CTA ──────────────────────────────────────── */}
      <HeritageSection variant="primary" className="py-20">
        <div className="container-page text-center">
          <p className="eyebrow mx-auto">Start your journey</p>
          <h2 className="section-heading mx-auto mt-4 max-w-xl">
            Ready to plan a meaningful journey?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-coffee-800/80">
            Browse our heritage packages or send a direct inquiry — our team
            will reply with a proposal built around your family, your pace,
            and the Philippines you want to discover.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/packages" className="btn-primary">
              Explore Packages
            </Link>
            <Link to="/contact" className="btn-outline-dark">
              Request a Quote
            </Link>
          </div>
        </div>
      </HeritageSection>
    </>
  );
}
