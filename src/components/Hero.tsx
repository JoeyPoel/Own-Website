import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Sparkles, ArrowRight, ArrowDown } from 'lucide-react'

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
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-28 overflow-hidden bg-dot-pattern">
      {/* Subtle Ambient Accent Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-12 z-10 flex flex-col items-center text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-semibold tracking-wider mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>{profile.location || 'Netherlands'}</span>
          </motion.div>

          {/* Core Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold tracking-tight font-heading text-white max-w-4xl leading-[1.1] mb-6"
          >
            {profile.role ? (
              <>
                I build cross-platform{' '}
                <span className="text-gradient-emerald">mobile apps</span> &{' '}
                <span className="text-gradient-emerald">AI automations</span>.
              </>
            ) : (
              <>
                I build cross-platform{' '}
                <span className="text-gradient-emerald">mobile apps</span> &{' '}
                <span className="text-gradient-emerald">AI automations</span> that eliminate manual work.
              </>
            )}
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-zinc-400 max-w-2xl leading-relaxed mb-10"
          >
            Leveraging software engineering rigor and applied AI expertise to translate complex ideas into production-ready software.
          </motion.p>

          {/* Technical Credentials Badges */}
          <motion.div 
            variants={itemVariants} 
            className="flex flex-wrap justify-center gap-3 mb-12 max-w-3xl"
          >
            {[
              '🎓 BSc Software Engineering',
              '🧠 MSc Applied Artificial Intelligence',
              profile.availability ? `⚡ ${profile.availability}` : '⚡ 16h/week Contract Availability'
            ].map((highlight) => (
              <span
                key={highlight}
                className="px-4 py-2 bg-zinc-900/80 border border-zinc-800 text-zinc-300 text-xs font-semibold tracking-wide rounded-xl font-mono"
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
              className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm tracking-wide rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-lg shadow-emerald-500/10"
            >
              <span>Discuss a Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={(e) => handleScroll(e, '#work')}
              className="w-full sm:w-auto px-8 py-4 bg-zinc-900 border border-zinc-800 text-white font-semibold text-sm tracking-wide rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors hover:bg-zinc-800"
            >
              <span>View Shipped Work</span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
        <span className="text-[10px] tracking-widest text-zinc-500 font-semibold uppercase">SCROLL</span>
        <ArrowDown className="w-3.5 h-3.5 text-zinc-500" />
      </div>
    </section>
  )
}
