import { Link, useParams } from "react-router-dom";
import HeritageSection from "../components/HeritageSection";
import PageMeta from "../components/PageMeta.jsx";
import { findPackageBySlug, getRelatedPackages } from "../data/tourPackages.js";
import { useJourney } from "../context/JourneyContext";

function buildTourDescription(pkg) {
  const raw = pkg.overview || "";
  const text = raw.replace(/\s+/g, " ").trim();
  if (!text) {
    return `Explore the ${pkg.title} — a curated heritage journey through ${pkg.location || pkg.region}, Philippines.`;
  }
  if (text.length <= 160) return text;
  const cut = text.slice(0, 157);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 80 ? cut.slice(0, lastSpace) : cut) + "…";
}

export default function TourDetailPage() {
  const { slug } = useParams();
  const pkg = findPackageBySlug(slug);
  const { openQuoteModal, addProgram, isProgramSelected } = useJourney();

  if (!pkg) {
    return (
      <>
        <PageMeta
          title="Tour Not Found | Heritage Philippines"
          description="The requested Heritage Philippines tour could not be found or may have moved. Browse the complete collection of Philippine heritage tours."
          robots="noindex, nofollow"
        />
        <HeritageSection variant="primary" className="py-32">
        <div className="container-page text-center">
          <p className="font-serif text-5xl text-coffee-900/20">404</p>
          <h1 className="mt-4 font-serif text-2xl text-coffee-900">
            Tour not found
          </h1>
          <p className="mt-3 text-sm text-coffee-700/70">
            The route you are looking for does not exist or may have moved.
          </p>
          <Link
            to="/tour"
            className="mt-6 inline-block rounded-full bg-coffee-900 px-6 py-2.5 text-sm font-semibold text-cream-50 transition hover:bg-coffee-800"
          >
            ← Back to Tours
          </Link>
        </div>
      </HeritageSection>
      </>
    );
  }

  const related = getRelatedPackages(pkg);

  return (
    <>
      <PageMeta
        title={`${pkg.title} | Heritage Philippines`}
        description={buildTourDescription(pkg)}
        image={pkg.image}
        type="website"
      />
      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={pkg.image}
            alt={pkg.title}
            className="h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-coffee-950/70 via-coffee-950/50 to-coffee-950/80" />
        </div>

        <div className="container-page relative pb-16 pt-28 sm:pt-36 md:pb-20 md:pt-44">
          <Link
            to="/tour"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cream-100/70 transition hover:text-cream-50"
          >
            ← Back to Tours
          </Link>

          <div className="mt-5 max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-300">
              {pkg.islandGroup} &nbsp;·&nbsp; {pkg.region}
            </p>
            <h1 className="mt-3 font-serif text-3xl leading-tight tracking-wide text-cream-50 sm:text-4xl lg:text-5xl">
              {pkg.title}
            </h1>
            {pkg.location && (
              <p className="mt-3 flex items-center gap-1.5 text-sm text-cream-100/80">
                <svg
                  aria-hidden="true"
                  className="h-4 w-4 flex-shrink-0 text-gold-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                {pkg.location}
              </p>
            )}

            <div className="mt-5 flex flex-wrap gap-3">
              <span className="inline-flex items-center rounded-full border border-cream-50/20 bg-coffee-900/60 px-4 py-1.5 text-xs font-semibold text-cream-100 backdrop-blur">
                {pkg.duration}
              </span>
              <span className="inline-flex items-center rounded-full border border-cream-50/20 bg-coffee-900/60 px-4 py-1.5 text-xs font-semibold text-cream-100 backdrop-blur">
                {pkg.groupSize}
              </span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() =>
                openQuoteModal({
                  source: pkg.title,
                  category: pkg.category,
                  location: pkg.location,
                })
              }
              className="rounded-full bg-gold-500 px-6 py-2.5 text-sm font-bold text-coffee-950 transition hover:bg-gold-400"
            >
              Request Quote
            </button>
            <button
              type="button"
              disabled={isProgramSelected(pkg.slug)}
              onClick={() =>
                addProgram({ id: pkg.slug, title: pkg.title, type: "tour" })
              }
              className={`rounded-full border px-6 py-2.5 text-sm font-semibold transition ${
                isProgramSelected(pkg.slug)
                  ? "cursor-default border-gold-400/50 bg-gold-50/10 text-gold-300"
                  : "border-cream-50/30 bg-coffee-900/40 text-cream-50 backdrop-blur hover:border-cream-50/50 hover:bg-coffee-900/60"
              }`}
            >
              {isProgramSelected(pkg.slug) ? "✓ Added to Journey" : "+ Add to Journey"}
            </button>
          </div>
        </div>
      </section>

      {/* ── BODY ── */}
      <HeritageSection variant="primary" className="py-16 md:py-20">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1fr_320px]">

            {/* Left column — main content */}
            <div className="space-y-12">

              {/* Overview */}
              {pkg.overview && (
                <section>
                  <h2 className="font-serif text-2xl text-coffee-900">
                    About this route
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-coffee-800/85">
                    {pkg.overview}
                  </p>
                </section>
              )}

              {/* Route information — gateway, transport, best for, costing note */}
              {(pkg.gatewayBase || pkg.transport || pkg.bestFor || pkg.costingNote) && (
                <section>
                  <h2 className="font-serif text-2xl text-coffee-900">
                    Route information
                  </h2>
                  <dl className="mt-4 space-y-3">
                    {pkg.gatewayBase && (
                      <div className="rounded-xl border border-cream-200 bg-white px-4 py-3">
                        <dt className="text-[11px] font-bold uppercase tracking-wider text-coffee-700/50">
                          Gateway / Base
                        </dt>
                        <dd className="mt-1 text-sm text-coffee-800">
                          {pkg.gatewayBase}
                        </dd>
                      </div>
                    )}
                    {pkg.transport && (
                      <div className="rounded-xl border border-cream-200 bg-white px-4 py-3">
                        <dt className="text-[11px] font-bold uppercase tracking-wider text-coffee-700/50">
                          Getting There
                        </dt>
                        <dd className="mt-1 text-sm leading-relaxed text-coffee-800">
                          {pkg.transport}
                        </dd>
                      </div>
                    )}
                    {pkg.bestFor && (
                      <div className="rounded-xl border border-cream-200 bg-white px-4 py-3">
                        <dt className="text-[11px] font-bold uppercase tracking-wider text-coffee-700/50">
                          Best For
                        </dt>
                        <dd className="mt-1 text-sm text-coffee-800">
                          {pkg.bestFor}
                        </dd>
                      </div>
                    )}
                    {pkg.costingNote && (
                      <div className="rounded-xl border border-cream-200 bg-white px-4 py-3">
                        <dt className="text-[11px] font-bold uppercase tracking-wider text-coffee-700/50">
                          Costing Note
                        </dt>
                        <dd className="mt-1 text-sm leading-relaxed text-coffee-800">
                          {pkg.costingNote}
                        </dd>
                      </div>
                    )}
                  </dl>
                </section>
              )}

              {/* Itinerary */}
              {pkg.itinerary?.length > 0 && (
                <section>
                  <h2 className="font-serif text-2xl text-coffee-900">
                    Itinerary
                  </h2>
                  <div className="mt-5 space-y-6">
                    {pkg.itinerary.map((day) => (
                      <div
                        key={day.day}
                        className="rounded-2xl border border-cream-200 bg-white p-5 shadow-warm"
                      >
                        <p className="text-[11px] font-bold uppercase tracking-widest text-gold-600">
                          {day.day}
                        </p>
                        <h3 className="mt-1 font-serif text-lg text-coffee-900">
                          {day.title}
                        </h3>
                        {day.details?.length > 0 && (
                          <ul className="mt-3 space-y-1.5">
                            {day.details.map((detail, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-sm text-coffee-700/85"
                              >
                                <span
                                  aria-hidden="true"
                                  className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold-400"
                                />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Highlights */}
              {pkg.highlights?.length > 0 && (
                <section>
                  <h2 className="font-serif text-2xl text-coffee-900">
                    Highlights
                  </h2>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {pkg.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-coffee-700/85"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold-500"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Inclusions */}
              {pkg.inclusions?.length > 0 && (
                <section>
                  <h2 className="font-serif text-2xl text-coffee-900">
                    What is included
                  </h2>
                  <ul className="mt-4 space-y-2">
                    {pkg.inclusions.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-coffee-700/85"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-0.5 text-gold-500"
                        >
                          ✓
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Coordination support */}
              {pkg.supplierChecks?.length > 0 && (
                <section>
                  <h2 className="font-serif text-2xl text-coffee-900">
                    What we coordinate
                  </h2>
                  <ul className="mt-4 space-y-2">
                    {pkg.supplierChecks.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-coffee-700/85"
                      >
                        <span aria-hidden="true" className="mt-0.5 text-gold-500">
                          ✓
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Reminders */}
              {pkg.reminders?.length > 0 && (
                <section>
                  <h2 className="font-serif text-2xl text-coffee-900">
                    Important reminders
                  </h2>
                  <ul className="mt-4 space-y-3">
                    {pkg.reminders.map((item, i) => (
                      <li
                        key={i}
                        className="rounded-xl border border-gold-200/60 bg-gold-50/40 px-4 py-3 text-sm text-coffee-700/85"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Travel notes */}
              {pkg.travelNotes && (
                <section className="rounded-2xl border border-cream-200 bg-cream-50 px-6 py-5">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-coffee-700/50">
                    Travel Notes
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-coffee-700/80">
                    {pkg.travelNotes}
                  </p>
                </section>
              )}
            </div>

            {/* Right column — sticky CTA card */}
            <aside>
              <div className="sticky top-24 rounded-2xl border border-cream-200 bg-white p-6 shadow-warm">
                <p className="font-serif text-xl text-coffee-900">{pkg.title}</p>

                <div className="mt-4 space-y-2 text-xs text-coffee-700/75">
                  {pkg.location && (
                    <p>
                      <span className="font-semibold text-coffee-800">Location:</span>{" "}
                      {pkg.location}
                    </p>
                  )}
                  <p>
                    <span className="font-semibold text-coffee-800">Duration:</span>{" "}
                    {pkg.duration}
                  </p>
                  <p>
                    <span className="font-semibold text-coffee-800">Group size:</span>{" "}
                    {pkg.groupSize}
                  </p>
                  <p>
                    <span className="font-semibold text-coffee-800">Pricing:</span>{" "}
                    {pkg.price}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    openQuoteModal({
                      source: pkg.title,
                      category: pkg.category,
                      location: pkg.location,
                    })
                  }
                  className="mt-5 w-full rounded-full bg-gold-500 py-2.5 text-sm font-bold text-coffee-950 transition hover:bg-gold-400"
                >
                  Request Quote
                </button>

                <button
                  type="button"
                  disabled={isProgramSelected(pkg.slug)}
                  onClick={() =>
                    addProgram({ id: pkg.slug, title: pkg.title, type: "tour" })
                  }
                  className={`mt-2.5 w-full rounded-full border py-2.5 text-sm font-semibold transition ${
                    isProgramSelected(pkg.slug)
                      ? "cursor-default border-gold-400/60 bg-gold-50 text-gold-700"
                      : "border-coffee-900 bg-coffee-900 text-cream-50 hover:bg-coffee-800"
                  }`}
                >
                  {isProgramSelected(pkg.slug) ? "✓ Added" : "+ Add to Journey"}
                </button>

                <Link
                  to="/tour"
                  className="mt-4 block text-center text-xs text-coffee-700/60 transition hover:text-coffee-900"
                >
                  ← Back to all tours
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </HeritageSection>

      {/* ── RELATED PACKAGES ── */}
      {related.length > 0 && (
        <section className="border-t border-cream-200 bg-cream-50 py-16">
          <div className="container-page">
            <h2 className="font-serif text-2xl text-coffee-900">
              Related routes
            </h2>
            <p className="mt-2 text-sm text-coffee-700/70">
              More heritage routes from the same region or island group.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  to={`/tour/${item.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-cream-200/80 bg-white shadow-warm transition duration-300 hover:-translate-y-1 hover:shadow-premium"
                >
                  <div className="relative h-44 w-full overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-coffee-950/60 to-transparent" />
                    <span className="absolute left-3 top-3 rounded-full bg-coffee-950/55 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-gold-300 backdrop-blur">
                      {item.islandGroup}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-coffee-700/60">
                      {item.region}
                    </p>
                    <h3 className="mt-1 font-serif text-base leading-snug text-coffee-900">
                      {item.title}
                    </h3>
                    <p className="mt-auto pt-3 text-[11px] font-semibold text-gold-600 transition group-hover:text-gold-500">
                      View route →
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
