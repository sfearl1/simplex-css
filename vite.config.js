// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: './src/simplex-css.js',
      output: {
        format: 'iife', 
        entryFileNames: 'simplex-css.bundle.js', 
      },
    },
  },
})
