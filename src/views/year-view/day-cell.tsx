import Box from "@mui/material/Box";
import { blue, deepOrange, grey } from "@mui/material/colors";
import { isSameDay } from "date-fns";
import { memo, useState } from "react";
import { SpecialDayModal } from "@/components/modals/special-day-modal";
import { getDateClassName } from "@/utils/date-utils";
import { YearViewDayCellProps } from "@/types/year";
import { EventsPopover } from "./events-popover";

export const DayCell = memo(function DayCell({
  date,
  month,
  events,
  showPastDates,
  handleEventClick,
  isSpecialDay,
  specialDayContent,
}: YearViewDayCellProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dateEvents = events.filter((event) =>
    isSameDay(new Date(event.start), date)
  );
  const isSameMonth =
    date.toLocaleString("default", { month: "long" }) === month;
  const hasEvents = dateEvents.length > 0;

  const handleSpecialDayClick = () => {
    if (isSpecialDay) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <Box
        role="gridcell"
        aria-label={date.toLocaleDateString()}
        onClick={handleSpecialDayClick}
        sx={[
          {
            textAlign: "center",
            p: 0.5,
            borderRadius: 1,
            position: "relative",
            ...(!isSameMonth ? { backgroundColor: grey[200] } : {}),
            ...(hasEvents
              ? {
                  color: "white",
                  border: 1,
                  backgroundColor: isSpecialDay ? deepOrange[400] : grey[600],
                  borderColor: isSpecialDay ? deepOrange[400] : grey[600],
                  "&:hover": {
                    borderColor: isSpecialDay ? deepOrange[500] : blue[500],
                  },
                }
              : {
                  border: "1px dashed",
                  borderColor: "divider",
                  "&:hover": {
                    borderColor: isSpecialDay ? deepOrange[500] : blue[500],
                  },
                }),
          },
          getDateClassName(date, showPastDates, "year"),
        ]}
      >
        {hasEvents ? (
          <EventsPopover
            events={dateEvents}
            date={date}
            handleEventClick={handleEventClick}
            specialDayContent={
              dateEvents.length > 0 ? specialDayContent : undefined
            }
          />
        ) : (
          date.getDate()
        )}
      </Box>

      {isSpecialDay &&
        specialDayContent &&
        dateEvents.length < 1 &&
        isModalOpen && (
          <SpecialDayModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            date={date}
            content={specialDayContent}
          />
        )}
    </>
  );
});
