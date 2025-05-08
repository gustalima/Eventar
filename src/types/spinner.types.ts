import Circle from "../components/spinners/Circle";

export enum SpinnerVariant {
  CIRCLE = "circle",
}

export const SPINNER_COMPONENTS = {
  [SpinnerVariant.CIRCLE]: Circle,
} as const;
