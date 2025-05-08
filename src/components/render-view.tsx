import { Box, Typography } from "@mui/material";
import { isSpecialDay } from "@/utils/date-utils";
import type { CalendarEvent, RenderViewProps } from "@/types/calendar";
import { AgendaView } from "../views/agenda-view/agenda-view";
import { DayView } from "../views/day-view/day-view";
import { MonthView } from "../views/month-view/month-view";
import { WeekView } from "../views/week-view/week-view";
import { YearView } from "../views/year-view/year-view";
import LoadingState from "./LoadingState";

export const RenderView = ({
  view,
  currentDate,
  filteredEvents,
  showPastDates,
  customEventViewer,
  isLoading,
  error,
  spinnerComponent,
  setSelectedDate,
  setIsDayModalOpen,
  setSelectedEvent,
  setIsEventModalOpen,
  agendaView,
  specialDays,
  startOfWeek,
}: RenderViewProps) => {
  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "24rem",
        }}
      >
        <Box
          style={{
            color: "#f44336",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.125rem",
              fontWeight: 600,
              marginBottom: "0.5rem",
            }}
          >
            Error
          </Typography>
          <Typography>{error}</Typography>
        </Box>
      </Box>
    );
  }

  if (isLoading) return <LoadingState spinnerComponent={spinnerComponent} />;

  const handleEventClick = (e: React.MouseEvent, event: CalendarEvent) => {
    e.stopPropagation();
    setSelectedEvent(event);
    setIsEventModalOpen(true);
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setIsDayModalOpen(true);
  };

  switch (view) {
    case "year":
      return agendaView ? (
        <AgendaView
          events={filteredEvents}
          handleEventClick={handleEventClick}
        />
      ) : (
        <YearView
          year={currentDate.getFullYear()}
          events={filteredEvents}
          showPastDates={showPastDates}
          handleEventClick={handleEventClick}
          specialDays={specialDays}
          startOfWeek={startOfWeek}
        />
      );
    case "month":
      return agendaView ? (
        <AgendaView
          events={filteredEvents}
          handleEventClick={handleEventClick}
        />
      ) : (
        <MonthView
          date={currentDate}
          year={currentDate.getFullYear()}
          month={currentDate.getMonth()}
          events={filteredEvents}
          showPastDates={showPastDates}
          customEventViewer={customEventViewer}
          handleEventClick={handleEventClick}
          handleDayClick={handleDayClick}
          specialDays={specialDays}
          startOfWeek={startOfWeek}
        />
      );
    case "week":
      return agendaView ? (
        <AgendaView
          events={filteredEvents}
          handleEventClick={handleEventClick}
        />
      ) : (
        <WeekView
          date={currentDate}
          events={filteredEvents}
          showPastDates={showPastDates}
          handleEventClick={handleEventClick}
          specialDays={specialDays}
          startOfWeek={startOfWeek}
        />
      );
    case "day":
      return agendaView ? (
        <AgendaView
          events={filteredEvents}
          handleEventClick={handleEventClick}
        />
      ) : (
        <DayView
          date={currentDate}
          events={filteredEvents}
          showPastDates={showPastDates}
          handleEventClick={handleEventClick}
          handleDayClick={handleDayClick}
          isSpecialDay={isSpecialDay(currentDate, specialDays ?? [])}
          specialDayContent={specialDays?.find((day) =>
            isSpecialDay(currentDate, [day])
          )}
        />
      );
    default:
      return null;
  }
};
