import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        proxy: {
          '/api/wakatime': {
            target: 'https://wakatime.com',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api\/wakatime/, '/api/v1'),
            configure: (proxy, _options) => {
              proxy.on('proxyReq', (proxyReq, req, _res) => {
                // Add WakaTime API key from env to all requests
                const apiKey = env.VITE_WAKATIME_API_KEY;
                if (apiKey) {
                  const auth = Buffer.from(`${apiKey}:`).toString('base64');
                  proxyReq.setHeader('Authorization', `Basic ${auth}`);
                }
              });
            },
          },
        },
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
