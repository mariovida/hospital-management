import type { ColorRange } from "@mui/material/styles/createPalette";

export const neutral: ColorRange = {
  50: "#F8F9FA",
  100: "#F3F4F6",
  200: "#E5E7EB",
  300: "#D2D6DB",
  400: "#9DA4AE",
  500: "#6C737F",
  600: "#4D5761",
  700: "#2F3746",
  800: "#1C2536",
  900: "#111927",
};

export const red = {
  lightest: "#F9D2D5",
  light: "#ED787F",
  main: "#E8505B",
  dark: "#CB1A26",
  text: "#F5F5F5",
};

export const green = {
  lightest: "#EBF3E8",
  light: "#D2E3C8",
  main: "#86A789",
  dark: "#4B684D",
  contrastText: "#000000",
};

export const text = {
  primary: "#405942",
  secondary: "#6C737F",
  disabled: "rgba(17, 25, 39, 0.38)",
};

export const menu_bar = {
  background: "#EBF3E8",
  active: "#B2C8BA",
};

/* OLD */

export const blue = {
  light: "#91C8E4",
  main: "#749BC2",
  dark: "#5F8CB9",
  darkest: "#4682A9",
};
export const primary = {
  lightest: "#DFFEF066",
  light: "#C1FDE6",
  main: "#46CAC9",
  dark: "#2A8B94",
  darkest: "#125871",
  background: "#F8F9FA",
  button_hovered_background: "rgba(83, 207, 246, 0.2)",
};

export const orange = {
  light: "#FDEFDD",
  main: "#FA9D3F",
  dark: "#D88027",
};

export const success = {
  lightest: "rgba(226, 253, 191, 0.4)",
  main: "#8CC83E",
  dark: "#65A513",
  darkest: "#3D6A04",
  border_button: "#CCE5AB",
  hovered_success_button: "rgba(142, 243, 164, 0.09)",
};

export const info = {
  lightest: "#ECFDFF",
  light: "#CFF9FE",
  main: "#06AED4",
  dark: "#0E7090",
  darkest: "#164C63",
  contrastText: "#FFFFFF",
};

export const warning = {
  lightest: "rgba(255, 230, 90, 0.2)",
  light: "#FDEAD7",
  main: "#ffeb78",
  dark: "#f8dc40",
  darkest: "#772917",
  border_button: "#D4BB2D",
};

export const error = {
  lightest: "#FEF3F2",
  light: "#FEE4E2",
  main: "#F9665C",
  dark: "#B42318",
  darkest: "#7A271A",
  hovered_error_background: "#FEE4E2",
};

export const disabled = {
  text: "rgba(17, 25, 39, 0.38)",
  background: "#EAEBEC",
};

export const action = {
  hover: "#111927",
  selected: "#111927",
  turning_the_switch: "rgba(55, 130, 243, 0.04)",
  active_tab_in_menu: "rgba(17, 25, 39, 0.08)",
  table: "rgba(191, 231, 429, 0.08)",
};

const customColors = {
  red,
  neutral,
  blue,
  primary,
  green,
  orange,
  success,
  info,
  warning,
  error,
  text,
  disabled,
  menu_bar,
  action,
};
export default customColors;
