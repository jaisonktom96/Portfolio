import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Plugin, Connect } from 'vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * Nuclear anti-cache for dev: every request (HTML, JS modules, images, CSS)
 * gets cache-busting headers AND static assets get a unique query string so
 * the browser can never reuse a stale response.
 */
function devNukeCache(): Plugin {
  return {
    name: 'dev-nuke-cache',
    apply: 'serve',

    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html.replace(
          /src="\/src\/main\.tsx[^"]*"/,
          `src="/src/main.tsx?t=${Date.now()}"`,
        )
      },
    },

    configureServer(server) {
      const bust: Connect.NextHandleFunction = (_req, res, next) => {
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0')
        res.setHeader('Pragma', 'no-cache')
        res.setHeader('Expires', '0')
        res.setHeader('Surrogate-Control', 'no-store')
        res.setHeader('ETag', `"${Date.now()}"`)
        next()
      }
      server.middlewares.use(bust)
    },
  }
}

export default defineConfig({
  plugins: [react(), devNukeCache()],
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 4000,
    strictPort: true,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  },
})
