import React from 'react';
import type { FC } from 'react';
import { Toaster as HotToaster } from 'react-hot-toast';
import { alpha } from '@mui/system/colorManipulator';
import { useTheme } from '@mui/material/styles';

export const Toaster: FC = () => {
  const theme = useTheme();

  return (
    <HotToaster
      position="bottom-right"
      toastOptions={{
        style: {
          backdropFilter: 'blur(6px)',
          color: theme.palette.common.white,
          boxShadow: theme.shadows[16],
        },
      }}
    />
  );
};
