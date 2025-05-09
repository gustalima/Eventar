import BookmarkIcon from "@mui/icons-material/Bookmark";
import {
  Avatar,
  Box,
  FormControl,
  ListSubheader,
  MenuItem,
  Select,
} from "@mui/material";
import type { Resource } from "@/types/calendar";

interface ResourceSelectorProps {
  resources: Resource[];
  selectedResource: string;
  onResourceChange: (resourceId: string) => void;
}

function getResourceAdornment(
  resource: Resource | undefined,
  selected: string
) {
  if (selected === "all" || !resource) {
    return <BookmarkIcon style={{ marginRight: 8, width: 20, height: 20 }} />;
  }

  return (
    <Avatar
      sx={{
        width: 20,
        height: 20,
        backgroundColor: resource.color || "currentColor",
        marginRight: 1,
        fontSize: "0.9rem",
      }}
    >
      {resource.name.at(0)?.toUpperCase()}
    </Avatar>
  );
}

function getResourceLabel(resource: Resource | undefined, selected: string) {
  if (selected === "all" || !resource) return "All Resources";
  return resource.name.length > 20
    ? `${resource.name.slice(0, 20)}...`
    : resource.name;
}

export function ResourceSelector({
  resources,
  selectedResource,
  onResourceChange,
}: ResourceSelectorProps) {
  const groupedResources: Partial<Record<string, Resource[]>> = Object.groupBy(
    resources,
    (r) => r.type
  );

  const renderMenuItems = () => {
    if (!resources || resources.length === 0) {
      return (
        <MenuItem value="all" disabled>
          No resources
        </MenuItem>
      );
    }

    return [
      <MenuItem value="all" key="all">
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <BookmarkIcon style={{ width: 20, height: 20 }} />
          All Resources
        </Box>
      </MenuItem>,
      ...Object.entries(groupedResources).flatMap(([type, group]) => [
        <ListSubheader key={type}>
          {`${type[0].toUpperCase()}${type.slice(1)}s`}
        </ListSubheader>,
        ...(group ?? []).map((resource) => (
          <MenuItem key={resource.id} value={resource.id}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0,
              }}
            >
              <Avatar
                sx={{
                  width: 20,
                  height: 20,
                  backgroundColor: resource.color || "currentColor",
                  marginRight: 1,
                  fontSize: "0.9rem",
                }}
              >
                {resource.name.at(0)?.toUpperCase()}
              </Avatar>
              {resource.name.length > 20
                ? `${resource.name.slice(0, 20)}...`
                : resource.name}
            </Box>
          </MenuItem>
        )),
      ]),
    ];
  };

  const selectedResourceObj = resources.find((r) => r.id === selectedResource);

  return (
    <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
      <Select
        labelId="resource-selector-label"
        value={selectedResource}
        onChange={(e) => onResourceChange(e.target.value)}
        startAdornment={getResourceAdornment(
          selectedResourceObj,
          selectedResource
        )}
        renderValue={() =>
          getResourceLabel(selectedResourceObj, selectedResource)
        }
      >
        {renderMenuItems()}
      </Select>
    </FormControl>
  );
}
