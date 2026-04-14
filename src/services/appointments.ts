import { apiRequest } from "./api";
import type {
  Appointment,
  AppointmentListData,
  AppointmentListQuery,
  UpsertAppointmentRequest,
} from "../types/appointment";

export function getAppointments(query: AppointmentListQuery = {}, token?: string | null) {
  const params = new URLSearchParams();

  if (query.date) params.set("date", query.date);
  if (query.status) params.set("status", query.status);

  const search = params.toString();
  return apiRequest<AppointmentListData>(`/appointments${search ? `?${search}` : ""}`, {
    token,
  });
}

export function getAppointment(id: number, token?: string | null) {
  return apiRequest<Appointment>(`/appointments/${id}`, { token });
}

export function createAppointment(payload: UpsertAppointmentRequest, token?: string | null) {
  return apiRequest<Appointment>("/appointments", {
    method: "POST",
    body: payload,
    token,
  });
}

export function updateAppointment(
  id: number,
  payload: Partial<UpsertAppointmentRequest>,
  token?: string | null,
) {
  return apiRequest<Appointment>(`/appointments/${id}`, {
    method: "PUT",
    body: payload,
    token,
  });
}

export function cancelAppointment(id: number, token?: string | null) {
  return apiRequest<Appointment>(`/appointments/${id}/cancel`, {
    method: "PATCH",
    token,
  });
}
