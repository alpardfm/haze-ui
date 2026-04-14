export type AppointmentStatus = "scheduled" | "on_going" | "done" | "cancelled";

export type Appointment = {
  id: number;
  client_name: string;
  address: string;
  notes?: string | null;
  meeting_date: string;
  meeting_time: string;
  duration_minutes: 120;
  start_at: string;
  end_at: string;
  status: AppointmentStatus;
  is_reminder_enabled: boolean;
  reminder_start_at?: string | null;
  reminder_interval_hours?: number | null;
  created_by_admin_id?: number;
  created_at?: string;
  updated_at?: string;
  cancelled_at?: string | null;
};

export type AppointmentListData = {
  items: Appointment[];
};

export type AppointmentListQuery = {
  date?: string;
  status?: AppointmentStatus;
};

export type UpsertAppointmentRequest = {
  client_name: string;
  address: string;
  notes?: string | null;
  meeting_date: string;
  meeting_time: string;
  is_reminder_enabled?: boolean;
  reminder_start_at?: string | null;
  reminder_interval_hours?: number | null;
};
