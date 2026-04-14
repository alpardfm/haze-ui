import { Outlet } from "react-router-dom";

export function AdminLayout() {
  return (
    <section className="layout-panel" aria-label="Area admin">
      <div className="layout-panel__header">
        <p className="eyebrow">Admin</p>
        <h2>Appointment</h2>
      </div>
      <Outlet />
    </section>
  );
}
