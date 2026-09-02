import portfolioRepository from '../repositories/portfolioRepository.js'

export class PortfolioService {
  /**
   * Orchestrates fetching all structural portfolio data.
   * Returns fresh portfolio data sorted by project order.
   */
  async getFullPortfolio() {
    const [profile, services, projects, testimonials] = await Promise.all([
      portfolioRepository.getProfile(),
      portfolioRepository.getServices(),
      portfolioRepository.getProjects(),
      portfolioRepository.getTestimonials(),
    ])

    // Sort projects strictly by order (or ID) ascending
    const sortedProjects = (projects || []).sort((a: any, b: any) => {
      const valA = a.order !== undefined && a.order !== null ? Number(a.order) : (parseInt(a.id, 10) || 999)
      const valB = b.order !== undefined && b.order !== null ? Number(b.order) : (parseInt(b.id, 10) || 999)
      return valA - valB
    })

    return {
      profile,
      services,
      projects: sortedProjects,
      testimonials,
    }
  }

  clearCache() {}
}
export default new PortfolioService()
