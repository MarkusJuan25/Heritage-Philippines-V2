import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import HeritageSection from "../components/HeritageSection";
import PageMeta from "../components/PageMeta.jsx";

const heroVideos = [
  "/videos/Create_a_premium_cinematic_mar.mp4",
  "/videos/heritage_philippines_v_mp_.mp4",
  "/videos/heritage-hero.mp4",
];

const signatureRoutes = [
  {
    index: "01",
    region: "Metro Manila",
    title: "Manila Heritage Gateway",
    text: "Old Manila, food memory, historic streets, and a gentle first return into the story.",
    image: "/images/townscape-in-night-at-manila.jpg",
  },
  {
    index: "02",
    region: "Ilocos Region",
    title: "Ilocos Ancestral Route",
    text: "Preserved towns, ancestral homes, church heritage, and northern food traditions.",
    image: "/images/a-glimpse-of-vigan-city.jpg",
  },
  {
    index: "03",
    region: "Cagayan Valley",
    title: "Batanes Kinship Route",
    text: "Stone homes, coastal quiet, island kinship, and landscapes built for reflection.",
    image: "/images/marlboro-country-batanes-lanscapes.jpg",
  },
];

const planningHighlights = [
  "Private route curation",
  "Hotels, transfers, and travel care",
  "Regional and provincial tour planning",
];

const popularTours = [
  {
    region: "Central Visayas",
    title: "Bohol Chocolate Hills Trail",
    text: "Rolling hills, river heritage, and island towns paced for slow, comfortable discovery.",
    image: "/images/chocolate-hills.jpg",
  },
  {
    region: "Cordillera",
    title: "Banaue Rice Terraces Ascent",
    text: "Highland villages, ancient terraces, and living traditions carved into the northern mountains.",
    image: "/images/banaue-rice-terreces.jpg",
  },
  {
    region: "Palawan",
    title: "El Nido Coastal Homecoming",
    text: "Crimson sunsets, hidden lagoons, and quiet coastal evenings to end the journey home.",
    image: "/images/palawan-sunset-el-nido-sunset-crimson-and-gold.jpg",
  },
];

export default function HomePage() {
  const [videoIndex, setVideoIndex] = useState(0);
  const currentVideo = heroVideos[videoIndex];

  const handleEnded = () => {
    setVideoIndex((i) => (i + 1) % heroVideos.length);
  };

  const structuredData = useMemo(() => {
    const base = (import.meta.env.VITE_SITE_URL || window.location.origin).replace(/\/+$/, "");
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "TravelAgency",
          "@id": `${base}#organization`,
          "name": "Heritage Philippines",
          "url": base,
          "logo": {
            "@type": "ImageObject",
            "url": `${base}/images/heritage-logo.png`,
          },
          "description": "Discover carefully hosted cultural journeys, heritage destinations, and meaningful travel experiences across the Philippine archipelago.",
        },
        {
          "@type": "WebSite",
          "@id": `${base}#website`,
          "name": "Heritage Philippines",
          "url": base,
          "publisher": { "@id": `${base}#organization` },
        },
      ],
    };
  }, []);

  return (
    <>
      <PageMeta
        title="Heritage Philippines | Curated Cultural Journeys"
        description="Discover carefully hosted cultural journeys, heritage destinations, and meaningful travel experiences across the Philippine archipelago."
        structuredData={structuredData}
      />
      {/* CINEMATIC HERO */}
      <section className="cinematic-hero min-h-[100svh]">
        <div className="cinematic-hero__media">
          <video
            key={currentVideo}
            className="cinematic-hero__video"
            autoPlay
            muted
            playsInline
            preload="auto"
            poster="/images/heritage-banner.jpg"
            aria-hidden="true"
            onEnded={handleEnded}
          >
            <source src={currentVideo} type="video/mp4" />
          </video>
          <div className="cinematic-hero__shade" />
        </div>

        <div className="relative z-10 flex min-h-[100svh] flex-col">
          <div className="container-page flex flex-1 items-end pb-16 pt-36 sm:pb-20 sm:pt-40 lg:pt-44">
            <div className="grid w-full items-end gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.7fr)]">
              <div className="max-w-2xl">
                <p className="eyebrow-light">Heritage Philippines</p>
                <h1 className="mt-5 font-serif text-[2.4rem] leading-[1.05] text-cream-50 text-balance sm:text-5xl lg:text-[3.85rem]">
                  A homecoming through{" "}
                  <span className="italic text-accent-gold">
                    the Philippines.
                  </span>
                </h1>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-cream-100/85 sm:text-lg">
                  Heritage Philippines creates cinematic, carefully hosted
                  journeys through ancestral places, living culture, island
                  landscapes, and the family memories that make a return
                  meaningful.
                </p>
                <div className="mt-9 flex flex-wrap gap-4">
                  <Link to="/contact" className="btn-primary">
                    Plan Your Homecoming
                  </Link>
                  <Link to="/tour" className="btn-ghost-light">
                    Explore Tours
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HERITAGE DESTINATION TOUR */}
      <HeritageSection
        variant="primary"
        className="pt-16 pb-10 md:pt-20 md:pb-12 lg:pt-16 lg:pb-8"
      >
        <div className="container-page relative">
          <div className="grid items-end gap-6 md:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="mt-3 font-serif text-3xl text-coffee-900 text-balance sm:text-4xl lg:text-[2.4rem]">
                Heritage Destination Tour
              </h2>
            </div>
            <p className="text-[15px] leading-relaxed text-coffee-800/80 md:max-w-md md:justify-self-end">
              A small, intentional set of journeys — chosen for the way
              each one carries roots, culture, and the quiet of arriving
              home.
            </p>
          </div>

          <div className="mt-12 grid gap-7 md:grid-cols-3">
            {signatureRoutes.map((route) => (
              <article
                key={route.title}
                className="group flex flex-col overflow-hidden rounded-2xl border border-cream-200/80 bg-gradient-to-b from-white to-cream-50 shadow-warm transition duration-500 hover:-translate-y-1 hover:shadow-premium"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={route.image}
                    alt={route.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/55 to-transparent"
                  />
                  <span className="absolute left-5 top-5 font-serif text-[1.3rem] leading-none text-cream-50/95 drop-shadow">
                    {route.index}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold-600">
                    {route.region}
                  </p>
                  <h3 className="mt-2 font-serif text-xl text-coffee-900">
                    {route.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[14.5px] leading-[1.7] text-coffee-800/80">
                    {route.text}
                  </p>
                  <Link
                    to="/tour"
                    className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-gold-600 transition group-hover:gap-2 hover:text-gold-700"
                  >
                    Explore Route <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </HeritageSection>

      {/* CUSTOM PLAN */}
      <HeritageSection variant="secondary" className="py-12 md:py-14 lg:py-10">
        <div className="container-page relative grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-cream-200 shadow-premium">
              <img
                src="/images/a-glimpse-of-vigan-city.jpg"
                alt="Heritage route planning in the Philippines"
                loading="lazy"
                className="h-[24rem] w-full object-cover"
              />
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/55 to-transparent"
              />
            </div>
            <div className="absolute -bottom-5 -right-3 rotate-[2deg] rounded-2xl bg-gradient-to-br from-gold-300 via-gold-400 to-gold-500 px-5 py-4 text-coffee-950 shadow-glow">
              <span className="block text-[10px] font-bold uppercase tracking-[0.22em]">
                Tailored
              </span>
              <span className="block font-serif text-lg">Heritage Route</span>
            </div>
          </div>

          <div>
            <h2 className="mt-3 font-serif text-3xl text-coffee-900 text-balance sm:text-4xl lg:text-[2.4rem] lg:leading-[1.12]">
              Not every journey starts with a package.{" "}
              <span className="italic text-gold-600">
                Some begin with a story.
              </span>
            </h2>
            <p className="mt-5 text-[15px] leading-[1.85] text-coffee-800/85">
              Tell us the province, family memory, celebration, or pace you
              have in mind. Our team can shape a route around your schedule,
              comfort level, and the cultural moments that matter most.
            </p>
            <ul className="mt-7 flex flex-wrap gap-x-2.5 gap-y-2.5">
              {planningHighlights.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-cream-200/90 bg-white/90 px-4 py-2 text-[12px] font-semibold text-coffee-800 shadow-warm"
                >
                  <span
                    aria-hidden="true"
                    className="inline-block h-1.5 w-1.5 rounded-full bg-gold-500"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/contact" className="btn-primary">
                Start Custom Plan
              </Link>
              <Link to="/tour" className="btn-outline-dark">
                Browse Tours
              </Link>
            </div>
          </div>
        </div>
      </HeritageSection>

      {/* POPULAR HERITAGE TOURS */}
      <HeritageSection variant="primary" className="py-12 md:py-14 lg:py-10">
        <div className="container-page relative">
          <div className="grid items-end gap-6 md:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="mt-3 font-serif text-3xl text-coffee-900 text-balance sm:text-4xl lg:text-[2.4rem]">
                Popular heritage tours, ready when you are.
              </h2>
            </div>
            <p className="text-[15px] leading-relaxed text-coffee-800/80 md:max-w-md md:justify-self-end">
              Favourite departures shaped around landscapes, living culture,
              and food — easy to join, and simple to make your own.
            </p>
          </div>

          <div className="mt-12 grid gap-7 md:grid-cols-3">
            {popularTours.map((tour) => (
              <article
                key={tour.title}
                className="group flex flex-col overflow-hidden rounded-2xl border border-cream-200/80 bg-gradient-to-b from-white to-cream-50 shadow-warm transition duration-500 hover:-translate-y-1 hover:shadow-premium"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/45 to-transparent"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-gold-600">
                    <span
                      aria-hidden="true"
                      className="inline-block h-1.5 w-1.5 rounded-full bg-gold-500"
                    />
                    {tour.region}
                  </p>
                  <h3 className="mt-2 font-serif text-xl text-coffee-900">
                    {tour.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[14.5px] leading-[1.7] text-coffee-800/80">
                    {tour.text}
                  </p>
                  <Link
                    to="/tour"
                    className="mt-6 inline-flex w-fit items-center gap-1 text-sm font-semibold text-gold-600 transition group-hover:gap-2 hover:text-gold-700"
                  >
                    View Tour <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link to="/tour" className="btn-outline-dark">
              View All Tours
            </Link>
          </div>
        </div>
      </HeritageSection>

      {/* CONCIERGE TRAVEL-CARE CTA */}
      <HeritageSection
        variant="secondary"
        grow
        className="pt-10 pb-16 md:pt-12 md:pb-20 lg:pt-8 lg:pb-14"
      >
        <div className="container-page relative">
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-gold-400/20 bg-coffee-950 px-7 py-14 text-center text-cream-50 shadow-premium sm:px-12 md:py-16">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(255,244,214,0.07),transparent_48%),radial-gradient(circle_at_85%_80%,rgba(216,177,109,0.22),transparent_55%),linear-gradient(135deg,rgba(15,12,8,0.18),transparent_58%)]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/55 to-transparent"
            />
            <div className="relative mx-auto max-w-2xl">
              <p className="eyebrow-light">Concierge Travel Care</p>
              <h2 className="mt-3 font-serif text-3xl text-balance sm:text-4xl lg:text-[2.4rem]">
                Your route, logistics, and support in{" "}
                <span className="italic text-accent-gold">one calm plan.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-cream-100/85">
                From hotels and transfers to documents, insurance, and route
                coordination, our team helps shape the practical details
                around the story.
              </p>

              <ul className="mt-7 flex flex-wrap justify-center gap-x-2.5 gap-y-2.5">
                {[
                  "Hotels & transfers",
                  "Visa & insurance assistance",
                  "Custom heritage planning",
                ].map((item) => (
                  <li
                    key={item}
                    className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-gold-400/25 bg-cream-50/[0.06] px-4 py-2 text-[12px] font-semibold text-cream-100/90 backdrop-blur"
                  >
                    <span
                      aria-hidden="true"
                      className="inline-block h-1.5 w-1.5 rounded-full bg-gold-400"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link to="/contact" className="btn-primary">
                  Plan with Us
                </Link>
                <Link to="/gallery" className="btn-ghost-light">
                  View Gallery
                </Link>
              </div>
            </div>
          </div>
        </div>
      </HeritageSection>
    </>
  );
}
