import type { AppointmentStatus } from "../../types/appointment";
import type { PublicScheduleStatus } from "../../types/publicSchedule";

type StatusBadgeProps = {
  status: AppointmentStatus | PublicScheduleStatus;
};

const STATUS_LABELS: Record<AppointmentStatus | PublicScheduleStatus, string> = {
  scheduled: "Terjadwal",
  on_going: "Berjalan",
  done: "Selesai",
  cancelled: "Dibatalkan",
  occupied: "Terisi",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`status-badge status-badge--${status}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}
