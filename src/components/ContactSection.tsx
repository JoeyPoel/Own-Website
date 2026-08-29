import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle2, Mail, Linkedin, Clock } from 'lucide-react'

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [projectType, setProjectType] = useState('Mobile App')
  const [budget, setBudget] = useState('$5k – $10k')
  const [timeline, setTimeline] = useState('1–2 Months')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    setIsSubmitting(true)
    setErrorMsg('')
    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          projectType,
          budget,
          timeline,
        }),
      })

      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit inquiry')
      }

      setIsSuccess(true)
      setFormData({ name: '', email: '', message: '' })
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
    <section id="contact" className="py-24 relative bg-dot-pattern border-t border-zinc-900">
      <div className="absolute inset-0 bg-gradient-to-b from-[#09090b] via-transparent to-[#09090b] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Direct Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <span className="text-[11px] font-bold tracking-widest text-emerald-400 font-mono uppercase bg-emerald-500/5 px-3 py-1 rounded-full border border-emerald-500/10 w-max">
              Contact
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-white">
              Discuss a Project
            </h2>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-md">
              Need a cross-platform React Native app or a workflow automation tool built? Get in touch and let\'s review the details.
            </p>

            <div className="flex flex-col gap-4 mt-8 max-w-sm">
              <a
                href="mailto:joey@poel.dev"
                className="flex items-center gap-3 p-4 rounded-xl bg-zinc-900/50 border border-zinc-805 hover:border-zinc-700 transition-colors group shadow-md"
              >
                <Mail className="w-5 h-5 text-emerald-400" />
                <div>
                  <span className="text-[9px] font-bold font-mono text-zinc-500 uppercase tracking-widest block">Email Direct</span>
                  <span className="text-sm font-semibold text-zinc-300 group-hover:text-emerald-400 transition-colors">joey@poel.dev</span>
                </div>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl bg-zinc-900/50 border border-zinc-805 hover:border-zinc-700 transition-colors group shadow-md"
              >
                <Linkedin className="w-5 h-5 text-emerald-400" />
                <div>
                  <span className="text-[9px] font-bold font-mono text-zinc-500 uppercase tracking-widest block">LinkedIn</span>
                  <span className="text-sm font-semibold text-zinc-300 group-hover:text-emerald-400 transition-colors">Joey van der Poel</span>
                </div>
              </a>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-zinc-900/20 border border-zinc-900/80">
                <Clock className="w-5 h-5 text-zinc-650" />
                <div>
                  <span className="text-[9px] font-bold font-mono text-zinc-600 uppercase tracking-widest block">Response Time</span>
                  <span className="text-xs font-semibold text-zinc-500 uppercase tracking-tight font-mono">Quotes in 24 hours</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Intake Planner */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 card-premium p-8 rounded-2xl shadow-xl relative overflow-hidden"
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
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono">
                      What project stack?
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {['Mobile App', 'AI Automation', 'AI Integration', 'Other'].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setProjectType(type)}
                          className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wide cursor-pointer transition-all border ${
                            projectType === type
                              ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
                              : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget Selection */}
                  <div className="flex flex-col gap-3">
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono">
                      Estimated Project Budget
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {['Under $5k', '$5k – $10k', '$10k – $20k', '$20k+'].map((range) => (
                        <button
                          key={range}
                          type="button"
                          onClick={() => setBudget(range)}
                          className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wide cursor-pointer transition-all border ${
                            budget === range
                              ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
                              : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                          }`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Timeline Selection */}
                  <div className="flex flex-col gap-3">
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono">
                      Expected Timeline
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {['Immediate Sprints', '1–2 Months', 'Flexible'].map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setTimeline(time)}
                          className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wide cursor-pointer transition-all border ${
                            timeline === time
                              ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
                              : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Text Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-700 focus:outline-none focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/80 transition-all text-sm font-sans"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-700 focus:outline-none focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/80 transition-all text-sm font-sans"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono">
                      What goals are we targeting?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Outline the operational bottleneck or the mobile app concept..."
                      className="px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-700 focus:outline-none focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/80 transition-all text-sm font-sans resize-none"
                    />
                  </div>

                  {errorMsg && (
                    <div className="p-3 bg-red-950/20 border border-red-900/40 text-red-400 text-xs font-semibold rounded-xl">
                      {errorMsg}
                    </div>
                  )}

                  {/* Submit button */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    disabled={isSubmitting}
                    className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm tracking-wide rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/5"
                  >
                    <span>{isSubmitting ? 'Submitting Details...' : 'Request Quote & Consultation'}</span>
                  </motion.button>
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
                    Planner Transmitted
                  </h3>
                  <p className="text-zinc-400 text-xs max-w-xs leading-relaxed">
                    Thank you. Joey will follow up with initial scheduling options within 24 hours.
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
