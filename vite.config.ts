import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig, loadEnv, type Plugin, type ViteDevServer } from 'vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Vite plugin that intercepts /api/inquiry in local development.
 * Emulates the Vercel serverless function so inquiry submissions work seamlessly with npm run dev.
 *
 * @returns {Plugin} Vite plugin configuration.
 */
function devApiPlugin(): Plugin {
  return {
    name: 'dev-api-middleware',
    configureServer(server: ViteDevServer) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url !== '/api/inquiry' || req.method !== 'POST') {
          return next()
        }

        const chunks: Buffer[] = []
        req.on('data', (chunk: Buffer) => chunks.push(chunk))
        await new Promise((resolve) => req.on('end', resolve))
        const bodyStr = Buffer.concat(chunks).toString('utf-8')

        try {
          const body = JSON.parse(bodyStr || '{}')
          const { processInquiry } = await import('./src/services/mailService.ts')
          const result = await processInquiry(body)

          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(result))
        } catch (err: any) {
          console.error('[Dev API Middleware Error]', err)
          const isVal =
            err?.message?.includes('characters long') || err?.message?.includes('valid email')
          res.statusCode = isVal ? 400 : 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: err?.message || 'Internal server error' }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  Object.assign(process.env, env)

  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    plugins: [react(), tailwindcss(), devApiPlugin()],
    esbuild: {
      drop: ['console', 'debugger'],
    },
    build: {
      cssCodeSplit: true,
      chunkSizeWarningLimit: 800,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor'
            }
          },
        },
      },
    },
  }
})
