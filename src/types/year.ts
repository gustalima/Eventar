import { CalendarEvent, SpecialDay } from "./calendar";

export interface YearViewProps {
  year: number;
  events: CalendarEvent[];
  showPastDates?: boolean;
  handleEventClick?: (e: React.MouseEvent, event: CalendarEvent) => void;
  isLoading?: boolean;
  specialDays?: SpecialDay[];
  startOfWeek: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
}

export interface YearViewDayCellProps {
  date: Date;
  month: string;
  events: CalendarEvent[];
  showPastDates: boolean;
  handleEventClick?: (e: React.MouseEvent, event: CalendarEvent) => void;
  isSpecialDay: boolean;
  specialDayContent?: SpecialDay;
}
