import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['legacy-js-api', 'if-function'],
      },
      sass: {
        silenceDeprecations: ['legacy-js-api', 'if-function'],
      },
    },
  },
  server: {
    port: 3000,
  }
})
