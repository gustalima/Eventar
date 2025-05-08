import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import { Fragment, useState } from "react";
import { getBackgroundColor } from "@/utils/color-utils";
import type { CalendarEvent } from "@/types/calendar";
import { EventViewModal } from "./event-view-modal";

interface DayEventsModalProps {
  date: Date;
  events: CalendarEvent[];
  isOpen: boolean;
  onClose: () => void;
}

export function DayEventsModal({
  date,
  events,
  isOpen,
  onClose,
}: DayEventsModalProps) {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  console.log({ date, events });

  const sortedEvents = [...events].sort((a, b) => {
    if (a.isFullDay && !b.isFullDay) return -1;
    if (!a.isFullDay && b.isFullDay) return 1;
    return new Date(a.start).getTime() - new Date(b.start).getTime();
  });

  const filteredEvents = sortedEvents.filter((event) => {
    const eventDate = new Date(event.start);

    if (
      date.getHours() === 0 &&
      date.getMinutes() === 0 &&
      date.getSeconds() === 0
    ) {
      return true;
    }
    return (
      eventDate.getFullYear() === date.getFullYear() &&
      eventDate.getMonth() === date.getMonth() &&
      eventDate.getDate() === date.getDate() &&
      eventDate.getHours() === date.getHours()
    );
  });

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsEventModalOpen(true);
  };

  return (
    <Fragment>
      <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>{format(date, "MMMM d, yyyy")}</Typography>
          <IconButton aria-label="close" onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ maxHeight: "60vh" }}>
          <Stack spacing={2}>
            {filteredEvents.map((event) => (
              <Paper
                key={event.id}
                elevation={2}
                sx={{
                  p: 2,
                  cursor: "pointer",
                  ...getBackgroundColor(event.color),
                }}
                onClick={() => handleEventClick(event)}
              >
                <Typography variant="subtitle1">
                  {event.title} @ {event.resourceId}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {event.isFullDay
                    ? "All day"
                    : `${format(new Date(event.start), "HH:mm")} - ${format(new Date(event.end), "HH:mm")}`}
                </Typography>
                {event.description && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {event.description}
                  </Typography>
                )}
              </Paper>
            ))}
            {filteredEvents.length === 0 && (
              <Typography variant="body2" color="text.secondary">
                No events for this hour.
              </Typography>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary" disabled>
            Add new
          </Button>
        </DialogActions>
      </Dialog>

      {selectedEvent && (
        <EventViewModal
          event={selectedEvent}
          isOpen={isEventModalOpen}
          onClose={() => {
            setIsEventModalOpen(false);
            setSelectedEvent(null);
          }}
        />
      )}
    </Fragment>
  );
}
