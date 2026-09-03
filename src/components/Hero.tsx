import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Zap, ArrowRight, ArrowDown, Code2, Github, Linkedin, Smartphone } from 'lucide-react'
import { STRINGS } from '../data/strings'

interface HeroProps {
  profile: {
    name: string
    role: string
    location: string
    availability: string
  }
}

export default function Hero({ profile }: HeroProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'tween', ease: 'easeOut', duration: 0.4 },
    },
  }

  const handleScroll = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault()
    document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-12 z-10 flex flex-col items-center text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Rounded Profile Image */}
          <motion.div
            variants={itemVariants}
            className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-white shadow-md mb-6 flex-shrink-0"
          >
            <img src="/joey.jpg" alt="Joey van der Poel" className="w-full h-full object-cover" />
          </motion.div>

          {/* Availability Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-theme-20 text-slate-900 text-xs font-bold tracking-wide mb-8 shadow-md backdrop-blur-md"
          >
            <Zap className="w-3.5 h-3.5 text-theme fill-theme-10" />
            <span>{STRINGS.hero.availabilityBadge}</span>
          </motion.div>

          {/* Core Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-black tracking-tight font-heading text-white max-w-4xl leading-[1.12] mb-6"
          >
            <span className="[text-shadow:_0_2px_5px_rgba(15,23,42,0.4)]">
              {profile.name} — Building{' '}
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-400 font-extrabold [filter:drop-shadow(0_2px_5px_rgba(15,23,42,0.4))]">
              {STRINGS.hero.headlineMobileApps}
            </span>{' '}
            <span className="[text-shadow:_0_2px_5px_rgba(15,23,42,0.4)]">
              &{' '}
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-sky-400 to-cyan-300 font-extrabold [filter:drop-shadow(0_2px_5px_rgba(15,23,42,0.4))]">
              {STRINGS.hero.headlineAIAutomations}
            </span>
          </motion.h1>

          {/* Subheading with high readability glass styling */}
          <motion.p
            variants={itemVariants}
            className="text-sm md:text-base text-slate-900 font-semibold max-w-2xl leading-relaxed mb-10 bg-white/50 border border-white/40 shadow-sm px-6 py-4 rounded-2xl backdrop-blur-md"
          >
            {STRINGS.hero.subheading}
          </motion.p>

          {/* Technical Credentials Badges */}
          <motion.div 
            variants={itemVariants} 
            className="flex flex-wrap justify-center gap-3 mb-12 max-w-3xl"
          >
            {STRINGS.hero.credentials.map((highlight) => (
              <span
                key={highlight}
                className="px-4 py-2 bg-white/30 border border-white/50 text-slate-900 text-xs font-bold tracking-wide rounded-xl font-mono shadow-sm backdrop-blur-md"
              >
                {highlight}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <button
              onClick={(e) => handleScroll(e, '#contact')}
              className="w-full sm:w-auto px-8 py-4 bg-theme hover:brightness-110 text-white font-bold text-sm tracking-wide rounded-xl flex items-center justify-center gap-2 cursor-pointer transition shadow-theme-10 hover:-translate-y-0.5"
            >
              <span>{STRINGS.hero.btnStartProject}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={(e) => handleScroll(e, '#work')}
              className="w-full sm:w-auto px-8 py-4 bg-white/80 hover:bg-white border border-theme-30 text-theme font-bold text-sm tracking-wide rounded-xl flex items-center justify-center gap-2 cursor-pointer transition shadow-xs backdrop-blur-md hover:-translate-y-0.5"
            >
              <Code2 className="w-4 h-4 text-theme" />
              <span>{STRINGS.hero.btnExploreCode}</span>
            </button>
          </motion.div>

          {/* Social Row */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-6 mt-10"
          >
            <a
              href={STRINGS.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-sky-300 transition-colors flex items-center gap-2 text-xs font-bold font-mono tracking-wider uppercase drop-shadow-sm"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <a
              href={STRINGS.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-sky-300 transition-colors flex items-center gap-2 text-xs font-bold font-mono tracking-wider uppercase drop-shadow-sm"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href={STRINGS.links.appStore}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-sky-300 transition-colors flex items-center gap-2 text-xs font-bold font-mono tracking-wider uppercase drop-shadow-sm"
            >
              <Smartphone className="w-4 h-4" />
              <span>App Store</span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-70">
        <span className="text-[10px] tracking-widest text-theme font-bold uppercase font-mono">{STRINGS.hero.scrollIndicator}</span>
        <ArrowDown className="w-4 h-4 text-theme animate-bounce" />
      </div>
    </section>
  )
}
