import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Smartphone, Cpu, ArrowRight, Check, Zap } from 'lucide-react'
import { STRINGS } from '../data/strings'


const iconMap: Record<string, React.ElementType> = {
  web: Globe,
  mobile: Smartphone,
  ai: Cpu,
}

/**
 * CreativeOfferingsSection styled with Framer Marketplace Bento Grid aesthetics:
 * Interactive category selector, holographic hairline cards, live metrics, and tech stack tags.
 *
 * @returns {JSX.Element} Interactive creative offerings section.
 */
export default function CreativeOfferingsSection(): React.JSX.Element {
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const categories = STRINGS.creativity.categories
  const offerings = STRINGS.creativity.offerings

  const filteredOfferings = activeCategory === 'all'
    ? offerings
    : offerings.filter((item) => item.category === activeCategory)

  const handleScroll = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault()
    document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="creative-offerings" className="py-24 sm:py-32 relative bg-[var(--bg)] text-[var(--ink)] overflow-hidden">
      {/* Top subtle atmospheric feather completing the blend from the rave void into normal canvas */}
      <div 
        className="absolute inset-x-0 top-0 h-48 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(to bottom, var(--bg) 0%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1254px] mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <span className="text-[10px] font-bold tracking-[0.2em] font-mono uppercase px-3 py-1 bg-black/5 dark:bg-white/10 border border-[var(--line-strong)] inline-flex items-center gap-2 mb-4 rounded-sm shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span>{STRINGS.creativity.chapterBadge}</span>
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.04] tracking-tight mb-4">
              {STRINGS.creativity.title}
            </h2>
            <p className="text-[var(--lede)] text-base sm:text-lg leading-relaxed">
              {STRINGS.creativity.description}
            </p>
          </div>

          {/* Framer Category Filter Pills */}
          <div className="flex flex-wrap gap-2 p-1.5 bg-black/5 dark:bg-white/5 border border-[var(--line)] rounded-full backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-[var(--btn-bg)] text-[var(--btn-fg)] shadow-md font-bold'
                    : 'text-[var(--lede)] hover:text-[var(--ink)] hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Framer Bento Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <AnimatePresence mode="popLayout">
            {filteredOfferings.map((item, idx) => {
              const Icon = iconMap[item.id] || Globe
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="p-8 sm:p-9 card-ruled flex flex-col justify-between group rounded-sm shadow-xl hover:-translate-y-2 hover:shadow-2xl hover:border-[var(--line-strong)] transition-all duration-300 relative overflow-hidden"
                >
                  {/* Top Bar with Icon & Live Metric Pill */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-3.5 bg-black/5 dark:bg-white/10 border border-[var(--line)] shrink-0 transition-transform duration-300 group-hover:scale-110">
                        <Icon className="w-6 h-6 text-[var(--ink)]" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 bg-black/5 dark:bg-white/10 border border-[var(--line)]">
                          {item.badge}
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-400/30 font-bold">
                          {item.metric}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-editorial text-3xl font-bold mb-3 tracking-tight">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[var(--lede)] leading-relaxed mb-6 font-normal">
                      {item.desc}
                    </p>

                    {/* Deliverables Checklist */}
                    <div className="space-y-2.5 border-t border-[var(--line)] pt-5 mb-6">
                      {item.deliverables.map((del) => (
                        <div key={del} className="flex items-start gap-2.5 text-xs text-[var(--ink)]">
                          <Check className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                          <span>{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom: Tech Stack Tags & Action Button */}
                  <div>
                    <div className="border-t border-[var(--line)] pt-4 flex flex-wrap gap-1.5 mb-6">
                      {item.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono px-2 py-0.5 bg-black/5 dark:bg-white/5 border border-[var(--line)] text-[var(--lede)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={(e) => handleScroll(e, '#contact')}
                      className="btn-originkit text-xs py-3 w-full shadow-sm"
                    >
                      <span>{STRINGS.creativity.btnRequest}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Framer Founder Manifesto Quote Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'tween', ease: 'easeOut', duration: 0.5 }}
          className="p-8 sm:p-12 card-ruled border-2 border-[var(--line-strong)] text-center max-w-4xl mx-auto flex flex-col items-center gap-5 shadow-2xl rounded-sm"
        >
          <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center border border-[var(--line)]">
            <Zap className="w-5 h-5 text-blue-500" />
          </div>
          <p className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-normal leading-snug">
            "{STRINGS.creativity.manifestoQuote}"
          </p>
          <p className="text-xs sm:text-sm text-[var(--lede)] max-w-xl leading-relaxed">
            {STRINGS.creativity.manifestoSub}
          </p>
          <button
            onClick={(e) => handleScroll(e, '#contact')}
            className="btn-originkit text-xs py-3.5 px-8 mt-2 shadow-lg"
          >
            <span>{STRINGS.creativity.btnDiscussCollab}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>

      </div>
    </section>
  )
}
