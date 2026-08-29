import portfolioController from '../../backend/controllers/portfolioController'

/**
 * Expo Router API Route GET Handler: app/api/portfolio+api.ts
 */
export async function GET(req: Request): Promise<Response> {
  return portfolioController.getPortfolio(req)
}
