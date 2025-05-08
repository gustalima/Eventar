import Box from "@mui/material/Box";
import { deepOrange } from "@mui/material/colors";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { format, getWeek } from "date-fns";
import { useState } from "react";
import { SpecialDayModal } from "@/components/modals/special-day-modal";
import { WeekHeaderProps } from "@/types/week";

export function WeekHeader({
  weekDays,
  currentDate,
  isPastDate,
  isSpecialDay,
  specialDayContent,
}: WeekHeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSpecialDayClick = () => {
    if (isSpecialDay) {
      setIsModalOpen(true);
    }
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(8, 1fr)",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography>Week {getWeek(currentDate)}</Typography>
      </Box>
      {weekDays.map((day, index) => (
        <Paper
          key={index}
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            px: 2,
            py: 1,
            bgcolor: isPastDate(day)
              ? (theme) =>
                  theme.palette.mode === "dark"
                    ? "background.default"
                    : "grey.100"
              : "inherit",
            opacity: isPastDate(day) ? 0.5 : 1,
            transition: "background 0.2s",
            "&:hover": {
              bgcolor: (theme) =>
                theme.palette.mode === "dark" ? "grey.800" : "grey.100",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Typography variant="body2" fontWeight={500}>
              {format(day, "EEE")}
            </Typography>
            <Box
              sx={{
                color: "text.secondary",
                ...(day.getDate() === currentDate.getDate()
                  ? {
                      borderRadius: "50%",
                      bgcolor: (theme) =>
                        theme.palette.mode === "dark" ? "grey.50" : "grey.900",
                      color: (theme) =>
                        theme.palette.mode === "dark" ? "grey.900" : "grey.50",
                      width: 28,
                      height: 28,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                    }
                  : {}),
              }}
            >
              {day.getDate()}
            </Box>
          </Box>

          {/* if special day  */}
          {isSpecialDay &&
            day.getDate() === currentDate.getDate() &&
            specialDayContent && (
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 1,
                  border: "2px solid",
                  borderColor: deepOrange[500],
                  boxShadow: 3,
                  cursor: "pointer",
                  background: () =>
                    `linear-gradient(135deg, ${deepOrange[500] || "#a78bfa"}20 0%, ${deepOrange[200] || "#f472b6"}20 100%)`,
                  "&:hover": {
                    "&:before": {
                      opacity: 0.5,
                    },
                  },
                  "&:before": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",

                    opacity: 0.1,
                    zIndex: 1,
                  },
                  zIndex: 2,
                  px: 1,
                }}
                onClick={handleSpecialDayClick}
              >
                <Typography
                  variant="body2"
                  sx={{ position: "relative", zIndex: 2 }}
                >
                  {specialDayContent?.title}
                </Typography>
              </Box>
            )}
        </Paper>
      ))}

      {isSpecialDay && specialDayContent && (
        <SpecialDayModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          date={currentDate}
          content={specialDayContent}
        />
      )}
    </Box>
  );
}
