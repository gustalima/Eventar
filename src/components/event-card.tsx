import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Box, Stack, Typography } from "@mui/material";
import { getBackgroundColor } from "@/utils/color-utils";
import { formatTime } from "@/utils/date-utils";
import { EventCardProps } from "@/types/event";

export function EventCard({ event, variant = "full" }: EventCardProps) {
  return (
    <Box
      sx={{
        borderRadius: 2,
        p: 2,
        ...getBackgroundColor(event.color, 0.7),
      }}
    >
      <Stack direction="row" alignItems="flex-start" spacing={2}>
        {!event.isFullDay && variant === "full" && (
          <AccessTimeIcon
            sx={{
              mt: "4px",
              height: 16,
              width: 16,
              flexShrink: 0,
              opacity: 0.5,
            }}
          />
        )}
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography variant="subtitle1" noWrap fontWeight={500}>
            {event.title}
          </Typography>
          {!event.isFullDay && (
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              {formatTime(event.start)} - {formatTime(event.end)}
            </Typography>
          )}
        </Box>
      </Stack>
    </Box>
  );
}
