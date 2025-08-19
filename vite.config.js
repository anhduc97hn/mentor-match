import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginFaviconsInject from 'vite-plugin-favicons-inject'
export default defineConfig({
  plugins: [
    react(),
    vitePluginFaviconsInject('./public/logo.png', {
      appName: 'Mentor Match',
      appDescription: 'Copyright by Duc Nguyen',
      background: '#ffffff',
      theme_color: '#ffffff'
    })
  ],
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.[jt]sx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
  server: {
    port: 3000,
  },
  build: {
    sourcemap: false,
    //    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});