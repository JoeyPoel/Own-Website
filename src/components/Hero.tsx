import React from 'react'
import FibreArc from './originkit/ui/hero-68/fibre-arc'
import PulseLines from './originkit/ui/hero-68/pulse-lines'
import ThemeToggle from './ThemeToggle'
import { useTheme } from '../context/ThemeContext'
import './originkit/hero-68.css'
import { STRINGS } from '../data/strings'

const Chevron = () => (
  <svg width="7" height="12" viewBox="0 0 7 12" aria-hidden="true" className="inline-block shrink-0">
    <path d="M1 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.2" />
  </svg>
)

const Arrow = () => (
  <svg width="16" height="12" viewBox="0 0 16 12" aria-hidden="true" className="inline-block shrink-0">
    <path d="M0 6h14.5M9.5 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.3" />
  </svg>
)

interface HeroProps {
  profile: {
    name: string
    role: string
    location: string
    availability: string
  }
}

/**
 * Hero section built on the Originkit Hero 68 architecture:
 * Interactive FibreArc WebGL ribbon, ruled 3-column grid with PulseLines,
 * monumental Instrument Serif typography, and ruled CTA row.
 * Adapts seamlessly between default white theme and dark mode.
 *
 * @param props.profile - Founder metadata.
 * @returns Clean, spacious Hero 68 section.
 */
export default function Hero({ profile }: HeroProps): React.JSX.Element {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const RIBBON = {
    dark: { background: '#050508', ink: '#f4f4f5', glow: 70 },
    light: { background: '#ffffff', ink: '#09090b', glow: 35 },
  }

  const handleScroll = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault()
    document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="hero-68 relative w-full overflow-hidden" data-scheme={theme}>
      <div className="hero">
        {/* Interactive FibreArc Canvas Ribbon Background */}
        <FibreArc
          {...RIBBON[theme]}
          style={{ position: 'absolute', inset: 0 }}
        />

        {/* Ruled 3-Column Grid with PulseLines */}
        <div className="grid" aria-hidden="true">
          <div className="wrap cols">
            {[99, 66, 33].map((speed) => (
              <i key={speed}>
                <PulseLines
                  gap={100000}
                  lineWidth={2}
                  pulseWidth={6}
                  duration={5}
                  speed={speed}
                  backgroundColor="transparent"
                  lineColor={isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.07)'}
                  colors={{ paletteCount: 2, color1: '#6A00F4', color2: '#F20089' }}
                />
              </i>
            ))}
          </div>
          <span className="hline" style={{ top: '29.1%' }} />
        </div>

        {/* Top Ruled Architectural Navigation Bar */}
        <header className="nav">
          <div className="wrap nav-inner">
            {/* Logo / Founder Avatar */}
            <a href="#home" onClick={(e) => handleScroll(e, '#home')} className="logo flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-[var(--line-strong)] shrink-0">
                <img src="/joey.jpg" alt={profile.name} className="w-full h-full object-cover" />
              </div>
              <span className="font-semibold text-sm tracking-tight">{profile.name}</span>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="links">
              {STRINGS.navbar.links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Action Button & Theme Toggle */}
            <div className="actions flex items-center gap-3">
              <ThemeToggle />
              <a
                href="#contact"
                onClick={(e) => handleScroll(e, '#contact')}
                className="btn btn-sm cursor-pointer"
              >
                <span>{STRINGS.hero.btnPartnerUp}</span>
                <Chevron />
              </a>
            </div>
          </div>
        </header>

        {/* Hero 68 Content */}
        <div className="content">
          <h1 className="wrap headline">
            {STRINGS.hero.headlineTitle}
          </h1>

          {/* Ruled CTA & Lede Row */}
          <div className="cta-row">
            <div className="wrap cta-inner">
              <a
                href="#contact"
                onClick={(e) => handleScroll(e, '#contact')}
                className="btn btn-lg cursor-pointer"
              >
                <span>{STRINGS.hero.btnPartnerUp}</span>
                <Arrow />
              </a>
              <p className="lede">
                {STRINGS.hero.subheading}
              </p>
            </div>
          </div>
        </div>

        {/* Atmospheric feathered transition blending Hero into About section */}
        <div 
          className="absolute inset-x-0 bottom-0 h-44 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, var(--bg) 100%)',
          }}
          aria-hidden="true"
        />
      </div>
    </section>
  )
}
