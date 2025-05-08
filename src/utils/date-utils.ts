import { CalendarView, SpecialDay } from "@/types/calendar";

export function isPastDate(date: Date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  return date < today;
}

export function getDateClassName(
  date: Date,
  showPastDates: boolean,
  view: CalendarView
) {
  if (isPastDate(date)) {
    switch (view) {
      case "day":
      case "week":
      case "month":
        return {
          opacity: 0.5,
          pointerEvents: "none",
          color: "#9ca3af",
        };
      case "year":
        return {
          opacity: 0.4,
          pointerEvents: "none",
          color: "#9ca3af",
        };
    }
  }
  return {};
}

export function getMonthDays(
  year: number,
  month: number,
  startOfWeek: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun" = "Mon"
): Date[] {
  const days: Date[] = [];
  const weekDays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const startIdx = weekDays.indexOf(startOfWeek.toLowerCase());
  if (startIdx === -1) throw new Error("Invalid startOfWeek value");

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const firstDayOfWeek = new Date(firstDayOfMonth);
  let diff = (firstDayOfMonth.getDay() - startIdx + 7) % 7;
  firstDayOfWeek.setDate(firstDayOfMonth.getDate() - diff);

  const lastDayOfWeek = new Date(lastDayOfMonth);
  diff = (startIdx + 6 - lastDayOfMonth.getDay() + 7) % 7;
  lastDayOfWeek.setDate(lastDayOfMonth.getDate() + diff);

  for (
    let d = new Date(firstDayOfWeek);
    d <= lastDayOfWeek;
    d.setDate(d.getDate() + 1)
  ) {
    days.push(new Date(d));
  }

  return days;
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function isSpecialDay(date: Date, specialDays: SpecialDay[]): boolean {
  return (
    specialDays?.some((day) => day.date === date.toLocaleDateString()) ?? false
  );
}
