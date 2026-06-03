import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeritageSection from "../components/HeritageSection";

// --- Static data ---

const heroRoutes = [
  {
    label: "LUZON",
    title: "Luzon Heritage Routes",
    number: "01",
    image: "/images/a-glimpse-of-vigan-city.jpg",
  },
  {
    label: "VISAYAS",
    title: "Visayas Island Heritage",
    number: "02",
    image: "/images/chocolate-hills.jpg",
  },
  {
    label: "MINDANAO",
    title: "Mindanao Cultural Journeys",
    number: "03",
    image: "/images/living-culture.jpg",
  },
];

// filterRegion drives the pill filter: "Luzon" | "Visayas" | "Mindanao" | "All"
const tourCollections = [
  {
    filterRegion: "Luzon",
    category: "Northern Luzon",
    title: "Ilocos Heritage Trail",
    description:
      "Walk cobblestone streets, visit coral-stone basilicas, meet indigo weavers still practicing the Inabel tradition, and end evenings with Vigan's storied cuisine.",
    duration: "5–7 days",
    bestFor: "Culture seekers, first-time heritage travelers",
    highlights: ["Vigan UNESCO", "Inabel weaving", "Calesa & food"],
    image: "/images/a-glimpse-of-vigan-city.jpg",
  },
  {
    filterRegion: "Luzon",
    category: "Cordillera",
    title: "Living Rice Terraces Loop",
    description:
      "Trace the 2,000-year-old Banaue and Batad terraces, join harvest rituals, and spend nights in heritage lodges above the cloud line.",
    duration: "4–6 days",
    bestFor: "Active travelers, solo journeys",
    highlights: ["Banaue terraces", "Batad village", "Highland ritual"],
    image: "/images/banaue-rice-terreces.jpg",
  },
  {
    filterRegion: "Visayas",
    category: "Visayas",
    title: "Visayas Island Heritage",
    description:
      "Cebu's Spanish forts, Bohol's baroque churches, and Iloilo's grand ancestral homes — threaded together across island-hop routes with local guides.",
    duration: "6–8 days",
    bestFor: "Family groups, history lovers",
    highlights: ["Cebu historic fort", "Chocolate Hills", "Ancestral houses"],
    image: "/images/chocolate-hills.jpg",
  },
  {
    filterRegion: "Mindanao",
    category: "Mindanao",
    title: "Mindanao Cultural Frontier",
    description:
      "Discover the living weaving culture of Bukidnon, highland traditions of Cotabato, and the layered culinary heritage spanning coastal Davao.",
    duration: "5–7 days",
    bestFor: "Experienced travelers, cultural researchers",
    highlights: ["Higaonon weaving", "Davao food culture", "Highland domains"],
    image: "/images/marlboro-country-batanes-lanscapes.jpg",
  },
  {
    filterRegion: "All",
    category: "Faith & Culture",
    title: "Faith & Pilgrimage Circuit",
    description:
      "A curated route through the Philippines' most sacred heritage sites — from the Penafrancia feast in Naga to the Quiapo devotion in Manila, paired with quiet stays.",
    duration: "4–5 days",
    bestFor: "Devotional travelers, cultural immersion",
    highlights: ["Quiapo heritage", "Penafrancia route", "Sacred art stops"],
    image: "/images/heritage-home.jpg",
  },
  {
    filterRegion: "All",
    category: "Flexible",
    title: "Custom Regional Tour",
    description:
      "Tell us your region, your pace, and your cultural interests. We build the route, the stays, and the local guides around your specific itinerary.",
    duration: "Flexible",
    bestFor: "Any group size, any region",
    highlights: ["Fully custom", "Your pace", "Any heritage region"],
    image: "/images/journey.jpg",
  },
];

const regionalPreviews = [
  {
    region: "Luzon",
    tagline: "The old north and the capital's roots",
    description:
      "From the cobblestone corridors of Vigan to the rice-terrace villages of the Cordillera — Luzon holds the archipelago's oldest written culture, colonial heritage, and mountain rituals still alive today.",
    destinations: ["Ilocos Sur", "Banaue", "Intramuros", "Bataan"],
    image: "/images/a-glimpse-of-vigan-city.jpg",
  },
  {
    region: "Visayas",
    tagline: "Islands built on faith and trade",
    description:
      "Cebu's Spanish fort, Bohol's baroque churches, Iloilo's grand ancestral homes — the Visayas blend colonial faith, seafaring culture, and the warmest welcome across every island.",
    destinations: ["Cebu City", "Bohol", "Iloilo", "Negros Occidental"],
    image: "/images/chocolate-hills.jpg",
  },
  {
    region: "Mindanao",
    tagline: "Where culture runs deepest",
    description:
      "The highland weaving societies of Bukidnon, the ancestral domains of the Bagobo and Maguindanao peoples, and the diverse culinary traditions of coastal Davao.",
    destinations: ["Davao City", "Bukidnon", "Lake Sebu", "Cotabato"],
    image: "/images/living-culture.jpg",
  },
];

const planningRhythm = [
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
  "Heritage-led local guides",
  "Route planning support",
  "Private or group transfers",
  "Boutique stays by request",
  "Food and cultural stops",
  "On-trip coordination",
];

const FILTER_PILLS = ["All", "Luzon", "Visayas", "Mindanao"];

export default function TourPage() {
  const [activeRouteIdx, setActiveRouteIdx] = useState(0);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Auto-advance hero route stack every 5 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setActiveRouteIdx((i) => (i + 1) % heroRoutes.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const filteredTours = tourCollections.filter((tour) => {
    const matchesFilter =
      activeFilter === "All" || tour.filterRegion === activeFilter;

    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      [tour.title, tour.category, tour.description, ...tour.highlights]
        .join(" ")
        .toLowerCase()
        .includes(q);

    return matchesFilter && matchesSearch;
  });

  return (
    <>
      {/* ── HERO ── */}
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

        <div className="container-page relative pb-20 pt-28 sm:pt-32 md:pb-24 md:pt-36">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">

            {/* Left — headline + copy + CTAs */}
            <div>
              <p className="eyebrow-light tracking-[0.2em]">
                LUZON HERITAGE ROUTES
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
              {heroRoutes.map((route) => (
                <a
                  key={route.title}
                  href="#tour-collection"
                  className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-cream-50/15 bg-coffee-900/70 p-4 backdrop-blur-sm transition duration-300 hover:bg-coffee-900/90 hover:border-cream-50/25"
                >
                  <div className="relative h-16 w-20 flex-shrink-0 overflow-hidden rounded-xl">
                    <img
                      src={route.image}
                      alt={route.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gold-300">
                      {route.label}
                    </p>
                    <h3 className="mt-0.5 font-serif text-base leading-tight text-cream-50">
                      {route.title}
                    </h3>
                  </div>
                  <span
                    aria-hidden="true"
                    className="ml-2 flex-shrink-0 font-serif text-3xl leading-none text-cream-50/20"
                  >
                    {route.number}
                  </span>
                </a>
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
            {FILTER_PILLS.map((pill) => (
              <button
                key={pill}
                type="button"
                onClick={() => setActiveFilter(pill)}
                className={`rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide transition ${
                  activeFilter === pill
                    ? "border-forest-700 bg-forest-700 text-cream-50 shadow-warm"
                    : "border-cream-200 bg-white text-coffee-800 hover:border-gold-400/60 hover:bg-cream-50"
                }`}
              >
                {pill}
              </button>
            ))}
          </div>

          {/* Search input */}
          <div className="min-w-[180px] flex-1 sm:max-w-xs">
            <input
              type="search"
              aria-label="Search tours"
              placeholder="Search province, place, or route"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-cream-200 bg-white px-4 py-2 text-xs text-coffee-900 placeholder-coffee-700/40 transition focus:border-forest-700 focus:outline-none focus:ring-2 focus:ring-forest-700/20"
            />
          </div>
        </div>
      </div>

      {/* ── TOUR COLLECTION ── */}
      <div id="tour-collection">
        <HeritageSection variant="primary" className="py-16 md:py-20">
          <div className="container-page">
            <div className="mb-8">
              <h2 className="font-serif text-3xl text-coffee-900 sm:text-4xl">
                Curated tours across the Philippines.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-coffee-800/80">
                Browse province-led routes with guided culture, food memory,
                heritage stops, and practical travel support.
              </p>
            </div>

            {filteredTours.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredTours.map((tour) => (
                  <article
                    key={tour.title}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-cream-200/80 bg-gradient-to-b from-white to-cream-50 shadow-warm transition duration-500 hover:-translate-y-1 hover:shadow-premium"
                  >
                    {/* Image */}
                    <div className="relative h-44 w-full overflow-hidden">
                      <img
                        src={tour.image}
                        alt={tour.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-coffee-950/65 to-transparent" />
                      <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-coffee-950/55 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gold-300 backdrop-blur">
                        {tour.category}
                      </span>
                    </div>

                    {/* Body */}
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="font-serif text-xl text-coffee-900">
                        {tour.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-coffee-800/80">
                        {tour.description}
                      </p>

                      {/* Meta */}
                      <div className="mt-4 flex flex-col gap-0.5 border-t border-cream-200 pt-4 text-xs text-coffee-700/75">
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
                          {tour.bestFor}
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

                      <Link
                        to="/contact"
                        className="mt-5 text-sm font-semibold text-forest-700 transition hover:text-forest-800"
                      >
                        Inquire about this route →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
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
                  className="mt-4 text-sm font-semibold text-forest-700 hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </HeritageSection>
      </div>

      {/* ── REGIONAL PREVIEWS ── */}
      <section
        id="regions"
        className="relative overflow-hidden bg-forest-900 text-cream-50"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_15%_85%,rgba(58,117,103,0.45),transparent_55%),radial-gradient(circle_at_85%_10%,rgba(216,177,109,0.18),transparent_50%)]"
        />
        <div className="container-page relative py-20">
          <div className="mb-10">
            <p className="eyebrow-light">Three Regions</p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
              One archipelago, three island stories.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-cream-100/70">
              Every heritage tour is grounded in one of three island groups.
              Explore the route that feels like home — or like something you
              have always needed to find.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {regionalPreviews.map((region) => (
              <article
                key={region.region}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-premium"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={region.image}
                    alt={region.region}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-coffee-950/80 via-coffee-950/20 to-transparent" />
                  <div className="absolute inset-x-5 bottom-5">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-gold-300">
                      {region.tagline}
                    </p>
                    <h3 className="mt-0.5 font-serif text-2xl text-cream-50">
                      {region.region}
                    </h3>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="flex-1 text-sm leading-relaxed text-coffee-800/80">
                    {region.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5 border-t border-cream-200 pt-4">
                    {region.destinations.map((dest) => (
                      <span
                        key={dest}
                        className="rounded-full border border-cream-200 px-3 py-1 text-[11px] text-coffee-700"
                      >
                        {dest}
                      </span>
                    ))}
                  </div>
                  <Link
                    to="/contact"
                    className="mt-4 text-sm font-semibold text-forest-700 transition hover:text-forest-800"
                  >
                    Plan a {region.region} route →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLANNING RHYTHM ── */}
      <HeritageSection variant="secondary" className="py-16 md:py-20">
        <div className="container-page">
          <div className="mb-10 text-center">
            <p className="eyebrow">How We Move</p>
            <h2 className="mt-3 font-serif text-3xl text-coffee-900 sm:text-4xl">
              A day on Heritage tour.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-coffee-800/80">
              No rigid schedule. Every day has a quiet morning, a hands-on
              midday, and an unhurried evening.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {planningRhythm.map((step) => (
              <article
                key={step.time}
                className="relative overflow-hidden rounded-2xl border border-cream-200/80 bg-gradient-to-b from-white to-cream-50 p-6 shadow-warm"
              >
                <span
                  aria-hidden="true"
                  className="inline-block h-1 w-10 rounded-full bg-gradient-to-r from-gold-400 to-gold-500"
                />
                <span className="eyebrow mt-4 block">{step.time}</span>
                <h3 className="mt-2 font-serif text-xl text-coffee-900">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-coffee-800/85">
                  {step.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </HeritageSection>

      {/* ── WHAT'S INCLUDED ── */}
      <HeritageSection variant="primary" className="py-16 md:py-20">
        <div className="container-page">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <p className="eyebrow">Inclusions</p>
              <h2 className="mt-3 font-serif text-3xl text-coffee-900 sm:text-4xl">
                Everything except the rush.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-coffee-800/80">
                Every Heritage Philippines route comes with the essentials — so
                you arrive, settle in, and experience the place without
                logistics pulling you out of the moment.
              </p>
              <Link to="/contact" className="btn-outline-dark mt-6">
                Ask about inclusions
              </Link>
            </div>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {included.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-cream-200/80 bg-gradient-to-br from-white to-cream-50 px-4 py-3 shadow-soft"
                >
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold-500"
                  />
                  <span className="text-sm text-coffee-800">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </HeritageSection>

      {/* ── TESTIMONIAL + FINAL CTA ── */}
      <HeritageSection variant="secondary" grow className="py-16 md:py-20">
        <div className="container-page">
          <figure className="mx-auto mb-16 max-w-3xl text-center">
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

          <div className="rounded-2xl border border-cream-200/80 bg-gradient-to-b from-white to-cream-50 p-8 text-center shadow-warm md:p-12">
            <p className="eyebrow">Ready to travel?</p>
            <h2 className="mt-3 font-serif text-2xl text-coffee-900 sm:text-3xl">
              Let us shape the right Heritage tour for you.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-coffee-800/80">
              Tell us your region, your dates, and your travel style. We will
              build the route, the stays, and the cultural stops around your
              journey.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact" className="btn-primary">
                Start Planning
              </Link>
              <Link to="/packages" className="btn-outline-dark">
                View Packages
              </Link>
            </div>
          </div>
        </div>
      </HeritageSection>
    </>
  );
}
