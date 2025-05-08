import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckIcon from "@mui/icons-material/Check";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { getBackgroundColor } from "@/utils/color-utils";
import { CalendarEvent } from "@/types/calendar";

export default function CompactEventModal({ event }: { event: CalendarEvent }) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState<string | false>(false);

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

  const handleAccordionChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box
      sx={{
        ...getBackgroundColor(event.color, 0.7),
        width: "100%",
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 3,
        borderLeft: "4px solid",
        borderLeftColor: getBackgroundColor(event.color, 1).backgroundColor,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          <Box
            component="h2"
            sx={{ fontSize: "1.125rem", fontWeight: 600, m: 0 }}
          >
            {event.title}
          </Box>
          {event.status && (
            <Badge
              variant={event.status === "confirmed" ? "default" : "secondary"}
            >
              {event.status}
            </Badge>
          )}
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {event.course && <Badge variant="outline">{event.course}</Badge>}
          {event.batch && <Badge variant="outline">{event.batch}</Badge>}
        </Box>
      </Box>

      {/* Quick Info */}
      <Box
        sx={{
          p: 2,
          bgcolor: "action.hover",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            fontSize: "0.875rem",
          }}
        >
          <AccessTimeIcon sx={{ height: 16, width: 16, color: "#71717a" }} />
          <span>
            {format(new Date(event.start), "EEE, MMM d")}
            {!event.isFullDay && (
              <>
                {" "}
                • {format(new Date(event.start), "HH:mm")}-
                {format(new Date(event.end), "HH:mm")}
              </>
            )}
          </span>
        </Box>
      </Box>

      {/* Accordions */}
      <Box sx={{ borderTop: 0, borderBottom: 0 }}>
        {/* Time Details */}
        <Accordion
          expanded={expanded === "time"}
          onChange={handleAccordionChange("time")}
          sx={{ boxShadow: "none", borderBottom: 1, borderColor: "divider" }}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                sx={{
                  height: 16,
                  width: 16,
                  transition: "transform 0.2s",
                  transform: expanded === "time" ? "rotate(180deg)" : undefined,
                }}
              />
            }
            sx={{
              p: 2,
              fontSize: "0.875rem",
              "& .MuiAccordionSummary-content": { margin: 0 },
              "&:hover": { bgcolor: "action.hover" },
            }}
          >
            <Typography sx={{ fontWeight: 500 }}>Time Details</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 2, pt: 0, fontSize: "0.875rem" }}>
            <Box>
              Duration:{" "}
              {event.duration
                ? getTimeFormatFromDuration(event.duration)
                : getTimeFormatFromDuration(
                    (new Date(event.end).getTime() -
                      new Date(event.start).getTime()) /
                      3600000
                  )}
            </Box>
            {event.recurring && (
              <Box sx={{ color: "text.secondary" }}>Recurring event</Box>
            )}
          </AccordionDetails>
        </Accordion>

        {/* Location */}
        {event.location && (
          <Accordion
            expanded={expanded === "location"}
            onChange={handleAccordionChange("location")}
            sx={{ boxShadow: "none", borderBottom: 1, borderColor: "divider" }}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon
                  sx={{
                    height: 16,
                    width: 16,
                    transition: "transform 0.2s",
                    transform:
                      expanded === "location" ? "rotate(180deg)" : undefined,
                  }}
                />
              }
              sx={{
                p: 2,
                fontSize: "0.875rem",
                "& .MuiAccordionSummary-content": { margin: 0 },
                "&:hover": { bgcolor: "action.hover" },
              }}
            >
              <Typography sx={{ fontWeight: 500 }}>Location</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 2, pt: 0, fontSize: "0.875rem" }}>
              <Box>{event.location}</Box>
              {event.locationDetail && (
                <Box sx={{ color: "text.secondary" }}>
                  {event.locationDetail}
                </Box>
              )}
            </AccordionDetails>
          </Accordion>
        )}

        {/* Description */}
        {event.description && (
          <Accordion
            expanded={expanded === "description"}
            onChange={handleAccordionChange("description")}
            sx={{ boxShadow: "none", borderBottom: 1, borderColor: "divider" }}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon
                  sx={{
                    height: 16,
                    width: 16,
                    transition: "transform 0.2s",
                    transform:
                      expanded === "description" ? "rotate(180deg)" : undefined,
                  }}
                />
              }
              sx={{
                p: 2,
                fontSize: "0.875rem",
                "& .MuiAccordionSummary-content": { margin: 0 },
                "&:hover": { bgcolor: "action.hover" },
              }}
            >
              <Typography sx={{ fontWeight: 500 }}>Description</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 2, pt: 0, fontSize: "0.875rem" }}>
              <Box
                sx={{
                  whiteSpace: "pre-wrap",
                  color: "text.secondary",
                }}
              >
                {event.description}
              </Box>
            </AccordionDetails>
          </Accordion>
        )}

        {/* Additional Info */}
        {event.additionalInfo && (
          <Accordion
            expanded={expanded === "info"}
            onChange={handleAccordionChange("info")}
            sx={{ boxShadow: "none", borderBottom: 1, borderColor: "divider" }}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon
                  sx={{
                    height: 16,
                    width: 16,
                    transition: "transform 0.2s",
                    transform:
                      expanded === "info" ? "rotate(180deg)" : undefined,
                  }}
                />
              }
              sx={{
                p: 2,
                fontSize: "0.875rem",
                "& .MuiAccordionSummary-content": { margin: 0 },
                "&:hover": { bgcolor: "action.hover" },
              }}
            >
              <Typography sx={{ fontWeight: 500 }}>Additional Info</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 2, pt: 0, fontSize: "0.875rem" }}>
              <Box
                sx={{
                  bgcolor: "action.hover",
                  p: 1.5,
                  borderRadius: 1,
                }}
              >
                <Box sx={{ color: "text.secondary" }}>
                  {event.additionalInfo}
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        )}
      </Box>

      {/* Actions */}
      {event.meetingLink && (
        <Box
          sx={{
            p: 2,
            borderTop: 1,
            borderColor: "divider",
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              sx={{ flex: 1 }}
              onClick={() => window.open(event.meetingLink, "_blank")}
            >
              <OpenInNewIcon sx={{ marginRight: 1, height: 16, width: 16 }} />
              Join Meeting
            </Button>
            <Button variant="outlined" onClick={handleCopyLink}>
              {copied ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <CheckIcon sx={{ height: 16, width: 16 }} />
                  <span style={{ position: "absolute", left: -9999 }}>
                    Copied
                  </span>
                </Box>
              ) : (
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <ContentCopyIcon sx={{ height: 16, width: 16 }} />
                  <span style={{ position: "absolute", left: -9999 }}>
                    Copy link
                  </span>
                </Box>
              )}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
