import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Só vale no npm run dev. O deploy usa o vercel.json, que aponta para o Render.
      '/api': {
        target: 'http://localhost:5282',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
