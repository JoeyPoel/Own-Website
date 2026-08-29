import inquiryController from '../../backend/controllers/inquiryController'

/**
 * Expo Router API Route POST Handler: app/api/inquiry+api.ts
 */
export async function POST(req: Request): Promise<Response> {
  return inquiryController.createInquiry(req)
}
