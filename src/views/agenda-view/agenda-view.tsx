import { Box, Paper, Typography } from "@mui/material";
import { format } from "date-fns";
import { getBackgroundColor } from "@/utils/color-utils";
import { CalendarEvent } from "@/types/calendar";

interface AgendaViewProps {
  events: CalendarEvent[];
  handleEventClick: (e: React.MouseEvent, event: CalendarEvent) => void;
}

export const AgendaView = ({ events, handleEventClick }: AgendaViewProps) => {
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ mb: 6, px: 2 }}>
        <Typography variant="h4" fontWeight="bold" color="grey.800">
          Agenda View
        </Typography>
        <Typography color="grey.600" mt={1}>
          View your upcoming events in chronological order
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {sortedEvents.length === 0 ? (
          <Box sx={{ textAlign: "center", p: 8, color: "grey.500" }}>
            <Typography>No events scheduled. Time to add some!</Typography>
          </Box>
        ) : (
          sortedEvents.map((event) => (
            <Paper
              key={event.id}
              onClick={(e) => handleEventClick(e, event)}
              elevation={1}
              sx={{
                display: "flex",
                alignItems: "center",
                p: 3,
                borderRadius: 2,
                cursor: "pointer",
                transition: "all 0.2s",
                boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
                "&:hover": {
                  filter: "brightness(0.95)",
                  boxShadow: 3,
                },
                ...getBackgroundColor(event.color, 0.7),
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography fontWeight={600}>{event.title}</Typography>
                <Typography variant="body2">
                  {format(new Date(event.start), "PPp")}
                </Typography>
              </Box>
            </Paper>
          ))
        )}
      </Box>
    </Box>
  );
};
