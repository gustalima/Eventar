import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { NavigationProps } from "@/types/calendar";

export function Navigation({
  currentDate,
  setCurrentDate,
  view,
  availableYears,
}: NavigationProps) {
  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    const increment = direction === "next" ? 1 : -1;

    switch (view) {
      case "year":
        newDate.setFullYear(currentDate.getFullYear() + increment);
        break;
      case "month":
        newDate.setDate(1);
        newDate.setMonth(currentDate.getMonth() + increment);
        break;
      case "week":
        newDate.setDate(currentDate.getDate() + 7 * increment);
        break;
      case "day":
        newDate.setDate(currentDate.getDate() + increment);
        break;
    }
    setCurrentDate(newDate);
  };

  const isNavigationDisabled = (direction: "prev" | "next") => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();
    const minYear = Math.min(...availableYears);
    const maxYear = Math.max(...availableYears);

    if (direction === "prev") {
      switch (view) {
        case "year":
          return currentYear <= minYear;
        case "month":
          return currentYear === minYear && currentMonth === 0;
        case "week":
        case "day":
          return (
            currentYear === minYear && currentMonth === 0 && currentDay === 1
          );
        default:
          return false;
      }
    } else {
      switch (view) {
        case "year":
          return currentYear >= maxYear;
        case "month":
          return currentYear === maxYear && currentMonth === 11;
        case "week":
          return (
            currentYear === maxYear && currentMonth === 11 && currentDay > 24
          );
        case "day":
          return (
            currentYear === maxYear && currentMonth === 11 && currentDay === 31
          );
        default:
          return false;
      }
    }
  };

  return (
    <Box
      id="navigation"
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 1,
        alignItems: "center",
      }}
    >
      <Button
        variant="text"
        onClick={() => navigateDate("prev")}
        disabled={isNavigationDisabled("prev")}
        sx={{
          color: grey[700],
          minWidth: 12,
          px: 0,
          border: 1,
          borderColor: grey[400],
          height: 40,
        }}
      >
        <ChevronLeftIcon />
      </Button>
      <Box sx={{ width: 200 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            views={["year", "month"]}
            openTo="month"
            enableAccessibleFieldDOMStructure={false}
            format="MMMM - yyyy"
            value={currentDate}
            onChange={(newValue) => {
              if (newValue) setCurrentDate(newValue);
            }}
            slots={{ textField: TextField }}
            slotProps={{
              textField: (params) => ({
                ...params,
                size: "small",
              }),
            }}
          />
        </LocalizationProvider>
      </Box>

      <Button
        variant="text"
        size="small"
        onClick={() => navigateDate("next")}
        disabled={isNavigationDisabled("next")}
        sx={{
          color: grey[700],
          minWidth: 12,
          px: 0,
          border: 1,
          borderColor: grey[400],
          height: 40,
        }}
      >
        <ChevronRightIcon />
      </Button>
    </Box>
  );
}
