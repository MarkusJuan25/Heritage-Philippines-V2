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

const STANDARD_PACKAGE_TYPES = ["Premium", "Honeymoon / Couple", "Family", "Group", "Solo", "Budget"];
const PACKAGE_TYPE_OPTIONS = [...STANDARD_PACKAGE_TYPES, "Custom Package"];
const STANDARD_DEST_AREAS = ["Luzon", "Visayas", "Mindanao"];
const DEST_AREA_OPTIONS = [...STANDARD_DEST_AREAS, "Custom"];

const PROVINCE_FALLBACK = {
  Luzon: [
    "Bataan", "Batangas", "Benguet (Baguio)", "Cagayan",
    "Ilocos Norte", "Ilocos Sur", "Laguna", "Mountain Province",
    "Pampanga", "Quezon", "Rizal",
  ],
  Visayas: [
    "Bohol", "Cebu", "Iloilo", "Leyte",
    "Negros Occidental", "Negros Oriental", "Samar", "Siquijor",
  ],
  Mindanao: [
    "Bukidnon", "Cagayan de Oro", "Davao del Norte", "Davao del Sur",
    "Misamis Oriental", "South Cotabato", "Zamboanga del Norte",
  ],
};

const defaultQuote = {
  packageType: "Premium",
  destinationArea: "Luzon",
  province: "",
  startDate: "",
  endDate: "",
};

export default function PackagesPage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [quote, setQuote] = useState(defaultQuote);
  const [isCustomPkg, setIsCustomPkg] = useState(false);
  const [isCustomDest, setIsCustomDest] = useState(false);
  const quotePanelRef = useRef(null);

  // Auto-cycle package showcase, pauses while quote panel or card is hovered/focused
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActiveIdx((i) => (i + 1) % packageStyles.length);
    }, 5000);
    return () => clearInterval(id);
  }, [paused]);

  const today = new Date().toISOString().split("T")[0];
  const active = packageStyles[activeIdx];

  const provinceOptions = STANDARD_DEST_AREAS.includes(quote.destinationArea)
    ? PROVINCE_FALLBACK[quote.destinationArea] ?? []
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
      {/* PAGE HERO */}
      <section className="page-header">
        <div className="page-header__media">
          <img
            src="/images/banaue-rice-terreces.jpg"
            alt=""
            className="page-header__image"
            loading="eager"
          />
          <div className="page-header__shade" />
        </div>
        <div className="container-page relative pb-16 pt-36 sm:pt-40 md:pb-20 md:pt-44">
          <p className="eyebrow-light">Curated Journeys</p>
          <h1 className="mt-4 text-balance font-serif text-4xl text-cream-50 sm:text-5xl lg:text-6xl">
            Packages designed at the{" "}
            <span className="italic text-accent-gold">pace of place.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream-100/85">
            Hand-built heritage routes across the archipelago. Travel small,
            travel slowly, and travel with the people who know the land best.
          </p>
        </div>
      </section>

      {/* SECTION 1 — Package Showcase + Quote Planner */}
      <HeritageSection variant="primary" className="py-16 md:py-24">
        <div className="container-page">
          <div className="mb-10 text-center">
            <span className="eyebrow">Choose Your Style</span>
            <h2 className="mt-3 font-serif text-3xl text-coffee-900 sm:text-4xl">
              Find the package that fits your journey.
            </h2>
          </div>

          <div
            className="grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Package style showcase */}
            <div>
              <article className="group overflow-hidden rounded-2xl border border-cream-200/80 bg-gradient-to-b from-white to-cream-50 shadow-premium transition duration-500">
                <div className="relative h-72 w-full overflow-hidden sm:h-80">
                  <img
                    key={active.image}
                    src={active.image}
                    alt={active.title}
                    loading="eager"
                    className="h-full w-full object-cover transition duration-700"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-coffee-950/75 to-transparent" />
                  <div className="absolute inset-x-6 bottom-6">
                    <p className="eyebrow-light text-[10px]">{active.eyebrow}</p>
                    <h3 className="mt-1 font-serif text-xl text-cream-50">
                      {active.title}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm leading-relaxed text-coffee-800/85">
                    {active.text}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2 border-t border-cream-200 pt-5">
                    {["Duration: Flexible", "Destination: Customizable", "Support: Guided Planning"].map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full border border-cream-200 px-3 py-1 text-xs text-coffee-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={focusQuotePanel}
                    className="btn-outline-dark mt-6 text-sm"
                  >
                    Plan This Package →
                  </button>
                </div>
              </article>

              {/* Prev / dot indicators / next */}
              <div className="mt-5 flex items-center justify-center gap-4">
                <button
                  type="button"
                  aria-label="Previous package style"
                  onClick={() => {
                    setPaused(true);
                    setActiveIdx((i) => (i - 1 + packageStyles.length) % packageStyles.length);
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-cream-200 bg-white text-coffee-700 shadow-soft transition hover:border-gold-400 hover:text-gold-500"
                >
                  ‹
                </button>
                <div className="flex gap-2">
                  {packageStyles.map((pkg, i) => (
                    <button
                      key={pkg.title}
                      type="button"
                      aria-label={`View ${pkg.title}`}
                      onClick={() => handleChooseStyle(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === activeIdx
                          ? "w-6 bg-gold-500"
                          : "w-2 bg-cream-200 hover:bg-gold-400"
                      }`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  aria-label="Next package style"
                  onClick={() => {
                    setPaused(true);
                    setActiveIdx((i) => (i + 1) % packageStyles.length);
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-cream-200 bg-white text-coffee-700 shadow-soft transition hover:border-gold-400 hover:text-gold-500"
                >
                  ›
                </button>
              </div>

              {/* Thumbnail strip */}
              <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                {packageStyles.map((pkg, i) => (
                  <button
                    key={pkg.title}
                    type="button"
                    onClick={() => handleChooseStyle(i)}
                    className={`flex-shrink-0 overflow-hidden rounded-lg border-2 transition ${
                      i === activeIdx
                        ? "border-gold-400 opacity-100"
                        : "border-transparent opacity-55 hover:opacity-85"
                    }`}
                  >
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      loading="lazy"
                      className="h-12 w-16 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Quote planner panel */}
            <div
              ref={quotePanelRef}
              className="rounded-2xl border border-cream-200/80 bg-white/90 p-6 shadow-premium backdrop-blur-sm lg:self-start"
              onFocus={() => setPaused(true)}
            >
              <p className="eyebrow mb-1">Plan Your Quote</p>
              <p className="mb-5 text-xs leading-relaxed text-coffee-700/80">
                Choose the basics. Our team will shape the final route and inclusions.
              </p>

              {/* Package Style */}
              <div className="mb-4">
                <div className="mb-1 flex items-center justify-between">
                  <label htmlFor="pkg-type" className="field-label">
                    Package Style
                  </label>
                  {isCustomPkg && (
                    <button
                      type="button"
                      className="text-[11px] font-semibold text-forest-700 hover:underline"
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
                    id="pkg-type"
                    type="text"
                    className="field-input"
                    value={quote.packageType}
                    onChange={(e) => updateQuote("packageType", e.target.value)}
                    placeholder="e.g. food tour, family reunion, barkada adventure…"
                  />
                ) : (
                  <select
                    id="pkg-type"
                    className="field-input"
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
              </div>

              {/* Destination Area */}
              <div className="mb-4">
                <div className="mb-1 flex items-center justify-between">
                  <label htmlFor="dest-area" className="field-label">
                    Destination Area
                  </label>
                  {isCustomDest && (
                    <button
                      type="button"
                      className="text-[11px] font-semibold text-forest-700 hover:underline"
                      onClick={() => {
                        setIsCustomDest(false);
                        setQuote((q) => ({ ...q, destinationArea: "Luzon", province: "" }));
                      }}
                    >
                      Change
                    </button>
                  )}
                </div>
                {isCustomDest ? (
                  <input
                    id="dest-area"
                    type="text"
                    className="field-input"
                    value={quote.destinationArea}
                    onChange={(e) => updateQuote("destinationArea", e.target.value)}
                    placeholder="e.g. Batanes + Ilocos, Cebu + Bohol, Bicol food trail…"
                  />
                ) : (
                  <select
                    id="dest-area"
                    className="field-input"
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
              </div>

              {/* Province — only for standard areas */}
              {STANDARD_DEST_AREAS.includes(quote.destinationArea) && (
                <div className="mb-4">
                  <label htmlFor="province" className="field-label mb-1 block">
                    Province / Destination
                  </label>
                  <select
                    id="province"
                    className="field-input"
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
                </div>
              )}

              {/* Dates */}
              <div className="mb-5 grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="start-date" className="field-label mb-1 block">
                    Start Date
                  </label>
                  <input
                    id="start-date"
                    type="date"
                    className="field-input"
                    min={today}
                    value={quote.startDate}
                    onChange={(e) => {
                      const val = e.target.value;
                      setQuote((q) => ({
                        ...q,
                        startDate: val,
                        endDate: q.endDate && q.endDate < val ? "" : q.endDate,
                      }));
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="end-date" className="field-label mb-1 block">
                    End Date
                  </label>
                  <input
                    id="end-date"
                    type="date"
                    className="field-input"
                    min={quote.startDate || today}
                    value={quote.endDate}
                    onChange={(e) => updateQuote("endDate", e.target.value)}
                  />
                </div>
              </div>

              {/* Quote button — TODO: wire to openQuoteModal when JourneyContext is added to V2 */}
              <Link
                to="/contact"
                aria-disabled={!canQuote}
                onClick={(e) => {
                  if (!canQuote) e.preventDefault();
                }}
                className={`block w-full rounded-full py-3 text-center text-sm font-semibold transition ${
                  canQuote
                    ? "bg-gradient-to-br from-gold-300 via-gold-400 to-gold-500 text-coffee-950 shadow-glow hover:-translate-y-0.5"
                    : "cursor-not-allowed bg-cream-200 text-coffee-700/50"
                }`}
              >
                Request Quote
              </Link>
              <p className="mt-3 text-center text-[11px] leading-relaxed text-coffee-700/60">
                {canQuote
                  ? "Ready — your details will carry to the contact form."
                  : "Choose a destination, province, and travel dates to unlock."}
              </p>
            </div>
          </div>
        </div>
      </HeritageSection>

      {/* SECTION 2 — Flexible Package Options */}
      <HeritageSection variant="secondary" className="py-16 md:py-20">
        <div className="container-page">
          <div className="mb-10 text-center">
            <span className="eyebrow">Flexible Formats</span>
            <h2 className="mt-3 font-serif text-3xl text-coffee-900 sm:text-4xl">
              Start with the format, then shape the journey.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-coffee-800/80">
              Choose a base travel format first. Our team adjusts the destination,
              hotel level, pacing, transfers, and guide support around your dates.
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
                  <h3 className="font-serif text-lg text-coffee-900">{pkg.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-coffee-800/80">
                    {pkg.text}
                  </p>
                  <div className="mt-5 border-t border-cream-200 pt-4">
                    <Link
                      to="/contact"
                      className="text-sm font-semibold text-forest-700 transition hover:text-forest-800"
                    >
                      Inquire →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-coffee-700/60">
            Every format can be customized by destination, travel dates, group size,
            hotel preference, transport needs, and preferred pacing.
          </p>
        </div>
      </HeritageSection>

      {/* SECTION 3 — Featured Itineraries + Bespoke CTA */}
      <HeritageSection variant="primary" grow className="py-16 md:py-20">
        <div className="container-page">
          <div className="mb-10 text-center">
            <span className="eyebrow">Ready Itineraries</span>
            <h2 className="mt-3 font-serif text-3xl text-coffee-900 sm:text-4xl">
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
                  <h3 className="font-serif text-base text-coffee-900">{it.title}</h3>
                  <p className="mt-1.5 flex-1 text-xs leading-relaxed text-coffee-800/80">
                    {it.text}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-cream-200 pt-4">
                    <Link
                      to="/tour"
                      className="text-xs font-semibold text-forest-700 hover:text-forest-800"
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
