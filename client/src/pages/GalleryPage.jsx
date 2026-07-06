import { useState, useMemo, useEffect, useRef } from "react";

const GALLERY_IMAGE_FALLBACK = "/images/kamayan-style.jpg";

function handleImageFallback(event) {
  const image = event.currentTarget;
  image.onerror = null;
  image.src = GALLERY_IMAGE_FALLBACK;
}

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
    image: "/images/manila-cathedral-at-night.jpg",
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
    image: "/images/a-festive-that-cant-miss.jpg",
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
    image: "/images/visayas-pinya-weaving-hands-aklan.jpg",
  },
  {
    id: "culture",
    caption: "A Touch of Culture",
    location: "Philippines",
    category: "Culture",
    image: "/images/philippines-a-touch-of-culture-parol.jpg",
  },
  {
    id: "palmtrees",
    caption: "Island Palms",
    location: "Philippines",
    category: "Landscapes",
    image: "/images/gallery-visual-impact/a-line-of-palmtrees-you-miss.jpg",
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
    caption: "Heritage at Home",
    location: "Philippines",
    category: "Architecture",
    image: "/images/heritage-home.jpg",
  },
  {
    id: "weavingfabric",
    caption: "Woven Heritage",
    location: "Visayas",
    category: "Crafts",
    image: "/images/visayas-woven-heritage-aklan-pina.jpg",
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
    thumbnail: "/images/palawan-sunset-el-nido-sunset-crimson-and-gold.jpg",
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
  // autoplay=1 + mute=1 must be paired for browsers to permit autoplay at
  // all; playsinline=1 keeps iOS Safari from forcing fullscreen playback.
  return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(youtubeId)}?rel=0&controls=1&playsinline=1&autoplay=1&mute=1`;
}

function getFacebookEmbedUrl(facebookUrl) {
  // Facebook's plugin auto-mutes autoplaying video per browser policy and
  // exposes its own unmute control, so no separate mute param is needed.
  return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(facebookUrl)}&show_text=false&width=900&autoplay=true`;
}

// "autoplay" must be explicitly granted here, or the browser's permissions
// policy blocks it inside the iframe even when the URL itself requests it.
// "fullscreen" is required for the Facebook player's own fullscreen control.
const SAFE_VIDEO_IFRAME_ALLOW =
  "autoplay; fullscreen; clipboard-write; encrypted-media; picture-in-picture; web-share";

function getVideoEmbedProps(video) {
  if (video?.youtubeId) {
    return {
      src: getYoutubeEmbedUrl(video.youtubeId),
      title: video.title,
      allow: SAFE_VIDEO_IFRAME_ALLOW,
    };
  }
  if (video?.facebookUrl) {
    return {
      src: getFacebookEmbedUrl(video.facebookUrl),
      title: video.title,
      allow: SAFE_VIDEO_IFRAME_ALLOW,
    };
  }
  return null;
}

function getFirstPlayableVideoIndex(videos) {
  const playableIndex = videos.findIndex((video) => getVideoEmbedProps(video));
  return playableIndex >= 0 ? playableIndex : 0;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function FeaturedPhoto({ photo, onOpen }) {
  return (
    <figure className="gallery-feature-photo group">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`View photo: ${photo.caption}`}
        className="gallery-photo-open-btn"
      />
      <img
        src={photo.image}
        alt={photo.caption}
        loading="eager"
        onError={handleImageFallback}
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"
      />
      <figcaption className="absolute inset-x-0 bottom-0 z-20 p-6 pointer-events-none md:p-8">
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

function MemoryCard({ photo, onOpen }) {
  return (
    <figure className="gallery-memory-card group">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`View photo: ${photo.caption}`}
        className="gallery-photo-open-btn"
      />
      <img
        src={photo.image}
        alt={photo.caption}
        loading="lazy"
        onError={handleImageFallback}
        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
      />
      <figcaption className="absolute inset-x-0 bottom-0 z-20 p-3 pointer-events-none sm:p-4">
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

// The single active reel: portrait media stage on the left (or on top, on
// narrow screens) and an information panel with navigation on the right (or
// below). Mounts an iframe only once this reel has been explicitly played.
function ReelFeedItem({
  video,
  index,
  total,
  playing,
  onPlay,
  onPrev,
  onNext,
  disablePrev,
  disableNext,
}) {
  const embedProps = getVideoEmbedProps(video);
  const playable = !!embedProps;
  const isEmbedding = playing && playable;

  const [embedStatus, setEmbedStatus] = useState("idle");

  useEffect(() => {
    setEmbedStatus(isEmbedding ? "loading" : "idle");
    // embedProps is recreated on every render, so we key off its stable src
    // instead of the object reference to avoid re-triggering the loading state.
  }, [playing, video.id, embedProps?.src]);

  return (
    <article
      className="gallery-reels-theatre"
      aria-label={`Reel ${index + 1} of ${total}: ${video.title}`}
    >
      <div className="gallery-reels-stage">
        <img
          src={video.thumbnail}
          alt={video.title}
          loading="eager"
          onError={handleImageFallback}
          className="gallery-reels-poster"
        />
        <div aria-hidden="true" className="gallery-reels-media-layer" />

        {/* Previous: overlays the stage's top edge (an "upward" cue) on
            mobile, and its left edge (vertically centered) on desktop —
            same button, same handler, repositioned/reskinned via CSS.
            Anchored to the stage itself (not a wider wrapper) so it tracks
            the video's actual edges at every breakpoint, including the
            768–959px range where the theatre is still single-column but
            the stage is already capped and centered narrower than it. */}
        <button
          type="button"
          onClick={onPrev}
          disabled={disablePrev}
          aria-label="Previous reel"
          className="gallery-reels-cue gallery-reels-cue--prev"
        >
          <span aria-hidden="true" className="gallery-reels-cue-icon gallery-reels-cue-icon--up">
            ↑
          </span>
          <span aria-hidden="true" className="gallery-reels-cue-icon gallery-reels-cue-icon--side">
            ‹
          </span>
        </button>

        {/* Next: desktop-only overlay on the stage's right edge. On mobile
            the down control lives in the theatre navigation row below
            instead (see ReelNavigation), so this stays hidden there. */}
        <button
          type="button"
          onClick={onNext}
          disabled={disableNext}
          aria-label="Next reel"
          className="gallery-reels-cue gallery-reels-cue--next"
        >
          <span aria-hidden="true">›</span>
        </button>

        {isEmbedding ? (
          <>
            <iframe
              src={embedProps.src}
              title={embedProps.title}
              scrolling="no"
              allow={embedProps.allow}
              allowFullScreen
              onLoad={() => setEmbedStatus("ready")}
              onError={() => setEmbedStatus("error")}
              className={`gallery-reel-embed${embedStatus === "ready" ? " is-ready" : ""}`}
            />
            {embedStatus === "loading" && (
              <div className="gallery-reel-loading" role="status" aria-live="polite">
                <span className="gallery-reel-spinner" aria-hidden="true" />
                <span>Loading video…</span>
              </div>
            )}
            {embedStatus === "error" && (
              <div className="gallery-reel-error">
                <p>We couldn&rsquo;t load this video.</p>
                <a
                  href={video.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gallery-reel-error-link"
                >
                  Open original video
                </a>
              </div>
            )}
          </>
        ) : playable ? (
          <button
            type="button"
            onClick={onPlay}
            aria-label={`Play ${video.title}`}
            className="absolute inset-0 z-20 grid place-items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
          >
            <span className="gallery-reels-play-btn" aria-hidden="true">
              ▶
            </span>
          </button>
        ) : (
          <div className="absolute inset-0 z-20 grid place-items-center">
            <span
              className="gallery-reel-preview-label"
              data-label="Preview only"
              aria-hidden="true"
            >
              ▶
            </span>
          </div>
        )}
      </div>

      <div className="gallery-reels-details">
        {/* Row 1: platform label + position counter */}
        <div className="gallery-reels-meta">
          <span className="gallery-reels-platform">
            {video.label ?? video.location}
          </span>
          <span className="gallery-reels-counter">
            {index + 1} / {total}
          </span>
        </div>

        {/* Row 2: title, description, source link — centered vertically on desktop */}
        <div className="gallery-reels-copy">
          <h2 className="gallery-reels-title">{video.title}</h2>

          {video.description && (
            <p className="gallery-reels-description">{video.description}</p>
          )}

          <div className="gallery-reels-source">
            {!playable && (
              <span className="gallery-reels-badge">Preview only</span>
            )}
            <a
              href={video.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="gallery-reels-source-link"
            >
              Open original ↗
            </a>
          </div>
        </div>

        {/* Row 3: Previous/Next */}
        <ReelNavigation
          onPrev={onPrev}
          onNext={onNext}
          disablePrev={disablePrev}
          disableNext={disableNext}
        />
      </div>
    </article>
  );
}

// Previous/Next controls integrated into each reel's information panel.
function ReelNavigation({ onPrev, onNext, disablePrev, disableNext }) {
  return (
    <div className="gallery-reels-navigation">
      <button
        type="button"
        onClick={onPrev}
        disabled={disablePrev}
        aria-label="Previous reel"
        className="gallery-reels-nav-button gallery-reels-nav-button--prev"
      >
        <span aria-hidden="true">‹</span>
        <span>Previous</span>
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={disableNext}
        aria-label="Next reel"
        className="gallery-reels-nav-button gallery-reels-nav-button--next"
      >
        <span className="gallery-reels-nav-label">Next</span>
        <span aria-hidden="true" className="gallery-reels-nav-icon gallery-reels-nav-icon--side">›</span>
        <span aria-hidden="true" className="gallery-reels-nav-icon gallery-reels-nav-icon--down">↓</span>
      </button>
    </div>
  );
}

function PhotoLightbox({ photo, onClose, onPrev, onNext }) {
  const touchStartX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 50) return;
    e.preventDefault();
    if (delta < 0) onNext();
    else onPrev();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="gallery-lightbox-title"
      className="gallery-lightbox-overlay"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button
        type="button"
        aria-label="Close photo"
        className="gallery-lightbox-close"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
      >
        ×
      </button>

      <button
        type="button"
        aria-label="Previous photo"
        className="gallery-lightbox-nav gallery-lightbox-nav--prev"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
      >
        ‹
      </button>

      <button
        type="button"
        aria-label="Next photo"
        className="gallery-lightbox-nav gallery-lightbox-nav--next"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
      >
        ›
      </button>

      <figure
        className="gallery-lightbox-figure"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photo.image}
          alt={photo.caption}
          onError={handleImageFallback}
          className="gallery-lightbox-img"
        />
        <figcaption className="gallery-lightbox-caption">
          <p id="gallery-lightbox-title" className="gallery-lightbox-title">
            {photo.caption}
          </p>
        </figcaption>
      </figure>
    </div>
  );
}

function EmptyState({ query }) {
  return (
    <div className="gallery-empty-state">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cream-100">
        <span className="text-2xl text-coffee-700/40">○</span>
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
  const [mode, setMode]           = useState("photos");
  const [search, setSearch]       = useState("");
  const [playingId, setPlayingId] = useState(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState(() =>
    getFirstPlayableVideoIndex(VIDEOS)
  );

  // Lightbox identified by stable photo ID rather than array index.
  const [activePhotoId, setActivePhotoId] = useState(null);

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

  // Derive active photo from its stable ID.
  const activePhotoIndex = filteredPhotos.findIndex((p) => p.id === activePhotoId);
  const activePhoto = activePhotoIndex >= 0 ? filteredPhotos[activePhotoIndex] : null;

  // Ref so the keyboard handler always sees the latest filtered list without
  // needing filteredPhotos in its dependency array (which would re-register
  // the listener on every shuffle).
  const filteredPhotosRef = useRef(filteredPhotos);
  useEffect(() => {
    filteredPhotosRef.current = filteredPhotos;
  }, [filteredPhotos]);

  const closePhoto = () => setActivePhotoId(null);

  const showPreviousPhoto = () => {
    const photos = filteredPhotosRef.current;
    const idx = photos.findIndex((p) => p.id === activePhotoId);
    if (idx < 0) return;
    setActivePhotoId(photos[(idx - 1 + photos.length) % photos.length].id);
  };

  const showNextPhoto = () => {
    const photos = filteredPhotosRef.current;
    const idx = photos.findIndex((p) => p.id === activePhotoId);
    if (idx < 0) return;
    setActivePhotoId(photos[(idx + 1) % photos.length].id);
  };

  // Body scroll lock + keyboard navigation while lightbox is open.
  useEffect(() => {
    if (!activePhotoId) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKey = (e) => {
      if (e.key === "Escape") {
        setActivePhotoId(null);
      } else if (e.key === "ArrowLeft") {
        setActivePhotoId((currentId) => {
          const photos = filteredPhotosRef.current;
          const idx = photos.findIndex((p) => p.id === currentId);
          if (idx < 0) return currentId;
          return photos[(idx - 1 + photos.length) % photos.length].id;
        });
      } else if (e.key === "ArrowRight") {
        setActivePhotoId((currentId) => {
          const photos = filteredPhotosRef.current;
          const idx = photos.findIndex((p) => p.id === currentId);
          if (idx < 0) return currentId;
          return photos[(idx + 1) % photos.length].id;
        });
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", handleKey);
    };
  }, [activePhotoId]);

  const switchMode = (next) => {
    setMode(next);
    setSearch("");
    // Stop and unmount any playing video when switching tabs. The previously
    // selected reel index is preserved (and clamped by safeActiveVideoIndex
    // below), so coming back to Videos re-selects the same reel and
    // auto-plays it again via the mode/videoChoices effect below.
    setPlayingId(null);
  };

  const featured   = filteredPhotos[0];
  const restPhotos = filteredPhotos.slice(1);
  const safeActiveVideoIndex =
    filteredVideos.length > 0
      ? Math.min(activeVideoIndex, filteredVideos.length - 1)
      : 0;
  const videoChoices = filteredVideos;
  const activeVideo = videoChoices[safeActiveVideoIndex];

  // Move to a different reel. Because only one ReelFeedItem is ever mounted
  // (keyed on the video id), the previous reel's iframe is fully unmounted
  // the instant the index changes — this always auto-plays (muted) the
  // newly selected reel, matching the Reels-style browsing experience.
  const changeActiveVideo = (nextIndex) => {
    if (nextIndex < 0 || nextIndex >= videoChoices.length) return;
    const nextVideo = videoChoices[nextIndex];
    setActiveVideoIndex(nextIndex);
    setPlayingId(nextVideo ? nextVideo.id : null);
  };

  // Vertical swipe navigation for the single reel theatre on mobile. Only
  // fires on touches that start outside the embedded iframe (cross-origin
  // touch events never bubble to this parent handler), so the on-stage
  // Previous/Next cues remain the reliable fallback for swipes that begin
  // on the video itself.
  const touchStartRef = useRef(null);

  const handleReelTouchStart = (event) => {
    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleReelTouchEnd = (event) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start) return;
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    // Require a predominantly vertical gesture of at least 50px so
    // horizontal swipes and ordinary taps are ignored.
    if (Math.abs(deltaY) < 50 || Math.abs(deltaY) <= Math.abs(deltaX)) return;
    if (deltaY < 0) changeActiveVideo(safeActiveVideoIndex + 1);
    else changeActiveVideo(safeActiveVideoIndex - 1);
  };

  const handleReelTouchCancel = () => {
    touchStartRef.current = null;
  };

  // Auto-play (muted) the resolved reel whenever the Videos tab is opened or
  // the filtered results change (e.g. a new search) — matches the same
  // Reels-style behavior as navigating between reels via changeActiveVideo.
  useEffect(() => {
    if (mode !== "videos") return;
    const defaultVideo = videoChoices[safeActiveVideoIndex];
    setPlayingId(defaultVideo ? defaultVideo.id : null);
  }, [mode, videoChoices]);

  // Keyboard navigation for the reel theatre, active only while Videos is shown.
  useEffect(() => {
    if (mode !== "videos") return undefined;

    const isInteractiveTarget = (target) => {
      if (!target) return false;
      if (target.isContentEditable) return true;
      const tag = target.tagName;
      return ["INPUT", "TEXTAREA", "SELECT", "BUTTON", "A", "IFRAME"].includes(tag);
    };

    const handleKeyDown = (event) => {
      if (isInteractiveTarget(event.target)) return;

      if (event.key === "ArrowDown" || event.key === "PageDown" || event.key === "ArrowRight") {
        if (safeActiveVideoIndex < videoChoices.length - 1) {
          event.preventDefault();
          changeActiveVideo(safeActiveVideoIndex + 1);
        }
      } else if (event.key === "ArrowUp" || event.key === "PageUp" || event.key === "ArrowLeft") {
        if (safeActiveVideoIndex > 0) {
          event.preventDefault();
          changeActiveVideo(safeActiveVideoIndex - 1);
        }
      } else if (event.key === "Escape") {
        setPlayingId(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mode, safeActiveVideoIndex, videoChoices]);

  return (
    <>
    <main className="gallery-page-shell min-h-screen bg-warm-cream bg-heritage pb-20 pt-32 sm:pt-36 md:pt-40">
      <div className="container-page">

        {/* Page header + toolbar */}
        <div
          className={`gallery-page-header${
            mode === "videos" ? " gallery-page-header--video" : ""
          }`}
        >
          <div className="gallery-page-heading">
            <p className="eyebrow">Gallery</p>
            <h1 className="mt-1 font-serif text-2xl text-coffee-900 sm:text-3xl">
              Frames of the Archipelago
            </h1>
          </div>

          <div
            className={`gallery-toolbar${mode === "videos" ? " gallery-toolbar--video" : ""}`}
          >
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
                const nextSearch = e.target.value;
                const q = nextSearch.trim().toLowerCase();
                const nextVideos = q
                  ? VIDEOS.filter(
                      (v) =>
                        v.title.toLowerCase().includes(q) ||
                        v.location.toLowerCase().includes(q)
                    )
                  : VIDEOS;
                setSearch(nextSearch);
                // playingId is resynced to the new default video by the
                // mode/videoChoices effect once filteredVideos recomputes.
                setActiveVideoIndex(getFirstPlayableVideoIndex(nextVideos));
              }}
              aria-label={`Search ${mode}`}
            />
          </div>
        </div>

        {/* Photo mode */}
        {mode === "photos" && (
          filteredPhotos.length === 0 ? (
            <EmptyState query={search} />
          ) : (
            <div className="gallery-photo-experience">
              {featured && (
                <FeaturedPhoto
                  photo={featured}
                  onOpen={() => setActivePhotoId(featured.id)}
                />
              )}
              {restPhotos.length > 0 && (
                <div className="gallery-grid">
                  {restPhotos.map((photo) => (
                    <MemoryCard
                      key={photo.id}
                      photo={photo}
                      onOpen={() => setActivePhotoId(photo.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          )
        )}

        {/* Video mode — single active reel theatre, normal document flow so
            the theatre contributes its natural height and the footer always
            begins right after it (no nested scroll container). */}
        {mode === "videos" && (
          filteredVideos.length === 0 ? (
            <EmptyState query={search} />
          ) : (
            <div
              className="gallery-reels-viewer"
              onTouchStart={handleReelTouchStart}
              onTouchEnd={handleReelTouchEnd}
              onTouchCancel={handleReelTouchCancel}
            >
              <ReelFeedItem
                key={activeVideo.id}
                video={activeVideo}
                index={safeActiveVideoIndex}
                total={videoChoices.length}
                playing={playingId === activeVideo.id}
                onPlay={() => setPlayingId(activeVideo.id)}
                onPrev={() => changeActiveVideo(safeActiveVideoIndex - 1)}
                onNext={() => changeActiveVideo(safeActiveVideoIndex + 1)}
                disablePrev={safeActiveVideoIndex === 0}
                disableNext={safeActiveVideoIndex === videoChoices.length - 1}
              />
            </div>
          )
        )}

      </div>
    </main>
    {activePhoto && (
      <PhotoLightbox
        photo={activePhoto}
        onClose={closePhoto}
        onPrev={showPreviousPhoto}
        onNext={showNextPhoto}
      />
    )}
    </>
  );
}
