import { Badge, Box, Button, Popover, Typography } from "@mui/material";
import { amber, deepOrange, grey } from "@mui/material/colors";
import React, { useState } from "react";
import { getBackgroundColor } from "@/utils/color-utils";
import { EventsPopoverProps } from "@/types/event";

export function EventsPopover({
  events,
  date,
  handleEventClick,
  specialDayContent,
}: EventsPopoverProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Badge
        badgeContent={events.length}
        color="primary"
        sx={{
          width: "100%",
        }}
      >
        <Button
          aria-label={`${events.length} events on ${date.toLocaleDateString()}`}
          onClick={handleOpen}
          sx={{
            minWidth: 0,
            height: 16,
            padding: 0,
            color: "white",
            width: "100%",
          }}
        >
          {date.getDate()}
        </Button>
      </Badge>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: 1,
              backgroundColor: "background.paper",
              p: 3,
              minWidth: 400,
              boxShadow: 6,
              border: (theme) =>
                theme.palette.mode === "dark"
                  ? "1px solid #3f3f46"
                  : "1px solid #e0e0e0",
              maxWidth: 750,
              zIndex: 10,
            },
          },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography fontWeight={600}>
            {date.toLocaleDateString(undefined, { dateStyle: "long" })}
          </Typography>
          {specialDayContent && (
            <Box
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                p: 2,
                background: (theme) =>
                  theme.palette.mode === "dark" ? amber[100] : amber[300],
                border: deepOrange[200],
                boxShadow: 1,
                borderRadius: 1,
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  sx={{
                    color: grey[900],
                  }}
                >
                  {specialDayContent.title}
                </Typography>
                <Box
                  sx={{
                    fontSize: 12,

                    px: 1,
                    borderRadius: 1,
                    backgroundColor: (theme) =>
                      theme.palette.mode === "dark"
                        ? deepOrange[300]
                        : deepOrange[500],
                    color: "white",
                    height: "max-content",
                    alignSelf: "center",
                  }}
                >
                  {specialDayContent.type}
                </Box>
              </Box>
              <Typography
                sx={{
                  fontSize: 12,
                  color: (theme) =>
                    theme.palette.mode === "dark" ? "#a1a1aa" : "#6b7280",

                  px: 1,
                  borderRadius: 1,
                  mt: 1,
                  width: "max-content",
                }}
              >
                {specialDayContent.description}
              </Typography>
            </Box>
          )}
          {events.map((event, index) => (
            <Button
              key={event.id || index}
              onClick={(e) => {
                handleEventClick?.(e, event);
                handleClose();
              }}
              sx={{
                width: "100%",
                textAlign: "left",
                fontSize: 14,
                pl: 2,
                py: 1,
                borderRadius: 1,
                ...getBackgroundColor(event.color, 0.7),

                "&:hover": {
                  ...getBackgroundColor(event.color, 0.4),
                },
                alignItems: "flex-start",
                flexDirection: "column",
                color: (theme) =>
                  theme.palette.mode === "dark" ? "#e4e4e7" : "#111827",
                textTransform: "none",
              }}
            >
              <Typography>
                <b>{event.title}</b> @ {event.resourceId}
              </Typography>

              <Typography
                sx={{
                  fontSize: 12,
                }}
              >
                {new Date(event.start).toLocaleTimeString(undefined, {
                  timeStyle: "short",
                })}
                {event.end &&
                  ` - ${new Date(event.end).toLocaleTimeString(undefined, {
                    timeStyle: "short",
                  })}`}
              </Typography>
            </Button>
          ))}
        </Box>
      </Popover>
    </>
  );
}
