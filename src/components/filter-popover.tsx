import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Checkbox,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popover,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useState } from "react";
import { getBackgroundColor } from "@/utils/color-utils";
import { FilterPopoverProps } from "@/types/calendar";

export function FilterPopover({
  selectedColors,
  onColorToggle,
  colors,
}: FilterPopoverProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Badge
        badgeContent={selectedColors.length}
        color="error"
        sx={{ "& .MuiBadge-badge": { right: 4, top: 4 } }}
      >
        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          onClick={handleClick}
          disabled={colors.length === 0}
          sx={{ position: "relative", height: 40 }}
        >
          Filter
        </Button>
      </Badge>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        slotProps={{ paper: { sx: { minWidth: 200 } } }}
      >
        <Typography
          sx={{
            p: 1,
            textAlign: "center",
            fontWeight: 600,
          }}
        >
          Filter by color
        </Typography>
        <Divider />
        <List dense sx={{ p: 0 }}>
          {colors.map((color) => (
            <ListItem
              key={color.value}
              onClick={() => onColorToggle(color.value)}
              sx={{
                ...getBackgroundColor(color.value, 0.7),
                "&:hover": {
                  ...getBackgroundColor(color.value),
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 25 }}>
                <Checkbox
                  edge="start"
                  checked={selectedColors.includes(color.value)}
                  tabIndex={-1}
                  disableRipple
                  sx={{ p: 0.5 }}
                  slotProps={{
                    input: {
                      "aria-labelledby": `checkbox-list-label-${color.value}`,
                    },
                  }}
                />
              </ListItemIcon>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  flex: 1,
                }}
              >
                <ListItemText
                  id={`checkbox-list-label-${color.value}`}
                  primary={color.label}
                  sx={{ m: 0 }}
                />
              </Box>
            </ListItem>
          ))}
        </List>
      </Popover>
    </>
  );
}
