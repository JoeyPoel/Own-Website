import inquiryRepository, { type CreateInquiryInput } from '../repositories/inquiryRepository.js'

async function sendEmailNotification(input: CreateInquiryInput) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('RESEND_API_KEY environment variable is not defined. Skipping email notification.')
    return
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'Portfolio Inquiry <onboarding@resend.dev>',
        to: 'joeywognum@gmail.com',
        reply_to: input.email,
        subject: `New Portfolio Inquiry from ${input.name}`,
        html: `
          <h2>New Inquiry Received</h2>
          <p><strong>Name:</strong> ${input.name}</p>
          <p><strong>Email:</strong> ${input.email}</p>
          <p><strong>Project Type:</strong> ${input.projectType || 'N/A'}</p>
          <p><strong>Budget:</strong> ${input.budget || 'N/A'}</p>
          <p><strong>Timeline:</strong> ${input.timeline || 'N/A'}</p>
          <p><strong>Message:</strong></p>
          <blockquote style="background: #f4f4f4; padding: 10px; border-left: 3px solid #ccc; white-space: pre-wrap;">
            ${(input.message || '').replace(/\n/g, '<br>')}
          </blockquote>
        `,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Failed to send email via Resend:', errorText)
    } else {
      console.log('Inquiry email notification sent successfully.')
    }
  } catch (err) {
    console.error('Error sending email notification:', err)
  }
}

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

    // 3. Send Email Notification (non-blocking)
    sendEmailNotification(result).catch((err) => {
      console.error('Deferred email sending failure:', err)
    })

    return {
      success: true,
      data: result,
    }
  }
}
export default new InquiryService()
