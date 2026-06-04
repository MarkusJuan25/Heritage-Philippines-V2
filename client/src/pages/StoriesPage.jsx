import { useState, useEffect, useRef, useCallback } from "react";

// Encode paths that contain spaces / em-dashes so browsers resolve them cleanly.
const img = (p) => encodeURI(p);

// Story data — editorial samples, not verified client testimonials.
const STORIES = [
  {
    id: "bataan",
    location: "Bataan, Central Luzon",
    title: "The Cross on the Mountain",
    accent: "Where memory is built into stone and the dead are never forgotten.",
    preview:
      "We drove into Bataan before the tour buses arrived. The highway follows old roads, some of them built over routes once walked under fire. At the base of Mount Samat, the silence is specific — not empty, but full of something that does not have a simple translation.",
    quote:
      "We climbed Mount Samat not as tourists but as witnesses. The cross does not let you look away.",
    traveler: "A.R., Heritage traveler",
    body: "The Dambana ng Kagitingan on Mount Samat marks the ground where the Battle of Bataan was fought in 1942. The cross rises 95 meters, visible from much of the province. Inside the base, mosaic murals line the walls, and the names of the fallen are recorded in stone. Families visit on quiet weekdays, not just on ceremonial dates. That ordinariness is what makes it stay with you. Bataan is not a museum exhibit — it is a province that continues to live alongside its history.",
    image: img(
      "/images/Luzon/Region III — Central Luzon/Crucible of History Mount Samat Cross.jpg"
    ),
    thumbnailTitle: "Bataan",
  },
  {
    id: "batanes",
    location: "Batanes, Cagayan Valley",
    title: "The Marlboro Hills at First Light",
    accent: "No other landscape in the Philippines makes you feel this small — and this held.",
    preview:
      "The wind here is constant. The stone houses of the Ivatan were built with walls thick enough to outlast three centuries of typhoons, and they have. Batanes runs on a different clock — shaped by weather, harvest, and the sea, not by the pace of the rest of the country.",
    quote:
      "The grass rolls like the sea. You expect the wind to have a name.",
    traveler: "M.S., Heritage traveler",
    body: "Batanes sits at the northernmost tip of the Philippine archipelago, closer to Taiwan than to Manila. The Ivatan people have lived on these islands for centuries, developing a culture that reflects the isolation — stone homes called sinadumparan, the practice of vakul headgear, and a calendar tied to the sea. The Marlboro Hills near Batan Island's interior are rolling, open, and treeless. Standing there, it is possible to see both coasts of the island at once. The quiet is earned by the distance it takes to get here.",
    image: img(
      "/images/Luzon/Region II — Cagayan Valley/Marlboro Hills Batanes.jpg"
    ),
    thumbnailTitle: "Batanes",
  },
  {
    id: "benguet",
    location: "Benguet, Cordillera",
    title: "Roads That Belong to the Mountain",
    accent: "The Cordillera does not open to you. It lets you in — slowly.",
    preview:
      "The cold came before sunrise. My brother and I sat at the edge of a farm while our cousins made breakfast, and nobody said anything for a long time. It was the most at home I had felt on the entire trip — in a province none of us had been to before.",
    quote:
      "Every bend in the road is an argument for staying longer.",
    traveler: "J.D., Heritage traveler",
    body: "Benguet is one of the more underexplored provinces of the Cordillera Administrative Region. Its roads are winding and altitude-dependent — the drive up from the lowlands takes time and rewards patience. The province is home to the Ibaloi and Kankanaey peoples, whose relationship with the land shapes everything from agriculture to burial practice. Strawberry farms and cut-flower markets cluster near La Trinidad. Higher up, the pines take over, and the towns become quieter, colder, and more particular. A multi-day stay here reveals the province's own rhythm, which is not in a hurry to match yours.",
    image: img(
      "/images/Luzon/CAR — Cordillera Administrative Region/Winding Mountain Roads Benguet.jpg"
    ),
    thumbnailTitle: "Benguet",
  },
  {
    id: "iloilo",
    location: "Iloilo, Western Visayas",
    title: "The Church That Weaves",
    accent: "Miagao is a UNESCO site. More than that, it is a living argument.",
    preview:
      "There is a photo of my grandmother on the street outside Miagao Church, taken in 1962. We stood in the same spot — four of us — and tried to line up where she had been. The church was older than she was. It is still standing.",
    quote:
      "The facade tells a story no tour guide can finish in one visit.",
    traveler: "C.V., Heritage traveler",
    body: "The Miagao Church — formally Santo Tomás de Villanueva Parish Church — was built in 1797 and is one of four Baroque churches in the Philippines listed as UNESCO World Heritage Sites. The facade is the most remarkable part: local stone carved into scenes of Philippine flora, with papaya, coconut, and guava trees arranged alongside Saint Christopher crossing what appears to be a Philippine river, not a European one. The adaptation is deliberate and specific. Iloilo's weaving tradition is another layer — hablon cloth, woven on wooden looms in towns like Miag-ao and Molo, carries patterns that are still locally taught.",
    image: img(
      "/images/Visayas/Region VI — Western Visayas/Preserved Heritage Weaving and the Miagao Church.jpg"
    ),
    thumbnailTitle: "Iloilo",
  },
  {
    id: "albay",
    location: "Albay, Bicol Region",
    title: "Living in the Shadow of Mayon",
    accent: "Perfect cone. Unpredictable volcano. The most watched mountain in the Philippines.",
    preview:
      "Mayon was visible from the table where we had lunch — not dramatic, just there, above the fields, the way a mountain is always there. Our host said she has never thought about leaving. The view is part of the reason, but so is everything else.",
    quote:
      "The locals do not seem afraid of Mayon. They seem to understand each other.",
    traveler: "R.M., Heritage traveler",
    body: "Mount Mayon rises 2,463 meters above the Bicol plains and has erupted more than fifty times since records were first kept. The towns below it — Legazpi, Daraga, Santo Domingo — are built on lava fields from previous eruptions, and the communities have developed evacuation protocols as part of ordinary life. That coexistence is not denial; it is practical, generational knowledge. The Bicol food tradition is equally grounded: laing, pinangat, and Bicolano pili nut dishes tell the story of what the land grows and how people learned to use it.",
    image: img(
      "/images/Luzon/Region V — Bicol Region/The Volcano and the Plains Mount Mayon.jpg"
    ),
    thumbnailTitle: "Albay",
  },
  {
    id: "negros",
    location: "Negros Occidental",
    title: "Sugar, Memory, and Silay City",
    accent: "The old houses of Silay are not ruins. They are still in use.",
    preview:
      "We did not expect Silay to hold us for a whole afternoon. The ancestral houses are not cordoned off — you can walk inside several of them. One family still lives in a house built in 1908. They served us coffee in the old sala.",
    quote:
      "Every balay na bato is a different argument for preservation.",
    traveler: "L.T., Heritage traveler",
    body: "Silay City in Negros Occidental is sometimes called the City of Gentle People, and more informally the Paris of Negros — a reference not to Europe but to the concentration of preserved bahay na bato houses that line its streets. The sugar industry brought significant wealth to these families in the nineteenth and early twentieth centuries, and several invested it in homes built to last. Thirty of these houses remain standing today, many of them privately occupied. The Balay Negrense Museum, the Hofileña Heritage House, and the ancestral home of Bernardino Jalandoni are among those open to visitors. The city's food culture — buñuelos, puto maya, and muscovado-sweetened sweets — runs alongside its architecture as a form of local memory.",
    image: img(
      "/images/Visayas/NIR — Negros Island Region/Negros Occidental The Sugar Capital Silay City.jpg"
    ),
    thumbnailTitle: "Negros Occidental",
  },
];

const TOTAL = STORIES.length;
const INTERVAL_MS = 5000;

export default function StoriesPage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [open, setOpen]           = useState(false);
  const [paused, setPaused]       = useState(false);
  const detailRef                 = useRef(null);

  // Auto-rotate — pauses when hovered, focused, or detail is open.
  useEffect(() => {
    if (paused || open) return;
    const id = setInterval(() => {
      setActiveIdx((i) => (i + 1) % TOTAL);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused, open]);

  const selectStory = useCallback((idx) => {
    setOpen(false);
    setActiveIdx(idx);
  }, []);

  const handleReadMore = useCallback(() => {
    setOpen(true);
    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }, []);

  const active  = STORIES[activeIdx];
  const counter = `${String(activeIdx + 1).padStart(2, "0")} / ${String(TOTAL).padStart(2, "0")}`;

  return (
    <>
      {/* ── Story spotlight reel ──────────────────────────────────────── */}
      <section
        className="relative isolate overflow-hidden bg-coffee-950 pb-8 pt-20 text-cream-50 sm:pt-24 md:pt-28"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        {/* Active story image — cinematic background texture */}
        <img
          key={active.id}
          src={active.image}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover"
          style={{ animation: "reel-fade 0.55s ease" }}
        />
        {/* Dark overlay — heavier so the card content dominates */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-coffee-950/92"
        />
        {/* Subtle radial atmosphere */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_12%,rgba(58,117,103,0.18),transparent_50%),radial-gradient(circle_at_90%_85%,rgba(216,177,109,0.10),transparent_50%)]"
        />

        <div className="container-page relative">

          {/* Section label */}
          <div className="mb-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cream-100/45">
              Philippine Heritage Stories
            </span>
          </div>

          {/* Reel grid: story card left · compact thumbnails right */}
          <div className="grid gap-4 lg:grid-cols-[1fr_210px]">

            {/* ── Active story card ────────────────────────────────────── */}
            <div
              key={active.id}
              className="flex flex-col justify-between rounded-2xl border border-gold-400/30 bg-coffee-950/90 p-5 md:p-7"
            >
              <div>
                {/* Eyebrow */}
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold-400">
                  {active.location}
                </p>

                {/* Title */}
                <h2 className="mt-2 font-serif text-xl leading-snug text-cream-50 sm:text-2xl md:text-3xl">
                  {active.title}
                </h2>

                {/* Preview paragraph */}
                <p className="mt-3 text-sm leading-relaxed text-cream-100/85">
                  {active.preview}
                </p>

                {/* Quote */}
                <blockquote className="mt-4 border-l-2 border-gold-400 pl-3 font-serif text-sm italic leading-relaxed text-gold-200">
                  &ldquo;{active.quote}&rdquo;
                </blockquote>

                {/* Traveler */}
                <p className="mt-1.5 pl-3 text-xs text-cream-100/65">
                  — {active.traveler}
                </p>
              </div>

              {/* Action row */}
              <div className="mt-5 flex items-center justify-between gap-3 border-t border-cream-50/10 pt-4">
                <span className="font-serif text-xs tracking-wider text-gold-400/80">
                  {counter}
                </span>
                <button
                  type="button"
                  onClick={handleReadMore}
                  className="inline-flex items-center gap-2 rounded-full bg-gold-400 px-4 py-2 text-xs font-semibold text-coffee-950 transition hover:bg-gold-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300"
                >
                  Read full story <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>

            {/* ── Compact thumbnail list ───────────────────────────────── */}
            <div
              className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-x-visible lg:pb-0"
              role="list"
              aria-label="Story list"
            >
              {STORIES.map((s, i) => (
                <div key={s.id} role="listitem">
                  <button
                    type="button"
                    onClick={() => selectStory(i)}
                    aria-pressed={i === activeIdx}
                    className={[
                      "relative w-44 shrink-0 overflow-hidden rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 lg:w-full",
                      i === activeIdx
                        ? "ring-2 ring-gold-400 ring-offset-1 ring-offset-coffee-950"
                        : "opacity-60 hover:opacity-85",
                    ].join(" ")}
                  >
                    <div className="flex h-[84px] items-center gap-2.5 rounded-xl border border-cream-50/10 bg-coffee-900/80 px-2.5 py-2">
                      <div className="h-[64px] w-12 shrink-0 overflow-hidden rounded-lg">
                        <img
                          src={s.image}
                          alt={s.thumbnailTitle}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-left text-[11px] font-semibold leading-tight text-cream-50">
                          {s.thumbnailTitle}
                        </p>
                        <p className="mt-0.5 truncate text-left text-[10px] leading-tight text-cream-100/55">
                          {s.title}
                        </p>
                      </div>
                    </div>
                    {/* Gold active left bar */}
                    {i === activeIdx && (
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-gold-400"
                      />
                    )}
                  </button>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── Detail section — shown after "Read full story" ─────────────── */}
      {open && (
        <section
          ref={detailRef}
          className="relative isolate border-t border-cream-200 bg-cream-50"
        >
          <div className="container-page py-14">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">

              {/* Image */}
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={active.image}
                  alt={active.location}
                  loading="lazy"
                  className="h-72 w-full object-cover sm:h-96 lg:h-[460px]"
                />
              </div>

              {/* Story text */}
              <div>
                <p className="eyebrow">{active.location}</p>
                <h2 className="mt-3 font-serif text-3xl text-coffee-900 sm:text-4xl">
                  {active.title}
                </h2>
                <p className="mt-4 text-sm italic leading-relaxed text-coffee-800/70">
                  {active.accent}
                </p>
                <blockquote className="mt-5 border-l-2 border-gold-400 pl-4 font-serif text-base italic leading-relaxed text-coffee-900">
                  &ldquo;{active.quote}&rdquo;
                </blockquote>
                <p className="mt-1.5 pl-4 text-xs text-coffee-700/55">
                  — {active.traveler}
                </p>
                <p className="mt-6 text-sm leading-relaxed text-coffee-800/85">
                  {active.body}
                </p>
                <div className="mt-8">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center gap-2 rounded-full border border-coffee-800/25 px-5 py-2.5 text-xs font-semibold text-coffee-800 transition hover:border-coffee-900 hover:text-coffee-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-coffee-800"
                  >
                    ← Back to stories
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>
      )}
    </>
  );
}
