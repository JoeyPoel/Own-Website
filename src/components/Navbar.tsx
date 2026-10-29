import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import LanguageToggle from './LanguageToggle'
import { useLanguage } from '../context/LanguageContext'

interface NavbarProps {
  profile: {
    name: string
    availability: string
  }
}

/**
 * Clean Architectural Navigation Bar:
 * Permanently accessible fixed top bar with glassmorphism backdrop upon scroll.
 * Accurately synchronized with current page sections (#projects, #creative-offerings, #testimonials, #contact).
 * Styled with the 4-color palette (FFFFFF, 000000, FCE9C7, A3B5C4).
 * Includes global ThemeToggle and LanguageToggle (EN / NL).
 *
 * @param props.profile - Founder metadata.
 * @returns {React.JSX.Element} Clean navigation bar.
 */
export default function Navbar({ profile }: NavbarProps): React.JSX.Element {
  const { strings } = useLanguage()
  const [activeSection, setActiveSection] = useState<string>('home')
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)

  const navLinks = strings.navbar.links

  useEffect(() => {
    const sectionIds = ['home', ...navLinks.map((link) => link.href.substring(1)), 'contact']

    const handleScroll = (): void => {
      const heroElement = document.getElementById('home')
      const heroBottom = heroElement ? heroElement.offsetHeight - 100 : window.innerHeight * 0.75
      setIsScrolled(window.scrollY > heroBottom)

      const scrollPosition = window.scrollY + 160
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i]
        const element = document.getElementById(id)
        if (element) {
          const top = element.offsetTop
          if (scrollPosition >= top) {
            setActiveSection(id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [navLinks])

  /**
   * Smoothly navigates to target section.
   *
   * @param e - Mouse click event.
   * @param href - Anchor destination.
   */
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string): void => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  return (
    <>
      <AnimatePresence>
        {isScrolled && (
          <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--line)] py-2.5 sm:py-3 shadow-xs transition-colors"
          >
            <div className="max-w-[1440px] mx-auto px-4 sm:px-10 lg:px-16 flex items-center justify-between">
              
              {/* Left: Founder Avatar & Identity */}
              <a
                href="#home"
                onClick={(e) => handleNavClick(e, '#home')}
                className="flex items-center gap-3 text-[var(--ink)] group cursor-pointer"
                title="Return to top"
              >
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#fce9c7]/50 dark:border-[#fce9c7]/60 shrink-0 shadow-xs ring-1 ring-[#fce9c7]/25">
              <img
                src="/joey.jpg"
                alt={profile.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
              <span className="font-semibold text-xs sm:text-sm tracking-tight font-sans text-[var(--ink)]">
                {profile.name}
              </span>
              <span className="hidden md:inline-block text-[10px] font-mono uppercase tracking-widest text-[#a3b5c4]">
                &bull; {strings.navbar.founderRoleBadge}
              </span>
            </div>
          </a>

          {/* Center: Desktop Clean Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const sectionId = link.href.substring(1)
              const isActive = activeSection === sectionId

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-xs uppercase font-mono tracking-wider transition-all relative py-1 ${
                    isActive
                      ? 'font-bold text-[var(--ink)]'
                      : 'text-[var(--lede)] hover:text-[#fce9c7]'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#fce9c7] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              )
            })}
          </nav>

          {/* Right: Actions (Language Toggle, Theme Toggle & Contact CTA) */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageToggle />
            <ThemeToggle />

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="btn-originkit text-xs py-2 px-4 shadow-xs group"
            >
              <span>{strings.navbar.btnDiscuss}</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Right Controls */}
          <div className="lg:hidden flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="btn-originkit text-[11px] py-1.5 px-3"
            >
              <span>{strings.navbar.btnCollaborate}</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-[var(--ink)] hover:opacity-75 transition-opacity cursor-pointer border border-[var(--line)]"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', ease: [0.16, 1, 0.3, 1], duration: 0.28 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-[var(--bg)] border-l border-[var(--line)] z-50 p-6 flex flex-col justify-between shadow-2xl lg:hidden text-[var(--ink)]"
            >
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-[var(--line)] pb-4">
                  <span className="font-mono font-bold text-xs uppercase tracking-widest text-[var(--lede)]">
                    {strings.navbar.navigationLabel}
                  </span>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 text-[var(--ink)] hover:opacity-70 transition-opacity cursor-pointer"
                    aria-label="Close drawer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  {navLinks.map((link) => {
                    const sectionId = link.href.substring(1)
                    const isActive = activeSection === sectionId

                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={`text-base font-sans py-2.5 border-b border-[var(--line)] flex items-center justify-between ${
                          isActive
                            ? 'font-bold text-[var(--ink)] border-b-[#fce9c7]'
                            : 'text-[var(--lede)] hover:text-[#fce9c7]'
                        }`}
                      >
                        <span>{link.name}</span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#fce9c7]" />
                        )}
                      </a>
                    )
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-6 border-t border-[var(--line)]">
                <div className="flex items-center justify-between pb-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--lede)]">
                    Taal / Language
                  </span>
                  <LanguageToggle />
                </div>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="btn-originkit text-xs py-3 w-full justify-center gap-2"
                >
                  <span>{strings.navbar.btnDiscuss}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
