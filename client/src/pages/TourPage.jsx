import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import HeritageSection from "../components/HeritageSection";
import { packageCategories, tourPackages } from "../data/tourPackages.js";
import { useJourney } from "../context/JourneyContext";

// --- Static data ---

const PAGE_SIZE = 9;

const getPaginationItems = (currentPage, totalPages) => {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "ellipsis", totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, "ellipsis", totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    "ellipsis-start",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "ellipsis-end",
    totalPages,
  ];
};

const heroRoutes = [
  {
    label: "LUZON",
    title: "Luzon Heritage Routes",
    number: "01",
    image: "/images/Luzon/Region I — Ilocos Region/The Spanish Heritage of Vigan Ilocos Sur.jpg",
  },
  {
    label: "VISAYAS",
    title: "Visayas Island Heritage",
    number: "02",
    image: "/images/Visayas/Region VII — Central Visayas/Bohol - The Geological Wonders Chocolate Hills.jpg",
  },
  {
    label: "MINDANAO",
    title: "Mindanao Cultural Journeys",
    number: "03",
    image: "/images/Mindanao/Region X — Northern Mindanao/Bukidnon The Land of Rolling Plateaus.jpg",
  },
];

const destinations = [
  {
    number: "01",
    title: "Ilocos Heritage Trail",
    region: "Northern Luzon",
    image: "/images/Luzon/Region I — Ilocos Region/The Spanish Heritage of Vigan Ilocos Sur.jpg",
  },
  {
    number: "02",
    title: "Cordillera Highland Loop",
    region: "Cordillera",
    image: "/images/Luzon/CAR — Cordillera Administrative Region/The Rice Terraces of Ifugao Banaue.jpg",
  },
  {
    number: "03",
    title: "Visayas Island Circuit",
    region: "Visayas",
    image: "/images/Visayas/Region VII — Central Visayas/Bohol - The Geological Wonders Chocolate Hills.jpg",
  },
  {
    number: "04",
    title: "Mindanao Cultural Frontier",
    region: "Mindanao",
    image: "/images/Mindanao/Region X — Northern Mindanao/Bukidnon The Land of Rolling Plateaus.jpg",
  },
];


export default function TourPage() {
  const [activeRouteIdx, setActiveRouteIdx] = useState(0);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const tourCollectionRef = useRef(null);
  const { openQuoteModal, addProgram, isProgramSelected } = useJourney();

  // Auto-advance hero route stack every 5 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setActiveRouteIdx((i) => (i + 1) % heroRoutes.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  // Reset to page 1 whenever filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, searchQuery]);

  const activeRoute = heroRoutes[activeRouteIdx] ?? heroRoutes[0];

  const filteredTours = tourPackages.filter((tour) => {
    const matchesFilter =
      activeFilter === "All" || tour.islandGroup === activeFilter;

    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      [
        tour.title,
        tour.category,
        tour.overview || tour.shortDescription || "",
        tour.location ?? "",
        tour.province ?? "",
        tour.region ?? "",
        tour.islandGroup ?? "",
        tour.slug ?? "",
        ...(tour.highlights || []),
      ]
        .join(" ")
        .toLowerCase()
        .includes(q);

    return matchesFilter && matchesSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filteredTours.length / PAGE_SIZE));
  const paginationItems = getPaginationItems(currentPage, totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const visibleTours = filteredTours.slice(startIndex, startIndex + PAGE_SIZE);
  const showingFrom = filteredTours.length === 0 ? 0 : startIndex + 1;
  const showingTo = Math.min(startIndex + PAGE_SIZE, filteredTours.length);

  const scrollToTourCollection = () => {
    window.setTimeout(() => {
      const target = tourCollectionRef.current;
      if (!target) return;

      const navbarOffset = 96;
      const targetTop =
        target.getBoundingClientRect().top + window.scrollY - navbarOffset;

      window.scrollTo({
        top: Math.max(targetTop, 0),
        behavior: "smooth",
      });
    }, 0);
  };

  const goToPage = (nextPage) => {
    const resolvedPage =
      typeof nextPage === "function" ? nextPage(currentPage) : nextPage;

    const safePage = Math.min(Math.max(resolvedPage, 1), totalPages);

    setCurrentPage(safePage);
    scrollToTourCollection();
  };

  return (
    <>
      {/* ── HERO ── */}
      <section className="page-header">
        <div className="page-header__media">
          <img
            src={activeRoute.image}
            alt=""
            className="page-header__image"
            loading="eager"
          />
          <div className="page-header__shade" />
        </div>

        <div className="container-page relative pb-20 pt-28 sm:pt-32 md:pb-24 md:pt-36">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">

            {/* Left — headline + copy + CTAs */}
            <div>
              <p className="eyebrow-light tracking-[0.2em]">
                {heroRoutes[activeRouteIdx].label} HERITAGE ROUTES
              </p>
              <h1 className="mt-4 font-serif text-3xl leading-tight tracking-wide text-cream-50 sm:text-4xl lg:text-5xl">
                TOUR THE PHILIPPINES THROUGH HERITAGE
              </h1>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-cream-100/85">
                Province-led journeys through ancestral towns, island routes,
                food-memory stops, sacred landmarks, and living culture.
              </p>
              <p className="mt-2 max-w-lg text-xs leading-relaxed text-cream-100/60">
                Highland cities, Spanish-era towns, maritime landmarks,
                ancestral homes, and northern landscapes shaped into calm
                province-led journeys.
              </p>
              <div className="mt-7 flex flex-wrap gap-4">
                <a href="#tour-collection" className="btn-primary">
                  Explore Tours
                </a>
                <a href="#regions" className="btn-ghost-light">
                  Browse Regions
                </a>
              </div>
            </div>

            {/* Right — route stack */}
            <div className="flex flex-col gap-3">
              {heroRoutes.map((route, idx) => (
                <button
                  key={route.title}
                  type="button"
                  aria-pressed={idx === activeRouteIdx}
                  aria-label={route.title}
                  onClick={() => setActiveRouteIdx(idx)}
                  className={`group flex cursor-pointer items-center gap-4 rounded-2xl border p-4 backdrop-blur-sm transition duration-300 ${
                    idx === activeRouteIdx
                      ? "border-gold-400/55 bg-coffee-800/90 shadow-warm"
                      : "border-cream-50/10 bg-coffee-900/50 hover:border-cream-50/20 hover:bg-coffee-900/80"
                  }`}
                >
                  <div className="relative h-16 w-20 flex-shrink-0 overflow-hidden rounded-xl">
                    <img
                      src={route.image}
                      alt={route.title}
                      loading="lazy"
                      className={`h-full w-full object-cover transition duration-500 ${
                        idx === activeRouteIdx
                          ? "scale-105"
                          : "group-hover:scale-105"
                      }`}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-[10px] font-bold uppercase tracking-widest transition duration-300 ${
                        idx === activeRouteIdx
                          ? "text-gold-300"
                          : "text-gold-400/60"
                      }`}
                    >
                      {route.label}
                    </p>
                    <h3
                      className={`mt-0.5 font-serif text-base leading-tight transition duration-300 ${
                        idx === activeRouteIdx
                          ? "text-cream-50"
                          : "text-cream-50/60"
                      }`}
                    >
                      {route.title}
                    </h3>
                  </div>
                  <span
                    aria-hidden="true"
                    className={`ml-2 flex-shrink-0 font-serif text-3xl leading-none transition duration-300 ${
                      idx === activeRouteIdx
                        ? "text-gold-400/50"
                        : "text-cream-50/15"
                    }`}
                  >
                    {route.number}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FILTER / SEARCH STRIP ── */}
      <div className="border-b border-cream-200 bg-cream-50 shadow-sm">
        <div className="container-page flex flex-wrap items-center gap-4 py-3">
          {/* Region pills */}
          <div className="flex flex-wrap gap-2">
            {packageCategories.map((pill) => (
              <button
                key={pill}
                type="button"
                onClick={() => setActiveFilter(pill)}
                className={`rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide transition ${
                  activeFilter === pill
                    ? "border-coffee-900 bg-coffee-900 text-cream-50 shadow-warm"
                    : "border-cream-200 bg-white text-coffee-800 hover:border-gold-400/60 hover:bg-cream-50"
                }`}
              >
                {pill}
              </button>
            ))}
          </div>

          {/* Search input */}
          <div className="min-w-[180px] flex-1 md:ml-auto md:w-[280px] md:flex-none lg:w-[320px] xl:w-[340px]">
            <input
              type="search"
              aria-label="Search tours"
              placeholder="Search province, place, or route"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-cream-200 bg-white px-4 py-2 text-xs text-coffee-900 placeholder-coffee-700/40 transition focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
            />
          </div>
        </div>
      </div>

      {/* ── TOUR COLLECTION ── */}
      <div id="tour-collection" ref={tourCollectionRef}>
        <HeritageSection variant="primary" className="py-16 md:py-20">
          <div className="container-page">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="font-serif text-3xl text-coffee-900 sm:text-4xl">
                  Curated tours across the Philippines.
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-coffee-800/80">
                  Browse province-led routes with guided culture, food memory,
                  heritage stops, and practical travel support.
                </p>
              </div>
              {filteredTours.length > 0 && (
                <p className="shrink-0 text-xs text-coffee-700/60">
                  Showing {showingFrom}–{showingTo} of {filteredTours.length} routes
                </p>
              )}
            </div>

            {visibleTours.length > 0 ? (
              <>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {visibleTours.map((tour) => (
                    <article
                      key={tour.slug}
                      className="group flex flex-col overflow-hidden rounded-2xl border border-cream-200/80 bg-gradient-to-b from-white to-cream-50 shadow-warm transition duration-500 hover:-translate-y-1 hover:shadow-premium"
                    >
                      {/* Image */}
                      <div className="relative h-56 w-full overflow-hidden">
                        <img
                          src={tour.image}
                          alt={tour.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-coffee-950/70 to-transparent" />
                        <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-coffee-950/55 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gold-300 backdrop-blur">
                          {tour.category}
                        </span>
                      </div>

                      {/* Body */}
                      <div className="flex flex-1 flex-col p-5">
                        {/* Location row */}
                        {tour.location && (
                          <p className="mb-2 flex items-center gap-1.5 text-[11px] text-coffee-700/70">
                            <svg
                              aria-hidden="true"
                              className="h-3 w-3 flex-shrink-0 text-gold-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {tour.location}
                          </p>
                        )}

                        <h3 className="font-serif text-xl text-coffee-900">
                          {tour.title}
                        </h3>

                        {/* Meta */}
                        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-0.5 border-t border-cream-200 pt-4 text-xs text-coffee-700/75">
                          <span>
                            <strong className="font-semibold text-coffee-800">
                              Duration:
                            </strong>{" "}
                            {tour.duration}
                          </span>
                          <span>
                            <strong className="font-semibold text-coffee-800">
                              Best for:
                            </strong>{" "}
                            {tour.groupSize ?? tour.bestFor}
                          </span>
                        </div>

                        {/* Tags */}
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {tour.highlights.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-cream-100 px-2.5 py-1 text-[11px] font-medium text-coffee-700"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Action buttons — Request Quote · View Tour · Add Program */}
                        <div className="mt-4 border-t border-cream-100 pt-4">
                          <div className="grid grid-cols-3 gap-1.5">
                            <button
                              type="button"
                              onClick={() =>
                                openQuoteModal({
                                  source: tour.title,
                                  category: tour.category,
                                  location: tour.location,
                                })
                              }
                              className="min-w-0 rounded-full bg-gold-500 px-2 py-2 text-center text-[10px] font-bold text-coffee-950 transition hover:bg-gold-400 sm:text-[11px]"
                            >
                              Request Quote
                            </button>
                            <Link
                              to="/contact"
                              className="min-w-0 rounded-full border border-coffee-900 bg-coffee-900 px-2 py-2 text-center text-[10px] font-semibold text-cream-50 transition hover:bg-coffee-800 sm:text-[11px]"
                            >
                              View Tour
                            </Link>
                            <button
                              type="button"
                              disabled={isProgramSelected(tour.slug)}
                              onClick={() =>
                                addProgram({
                                  id: tour.slug,
                                  title: tour.title,
                                  type: "tour",
                                })
                              }
                              className={`min-w-0 rounded-full border px-2 py-2 text-[10px] font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 sm:text-[11px] ${
                                isProgramSelected(tour.slug)
                                  ? "cursor-default border-gold-400/60 bg-gold-50 text-gold-700"
                                  : "border-gold-400/70 bg-gradient-to-br from-cream-50 via-gold-50 to-gold-100 text-coffee-900 shadow-warm hover:-translate-y-0.5 hover:border-gold-500 hover:bg-gold-100 hover:shadow-premium"
                              }`}
                            >
                              <span className="inline-flex items-center justify-center gap-1">
                                <span aria-hidden="true">
                                  {isProgramSelected(tour.slug) ? "✓" : "＋"}
                                </span>
                                {isProgramSelected(tour.slug) ? "Added" : "Add Program"}
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Pagination strip */}
                <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-cream-200 pt-6">
                  <p className="text-xs text-coffee-700/60">
                    Showing {showingFrom}–{showingTo} of {filteredTours.length} routes
                  </p>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={currentPage === 1}
                      onClick={() => goToPage((p) => p - 1)}
                      className="rounded-full border border-cream-200 px-3 py-1.5 text-xs text-coffee-700 transition hover:border-gold-400/50 hover:bg-cream-50 disabled:cursor-not-allowed disabled:text-coffee-700/30 disabled:hover:border-cream-200 disabled:hover:bg-transparent"
                    >
                      ← Prev
                    </button>
                    {paginationItems.map((item) =>
                      typeof item === "string" ? (
                        <span
                          key={`pagination-${item}`}
                          className="px-1.5 text-xs font-semibold text-coffee-700/45"
                          aria-hidden="true"
                        >
                          ...
                        </span>
                      ) : (
                        <button
                          key={item}
                          type="button"
                          onClick={() => goToPage(item)}
                          className={`h-8 w-8 rounded-full text-xs font-semibold transition ${
                            item === currentPage
                              ? "bg-coffee-900 text-cream-50"
                              : "border border-cream-200 text-coffee-700 hover:border-gold-400/50 hover:bg-cream-50"
                          }`}
                        >
                          {item}
                        </button>
                      )
                    )}
                    <button
                      type="button"
                      disabled={currentPage === totalPages}
                      onClick={() => goToPage((p) => p + 1)}
                      className="rounded-full border border-cream-200 px-3 py-1.5 text-xs text-coffee-700 transition hover:border-gold-400/50 hover:bg-cream-50 disabled:cursor-not-allowed disabled:text-coffee-700/30 disabled:hover:border-cream-200 disabled:hover:bg-transparent"
                    >
                      Next →
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="py-16 text-center">
                <p className="text-sm text-coffee-700/70">
                  No tours match your search. Try a different keyword or region.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveFilter("All");
                    setSearchQuery("");
                  }}
                  className="mt-4 text-sm font-semibold text-gold-600 hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </HeritageSection>
      </div>

      {/* ── DESTINATION RECOMMENDATIONS ── */}
      <section id="regions" className="bg-coffee-950 py-20 text-cream-50">
        <div className="container-page">
          <div className="mb-10">
            <p className="eyebrow-light">Destination Recommendations</p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
              Top heritage destinations.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-cream-100/70">
              Curated starting points across the archipelago — each route
              anchored in living culture, landscape, and local knowledge.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((dest) => (
              <article
                key={dest.title}
                className="group relative aspect-[3/4] overflow-hidden rounded-2xl"
              >
                <img
                  src={dest.image}
                  alt={dest.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-coffee-950/90 via-coffee-950/30 to-transparent" />
                <div className="absolute left-4 top-4">
                  <span className="font-serif text-4xl leading-none text-gold-400/60">
                    {dest.number}
                  </span>
                </div>
                <div className="absolute inset-x-5 bottom-5">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-gold-300">
                    {dest.region}
                  </p>
                  <h3 className="mt-1 font-serif text-lg leading-snug text-cream-50">
                    {dest.title}
                  </h3>
                  <Link
                    to="/contact"
                    className="mt-2 inline-block text-[11px] font-semibold text-gold-300 transition hover:text-gold-200"
                  >
                    View route →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
