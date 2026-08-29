import inquiryRepository, { CreateInquiryInput } from '../repositories/inquiryRepository'

export class InquiryService {
  /**
   * Validate and process a new client inquiry request.
   */
  async processInquiry(input: CreateInquiryInput) {
    // 1. Basic Validations
    if (!input.name || input.name.trim().length < 2) {
      throw new Error('Name must be at least 2 characters long')
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!input.email || !emailRegex.test(input.email)) {
      throw new Error('Please specify a valid email address')
    }

    if (!input.message || input.message.trim().length < 10) {
      throw new Error('Message must be at least 10 characters long')
    }

    // 2. Persist
    const result = await inquiryRepository.createInquiry({
      name: input.name.trim(),
      email: input.email.trim(),
      projectType: input.projectType,
      budget: input.budget,
      timeline: input.timeline,
      message: input.message.trim(),
    })

    return {
      success: true,
      data: result,
    }
  }
}
export default new InquiryService()
