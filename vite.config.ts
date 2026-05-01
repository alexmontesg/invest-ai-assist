import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, 'src') },
      { find: '@views', replacement: resolve(__dirname, 'src/views') },
    ],
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
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
    },
  },
});
