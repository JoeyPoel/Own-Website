import { getDb } from '../utils/prisma'

export interface CreateInquiryInput {
  name: string
  email: string
  projectType: string
  budget: string
  timeline: string
  message: string
}

export class InquiryRepository {
  /**
   * Persist a new intake contact inquiry request.
   */
  async createInquiry(data: CreateInquiryInput) {
    const db = await getDb()
    return db.Inquiry.create({
      name: data.name,
      email: data.email,
      projectType: data.projectType,
      budget: data.budget,
      timeline: data.timeline,
      message: data.message,
    })
  }
}
export default new InquiryRepository()
