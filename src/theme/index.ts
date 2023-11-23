import type { Theme } from '@mui/material/styles/createTheme';
import { createTheme as createMuiTheme, responsiveFontSizes } from '@mui/material/styles';

import { createOptions as createBaseOptions } from './base/create-options';

declare module '@mui/material/styles/createPalette' {
  interface ColorRange {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  }

  interface Palette {
    neutral: ColorRange;
  }

  interface PaletteColor {
    lightest?: string;
    darkest?: string;
    alpha4?: string;
    alpha8?: string;
    alpha12?: string;
    alpha30?: string;
    alpha50?: string;
  }

  interface PaletteOptions {
    neutral?: ColorRange;
  }

  interface TypeBackground {
    paper: string;
    default: string;
  }
}

export type ColorPreset = 'green';

export type Direction = 'ltr' | 'rtl';

interface ThemeConfig {
  colorPreset?: ColorPreset;
  direction?: Direction;
  responsiveFontSizes?: boolean;
}

export const createTheme = (config: ThemeConfig): Theme => {
  let theme = createMuiTheme(
    // Base options available for both dark and light palette modes
    createBaseOptions({
      direction: config.direction,
    }),
  );

  if (config.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return theme;
};
