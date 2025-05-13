import EventNoteIcon from "@mui/icons-material/EventNote";
import { Box, Button, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { ErrorBoundary } from "@/components/error-boundary";
import { FilterPopover } from "@/components/filter-popover";
import { Navigation } from "@/components/navigation";
import { CalendarHeaderProps } from "@/types/calendar";
import { ResourceSelector } from "./resource-selector";
import { ViewOptions } from "./view-options";

export function CalendarHeader({
  view,
  setView,
  currentDate,
  setCurrentDate,
  selectedColors,
  onColorToggle,
  navigation,
  showViewOptions,
  setIsNewEventOpen,
  yearRange,
  availableColors,
  showAgenda,
  agendaView,
  handleAgendaView,
  showClock,
  resources,
  selectedResource,
  onResourceChange,
}: CalendarHeaderProps) {
  if (!showViewOptions || showViewOptions.length === 0) {
    throw new Error("At least one view option must be provided");
  }

  useEffect(() => {
    if (!showViewOptions.includes(view)) {
      setView(showViewOptions[0]);
    }
  }, [view, showViewOptions, setView]);

  const availableYears = yearRange.map((year) => Number.parseInt(year));

  const handleTodayClick = () => {
    setCurrentDate(new Date());
  };

  return (
    <ErrorBoundary>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          pb: 2,
        }}
        id="calendar-header"
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 1,
          }}
        >
          {/* Navigation */}
          {navigation && (
            <Navigation
              currentDate={currentDate}
              setCurrentDate={setCurrentDate}
              view={view}
              availableYears={availableYears}
            />
          )}

          {/* Clock */}
          {showClock && <ClockComponent />}

          {/* View Options and Actions */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              marginLeft: "auto",
            }}
          >
            <Button
              onClick={() => setIsNewEventOpen(true)}
              variant="contained"
              sx={{ height: 40 }}
              disableElevation
              startIcon={<EventNoteIcon />}
            >
              New Event
            </Button>
            <ResourceSelector
              resources={resources}
              selectedResource={selectedResource}
              onResourceChange={onResourceChange}
            />

            <FilterPopover
              resources={resources}
              selectedColors={selectedColors}
              onColorToggle={onColorToggle}
              colors={availableColors}
            />

            <Button
              onClick={handleTodayClick}
              sx={{ height: 40 }}
              variant={
                currentDate.toDateString() === new Date().toDateString()
                  ? "contained"
                  : "outlined"
              }
            >
              Today
            </Button>

            <ViewOptions
              view={view}
              setView={setView}
              showViewOptions={showViewOptions}
            />
            {showAgenda && (
              <Button
                disableElevation
                onClick={() => handleAgendaView?.(!showAgenda)}
                variant={agendaView ? "contained" : "outlined"}
                sx={{ height: 40 }}
                startIcon={<EventNoteIcon />}
              >
                Schedule
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </ErrorBoundary>
  );
}
function ClockComponent() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getTimeEmoji = (hours: number) => {
    if (hours >= 5 && hours < 12) return "🌅";
    if (hours >= 12 && hours < 17) return "☀️";
    if (hours >= 17 && hours < 20) return "🌇";
    return "🌙";
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        fontSize: "1.125rem",
        border: 1,
        borderColor: grey[400],
        borderRadius: 1,
        p: 0.5,
        px: 1.5,
        height: 40,
      }}
    >
      <span>{getTimeEmoji(time.getHours())}</span>
      <Typography variant="body1" sx={{ fontWeight: 600 }}>
        {time.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })}
      </Typography>
    </Box>
  );
}
