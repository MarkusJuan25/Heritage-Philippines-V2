import { Link, Outlet } from "react-router-dom";

const links = [
  { to: "/member", label: "Overview" },
  { to: "/member/journey", label: "Journey" },
  { to: "/member/bookings", label: "Bookings" },
  { to: "/member/documents", label: "Documents" },
];

export default function MemberLayout() {
  return (
    <div className="min-h-full grid grid-cols-[200px_1fr]">
      <aside className="border-r border-neutral-200 p-4 flex flex-col gap-2">
        {links.map((l) => (
          <Link key={l.to} to={l.to} className="text-sm">
            {l.label}
          </Link>
        ))}
      </aside>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
