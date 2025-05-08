import { DayCell } from "@/views/month-view/day-cell";
import { WeekDaysHeader } from "@/views/month-view/week-days-header";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { ErrorBoundary } from "@/components/error-boundary";
import { getEventsForDate } from "@/utils/calendar-utils";
import { getMonthDays, isSpecialDay } from "@/utils/date-utils";
import { MonthViewProps } from "@/types/month";

export function MonthView({
  date,
  year,
  month,
  events,
  showPastDates = true,
  handleEventClick,
  handleDayClick,
  specialDays,
  startOfWeek,
}: MonthViewProps) {
  const days = [...getMonthDays(year, month, startOfWeek)];

  return (
    <ErrorBoundary>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
        id="month-view"
      >
        <Paper
          elevation={0}
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            border: 1,
            borderColor: "divider",
            borderRadius: 2,
            backgroundColor: "background.paper",
            overflow: "hidden",
            minHeight: 0,
          }}
        >
          <WeekDaysHeader startOfWeek={startOfWeek} />
          {days.map((mappedDate, index) => (
            <DayCell
              key={mappedDate.toString()}
              date={date}
              mappedDate={mappedDate}
              index={index}
              events={getEventsForDate(mappedDate, events)}
              showPastDates={showPastDates}
              handleEventClick={handleEventClick}
              handleDayClick={handleDayClick}
              isSpecialDay={isSpecialDay(mappedDate, specialDays ?? [])}
              specialDayContent={specialDays?.find((day) =>
                isSpecialDay(mappedDate, [day])
              )}
            />
          ))}
        </Paper>
      </Box>
    </ErrorBoundary>
  );
}
