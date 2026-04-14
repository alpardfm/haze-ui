export type PublicScheduleStatus = "occupied";

export type PublicScheduleItem = {
  start: string;
  end: string;
  status: PublicScheduleStatus;
};

export type PublicScheduleData = {
  date: string;
  items: PublicScheduleItem[];
};
