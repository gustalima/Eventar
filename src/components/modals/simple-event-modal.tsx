import AccessTime from "@mui/icons-material/AccessTime";
import Check from "@mui/icons-material/Check";
import ContentCopy from "@mui/icons-material/ContentCopy";
import LinkIcon from "@mui/icons-material/Link";
import RoomIcon from "@mui/icons-material/Room";
import Alert from "@mui/icons-material/WarningAmberOutlined";
import {
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { useState } from "react";
import { getBackgroundColor } from "@/utils/color-utils";
import { CalendarEvent } from "@/types/calendar";

export default function SimpleEventModal({ event }: { event: CalendarEvent }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    if (event.meetingLink) {
      await navigator.clipboard.writeText(event.meetingLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const calculateDuration = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const duration = Math.abs(endDate.getTime() - startDate.getTime());
    const hours = Math.floor(duration / 36e5);
    const minutes = Math.floor((duration % 36e5) / 6e4);
    return `${hours}h ${minutes}m`;
  };

  const getTimeFormatFromDuration = (duration: number) => {
    const hours = Math.floor(duration);
    const minutes = Math.round((duration - hours) * 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <Paper
      elevation={1}
      sx={{
        width: "100%",
        maxWidth: 600,
        bgcolor: "background.paper",
        borderRadius: 3,
        boxShadow: 6,
        zIndex: 50,
        overflow: "hidden",
      }}
    >
      {/* Header with color strip */}
      <Box sx={{ height: 8, width: "100%" }} />

      {/* Main content */}
      <Box sx={{ p: 4 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box sx={{ ...getBackgroundColor(event.color, 0.7) }}>
            <Typography variant="h6" fontWeight={600}>
              {event.title}
            </Typography>
            <Stack direction="row" spacing={1} mt={1}>
              {event.course && (
                <Chip label={event.course} size="small" color="default" />
              )}
              {event.batch && (
                <Chip label={event.batch} size="small" color="default" />
              )}
            </Stack>
          </Box>
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Stack spacing={3}>
          {/* Time and Date */}
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                bgcolor: "grey.200",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AccessTime />
            </Box>
            <Box>
              <Typography fontWeight={500}>
                {event.isFullDay ? (
                  format(new Date(event.start), "EEEE, MMMM d, yyyy")
                ) : (
                  <>
                    {format(new Date(event.start), "EEEE, MMMM d, yyyy")}
                    <br />
                    {format(new Date(event.start), "HH:mm")} -{" "}
                    {format(new Date(event.end), "HH:mm")}{" "}
                    {event.duration ? (
                      <Typography
                        component="span"
                        variant="caption"
                        color="text.secondary"
                      >
                        ({getTimeFormatFromDuration(event.duration)})
                      </Typography>
                    ) : (
                      <Typography
                        component="span"
                        variant="caption"
                        color="text.secondary"
                      >
                        (
                        {calculateDuration(
                          event.start.toString(),
                          event.end.toString()
                        )}
                        )
                      </Typography>
                    )}
                  </>
                )}
              </Typography>
              {event.recurring && (
                <Typography variant="body2" color="text.secondary">
                  Recurring event
                </Typography>
              )}
            </Box>
          </Stack>

          {/* Location if available */}
          {event.location && (
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  bgcolor: "grey.200",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <RoomIcon />
              </Box>
              <Box>
                <Typography fontWeight={500}>{event.location}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {event.locationDetail}
                </Typography>
              </Box>
            </Stack>
          )}

          {/* Description */}
          {event.description && (
            <Box mt={2}>
              <Typography fontWeight={500}>Description</Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ whiteSpace: "pre-wrap" }}
              >
                {event.description}
              </Typography>
            </Box>
          )}

          {/* Additional Info */}
          {event.additionalInfo && (
            <Box
              mt={2}
              p={2}
              borderRadius={2}
              bgcolor="grey.100"
              display="flex"
              alignItems="center"
              gap={1}
            >
              <Alert style={{ marginRight: 8 }} />
              <Typography variant="body2">{event.additionalInfo}</Typography>
            </Box>
          )}
        </Stack>

        {/* Action Buttons */}
        <Stack direction="row" spacing={2} mt={5}>
          {event.meetingLink && (
            <>
              <Button
                variant="outlined"
                fullWidth
                disabled={event.meetingLink.length === 0}
                onClick={() => window.open(event.meetingLink, "_blank")}
                startIcon={<LinkIcon />}
                sx={{ borderRadius: 2 }}
              >
                Join Meeting
              </Button>
              <Button
                variant="outlined"
                onClick={handleCopyLink}
                sx={{ borderRadius: 2, minWidth: 120 }}
                startIcon={copied ? <Check /> : <ContentCopy />}
              >
                {copied ? "Copied" : "Copy Link"}
              </Button>
            </>
          )}
        </Stack>
      </Box>
    </Paper>
  );
}
