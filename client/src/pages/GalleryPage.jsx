import { useState, useMemo } from "react";

// ---------------------------------------------------------------------------
// Photo data — local, uses only images already present in public/images.
// ---------------------------------------------------------------------------
const PHOTOS = [
  {
    id: "vigan",
    caption: "Vigan at First Light",
    location: "Ilocos Sur",
    category: "Architecture",
    image: "/images/a-glimpse-of-vigan-city.jpg",
  },
  {
    id: "banaue",
    caption: "Cordillera Terraces",
    location: "Mountain Province",
    category: "Landscapes",
    image: "/images/banaue-rice-terreces.jpg",
  },
  {
    id: "mayon",
    caption: "Mayon at Dawn",
    location: "Albay",
    category: "Landscapes",
    image: "/images/mt-mayon.jpg",
  },
  {
    id: "manila",
    caption: "Manila at Night",
    location: "Metro Manila",
    category: "Culture",
    image: "/images/townscape-in-night-at-manila.jpg",
  },
  {
    id: "palawan",
    caption: "El Nido Sunsets",
    location: "Palawan",
    category: "Landscapes",
    image: "/images/palawan-sunset-el-nido-sunset-crimson-and-gold.jpg",
  },
  {
    id: "batanes",
    caption: "Batanes Coastlines",
    location: "Batanes",
    category: "Landscapes",
    image: "/images/marlboro-country-batanes-lanscapes.jpg",
  },
  {
    id: "chocolatehills",
    caption: "Chocolate Hills",
    location: "Bohol",
    category: "Landscapes",
    image: "/images/chocolate-hills.jpg",
  },
  {
    id: "festival",
    caption: "Festival Season",
    location: "Philippines",
    category: "Culture",
    image: "/images/festival.jpg",
  },
  {
    id: "kamayan",
    caption: "Kamayan Feast",
    location: "Philippines",
    category: "Food",
    image: "/images/kamayan-style.jpg",
  },
  {
    id: "weavinghands",
    caption: "Weaving Hands",
    location: "Visayas",
    category: "Crafts",
    image: "/images/gallery-visual-impact/weaving-hands.jpg",
  },
  {
    id: "culture",
    caption: "A Touch of Culture",
    location: "Philippines",
    category: "Culture",
    image: "/images/gallery-visual-impact/a-touch-of-culture.jpg",
  },
  {
    id: "palmtrees",
    caption: "Island Palms",
    location: "Philippines",
    category: "Landscapes",
    image: "/images/gallery-visual-impact/palmtrees.jpg",
  },
  {
    id: "hangingcoffin",
    caption: "Hanging Coffins of Sagada",
    location: "Mountain Province",
    category: "Heritage",
    image: "/images/hanging-coffin.jpg",
  },
  {
    id: "faces",
    caption: "Smiling Faces",
    location: "Philippines",
    category: "People",
    image: "/images/gallery-visual-impact/smiling-faces.jpg",
  },
  {
    id: "weavingfabric",
    caption: "Woven Heritage",
    location: "Visayas",
    category: "Crafts",
    image: "/images/gallery-visual-impact/weaving-fabrics.jpg",
  },
];

// ---------------------------------------------------------------------------
// Video data — youtubeId is null until real IDs are confirmed.
// TODO: Replace each youtubeId with the actual YouTube video ID before launch.
// Embed logic is fully in place; replace null to activate.
// ---------------------------------------------------------------------------
const VIDEOS = [
  {
    id: "vid-vigan",
    title: "Heritage Philippines — The Old City of Vigan",
    location: "Ilocos Sur",
    description:
      "Walking the colonial cobblestone streets of a city that has kept its Spanish-era architecture intact for over four centuries.",
    thumbnail: "/images/a-glimpse-of-vigan-city.jpg",
    youtubeId: null,
  },
  {
    id: "vid-batanes",
    title: "Batanes — Life at the Edge of the Archipelago",
    location: "Batanes",
    description:
      "Wind, stone houses, and a pace of life shaped by the sea. A look at the Ivatan people and the landscape they call home.",
    thumbnail: "/images/marlboro-country-batanes-lanscapes.jpg",
    youtubeId: null,
  },
  {
    id: "vid-banaue",
    title: "The Living Terraces of Banaue",
    location: "Mountain Province",
    description:
      "The Ifugao rice terraces have been cultivated for two thousand years. A look at what it means to keep that tradition alive.",
    thumbnail: "/images/banaue-rice-terreces.jpg",
    youtubeId: null,
  },
  {
    id: "vid-palawan",
    title: "Stories from the Archipelago",
    location: "Philippines",
    description:
      "An editorial journey across the Philippine heritage route — from the highlands of Cordillera to the shores of Palawan.",
    thumbnail: "/images/palawan-sunset-el-nido-sunset-crimson-and-gold.jpg",
    youtubeId: null,
  },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function FeaturedPhoto({ photo }) {
  return (
    <figure className="gallery-feature-photo group">
      <img
        src={photo.image}
        alt={photo.caption}
        loading="eager"
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"
      />
      <figcaption className="absolute inset-x-0 bottom-0 p-6 md:p-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-gold-300">
          {photo.location} · {photo.category}
        </p>
        <p className="mt-2 font-serif text-2xl leading-snug text-cream-50 sm:text-3xl md:text-4xl">
          {photo.caption}
        </p>
      </figcaption>
    </figure>
  );
}

function MemoryCard({ photo }) {
  return (
    <figure className="gallery-memory-card group">
      <img
        src={photo.image}
        alt={photo.caption}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
      />
      <figcaption className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
        <p className="text-[9px] font-semibold uppercase tracking-widest text-gold-300/90">
          {photo.location}
        </p>
        <p className="mt-0.5 font-serif text-sm leading-tight text-cream-50">
          {photo.caption}
        </p>
      </figcaption>
    </figure>
  );
}

function FeaturedVideo({ video, playing, onPlay }) {
  return (
    <div className="gallery-video-feature">
      <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "16/9" }}>
        {playing && video.youtubeId ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&mute=1&rel=0`}
            title={video.title}
            allow="autoplay; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <>
            <img
              src={video.thumbnail}
              alt={video.title}
              loading="eager"
              className="h-full w-full object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-coffee-950/85 via-coffee-950/30 to-transparent"
            />
            {/* Play control or coming-soon badge */}
            <div className="absolute inset-0 flex items-center justify-center">
              {video.youtubeId ? (
                <button
                  type="button"
                  onClick={onPlay}
                  aria-label={`Play ${video.title}`}
                  className="grid h-16 w-16 place-items-center rounded-full bg-gold-400 text-xl text-coffee-950 shadow-xl transition hover:scale-110 hover:bg-gold-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300"
                >
                  ▶
                </button>
              ) : (
                <span className="rounded-full border border-cream-50/20 bg-coffee-950/65 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-cream-100/65 backdrop-blur-sm">
                  Video Coming Soon
                </span>
              )}
            </div>
            {/* Overlay meta */}
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold-400">
                {video.location} · Featured
              </p>
              <p className="mt-2 font-serif text-xl text-cream-50 sm:text-2xl md:text-3xl">
                {video.title}
              </p>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-cream-100/75">
                {video.description}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function VideoCard({ video, playing, onPlay }) {
  return (
    <article className="gallery-video-card">
      <div className="relative aspect-video overflow-hidden rounded-xl border border-cream-200/70 shadow-warm transition duration-300 hover:shadow-premium">
        {playing && video.youtubeId ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&mute=1&rel=0`}
            title={video.title}
            allow="autoplay; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <>
            <img
              src={video.thumbnail}
              alt={video.title}
              loading="lazy"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-black/45"
            />
            {video.youtubeId ? (
              <button
                type="button"
                onClick={onPlay}
                aria-label={`Play ${video.title}`}
                className="absolute inset-0 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-gold-400 text-sm text-coffee-950 shadow-lg transition hover:scale-110 hover:bg-gold-300">
                  ▶
                </span>
              </button>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="rounded-full bg-coffee-950/65 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-cream-100/65">
                  Coming Soon
                </span>
              </div>
            )}
          </>
        )}
      </div>
      <div className="mt-3 px-0.5">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-gold-500">
          {video.location}
        </p>
        <p className="mt-1 font-serif text-base leading-snug text-coffee-900">
          {video.title}
        </p>
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-coffee-800/70">
          {video.description}
        </p>
      </div>
    </article>
  );
}

function EmptyState({ query }) {
  return (
    <div className="gallery-empty-state">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cream-100">
        <span className="text-2xl text-coffee-700/40">⌕</span>
      </div>
      <p className="mt-4 font-serif text-xl text-coffee-900">
        No results for &ldquo;{query}&rdquo;
      </p>
      <p className="mt-2 text-sm text-coffee-800/60">
        Try a different location, category, or keyword.
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function GalleryPage() {
  const [mode, setMode]       = useState("photos");
  const [search, setSearch]   = useState("");
  const [playingId, setPlayingId] = useState(null);

  const filteredPhotos = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return PHOTOS;
    return PHOTOS.filter(
      (p) =>
        p.caption.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [search]);

  const filteredVideos = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return VIDEOS;
    return VIDEOS.filter(
      (v) =>
        v.title.toLowerCase().includes(q) ||
        v.location.toLowerCase().includes(q)
    );
  }, [search]);

  const switchMode = (next) => {
    setMode(next);
    setSearch("");
    // Auto-start the featured video (muted) when entering video mode,
    // but only if a real youtubeId exists — no-op when all are null.
    if (next === "videos") {
      const first = VIDEOS[0];
      setPlayingId(first?.youtubeId ? first.id : null);
    } else {
      setPlayingId(null);
    }
  };

  const featured     = filteredPhotos[0];
  const restPhotos   = filteredPhotos.slice(1);
  const featuredVid  = filteredVideos[0];
  const restVideos   = filteredVideos.slice(1);

  return (
    <main className="min-h-screen bg-warm-cream bg-heritage pb-20 pt-28 sm:pt-32 md:pt-36">
      <div className="container-page">

        {/* ── Toolbar ──────────────────────────────────────────────────── */}
        <div className="gallery-board-toolbar">

          {/* Page title */}
          <div>
            <p className="eyebrow">Gallery</p>
            <h1 className="mt-1 font-serif text-2xl text-coffee-900 sm:text-3xl">
              Frames of the Archipelago
            </h1>
          </div>

          {/* Tab group + search */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="gallery-tab-group" role="tablist" aria-label="Gallery mode">
              <button
                type="button"
                role="tab"
                aria-selected={mode === "photos"}
                aria-pressed={mode === "photos"}
                className={`gallery-mode-button${mode === "photos" ? " gallery-mode-button--active" : ""}`}
                onClick={() => switchMode("photos")}
              >
                Photos
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mode === "videos"}
                aria-pressed={mode === "videos"}
                className={`gallery-mode-button${mode === "videos" ? " gallery-mode-button--active" : ""}`}
                onClick={() => switchMode("videos")}
              >
                Videos
              </button>
            </div>
            <input
              type="search"
              className="gallery-search"
              placeholder={
                mode === "photos" ? "Search places, moments…" : "Search videos…"
              }
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPlayingId(null);
              }}
              aria-label={`Search ${mode}`}
            />
          </div>
        </div>

        {/* ── Photo mode ───────────────────────────────────────────────── */}
        {mode === "photos" && (
          filteredPhotos.length === 0 ? (
            <EmptyState query={search} />
          ) : (
            <div className="gallery-photo-experience">
              {featured && <FeaturedPhoto photo={featured} />}
              {restPhotos.length > 0 && (
                <div className="gallery-grid">
                  {restPhotos.map((p) => (
                    <MemoryCard key={p.id} photo={p} />
                  ))}
                </div>
              )}
            </div>
          )
        )}

        {/* ── Video mode ───────────────────────────────────────────────── */}
        {mode === "videos" && (
          filteredVideos.length === 0 ? (
            <EmptyState query={search} />
          ) : (
            <div className="gallery-video-experience">
              {featuredVid && (
                <FeaturedVideo
                  video={featuredVid}
                  playing={playingId === featuredVid.id}
                  onPlay={() => setPlayingId(featuredVid.id)}
                />
              )}

              {/* Facebook follow CTA */}
              <div className="flex flex-col gap-3 rounded-2xl border border-gold-400/30 bg-gold-400/[0.06] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-coffee-700/65">
                    Heritage Philippines on Facebook
                  </p>
                  <p className="mt-0.5 text-sm text-coffee-800/80">
                    Follow us for more reels, stories, and travel updates from the archipelago.
                  </p>
                </div>
                <a
                  href="https://www.facebook.com/profile.php?id=61584374371729"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex shrink-0 items-center gap-2 rounded-full border border-coffee-800 px-5 py-2 text-xs font-semibold text-coffee-800 transition hover:bg-coffee-800 hover:text-cream-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-coffee-700"
                >
                  Watch more reels on Facebook
                  <span aria-hidden="true">→</span>
                </a>
              </div>

              {restVideos.length > 0 && (
                <div className="gallery-video-grid">
                  {restVideos.map((v) => (
                    <VideoCard
                      key={v.id}
                      video={v}
                      playing={playingId === v.id}
                      onPlay={() => setPlayingId(v.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          )
        )}

      </div>
    </main>
  );
}
