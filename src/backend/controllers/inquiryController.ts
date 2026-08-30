import inquiryService from '../services/inquiryService.js'

export class InquiryController {
  /**
   * Coordinates validating and saving a new client inquiry.
   */
  async createInquiry(req: Request): Promise<Response> {
    try {
      if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
          status: 405,
          headers: { 'Content-Type': 'application/json' },
        })
      }

      const body = await req.json() as any
      const result = await inquiryService.processInquiry(body)

      return new Response(JSON.stringify(result), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (error: any) {
      return new Response(
        JSON.stringify({ error: error.message || 'Validation failed' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }
  }
}
export default new InquiryController()
