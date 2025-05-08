import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { getBackgroundColor } from "@/utils/color-utils";
import { isPastDate } from "@/utils/date-utils";
import { FullDayEventsDayViewProps } from "@/types/day";

const FullDayEvents = ({
  fullDayEvents,
  visibleFullDayEvents,
  handleEventClick,
  showAllFullDayEvents,
  setShowAllFullDayEvents,
}: FullDayEventsDayViewProps) => (
  <Box
    sx={{
      borderRadius: 2,
      border: 1,
      borderColor: "divider",
      bgcolor: "background.paper",
    }}
  >
    <Box
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        px: 2,
        py: 1,
      }}
    >
      <Typography variant="h6" fontWeight={500}>
        Full-Day Events ({fullDayEvents.length})
      </Typography>
    </Box>
    <Box
      sx={{
        maxHeight: 300,
        overflowY: "auto",
        position: "relative",
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
      }}
    >
      {visibleFullDayEvents.map((event) => {
        const eventStartDate = new Date(event.start);
        const pastDate = isPastDate(eventStartDate);
        return (
          <Box
            key={event.id}
            sx={{
              py: 1,
              px: 2,
              cursor: pastDate ? "not-allowed" : "pointer",
              opacity: pastDate ? 0.5 : 1,
              textDecoration: pastDate ? "line-through" : "none",
              filter: pastDate ? "grayscale(1)" : "none",
              transition: "opacity 0.2s",
              "&:hover": {
                opacity: 0.8,
              },
              ...getBackgroundColor(event.color),
            }}
            onClick={(e) => {
              if (!pastDate) {
                handleEventClick?.(e, event);
              }
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Box>
                <Typography variant="subtitle1" fontWeight={500}>
                  {event.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {event.description}
                </Typography>
              </Box>
              <Typography variant="body2">All Day</Typography>
            </Box>
            {pastDate && (
              <Typography variant="caption" color="error">
                This event has passed
              </Typography>
            )}
          </Box>
        );
      })}
      {fullDayEvents.length > 3 && (
        <Box
          sx={{
            p: 2,
            borderTop: 1,
            borderColor: "divider",
            position: "sticky",
            bottom: 0,
            bgcolor: "background.paper",
            zIndex: 1,
          }}
        >
          <Button
            onClick={() => setShowAllFullDayEvents(!showAllFullDayEvents)}
            sx={{
              textTransform: "none",
              "&:hover": {
                color: "primary.dark",
                bgcolor: "transparent",
              },
            }}
            size="small"
          >
            {showAllFullDayEvents
              ? "Show Less"
              : `Show ${fullDayEvents.length - 3} More`}
          </Button>
        </Box>
      )}
    </Box>
  </Box>
);

export default FullDayEvents;
