import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base: 'https://dormolin.github.io/randomConvex/',
  resolve: {
    alias: {
      '@': path.resolve('/src'),
    },
  },
  build: {
    minify: true,
    outDir: './docs'
  }
})
