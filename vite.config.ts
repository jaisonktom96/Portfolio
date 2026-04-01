import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Plugin, Connect } from 'vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** Dev server port (see `npm run dev` output for the exact URL). */
export const VITE_DEV_PORT = 4000

function readContentRevisionFromDisk(): string {
  try {
    const p = path.resolve(__dirname, 'src/data/content.ts')
    const raw = readFileSync(p, 'utf-8')
    const m = raw.match(/export const CONTENT_REVISION = '([^']+)'/)
    return m?.[1] ?? 'unknown'
  } catch {
    return 'unknown'
  }
}

/**
 * Injects revision from disk into:
 * - <meta name="portfolio-disk-revision">
 * - #portfolio-cursor-project-marker text (so you see it without JS — embedded previews often stall on entry)
 */
function injectDiskRevisionMeta(): Plugin {
  return {
    name: 'inject-disk-revision-meta',
    transformIndexHtml(html) {
      const rev = readContentRevisionFromDisk()
      let out = html.replace('</head>', `<meta name="portfolio-disk-revision" content="${rev}" />\n</head>`)
      out = out.replace(
        /PCP · portfolio-cursor-project · …/,
        `PCP · portfolio-cursor-project · ${rev}`,
      )
      out = out.replace(
        /PCP · portfolio-cursor-project · \.\.\./,
        `PCP · portfolio-cursor-project · ${rev}`,
      )
      return out
    },
  }
}

/**
 * Dev cache-busting (no-store headers + entry query on each HTML request).
 * You do not need to restart the server for normal edits — HMR handles that.
 * Run `npm run dev:clean` only when the browser stubbornly shows an old bundle.
 */
function devNukeCache(): Plugin {
  return {
    name: 'dev-nuke-cache',
    apply: 'serve',

    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html.replace(
          /src="\/src\/portfolio-entry\.tsx[^"]*"/,
          `src="/src/portfolio-entry.tsx?t=${Date.now()}"`,
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

      server.httpServer?.once('listening', () => {
        const rev = readContentRevisionFromDisk()
        const contentPath = path.resolve(__dirname, 'src/data/content.ts')
        const port = server.config.server.port ?? VITE_DEV_PORT
        console.log(`\n  [vite] Reading CONTENT_REVISION from:\n  ${contentPath}`)
        console.log(`  [vite] Disk CONTENT_REVISION: ${rev}`)
        console.log(`  [vite] Local URL: http://localhost:${port}/`)
        console.log(`  [vite] If the yellow banner still shows an old date, View Source (⌘⌥U) and check`)
        console.log(`        <meta name="portfolio-disk-revision" content="..."> matches disk above.\n`)
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), injectDiskRevisionMeta(), devNukeCache()],
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: VITE_DEV_PORT,
    strictPort: true,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      Pragma: 'no-cache',
      Expires: '0',
    },
  },
})
