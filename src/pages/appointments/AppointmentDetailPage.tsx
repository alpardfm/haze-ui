import { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { CancelAppointmentButton } from "../../components/appointment/CancelAppointmentButton";
import { StateView } from "../../components/ui/StateView";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { getAppointment } from "../../services/appointments";
import { useAuth } from "../../store/auth";
import type { Appointment } from "../../types/appointment";
import { formatDateTime, formatTimeRange } from "../../utils/dateTime";

export function AppointmentDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const { token } = useAuth();
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointment = useCallback(async () => {
    const appointmentId = Number(id);

    if (!token || !Number.isInteger(appointmentId) || appointmentId < 1) {
      setError("ID appointment tidak valid");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await getAppointment(appointmentId, token);
      setAppointment(response.data ?? null);
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : "Gagal memuat detail appointment";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [id, token]);

  useEffect(() => {
    void fetchAppointment();
  }, [fetchAppointment]);

  if (isLoading) {
    return <StateView title="Memuat detail appointment..." variant="loading" />;
  }

  if (error) {
    return (
      <div className="stack">
        <StateView
          description={error}
          title="Gagal memuat detail appointment"
          variant="error"
        />
        <Link className="button button--secondary fit-content" to="/appointments">
          Kembali ke appointment
        </Link>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="stack">
        <StateView title="Appointment tidak ditemukan" />
        <Link className="button button--secondary fit-content" to="/appointments">
          Kembali ke appointment
        </Link>
      </div>
    );
  }

  return (
    <AppointmentDetail
      appointment={appointment}
      notice={readNotice(location.state)}
      onAppointmentUpdated={setAppointment}
    />
  );
}

type AppointmentDetailProps = {
  appointment: Appointment;
  notice: string | null;
  onAppointmentUpdated: (appointment: Appointment) => void;
};

function AppointmentDetail({
  appointment,
  notice,
  onAppointmentUpdated,
}: AppointmentDetailProps) {
  return (
    <div className="stack">
      <div className="toolbar">
        <p>Detail appointment #{appointment.id}</p>
        <div className="table-actions">
          <Link className="button button--secondary" to="/appointments">
            Kembali
          </Link>
          <Link
            className="button button--secondary"
            to={`/appointments/${appointment.id}/edit`}
          >
            Edit
          </Link>
          <CancelAppointmentButton
            appointment={appointment}
            onCancelled={onAppointmentUpdated}
          />
        </div>
      </div>

      {notice ? <div className="notice" role="status">{notice}</div> : null}

      <section className="detail-panel" aria-label="Data utama appointment">
        <div className="detail-panel__title">
          <div>
            <p className="eyebrow">Client</p>
            <h3>{appointment.client_name}</h3>
          </div>
          <StatusBadge status={appointment.status} />
        </div>

        <div className="detail-grid">
          <DetailItem label="Alamat" value={appointment.address} />
          <DetailItem label="Notes" value={appointment.notes || "-"} />
          <DetailItem
            label="Waktu mulai"
            value={formatDateTime(appointment.start_at)}
          />
          <DetailItem
            label="Waktu selesai"
            value={formatDateTime(appointment.end_at)}
          />
          <DetailItem
            label="Rentang waktu"
            value={formatTimeRange(appointment.start_at, appointment.end_at)}
          />
          <DetailItem label="Durasi" value="2 jam" />
        </div>
      </section>

      <section className="detail-panel" aria-label="Reminder appointment">
        <div className="detail-panel__title">
          <div>
            <p className="eyebrow">Reminder</p>
            <h3>{appointment.is_reminder_enabled ? "Aktif" : "Tidak aktif"}</h3>
          </div>
        </div>

        <div className="detail-grid">
          <DetailItem
            label="Mulai reminder"
            value={
              appointment.reminder_start_at
                ? formatDateTime(appointment.reminder_start_at)
                : "-"
            }
          />
          <DetailItem
            label="Interval"
            value={
              appointment.reminder_interval_hours
                ? `${appointment.reminder_interval_hours} jam`
                : "-"
            }
          />
          <DetailItem
            label="Dibuat"
            value={appointment.created_at ? formatDateTime(appointment.created_at) : "-"}
          />
          <DetailItem
            label="Diubah"
            value={appointment.updated_at ? formatDateTime(appointment.updated_at) : "-"}
          />
          <DetailItem
            label="Dibatalkan"
            value={
              appointment.cancelled_at
                ? formatDateTime(appointment.cancelled_at)
                : "-"
            }
          />
        </div>
      </section>
    </div>
  );
}

function readNotice(state: unknown) {
  if (
    state &&
    typeof state === "object" &&
    "notice" in state &&
    typeof state.notice === "string"
  ) {
    return state.notice;
  }

  return null;
}

type DetailItemProps = {
  label: string;
  value: string;
};

function DetailItem({ label, value }: DetailItemProps) {
  return (
    <div className="detail-item">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
