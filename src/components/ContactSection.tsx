import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Mail, Linkedin, Github, Smartphone, Globe, Music, Plus, Trash2, Send, Clock, Sparkles, MapPin, ShieldAlert } from 'lucide-react'
import { STRINGS } from '../data/strings'

const collaborationIcons: Record<string, React.ElementType> = {
  tracks: Smartphone,
  lostsouls: Music,
  connectcultures: Globe,
  bespoke: Sparkles,
  other: Mail,
}

const collaborationOptions = STRINGS.contact.collaborationOptions.map((opt) => ({
  ...opt,
  icon: collaborationIcons[opt.id] || Mail,
}))

const timelineOptions = STRINGS.contact.timelineOptions

/**
 * ContactSection styled with Framer Marketplace "Collaboration Terminal" aesthetics:
 * Segmented venture selector with dynamic pills, timeline chips, direct founder credentials,
 * and high-contrast inputs.
 *
 * @returns {JSX.Element} Interactive collaboration terminal section.
 */
export default function ContactSection(): React.JSX.Element {
  const [selectedVenture, setSelectedVenture] = useState<string>(collaborationOptions[0].id)
  const [selectedTimeline, setSelectedTimeline] = useState<string>(timelineOptions[0])
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [companyName, setCompanyName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [socialLinks, setSocialLinks] = useState<{ platform: string; url: string }[]>([])
  const [customVenture, setCustomVenture] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const addSocialLink = () => {
    setSocialLinks([...socialLinks, { platform: '', url: '' }])
  }

  const removeSocialLink = (index: number) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index))
  }

  const handleSocialChange = (index: number, field: 'platform' | 'url', value: string) => {
    const updated = [...socialLinks]
    updated[index][field] = value
    setSocialLinks(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    setIsSubmitting(true)
    setErrorMsg('')
    try {
      const activeOption = collaborationOptions.find((o) => o.id === selectedVenture)
      const projectType = selectedVenture === 'other' && customVenture
        ? `Other: ${customVenture}`
        : activeOption?.label || selectedVenture

      const formattedLinks = socialLinks
        .filter((link) => link.platform.trim() || link.url.trim())
        .reduce((acc, link) => {
          const key = link.platform.trim() || 'Link'
          acc[key] = link.url.trim()
          return acc
        }, {} as Record<string, string>)

      const hasLinks = Object.keys(formattedLinks).length > 0

      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          projectType,
          budget: 'Partner / Client Inquiry',
          timeline: selectedTimeline,
          phone: phoneNumber.trim() || undefined,
          links: hasLinks ? formattedLinks : undefined,
          company: companyName.trim() || undefined,
        }),
      })

      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.error || 'Failed to transmit collaboration inquiry')
      }

      setIsSuccess(true)
      setFormData({ name: '', email: '', message: '' })
      setCompanyName('')
      setPhoneNumber('')
      setSocialLinks([])
      setCustomVenture('')
      setTimeout(() => setIsSuccess(false), 7000)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : STRINGS.contact.errorMessageDefault
      setErrorMsg(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <section id="contact" className="py-24 sm:py-32 relative border-t border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] overflow-hidden">
      <div className="max-w-[1254px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Founder Status & Direct Transmission Gateways */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'tween', ease: 'easeOut', duration: 0.5 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 bg-black/5 dark:bg-white/10 border border-[var(--line)]">
                  {STRINGS.contact.chapterBadge}
                </span>
                <span className="text-[10px] font-bold tracking-widest font-mono uppercase px-2.5 py-1 bg-black/5 dark:bg-white/10 border border-[var(--line)] inline-flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-blue-500" />
                  <span>{STRINGS.contact.badge}</span>
                </span>
              </div>
              <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.04] tracking-tight mb-3">
                {STRINGS.contact.title}
              </h2>
              <p className="text-[var(--lede)] text-sm sm:text-base leading-relaxed">
                {STRINGS.contact.description}
              </p>
            </div>

            {/* Live Availability Capsule */}
            <div className="p-5 card-ruled rounded-sm shadow-md flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                </span>
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider block">
                    {STRINGS.contact.statusTitle}
                  </span>
                  <span className="text-[11px] text-[var(--lede)]">
                    {STRINGS.contact.statusSub}
                  </span>
                </div>
              </div>
              <MapPin className="w-4 h-4 opacity-50 shrink-0" />
            </div>

            {/* Direct Gateway Links */}
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${STRINGS.contact.directEmailValue}`}
                className="p-4 card-ruled flex items-center justify-between group hover:border-[var(--line-strong)] hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 bg-black/5 dark:bg-white/10 border border-[var(--line)] shrink-0">
                    <Mail className="w-4 h-4 text-[var(--ink)]" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-widest opacity-60 block">
                      {STRINGS.contact.directEmailTitle}
                    </span>
                    <span className="text-xs font-semibold">
                      {STRINGS.contact.directEmailValue}
                    </span>
                  </div>
                </div>
                <Send className="w-4 h-4 opacity-40 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={STRINGS.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 card-ruled flex items-center justify-between group hover:border-[var(--line-strong)] hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 bg-black/5 dark:bg-white/10 border border-[var(--line)] shrink-0">
                    <Linkedin className="w-4 h-4 text-[var(--ink)]" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-widest opacity-60 block">
                      {STRINGS.contact.linkedinTitle}
                    </span>
                    <span className="text-xs font-semibold">
                      {STRINGS.contact.linkedinValue}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono opacity-50">&rarr;</span>
              </a>

              <a
                href={STRINGS.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 card-ruled flex items-center justify-between group hover:border-[var(--line-strong)] hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 bg-black/5 dark:bg-white/10 border border-[var(--line)] shrink-0">
                    <Github className="w-4 h-4 text-[var(--ink)]" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-widest opacity-60 block">
                      {STRINGS.contact.githubTitle}
                    </span>
                    <span className="text-xs font-semibold">
                      {STRINGS.contact.githubValue}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono opacity-50">&rarr;</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Framer Intake Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'tween', ease: 'easeOut', duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 p-8 sm:p-10 card-ruled rounded-sm shadow-2xl border border-[var(--line-strong)]"
          >
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="intake-form"
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Step 1: Venture Category Selection Pills */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase tracking-wider font-bold">
                        {STRINGS.contact.step1Title}
                      </span>
                      <span className="text-[10px] font-mono opacity-50">
                        {STRINGS.contact.step1Hint}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {collaborationOptions.map((opt) => {
                        const Icon = opt.icon
                        const isSelected = selectedVenture === opt.id
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setSelectedVenture(opt.id)}
                            className={`p-3.5 text-left border rounded-sm transition-all duration-200 flex items-center gap-3 cursor-pointer ${
                              isSelected
                                ? 'bg-[var(--btn-bg)] text-[var(--btn-fg)] border-[var(--btn-bg)] shadow-md font-medium'
                                : 'bg-black/5 dark:bg-white/5 border-[var(--line)] text-[var(--ink)] hover:border-[var(--line-strong)]'
                            }`}
                          >
                            <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[var(--btn-fg)]' : 'opacity-70'}`} />
                            <div className="min-w-0 flex-1">
                              <span className="block text-xs font-semibold truncate leading-tight">
                                {opt.label.split('(')[0]}
                              </span>
                              <span className="block text-[10px] opacity-75 truncate mt-0.5">
                                {opt.label.includes('(') ? `(${opt.label.split('(')[1]}` : opt.category}
                              </span>
                            </div>
                          </button>
                        )
                      })}
                    </div>

                    {selectedVenture === 'other' && (
                      <input
                        type="text"
                        placeholder={STRINGS.contact.otherPlaceholder}
                        required
                        value={customVenture}
                        onChange={(e) => setCustomVenture(e.target.value)}
                        className="mt-2 px-4 py-2.5 text-xs border border-[var(--line-strong)] bg-black/5 dark:bg-white/5 text-[var(--ink)] focus:outline-none focus:border-[var(--ink)] font-sans"
                      />
                    )}
                  </div>

                  {/* Step 2: Desired Timeline Pills */}
                  <div className="flex flex-col gap-2.5">
                    <span className="text-xs font-mono uppercase tracking-wider font-bold flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 opacity-60" />
                      <span>{STRINGS.contact.step2Title}</span>
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {timelineOptions.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setSelectedTimeline(t)}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-colors cursor-pointer border ${
                            selectedTimeline === t
                              ? 'bg-[var(--ink)] text-[var(--bg)] border-[var(--ink)] font-bold'
                              : 'bg-transparent border-[var(--line)] text-[var(--lede)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 3: Name and Organization */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className="text-xs font-mono uppercase tracking-wider font-bold">
                        {STRINGS.contact.step3NameLabel}
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={STRINGS.contact.step3NamePlaceholder}
                        className="px-4 py-3 bg-black/5 dark:bg-white/5 border border-[var(--line-strong)] focus:outline-none focus:border-[var(--ink)] text-sm font-sans rounded-sm"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="company" className="text-xs font-mono uppercase tracking-wider font-bold">
                        {STRINGS.contact.step3CompanyLabel}
                      </label>
                      <input
                        id="company"
                        type="text"
                        name="company"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder={STRINGS.contact.step3CompanyPlaceholder}
                        className="px-4 py-3 bg-black/5 dark:bg-white/5 border border-[var(--line-strong)] focus:outline-none focus:border-[var(--ink)] text-sm font-sans rounded-sm"
                      />
                    </div>
                  </div>

                  {/* Step 4: Email and Phone Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-xs font-mono uppercase tracking-wider font-bold">
                        {STRINGS.contact.step4EmailLabel}
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={STRINGS.contact.step4EmailPlaceholder}
                        className="px-4 py-3 bg-black/5 dark:bg-white/5 border border-[var(--line-strong)] focus:outline-none focus:border-[var(--ink)] text-sm font-sans rounded-sm"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="phone" className="text-xs font-mono uppercase tracking-wider font-bold">
                        {STRINGS.contact.step4PhoneLabel}
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder={STRINGS.contact.step4PhonePlaceholder}
                        className="px-4 py-3 bg-black/5 dark:bg-white/5 border border-[var(--line-strong)] focus:outline-none focus:border-[var(--ink)] text-sm font-sans rounded-sm"
                      />
                    </div>
                  </div>

                  {/* Step 5: Social / Portfolio Link Adder */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase tracking-wider font-bold">
                        {STRINGS.contact.step5LinksLabel}
                      </span>
                    </div>
                    {socialLinks.length > 0 && (
                      <div className="flex flex-col gap-2">
                        {socialLinks.map((link, idx) => (
                          <div key={idx} className="flex gap-2 items-center">
                            <input
                              type="text"
                              placeholder="Platform / Label"
                              value={link.platform}
                              onChange={(e) => handleSocialChange(idx, 'platform', e.target.value)}
                              className="w-1/3 px-3 py-2 text-xs bg-black/5 dark:bg-white/5 border border-[var(--line-strong)] focus:outline-none focus:border-[var(--ink)] font-mono"
                            />
                            <input
                              type="text"
                              placeholder="https://..."
                              value={link.url}
                              onChange={(e) => handleSocialChange(idx, 'url', e.target.value)}
                              className="flex-grow px-3 py-2 text-xs bg-black/5 dark:bg-white/5 border border-[var(--line-strong)] focus:outline-none focus:border-[var(--ink)] font-mono"
                            />
                            <button
                              type="button"
                              onClick={() => removeSocialLink(idx)}
                              className="p-2 border border-red-500/30 text-red-500 hover:bg-red-500/10 cursor-pointer"
                              title="Remove link"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={addSocialLink}
                      className="flex items-center gap-1.5 px-3 py-1.5 border border-[var(--line-strong)] text-[11px] font-mono uppercase tracking-wider hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer w-max"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{STRINGS.contact.step5AddLinkBtn}</span>
                    </button>
                  </div>

                  {/* Step 6: Message Field */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-xs font-mono uppercase tracking-wider font-bold">
                      {STRINGS.contact.step6MessageLabel}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={STRINGS.contact.step6MessagePlaceholder}
                      className="px-4 py-3 bg-black/5 dark:bg-white/5 border border-[var(--line-strong)] focus:outline-none focus:border-[var(--ink)] text-sm font-sans resize-y min-h-[120px] rounded-sm"
                    />
                  </div>

                  {errorMsg && (
                    <div className="p-3.5 border border-red-500/40 bg-red-500/5 text-red-600 dark:text-red-400 text-xs font-mono flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-originkit text-sm py-4 w-full justify-between shadow-xl"
                    >
                      <span>{isSubmitting ? STRINGS.contact.btnSubmitting : STRINGS.contact.btnSubmit}</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-16 text-center"
                >
                  <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-emerald-500" />
                  <h3 className="font-editorial text-3xl sm:text-4xl font-bold mb-2">
                    {STRINGS.contact.successTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--lede)] max-w-sm mx-auto leading-relaxed">
                    {STRINGS.contact.successDesc}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
