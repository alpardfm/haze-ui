import { useCallback, useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  AppointmentForm,
  INITIAL_APPOINTMENT_FORM,
  toAppointmentPayload,
  toDateTimeLocalValue,
  validateAppointmentForm,
  type AppointmentFormErrors,
  type AppointmentFormState,
} from "../../components/appointment/AppointmentForm";
import { StateView } from "../../components/ui/StateView";
import { getAppointment, updateAppointment } from "../../services/appointments";
import { useAuth } from "../../store/auth";
import type { Appointment } from "../../types/appointment";

export function AppointmentEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [form, setForm] = useState<AppointmentFormState>(INITIAL_APPOINTMENT_FORM);
  const [errors, setErrors] = useState<AppointmentFormErrors>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const appointmentId = Number(id);

  const loadAppointment = useCallback(async () => {
    if (!token || !Number.isInteger(appointmentId) || appointmentId < 1) {
      setLoadError("ID appointment tidak valid");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setLoadError(null);

    try {
      const response = await getAppointment(appointmentId, token);

      if (!response.data) {
        setLoadError("Appointment tidak ditemukan");
        return;
      }

      setForm(toFormState(response.data));
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : "Gagal memuat appointment";
      setLoadError(message);
    } finally {
      setIsLoading(false);
    }
  }, [appointmentId, token]);

  useEffect(() => {
    void loadAppointment();
  }, [loadAppointment]);

  function updateField<Key extends keyof AppointmentFormState>(
    field: Key,
    value: AppointmentFormState[Key],
  ) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function updateReminderEnabled(isEnabled: boolean) {
    setForm((current) => ({
      ...current,
      is_reminder_enabled: isEnabled,
      reminder_start_at: isEnabled ? current.reminder_start_at : "",
      reminder_interval_hours: isEnabled ? current.reminder_interval_hours : "",
    }));
    setErrors((current) => ({
      ...current,
      reminder_start_at: undefined,
      reminder_interval_hours: undefined,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);

    const nextErrors = validateAppointmentForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0 || !token) {
      return;
    }

    setIsSubmitting(true);

    try {
      await updateAppointment(appointmentId, toAppointmentPayload(form), token);
      navigate(`/appointments/${appointmentId}`, {
        replace: true,
        state: { notice: "Appointment berhasil diubah" },
      });
    } catch (caughtError) {
      const message =
        caughtError instanceof Error ? caughtError.message : "Gagal mengubah appointment";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return <StateView title="Memuat data appointment..." variant="loading" />;
  }

  if (loadError) {
    return (
      <div className="stack">
        <StateView
          description={loadError}
          title="Gagal memuat data edit"
          variant="error"
        />
        <Link className="button button--secondary fit-content" to="/appointments">
          Kembali ke appointment
        </Link>
      </div>
    );
  }

  return (
    <AppointmentForm
      errors={errors}
      form={form}
      intro="Ubah data appointment. Durasi tetap 2 jam."
      isSubmitting={isSubmitting}
      onChange={updateField}
      onReminderEnabledChange={updateReminderEnabled}
      onSubmit={handleSubmit}
      submitError={submitError}
      submitLabel="Simpan perubahan"
      submittingLabel="Menyimpan..."
    />
  );
}

function toFormState(appointment: Appointment): AppointmentFormState {
  return {
    client_name: appointment.client_name,
    address: appointment.address,
    notes: appointment.notes ?? "",
    meeting_date: appointment.meeting_date,
    meeting_time: appointment.meeting_time,
    is_reminder_enabled: appointment.is_reminder_enabled,
    reminder_start_at: toDateTimeLocalValue(appointment.reminder_start_at),
    reminder_interval_hours: appointment.reminder_interval_hours
      ? String(appointment.reminder_interval_hours)
      : "",
  };
}
