import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // host: '10.57.186.107', // Specify the IP address
    port: 3000, // Specify the port you want to use
  },
})