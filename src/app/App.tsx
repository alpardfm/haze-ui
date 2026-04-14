import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "../components/layout/AppShell";
import { AppointmentsPage } from "../pages/appointments/AppointmentsPage";
import { LoginPage } from "../pages/login/LoginPage";
import { PublicSchedulePage } from "../pages/public-schedule/PublicSchedulePage";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/appointments" replace />} />
      <Route element={<AppShell />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/public/schedule" element={<PublicSchedulePage />} />
      </Route>
    </Routes>
  );
}
