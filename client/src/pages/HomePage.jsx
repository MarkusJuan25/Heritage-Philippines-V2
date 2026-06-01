import { useState } from "react";
import { Link } from "react-router-dom";

const heroVideos = [
  "/videos/Create_a_premium_cinematic_mar.mp4",
  "/videos/heritage_philippines_v_mp_.mp4",
  "/videos/heritage-hero.mp4",
];

const journeyActs = [
  {
    numeral: "I",
    label: "Roots",
    title: "Where you remember.",
    body: "Old neighborhoods, ancestral homes, and the quiet corners that hold a family name. Heritage begins where the story first belonged to you.",
    image: "/images/townscape-in-night-at-manila.jpg",
  },
  {
    numeral: "II",
    label: "Journey",
    title: "Where you arrive slowly.",
    body: "Through preserved towns, living traditions, and landscapes shaped by generations — moving at a pace that lets the country speak back.",
    image: "/images/a-glimpse-of-vigan-city.jpg",
  },
  {
    numeral: "III",
    label: "Homecoming",
    title: "Where the story returns.",
    body: "Long suppers, coastal evenings, and quiet reunions with culture, family, and place. The route ends where every Heritage trip is meant to land.",
    image: "/images/marlboro-country-batanes-lanscapes.jpg",
  },
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
    meta: "Island heritage · Multi-day",
    image: "/images/chocolate-hills.jpg",
  },
  {
    region: "Cordillera",
    title: "Banaue Rice Terraces Ascent",
    meta: "Highland culture · Multi-day",
    image: "/images/banaue-rice-terreces.jpg",
  },
  {
    region: "Palawan",
    title: "El Nido Coastal Homecoming",
    meta: "Coastal escape · Multi-day",
    image: "/images/palawan-sunset-el-nido-sunset-crimson-and-gold.jpg",
  },
  {
    region: "Bicol Region",
    title: "Mayon Heritage Escape",
    meta: "Volcano country · Multi-day",
    image: "/images/mt-mayon.jpg",
  },
];

export default function HomePage() {
  const [videoIndex, setVideoIndex] = useState(0);
  const currentVideo = heroVideos[videoIndex];

  const handleEnded = () => {
    setVideoIndex((i) => (i + 1) % heroVideos.length);
  };

  return (
    <>
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

      {/* THREE JOURNEY ACTS */}
      <section className="relative overflow-hidden bg-warm-cream pb-20 pt-4 md:pb-24">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-heritage"
        />
        <div className="container-page relative">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="mt-3 font-serif text-2xl text-coffee-900 text-balance sm:text-3xl lg:text-[2.1rem]">
              The shape of a Heritage journey.
            </h2>
          </div>

          <div className="mt-14 grid gap-7 md:grid-cols-3">
            {journeyActs.map((act) => (
              <article
                key={act.numeral}
                className="group flex flex-col overflow-hidden rounded-2xl border border-cream-200/80 bg-gradient-to-b from-white to-cream-50 shadow-warm"
              >
                <div className="relative h-40 w-full overflow-hidden">
                  <img
                    src={act.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/35 to-transparent"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <div className="flex items-baseline gap-4">
                    <span className="font-serif text-[2.4rem] leading-none text-gold-500">
                      {act.numeral}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-coffee-700/75">
                      Act {act.numeral} · {act.label}
                    </span>
                  </div>
                  <span aria-hidden="true" className="gold-rule mt-5 max-w-[2.5rem]" />
                  <h3 className="mt-4 font-serif text-[1.4rem] leading-tight text-coffee-900">
                    {act.title}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-[1.7] text-coffee-800/85">
                    {act.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SIGNATURE HERITAGE ROUTES */}
      <section className="relative overflow-hidden bg-cream-50 py-20 md:py-24">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-heritage"
        />
        <div className="container-page relative">
          <div className="grid items-end gap-6 md:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="mt-3 font-serif text-3xl text-coffee-900 text-balance sm:text-4xl lg:text-[2.4rem]">
                Three curated returns across the archipelago.
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
                    className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-forest-700 transition group-hover:gap-2 hover:text-forest-800"
                  >
                    Explore Route <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              to="/tour"
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-coffee-700 transition hover:text-coffee-900"
            >
              <span aria-hidden="true" className="h-px w-8 bg-gold-500/60" />
              See all routes
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CUSTOM PLAN */}
      <section className="relative overflow-hidden bg-warm-cream py-20 md:py-24">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-heritage"
        />
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
      </section>

      {/* POPULAR HERITAGE TOURS */}
      <section className="relative overflow-hidden bg-cream-50 py-20 md:py-24">
        <div aria-hidden="true" className="absolute inset-0 bg-heritage" />
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

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {popularTours.map((tour) => (
              <Link
                key={tour.title}
                to="/tour"
                className="group relative flex h-72 flex-col justify-end overflow-hidden rounded-2xl border border-cream-200/70 shadow-warm transition duration-500 hover:-translate-y-1 hover:shadow-premium sm:h-80"
              >
                <img
                  src={tour.image}
                  alt={tour.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-coffee-950/85 via-coffee-950/25 to-transparent"
                />
                <div className="relative p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold-300">
                    {tour.region}
                  </p>
                  <h3 className="mt-1.5 font-serif text-lg leading-snug text-cream-50">
                    {tour.title}
                  </h3>
                  <p className="mt-2 flex items-center gap-2 text-[12px] text-cream-100/85">
                    <span
                      aria-hidden="true"
                      className="inline-block h-1 w-1 rounded-full bg-gold-300"
                    />
                    {tour.meta}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link to="/tour" className="btn-outline-dark">
              View All Tours
            </Link>
          </div>
        </div>
      </section>

      {/* CONCIERGE TRAVEL-CARE BAND */}
      <section className="relative overflow-hidden bg-coffee-950 text-cream-50">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(58,117,103,0.38),transparent_55%),radial-gradient(circle_at_85%_80%,rgba(216,177,109,0.22),transparent_55%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/55 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent"
        />
        <div className="container-page relative grid gap-12 py-20 md:py-24 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <p className="eyebrow-light">Concierge Travel Care</p>
            <h2 className="mt-3 font-serif text-3xl text-balance sm:text-4xl lg:text-[2.4rem]">
              Your route, logistics, and support in{" "}
              <span className="italic text-accent-gold">one calm plan.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-cream-100/85">
              From hotels and transfers to documents, insurance, and route
              coordination, our team helps shape the practical details
              around the story.
            </p>
          </div>

          <div className="space-y-6">
            <ul className="flex flex-wrap gap-x-2.5 gap-y-2.5">
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
            <div className="flex flex-wrap items-center gap-3">
              <Link to="/contact" className="btn-primary">
                Plan with Us
              </Link>
              <Link to="/gallery" className="btn-ghost-light">
                View Gallery
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
