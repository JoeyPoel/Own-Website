import portfolioController from '../src/backend/controllers/portfolioController'

export default async function handler(req: any, res: any) {
  // Build a Web-standard Request from Node req
  const origin = `https://${req.headers.host || 'localhost'}`
  const headers = new Headers()
  for (const [key, value] of Object.entries(req.headers)) {
    if (value) {
      if (Array.isArray(value)) {
        value.forEach((v) => headers.append(key, v))
      } else {
        headers.set(key, value)
      }
    }
  }

  // If there's a body parsed by Vercel middleware, convert it back to string
  const bodyString = req.body && typeof req.body === 'object' ? JSON.stringify(req.body) : req.body

  const webReq = new Request(`${origin}${req.url}`, {
    method: req.method,
    headers,
    body: req.method !== 'GET' && bodyString ? bodyString : undefined,
  })

  try {
    const webRes = await portfolioController.getPortfolio(webReq)
    res.status(webRes.status)
    webRes.headers.forEach((value, key) => {
      res.setHeader(key, value)
    })
    res.send(await webRes.text())
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal server error' })
  }
}
