import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

interface HeroProps {
  profile: {
    name: string
    role: string
    location: string
    availability: string
  }
}

/**
 * Editorial Full-Screen Hero Section:
 * Features unboxed edge-to-edge canvas with studio portrait integration:
 * - JoeyWhiteBackground.jpg for light mode
 * - JoeyBlackBackground.jpg for dark mode
 * Clearly emphasizes Joey's pursuit of an MSc in Applied AI, mobile engineering craft,
 * and featured products.
 *
 * @param props.profile - Founder metadata.
 * @returns {React.JSX.Element} Master Full-Screen Editorial Hero Component.
 */
export default function Hero({ profile }: HeroProps): React.JSX.Element {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  /**
   * Smoothly scrolls to target section upon clicking navigation anchor.
   *
   * @param e - Mouse click event.
   * @param targetId - Target DOM element selector (e.g. '#projects').
   */
  const handleScroll = (e: React.MouseEvent, targetId: string): void => {
    e.preventDefault()
    document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative w-full min-h-[520px] xs:min-h-[560px] sm:min-h-[100dvh] max-h-[620px] sm:max-h-none flex flex-col bg-[var(--bg)] text-[var(--ink)] transition-colors duration-400 overflow-hidden"
    >
      {/* ─── Ambient Atmospheric Glow in Background using Champagne #FCE9C7 ─── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Warm Champagne Radial Illumination */}
        <div
          className="absolute top-[25%] right-[5%] w-[45vw] h-[45vh] max-w-[650px] max-h-[650px] rounded-full blur-[160px] opacity-15 dark:opacity-20 transition-opacity duration-400"
          style={{ background: 'radial-gradient(circle, #fce9c7 0%, transparent 70%)' }}
        />
      </div>

      {/* ─── Top Architectural Bar at Hero (No Navbar at Hero) ─── */}
      <header className="relative z-20 w-full max-w-[1254px] mx-auto px-5 sm:px-6 pt-7 sm:pt-9 flex items-center justify-between gap-4">
        {/* Left: Founder Role & Academic Specialization */}
        <div className="flex items-center gap-2.5 text-xs sm:text-sm font-sans tracking-tight">
          <span className="font-semibold text-[var(--ink)]">Mobile Developer & AI Engineer</span>
          <span className="opacity-30">/</span>
          <span className="text-[#a3b5c4] font-medium">MSc Applied AI Candidate</span>
        </div>
      </header>

      {/* ─── Seamless Studio Portrait (Commanding Scale, Zero Massive White Space) ─── */}
      <div className="absolute right-[-14%] xs:right-[-10%] sm:right-[-2%] md:right-[0%] lg:right-[2%] xl:right-[4%] bottom-0 z-10 pointer-events-none select-none h-[420px] xs:h-[480px] sm:h-[88vh] md:h-[105vh] lg:h-[122vh] xl:h-[132vh] min-h-[380px] sm:min-h-[700px] lg:min-h-[840px] max-h-[520px] sm:max-h-[1180px] w-auto aspect-[765/1024]">
        {/* Light Mode: Joey on Pure White Background */}
        <img
          src="/JoeyWhiteBackground.jpg"
          alt={profile.name}
          className={`w-full h-full object-contain object-bottom transition-opacity duration-400 ease-in-out mix-blend-multiply ${
            isDark ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          loading="eager"
          decoding="async"
        />

        {/* Dark Mode: Joey on Pure Black Background */}
        <img
          src="/JoeyBlackBackground.jpg"
          alt={profile.name}
          className={`absolute inset-0 w-full h-full object-contain object-bottom transition-opacity duration-400 ease-in-out mix-blend-screen ${
            isDark ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          loading="eager"
          decoding="async"
        />
      </div>

      {/* ─── Central Content Stage ─── */}
      <div className="relative z-20 w-full max-w-[1254px] mx-auto px-5 sm:px-6 flex-1 flex flex-col justify-start pt-3 sm:pt-10 lg:pt-14 pb-4 sm:pb-12">
        
        {/* Left Column: Headlines & Story (Top anchored to eliminate massive whitespace above) */}
        <div className="w-full max-w-full sm:max-w-xl lg:max-w-2xl z-20">

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-3xl sm:text-5xl lg:text-[72px] xl:text-[80px] font-bold tracking-[-0.035em] leading-[1.04] sm:leading-[1.02] text-[var(--ink)]">
              Software & products <br />
              <span className="font-editorial italic font-normal text-[var(--ink)] opacity-95">
                for bold visions.
              </span>
            </h1>
          </motion.div>

          {/* Narrative Bio Highlighting Applied AI MSc */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mt-3.5 sm:mt-7 text-xs sm:text-base lg:text-lg font-normal leading-relaxed text-[var(--lede)] max-w-[310px] xs:max-w-[340px] sm:max-w-lg">
              Currently pursuing an MSc in Applied AI, I work with ambitious founders and teams to engineer intelligent systems, performant mobile apps, and digital platforms that feel natural, intentional, and high-impact.
            </p>
          </motion.div>

          {/* CTAs (Always side-by-side next to each other on laptop & mobile) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 sm:mt-9 flex flex-row flex-wrap items-center gap-3 sm:gap-4"
          >
            <a
              href="#projects"
              onClick={(e) => handleScroll(e, '#projects')}
              className="btn-originkit text-xs sm:text-sm py-2.5 px-4 sm:py-3 sm:px-6 shadow-sm group shrink-0"
            >
              <span>See my work</span>
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href="#contact"
              onClick={(e) => handleScroll(e, '#contact')}
              className="btn-originkit-outline text-xs sm:text-sm py-2.5 px-4 sm:py-3 sm:px-6 shrink-0"
            >
              <span>Let's collaborate</span>
            </a>
          </motion.div>

        </div>

      </div>

      {/* ─── Ground Plane Baseline Divider (Anchors Joey's cut-off feet at the section cut) ─── */}
      <div className="absolute inset-x-0 bottom-0 w-full h-px bg-[var(--line)] z-20 pointer-events-none" aria-hidden="true" />
    </section>
  )
}
