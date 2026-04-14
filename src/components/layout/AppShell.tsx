import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { useAuth } from "../../store/auth";

export function AppShell() {
  const navigate = useNavigate();
  const { isAuthenticated, logout, session } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

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
          {isAuthenticated ? (
            <Button variant="ghost" onClick={handleLogout}>
              Logout {session?.admin.name ? session.admin.name : ""}
            </Button>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
