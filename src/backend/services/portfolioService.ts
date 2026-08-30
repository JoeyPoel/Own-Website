import portfolioRepository from '../repositories/portfolioRepository.js'

// In-memory cache to prevent redundant database hits for static portfolio sections
let cachedPortfolio: any = null

export class PortfolioService {
  /**
   * Orchestrates fetching all structural portfolio data.
   * Utilizes in-memory caching to serve portfolio structure instantly after the first hit.
   */
  async getFullPortfolio() {
    if (cachedPortfolio) {
      return cachedPortfolio
    }

    const [profile, services, projects, testimonials] = await Promise.all([
      portfolioRepository.getProfile(),
      portfolioRepository.getServices(),
      portfolioRepository.getProjects(),
      portfolioRepository.getTestimonials(),
    ])

    cachedPortfolio = {
      profile,
      services,
      projects,
      testimonials,
    }

    return cachedPortfolio
  }

  /**
   * Invalidates the in-memory cache to force a fresh database read.
   */
  clearCache() {
    cachedPortfolio = null
  }
}
export default new PortfolioService()
