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
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              // Check by library name — order matters: more specific matches
              // must come before broader ones.
              if (id.includes('@chakra-ui')) return 'vendor-chakra';
              if (id.includes('@emotion')) return 'vendor-emotion';
              if (id.includes('@tanstack/react-query'))
                return 'vendor-react-query';
              if (id.includes('@tanstack/react-form'))
                return 'vendor-react-form';
              if (id.includes('i18next')) return 'vendor-i18n';
              if (id.includes('react-router')) return 'vendor-router';
              if (id.includes('@reduxjs') || id.includes('react-redux'))
                return 'vendor-redux';
              if (id.includes('react-icons')) return 'vendor-icons';
              if (id.includes('zod')) return 'vendor-zod';
              // Use boundary markers to avoid catching sub-packages
              // (e.g. react-router, react-icons, @emotion/react, etc.).
              if (
                id.match(/[\\/]node_modules[\\/]react[\\/]/) ||
                id.match(/[\\/]node_modules[\\/]react-dom[\\/]/) ||
                id.match(/[\\/]node_modules[\\/]scheduler[\\/]/)
              )
                return 'vendor-react';
              return 'vendor-other';
            }
          },
        },
      },
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
