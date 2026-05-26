import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="min-h-full p-6">
      <header className="mb-6 text-lg font-semibold">Admin</header>
      <Outlet />
    </div>
  );
}
