import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env,  // Прокси переменные окружения
  },
  plugins: [react()],
  base:'/',
  server: {
    host: "0.0.0.0",
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/"),
      },
      '/tauri-api': {
        target: 'http://127.0.0.1:3002',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/tauri-api/, ''),
      },
    },
  },
  build: {
    outDir: 'dist',  // Папка для сборки
    emptyOutDir: true, // Очищать папку перед сборкой
  },
});