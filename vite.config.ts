import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'


// ─── Vite API Middleware Plugin ───────────────────────────────────────────────
// Intercepts /api/* requests in dev so there's no need for a separate server.
// Uses Node.js HTTP Request/Response to bridge Vite dev middleware with
// the Web-standard Request/Response API used by the controllers.
function apiPlugin() {
  return {
    name: 'api-middleware',
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (!req.url?.startsWith('/api/')) return next()

        // Collect body chunks
        const chunks: Buffer[] = []
        req.on('data', (c: Buffer) => chunks.push(c))
        await new Promise((r) => req.on('end', r))
        const body = chunks.length ? Buffer.concat(chunks).toString() : undefined

        // Build a Web-standard Request
        const origin = `http://${req.headers.host || 'localhost:5173'}`
        const webReq = new Request(`${origin}${req.url}`, {
          method: req.method,
          headers: req.headers as Record<string, string>,
          body: body && req.method !== 'GET' ? body : undefined,
        })

        try {
          let webRes: Response | undefined

          if (req.url === '/api/portfolio' && req.method === 'GET') {
            const { default: portfolioController } = await import(
              './src/backend/controllers/portfolioController.ts'
            )
            webRes = await portfolioController.getPortfolio(webReq)
          } else if (req.url === '/api/inquiry' && req.method === 'POST') {
            const { default: inquiryController } = await import(
              './src/backend/controllers/inquiryController.ts'
            )
            webRes = await inquiryController.createInquiry(webReq)
          } else {
            return next()
          }

          if (webRes) {
            res.statusCode = webRes.status
            webRes.headers.forEach((v: string, k: string) => res.setHeader(k, v))
            const text = await webRes.text()
            res.end(text)
          }
        } catch (err: any) {
          console.error('[API Middleware Error]', err)
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: err.message || 'Internal server error' }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/Own-Website/',
  plugins: [react(), tailwindcss(), apiPlugin()],
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
            return 'vendor';
          }
        },
      },
    },
  },
})
