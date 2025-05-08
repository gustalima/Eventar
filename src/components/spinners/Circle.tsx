import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";

const Circle = () => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: 600,
    }}
  >
    <CircularProgress size={64} />
  </Box>
);

export default Circle;
