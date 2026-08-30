import portfolioService from '../services/portfolioService.js'

export class PortfolioController {
  /**
   * Handles dynamic fetching of portfolio settings.
   */
  async getPortfolio(_req: Request): Promise<Response> {
    try {
      const data = await portfolioService.getFullPortfolio()
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (error: any) {
      return new Response(
        JSON.stringify({ error: error.message || 'Internal server error' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }
  }
}
export default new PortfolioController()
