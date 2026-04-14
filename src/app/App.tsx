import { Navigate, Route, Routes } from "react-router-dom";
import { AdminLayout } from "../components/layout/AdminLayout";
import { AppShell } from "../components/layout/AppShell";
import { PublicLayout } from "../components/layout/PublicLayout";
import { AppointmentsPage } from "../pages/appointments/AppointmentsPage";
import { LoginPage } from "../pages/login/LoginPage";
import { PublicSchedulePage } from "../pages/public-schedule/PublicSchedulePage";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/appointments" replace />} />
      <Route element={<AppShell />}>
        <Route element={<AdminLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
        </Route>
        <Route element={<PublicLayout />}>
          <Route path="/public/schedule" element={<PublicSchedulePage />} />
        </Route>
      </Route>
    </Routes>
  );
}
