import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

const navLinks = [
  { to: "/packages", label: "Packages" },
  { to: "/tour", label: "Tour" },
  { to: "/gallery", label: "Gallery" },
  { to: "/stories", label: "Stories" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact Us" },
];

const desktopLinkClass = ({ isActive }) =>
  `relative px-2.5 pb-1.5 pt-1 text-[11px] font-bold uppercase tracking-[0.14em] transition-[color,letter-spacing] duration-300 after:pointer-events-none after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-6 after:-translate-x-1/2 after:rounded-full after:bg-gradient-to-r after:from-gold-300 after:to-gold-400 after:transition-transform after:duration-300 ${
    isActive
      ? "text-gold-300 after:scale-x-100"
      : "text-cream-100/75 hover:tracking-[0.16em] hover:text-gold-300 after:scale-x-0 hover:after:scale-x-100"
  }`;

const mobileLinkClass = ({ isActive }) =>
  `relative block rounded-full px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] transition-colors ${
    isActive
      ? "bg-cream-50/10 text-gold-300 ring-1 ring-inset ring-gold-400/30"
      : "text-cream-100/80 hover:bg-cream-50/5 hover:text-gold-300"
  }`;

function FloatingNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const close = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Safety net: ensure the mobile menu is closed after any route change,
  // even if a tap did not fire the link's onClick (the X button stays manual).
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-50 px-4 sm:top-4 sm:px-6 lg:px-8">
      <div
        className={`pointer-events-auto mx-auto flex w-full max-w-[1360px] items-center gap-3 rounded-full border px-4 py-2 backdrop-blur-xl transition-all duration-300 sm:gap-4 sm:px-5 sm:py-2.5 lg:px-6 ${
          scrolled
            ? "border-gold-400/35 bg-coffee-900/85 shadow-nav"
            : "border-gold-400/20 bg-coffee-900/70 shadow-nav"
        }`}
      >
        <Link
          to="/"
          onClick={close}
          aria-label="Heritage Philippines — home"
          className="group flex shrink-0 items-center gap-2.5"
        >
          <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-full bg-coffee-900/60 shadow-[inset_0_1px_0_rgba(230,201,143,0.15)] ring-1 ring-gold-400/35">
            <img
              src="/images/heritage-logo.png"
              alt=""
              className="h-7 w-7 object-contain"
              loading="eager"
            />
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="font-serif text-[15px] tracking-wide text-cream-50">
              Heritage Philippines
            </span>
          </span>
        </Link>

        <nav className="hidden flex-1 lg:block" aria-label="Main">
          <ul className="flex items-center justify-end gap-1 pr-1 lg:gap-2">
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
        <div className="pointer-events-auto mx-auto mt-3 w-[min(520px,calc(100%-2rem))] overflow-hidden rounded-3xl border border-gold-400/25 bg-coffee-900/95 shadow-nav backdrop-blur-xl lg:hidden">
          <span
            aria-hidden="true"
            className="block h-px w-full bg-gradient-to-r from-transparent via-gold-400/55 to-transparent"
          />
          <div className="grid gap-1.5 p-3">
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
          className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(211,163,86,0.16),transparent_32%),radial-gradient(circle_at_88%_85%,rgba(58,117,103,0.20),transparent_55%),linear-gradient(135deg,#1a100a_0%,#2f1d13_50%,#5a3925_120%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/55 to-transparent"
        />
        <div className="relative">
          <div className="container-page grid gap-10 py-16 md:grid-cols-12 lg:gap-12">
            {/* BRAND + ACCREDITATION */}
            <div className="md:col-span-12 lg:col-span-4">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-full bg-coffee-900/60 shadow-[inset_0_1px_0_rgba(230,201,143,0.15)] ring-1 ring-gold-400/35">
                  <img
                    src="/images/heritage-logo.png"
                    alt="Heritage Philippines"
                    className="h-8 w-8 object-contain"
                  />
                </span>
                <span className="block font-serif text-xl leading-tight text-cream-50">
                  Heritage Philippines
                </span>
              </div>

              <h3 className="mt-8 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-gold-300">
                Accreditation &amp; Affiliations
              </h3>
              <span
                aria-hidden="true"
                className="mt-3 block h-px w-10 bg-gold-400/60"
              />
              <div className="mt-5 flex flex-wrap items-center gap-4">
                {[
                  {
                    src: "/footer/dot-logo-1.png",
                    alt: "Department of Tourism Philippines",
                  },
                  { src: "/footer/aita-logo2025.png", alt: "AITA" },
                  {
                    src: "/footer/ptaa-logo-transparent-clean.png",
                    alt: "PTAA",
                  },
                ].map((logo) => (
                  <img
                    key={logo.src}
                    src={logo.src}
                    alt={logo.alt}
                    loading="lazy"
                    className="h-10 w-auto object-contain opacity-90"
                  />
                ))}
              </div>
            </div>

            {/* QUICK LINKS */}
            <div className="md:col-span-4 lg:col-span-2">
              <h3 className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-gold-300">
                Quick Links
              </h3>
              <span
                aria-hidden="true"
                className="mt-3 block h-px w-10 bg-gold-400/60"
              />
              <ul className="mt-4 space-y-2.5 text-sm">
                {[
                  { to: "/tour", label: "Tour" },
                  { to: "/packages", label: "Packages" },
                  { to: "/gallery", label: "Gallery" },
                  { to: "/stories", label: "Stories" },
                  { to: "/about", label: "About" },
                  { to: "/contact", label: "Contact Us" },
                ].map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="inline-block text-cream-200/80 transition-all duration-200 hover:translate-x-0.5 hover:text-gold-300"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* SERVICES */}
            <div className="md:col-span-4 lg:col-span-3">
              <h3 className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-gold-300">
                Services
              </h3>
              <span
                aria-hidden="true"
                className="mt-3 block h-px w-10 bg-gold-400/60"
              />
              <ul className="mt-4 space-y-2.5 text-sm text-cream-200/80">
                <li>Curated Heritage Tours</li>
                <li>Hotels &amp; Transfers</li>
                <li>Visa and Insurance Assistance</li>
                <li>Custom Family Routes</li>
                <li>Regional Tour Planning</li>
              </ul>
            </div>

            {/* OFFICE ADDRESS */}
            <div className="md:col-span-4 lg:col-span-3">
              <h3 className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-gold-300">
                Office Address
              </h3>
              <span
                aria-hidden="true"
                className="mt-3 block h-px w-10 bg-gold-400/60"
              />
              <address className="mt-4 text-sm not-italic leading-relaxed text-cream-200/80">
                Unit 603, 6th Floor, West Insula Condominium
                <br />
                135 West Avenue, Quezon City 1105
                <br />
                Metro Manila, Philippines
              </address>
              <Link
                to="/contact"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-300 transition-all duration-200 hover:gap-2.5 hover:text-gold-200"
              >
                Contact our team <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          {/* BOTTOM BAR */}
          <div className="border-t border-gold-400/15">
            <div className="container-page flex flex-col gap-3 py-5 text-xs text-cream-200/60 sm:flex-row sm:items-center sm:justify-between">
              <span>
                &copy; {new Date().getFullYear()} Heritage Philippines. All
                rights reserved.
              </span>
              <div className="flex items-center gap-3 text-cream-200/45">
                <span>Privacy Policy</span>
                <span aria-hidden="true" className="text-gold-300/30">|</span>
                <span>Terms &amp; Conditions</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
