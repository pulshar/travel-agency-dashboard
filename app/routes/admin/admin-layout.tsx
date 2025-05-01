import { Outlet } from "react-router";

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      sidebar
      <Outlet />
    </div>
  );
}
