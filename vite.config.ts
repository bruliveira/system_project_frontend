import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Toda vez que o React chamar '/api', o Vite joga para o Render
      '/api': {
        target: 'https://system-project-aihq.onrender.com',
        changeOrigin: true,
        secure: true,
      }
    }
  }
})
