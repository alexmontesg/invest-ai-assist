import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
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
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              const currentPath = proxyReq.path;
              proxyReq.path = `${currentPath}${currentPath.includes('?') ? '&' : '?'}key=${env.FINDATA_API_KEY}`;
            });
          },
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
  };
});
