import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../components/auth/ProtectedRoute";
import { AdminLayout } from "../components/layout/AdminLayout";
import { AppShell } from "../components/layout/AppShell";
import { PublicLayout } from "../components/layout/PublicLayout";
import { AppointmentComingSoonPage } from "../pages/appointments/AppointmentComingSoonPage";
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
          <Route element={<ProtectedRoute />}>
            <Route path="/appointments" element={<AppointmentsPage />} />
            <Route
              path="/appointments/create"
              element={
                <AppointmentComingSoonPage
                  title="Create appointment dibangun di Phase 4"
                  description="Dashboard sudah menyiapkan jalur ke halaman create."
                />
              }
            />
            <Route
              path="/appointments/:id"
              element={
                <AppointmentComingSoonPage
                  title="Detail appointment dibangun di Phase 5"
                  description="Dashboard sudah menyiapkan jalur ke halaman detail."
                />
              }
            />
            <Route
              path="/appointments/:id/edit"
              element={
                <AppointmentComingSoonPage
                  title="Edit appointment dibangun di Phase 6"
                  description="Dashboard sudah menyiapkan jalur ke halaman edit."
                />
              }
            />
          </Route>
        </Route>
        <Route element={<PublicLayout />}>
          <Route path="/public/schedule" element={<PublicSchedulePage />} />
        </Route>
      </Route>
    </Routes>
  );
}
