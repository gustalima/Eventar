import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import TableViewIcon from "@mui/icons-material/TableView";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import type { CalendarView, ViewOptionsProps } from "@/types/calendar";

export function ViewOptions({
  view,
  setView,
  showViewOptions,
}: ViewOptionsProps) {
  const allViewOptions = [
    { value: "month", label: "Month", icon: CalendarMonthIcon },
    { value: "week", label: "Week", icon: ViewWeekIcon },
    { value: "day", label: "Day", icon: FormatListBulletedIcon },
    { value: "year", label: "Year", icon: TableViewIcon },
  ];

  const viewOptions = allViewOptions.filter((option) =>
    showViewOptions.includes(option.value as CalendarView)
  );

  return (
    <ToggleButtonGroup
      value={view}
      exclusive
      onChange={(_, newView) => {
        if (newView !== null) setView(newView as CalendarView);
      }}
      sx={{
        backgroundColor: "background.paper",
        height: 40,
      }}
    >
      {viewOptions
        .sort(
          (a, b) =>
            showViewOptions.indexOf(a.value as CalendarView) -
            showViewOptions.indexOf(b.value as CalendarView)
        )
        .map((option) => {
          const Icon = option.icon;
          return (
            <ToggleButton
              key={option.value}
              value={option.value}
              sx={{
                px: 2,
                display: "flex",
                alignItems: "center",
                height: 40,
              }}
            >
              <Icon />
              <Typography
                sx={{
                  ml: 1.5,
                  display: { xs: "none", md: "inline" },
                }}
              >
                {option.label}
              </Typography>
            </ToggleButton>
          );
        })}
    </ToggleButtonGroup>
  );
}
