import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        '~': path.resolve(process.cwd(), 'node_modules'),
        '@src': path.resolve(process.cwd(), 'src'),
      },
    },
    server: {
      port: 3002,
    },
    preview: {
      port: 3002,
    },
  });