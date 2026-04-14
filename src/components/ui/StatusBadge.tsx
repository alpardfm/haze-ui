import type { AppointmentStatus } from "../../types/appointment";
import type { PublicScheduleStatus } from "../../types/publicSchedule";
import { APPOINTMENT_STATUS_LABELS } from "../../constants/appointment";

type StatusBadgeProps = {
  status: AppointmentStatus | PublicScheduleStatus;
};

const STATUS_LABELS: Record<AppointmentStatus | PublicScheduleStatus, string> = {
  ...APPOINTMENT_STATUS_LABELS,
  occupied: "Terisi",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`status-badge status-badge--${status}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}
