import { Typography } from "@mui/material";
import { Weeks } from "@/constants/calendar";

export function WeekDaysHeader({ startOfWeek }: { startOfWeek: Weeks }) {
  const getWeekDays = () => {
    const allDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const startIdx = allDays.indexOf(startOfWeek);
    return [...allDays.slice(startIdx), ...allDays.slice(0, startIdx)];
  };

  return (
    <>
      {getWeekDays().map((day) => (
        <Typography
          key={day}
          sx={{
            p: 2,
            textAlign: "center",
            fontWeight: 600,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          {day}
        </Typography>
      ))}
    </>
  );
}
