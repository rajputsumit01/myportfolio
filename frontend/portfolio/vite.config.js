import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/',   // required for Vercel
  plugins: [vue()],
  server: {
    port: 5173
  }
})
