import type { AppointmentStatus } from "../types/appointment";

export const APPOINTMENT_STATUSES: AppointmentStatus[] = [
  "scheduled",
  "on_going",
  "done",
  "cancelled",
];

export const APPOINTMENT_STATUS_LABELS: Record<AppointmentStatus, string> = {
  scheduled: "Terjadwal",
  on_going: "Berjalan",
  done: "Selesai",
  cancelled: "Dibatalkan",
};
