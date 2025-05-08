import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export function WeekViewSkeleton() {
  return (
    <Box>
      <Skeleton
        variant="rectangular"
        width={96}
        height={32}
        sx={{ mb: 2, borderRadius: 1 }}
      />
      <Box display="grid" gridTemplateColumns="repeat(8, 1fr)" gap={1}>
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            height={48}
            sx={{ borderRadius: 1 }}
          />
        ))}
      </Box>
      <Box mt={2} display="grid" gridTemplateColumns="repeat(8, 1fr)" gap={1}>
        {Array.from({ length: 24 * 8 }).map((_, i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            height={48}
            sx={{ borderRadius: 1, bgcolor: "grey.100" }}
          />
        ))}
      </Box>
    </Box>
  );
}
