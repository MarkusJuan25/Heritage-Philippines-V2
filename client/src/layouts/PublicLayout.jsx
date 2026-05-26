import { Link, NavLink, Outlet } from "react-router-dom";

const navLinks = [
  { to: "/packages", label: "Packages" },
  { to: "/tour", label: "Tour" },
  { to: "/gallery", label: "Gallery" },
  { to: "/stories", label: "Stories" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact Us" },
];

export default function PublicLayout() {
  return (
    <div className="min-h-full flex flex-col bg-white text-neutral-900">
      <header className="border-b border-neutral-200 bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-semibold text-neutral-900"
          >
            <span
              aria-hidden="true"
              className="inline-block h-8 w-8 rounded-full bg-emerald-700"
            />
            <span>Heritage Philippines</span>
          </Link>
          <ul className="flex items-center gap-6">
            {navLinks.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors ${
                      isActive
                        ? "text-emerald-700"
                        : "text-neutral-700 hover:text-emerald-700"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
