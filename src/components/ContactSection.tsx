import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Mail, Linkedin, Github, Smartphone, Plus, Trash2 } from 'lucide-react'
import { STRINGS } from '../data/strings'

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [companyName, setCompanyName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [socialLinks, setSocialLinks] = useState<{ platform: string; url: string }[]>([])
  const [projectType, setProjectType] = useState('Mobile App')
  const [customProjectType, setCustomProjectType] = useState('')
  const budget = 'Not Specified'
  const [timeline, setTimeline] = useState('1–2 Months (Standard)')
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
      const pType = projectType === 'Other' ? `Other: ${customProjectType}` : projectType
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
          projectType: pType,
          budget,
          timeline,
          phone: phoneNumber.trim() || undefined,
          links: hasLinks ? formattedLinks : undefined,
          company: companyName.trim() || undefined,
        }),
      })

      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit inquiry')
      }

      setIsSuccess(true)
      setFormData({ name: '', email: '', message: '' })
      setCompanyName('')
      setPhoneNumber('')
      setSocialLinks([{ platform: '', url: '' }])
      setCustomProjectType('')
      setTimeout(() => setIsSuccess(false), 5000)
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <section id="contact" className="py-24 relative bg-dot-pattern">

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Direct Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'tween', ease: 'easeOut', duration: 0.5 }}
            className="lg:col-span-5 flex flex-col gap-6 transform-gpu will-change-transform"
          >
            <span className="text-[11px] font-bold tracking-widest text-theme font-mono uppercase bg-theme-10 px-3 py-1 rounded-full w-max">
              {STRINGS.contact.badge}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-slate-850">
              {STRINGS.contact.title}
            </h2>
            <p className="text-slate-650 text-sm md:text-base leading-relaxed max-w-md">
              {STRINGS.contact.description}
            </p>

            <div className="flex flex-col gap-3 mt-4 max-w-sm">
              <a
                href="mailto:Joeywognum@gmail.com"
                className="flex items-center gap-3 p-3.5 rounded-xl bg-white/60 border border-white/70 hover:border-white transition-colors group shadow-xs"
              >
                <Mail className="w-4 h-4 text-theme" />
                <div>
                  <span className="text-[8px] font-bold font-mono text-slate-500 uppercase tracking-widest block">{STRINGS.contact.emailLabel}</span>
                  <span className="text-xs font-semibold text-slate-750 group-hover:text-theme transition-colors">Joeywognum@gmail.com</span>
                </div>
              </a>

              <a
                href={STRINGS.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-xl bg-white/60 border border-white/70 hover:border-white transition-colors group shadow-xs"
              >
                <Linkedin className="w-4 h-4 text-theme" />
                <div>
                  <span className="text-[8px] font-bold font-mono text-slate-500 uppercase tracking-widest block">{STRINGS.contact.linkedinLabel}</span>
                  <span className="text-xs font-semibold text-slate-750 group-hover:text-theme transition-colors">Joey van der Poel</span>
                </div>
              </a>

              <a
                href={STRINGS.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-xl bg-white/60 border border-white/70 hover:border-white transition-colors group shadow-xs"
              >
                <Github className="w-4 h-4 text-theme" />
                <div>
                  <span className="text-[8px] font-bold font-mono text-slate-500 uppercase tracking-widest block">GitHub</span>
                  <span className="text-xs font-semibold text-slate-750 group-hover:text-theme transition-colors">JoeyPoel</span>
                </div>
              </a>

              <a
                href={STRINGS.links.appStore}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-xl bg-white/60 border border-white/70 hover:border-white transition-colors group shadow-xs"
              >
                <Smartphone className="w-4 h-4 text-theme" />
                <div>
                  <span className="text-[8px] font-bold font-mono text-slate-500 uppercase tracking-widest block">Tracks & Taps</span>
                  <span className="text-xs font-semibold text-slate-750 group-hover:text-theme transition-colors">App Store Download</span>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Intake Planner */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'tween', ease: 'easeOut', duration: 0.5 }}
            className="lg:col-span-7 card-premium p-8 rounded-2xl shadow-xl relative overflow-hidden transform-gpu will-change-transform"
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
                  {/* Project Type Selection */}
                  <div className="flex flex-col gap-3">
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider font-mono">
                      {STRINGS.contact.form.stackLabel}
                    </span>
                    <div className="flex flex-wrap gap-2 items-center">
                      {['Mobile App', 'AI Automation', 'Other'].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setProjectType(type)}
                          className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wide cursor-pointer transition-all border ${
                            projectType === type
                              ? 'bg-theme-10 border-theme-30 text-theme'
                              : 'bg-white/60 border-slate-200/80 text-slate-650 hover:text-sky-950'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                      
                      {/* Custom "Other" Text Field */}
                      <AnimatePresence>
                        {projectType === 'Other' && (
                          <motion.input
                            initial={{ opacity: 0, scale: 0.95, width: 0 }}
                            animate={{ opacity: 1, scale: 1, width: '200px' }}
                            exit={{ opacity: 0, scale: 0.95, width: 0 }}
                            transition={{ type: 'tween', ease: 'easeOut', duration: 0.25 }}
                            type="text"
                            placeholder="Specify stack..."
                            required
                            value={customProjectType}
                            onChange={(e) => setCustomProjectType(e.target.value)}
                            className="px-3.5 py-2 rounded-xl bg-white/70 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-theme text-xs font-sans"
                          />
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Timeline Selection */}
                  <div className="flex flex-col gap-3">
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider font-mono">
                      {STRINGS.contact.form.timelineLabel}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {['ASAP (Urgent)', '1–2 Months (Standard)', 'Flexible (1+ Months)'].map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setTimeline(time)}
                          className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wide cursor-pointer transition-all border ${
                            timeline === time
                              ? 'bg-theme-10 border-theme-30 text-theme'
                              : 'bg-white/60 border-slate-200/80 text-slate-650 hover:text-sky-950'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Row 1: Name and Company Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-xs font-bold text-slate-600 uppercase tracking-wider font-mono">
                        {STRINGS.contact.form.nameLabel}
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={STRINGS.contact.form.namePlaceholder}
                        className="px-4 py-3 rounded-xl bg-white/70 border border-white/70 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-theme focus:ring-1 focus:ring-theme transition-all text-sm font-sans"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="company" className="text-xs font-bold text-slate-600 uppercase tracking-wider font-mono">
                        Company Name (Optional)
                      </label>
                      <input
                        id="company"
                        type="text"
                        name="company"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. Acme Corp"
                        className="px-4 py-3 rounded-xl bg-white/70 border border-white/70 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-theme focus:ring-1 focus:ring-theme transition-all text-sm font-sans"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email and Phone Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-xs font-bold text-slate-600 uppercase tracking-wider font-mono">
                        {STRINGS.contact.form.emailLabel}
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={STRINGS.contact.form.emailPlaceholder}
                        className="px-4 py-3 rounded-xl bg-white/70 border border-white/70 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-theme focus:ring-1 focus:ring-theme transition-all text-sm font-sans"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="phone" className="text-xs font-bold text-slate-600 uppercase tracking-wider font-mono">
                        Phone Number (Optional)
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="e.g. +31 6 12345678"
                        className="px-4 py-3 rounded-xl bg-white/70 border border-white/70 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-theme focus:ring-1 focus:ring-theme transition-all text-sm font-sans"
                      />
                    </div>
                  </div>

                  {/* Row 3: Social Links List */}
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider font-mono">
                      Social Links / Company URLs (Optional)
                    </span>
                    {socialLinks.length > 0 && (
                      <div className="flex flex-col gap-2.5">
                        {socialLinks.map((link, idx) => (
                          <div key={idx} className="flex gap-2 items-center">
                            <input
                              type="text"
                              placeholder="Platform (e.g. LinkedIn)"
                              value={link.platform}
                              onChange={(e) => handleSocialChange(idx, 'platform', e.target.value)}
                              className="w-1/3 px-3 py-2.5 rounded-xl bg-white/70 border border-white/70 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-theme focus:ring-1 focus:ring-theme text-xs font-sans"
                            />
                            <input
                              type="text"
                              placeholder="URL / Handle"
                              value={link.url}
                              onChange={(e) => handleSocialChange(idx, 'url', e.target.value)}
                              className="flex-grow px-3 py-2.5 rounded-xl bg-white/70 border border-white/70 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-theme focus:ring-1 focus:ring-theme text-xs font-sans"
                            />
                            {socialLinks.length >= 1 && (
                              <button
                                type="button"
                                onClick={() => removeSocialLink(idx)}
                                className="p-2.5 rounded-xl bg-red-950/10 border border-red-900/20 text-red-400 hover:bg-red-950/20 hover:border-red-900/30 transition-all cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={addSocialLink}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/50 border border-slate-200/80 hover:border-theme-30 text-[10px] font-bold text-slate-650 hover:bg-theme-10 hover:text-theme transition-all cursor-pointer w-max"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Social Link</span>
                    </button>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-xs font-bold text-slate-600 uppercase tracking-wider font-mono">
                      {STRINGS.contact.form.goalsLabel}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={8}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={STRINGS.contact.form.goalsPlaceholder}
                      className="px-4 py-3 rounded-xl bg-white/70 border border-white/70 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-theme focus:ring-1 focus:ring-theme transition-all text-sm font-sans resize-y min-h-[160px]"
                    />
                  </div>

                  {errorMsg && (
                    <div className="p-3 bg-red-950/20 border border-red-900/40 text-red-400 text-xs font-semibold rounded-xl">
                      {errorMsg}
                    </div>
                  )}

                  {/* Single Action Button */}
                  <div className="flex flex-col items-center gap-4 mt-2">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      disabled={isSubmitting}
                      className="w-full py-4 bg-theme hover:brightness-110 text-white font-bold text-sm tracking-wide rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-theme-10"
                    >
                      <span>{isSubmitting ? STRINGS.contact.form.btnSubmitting : "Send Inquiry"}</span>
                    </motion.button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-12 text-center font-sans"
                >
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mb-4" />
                  <h3 className="text-xl font-bold font-heading text-white mb-2">
                    {STRINGS.contact.form.successTitle}
                  </h3>
                  <p className="text-zinc-400 text-xs max-w-xs leading-relaxed">
                    {STRINGS.contact.form.successDesc}
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
