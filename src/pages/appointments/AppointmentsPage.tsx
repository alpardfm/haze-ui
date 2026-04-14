import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { FormField } from "../../components/ui/FormField";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import { StateView } from "../../components/ui/StateView";
import { StatusBadge } from "../../components/ui/StatusBadge";
import {
  APPOINTMENT_STATUSES,
  APPOINTMENT_STATUS_LABELS,
} from "../../constants/appointment";
import { getAppointments } from "../../services/appointments";
import { useAuth } from "../../store/auth";
import type { Appointment, AppointmentStatus } from "../../types/appointment";
import { formatDate, formatTimeRange } from "../../utils/dateTime";

export function AppointmentsPage() {
  const { token } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [date, setDate] = useState("");
  const [status, setStatus] = useState<AppointmentStatus | "">("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = useCallback(async () => {
    if (!token) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await getAppointments(
        {
          date: date || undefined,
          status: status || undefined,
        },
        token,
      );

      setAppointments(response.data?.items ?? []);
    } catch (caughtError) {
      const message =
        caughtError instanceof Error ? caughtError.message : "Gagal memuat appointment";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [date, status, token]);

  useEffect(() => {
    void fetchAppointments();
  }, [fetchAppointments]);

  return (
    <div className="stack">
      <div className="toolbar">
        <p>Kelola appointment admin berdasarkan tanggal dan status.</p>
        <Link className="button button--primary" to="/appointments/create">
          Tambah appointment
        </Link>
      </div>

      <form className="filter-bar" onSubmit={(event) => event.preventDefault()}>
        <FormField label="Tanggal" htmlFor="appointment-date">
          <Input
            id="appointment-date"
            name="date"
            onChange={(event) => setDate(event.target.value)}
            type="date"
            value={date}
          />
        </FormField>
        <FormField label="Status" htmlFor="appointment-status">
          <Select
            id="appointment-status"
            name="status"
            onChange={(event) => setStatus(event.target.value as AppointmentStatus | "")}
            value={status}
          >
            <option value="">Semua status</option>
            {APPOINTMENT_STATUSES.map((item) => (
              <option key={item} value={item}>
                {APPOINTMENT_STATUS_LABELS[item]}
              </option>
            ))}
          </Select>
        </FormField>
        <div className="filter-bar__action">
          <Button
            disabled={!date && !status}
            onClick={() => {
              setDate("");
              setStatus("");
            }}
            variant="secondary"
          >
            Reset filter
          </Button>
        </div>
      </form>

      {isLoading ? (
        <StateView title="Memuat appointment..." variant="loading" />
      ) : error ? (
        <StateView
          title="Gagal memuat appointment"
          description={error}
          variant="error"
        />
      ) : appointments.length === 0 ? (
        <StateView
          title="Belum ada data appointment"
          description="Appointment akan tampil di sini setelah tersedia."
        />
      ) : (
        <AppointmentTable appointments={appointments} />
      )}
    </div>
  );
}

type AppointmentTableProps = {
  appointments: Appointment[];
};

function AppointmentTable({ appointments }: AppointmentTableProps) {
  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th>Client</th>
            <th>Jadwal</th>
            <th>Durasi</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>
                <strong>{appointment.client_name}</strong>
                <span>{appointment.address}</span>
              </td>
              <td>
                <strong>{formatDate(appointment.meeting_date)}</strong>
                <span>
                  {formatTimeRange(appointment.start_at, appointment.end_at)}
                </span>
              </td>
              <td>2 jam</td>
              <td>
                <StatusBadge status={appointment.status} />
              </td>
              <td>
                <div className="table-actions">
                  <Link
                    className="button button--secondary"
                    to={`/appointments/${appointment.id}`}
                  >
                    Detail
                  </Link>
                  <Link
                    className="button button--secondary"
                    to={`/appointments/${appointment.id}/edit`}
                  >
                    Edit
                  </Link>
                  <Button
                    disabled
                    title="Cancel appointment dibangun di Phase 7"
                    variant="danger"
                  >
                    Cancel
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="table-note">
        Jadwal memakai waktu mulai dan selesai dari sistem.
      </p>
    </div>
  );
}
