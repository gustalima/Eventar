import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import { deepOrange } from "@mui/material/colors";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import { SpecialDay } from "@/types/calendar";

interface SpecialDayModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date;
  content: SpecialDay;
}

export const SpecialDayModal = ({
  isOpen,
  onClose,
  date,
  content,
}: SpecialDayModalProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: { borderRadius: 1, backgroundColor: "background.paper" },
        },
      }}
    >
      <DialogTitle sx={{ p: 2 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: deepOrange[500],
            }}
          />
          <Typography variant="body2" color="text.secondary">
            {format(date, "MMMM d, yyyy")}
          </Typography>
          <Box flex={1} />
          <IconButton onClick={onClose} size="small">
            <CloseIcon sx={{ width: 20, height: 20 }} />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ pt: 1, pb: 0 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              background: deepOrange[500],
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {content.title}
          </Typography>
          <Chip
            label={content.type}
            sx={{
              backgroundColor: "purple.100",

              background: (theme) =>
                theme.palette.mode === "dark"
                  ? deepOrange[300]
                  : deepOrange[500],
              color: (theme) =>
                theme.palette.mode === "dark" ? "black" : "white",
            }}
            size="small"
          />
        </Stack>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {content.description}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, pt: 0 }}>
        <Button
          onClick={onClose}
          fullWidth
          variant="contained"
          sx={{
            background: deepOrange[500],
            py: 1.5,
            borderRadius: 1,
            "&:hover": {
              opacity: 0.9,
            },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
