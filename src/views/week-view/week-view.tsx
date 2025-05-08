import { FullDayEvents } from "@/views/week-view/full-day-events";
import { WeekHeader } from "@/views/week-view/week-header";
import { WeekViewSkeleton } from "@/views/week-view/week-view-skeleton";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses, TooltipProps } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { format, getWeek } from "date-fns";
import { ErrorBoundary } from "@/components/error-boundary";
import { useWeekViewCalculations } from "@/hooks/use-week-view-calculations";
import { getBackgroundColor } from "@/utils/color-utils";
import { isSpecialDay } from "@/utils/date-utils";
import { CalendarEvent } from "@/types/calendar";
import { WeekViewProps } from "@/types/week";

export function WeekView({
  date,
  events,
  showPastDates = true,
  handleEventClick,
  isLoading,
  specialDays,
  startOfWeek,
}: WeekViewProps) {
  const { weekDays, hours, fullDayEvents, isPastDate } =
    useWeekViewCalculations(date, events, showPastDates, startOfWeek);

  if (isLoading) {
    return <WeekViewSkeleton />;
  }

  return (
    <ErrorBoundary>
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 1 }}
        id="week-view"
      >
        <FullDayEvents events={fullDayEvents} onEventClick={handleEventClick} />

        <Paper
          elevation={0}
          sx={{
            flex: 1,
            borderRadius: 2,
            border: 1,
            borderColor: "divider",
            overflow: "hidden",
          }}
        >
          <WeekHeader
            weekDays={weekDays}
            currentDate={date}
            isPastDate={isPastDate}
            isSpecialDay={isSpecialDay(date, specialDays ?? [])}
            specialDayContent={specialDays?.find((day) =>
              isSpecialDay(date, [day])
            )}
          />

          <Box sx={{ position: "relative" }}>
            {hours.map((hour) => (
              <Box
                key={hour}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(8, 1fr)",
                  "&:hover": {
                    backgroundColor: (theme) =>
                      theme.palette.mode === "dark"
                        ? "rgba(24,24,27,0.5)"
                        : "rgba(245,245,245,0.5)",
                  },
                  transition: "background-color 0.2s",
                }}
              >
                <Box
                  sx={{
                    position: "sticky",
                    left: 0,
                    p: 1,
                    textAlign: "right",
                    fontSize: "0.875rem",
                    color: "text.secondary",
                    backgroundColor: (theme) =>
                      theme.palette.mode === "dark"
                        ? theme.palette.background.default
                        : "#fff",
                    fontWeight: 400,
                    transition: "all 0.2s",
                  }}
                >
                  {hour.toString().padStart(2, "0")}:00
                </Box>
                {weekDays.map((day, dayIndex) => (
                  <Box
                    key={dayIndex}
                    sx={{
                      position: "relative",
                      borderLeft: 1,
                      borderColor: "divider",
                      minHeight: "3rem",
                      opacity: isPastDate(day) ? 0.5 : 1,
                      backgroundColor: isPastDate(day)
                        ? (theme) =>
                            theme.palette.mode === "dark"
                              ? "rgba(39,39,42,1)"
                              : "rgba(244,244,245,1)"
                        : "transparent",
                      "&:hover": !isPastDate(day)
                        ? {
                            backgroundColor: (theme) =>
                              theme.palette.mode === "dark"
                                ? "rgba(39,39,42,0.5)"
                                : "rgba(244,244,245,0.5)",
                          }
                        : {},
                    }}
                  >
                    {events
                      .filter(
                        (event) =>
                          !event.isFullDay &&
                          new Date(event.start).getHours() === hour &&
                          new Date(event.start).getDate() === day.getDate()
                      )
                      .map((event, eventIndex, eventArray) => (
                        <Box
                          key={event.id}
                          sx={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            ml: eventIndex === 0 ? 1 : 1 + eventIndex * 0.5,
                            mr: 1 - eventIndex * 0.5,
                            mt: eventIndex * 0.5,
                            borderRadius: 1,
                            fontSize: "0.875rem",
                            cursor: "pointer",
                            border: "1px solid",
                            borderColor: "#e0e0e0",
                            boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                            transition: "all 0.2s",
                            top: `${
                              (new Date(event.start).getMinutes() / 60) * 100
                            }%`,
                            height: `${
                              ((new Date(event.end).getTime() -
                                new Date(event.start).getTime()) /
                                (1000 * 60 * 60)) *
                              100
                            }%`,
                            filter: isPastDate(day)
                              ? "grayscale(1) brightness(0.95) opacity(0.5)"
                              : undefined,

                            zIndex: eventArray.length - eventIndex,
                          }}
                        >
                          <HtmlTooltip
                            title={
                              eventArray.length > 1 ? (
                                <OtherEventsTooltip
                                  dayIndex={dayIndex}
                                  weekDays={weekDays}
                                  eventArray={eventArray}
                                  isPastDate={isPastDate}
                                  day={day}
                                  handleEventClick={handleEventClick}
                                />
                              ) : null
                            }
                            placement="right"
                            arrow
                          >
                            <Box
                              onClick={(e) => {
                                if (!isPastDate(day))
                                  handleEventClick?.(e, event);
                              }}
                              sx={{
                                ...getBackgroundColor(event.color),
                                height: "100%",
                                borderRadius: 1,
                                p: 1,
                                position: "relative",
                                backdropFilter: "blur(4px)",
                                opacity: 0.9,
                              }}
                            >
                              <Typography
                                variant="body2"
                                sx={{
                                  visibility:
                                    eventIndex === 0 ? null : "hidden",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {event.title}
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{
                                  opacity: 0.75,
                                  visibility:
                                    eventIndex === 0 ? null : "hidden",
                                }}
                              >
                                {format(new Date(event.start), "HH:mm")} -{" "}
                                {format(new Date(event.end), "HH:mm")}
                              </Typography>
                            </Box>
                          </HtmlTooltip>
                        </Box>
                      ))}
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        </Paper>
      </Box>
    </ErrorBoundary>
  );
}

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "white",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 500,
    border: "1px solid #dadde9",
  },
}));

interface OtherEventsTooltipProps {
  dayIndex: number;
  weekDays: Date[];
  eventArray: CalendarEvent[];
  isPastDate: (day: Date) => boolean;
  day: Date;
  handleEventClick?: (e: React.MouseEvent, event: CalendarEvent) => void;
}

function OtherEventsTooltip({
  dayIndex,
  weekDays,
  eventArray,
  isPastDate,
  day,
  handleEventClick,
}: OtherEventsTooltipProps) {
  return (
    <Box
      sx={{
        left: dayIndex === weekDays.length - 1 ? "auto" : "100%",
        right: dayIndex === weekDays.length - 1 ? "100%" : "auto",
        width: 300,

        backgroundColor: (theme) =>
          theme.palette.mode === "dark"
            ? theme.palette.background.paper
            : "#fff",

        p: 1,
        gap: 1,
      }}
    >
      <Typography sx={{ mb: 1, fontWeight: 600 }}>Other events</Typography>
      {eventArray.slice(1).map((event, i) => (
        <Typography
          key={i}
          onClick={(e) => {
            if (!isPastDate(day)) handleEventClick?.(e, event);
          }}
          sx={{
            fontSize: "0.75rem",
            py: 1,
            mb: 1,
            borderRadius: 1,
            px: 1,
            cursor: "pointer",
            ...getBackgroundColor(event.color),
          }}
        >
          {event.title} @ {event.resourceId}
        </Typography>
      ))}
    </Box>
  );
}
