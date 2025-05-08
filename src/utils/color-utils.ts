import { lighten } from "@mui/material";
import {
  DEFAULT_BACKGROUND_COLORS,
  DEFAULT_FILTER_COLORS,
} from "@/constants/colors";

type EventColor = keyof typeof DEFAULT_FILTER_COLORS | string;
type BackgroundColor = keyof typeof DEFAULT_BACKGROUND_COLORS | string;

export const getEventColorStyle = (color?: EventColor): React.CSSProperties => {
  if (color && color in DEFAULT_FILTER_COLORS) {
    const colorObj =
      DEFAULT_FILTER_COLORS[color as keyof typeof DEFAULT_FILTER_COLORS];
    return { backgroundColor: colorObj.value };
  }
  return { backgroundColor: "#18181b", color: "#fafafa" };
};

export const getEventBackgroundColorStyle = (
  color?: BackgroundColor
): React.CSSProperties => {
  if (color && color in DEFAULT_BACKGROUND_COLORS) {
    const colorObj =
      DEFAULT_BACKGROUND_COLORS[
        color as keyof typeof DEFAULT_BACKGROUND_COLORS
      ];

    return { backgroundColor: colorObj.bgClass || "rgba(24,24,27,0.1)" };
  }
  return {
    backgroundColor: "rgba(24,24,27,0.1)",
    color: "rgba(250,250,250,0.1)",
  };
};
export const getBackgroundColor = (
  color?: BackgroundColor,
  lightenValue: number = 0.5
): React.CSSProperties => {
  if (color && color in DEFAULT_BACKGROUND_COLORS) {
    const cssColorToHex: Record<string, string> = {
      black: "#000000",
      white: "#ffffff",
      red: "#ff0000",
      green: "#008000",
      blue: "#0000ff",
      yellow: "#ffff00",
    };
    if (color && cssColorToHex[color]) {
      return { backgroundColor: lighten(cssColorToHex[color], lightenValue) };
    }
    return { backgroundColor: "white" };
  }
  return { backgroundColor: "white" };
};

export const getEventBorderColorStyle = (
  color?: BackgroundColor
): React.CSSProperties => {
  if (color && color in DEFAULT_BACKGROUND_COLORS) {
    const colorObj =
      DEFAULT_BACKGROUND_COLORS[
        color as keyof typeof DEFAULT_BACKGROUND_COLORS
      ];

    return { borderColor: colorObj.borderClass || "rgba(24,24,27,0.1)" };
  }
  return { borderColor: "rgba(24,24,27,0.1)" };
};
