import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { FormField } from "../../components/ui/FormField";
import { Input } from "../../components/ui/Input";
import { StateView } from "../../components/ui/StateView";
import { Textarea } from "../../components/ui/Textarea";
import { createAppointment } from "../../services/appointments";
import { useAuth } from "../../store/auth";
import type { UpsertAppointmentRequest } from "../../types/appointment";

type AppointmentFormState = {
  client_name: string;
  address: string;
  notes: string;
  meeting_date: string;
  meeting_time: string;
  is_reminder_enabled: boolean;
  reminder_start_at: string;
  reminder_interval_hours: string;
};

type AppointmentFormErrors = Partial<Record<keyof AppointmentFormState, string>>;

const INITIAL_FORM: AppointmentFormState = {
  client_name: "",
  address: "",
  notes: "",
  meeting_date: "",
  meeting_time: "",
  is_reminder_enabled: false,
  reminder_start_at: "",
  reminder_interval_hours: "",
};

export function AppointmentCreatePage() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [form, setForm] = useState<AppointmentFormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<AppointmentFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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

    const nextErrors = validateForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0 || !token) {
      return;
    }

    setIsSubmitting(true);

    try {
      await createAppointment(toCreatePayload(form), token);
      navigate("/appointments", { replace: true });
    } catch (caughtError) {
      const message =
        caughtError instanceof Error ? caughtError.message : "Gagal membuat appointment";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="form-shell form-shell--wide" onSubmit={handleSubmit}>
      <div className="toolbar">
        <p>Buat appointment baru dengan durasi tetap 2 jam.</p>
        <Link className="button button--secondary" to="/appointments">
          Kembali
        </Link>
      </div>

      <FormField
        error={errors.client_name}
        htmlFor="client-name"
        label="Nama client"
      >
        <Input
          disabled={isSubmitting}
          id="client-name"
          name="client_name"
          onChange={(event) => updateField("client_name", event.target.value)}
          required
          value={form.client_name}
        />
      </FormField>

      <FormField error={errors.address} htmlFor="address" label="Alamat">
        <Textarea
          disabled={isSubmitting}
          id="address"
          name="address"
          onChange={(event) => updateField("address", event.target.value)}
          required
          rows={3}
          value={form.address}
        />
      </FormField>

      <FormField htmlFor="notes" label="Notes">
        <Textarea
          disabled={isSubmitting}
          id="notes"
          name="notes"
          onChange={(event) => updateField("notes", event.target.value)}
          rows={3}
          value={form.notes}
        />
      </FormField>

      <div className="form-grid">
        <FormField
          error={errors.meeting_date}
          htmlFor="meeting-date"
          label="Tanggal meeting"
        >
          <Input
            disabled={isSubmitting}
            id="meeting-date"
            name="meeting_date"
            onChange={(event) => updateField("meeting_date", event.target.value)}
            required
            type="date"
            value={form.meeting_date}
          />
        </FormField>

        <FormField
          error={errors.meeting_time}
          hint="Durasi appointment tetap 2 jam."
          htmlFor="meeting-time"
          label="Jam meeting"
        >
          <Input
            disabled={isSubmitting}
            id="meeting-time"
            name="meeting_time"
            onChange={(event) => updateField("meeting_time", event.target.value)}
            required
            type="time"
            value={form.meeting_time}
          />
        </FormField>
      </div>

      <label className="checkbox-field">
        <input
          checked={form.is_reminder_enabled}
          disabled={isSubmitting}
          onChange={(event) => updateReminderEnabled(event.target.checked)}
          type="checkbox"
        />
        Aktifkan reminder
      </label>

      <div className="form-grid">
        <FormField
          error={errors.reminder_start_at}
          htmlFor="reminder-start-at"
          label="Mulai reminder"
        >
          <Input
            disabled={isSubmitting || !form.is_reminder_enabled}
            id="reminder-start-at"
            name="reminder_start_at"
            onChange={(event) =>
              updateField("reminder_start_at", event.target.value)
            }
            type="datetime-local"
            value={form.reminder_start_at}
          />
        </FormField>

        <FormField
          error={errors.reminder_interval_hours}
          htmlFor="reminder-interval-hours"
          label="Interval reminder"
        >
          <Input
            disabled={isSubmitting || !form.is_reminder_enabled}
            id="reminder-interval-hours"
            min={1}
            name="reminder_interval_hours"
            onChange={(event) =>
              updateField("reminder_interval_hours", event.target.value)
            }
            placeholder="1"
            type="number"
            value={form.reminder_interval_hours}
          />
        </FormField>
      </div>

      {submitError ? (
        <StateView
          description={submitError}
          title="Gagal membuat appointment"
          variant="error"
        />
      ) : null}

      <div className="form-actions">
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Menyimpan..." : "Simpan appointment"}
        </Button>
      </div>
    </form>
  );
}

function validateForm(form: AppointmentFormState) {
  const errors: AppointmentFormErrors = {};

  if (!form.client_name.trim()) {
    errors.client_name = "Nama client wajib diisi";
  }

  if (!form.address.trim()) {
    errors.address = "Alamat wajib diisi";
  }

  if (!form.meeting_date) {
    errors.meeting_date = "Tanggal meeting wajib diisi";
  }

  if (!form.meeting_time) {
    errors.meeting_time = "Jam meeting wajib diisi";
  }

  if (form.is_reminder_enabled) {
    if (!form.reminder_start_at) {
      errors.reminder_start_at = "Mulai reminder wajib diisi saat reminder aktif";
    }

    if (!form.reminder_interval_hours || Number(form.reminder_interval_hours) < 1) {
      errors.reminder_interval_hours = "Interval reminder minimal 1 jam";
    }
  }

  return errors;
}

function toCreatePayload(form: AppointmentFormState): UpsertAppointmentRequest {
  return {
    client_name: form.client_name.trim(),
    address: form.address.trim(),
    notes: form.notes.trim() || null,
    meeting_date: form.meeting_date,
    meeting_time: form.meeting_time,
    is_reminder_enabled: form.is_reminder_enabled,
    reminder_start_at: form.is_reminder_enabled
      ? toApiDateTime(form.reminder_start_at)
      : null,
    reminder_interval_hours: form.is_reminder_enabled
      ? Number(form.reminder_interval_hours)
      : null,
  };
}

function toApiDateTime(value: string) {
  if (!value) {
    return null;
  }

  const date = new Date(value);
  const timezoneOffset = -date.getTimezoneOffset();
  const offsetSign = timezoneOffset >= 0 ? "+" : "-";
  const offsetHours = String(Math.floor(Math.abs(timezoneOffset) / 60)).padStart(2, "0");
  const offsetMinutes = String(Math.abs(timezoneOffset) % 60).padStart(2, "0");

  return `${value}:00${offsetSign}${offsetHours}:${offsetMinutes}`;
}
