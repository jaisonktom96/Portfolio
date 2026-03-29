import type { Plugin } from 'vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/** Force no-cache on every dev response AND add Expires in the past. */
function devNoCacheHeaders(): Plugin {
  return {
    name: 'dev-no-cache-headers',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((_req, res, next) => {
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0')
        res.setHeader('Pragma', 'no-cache')
        res.setHeader('Expires', '0')
        res.setHeader('Surrogate-Control', 'no-store')
        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), devNoCacheHeaders()],
  server: {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  },
})
