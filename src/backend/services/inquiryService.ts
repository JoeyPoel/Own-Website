import inquiryRepository, { type CreateInquiryInput } from '../repositories/inquiryRepository.js'

async function sendEmailNotification(input: CreateInquiryInput) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('RESEND_API_KEY environment variable is not defined. Skipping email notification.')
    return
  }

  const formattedLinks = typeof input.links === 'object' && input.links !== null
    ? Object.entries(input.links).map(([k, v]) => `${k}: ${v}`).join(', ')
    : input.links

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'Joey van der Poel <joey@joeyvanderpoel.com>',
        to: 'joeywognum@gmail.com',
        reply_to: input.email,
        subject: `New Portfolio Inquiry from ${input.name}`,
        html: `
          <h2>New Inquiry Received</h2>
          <p><strong>Name:</strong> ${input.name}</p>
          <p><strong>Email:</strong> ${input.email}</p>
          ${input.company ? `<p><strong>Company:</strong> ${input.company}</p>` : ''}
          ${input.phone ? `<p><strong>Phone:</strong> ${input.phone}</p>` : ''}
          ${formattedLinks ? `<p><strong>Links/Socials:</strong> ${formattedLinks}</p>` : ''}
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

async function sendClientConfirmationEmail(input: CreateInquiryInput) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('RESEND_API_KEY environment variable is not defined. Skipping client email.')
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
        from: 'Joey van der Poel <joey@joeyvanderpoel.com>',
        to: input.email,
        subject: `Inquiry Received - Joey van der Poel`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 580px; margin: 0 auto; padding: 32px 24px; color: #334155; line-height: 1.6; background-color: #fafafa; border-radius: 16px; border: 1px solid #e2e8f0;">
            <h2 style="color: #0284c7; font-size: 22px; font-weight: 700; margin-top: 0; margin-bottom: 16px;">Hi ${input.name},</h2>
            <p style="font-size: 15px; margin-bottom: 16px; color: #475569;">Thank you for reaching out! I've successfully received your inquiry and I'm really excited about the prospect of working together to bring your project to life.</p>
            <p style="font-size: 15px; margin-bottom: 16px; color: #475569;">I am reviewing your details and will get back to you shortly with next steps.</p>
            <p style="font-size: 15px; margin-bottom: 24px; color: #475569;">In the meantime, feel free to save my contact number: <strong>+31 0615101806</strong>.</p>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
            <p style="font-size: 14px; margin-bottom: 4px; color: #64748b; font-weight: 600;">Best regards,</p>
            <p style="font-size: 15px; margin: 0; color: #0f172a; font-weight: 700;">Joey van der Poel</p>
            <p style="font-size: 13px; margin: 2px 0 0 0; color: #64748b;">Mobile Developer & AI Automation Engineer</p>
          </div>
        `,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Failed to send confirmation email to client via Resend:', errorText)
    } else {
      console.log('Client confirmation email sent successfully.')
    }
  } catch (err) {
    console.error('Error sending client confirmation email:', err)
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
      company: input.company?.trim(),
      phone: input.phone?.trim(),
      links: typeof input.links === 'string' ? input.links.trim() : input.links,
    })

    // 3. Send Email Notification (awaited to prevent serverless execution freeze)
    try {
      await sendEmailNotification({
        ...result,
        phone: input.phone,
        links: input.links,
        company: input.company,
        message: input.message.trim(), // Send the clean original message in the email body
      })
    } catch (err) {
      console.error('Email sending failure (admin notification):', err)
    }

    // 4. Send Client Confirmation Email (awaited to prevent serverless execution freeze)
    try {
      await sendClientConfirmationEmail({
        ...result,
        phone: input.phone,
        links: input.links,
        company: input.company,
        message: input.message.trim(),
      })
    } catch (err) {
      console.error('Email sending failure (client confirmation):', err)
    }

    return {
      success: true,
      data: result,
    }
  }
}
export default new InquiryService()
