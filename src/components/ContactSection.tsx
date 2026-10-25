import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Copy, Check, Mail, Linkedin, Github, Send } from 'lucide-react'
import { STRINGS } from '../data/strings'
import { useTheme } from '../context/ThemeContext'

interface ContactFormState {
  name: string
  email: string
  message: string
}

/**
 * Minimalist Contact Section aligned with the Unboxed Editorial Design System:
 * Offers maximum clarity with zero database dependencies. Features direct 1-click email copy,
 * social gateways, a streamlined 3-field note composer, and theme-adaptive graduation photography.
 *
 * @returns {React.JSX.Element} Minimalist contact section.
 */
export default function ContactSection(): React.JSX.Element {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [formData, setFormData] = useState<ContactFormState>({ name: '', email: '', message: '' })
  const [copied, setCopied] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)

  /**
   * Copies the direct email address to the user's clipboard and displays a temporary confirmation.
   */
  const handleCopyEmail = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(STRINGS.contact.directEmailValue)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // Fallback if clipboard API is restricted
      window.location.href = `mailto:${STRINGS.contact.directEmailValue}`
    }
  }

  /**
   * Handles user submission by composing a mailto draft and confirming client-side delivery.
   *
   * @param {React.FormEvent} e - Form submission event.
   */
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return

    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name.trim()}`)
    const body = encodeURIComponent(
      `Name: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\n\nMessage:\n${formData.message.trim()}`
    )

    // Open user's email client directly without any intermediary database
    window.location.href = `mailto:${STRINGS.contact.directEmailValue}?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  /**
   * Updates state for form input controls.
   *
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - Change event.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  /**
   * Resets form state to compose another note.
   */
  const handleReset = (): void => {
    setFormData({ name: '', email: '', message: '' })
    setSubmitted(false)
  }

  return (
    <section
      id="contact"
      className="pt-0 pb-0 relative border-t border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end">
          
          {/* Left Column: Minimal Editorial Heading & Direct Channels */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 flex flex-col gap-7 pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16 relative z-10"
          >
            <div>
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 border border-[#a3b5c4]/30 text-[11px] font-mono tracking-widest uppercase text-[#a3b5c4]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#a3b5c4] animate-pulse" />
                <span>{STRINGS.contact.chapterBadge}</span>
              </div>
              <h2 className="font-editorial text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-normal leading-[1.04] tracking-tight mb-4 text-[var(--ink)]">
                Let's build <span className="italic font-normal">together.</span>
              </h2>
              <p className="text-[var(--lede)] text-sm sm:text-base leading-relaxed max-w-md">
                {STRINGS.contact.description}
              </p>
            </div>

            {/* Direct Contact Channels */}
            <div className="flex flex-col gap-3">
              {/* Primary Email Quick Card */}
              <div className="p-4 border border-[var(--line-strong)] hover:border-[#a3b5c4]/40 bg-black/[0.02] dark:bg-white/[0.02] flex items-center justify-between gap-4 transition-all">
                <a
                  href={`mailto:${STRINGS.contact.directEmailValue}?subject=Let's%20Build%20Together`}
                  className="flex items-center gap-3 min-w-0 group"
                  title="Send email directly"
                >
                  <div className="p-2 border border-[#a3b5c4]/30 bg-[var(--bg)] text-[#a3b5c4]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#a3b5c4] block font-semibold">
                      {STRINGS.contact.directEmailTitle}
                    </span>
                    <span className="text-sm font-semibold truncate block group-hover:text-[#a3b5c4] transition-colors">
                      {STRINGS.contact.directEmailValue}
                    </span>
                  </div>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2.5 border border-[#a3b5c4]/25 hover:border-[#a3b5c4] bg-[var(--bg)] text-[var(--ink)] hover:bg-[#a3b5c4]/10 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono shrink-0"
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#a3b5c4]" />
                      <span className="text-[11px] text-[var(--ink)] dark:text-[#a3b5c4] font-medium">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 opacity-60" />
                      <span className="text-[11px] opacity-75">Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Minimal Social Gateways */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={STRINGS.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 border border-[var(--line)] hover:border-[#a3b5c4]/40 bg-black/[0.02] dark:bg-white/[0.02] flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Linkedin className="w-4 h-4 text-[var(--ink)] group-hover:text-[#a3b5c4] shrink-0 transition-colors" />
                    <span className="text-xs font-semibold truncate group-hover:text-[#a3b5c4] transition-colors">LinkedIn</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[var(--lede)] group-hover:text-[#a3b5c4] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href={STRINGS.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 border border-[var(--line)] hover:border-[#a3b5c4]/40 bg-black/[0.02] dark:bg-white/[0.02] flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Github className="w-4 h-4 text-[var(--ink)] group-hover:text-[#a3b5c4] shrink-0 transition-colors" />
                    <span className="text-xs font-semibold truncate group-hover:text-[#a3b5c4] transition-colors">GitHub</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[var(--lede)] group-hover:text-[#a3b5c4] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Live Availability Telemetry Capsule */}
            <div className="pt-4 border-t border-[var(--line)] flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a3b5c4] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#a3b5c4]" />
              </span>
              <p className="text-xs font-mono text-[var(--lede)]">
                Reply within 24 hours
              </p>
            </div>
          </motion.div>

          {/* Center Column: Clean 3-Field Direct Note Composer */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 p-6 sm:p-8 border border-[var(--line)] hover:border-[#a3b5c4]/40 transition-colors bg-black/[0.015] dark:bg-white/[0.015] my-10 sm:my-14 lg:my-16 relative z-10"
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="note-form"
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex items-center justify-between pb-2 border-b border-[var(--line)]">
                    <span className="text-xs font-mono uppercase tracking-wider font-semibold text-[var(--ink)]">
                      Quick Message
                    </span>
                    <span className="text-[11px] font-mono text-[#a3b5c4]">
                      Direct &bull; No Database
                    </span>
                  </div>

                  {/* Name and Email side-by-side */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-name" className="text-[11px] font-mono uppercase tracking-wider text-[var(--lede)]">
                        {STRINGS.contact.nameLabel} <span className="text-[#a3b5c4]">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={STRINGS.contact.namePlaceholder}
                        className="px-3.5 py-2.5 text-sm font-sans bg-transparent border border-[var(--line-strong)] text-[var(--ink)] placeholder:text-[var(--lede)]/50 focus:outline-none focus:border-[#a3b5c4] focus:ring-1 focus:ring-[#a3b5c4]/40 transition-colors rounded-none"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-email" className="text-[11px] font-mono uppercase tracking-wider text-[var(--lede)]">
                        {STRINGS.contact.emailLabel} <span className="text-[#a3b5c4]">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={STRINGS.contact.emailPlaceholder}
                        className="px-3.5 py-2.5 text-sm font-sans bg-transparent border border-[var(--line-strong)] text-[var(--ink)] placeholder:text-[var(--lede)]/50 focus:outline-none focus:border-[#a3b5c4] focus:ring-1 focus:ring-[#a3b5c4]/40 transition-colors rounded-none"
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-message" className="text-[11px] font-mono uppercase tracking-wider text-[var(--lede)]">
                      {STRINGS.contact.messageLabel} <span className="text-[#a3b5c4]">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={STRINGS.contact.messagePlaceholder}
                      className="px-3.5 py-2.5 text-sm font-sans bg-transparent border border-[var(--line-strong)] text-[var(--ink)] placeholder:text-[var(--lede)]/50 focus:outline-none focus:border-[#a3b5c4] focus:ring-1 focus:ring-[#a3b5c4]/40 transition-colors rounded-none resize-y min-h-[95px]"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-1">
                    <button
                      type="submit"
                      className="w-full py-3 px-6 bg-[var(--btn-bg)] text-[var(--btn-fg)] font-sans font-medium text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer shadow-sm group"
                    >
                      <span>{STRINGS.contact.btnSubmit}</span>
                      <Send className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="note-sent"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-10 text-center flex flex-col items-center justify-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full border border-[#a3b5c4]/40 bg-[#a3b5c4]/15 flex items-center justify-center text-[#a3b5c4]">
                    <Check className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-editorial text-2xl sm:text-3xl font-medium mb-1.5 text-[var(--ink)]">
                      {STRINGS.contact.successTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--lede)] max-w-sm mx-auto leading-relaxed">
                      {STRINGS.contact.successDesc}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-2 px-4 py-2 border border-[var(--line-strong)] hover:border-[#a3b5c4] text-xs font-mono uppercase tracking-wider text-[var(--ink)] hover:bg-[#a3b5c4]/10 transition-colors cursor-pointer"
                  >
                    {STRINGS.contact.resetBtn}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right Column: Graduation Portrait Standing Directly on Footer */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 flex justify-center lg:justify-end items-end w-full relative z-0 pointer-events-none self-end"
          >
            <div className="relative flex items-end justify-center lg:justify-end">
              {/* Subtle Ambient Radial Glow */}
              <div
                className="absolute bottom-12 right-2 sm:right-6 w-56 h-56 sm:w-64 sm:h-64 rounded-full blur-[90px] pointer-events-none opacity-30 dark:opacity-45"
                style={{ background: 'radial-gradient(circle, rgba(163,181,196,0.4) 0%, transparent 70%)' }}
              />

              {/* Light Mode: Joey Graduation on Pure White Background */}
              <img
                src="/GraduationWhiteBackground.jpg"
                alt="Joey van der Poel Graduation"
                className={`h-[480px] sm:h-[540px] lg:h-[590px] xl:h-[615px] 2xl:h-[630px] w-auto max-w-none object-contain object-bottom select-none pointer-events-none transition-opacity duration-200 ease-out mix-blend-multiply translate-y-[1px] ${
                  isDark ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
                loading="lazy"
              />

              {/* Dark Mode: Joey Graduation on Pure Black Background */}
              <img
                src="/GraduationBlackBackground.jpg"
                alt="Joey van der Poel Graduation"
                className={`absolute inset-0 w-full h-full object-contain object-bottom select-none pointer-events-none transition-opacity duration-200 ease-out mix-blend-screen translate-y-[1px] ${
                  isDark ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                loading="lazy"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
