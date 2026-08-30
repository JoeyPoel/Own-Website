import React from 'react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Cloud, ArrowRight, ArrowDown, Code2 } from 'lucide-react'

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
      transition: { type: 'spring', stiffness: 120, damping: 20 },
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
          {/* Sky Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-theme-20 text-sky-950 text-xs font-semibold tracking-wide mb-8 shadow-sm backdrop-blur-md"
          >
            <Cloud className="w-4 h-4 text-theme fill-theme-10" />
            <span>{profile.location || 'Medemblik / Amsterdam, Netherlands'}</span>
          </motion.div>

          {/* Core Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-extrabold tracking-tight font-heading text-slate-900 max-w-4xl leading-[1.15] mb-6 drop-shadow-sm"
          >
            {profile.name} — Building{' '}
            <span className="text-gradient-theme-1">
              Mobile Apps
            </span>{' '}
            &{' '}
            <span className="text-gradient-theme-2">
              AI Automations
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-slate-800 font-medium max-w-2xl leading-relaxed mb-10 drop-shadow-xs"
          >
            Demystifying mobile technology and applied AI into high-converting, automated business solutions.
          </motion.p>

          {/* Technical Credentials Badges */}
          <motion.div 
            variants={itemVariants} 
            className="flex flex-wrap justify-center gap-3 mb-12 max-w-3xl"
          >
            {[
              '🎓 BSc Software Engineering',
              '🧠 MSc Applied Artificial Intelligence',
              profile.availability ? `⚡ ${profile.availability}` : '⚡ Available for contract builds'
            ].map((highlight) => (
              <span
                key={highlight}
                className="px-4 py-2 bg-white/75 border border-theme-20 text-sky-950 text-xs font-semibold tracking-wide rounded-xl font-mono shadow-xs backdrop-blur-md"
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
              className="w-full sm:w-auto px-8 py-4 bg-theme hover:brightness-110 text-white font-bold text-sm tracking-wide rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all shadow-theme-10 hover:-translate-y-0.5"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={(e) => handleScroll(e, '#work')}
              className="w-full sm:w-auto px-8 py-4 bg-white/80 hover:bg-white border border-theme-30 text-theme font-bold text-sm tracking-wide rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all shadow-xs backdrop-blur-md hover:-translate-y-0.5"
            >
              <Code2 className="w-4 h-4 text-theme" />
              <span>Explore Code & Work</span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-70">
        <span className="text-[10px] tracking-widest text-theme font-bold uppercase font-mono">SCROLL TO CODE</span>
        <ArrowDown className="w-4 h-4 text-theme animate-bounce" />
      </div>
    </section>
  )
}
