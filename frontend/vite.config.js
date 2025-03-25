import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  host: true,  // Allows access from outside the container
  plugins: [react()],
  watch: {
    usePolling: true,  // Fixes issues with file changes in Docker
  },
  server: {port:5173}
})
