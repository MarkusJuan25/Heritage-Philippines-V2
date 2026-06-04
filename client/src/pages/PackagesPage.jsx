import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import HeritageSection from "../components/HeritageSection";

// --- Static data ---
const packageStyles = [
  {
    title: "Premium Heritage Package",
    eyebrow: "Private comfort route",
    text: "A refined package for travelers who want boutique stays, private transfers, curated cultural stops, and a slower premium pace.",
    image: "/images/packages-luxury-feel/yacht-cruise.jpg",
    type: "Premium",
  },
  {
    title: "Honeymoon / Couple Heritage Package",
    eyebrow: "Romantic cultural escape",
    text: "A softer package for couples who want beautiful stays, meaningful places, private pacing, and quiet moments woven into the route.",
    image: "/images/homecoming-emotion/golden-hour.jpg",
    type: "Honeymoon / Couple",
  },
  {
    title: "Family Homecoming Package",
    eyebrow: "Family-centered route",
    text: "A warm package for balikbayan families, reunions, ancestry visits, and multi-generation travel with practical support.",
    image: "/images/homecoming-emotion/happy-family.jpg",
    type: "Family",
  },
  {
    title: "Group Heritage Package",
    eyebrow: "Group travel support",
    text: "A coordinated package for barkada, office, school, and regional group tours needing transport, timing, and hosting support.",
    image: "/images/a-glimpse-of-vigan-city.jpg",
    type: "Group",
  },
  {
    title: "Budget Heritage Package",
    eyebrow: "Light and practical",
    text: "A simpler package for travelers who want meaningful places, culture, and guidance with leaner logistics.",
    image: "/images/journey-culture-movement/townscape-in-night-at-manila.jpg",
    type: "Budget",
  },
];

const flexibleOptions = [
  {
    title: "Hotel + Tour Package",
    text: "Bundle a comfortable stay with transfers, guided stops, and destination pacing.",
    image: "/images/packages-luxury-feel/yacht-cruise.jpg",
  },
  {
    title: "Homestay + Tour Package",
    text: "Choose a warmer local stay with community feel, cultural immersion, and practical route planning.",
    image: "/images/homecoming-emotion/happy-family.jpg",
  },
  {
    title: "Eco-Tours / Private Tour",
    text: "Shape a private route around natural landscapes, cultural stops, slower pacing, and personal guide support.",
    image: "/images/experiences-destinations/beach-lagoon.jpg",
  },
  {
    title: "Daily Joiner Tours",
    text: "A future shared-tour option for travelers who prefer scheduled departures and a lighter package format.",
    image: "/images/marlboro-country-batanes-lanscapes.jpg",
  },
];

const featuredItineraries = [
  {
    title: "Bataan Heritage Route",
    duration: "3D2N",
    tag: "History Route",
    text: "History, Mt. Samat, Las Casas, coastal leisure, and local craft stops.",
    image: "/images/a-glimpse-of-vigan-city.jpg",
  },
  {
    title: "Bicol Adventure Day Tour",
    duration: "Day Tour",
    tag: "Adventure",
    text: "Mayon ATV, Cagsawa Ruins, Daraga Church, and Bicol food stops.",
    image: "/images/experiences-destinations/enjoying-the-spot.jpg",
  },
  {
    title: "Baguio Cool Highlands Escape",
    duration: "3D2N",
    tag: "Highlands",
    text: "Strawberry Farm, Burnham Park, Botanical Garden, Mines View, Camp John Hay, and night market.",
    image: "/images/home-hero-story-preview/misty-mountain.jpg",
  },
  {
    title: "Bacolod-Iloilo Heritage & Food Trail",
    duration: "5D4N",
    tag: "Food & Heritage",
    text: "Bacolod heritage, Silay ancestral houses, Iloilo churches, river esplanade, and food stops.",
    image: "/images/journey-culture-movement/family-cooking.jpg",
  },
  {
    title: "Alibijaban Island Getaway",
    duration: "3D2N",
    tag: "Island Escape",
    text: "Quezon island escape, sandbar, mangroves, beach leisure, and private dinner.",
    image: "/images/experiences-destinations/beach-lagoon.jpg",
  },
];

const STANDARD_PACKAGE_TYPES = [
  "Premium",
  "Honeymoon / Couple",
  "Family",
  "Group",
  "Solo",
  "Budget",
];
const PACKAGE_TYPE_OPTIONS = [...STANDARD_PACKAGE_TYPES, "Custom Package"];
const STANDARD_DEST_AREAS = ["Luzon", "Visayas", "Mindanao"];
const DEST_AREA_OPTIONS = [...STANDARD_DEST_AREAS, "Custom"];

// Fallback province list (V2 has no philippinesPackages.js yet)
// TODO: Replace with import from data/philippinesPackages when added to V2
const PROVINCE_FALLBACK = {
  Luzon: [
    "Bataan",
    "Batangas",
    "Benguet (Baguio)",
    "Cagayan",
    "Ilocos Norte",
    "Ilocos Sur",
    "Laguna",
    "Mountain Province",
    "Pampanga",
    "Quezon",
    "Rizal",
  ],
  Visayas: [
    "Bohol",
    "Cebu",
    "Iloilo",
    "Leyte",
    "Negros Occidental",
    "Negros Oriental",
    "Samar",
    "Siquijor",
  ],
  Mindanao: [
    "Bukidnon",
    "Cagayan de Oro",
    "Davao del Norte",
    "Davao del Sur",
    "Misamis Oriental",
    "South Cotabato",
    "Zamboanga del Norte",
  ],
};

const defaultQuote = {
  packageType: "Premium",
  destinationArea: "Luzon",
  province: "",
  startDate: "",
  endDate: "",
};

// V1-style stack position classifier.
// offset 0 → active, 1 → right, 2 → far-right,
// (n-1) → left, (n-2) → far-left, rest → hidden.
function getPackageStackPosition(index, activeIdx) {
  const total = packageStyles.length;
  const offset = (index - activeIdx + total) % total;

  if (offset === 0) return "is-active";
  if (offset === 1) return "is-right";
  if (offset === 2) return "is-far-right";
  if (offset === total - 1) return "is-left";
  if (offset === total - 2) return "is-far-left";
  return "is-hidden";
}

export default function PackagesPage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [quote, setQuote] = useState(defaultQuote);
  const [isCustomPkg, setIsCustomPkg] = useState(false);
  const [isCustomDest, setIsCustomDest] = useState(false);
  const quotePanelRef = useRef(null);

  // Auto-cycle showcase; pauses on hover / quote panel focus
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActiveIdx((i) => (i + 1) % packageStyles.length);
    }, 5000);
    return () => clearInterval(id);
  }, [paused]);

  const today = new Date().toISOString().split("T")[0];

  const provinceOptions = STANDARD_DEST_AREAS.includes(quote.destinationArea)
    ? (PROVINCE_FALLBACK[quote.destinationArea] ?? [])
    : [];

  const hasDestination = isCustomDest
    ? quote.destinationArea.trim().length > 0
    : STANDARD_DEST_AREAS.includes(quote.destinationArea)
    ? quote.province.length > 0
    : false;

  const isDateRangeValid =
    quote.startDate && quote.endDate && quote.endDate >= quote.startDate;

  const canQuote =
    Boolean(quote.packageType.trim()) &&
    Boolean(quote.destinationArea.trim()) &&
    hasDestination &&
    Boolean(isDateRangeValid);

  const updateQuote = (field, value) =>
    setQuote((q) => ({ ...q, [field]: value }));

  const handlePackageTypeChange = (val) => {
    if (val === "Custom Package") {
      setIsCustomPkg(true);
      setQuote((q) => ({ ...q, packageType: "" }));
    } else {
      setIsCustomPkg(false);
      updateQuote("packageType", val);
    }
  };

  const handleDestAreaChange = (val) => {
    if (val === "Custom") {
      setIsCustomDest(true);
      setQuote((q) => ({ ...q, destinationArea: "", province: "" }));
    } else {
      setIsCustomDest(false);
      setQuote((q) => ({ ...q, destinationArea: val, province: "" }));
    }
  };

  const handleChooseStyle = (idx) => {
    setActiveIdx(idx);
    setIsCustomPkg(false);
    setQuote((q) => ({ ...q, packageType: packageStyles[idx].type }));
  };

  const focusQuotePanel = () => {
    setPaused(true);
    quotePanelRef.current?.querySelector("select, input")?.focus();
  };

  return (
    <>
      {/* ================================================================
          PACKAGES BOOKING HERO — V1 class structure
          First screen = choose package style + plan quote.
          JourneyContext: not available in V2 yet → /contact fallback.
          DatePickerField: not ported → native date inputs (remaining gap).
      ================================================================ */}
      <section
        className="packages-booking-hero"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Atmospheric background */}
        <div className="packages-booking-hero__background">
          <img
            src="/images/packages-luxury-feel/yacht-cruise.jpg"
            alt=""
          />
          {/* Gold atmospheric highlight + dark veil */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 70% 50% at 82% 8%, rgba(190,142,43,0.16), transparent 55%)," +
                "linear-gradient(135deg, rgba(15,12,8,0.97) 0%, rgba(15,12,8,0.80) 55%, rgba(15,12,8,0.94) 100%)",
            }}
          />
        </div>

        {/* Booking console: stacked carousel (left) + quote planner (right) */}
        <div className="packages-booking-hero__inner">

          {/* ── Package style showcase ── */}
          <div className="packages-booking-hero__showcase">
            <div
              className="package-carousel package-carousel--hero"
              aria-live="polite"
            >
              {/* Stacked cards */}
              <div className="package-carousel__stack">
                {packageStyles.map((pkg, i) => {
                  const isActive = i === activeIdx;
                  const stackClass = getPackageStackPosition(i, activeIdx);

                  return (
                    <article
                      key={pkg.title}
                      className={`package-carousel__card package-carousel__card--hero package-carousel__card--stack ${stackClass}`}
                      aria-current={isActive ? "true" : undefined}
                    >
                      {/* Invisible full-cover button on non-active cards */}
                      {!isActive && (
                        <button
                          className="package-carousel__stack-hit"
                          type="button"
                          aria-label={`Choose ${pkg.title}`}
                          onClick={() => {
                            setPaused(true);
                            handleChooseStyle(i);
                          }}
                        />
                      )}

                      {/* Image area — cinematic gradient applied via CSS ::after */}
                      <div className="package-carousel__media">
                        <img
                          src={pkg.image}
                          alt={pkg.title}
                          loading={isActive ? "eager" : "lazy"}
                          decoding="async"
                        />
                      </div>

                      {/* Dark content area */}
                      <div className="package-carousel__content">
                        <p className="eyebrow-light">{pkg.eyebrow}</p>
                        <h3>{pkg.title}</h3>
                        <p>{pkg.text}</p>

                        {/* 2×2 meta tiles */}
                        <div className="package-carousel__meta">
                          <span>
                            <small>Package Style</small>
                            <strong>{pkg.type}</strong>
                          </span>
                          <span>
                            <small>Duration</small>
                            <strong>Flexible</strong>
                          </span>
                          <span>
                            <small>Destination</small>
                            <strong>Customizable</strong>
                          </span>
                          <span>
                            <small>Support</small>
                            <strong>Guided Planning</strong>
                          </span>
                        </div>

                        {/* Quick actions — active card only */}
                        {isActive && (
                          <div className="package-carousel__quick-actions">
                            <button
                              className="package-carousel__quote-shortcut"
                              type="button"
                              onClick={focusQuotePanel}
                            >
                              {canQuote ? "Review Quote" : "Request Quote"}
                            </button>
                            <button
                              className="package-add-program-btn package-add-program-btn--card"
                              type="button"
                              onClick={focusQuotePanel}
                            >
                              <span aria-hidden="true">★</span>
                              Avail Program
                            </button>
                          </div>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>

            </div>
          </div>

          {/* ── Quote planner panel ── */}
          {/*
            TODO (V2 gaps):
            - Wire openQuoteModal when JourneyContext is added to V2.
            - Wire addProgram / isProgramSelected for "Avail Program" when JourneyContext lands.
            - Port V1 custom DatePickerField calendar once calendar CSS is added.
            - Replace PROVINCE_FALLBACK with import from data/philippinesPackages when added.
            - Full V1 Journey drawer/autohide system should be restored later when
              JourneyContext and package data are ported to V2.
          */}
          <div
            ref={quotePanelRef}
            className="package-card-quote-panel package-card-quote-panel--hero package-card-quote-panel--premium"
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) {
                setPaused(false);
              }
            }}
            onPointerEnter={() => setPaused(true)}
            onPointerLeave={() => setPaused(false)}
          >
            <div className="package-quote-panel__header">
              <span>Plan your quote</span>
              <p>
                Choose the basics. Our team shapes the final route and
                inclusions around your dates.
              </p>
            </div>

            {/* Package Style */}
            <label
              className={`package-card-quote-field${
                isCustomPkg ? " package-card-quote-field--custom-mode" : ""
              }`}
              htmlFor="package-quote-package-type"
            >
              <div className="package-card-quote-field__top">
                <span>Package Style</span>
                {isCustomPkg && (
                  <button
                    className="package-card-quote-change"
                    type="button"
                    onClick={() => {
                      setIsCustomPkg(false);
                      updateQuote("packageType", "Premium");
                    }}
                  >
                    Change
                  </button>
                )}
              </div>
              {isCustomPkg ? (
                <input
                  id="package-quote-package-type"
                  type="text"
                  value={quote.packageType}
                  onChange={(e) =>
                    updateQuote("packageType", e.target.value)
                  }
                  placeholder="e.g. food tour, family reunion, barkada adventure…"
                />
              ) : (
                <select
                  id="package-quote-package-type"
                  value={quote.packageType}
                  onChange={(e) => handlePackageTypeChange(e.target.value)}
                >
                  {PACKAGE_TYPE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}
            </label>

            {/* Destination Area */}
            <label
              className={`package-card-quote-field${
                isCustomDest ? " package-card-quote-field--custom-mode" : ""
              }`}
              htmlFor="package-quote-destination-area"
            >
              <div className="package-card-quote-field__top">
                <span>Destination Area</span>
                {isCustomDest && (
                  <button
                    className="package-card-quote-change"
                    type="button"
                    onClick={() => {
                      setIsCustomDest(false);
                      setQuote((q) => ({
                        ...q,
                        destinationArea: "Luzon",
                        province: "",
                      }));
                    }}
                  >
                    Change
                  </button>
                )}
              </div>
              {isCustomDest ? (
                <input
                  id="package-quote-destination-area"
                  type="text"
                  value={quote.destinationArea}
                  onChange={(e) =>
                    updateQuote("destinationArea", e.target.value)
                  }
                  placeholder="e.g. Batanes + Ilocos, Cebu + Bohol, Bicol food trail…"
                />
              ) : (
                <select
                  id="package-quote-destination-area"
                  value={quote.destinationArea}
                  onChange={(e) => handleDestAreaChange(e.target.value)}
                >
                  {DEST_AREA_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}
            </label>

            {/* Province / Destination — only for Luzon / Visayas / Mindanao */}
            {STANDARD_DEST_AREAS.includes(quote.destinationArea) && (
              <label
                className="package-card-quote-field package-card-quote-field--wide"
                htmlFor="package-quote-province"
              >
                <span>Province / Destination</span>
                <select
                  id="package-quote-province"
                  value={quote.province}
                  onChange={(e) => updateQuote("province", e.target.value)}
                >
                  <option value="">Select province</option>
                  {provinceOptions.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </label>
            )}

            {/* Dates — native inputs (V1 custom DatePickerField not yet ported) */}
            <div className="grid grid-cols-2 gap-3">
              <label
                className="package-card-quote-field package-card-quote-field--date"
                htmlFor="package-quote-startDate"
              >
                <span>Start Date</span>
                <input
                  id="package-quote-startDate"
                  type="date"
                  min={today}
                  value={quote.startDate}
                  onChange={(e) => {
                    const val = e.target.value;
                    setQuote((q) => ({
                      ...q,
                      startDate: val,
                      endDate:
                        q.endDate && q.endDate < val ? "" : q.endDate,
                    }));
                  }}
                />
              </label>
              <label
                className="package-card-quote-field package-card-quote-field--date"
                htmlFor="package-quote-endDate"
              >
                <span>End Date</span>
                <input
                  id="package-quote-endDate"
                  type="date"
                  min={quote.startDate || today}
                  value={quote.endDate}
                  onChange={(e) => updateQuote("endDate", e.target.value)}
                />
              </label>
            </div>

            {/* Quote CTA — links to /contact until JourneyContext + openQuoteModal land in V2 */}
            <Link
              to="/contact"
              aria-disabled={!canQuote}
              onClick={(e) => {
                if (!canQuote) e.preventDefault();
              }}
              className={`package-quote-btn${
                canQuote
                  ? " package-quote-btn--gold"
                  : " package-quote-btn--disabled"
              }`}
            >
              {canQuote ? "Review Quote" : "Request Quote"}
            </Link>

            <p className="package-quote-panel__hint">
              {canQuote
                ? "Ready — your details will carry to the contact form."
                : "Choose a destination, province, and travel dates to unlock."}
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 2 — Flexible Package Options
      ================================================================ */}
      <HeritageSection variant="secondary" className="py-16 md:py-20">
        <div className="container-page">
          <div className="mb-10 text-center">
            <h2 className="font-serif text-3xl text-coffee-900 sm:text-4xl">
              Start with the format, then shape the journey.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-coffee-800/80">
              Choose a base travel format first. Our team adjusts the
              destination, hotel level, pacing, transfers, and guide support
              around your dates.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {flexibleOptions.map((pkg, i) => (
              <article
                key={pkg.title}
                className="group flex flex-col overflow-hidden rounded-2xl border border-cream-200/80 bg-gradient-to-b from-white to-cream-50 shadow-warm transition duration-500 hover:-translate-y-1 hover:shadow-premium"
              >
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-coffee-950/55 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gold-300 backdrop-blur">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-serif text-lg text-coffee-900">
                    {pkg.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-coffee-800/80">
                    {pkg.text}
                  </p>
                  <div className="mt-5 border-t border-cream-200 pt-4">
                    <Link
                      to="/contact"
                      className="text-sm font-semibold text-gold-600 transition hover:text-gold-700"
                    >
                      Inquire →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </HeritageSection>

      {/* ================================================================
          SECTION 3 — Featured Itineraries + Bespoke CTA
      ================================================================ */}
      <HeritageSection variant="primary" grow className="py-16 md:py-20">
        <div className="container-page">
          <div className="mb-10 text-center">
            <h2 className="font-serif text-3xl text-coffee-900 sm:text-4xl">
              Featured routes you can start from.
            </h2>
          </div>

          {/* Large featured itinerary */}
          <article className="group mb-8 flex flex-col overflow-hidden rounded-2xl border border-cream-200/80 bg-gradient-to-b from-white to-cream-50 shadow-premium md:flex-row">
            <div className="relative h-64 overflow-hidden md:h-auto md:w-5/12">
              <img
                src={featuredItineraries[0].image}
                alt={featuredItineraries[0].title}
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-gold-400/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-coffee-950">
                {featuredItineraries[0].tag}
              </span>
            </div>
            <div className="flex flex-1 flex-col justify-center p-8">
              <span className="eyebrow">{featuredItineraries[0].duration}</span>
              <h3 className="mt-2 font-serif text-2xl text-coffee-900 sm:text-3xl">
                {featuredItineraries[0].title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-coffee-800/85">
                {featuredItineraries[0].text}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/tour" className="btn-outline-dark text-sm">
                  View Tours
                </Link>
                <Link to="/contact" className="btn-primary text-sm">
                  Request Quote
                </Link>
              </div>
            </div>
          </article>

          {/* Smaller itinerary cards */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredItineraries.slice(1).map((it) => (
              <article
                key={it.title}
                className="group flex flex-col overflow-hidden rounded-2xl border border-cream-200/80 bg-gradient-to-b from-white to-cream-50 shadow-warm transition duration-500 hover:-translate-y-1 hover:shadow-premium"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={it.image}
                    alt={it.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-coffee-950/60 to-transparent" />
                  <span className="absolute inset-x-4 bottom-3 flex items-center justify-between">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-gold-300">
                      {it.tag}
                    </span>
                    <span className="rounded-full bg-coffee-950/55 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-cream-100 backdrop-blur">
                      {it.duration}
                    </span>
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-serif text-base text-coffee-900">
                    {it.title}
                  </h3>
                  <p className="mt-1.5 flex-1 text-xs leading-relaxed text-coffee-800/80">
                    {it.text}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-cream-200 pt-4">
                    <Link
                      to="/tour"
                      className="text-xs font-semibold text-gold-600 hover:text-gold-700"
                    >
                      View
                    </Link>
                    <Link
                      to="/contact"
                      className="text-xs font-semibold text-gold-500 hover:text-gold-500/80"
                    >
                      Request Quote →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Bespoke CTA */}
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
      </HeritageSection>
    </>
  );
}
