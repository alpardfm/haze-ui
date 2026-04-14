const DATE_FORMATTER = new Intl.DateTimeFormat("id-ID", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const TIME_FORMATTER = new Intl.DateTimeFormat("id-ID", {
  hour: "2-digit",
  minute: "2-digit",
});

export function formatDate(value: string) {
  return DATE_FORMATTER.format(new Date(`${value}T00:00:00`));
}

export function formatDateTime(value: string) {
  return `${formatDate(value.slice(0, 10))}, ${formatTime(value)}`;
}

export function formatTime(value: string) {
  if (/^\d{2}:\d{2}$/.test(value)) {
    return value;
  }

  return TIME_FORMATTER.format(new Date(value));
}

export function formatTimeRange(start: string, end: string) {
  return `${formatTime(start)} - ${formatTime(end)}`;
}
