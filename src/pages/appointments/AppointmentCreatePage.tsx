import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppointmentForm,
  INITIAL_APPOINTMENT_FORM,
  toAppointmentPayload,
  validateAppointmentForm,
  type AppointmentFormErrors,
  type AppointmentFormState,
} from "../../components/appointment/AppointmentForm";
import { createAppointment } from "../../services/appointments";
import { useAuth } from "../../store/auth";

export function AppointmentCreatePage() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [form, setForm] = useState<AppointmentFormState>(INITIAL_APPOINTMENT_FORM);
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

    const nextErrors = validateAppointmentForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0 || !token) {
      return;
    }

    setIsSubmitting(true);

    try {
      await createAppointment(toAppointmentPayload(form), token);
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
    <AppointmentForm
      errors={errors}
      form={form}
      intro="Buat appointment baru dengan durasi tetap 2 jam."
      isSubmitting={isSubmitting}
      onChange={updateField}
      onReminderEnabledChange={updateReminderEnabled}
      onSubmit={handleSubmit}
      submitError={submitError}
      submitLabel="Simpan appointment"
      submittingLabel="Menyimpan..."
    />
  );
}
