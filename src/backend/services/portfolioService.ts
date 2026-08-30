import portfolioRepository from '../repositories/portfolioRepository.js'

export class PortfolioService {
  /**
   * Orchestrates fetching all structural portfolio data.
   */
  async getFullPortfolio() {
    const [profile, services, projects, testimonials] = await Promise.all([
      portfolioRepository.getProfile(),
      portfolioRepository.getServices(),
      portfolioRepository.getProjects(),
      portfolioRepository.getTestimonials(),
    ])

    return {
      profile,
      services,
      projects,
      testimonials,
    }
  }
}
export default new PortfolioService()
