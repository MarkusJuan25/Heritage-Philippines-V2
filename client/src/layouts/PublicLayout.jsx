import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

const navLinks = [
  { to: "/packages", label: "Packages" },
  { to: "/tour", label: "Tour" },
  { to: "/gallery", label: "Gallery" },
  { to: "/stories", label: "Stories" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact Us" },
];

function Brand({ onClick }) {
  return (
    <Link to="/" onClick={onClick} className="group flex items-center gap-3">
      <span className="relative grid h-11 w-11 place-items-center rounded-full bg-forest-800 text-cream-50 shadow-soft">
        <span
          aria-hidden="true"
          className="absolute inset-0.5 rounded-full border border-gold-400/45"
        />
        <span className="relative font-serif text-lg">H</span>
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-serif text-lg tracking-wide text-coffee-900">
          Heritage Philippines
        </span>
        <span className="text-[10px] uppercase tracking-widest text-coffee-600/85">
          Stories · Roots · Journeys
        </span>
      </span>
    </Link>
  );
}

const desktopLinkClass = ({ isActive }) =>
  `relative pb-1 text-sm font-medium tracking-wide transition-colors ${
    isActive
      ? "text-forest-800 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[2px] after:rounded-full after:bg-gold-500"
      : "text-coffee-800 hover:text-forest-700"
  }`;

const mobileLinkClass = ({ isActive }) =>
  `block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? "bg-forest-700 text-cream-50"
      : "text-coffee-800 hover:bg-cream-100"
  }`;

export default function PublicLayout() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="flex min-h-full flex-col bg-cream-50">
      <header className="sticky top-0 z-40 border-b border-cream-200/80 bg-cream-50/85 backdrop-blur">
        <div className="container-page flex items-center justify-between py-5">
          <Brand onClick={close} />
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <NavLink to={l.to} className={desktopLinkClass}>
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cream-200 text-coffee-800 transition hover:bg-cream-100 md:hidden"
          >
            <span aria-hidden="true" className="text-xl leading-none">
              {open ? "×" : "☰"}
            </span>
          </button>
        </div>
        {open && (
          <div className="border-t border-cream-200 bg-cream-50 md:hidden">
            <ul className="container-page flex flex-col gap-1 py-3">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    onClick={close}
                    className={mobileLinkClass}
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="mt-16 border-t border-cream-200 bg-coffee-900 text-cream-100">
        <div className="container-page grid gap-10 py-14 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="grid h-10 w-10 place-items-center rounded-full bg-gold-500 font-serif text-lg text-coffee-900"
              >
                H
              </span>
              <span className="font-serif text-xl text-cream-50">
                Heritage Philippines
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-cream-200/80">
              Slow, story-led journeys across the Philippine archipelago —
              designed for travelers who come for the heritage and stay for
              the soul.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-base text-cream-50">Explore</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  to="/packages"
                  className="text-cream-200/80 transition hover:text-gold-300"
                >
                  Packages
                </Link>
              </li>
              <li>
                <Link
                  to="/tour"
                  className="text-cream-200/80 transition hover:text-gold-300"
                >
                  Tour
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className="text-cream-200/80 transition hover:text-gold-300"
                >
                  Gallery
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-base text-cream-50">Discover</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  to="/stories"
                  className="text-cream-200/80 transition hover:text-gold-300"
                >
                  Stories
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-cream-200/80 transition hover:text-gold-300"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-cream-200/80 transition hover:text-gold-300"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-coffee-800">
          <div className="container-page flex flex-col gap-2 py-5 text-xs text-cream-200/60 sm:flex-row sm:items-center sm:justify-between">
            <span>
              &copy; {new Date().getFullYear()} Heritage Philippines. All
              rights reserved.
            </span>
            <span>Crafted with care in the Philippines.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
