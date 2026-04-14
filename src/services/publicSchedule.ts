import { apiRequest } from "./api";
import type { PublicScheduleData } from "../types/publicSchedule";

export function getPublicSchedules(date: string) {
  const params = new URLSearchParams({ date });
  return apiRequest<PublicScheduleData>(`/public/schedules?${params.toString()}`);
}
