import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { blue, deepOrange, grey } from "@mui/material/colors";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { format, isBefore, startOfDay } from "date-fns";
import { useState } from "react";
import { SpecialDayModal } from "@/components/modals/special-day-modal";
import {
  getBackgroundColor,
  getEventBackgroundColorStyle,
} from "@/utils/color-utils";
import { DayCellProps } from "@/types/day";

export function DayCell({
  date,
  mappedDate,
  index,
  events,
  showPastDates,
  handleEventClick,
  handleDayClick,
  isSpecialDay,
  specialDayContent,
}: DayCellProps) {
  const visibleEvents = events.slice(0, 1);
  const remainingEvents = events.length - visibleEvents.length;
  const isSameMonth =
    date.getMonth() === mappedDate.getMonth() &&
    date.getFullYear() === mappedDate.getFullYear();
  const isToday = new Date().toDateString() === mappedDate.toDateString();
  const isPastDate = isBefore(mappedDate, startOfDay(new Date()));

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSpecialDayClick = () => {
    if (isSpecialDay) {
      setIsModalOpen(true);
    }
  };

  return (
    <Box
      sx={{
        height: "16.666vh",
        maxWidth: 275,
        p: 1,
        m: 0,
        position: "relative",
      }}
      className={`day-cell ${
        index === 0 ? "first-day" : index === 6 ? "last-day" : ""
      }`}
    >
      <Paper
        elevation={0}
        sx={{
          border: 1,
          borderWidth: isToday ? 2 : 1,
          borderColor: isToday ? blue["A400"] : "divider",
          borderRadius: 2,
          ...(isPastDate && !showPastDates
            ? { backgroundColor: isSameMonth ? grey[100] : grey[200] }
            : { backgroundColor: isSameMonth ? "white" : grey[100] }),

          transition: "all 0.2s",
          "&:hover": {
            backgroundColor: "action.hover",
          },
          height: "100%",
          position: "relative",
          p: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            mb: 1,
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              ...(isToday && {
                border: 1,
                px: 1,
                borderRadius: 1,
                backgroundColor: blue[700],
                color: "white",
              }),
              ...(isPastDate && !showPastDates && { color: "text.disabled" }),

              width: "max-content",
            }}
          >
            {mappedDate.getDate()}
          </Typography>

          {isSpecialDay && (
            <Box
              onClick={handleSpecialDayClick}
              sx={{
                position: "relative",
                px: 1,
                border: 2,
                borderColor: deepOrange[500],
                borderRadius: 1,
                backgroundColor: deepOrange[200],
                boxShadow: 2,
                cursor: "pointer",
                "&:hover": {
                  opacity: 0.8,
                },
                fontWeight: "medium",
                color: "purple.700",
                overflow: "hidden",
              }}
            >
              {specialDayContent?.title}
            </Box>
          )}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {visibleEvents.map((event) => (
            <Box
              key={event.id}
              onClick={(e) => handleEventClick && handleEventClick(e, event)}
              sx={{
                borderRadius: 1,
                px: 1,
                cursor: "pointer",
                opacity: 1,
                backgroundColor: getEventBackgroundColorStyle(event.color),
                "&:hover": { opacity: 0.8, ...getBackgroundColor(event.color) },
                mb: 0,
                zoom: 0.9,
              }}
            >
              <Typography noWrap>{event.title}</Typography>
              <Typography variant="caption" color="text.secondary">
                {event.isFullDay
                  ? "All day"
                  : `${format(event.start, "HH:mm")} - ${format(
                      event.end,
                      "HH:mm"
                    )}`}
              </Typography>
            </Box>
          ))}
          {remainingEvents > 0 && (
            <Button
              onClick={() => handleDayClick && handleDayClick(mappedDate)}
              size="small"
              sx={{
                fontSize: "0.8rem",
                color: "text.primary",
                textTransform: "none",
                minWidth: 0,
                p: 0,
                "&:hover": {
                  color: "text.secondary",
                  background: "none",
                },
                alignSelf: "flex-start",
              }}
            >
              +{remainingEvents} more
            </Button>
          )}
        </Box>

        {isSpecialDay && specialDayContent && (
          <SpecialDayModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            date={mappedDate}
            content={specialDayContent}
          />
        )}
      </Paper>
    </Box>
  );
}
