export function startOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

export function daysFromNow(days: number, hour = 23, minute = 59): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  date.setHours(hour, minute, 0, 0);
  return date.toISOString();
}

export function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDueDate(iso: string): string {
  const today = startOfDay(new Date()).getTime();
  const due = startOfDay(new Date(iso)).getTime();
  const dayDiff = Math.round((due - today) / (1000 * 60 * 60 * 24));

  if (dayDiff === 0) return `Today, ${formatTime(iso)}`;
  if (dayDiff === 1) return `Tomorrow, ${formatTime(iso)}`;
  if (dayDiff === -1) return "Yesterday";
  if (dayDiff < -1) return `${Math.abs(dayDiff)} days ago`;

  return new Date(iso).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}
