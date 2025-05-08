import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { format, isBefore, setHours } from "date-fns";
import { getBackgroundColor } from "@/utils/color-utils";
import { CalendarEvent } from "@/types/calendar";
import { HourlyEventsProps } from "@/types/day";

const HourlyEvents = ({
  hours,
  dayEvents,
  date,
  showPastDates,
  handleEventClick,
  handleDayClick,
}: HourlyEventsProps) => {
  const isPastHour = (hour: number) => {
    if (showPastDates) return false;
    const currentDate = new Date();
    const hourDate = setHours(date, hour);

    return isBefore(hourDate, currentDate);
  };

  const groupEventsByTime = (events: CalendarEvent[]) => {
    const groups: { [key: string]: CalendarEvent[] } = {};
    events.forEach((event) => {
      const key = `${event.start}-${event.end}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(event);
    });
    return groups;
  };

  return (
    <Box
      sx={{
        flex: 1,
        borderRadius: 2,
        border: 1,
        borderColor: "divider",
        overflow: "hidden",
      }}
    >
      {hours.map((hour) => {
        const timeEvents = dayEvents.filter(
          (event) =>
            !event.isFullDay && new Date(event.start).getHours() === hour
        );

        return (
          <Box
            key={hour}
            sx={{
              position: "relative",
              minHeight: 60,
              backgroundColor: isPastHour(hour) ? grey[100] : "white",
              "&:hover": {
                backgroundColor: isPastHour(hour) ? grey[200] : grey[100],
              },
              borderBottom: 1,
              borderColor: "divider",
              "&:last-child": {
                borderBottom: "none",
              },
            }}
            onDoubleClick={(e) => {
              e.stopPropagation();
              handleDayClick?.(setHours(date, hour));
            }}
          >
            <Box
              sx={{
                position: "sticky",
                left: 0,
                width: 80,
                pr: 2,
                py: 2,
                textAlign: "right",
                fontSize: 14,
                color: isPastHour(hour) ? "text.disabled" : "text.secondary",
                zIndex: 1,
              }}
            >
              {hour.toString().padStart(2, "0")}:00
            </Box>

            {Object.entries(groupEventsByTime(timeEvents)).map(
              ([timeKey, events]) => {
                const firstEvent = events[0];
                const hasMultiple = events.length > 1;
                const eventStart = new Date(firstEvent.start);
                const eventEnd = new Date(firstEvent.end);
                const durationInHours =
                  (eventEnd.getTime() - eventStart.getTime()) /
                  (1000 * 60 * 60);

                return (
                  <Box
                    key={timeKey}
                    sx={{
                      position: "absolute",
                      left: 96,
                      right: 16,
                      borderRadius: 2,
                      cursor: "pointer",
                      top: `${(eventStart.getMinutes() / 60) * 100}%`,
                      height: `${Math.max(durationInHours * 100, 8)}%`,
                      minHeight: 24,
                      zIndex: 2,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (hasMultiple && !isPastHour(hour)) {
                        handleDayClick?.(setHours(date, hour));
                      } else if (!isPastHour(hour)) {
                        handleDayClick?.(setHours(date, hour));
                      } else {
                        return;
                      }
                    }}
                  >
                    {hasMultiple ? (
                      <ConcurrentHourlyEvents events={events} />
                    ) : (
                      <Paper
                        elevation={1}
                        sx={{
                          p: 2,
                          pt: 0.75,
                          borderRadius: 2,
                          height: "100%",
                          ...getBackgroundColor(firstEvent.color),
                          overflow: "hidden",
                        }}
                      >
                        <Typography variant="subtitle1" noWrap>
                          {firstEvent.title}
                        </Typography>
                        <Typography variant="body2">
                          {format(eventStart, "HH:mm")} -{" "}
                          {format(eventEnd, "HH:mm")}
                        </Typography>
                      </Paper>
                    )}
                  </Box>
                );
              }
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default HourlyEvents;
type ConcurrentHourlyEventsProps = {
  events: CalendarEvent[];
};

function ConcurrentHourlyEvents({ events }: ConcurrentHourlyEventsProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "row", flex: 1, gap: 0.5 }}>
      {events.map((event) => (
        <Paper
          key={event.id}
          elevation={1}
          sx={{
            flex: 1,
            position: "relative",
            ...getBackgroundColor(event.color),
            p: 2,
            pt: 0.75,
            borderRadius: 2,
            height: "100%",
            boxShadow: 1,
          }}
        >
          <Typography variant="subtitle1">{event.title}</Typography>
          <Typography variant="body2">
            {format(new Date(event.start), "HH:mm")} -{" "}
            {format(new Date(event.end), "HH:mm")}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
}
