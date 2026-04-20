import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, 'src') }],
  },
  server: {
    proxy: {
      '/findata': {
        target: 'https://financialdata.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/findata/, ''),
      },
    },
  },
});
