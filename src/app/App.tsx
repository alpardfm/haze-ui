import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../components/auth/ProtectedRoute";
import { AdminLayout } from "../components/layout/AdminLayout";
import { AppShell } from "../components/layout/AppShell";
import { PublicLayout } from "../components/layout/PublicLayout";
import { AppointmentComingSoonPage } from "../pages/appointments/AppointmentComingSoonPage";
import { AppointmentCreatePage } from "../pages/appointments/AppointmentCreatePage";
import { AppointmentDetailPage } from "../pages/appointments/AppointmentDetailPage";
import { AppointmentEditPage } from "../pages/appointments/AppointmentEditPage";
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
              element={<AppointmentCreatePage />}
            />
            <Route
              path="/appointments/:id"
              element={<AppointmentDetailPage />}
            />
            <Route
              path="/appointments/:id/edit"
              element={<AppointmentEditPage />}
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
