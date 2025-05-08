import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckIcon from "@mui/icons-material/Check";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LinkIcon from "@mui/icons-material/Link";
import PlaceIcon from "@mui/icons-material/Place";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { useState } from "react";
import { getBackgroundColor } from "@/utils/color-utils";
import { CalendarEvent } from "@/types/calendar";

export default function CardEventModal({ event }: { event: CalendarEvent }) {
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState(0);

  const handleCopyLink = async () => {
    if (event.meetingLink) {
      await navigator.clipboard.writeText(event.meetingLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getTimeFormatFromDuration = (duration: number) => {
    const hours = Math.floor(duration);
    const minutes = Math.round((duration - hours) * 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 700,
        mx: "auto",
        my: 4,
        animation: "fadeInUp 0.3s",
        "@keyframes fadeInUp": {
          from: { opacity: 0, transform: "translateY(20px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      }}
    >
      <Card elevation={8}>
        <CardContent sx={{ p: 0, ...getBackgroundColor(event.color, 0.7) }}>
          <Box sx={{ position: "relative" }}>
            <Box sx={{ p: 3 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <Typography variant="h5" fontWeight="bold">
                  {event.title}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} mt={1}>
                {event.course && (
                  <Chip label={event.course} variant="outlined" />
                )}
                {event.batch && <Chip label={event.batch} variant="outlined" />}
              </Stack>
            </Box>

            <Box sx={{ px: 3 }}>
              <Tabs
                value={tab}
                onChange={(_, v) => setTab(v)}
                sx={{ mb: 3, borderBottom: 1, borderColor: "divider" }}
                variant="fullWidth"
              >
                <Tab label="Details" />
                <Tab label="Additional Info" />
              </Tabs>

              {tab === 0 && (
                <Box>
                  <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                    <AccessTimeIcon sx={{ color: "#71717a", fontSize: 20 }} />
                    <Box>
                      <Typography fontWeight={500}>
                        {format(new Date(event.start), "EEEE, MMMM d, yyyy")}
                      </Typography>
                      {!event.isFullDay && (
                        <Typography variant="body2" color="text.secondary">
                          {format(new Date(event.start), "HH:mm")} -{" "}
                          {format(new Date(event.end), "HH:mm")}
                          <span style={{ marginLeft: 8 }}>
                            (
                            {event.duration
                              ? getTimeFormatFromDuration(event.duration)
                              : getTimeFormatFromDuration(
                                  (new Date(event.end).getTime() -
                                    new Date(event.start).getTime()) /
                                    3600000
                                )}
                            )
                          </span>
                        </Typography>
                      )}
                    </Box>
                  </Stack>

                  {event.location && (
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={2}
                      mb={2}
                    >
                      <PlaceIcon sx={{ color: "#71717a", fontSize: 20 }} />
                      <Box>
                        <Typography fontWeight={500}>
                          {event.location}
                        </Typography>
                        {event.locationDetail && (
                          <Typography variant="body2" color="text.secondary">
                            {event.locationDetail}
                          </Typography>
                        )}
                      </Box>
                    </Stack>
                  )}

                  {event.description && (
                    <Paper
                      variant="outlined"
                      sx={{
                        backgroundColor: (theme) =>
                          theme.palette.mode === "dark"
                            ? "grey.900"
                            : "grey.50",
                        p: 2,
                        borderRadius: 2,
                        mt: 2,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ whiteSpace: "pre-wrap" }}
                      >
                        {event.description}
                      </Typography>
                    </Paper>
                  )}
                </Box>
              )}

              {tab === 1 && (
                <Box>
                  {event.additionalInfo ? (
                    <Paper
                      variant="outlined"
                      sx={{
                        backgroundColor: (theme) =>
                          theme.palette.mode === "dark"
                            ? "grey.900"
                            : "grey.50",
                        p: 2,
                        borderRadius: 2,
                      }}
                    >
                      <Typography variant="body2">
                        {event.additionalInfo}
                      </Typography>
                    </Paper>
                  ) : (
                    <Box
                      sx={{
                        textAlign: "center",
                        py: 6,
                        color: "text.secondary",
                      }}
                    >
                      <InfoOutlinedIcon sx={{ fontSize: 48, mb: 1 }} />
                      <Typography>
                        No additional information available
                      </Typography>
                    </Box>
                  )}
                </Box>
              )}
            </Box>

            {event.meetingLink && (
              <Box sx={{ p: 3, pt: 0, display: "flex", gap: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<LinkIcon sx={{ fontSize: 20 }} />}
                  onClick={() => window.open(event.meetingLink, "_blank")}
                >
                  Join Meeting
                </Button>
                <IconButton color="primary" onClick={handleCopyLink}>
                  {copied ? (
                    <CheckIcon sx={{ fontSize: 20 }} />
                  ) : (
                    <ContentCopyIcon sx={{ fontSize: 20 }} />
                  )}
                </IconButton>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
