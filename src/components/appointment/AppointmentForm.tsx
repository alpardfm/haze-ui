import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { FormField } from "../ui/FormField";
import { Input } from "../ui/Input";
import { StateView } from "../ui/StateView";
import { Textarea } from "../ui/Textarea";
import type { UpsertAppointmentRequest } from "../../types/appointment";

export type AppointmentFormState = {
  client_name: string;
  address: string;
  notes: string;
  meeting_date: string;
  meeting_time: string;
  is_reminder_enabled: boolean;
  reminder_start_at: string;
  reminder_interval_hours: string;
};

export type AppointmentFormErrors = Partial<Record<keyof AppointmentFormState, string>>;

type AppointmentFormProps = {
  form: AppointmentFormState;
  errors: AppointmentFormErrors;
  intro: string;
  isSubmitting: boolean;
  submitError: string | null;
  submitLabel: string;
  submittingLabel: string;
  onChange: <Key extends keyof AppointmentFormState>(
    field: Key,
    value: AppointmentFormState[Key],
  ) => void;
  onReminderEnabledChange: (isEnabled: boolean) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export const INITIAL_APPOINTMENT_FORM: AppointmentFormState = {
  client_name: "",
  address: "",
  notes: "",
  meeting_date: "",
  meeting_time: "",
  is_reminder_enabled: false,
  reminder_start_at: "",
  reminder_interval_hours: "",
};

export function AppointmentForm({
  form,
  errors,
  intro,
  isSubmitting,
  submitError,
  submitLabel,
  submittingLabel,
  onChange,
  onReminderEnabledChange,
  onSubmit,
}: AppointmentFormProps) {
  return (
    <form className="form-shell form-shell--wide" onSubmit={onSubmit}>
      <div className="toolbar">
        <p>{intro}</p>
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
          onChange={(event) => onChange("client_name", event.target.value)}
          required
          value={form.client_name}
        />
      </FormField>

      <FormField error={errors.address} htmlFor="address" label="Alamat">
        <Textarea
          disabled={isSubmitting}
          id="address"
          name="address"
          onChange={(event) => onChange("address", event.target.value)}
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
          onChange={(event) => onChange("notes", event.target.value)}
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
            onChange={(event) => onChange("meeting_date", event.target.value)}
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
            onChange={(event) => onChange("meeting_time", event.target.value)}
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
          onChange={(event) => onReminderEnabledChange(event.target.checked)}
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
            onChange={(event) => onChange("reminder_start_at", event.target.value)}
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
              onChange("reminder_interval_hours", event.target.value)
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
          title="Appointment gagal disimpan"
          variant="error"
        />
      ) : null}

      <div className="form-actions">
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? submittingLabel : submitLabel}
        </Button>
      </div>
    </form>
  );
}

export function validateAppointmentForm(form: AppointmentFormState) {
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

export function toAppointmentPayload(
  form: AppointmentFormState,
): UpsertAppointmentRequest {
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

export function toDateTimeLocalValue(value?: string | null) {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  const timezoneOffset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - timezoneOffset).toISOString().slice(0, 16);
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
