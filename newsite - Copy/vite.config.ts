import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Design exploration, not the deployed site. Builds stay inside this folder:
// the live config writes to <repo>/docs with emptyOutDir, so pointing here
// anywhere else would wipe the real build output.
const BASE = '/AWDEA/'
const OUT_DIR = resolve(import.meta.dirname, 'dist')

const spaFallback = () => ({
  name: 'spa-404-fallback',
  closeBundle() {
    copyFileSync(resolve(OUT_DIR, 'index.html'), resolve(OUT_DIR, '404.html'))
  },
})

export default defineConfig({
  base: BASE,
  plugins: [react(), tailwindcss(), spaFallback()],
  server: { port: 5175 },
  build: {
    outDir: OUT_DIR,
    emptyOutDir: true,
  },
})
