import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { getBackgroundColor } from "@/utils/color-utils";
import { isPastDate } from "@/utils/date-utils";
import { FullDayEventsWeekViewProps } from "@/types/week";

export function FullDayEvents({
  events,
  onEventClick,
}: FullDayEventsWeekViewProps) {
  if (events.length === 0) return null;

  return (
    <Box
      sx={{
        borderRadius: 2,
        border: 1,
        borderColor: "divider",
        overflow: "hidden",
        bgcolor: "background.paper",
        p: 1,
      }}
    >
      <Box>
        <Typography variant="subtitle2">
          Full-Day Events ({events.length})
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 1, overflowX: "auto" }}>
        {events.map((event) => {
          const eventStartDate = new Date(event.start);
          const pastDate = isPastDate(eventStartDate);
          return (
            <Box
              key={event.id}
              sx={{
                flex: 1,
                minWidth: 200,
                p: 2,
                borderRadius: 1,
                transition: "opacity 0.3s",
                opacity: pastDate ? 0.5 : 1,
                cursor: pastDate ? "not-allowed" : "pointer",
                textDecoration: pastDate ? "line-through" : "none",
                filter: pastDate ? "grayscale(1)" : "none",
                "&:hover": {
                  opacity: 0.8,
                },
                ...getBackgroundColor(event.color),
              }}
              onClick={(e) => {
                if (!pastDate) {
                  onEventClick?.(e, event);
                }
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 500, fontSize: 14 }}
              >
                {event.title}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: 12 }}>
                {event.description}
              </Typography>
              {pastDate && (
                <Typography
                  variant="body2"
                  sx={{ fontSize: 12, color: "error.main" }}
                >
                  This event has passed
                </Typography>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
