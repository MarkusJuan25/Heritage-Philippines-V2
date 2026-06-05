import { useState, useMemo } from "react";

function CameraIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none">
      <path
        d="M8.5 7 10 5h4l1.5 2H19a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none">
      <path
        d="M4 7.5A2.5 2.5 0 0 1 6.5 5h8A2.5 2.5 0 0 1 17 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-8A2.5 2.5 0 0 1 4 16.5v-9Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m17 10 4-2.5v9L17 14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
// Video data — real Facebook and YouTube sources.
// ---------------------------------------------------------------------------
const VIDEOS = [
  {
    id: "vid-cuisine",
    title: "Filipino Cuisine Experience",
    location: "Philippines",
    label: "Facebook Reel",
    description:
      "Discover the heart of the Philippines through classic Filipino dishes, fresh local ingredients, and shared meals.",
    thumbnail: "/images/kamayan-style.jpg",
    facebookUrl:
      "https://www.facebook.com/61584374371729/videos/discover-the-heart-of-the-philippines-through-its-cuisine-learn-classic-filipino/960303966423066/",
    externalUrl:
      "https://www.facebook.com/61584374371729/videos/discover-the-heart-of-the-philippines-through-its-cuisine-learn-classic-filipino/960303966423066/",
  },
  {
    id: "vid-mangrove",
    title: "Mangrove Conservation Paddle",
    location: "Philippines",
    label: "Facebook Reel",
    description:
      "Paddle through mangroves and see how local communities protect nature for future generations.",
    thumbnail: "/images/gallery-visual-impact/palmtrees.jpg",
    facebookUrl:
      "https://www.facebook.com/61584374371729/videos/paddle-through-mangroves-and-learn-how-filipinos-protect-nature-for-future-gener/2382838862219221/",
    externalUrl:
      "https://www.facebook.com/61584374371729/videos/paddle-through-mangroves-and-learn-how-filipinos-protect-nature-for-future-gener/2382838862219221/",
  },
  {
    id: "vid-homecoming",
    title: "Heritage Homecoming Reel",
    location: "Philippines",
    label: "Facebook Reel",
    description:
      "A warm reel moment from Heritage Homecoming Philippines, showing the journey, people, and places behind the experience.",
    thumbnail: "/images/heritage-banner.jpg",
    facebookUrl: "https://www.facebook.com/reel/966756215764418",
    externalUrl: "https://www.facebook.com/reel/966756215764418",
  },
  {
    id: "vid-culture",
    title: "Culture In Motion",
    location: "Philippines",
    label: "Video Reel",
    description:
      "Short-form video moments featuring food, rituals, local movement, and cultural encounters.",
    thumbnail: "/images/kamayan-style.jpg",
    youtubeId: "KlOIqPZ2S1s",
    externalUrl: "https://www.youtube.com/watch?v=KlOIqPZ2S1s",
  },
];

// ---------------------------------------------------------------------------
// Video embed helpers
// ---------------------------------------------------------------------------
function getYoutubeEmbedUrl(youtubeId) {
  return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(youtubeId)}?rel=0&controls=1&playsinline=1`;
}

const SAFE_VIDEO_IFRAME_ALLOW =
  "clipboard-write; encrypted-media; picture-in-picture; web-share";

function getVideoEmbedProps(video) {
  if (!video?.youtubeId) return null;
  return {
    src: getYoutubeEmbedUrl(video.youtubeId),
    title: video.title,
    allow: SAFE_VIDEO_IFRAME_ALLOW,
  };
}

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

// Unified reel card for the reel board variants.
function ReelCard({
  video,
  variant = "featured",
  playing = false,
  onPlay,
  onSelect,
  isSelected = false,
}) {
  const featured = variant === "featured";
  const embedProps = featured ? getVideoEmbedProps(video) : null;
  const playable = !!embedProps;
  const thumb = variant === "thumb";

  const articleClass = [
    "gallery-reel-card",
    `gallery-reel-card--${variant}`,
    isSelected ? "gallery-reel-card--selected" : "",
  ].filter(Boolean).join(" ");

  const handleAction = () => {
    if (thumb) {
      onSelect?.();
      return;
    }
    onPlay?.();
  };

  return (
    <article className={articleClass} aria-current={isSelected ? "true" : undefined}>
      {/* ── Card media ──────────────────────────────────────────────── */}
      <div className="gallery-reel-frame group">
        {featured && playing && embedProps ? (
          <iframe
            src={embedProps.src}
            title={embedProps.title}
            scrolling="no"
            allow={embedProps.allow}
            className="gallery-reel-embed"
          />
        ) : (
          <>
            <img
              src={video.thumbnail}
              alt={video.title}
              loading={featured ? "eager" : "lazy"}
              className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 z-10 bg-gradient-to-t from-coffee-950/90 via-coffee-950/20 to-transparent"
            />
            {thumb || playable ? (
              <button
                type="button"
                onClick={handleAction}
                aria-label={
                  featured
                    ? `Load video player for ${video.title}`
                    : `Select ${video.title} video`
                }
                aria-pressed={thumb ? isSelected : undefined}
                className="absolute inset-0 z-20 grid place-items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
              >
                <span className="gallery-reel-play" aria-hidden="true">
                  ▶
                </span>
              </button>
            ) : featured ? (
              <div
                className="absolute inset-0 z-20 grid place-items-center"
                aria-hidden="true"
              >
                <span
                  className="gallery-reel-play gallery-reel-play--preview"
                  aria-hidden="true"
                >
                  ▶
                </span>
              </div>
            ) : (
              <div className="absolute inset-0 z-20 grid place-items-center">
                <span className="inline-flex items-center rounded-full border border-cream-50/20 bg-coffee-950/65 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-cream-100/80 backdrop-blur-sm">
                  Video unavailable
                </span>
              </div>
            )}
            {/* Caption overlay */}
            <div className="gallery-reel-meta">
              <p className="text-[9px] font-semibold uppercase tracking-widest text-gold-300/85">
                {isSelected ? "Now selected" : video.label ?? video.location}
              </p>
              <p
                className={[
                  "mt-0.5 font-serif leading-snug text-cream-50",
                  featured ? "text-base sm:text-lg" : "text-xs sm:text-sm",
                ].join(" ")}
              >
                {video.title}
              </p>
            </div>
          </>
        )}
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
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

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
    setPlayingId(null);
    if (next === "videos") {
      setActiveVideoIndex(0);
    }
  };

  const featured   = filteredPhotos[0];
  const restPhotos = filteredPhotos.slice(1);
  const safeActiveVideoIndex =
    filteredVideos.length > 0
      ? Math.min(activeVideoIndex, filteredVideos.length - 1)
      : 0;
  const selectedVideo = filteredVideos[safeActiveVideoIndex];
  const videoChoices = filteredVideos;

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
          <div className="gallery-filter-toolbar">
            <div className="gallery-tab-group" role="tablist" aria-label="Gallery mode">
              <button
                type="button"
                role="tab"
                aria-selected={mode === "photos"}
                aria-pressed={mode === "photos"}
                aria-label="Show photos"
                className={`gallery-mode-button${mode === "photos" ? " gallery-mode-button--active" : ""}`}
                onClick={() => switchMode("photos")}
              >
                <CameraIcon />
                <span className="gallery-tab-label">Photos</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mode === "videos"}
                aria-pressed={mode === "videos"}
                aria-label="Show videos"
                className={`gallery-mode-button${mode === "videos" ? " gallery-mode-button--active" : ""}`}
                onClick={() => switchMode("videos")}
              >
                <VideoIcon />
                <span className="gallery-tab-label">Videos</span>
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
                setActiveVideoIndex(0);
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

        {/* ── Video mode — unified reel board ─────────────────────────── */}
        {mode === "videos" && (
          filteredVideos.length === 0 ? (
            <EmptyState query={search} />
          ) : (
            <div className="gallery-reel-stage">
              {selectedVideo && (
                <ReelCard
                  video={selectedVideo}
                  variant="featured"
                  playing={playingId === selectedVideo.id}
                  onPlay={() => setPlayingId(selectedVideo.id)}
                  isSelected
                />
              )}

              {videoChoices.length > 1 && (
                <div className="gallery-reel-thumbs">
                  {videoChoices.map((video, index) => (
                    <ReelCard
                      key={video.id}
                      video={video}
                      variant="thumb"
                      playing={false}
                      isSelected={safeActiveVideoIndex === index}
                      onSelect={() => {
                        setActiveVideoIndex(index);
                        setPlayingId(null);
                      }}
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
