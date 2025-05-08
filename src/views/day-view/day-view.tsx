import FullDayEvents from "@/views/day-view/full-day-events";
import HourlyEvents from "@/views/day-view/hourly-events";
import Box from "@mui/material/Box";
import { deepOrange } from "@mui/material/colors";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import { useState } from "react";
import { ErrorBoundary } from "@/components/error-boundary";
import { SpecialDayModal } from "@/components/modals/special-day-modal";
import { DayViewProps } from "@/types/day";

export function DayView({
  date,
  events,
  showPastDates = true,
  handleEventClick,
  handleDayClick,
  isSpecialDay,
  specialDayContent,
}: DayViewProps) {
  const [showAllFullDayEvents, setShowAllFullDayEvents] = useState(false);

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const dayEvents = events.filter(
    (event) =>
      new Date(event.start).getDate() === date.getDate() &&
      new Date(event.start).getMonth() === date.getMonth() &&
      new Date(event.start).getFullYear() === date.getFullYear()
  );

  const fullDayEvents = dayEvents.filter((event) => event.isFullDay);

  const visibleFullDayEvents = showAllFullDayEvents
    ? fullDayEvents
    : fullDayEvents.slice(0, 3);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSpecialDayClick = () => {
    if (isSpecialDay) {
      setIsModalOpen(true);
    }
  };

  return (
    <ErrorBoundary>
      <Box
        id="day-view"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h4" fontWeight={600}>
            {format(date, "MMMM d, yyyy")}
          </Typography>

          {isSpecialDay && (
            <Paper
              elevation={6}
              sx={{
                position: "relative",
                px: 2,
                py: 0.5,
                cursor: "pointer",
                border: "2px solid",
                borderColor: deepOrange[500],
                boxShadow: 2,
                borderRadius: 2,
                background: deepOrange[200],
                color: "black",
                overflow: "hidden",
                "&:before": {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  opacity: 0.1,
                  transition: "opacity 0.2s",
                },
                "&:hover:before": {
                  opacity: 0.5,
                },
                "&:hover": {
                  borderColor: deepOrange[500],
                },
              }}
              onClick={handleSpecialDayClick}
            >
              <Typography variant="subtitle1">
                {specialDayContent?.title}
              </Typography>
            </Paper>
          )}
        </Box>

        {fullDayEvents.length > 0 && (
          <FullDayEvents
            fullDayEvents={fullDayEvents}
            visibleFullDayEvents={visibleFullDayEvents}
            handleEventClick={handleEventClick}
            showAllFullDayEvents={showAllFullDayEvents}
            setShowAllFullDayEvents={setShowAllFullDayEvents}
          />
        )}

        <HourlyEvents
          hours={hours}
          dayEvents={dayEvents}
          date={date}
          showPastDates={showPastDates}
          handleEventClick={handleEventClick}
          handleDayClick={handleDayClick}
        />

        {isSpecialDay && specialDayContent && (
          <SpecialDayModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            date={date}
            content={specialDayContent}
          />
        )}
      </Box>
    </ErrorBoundary>
  );
}
