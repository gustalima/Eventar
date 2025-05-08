import { isBefore, startOfDay } from "date-fns";
import { useCallback, useMemo } from "react";
import type { CalendarEvent } from "@/types/calendar";

export function useWeekViewCalculations(
  date: Date,
  events: CalendarEvent[],
  showPastDates: boolean,
  startOfWeek: string | undefined = "Mon"
) {
  const weekDays = useMemo(() => {
    const weekDaysMap: Record<string, number> = {
      sun: 0,
      mon: 1,
      tue: 2,
      wed: 3,
      thu: 4,
      fri: 5,
      sat: 6,
    };

    function getStartOfWeekIndex(startOfWeek: string | undefined): number {
      if (!startOfWeek) return 1;
      const key = startOfWeek.trim().toLowerCase();
      return weekDaysMap[key] ?? 1;
    }

    const startOfWeekIndex = getStartOfWeekIndex(startOfWeek);

    const currentDayIndex = date.getDay();
    const diff = (currentDayIndex - startOfWeekIndex + 7) % 7;
    const startOfWeekDate = new Date(date);
    startOfWeekDate.setDate(date.getDate() - diff);

    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(startOfWeekDate);
      day.setDate(startOfWeekDate.getDate() + i);
      return day;
    });
  }, [date]);

  const hours = useMemo(() => Array.from({ length: 24 }, (_, i) => i), []);

  const fullDayEvents = useMemo(
    () => events.filter((event) => event.isFullDay),
    [events]
  );

  const isPastDate = useCallback(
    (day: Date) => {
      return (
        !showPastDates && isBefore(startOfDay(day), startOfDay(new Date()))
      );
    },
    [showPastDates]
  );

  const getEventsForHourAndDay = useCallback(
    (hour: number, day: Date) =>
      events.filter(
        (event) =>
          !event.isFullDay &&
          new Date(event.start).getHours() === hour &&
          new Date(event.start).getDate() === day.getDate()
      ),
    [events]
  );

  return {
    weekDays,
    hours,
    fullDayEvents,
    isPastDate,
    getEventsForHourAndDay,
  };
}
