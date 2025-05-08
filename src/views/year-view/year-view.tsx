import { MonthGrid } from "@/views/year-view/month-grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { memo } from "react";
import { ErrorBoundary } from "@/components/error-boundary";
import { YearViewProps } from "@/types/year";
import { MONTHS } from "@/constants/calendar";

export const YearView = memo(function YearView({
  year,
  events,
  showPastDates = true,
  handleEventClick,
  isLoading,
  specialDays,
  startOfWeek,
}: YearViewProps) {
  if (isLoading) {
    return (
      <Box
        sx={{
          p: 2,
          textAlign: "center",
          color: "text.secondary",
          opacity: 0.7,
        }}
      >
        Loading calendar...
      </Box>
    );
  }

  return (
    <Box
      id="year-view"
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "1fr 1fr",
          lg: "1fr 1fr 1fr",
          xl: "1fr 1fr 1fr 1fr",
        },
        gap: 2,
      }}
    >
      {MONTHS.map((month, index) => (
        <ErrorBoundary key={month} fallback={<Box>Error loading month</Box>}>
          <Box sx={{ height: "100%" }}>
            <Paper
              elevation={0}
              sx={{
                border: 1,
                borderColor: "divider",
                borderRadius: 2,
                p: 1.5,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                zoom: 0.95,
              }}
            >
              <Typography sx={{ fontWeight: 600, mb: 1 }}>{month}</Typography>
              <MonthGrid
                month={month}
                monthIndex={index}
                year={year}
                events={events}
                showPastDates={showPastDates}
                handleEventClick={handleEventClick}
                specialDays={specialDays}
                startOfWeek={startOfWeek}
              />
            </Paper>
          </Box>
        </ErrorBoundary>
      ))}
    </Box>
  );
});
