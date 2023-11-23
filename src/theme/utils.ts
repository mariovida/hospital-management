import type { PaletteColor } from '@mui/material/styles/createPalette';

import type { ColorPreset } from '.';
import { green } from './colors';

export const getPrimary = (preset?: ColorPreset): PaletteColor => {
  switch (preset) {
    case 'green':
      return green;
    default:
      console.error('Invalid color preset, accepted values: "green".');
      return green;
  }
};
