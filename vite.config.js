import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@pages': resolve(__dirname, 'src/pages'),
      '@components': resolve(__dirname, 'src/components'),
      '@service': resolve(__dirname, 'src/service'),
      '@slices': resolve(__dirname, 'src/store/slices'),
      '@images': resolve(__dirname, 'src/assets/images'),
    },
  },
})
