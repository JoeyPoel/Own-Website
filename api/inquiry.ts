import type { IncomingMessage, ServerResponse } from 'http'
import { processInquiry, type InquiryInput } from '../src/services/mailService.js'

interface VercelRequest extends IncomingMessage {
  body?: any
  query?: Record<string, string | string[]>
}

interface VercelResponse extends ServerResponse {
  status: (code: number) => VercelResponse
  json: (data: any) => void
  send: (body: any) => void
}

/**
 * Parses the incoming request body whether already parsed by Vercel runtime
 * or coming as an unconsumed Node.js readable stream.
 *
 * @param {VercelRequest} req - Incoming request object.
 * @returns {Promise<any>} Parsed body object.
 */
const parseRequestBody = async (req: VercelRequest): Promise<any> => {
  if (req.body && typeof req.body === 'object') {
    return req.body
  }

  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body)
    } catch {
      return {}
    }
  }

  const chunks: Buffer[] = []
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }

  if (chunks.length === 0) return {}

  const raw = Buffer.concat(chunks).toString('utf-8')
  try {
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

/**
 * Vercel Serverless Function entry point for handling contact inquiries.
 *
 * @param {VercelRequest} req - Request object.
 * @param {VercelResponse} res - Response object.
 */
export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  // CORS headers for preflight requests
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  try {
    const body = (await parseRequestBody(req)) as InquiryInput
    const result = await processInquiry(body)
    res.status(200).json(result)
  } catch (error: any) {
    console.error('[API /api/inquiry Error]', error)
    const isValidationError =
      error?.message?.includes('characters long') || error?.message?.includes('valid email')
    res.status(isValidationError ? 400 : 500).json({
      error: error?.message || 'Failed to dispatch inquiry message',
    })
  }
}
