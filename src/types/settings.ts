import type { ColorPreset, Direction } from "@src/theme";

export type Layout = "vertical";

export type NavColor = "blend-in" | "discrete" | "evident";

export interface Settings {
  colorPreset?: ColorPreset;
  direction?: Direction;
  layout?: Layout;
  navColor?: NavColor;
  responsiveFontSizes?: boolean;
  stretch?: boolean;
}
