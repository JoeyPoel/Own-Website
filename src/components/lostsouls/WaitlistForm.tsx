import React, { useState } from 'react'
import { STRINGS } from '../../data/strings'

/**
 * WaitlistForm Component for Lost Souls:
 * High-contrast tactile cyber transmission pill.
 *
 * @returns {JSX.Element} Subtle waitlist input interface.
 */
export const WaitlistForm: React.FC = () => {
  const [email, setEmail] = useState('')
  const [submittedEmail, setSubmittedEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const hasContent = email.trim().length > 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email.trim())) {
      setErrorMessage(STRINGS.lostsouls.waitlistInvalidError)
      return
    }

    const targetEmail = email.trim()
    setLoading(true)

    // Simulate instant gateway registration
    setTimeout(() => {
      setSubmittedEmail(targetEmail)
      setIsSubmitted(true)
      setEmail('')
      setLoading(false)
    }, 600)
  }

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto mt-8 sm:mt-10 select-none px-4">
      {isSubmitted ? (
        <div className="flex flex-col items-center justify-center text-center font-mono space-y-2 transition-all duration-700 py-3 px-6 rounded-full bg-black/80 border border-[#008cff]/50 shadow-[0_0_30px_rgba(0,140,255,0.3)]">
          <div className="text-xs sm:text-sm tracking-[0.25em] text-[#ffffff] uppercase laser-glow-text font-bold">
            {STRINGS.lostsouls.waitlistSuccessTitle}
          </div>
          <p className="text-xs sm:text-sm tracking-[0.2em] text-[#E0F7FF] font-bold">
            {submittedEmail}
          </p>
          <p className="text-[11px] tracking-[0.15em] text-[#cbd5e1] lowercase opacity-85">
            {STRINGS.lostsouls.waitlistSuccessDesc}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="relative w-full flex items-center transition-all duration-500 py-2 px-4 rounded-full bg-black/80 backdrop-blur-xl border border-[#008cff]/40 hover:border-[#008cff]/80 focus-within:border-[#008cff] shadow-[0_0_25px_rgba(0,140,255,0.2)]">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (errorMessage) {
                  setErrorMessage(null)
                }
              }}
              placeholder={STRINGS.lostsouls.placeholderWaitlist}
              disabled={loading}
              className="w-full pr-8 bg-transparent text-center text-[#ffffff] placeholder:text-[#94a3b8] placeholder:opacity-75 hover:placeholder:opacity-100 font-mono text-xs sm:text-sm tracking-[0.15em] uppercase focus:outline-none transition-all duration-300 disabled:opacity-40"
              aria-label="Join the waiting list"
              required
            />

            <div
              className={`absolute right-1.5 transition-all duration-300 transform ${
                hasContent
                  ? 'opacity-100 translate-x-0 scale-100'
                  : 'opacity-0 translate-x-2 scale-75 pointer-events-none'
              }`}
            >
              <button
                type="submit"
                disabled={loading || !hasContent}
                aria-label="Submit email"
                title="Transmit"
                className="w-8 h-8 rounded-full bg-[#008cff] hover:bg-[#E0F7FF] text-black flex items-center justify-center transition-all duration-300 focus:outline-none cursor-pointer shadow-[0_0_15px_#008cff]"
              >
                {loading ? (
                  <span className="inline-block w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <svg
                    className="w-3.5 h-3.5 transition-transform duration-300 hover:translate-x-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {errorMessage && (
            <p className="mt-2 text-center font-mono text-[10px] tracking-widest text-red-400 uppercase font-bold">
              {errorMessage}
            </p>
          )}
        </form>
      )}
    </div>
  )
}

export default WaitlistForm
