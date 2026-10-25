import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowDown } from 'lucide-react'
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
      className="relative w-full min-h-[100dvh] flex flex-col justify-between bg-[var(--bg)] text-[var(--ink)] transition-colors duration-200 overflow-hidden"
    >
      {/* ─── Ambient Atmospheric Glow in Background using Champagne #FCE9C7 ─── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Warm Champagne Radial Illumination */}
        <div
          className="absolute top-[25%] right-[5%] w-[45vw] h-[45vh] max-w-[650px] max-h-[650px] rounded-full blur-[160px] opacity-15 dark:opacity-20 transition-opacity"
          style={{ background: 'radial-gradient(circle, #fce9c7 0%, transparent 70%)' }}
        />
      </div>

      {/* ─── Top Architectural Bar at Hero (No Navbar at Hero) ─── */}
      <header className="relative z-20 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-7 sm:pt-9 flex items-center justify-between gap-4">
        {/* Left: Founder Role & Academic Specialization */}
        <div className="flex items-center gap-2.5 text-xs sm:text-sm font-sans tracking-tight">
          <span className="font-semibold text-[var(--ink)]">Mobile Developer & AI Engineer</span>
          <span className="opacity-30">/</span>
          <span className="text-[#a3b5c4] font-medium">MSc Applied AI Candidate</span>
        </div>
      </header>

      {/* ─── Rotated Architectural Edge Badge ─── */}
      <div
        className="hidden xl:flex absolute right-6 top-1/2 -translate-y-1/2 select-none pointer-events-none z-20 items-center gap-2 text-[11px] font-mono tracking-widest text-[var(--lede)] opacity-60 uppercase"
        style={{ writingMode: 'vertical-rl' }}
        aria-hidden="true"
      >
        <span>&copy; {profile.name.toLowerCase()}</span>
      </div>

      {/* ─── Seamless Studio Portrait (Significantly Enlarged & Theme Adaptive) ─── */}
      <div className="absolute right-[-6%] sm:right-[-2%] md:right-[0%] lg:right-[2%] xl:right-[4%] bottom-0 z-10 pointer-events-none select-none h-[68vh] sm:h-[88vh] md:h-[105vh] lg:h-[122vh] xl:h-[132vh] min-h-[520px] sm:min-h-[700px] lg:min-h-[840px] max-h-[1180px] w-auto aspect-[765/1024]">
        {/* Light Mode: Joey on Pure White Background */}
        <img
          src="/JoeyWhiteBackground.jpg"
          alt={profile.name}
          className={`w-full h-full object-contain object-bottom transition-opacity duration-200 ease-out mix-blend-multiply ${
            isDark ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          loading="eager"
          decoding="async"
        />

        {/* Dark Mode: Joey on Pure Black Background */}
        <img
          src="/JoeyBlackBackground.jpg"
          alt={profile.name}
          className={`absolute inset-0 w-full h-full object-contain object-bottom transition-opacity duration-200 ease-out mix-blend-screen ${
            isDark ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          loading="eager"
          decoding="async"
        />
      </div>

      {/* ─── Central Content Stage ─── */}
      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 flex-1 flex flex-col justify-between pt-8 sm:pt-12 pb-8 sm:pb-10">
        
        {/* Left Column: Headlines & Story */}
        <div className="max-w-xl lg:max-w-2xl my-auto">

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-4xl sm:text-6xl lg:text-[72px] xl:text-[80px] font-bold tracking-[-0.035em] leading-[1.02] text-[var(--ink)]">
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
            <p className="mt-5 sm:mt-7 text-sm sm:text-base lg:text-lg font-normal leading-relaxed text-[var(--lede)] max-w-lg">
              Currently pursuing an MSc in Applied AI, I work with ambitious founders and teams to engineer intelligent systems, performant mobile apps, and digital platforms that feel natural, intentional, and high-impact.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 sm:mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              onClick={(e) => handleScroll(e, '#projects')}
              className="btn-originkit text-xs sm:text-sm py-3 px-6 shadow-sm group"
            >
              <span>See my work</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href="#contact"
              onClick={(e) => handleScroll(e, '#contact')}
              className="btn-originkit-outline text-xs sm:text-sm py-3 px-6"
            >
              <span>Let's collaborate</span>
            </a>
          </motion.div>

        </div>

        {/* ─── Bottom Architectural Bar & Live Metrics ─── */}
        <div className="relative z-20 w-full pt-6 border-t border-[var(--line)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6 sm:gap-10 text-xs font-mono">
            <div>
              <span className="text-[10px] text-[#a3b5c4] uppercase tracking-wider block font-semibold">Academics</span>
              <span className="text-xs sm:text-sm font-bold text-[var(--ink)]">MSc in Applied AI</span>
            </div>
            <div className="h-6 w-px bg-[#a3b5c4]/30 hidden sm:block" />
            <div>
              <span className="text-[10px] text-[#a3b5c4] uppercase tracking-wider block font-semibold">Projects</span>
              <span className="text-xs sm:text-sm font-bold text-[var(--ink)]">3 Featured Products</span>
            </div>
            <div className="h-6 w-px bg-[#a3b5c4]/30 hidden sm:block" />
            <div>
              <span className="text-[10px] text-[#a3b5c4] uppercase tracking-wider block font-semibold">Focus</span>
              <span className="text-xs sm:text-sm font-bold text-[var(--ink)]">Mobile & Applied AI</span>
            </div>
          </div>

          {/* Scroll Down Anchor */}
          <a
            href="#projects"
            onClick={(e) => handleScroll(e, '#projects')}
            className="hidden lg:inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--lede)] hover:text-[#a3b5c4] transition-colors"
          >
            <span>Scroll to explore</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#a3b5c4]" />
          </a>
        </div>

      </div>

      {/* ─── Ground Plane Baseline Divider (Anchors Joey's cut-off feet) ─── */}
      <div className="absolute inset-x-0 bottom-0 w-full h-px bg-[var(--line)] z-20 pointer-events-none" aria-hidden="true" />
    </section>
  )
}
