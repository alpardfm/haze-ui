import { useState } from "react";
import { cancelAppointment } from "../../services/appointments";
import { useAuth } from "../../store/auth";
import type { Appointment } from "../../types/appointment";
import { Button } from "../ui/Button";

type CancelAppointmentButtonProps = {
  appointment: Appointment;
  onCancelled?: (appointment: Appointment) => void;
};

export function CancelAppointmentButton({
  appointment,
  onCancelled,
}: CancelAppointmentButtonProps) {
  const { token } = useAuth();
  const [isCancelling, setIsCancelling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCancel() {
    setError(null);

    if (appointment.status === "cancelled") {
      return;
    }

    const isConfirmed = window.confirm(
      `Batalkan appointment untuk ${appointment.client_name}?`,
    );

    if (!isConfirmed || !token) {
      return;
    }

    setIsCancelling(true);

    try {
      const response = await cancelAppointment(appointment.id, token);

      if (response.data) {
        onCancelled?.(response.data);
      }
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : "Gagal membatalkan appointment";
      setError(message);
    } finally {
      setIsCancelling(false);
    }
  }

  return (
    <div className="inline-action">
      <Button
        disabled={isCancelling || appointment.status === "cancelled"}
        onClick={handleCancel}
        variant="danger"
      >
        {isCancelling ? "Membatalkan..." : "Cancel"}
      </Button>
      {error ? (
        <span className="inline-error" role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}
