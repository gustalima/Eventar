import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { memo } from "react";
import { getMonthDays, isSpecialDay } from "@/utils/date-utils";
import { MonthGridProps } from "@/types/month";
import { WEEKDAYS, Weeks } from "@/constants/calendar";
import { DayCell } from "./day-cell";

const getAlignedWeekdays = (startOfWeek: Weeks) => {
  const startIndex = WEEKDAYS.indexOf(startOfWeek.slice(0, 2));
  if (startIndex === -1) return WEEKDAYS;
  return [...WEEKDAYS.slice(startIndex), ...WEEKDAYS.slice(0, startIndex)];
};

export const MonthGrid = memo(function MonthGrid({
  month,
  monthIndex,
  year,
  events,
  showPastDates,
  handleEventClick,
  specialDays,
  startOfWeek,
}: MonthGridProps) {
  const days = getMonthDays(year, monthIndex);
  const alignedWeekdays = getAlignedWeekdays(startOfWeek);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: 1,
        fontSize: "0.75rem",
      }}
    >
      {alignedWeekdays.map((day) => (
        <Typography
          key={day}
          align="center"
          color="text.secondary"
          aria-label={day}
        >
          {day}
        </Typography>
      ))}
      {days.map((date, i) => (
        <DayCell
          key={`${month}-${i}`}
          date={date}
          month={month}
          events={events}
          showPastDates={showPastDates}
          handleEventClick={handleEventClick}
          isSpecialDay={isSpecialDay(date, specialDays ?? [])}
          specialDayContent={specialDays?.find(
            (day) => day.date === date.toLocaleDateString()
          )}
        />
      ))}
    </Box>
  );
});
