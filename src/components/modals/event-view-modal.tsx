import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CloseIcon from "@mui/icons-material/Close";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import LinkIcon from "@mui/icons-material/Link";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import { grey } from "@mui/material/colors";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import { getBackgroundColor } from "@/utils/color-utils";
import type { CalendarEvent, DefaultModalConfig } from "@/types/calendar";

interface EventViewModalProps {
  event: CalendarEvent;
  isOpen: boolean;
  onClose: () => void;
  customComponent?: (event: CalendarEvent) => React.ReactNode;
  defaultModalConfig?: DefaultModalConfig;
}

export function EventViewModal({
  event,
  isOpen,
  onClose,
  customComponent,
  defaultModalConfig,
}: EventViewModalProps) {
  const modalConfig = {
    showModalHeaderStrip: true,
    disableActionButton: false,
    actionButtonName: "Join Meeting",
    titleStyles: "text-xl font-bold",
    ...defaultModalConfig,
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
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      slotProps={{
        paper: {
          sx: { borderRadius: 3, backgroundColor: "background.paper" },
        },
      }}
    >
      {!customComponent ? (
        <>
          <DialogTitle
            sx={{
              pb: 0.5,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
              ...(modalConfig.showModalHeaderStrip &&
                getBackgroundColor(event.color)),
            }}
          >
            <Box>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {event.title} @ {event.resourceId}
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                {event.status && <Chip label={event.status} size="small" />}
                {event.isFullDay && (
                  <Chip label="All Day" variant="outlined" size="small" />
                )}
              </Stack>
            </Box>
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Stack spacing={3}>
              {/* Time and Date */}
              <Stack direction="row" spacing={2} alignItems="center">
                <IconButton
                  disableRipple
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: grey[200],
                    color: grey[900],
                    cursor: "default",
                  }}
                >
                  <AccessTimeIcon />
                </IconButton>
                <Box>
                  <Typography>
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
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      backgroundColor: "action.hover",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <LocationOnIcon />
                  </Box>
                  <Box>
                    <Typography>{event.location}</Typography>
                    {event.locationDetail && (
                      <Typography variant="body2" color="text.secondary">
                        {event.locationDetail}
                      </Typography>
                    )}
                  </Box>
                </Stack>
              )}

              {/* Description */}
              {event.description && (
                <Box>
                  <Typography>Description</Typography>
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
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    backgroundColor: "action.selected",
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <ErrorOutlineIcon />
                  <Typography variant="body2">
                    {event.additionalInfo}
                  </Typography>
                </Paper>
              )}
            </Stack>
          </DialogContent>
          <DialogActions>
            {event.meetingLink && (
              <Button
                variant="outlined"
                startIcon={<LinkIcon />}
                fullWidth
                onClick={() => window.open(event.meetingLink, "_blank")}
                disabled={modalConfig.disableActionButton}
              >
                {modalConfig.actionButtonName}
              </Button>
            )}
          </DialogActions>
        </>
      ) : (
        <Box>{customComponent(event)}</Box>
      )}
    </Dialog>
  );
}
