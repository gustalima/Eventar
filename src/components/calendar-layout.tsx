import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Fragment, useMemo, useState } from "react";
import { useSessionStorage } from "@/hooks/useLocalStorage";
import { getEventsForDate } from "@/utils/calendar-utils";
import { filterEvents } from "@/utils/event-filters";
import type {
  CalendarEvent,
  CalendarView,
  EventarProps,
  FilterColors,
} from "@/types/calendar";
import { SpinnerVariant } from "@/types/spinner.types";
import { Weeks } from "@/constants/calendar";
import { DEFAULT_FILTER_COLORS } from "../constants/colors";
import { CalendarHeader } from "./calendar-header";
import { ErrorBoundary } from "./error-boundary";
import { DayEventsModal } from "./modals/day-events-modal";
import { EventViewModal } from "./modals/event-view-modal";
import { RenderView } from "./render-view";

export function Eventar({
  events,
  setEvents,
  navigation = true,
  views = ["day", "month"],
  defaultView = "month",
  yearRange,
  showPastDates = true,
  isLoading,
  error,
  spinnerComponent = SpinnerVariant.CIRCLE,
  theme = "light",
  customEventViewer,
  defaultModalConfig,
  showAgenda = false,
  showClock = false,
  resources = [],
  specialDays = [],
  startOfWeek = Weeks.MONDAY,
}: EventarProps) {
  const darkTheme = createTheme({
    palette: {
      mode: theme,
    },
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );
  const [isDayModalOpen, setIsDayModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isNewEventOpen, setIsNewEventOpen] = useState(false);
  const [selectedColors, setSelectedColors] = useSessionStorage<string[]>(
    "eventar-selected-colors",
    []
  );
  const [selectedResource, setSelectedResource] = useSessionStorage<string>(
    "eventar-selected-resource",
    "all"
  );

  const currentYear = new Date().getFullYear().toString();

  if (yearRange?.length && !yearRange.includes(currentYear)) {
    throw new Error(`YearRange must include the current year (${currentYear})`);
  }

  const validYearRange = yearRange?.length
    ? [...yearRange].sort((a, b) => Number(a) - Number(b))
    : [currentYear];

  const [view, setView] = useSessionStorage<CalendarView>(
    "eventar-current-view",
    defaultView
  );
  const [currentDate, setCurrentDate] = useState(new Date());
  const [agendaView, setAgendaView] = useSessionStorage<boolean>(
    "eventar-agenda-view",
    false
  );

  const availableColors: FilterColors[] = useMemo(() => {
    const resourceEvents =
      selectedResource === "all"
        ? events
        : events.filter((event) => event.resourceId === selectedResource);

    const validColors = resourceEvents
      .map((event) => event.color)
      .filter(
        (color) =>
          typeof color === "string" &&
          color.trim() !== "" &&
          color in DEFAULT_FILTER_COLORS
      )
      .map(
        (color) =>
          DEFAULT_FILTER_COLORS[color as keyof typeof DEFAULT_FILTER_COLORS]
      );

    return Array.from(new Set(validColors));
  }, [events, selectedResource]);

  const filteredEvents = filterEvents(events, {
    view,
    currentDate,
    selectedColors,
    selectedResource,
  });

  const handleColorToggle = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  return (
    <Fragment>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Box id="eventar-wrapper" sx={{ maxHeight: "100vh" }}>
          <Box
            id="calendar-layout"
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CalendarHeader
              view={view}
              setView={setView}
              currentDate={currentDate}
              setCurrentDate={setCurrentDate}
              selectedColors={selectedColors}
              onColorToggle={handleColorToggle}
              navigation={navigation}
              showViewOptions={views}
              yearRange={validYearRange}
              availableColors={availableColors}
              showAgenda={showAgenda}
              agendaView={agendaView}
              handleAgendaView={() => setAgendaView(!agendaView)}
              showClock={showClock}
              resources={resources}
              selectedResource={selectedResource}
              onResourceChange={setSelectedResource}
              setIsNewEventOpen={setIsNewEventOpen}
            />

            <Box>
              <ErrorBoundary>
                <RenderView
                  view={view}
                  currentDate={currentDate}
                  filteredEvents={filteredEvents}
                  // setEvents={setEvents}
                  showPastDates={showPastDates}
                  customEventViewer={customEventViewer}
                  isLoading={isLoading}
                  error={error}
                  spinnerComponent={spinnerComponent}
                  setSelectedDate={setSelectedDate}
                  setIsDayModalOpen={setIsDayModalOpen}
                  setSelectedEvent={setSelectedEvent}
                  setIsEventModalOpen={setIsEventModalOpen}
                  agendaView={agendaView}
                  specialDays={specialDays}
                  startOfWeek={startOfWeek}
                />
              </ErrorBoundary>
            </Box>
          </Box>
        </Box>

        {selectedDate && (
          <DayEventsModal
            date={selectedDate}
            events={getEventsForDate(selectedDate, events)}
            isOpen={isDayModalOpen}
            onClose={() => {
              setIsDayModalOpen(false);
              setSelectedDate(null);
            }}
          />
        )}

        {selectedEvent && (
          <EventViewModal
            event={selectedEvent}
            isOpen={isEventModalOpen}
            onClose={() => {
              setIsEventModalOpen(false);
              setSelectedEvent(null);
            }}
            customComponent={customEventViewer}
            defaultModalConfig={defaultModalConfig}
          />
        )}

        {isNewEventOpen && (
          <EventViewModal
            event={null}
            isOpen={isNewEventOpen}

        }
      </ThemeProvider>
    </Fragment>
  );
}
