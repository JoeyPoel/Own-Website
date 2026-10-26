/**
 * @fileoverview Email dispatch service utilizing the Resend HTTP API.
 * Provides validation and handles sending admin inquiry notifications and client confirmation emails
 * without requiring any database layer.
 */

export interface InquiryInput {
  name: string
  email: string
  message: string
  company?: string
  phone?: string
  projectType?: string
  budget?: string
  timeline?: string
  links?: string | Record<string, string>
}

export interface InquiryResult {
  success: boolean
  message?: string
  simulated?: boolean
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Validates the inquiry payload fields.
 *
 * @param {InquiryInput} input - Raw user inquiry data.
 * @throws {Error} If any required field is missing or invalid.
 */
export const validateInquiryInput = (input: InquiryInput): void => {
  if (!input.name || input.name.trim().length < 2) {
    throw new Error('Name must be at least 2 characters long.')
  }

  if (!input.email || !EMAIL_REGEX.test(input.email.trim())) {
    throw new Error('Please provide a valid email address.')
  }

  if (!input.message || input.message.trim().length < 5) {
    throw new Error('Message must be at least 5 characters long.')
  }
}

/**
 * Sends an email notification to the site administrator regarding a new inquiry.
 *
 * @param {InquiryInput} input - Cleaned inquiry input.
 * @param {string} apiKey - Resend API key.
 * @returns {Promise<void>} Resolves when the email has been sent.
 */
const sendAdminNotification = async (input: InquiryInput, apiKey: string): Promise<void> => {
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'Joey van der Poel <joey@joeyvanderpoel.com>'
  const adminEmail = process.env.ADMIN_EMAIL || 'joeywognum@gmail.com'

  const formattedLinks =
    typeof input.links === 'object' && input.links !== null
      ? Object.entries(input.links)
          .map(([k, v]) => `${k}: ${v}`)
          .join(', ')
      : input.links

  const escapedMessage = (input.message || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>')

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: fromEmail,
      to: adminEmail,
      reply_to: input.email.trim(),
      subject: `New Portfolio Inquiry from ${input.name.trim()}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1e293b; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h2 style="margin-top: 0; color: #0f172a; font-size: 20px; border-bottom: 1px solid #e2e8f0; padding-bottom: 12px;">New Portfolio Inquiry</h2>
          <p style="margin: 8px 0;"><strong>Name:</strong> ${input.name.trim()}</p>
          <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${input.email.trim()}" style="color: #0284c7;">${input.email.trim()}</a></p>
          ${input.company ? `<p style="margin: 8px 0;"><strong>Company:</strong> ${input.company.trim()}</p>` : ''}
          ${input.phone ? `<p style="margin: 8px 0;"><strong>Phone:</strong> ${input.phone.trim()}</p>` : ''}
          ${formattedLinks ? `<p style="margin: 8px 0;"><strong>Links:</strong> ${formattedLinks}</p>` : ''}
          ${input.projectType ? `<p style="margin: 8px 0;"><strong>Project Type:</strong> ${input.projectType}</p>` : ''}
          ${input.budget ? `<p style="margin: 8px 0;"><strong>Budget:</strong> ${input.budget}</p>` : ''}
          ${input.timeline ? `<p style="margin: 8px 0;"><strong>Timeline:</strong> ${input.timeline}</p>` : ''}
          <div style="margin-top: 16px;">
            <p style="margin: 0 0 6px 0; font-weight: 600;">Message:</p>
            <blockquote style="margin: 0; background: #f8fafc; padding: 14px 16px; border-left: 3px solid #0284c7; border-radius: 4px; font-size: 14px; line-height: 1.6; color: #334155;">
              ${escapedMessage}
            </blockquote>
          </div>
        </div>
      `,
    }),
  })

  if (!res.ok) {
    const errorBody = await res.text()
    console.error('[MailService] Failed to send admin notification:', errorBody)
    throw new Error(`Resend admin notification failed with status ${res.status}: ${errorBody}`)
  }
}

/**
 * Sends a confirmation email back to the client who submitted the inquiry.
 *
 * @param {InquiryInput} input - Cleaned inquiry input.
 * @param {string} apiKey - Resend API key.
 * @returns {Promise<void>} Resolves when the email has been sent.
 */
const sendClientConfirmation = async (input: InquiryInput, apiKey: string): Promise<void> => {
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'Joey van der Poel <joey@joeyvanderpoel.com>'

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: fromEmail,
      to: input.email.trim(),
      subject: `Inquiry Received - Joey van der Poel`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 580px; margin: 0 auto; padding: 32px 24px; color: #334155; line-height: 1.6; background-color: #fafafa; border-radius: 16px; border: 1px solid #e2e8f0;">
          <h2 style="color: #0284c7; font-size: 22px; font-weight: 700; margin-top: 0; margin-bottom: 16px;">Hi ${input.name.trim()},</h2>
          <p style="font-size: 15px; margin-bottom: 16px; color: #475569;">Thank you for reaching out! I've successfully received your note and I'm really excited about the prospect of collaborating together.</p>
          <p style="font-size: 15px; margin-bottom: 20px; color: #475569;">I am reviewing your details and will get back to you shortly with next steps.</p>
          <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; margin: 20px 0;">
            <p style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin: 0 0 12px 0;">Direct Channels & Connect</p>
            <p style="font-size: 14px; margin: 6px 0; color: #334155;"><strong>Email:</strong> <a href="mailto:Joeywognum@gmail.com" style="color: #0284c7; text-decoration: none; font-weight: 500;">Joeywognum@gmail.com</a></p>
            <p style="font-size: 14px; margin: 6px 0; color: #334155;"><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/joey-van-der-poel-974203302/" target="_blank" rel="noopener noreferrer" style="color: #0284c7; text-decoration: none; font-weight: 500;">linkedin.com/in/joey-van-der-poel-974203302</a></p>
            <p style="font-size: 14px; margin: 6px 0; color: #334155;"><strong>Phone:</strong> <a href="tel:+31615101806" style="color: #0284c7; text-decoration: none; font-weight: 500;">+31 0615101806</a></p>
          </div>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
          <p style="font-size: 14px; margin-bottom: 4px; color: #64748b; font-weight: 600;">Best regards,</p>
          <p style="font-size: 15px; margin: 0; color: #0f172a; font-weight: 700;">Joey van der Poel</p>
          <p style="font-size: 13px; margin: 2px 0 0 0; color: #64748b;">Mobile Developer & AI Automation Engineer</p>
        </div>
      `,
    }),
  })

  if (!res.ok) {
    const errorBody = await res.text()
    console.error('[MailService] Failed to send client confirmation:', errorBody)
    // Non-fatal if confirmation fails as long as admin notification succeeded, but we log the error
  }
}

/**
 * Coordinates validation and email delivery for incoming inquiries without database persistence.
 *
 * @param {InquiryInput} input - Raw inquiry payload.
 * @returns {Promise<InquiryResult>} Result indicating dispatch success.
 */
export const processInquiry = async (input: InquiryInput): Promise<InquiryResult> => {
  validateInquiryInput(input)

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('[MailService] RESEND_API_KEY is not defined. Email simulated in dev mode:', {
      name: input.name,
      email: input.email,
      messagePreview: input.message.slice(0, 50),
    })
    return {
      success: true,
      simulated: true,
      message: 'Inquiry processed (dev simulation: RESEND_API_KEY not configured).',
    }
  }

  // Await notifications to ensure serverless functions complete before terminating
  await sendAdminNotification(input, apiKey)
  await sendClientConfirmation(input, apiKey)

  return { success: true }
}
