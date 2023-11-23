import type { ThemeOptions } from "@mui/material/styles/createTheme";

import type { Direction } from "..";
import { createTypography } from "./create-typography";
import { createComponents } from "./create-components";

interface Config {
  direction?: Direction;
}

// Here we do not modify the "palette" and "shadows" because "light" and "dark" mode
// may have different values.

export const createOptions = (config: Config): ThemeOptions => {
  const { direction = "ltr" } = config;

  return {
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1600,
      },
    },
    components: createComponents(),
    direction,
    shape: {
      borderRadius: 8,
    },
    typography: createTypography(),
  };
};
