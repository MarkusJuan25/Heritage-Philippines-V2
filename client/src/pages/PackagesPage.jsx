import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import HeritageSection from "../components/HeritageSection";
import { provincePackages } from "../data/philippinesPackages";
import { useJourney } from "../context/JourneyContext";

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
    text: "Bundle a boutique hotel or resort stay with private transfers, curated guided stops, and full destination pacing — ideal for Premium, Couple, and Family packages.",
    image: "/images/packages-luxury-feel/yacht-cruise.jpg",
  },
  {
    title: "Homestay + Tour Package",
    text: "Choose a warm local stay — a heritage house, family home, or small community inn — woven into a curated cultural route with guided support.",
    image: "/images/homecoming-emotion/happy-family.jpg",
  },
  {
    title: "Eco-Tours / Private Tour",
    text: "A private route shaped around landscapes, nature encounters, community culture, slower pacing, and a dedicated guide who knows the region.",
    image: "/images/experiences-destinations/beach-lagoon.jpg",
  },
  {
    title: "Daily Joiner Tours",
    text: "Join a scheduled group departure for shared discovery. Lighter logistics, flexible start, and a practical format for solo travelers and budget-minded groups.",
    image: "/images/marlboro-country-batanes-lanscapes.jpg",
  },
];

const featuredItineraries = [
  {
    title: "Bataan Heritage Route",
    duration: "3D2N",
    tag: "History Route",
    text: "A three-day reflection and heritage route — Mt. Samat Cross, Las Casas Filipinas de Acuzar, a Corregidor Island option, coastal leisure, and local craft stops woven into the schedule.",
    highlights: [
      "Mt. Samat Shrine and Cross",
      "Las Casas Filipinas de Acuzar",
      "Corregidor Island optional daytrip",
      "Local craft and coastal stop",
    ],
    image: "/images/a-glimpse-of-vigan-city.jpg",
  },
  {
    title: "Bicol Adventure Day Tour",
    duration: "Day Tour",
    tag: "Adventure",
    text: "A full-day Bicol circuit — Mayon Volcano ATV, Cagsawa Ruins, Daraga Church, a local Bicol Express food stop, and a scenic return by evening.",
    image: "/images/experiences-destinations/enjoying-the-spot.jpg",
  },
  {
    title: "Baguio Cool Highlands Escape",
    duration: "3D2N",
    tag: "Highlands",
    text: "Three days in the highland city — Strawberry Farm, Burnham Park, Botanical Garden, Mines View, Camp John Hay, pine forest walks, and a Baguio night market experience.",
    image: "/images/home-hero-story-preview/misty-mountain.jpg",
  },
  {
    title: "Bacolod-Iloilo Heritage & Food Trail",
    duration: "5D4N",
    tag: "Food & Heritage",
    text: "Five days across Western Visayas — Bacolod sugar heritage, Silay ancestral houses, the Iloilo river esplanade, Miagao Church, regional food stops, and a negrense feast before departure.",
    image: "/images/journey-culture-movement/family-cooking.jpg",
  },
  {
    title: "Alibijaban Island Getaway",
    duration: "3D2N",
    tag: "Island Escape",
    text: "A Quezon island escape — Alibijaban sandbar, mangrove kayak, a quiet beach stretch, a private island dinner, and sunrise views before the return sea crossing.",
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

// Province list derived from real philippinesPackages data
const PROVINCE_MAP = ["Luzon", "Visayas", "Mindanao"].reduce((acc, grp) => {
  acc[grp] = [
    ...new Set(
      provincePackages.filter((p) => p.islandGroup === grp).map((p) => p.province)
    ),
  ].sort();
  return acc;
}, {});

const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const defaultQuote = {
  packageType: "",
  destinationArea: "",
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
  const { addProgram, isProgramSelected, openQuoteModal, programs } = useJourney();

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
    ? (PROVINCE_MAP[quote.destinationArea] ?? [])
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

  const handleOpenQuoteModal = () => {
    openQuoteModal({
      packageType: quote.packageType,
      destinationArea: quote.destinationArea,
      province: quote.province,
      startDate: quote.startDate,
      endDate: quote.endDate,
      isCustomDest,
      programs,
    });
  };

  // Precomputed for the large featured itinerary card (avoids IIFE in JSX)
  const it0Id = slugify(featuredItineraries[0].title);
  const it0Added = isProgramSelected(it0Id);

  return (
    <>
      {/* ================================================================
          PACKAGES BOOKING HERO — V1 class structure
          First screen = choose package style + plan quote.
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
                  const programId = slugify(pkg.type);
                  const programAdded = isProgramSelected(programId);

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
                              className={`package-add-program-btn package-add-program-btn--card${programAdded ? " package-add-program-btn--added" : ""}`}
                              type="button"
                              disabled={programAdded}
                              onClick={() =>
                                addProgram({
                                  id: programId,
                                  title: pkg.title,
                                  type: "package-style",
                                })
                              }
                            >
                              <span aria-hidden="true">{programAdded ? "✓" : "★"}</span>
                              {programAdded ? "Added to Journey" : "Avail Program"}
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
                  <option value="" disabled>
                    Choose package
                  </option>
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
                  <option value="" disabled>
                    Choose Destination
                  </option>
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
                  <option value="" disabled>Select province</option>
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

            {/* Quote CTA — opens journey/quote modal when form is valid */}
            <button
              type="button"
              disabled={!canQuote}
              onClick={canQuote ? handleOpenQuoteModal : undefined}
              className={`package-quote-btn${
                canQuote
                  ? " package-quote-btn--gold"
                  : " package-quote-btn--disabled"
              }`}
            >
              {canQuote ? "Review Quote" : "Request Quote"}
            </button>

            <p className="package-quote-panel__hint">
              {canQuote
                ? "Ready — review your quote and send to our team."
                : "Choose a destination, province, and travel dates to unlock."}
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 2 — Flexible Package Options
          Warm parchment background, editorial cards, clear actions
      ================================================================ */}
      <section className="packages-flexible-options">
        <div className="container-page">
          <div className="packages-flexible-options__heading">
            <span className="eyebrow">Travel Format</span>
            <h2>Start with your format, then shape the route.</h2>
            <p>
              Choose how you want to travel — hotel, homestay, private, or
              group. Our team builds the destination, pacing, transfers, and
              inclusions around your specific dates and group.
            </p>
          </div>

          <div className="packages-flexible-options__grid">
            {flexibleOptions.map((pkg, i) => {
              const fid = slugify(pkg.title);
              const fadded = isProgramSelected(fid);
              return (
                <article key={pkg.title} className="packages-flexible-card group">
                  <div className="packages-flexible-card__media">
                    <img src={pkg.image} alt={pkg.title} loading="lazy" />
                    <span className="packages-flexible-card__index" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="packages-flexible-card__body">
                    <h3>{pkg.title}</h3>
                    <p>{pkg.text}</p>
                    <div className="packages-flexible-card__actions">
                      <button
                        type="button"
                        disabled={fadded}
                        onClick={() =>
                          addProgram({ id: fid, title: pkg.title, type: "flexible-package" })
                        }
                        className={`packages-flexible-card__add-btn${
                          fadded ? " packages-flexible-card__add-btn--added" : ""
                        }`}
                      >
                        {fadded ? "✓ Added to Journey" : "Add to My Journey"}
                      </button>
                      <Link to="/contact" className="packages-flexible-card__inquire">
                        Inquire →
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <p className="packages-flexible-options__note">
            All formats are adjustable — our team shapes inclusions, transfers,
            and pacing around your confirmed dates and group.
          </p>
        </div>
      </section>

      {/* ================================================================
          SECTION 3 — Route Journal
          Dark coffee background, editorial feature + mini grid
      ================================================================ */}
      <section className="packages-route-journal">
        <div className="container-page">
          <div className="packages-route-journal__heading">
            <span className="eyebrow-light">Sample Heritage Routes</span>
            <h2>Featured itineraries to start your journey.</h2>
            <p>
              Reference routes — fully adjustable around your group, dates,
              budget, and cultural interests.
            </p>
          </div>

          <div className="packages-route-journal__layout">
            {/* Large featured itinerary */}
            <article className="packages-route-feature group">
              <div className="packages-route-feature__media">
                <img
                  src={featuredItineraries[0].image}
                  alt={featuredItineraries[0].title}
                  loading="lazy"
                />
                <span className="packages-route-feature__tag">
                  {featuredItineraries[0].tag}
                </span>
              </div>
              <div className="packages-route-feature__body">
                <span className="eyebrow-light">{featuredItineraries[0].duration}</span>
                <h3>{featuredItineraries[0].title}</h3>
                <p>{featuredItineraries[0].text}</p>
                {featuredItineraries[0].highlights && (
                  <ul className="packages-route-feature__highlights">
                    {featuredItineraries[0].highlights.map((h) => (
                      <li key={h}>
                        <span aria-hidden="true">✦</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="packages-route-feature__actions">
                  <button
                    type="button"
                    disabled={it0Added}
                    onClick={() =>
                      addProgram({
                        id: it0Id,
                        title: featuredItineraries[0].title,
                        type: "itinerary",
                        duration: featuredItineraries[0].duration,
                      })
                    }
                    className={
                      it0Added
                        ? "packages-route-feature__add--added"
                        : "packages-route-feature__add"
                    }
                  >
                    {it0Added ? "✓ Added to Journey" : "Add to My Journey"}
                  </button>
                  <button
                    type="button"
                    onClick={handleOpenQuoteModal}
                    className="packages-route-feature__quote"
                  >
                    Request Quote
                  </button>
                  <Link to="/tour" className="packages-route-feature__view">
                    View Tours →
                  </Link>
                </div>
              </div>
            </article>

            {/* Mini itinerary cards — stacked right column */}
            <div className="packages-route-list">
              {featuredItineraries.slice(1).map((it) => {
                const itId = slugify(it.title);
                const itAdded = isProgramSelected(itId);
                return (
                  <article key={it.title} className="packages-route-mini group">
                    <div className="packages-route-mini__media">
                      <img src={it.image} alt={it.title} loading="lazy" />
                      <div className="packages-route-mini__overlay" />
                      <span className="packages-route-mini__meta">
                        <span className="packages-route-mini__meta-tag">{it.tag}</span>
                        <span className="packages-route-mini__meta-dur">{it.duration}</span>
                      </span>
                    </div>
                    <div className="packages-route-mini__body">
                      <h3>{it.title}</h3>
                      <p>{it.text}</p>
                      <div className="packages-route-mini__actions">
                        <button
                          type="button"
                          onClick={() =>
                            openQuoteModal({
                              source: it.title,
                              duration: it.duration,
                              programs,
                            })
                          }
                          className="packages-route-mini__quote"
                        >
                          Quote
                        </button>
                        <button
                          type="button"
                          disabled={itAdded}
                          onClick={() =>
                            addProgram({
                              id: itId,
                              title: it.title,
                              type: "itinerary",
                              duration: it.duration,
                            })
                          }
                          className={`packages-route-mini__add-btn${
                            itAdded ? " packages-route-mini__add-btn--added" : ""
                          }`}
                        >
                          {itAdded ? "✓ Added" : "+ My Journey"}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
