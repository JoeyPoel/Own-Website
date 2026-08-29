import { getDb } from '../utils/prisma'

export class PortfolioRepository {
  /**
   * Retrieves profile details.
   */
  async getProfile() {
    const db = await getDb()
    return db.Profile.first()
  }

  /**
   * Retrieves all services.
   */
  async getServices() {
    const db = await getDb()
    return db.Service.all()
  }

  /**
   * Retrieves all projects.
   */
  async getProjects() {
    const db = await getDb()
    return db.Project.all()
  }

  /**
   * Retrieves all testimonials.
   */
  async getTestimonials() {
    const db = await getDb()
    return db.Testimonial.all()
  }
}
export default new PortfolioRepository()
