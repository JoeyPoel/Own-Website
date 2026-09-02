import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { STRINGS } from '../data/strings'

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Work', href: '#work' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
]

interface NavbarProps {
  profile: {
    name: string
    availability: string
  }
}

export default function Navbar({ profile }: NavbarProps) {
  const [activeSection, setActiveSection] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Cache the DOM elements on mount to avoid layout thrashing via querySelector on every scroll tick
    const sectionElements = [
      { id: 'home', element: document.querySelector('#home') as HTMLElement | null },
      ...navLinks.map(link => ({
        id: link.href.substring(1),
        element: document.querySelector(link.href) as HTMLElement | null
      }))
    ]

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      const scrollPosition = window.scrollY + 120

      for (const section of sectionElements) {
        if (!section.element) continue
        const top = section.element.offsetTop
        const height = section.element.offsetHeight

        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveSection(section.id)
          break // Found the current active section, exit loop early
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
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="glass-nav rounded-full px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between shadow-xl shadow-slate-950/20">
            {/* Name + Availability Badge */}
            <div className="flex items-center gap-3">
              <a 
                href="#home" 
                onClick={(e) => handleNavClick(e, '#home')}
                className="font-bold text-sky-950 tracking-wide font-heading text-sm whitespace-nowrap shrink-0"
              >
                {profile.name || 'Joey van der Poel'}
              </a>
              <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-full bg-theme-15 border border-theme-30 shrink-0">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-theme opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-theme"></span>
                </span>
                <span className="text-[10px] font-bold tracking-wide text-theme font-mono uppercase">
                  {STRINGS.navbar.availabilityFallback}
                </span>
              </div>
            </div>

            {/* Desktop Navigation + CTA (grouped on the right to eliminate whitespace) */}
            <div className="hidden md:flex items-center gap-2 lg:gap-6 shrink-0">
              <div className="flex items-center gap-0.5 lg:gap-1">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.substring(1)
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`relative px-2.5 lg:px-4 py-1.5 lg:py-2 text-[11px] lg:text-xs font-bold uppercase tracking-wider transition-colors duration-300 rounded-full whitespace-nowrap ${
                        isActive ? 'text-sky-950 font-extrabold' : 'text-slate-700 hover:text-sky-950'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="activeNavTab"
                          className="absolute inset-0 bg-theme-15 border border-theme-20 rounded-full -z-10"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      {link.name}
                    </a>
                  )
                })}
              </div>

              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="inline-flex items-center gap-1.5 px-3.5 lg:px-5 py-1.5 lg:py-2 overflow-hidden rounded-full bg-theme hover:brightness-110 text-white font-bold text-xs tracking-wider transition-all shadow-theme-10 hover:scale-105 whitespace-nowrap shrink-0"
              >
                <span>{STRINGS.navbar.btnDiscuss}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Mobile Menu Button & Discuss CTA */}
            <div className="md:hidden flex items-center gap-2">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-theme hover:brightness-110 text-white font-bold text-[11px] tracking-wider transition-all shadow-theme-10 whitespace-nowrap shrink-0"
              >
                <span>{STRINGS.navbar.btnDiscuss}</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 text-slate-700 hover:text-sky-950 rounded-lg focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-theme-10 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', ease: 'easeOut', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-full bg-white/95 border-l border-white/70 z-50 p-6 flex flex-col justify-between shadow-2xl md:hidden"
            >
              <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between">
                  <span className="font-heading font-bold text-theme tracking-wider text-sm font-mono">
                    {STRINGS.navbar.navigationLabel}
                  </span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-slate-500 hover:text-slate-800 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => {
                    const isActive = activeSection === link.href.substring(1)
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={`text-sm font-semibold px-4 py-3 rounded-xl transition-all ${
                          isActive 
                            ? 'bg-theme-10 text-theme border border-theme-20' 
                            : 'text-slate-700 hover:text-sky-950 hover:bg-theme-10'
                        }`}
                      >
                        {link.name}
                      </a>
                    )
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="w-full text-center py-4 rounded-xl bg-theme font-bold text-xs tracking-wider text-white shadow-lg transition-colors"
                >
                  {STRINGS.navbar.btnDiscuss}
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
