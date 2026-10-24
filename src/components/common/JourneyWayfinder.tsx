import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { STRINGS } from '../../data/strings'

const steps = STRINGS.wayfinder.steps

/**
 * JourneyWayfinder Component:
 * Unifies all hero sections into a continuous, cinematic portfolio narrative.
 * Displays the current active chapter and provides fluid jump navigation.
 *
 * @returns {JSX.Element | null} Floating journey dock.
 */
export default function JourneyWayfinder(): React.JSX.Element | null {
  const [activeId, setActiveId] = useState<string>('about')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      // Only show after scrolling past the initial hero banner
      setIsVisible(scrollY > 350)

      const sectionElements = steps.map((s) => ({
        id: s.id,
        el: document.getElementById(s.id),
      }))

      const viewportMiddle = scrollY + window.innerHeight * 0.45

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i]
        if (item.el) {
          const top = item.el.offsetTop
          if (viewportMiddle >= top) {
            setActiveId(item.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleJump = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const activeStep = steps.find((s) => s.id === activeId) || steps[0]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-6 inset-x-0 z-40 flex justify-center pointer-events-none px-4 select-none"
          aria-label={STRINGS.wayfinder.ariaLabel}
        >
          <div className="pointer-events-auto flex items-center gap-1.5 p-1.5 rounded-full bg-black/80 dark:bg-black/90 backdrop-blur-xl border border-white/15 text-white shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
            
            {/* Mobile / Tablet Compact Indicator */}
            <div className="md:hidden flex items-center gap-2 px-3 py-1 font-mono text-[11px]">
              <span className="text-[#38bdf8] font-bold">{activeStep.num}</span>
              <span className="opacity-40">•</span>
              <span className="font-semibold text-white tracking-wider uppercase truncate max-w-[150px]">
                {activeStep.label}
              </span>
            </div>

            {/* Desktop Full Chapter Rail */}
            <div className="hidden md:flex items-center gap-1">
              {steps.map((step) => {
                const isActive = activeId === step.id
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={(e) => handleJump(e, step.href)}
                    className={`relative px-3.5 py-1.5 rounded-full font-mono text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                      isActive
                        ? 'text-white font-bold'
                        : 'text-neutral-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="active-wayfinder-pill"
                        className="absolute inset-0 rounded-full bg-white/15 border border-white/30 -z-10 shadow-sm"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className={isActive ? 'text-[#38bdf8] text-[10px]' : 'opacity-50 text-[10px]'}>
                      {step.num}
                    </span>
                    <span>{step.label}</span>
                  </button>
                )
              })}
            </div>

          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
