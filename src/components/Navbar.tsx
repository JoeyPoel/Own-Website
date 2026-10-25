import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { STRINGS } from '../data/strings'

const navLinks = STRINGS.navbar.links

const Chevron = () => (
  <svg width="7" height="12" viewBox="0 0 7 12" aria-hidden="true" className="inline-block shrink-0">
    <path d="M1 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.2" />
  </svg>
)

interface NavbarProps {
  profile: {
    name: string
    availability: string
  }
}

/**
 * Architectural floating navigation bar matching the Hero 68 design system.
 * Appears when scrolling past the hero header to provide seamless wayfinding.
 *
 * @param props.profile - Founder profile metadata.
 * @returns Floating architectural navigation bar.
 */
export default function Navbar({ profile }: NavbarProps) {
  const [activeSection, setActiveSection] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const sectionElements = [
      { id: 'home', element: document.querySelector('#home') as HTMLElement | null },
      ...navLinks.map((link) => ({
        id: link.href.substring(1),
        element: document.querySelector(link.href) as HTMLElement | null,
      })),
    ]

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 120)
      const scrollPosition = window.scrollY + 140

      for (const section of sectionElements) {
        if (!section.element) continue
        const top = section.element.offsetTop
        const height = section.element.offsetHeight

        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveSection(section.id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
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
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--line)] bg-[var(--bg)]/90 backdrop-blur-md py-3 transition-colors"
          >
            <div className="max-w-[1254px] mx-auto px-6 flex items-center justify-between">
              {/* Logo / Founder Avatar */}
              <a
                href="#home"
                onClick={(e) => handleNavClick(e, '#home')}
                className="flex items-center gap-3 text-[var(--ink)]"
              >
                <div className="w-7 h-7 rounded-full overflow-hidden border border-[var(--line-strong)] shrink-0">
                  <img src="/joey.jpg" alt="Joey van der Poel" className="w-full h-full object-cover" />
                </div>
                <span className="font-semibold text-sm tracking-tight font-sans">
                  {profile.name}
                </span>
                <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-widest opacity-60">
                  &bull; {STRINGS.navbar.founderRoleBadge}
                </span>
              </a>

              {/* Desktop Nav Items */}
              <div className="hidden lg:flex items-center gap-6">
                <nav className="flex items-center gap-6">
                  {navLinks.map((link) => {
                    const isActive = activeSection === link.href.substring(1)
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={`text-xs uppercase font-mono tracking-wider transition-opacity ${
                          isActive
                            ? 'font-bold text-[var(--ink)] border-b-2 border-[var(--ink)] pb-0.5'
                            : 'opacity-70 hover:opacity-100 text-[var(--ink)]'
                        }`}
                      >
                        {link.name}
                      </a>
                    )
                  })}
                </nav>

                <ThemeToggle />

                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="btn-originkit text-xs py-2 px-4 shadow-sm"
                >
                  <span>{STRINGS.navbar.btnDiscuss}</span>
                  <Chevron />
                </a>
              </div>

              {/* Mobile Menu Button & Theme Toggle */}
              <div className="lg:hidden flex items-center gap-2">
                <ThemeToggle />
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="btn-originkit text-xs py-1.5 px-3"
                >
                  <span>{STRINGS.navbar.btnCollaborate}</span>
                  <Chevron />
                </a>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-1.5 text-[var(--ink)] opacity-80 hover:opacity-100"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', ease: 'easeOut', duration: 0.25 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-full bg-[var(--bg)] border-l border-[var(--line)] z-50 p-6 flex flex-col justify-between shadow-2xl lg:hidden text-[var(--ink)]"
            >
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-[var(--line)] pb-4">
                  <span className="font-mono font-bold text-xs uppercase tracking-widest">
                    {STRINGS.navbar.navigationLabel}
                  </span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 opacity-70 hover:opacity-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="text-sm font-medium py-2 border-b border-[var(--line)] hover:opacity-60 transition-opacity"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4 pt-6 border-t border-[var(--line)]">
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="btn-originkit text-xs py-3 w-full justify-center"
                >
                  <span>{STRINGS.navbar.btnDiscuss}</span>
                  <Chevron />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
