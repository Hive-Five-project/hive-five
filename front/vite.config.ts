import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vitePluginGraphqlLoader } from 'vite-plugin-graphql-loader';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginGraphqlLoader(),
  ],
  resolve: {
    alias: {
      '@app': '/src',
      '@assets': '/assets',
      '@images': '/assets/images',
      '@graphql': '/src/api/graphql',
    },
  },
  server: {
    host: '0.0.0.0',
    port: 63281,
    strictPort: true,
  },
})
