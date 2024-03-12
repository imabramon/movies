import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  ssr: 'false',
  build: {
    rollupOptions: {
      input: {
        app: './public/index.html', // default
      },
    },
  },
  server: {
    open: './public/index.html',
  },
});
