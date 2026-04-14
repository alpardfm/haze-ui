import { NavLink, Outlet } from "react-router-dom";

export function AppShell() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Haze UI</p>
          <h1>Sistem Jadwal Admin</h1>
        </div>
        <nav aria-label="Navigasi utama">
          <NavLink to="/appointments">Appointment</NavLink>
          <NavLink to="/public/schedule">Public Checker</NavLink>
          <NavLink to="/login">Login</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
