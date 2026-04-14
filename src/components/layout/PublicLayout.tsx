import { Outlet } from "react-router-dom";

export function PublicLayout() {
  return (
    <section className="layout-panel" aria-label="Area public">
      <div className="layout-panel__header">
        <p className="eyebrow">Public Checker</p>
        <h2>Cek jadwal terisi</h2>
      </div>
      <Outlet />
    </section>
  );
}
