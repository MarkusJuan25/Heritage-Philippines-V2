import { Link, Outlet } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/packages", label: "Packages" },
  { to: "/gallery", label: "Gallery" },
  { to: "/stories", label: "Stories" },
  { to: "/about", label: "About" },
];

export default function PublicLayout() {
  return (
    <div className="min-h-full flex flex-col">
      <header className="border-b border-neutral-200 px-6 py-4 flex gap-6">
        {links.map((l) => (
          <Link key={l.to} to={l.to} className="text-sm font-medium">
            {l.label}
          </Link>
        ))}
      </header>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
