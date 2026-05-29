import { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

const navLinks = [
  { to: "/packages", label: "Packages" },
  { to: "/tour", label: "Tour" },
  { to: "/gallery", label: "Gallery" },
  { to: "/stories", label: "Stories" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact Us" },
];

const desktopLinkClass = ({ isActive }) =>
  `relative px-3 py-1 text-[12.5px] font-semibold tracking-[0.06em] transition-colors after:pointer-events-none after:absolute after:inset-x-2.5 after:-bottom-0.5 after:h-px after:origin-center after:bg-gradient-to-r after:from-transparent after:via-gold-300 after:to-transparent after:transition-transform after:duration-300 ${
    isActive
      ? "text-gold-300 [text-shadow:0_0_14px_rgba(216,177,109,0.35)] after:scale-x-100"
      : "text-cream-100/80 hover:text-gold-300 after:scale-x-0 hover:after:scale-x-100"
  }`;

const mobileLinkClass = ({ isActive }) =>
  `relative block rounded-full px-4 py-3 text-sm font-semibold tracking-wide transition-colors ${
    isActive
      ? "bg-cream-50/10 text-gold-300 ring-1 ring-inset ring-gold-400/30"
      : "text-cream-100/85 hover:bg-cream-50/5 hover:text-gold-300"
  }`;

function FloatingNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-4">
      <div
        className={`pointer-events-auto mx-auto flex w-full max-w-[1180px] items-center gap-3 rounded-full border px-3 py-2 backdrop-blur-xl transition-all duration-300 sm:gap-4 sm:px-4 sm:py-2.5 ${
          scrolled
            ? "border-gold-400/30 bg-coffee-950/85 shadow-nav"
            : "border-gold-400/20 bg-coffee-950/70 shadow-nav"
        }`}
      >
        <Link
          to="/"
          onClick={close}
          aria-label="Heritage Philippines — home"
          className="group flex shrink-0 items-center gap-2.5"
        >
          <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-full bg-cream-50/[0.06] ring-1 ring-gold-400/40">
            <img
              src="/images/heritage-logo.png"
              alt=""
              className="h-7 w-7 object-contain"
              loading="eager"
            />
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-serif text-[15px] tracking-wide text-cream-50">
              Heritage Philippines
            </span>
            <span className="text-[9.5px] uppercase tracking-[0.22em] text-gold-300/80">
              Stories · Roots · Journeys
            </span>
          </span>
        </Link>

        <nav className="hidden flex-1 lg:block" aria-label="Main">
          <ul className="flex items-center justify-center gap-1">
            {navLinks.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} className={desktopLinkClass}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 place-items-center rounded-full border border-gold-400/30 bg-cream-50/[0.06] text-cream-50 transition hover:bg-cream-50/[0.12] lg:hidden"
          >
            <span aria-hidden="true" className="text-lg leading-none">
              {open ? "×" : "☰"}
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="pointer-events-auto mx-auto mt-3 grid w-[min(520px,calc(100%-2rem))] gap-1 rounded-3xl border border-gold-400/25 bg-coffee-950/95 p-3 shadow-nav backdrop-blur-xl lg:hidden">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={close}
              className={mobileLinkClass}
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}

export default function PublicLayout() {
  return (
    <div className="flex min-h-full flex-col bg-cream-50">
      <FloatingNav />

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="relative mt-20 overflow-hidden bg-coffee-950 text-cream-100">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_12%_25%,rgba(58,117,103,0.25),transparent_55%),radial-gradient(circle_at_88%_85%,rgba(216,177,109,0.18),transparent_55%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/55 to-transparent"
        />
        <div className="relative">
          <div className="container-page grid gap-12 py-16 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-full bg-cream-50/[0.06] ring-1 ring-gold-400/40">
                  <img
                    src="/images/heritage-logo.png"
                    alt=""
                    className="h-7 w-7 object-contain"
                  />
                </span>
                <div>
                  <span className="block font-serif text-xl leading-tight text-cream-50">
                    Heritage Philippines
                  </span>
                  <span className="mt-0.5 block text-[10px] uppercase tracking-[0.24em] text-gold-300/80">
                    Curated since 2013
                  </span>
                </div>
              </div>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-cream-200/85">
                Slow, story-led journeys across the Philippine archipelago —
                designed for travelers who come for the heritage and stay
                for the soul.
              </p>
              <span
                aria-hidden="true"
                className="mt-6 block h-px w-16 bg-gradient-to-r from-gold-400/70 to-transparent"
              />
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[11px] uppercase tracking-widest text-cream-200/65">
                <span>By appointment</span>
                <span aria-hidden="true" className="text-gold-300/50">·</span>
                <span>Manila, Philippines</span>
                <span aria-hidden="true" className="text-gold-300/50">·</span>
                <span>hello@heritage.ph</span>
              </div>
            </div>
            <div className="md:col-span-3">
              <h3 className="font-serif text-base text-cream-50">Explore</h3>
              <span
                aria-hidden="true"
                className="mt-3 block h-px w-10 bg-gold-400/60"
              />
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <Link to="/packages" className="inline-block text-cream-200/80 transition-all duration-200 hover:translate-x-0.5 hover:text-gold-300">
                    Packages
                  </Link>
                </li>
                <li>
                  <Link to="/tour" className="inline-block text-cream-200/80 transition-all duration-200 hover:translate-x-0.5 hover:text-gold-300">
                    Tour
                  </Link>
                </li>
                <li>
                  <Link to="/gallery" className="inline-block text-cream-200/80 transition-all duration-200 hover:translate-x-0.5 hover:text-gold-300">
                    Gallery
                  </Link>
                </li>
              </ul>
            </div>
            <div className="md:col-span-4">
              <h3 className="font-serif text-base text-cream-50">Discover</h3>
              <span
                aria-hidden="true"
                className="mt-3 block h-px w-10 bg-gold-400/60"
              />
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <Link to="/stories" className="inline-block text-cream-200/80 transition-all duration-200 hover:translate-x-0.5 hover:text-gold-300">
                    Stories
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="inline-block text-cream-200/80 transition-all duration-200 hover:translate-x-0.5 hover:text-gold-300">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="inline-block text-cream-200/80 transition-all duration-200 hover:translate-x-0.5 hover:text-gold-300">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-cream-50/10">
            <div className="container-page flex flex-col gap-2 py-5 text-xs text-cream-200/60 sm:flex-row sm:items-center sm:justify-between">
              <span>
                &copy; {new Date().getFullYear()} Heritage Philippines. All
                rights reserved.
              </span>
              <span className="tracking-wide">
                Crafted with care in the Philippines.
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
