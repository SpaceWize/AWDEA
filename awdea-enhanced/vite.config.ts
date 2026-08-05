import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Served from https://spacewize.github.io/AWDEA/, so every asset URL needs
// the /AWDEA/ prefix.
const BASE = '/AWDEA/'
const OUT_DIR = resolve(import.meta.dirname, '../docs')

/**
 * GitHub Pages has no SPA rewrite rule: a hard load of /AWDEA/bios returns
 * 404.html. Shipping a copy of index.html as 404.html lets the client-side
 * router take over instead of showing GitHub's error page.
 */
const spaFallback = () => ({
  name: 'spa-404-fallback',
  closeBundle() {
    copyFileSync(resolve(OUT_DIR, 'index.html'), resolve(OUT_DIR, '404.html'))
  },
})

export default defineConfig({
  base: BASE,
  plugins: [react(), tailwindcss(), spaFallback()],
  build: {
    outDir: OUT_DIR,
    emptyOutDir: true,
  },
})
