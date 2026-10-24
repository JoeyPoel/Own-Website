import React from 'react'
import { motion } from 'framer-motion'
import { Rocket, Palette, Users, GraduationCap, Smartphone, Music, Globe, ArrowRight, CheckCircle2, MapPin } from 'lucide-react'
import { STRINGS } from '../data/strings'

/**
 * AboutSection styled with Framer Marketplace executive bento aesthetics:
 * Rich natural color portrait, spotlight interactive cards, verified credentials badge,
 * and 3 live venture showcase tiles.
 *
 * @returns {JSX.Element} Executive founder about section.
 */
export default function AboutSection(): React.JSX.Element {
  const handleScroll = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault()
    document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="about" className="pt-20 pb-28 sm:pt-28 sm:pb-36 relative bg-[var(--bg)] text-[var(--ink)] overflow-hidden">
      {/* Seamless blend from Hero section */}
      <div 
        className="absolute inset-x-0 top-0 h-40 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, var(--bg) 0%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1254px] mx-auto px-6 relative z-10">
        
        {/* Section Chapter Kicker */}
        <div className="mb-4">
          <span className="text-[10px] font-bold tracking-[0.2em] font-mono uppercase px-3 py-1 bg-black/5 dark:bg-white/10 border border-[var(--line-strong)] inline-flex items-center gap-2 rounded-sm shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span>{STRINGS.about.chapterBadge}</span>
          </span>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16 mb-16">
          
          {/* Left Column: Founder Narrative & Framer Spotlight Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'tween', ease: 'easeOut', duration: 0.5 }}
            className="flex-1 flex flex-col gap-6"
          >
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.04] tracking-tight">
              {STRINGS.about.title}
            </h2>

            <p className="text-[var(--lede)] text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              {STRINGS.about.description}
            </p>

            {/* Three Framer-Style Spotlight Feature Tiles */}
            <div className="grid grid-cols-1 gap-4 mt-2">
              <div className="p-6 card-ruled flex gap-5 items-start group hover:border-[var(--line-strong)] hover:shadow-lg transition-all duration-300">
                <div className="p-3 bg-black/5 dark:bg-white/10 border border-[var(--line)] shrink-0 transition-transform duration-300 group-hover:scale-110">
                  <Rocket className="w-5 h-5 text-[var(--ink)]" />
                </div>
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-wider font-bold mb-1.5 flex items-center gap-2">
                    <span>{STRINGS.about.entrepreneurTitle}</span>
                  </h3>
                  <p className="text-sm text-[var(--lede)] leading-relaxed">
                    {STRINGS.about.entrepreneurDesc}
                  </p>
                </div>
              </div>

              <div className="p-6 card-ruled flex gap-5 items-start group hover:border-[var(--line-strong)] hover:shadow-lg transition-all duration-300">
                <div className="p-3 bg-black/5 dark:bg-white/10 border border-[var(--line)] shrink-0 transition-transform duration-300 group-hover:scale-110">
                  <Palette className="w-5 h-5 text-[var(--ink)]" />
                </div>
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-wider font-bold mb-1.5 flex items-center gap-2">
                    <span>{STRINGS.about.creativityTitle}</span>
                  </h3>
                  <p className="text-sm text-[var(--lede)] leading-relaxed">
                    {STRINGS.about.creativityDesc}
                  </p>
                </div>
              </div>

              <div className="p-6 card-ruled flex gap-5 items-start group hover:border-[var(--line-strong)] hover:shadow-lg transition-all duration-300">
                <div className="p-3 bg-black/5 dark:bg-white/10 border border-[var(--line)] shrink-0 transition-transform duration-300 group-hover:scale-110">
                  <Users className="w-5 h-5 text-[var(--ink)]" />
                </div>
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-wider font-bold mb-1.5 flex items-center gap-2">
                    <span>{STRINGS.about.partnerSearchTitle}</span>
                  </h3>
                  <p className="text-sm text-[var(--lede)] leading-relaxed">
                    {STRINGS.about.partnerSearchDesc}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Full-Color Founder Portrait & Verified Credential */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'tween', ease: 'easeOut', duration: 0.5, delay: 0.1 }}
            className="w-full lg:w-[410px] shrink-0 flex flex-col gap-4"
          >
            {/* Picture Frame with Natural Vibrant Color */}
            <div className="p-3 card-ruled shadow-xl group">
              <div className="overflow-hidden border border-[var(--line)] aspect-[4/5] bg-black/5 dark:bg-white/5 relative">
                <img
                  src="/joey.jpg"
                  alt="Joey van der Poel"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                />
                
                {/* Location Pill Overlay */}
                <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-black/75 backdrop-blur-md border border-white/20 text-white rounded-full flex items-center gap-1.5 text-[11px] font-mono shadow-md">
                  <MapPin className="w-3 h-3 text-emerald-400" />
                  <span>{STRINGS.about.locationPill}</span>
                </div>
              </div>
            </div>

            {/* Academic Credential Card with Verified Badge */}
            <div className="p-5 card-ruled flex items-center gap-4 shadow-md">
              <div className="p-3 bg-black/5 dark:bg-white/10 border border-[var(--line)] shrink-0">
                <GraduationCap className="w-6 h-6 text-[var(--ink)]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <p className="text-xs font-mono font-bold uppercase tracking-wider">
                    {STRINGS.about.degreeTitle}
                  </p>
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                </div>
                <p className="text-[11px] text-[var(--lede)] leading-normal">
                  {STRINGS.about.degreeDesc}
                </p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Framer-Style 3-Venture Bento Grid */}
        <div className="border-t border-[var(--line)] pt-12">
          <div className="flex items-center justify-between mb-8">
            <span className="text-[11px] font-bold tracking-widest font-mono uppercase opacity-75">
              {STRINGS.about.venturesHeader}
            </span>
            <span className="text-[11px] font-mono opacity-50 hidden sm:inline-block">
              {STRINGS.about.venturesSubheader}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            {/* Card 1: Tracks & Taps */}
            <a
              href="#tracks"
              onClick={(e) => handleScroll(e, '#tracks')}
              className="p-7 card-ruled flex flex-col justify-between group hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{STRINGS.about.cardTracksTag}</span>
                  </span>
                  <Smartphone className="w-5 h-5 group-hover:translate-x-1 transition-transform opacity-75" />
                </div>
                <h3 className="font-editorial text-3xl font-bold mb-2">{STRINGS.about.cardTracksTitle}</h3>
                <p className="text-xs text-[var(--lede)] leading-relaxed">
                  {STRINGS.about.cardTracksDesc}
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-xs font-mono uppercase font-bold tracking-wider group-hover:text-blue-600 transition-colors">
                <span>{STRINGS.about.cardTracksCta}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </a>

            {/* Card 2: Connect Cultures */}
            <a
              href="#connectcultures"
              onClick={(e) => handleScroll(e, '#connectcultures')}
              className="p-7 bg-[#030712] text-[#f8fafc] border border-white/15 hover:border-[#38bdf8]/60 flex flex-col justify-between group hover:-translate-y-1.5 transition-all duration-300 shadow-xl relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/40 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
                    <span>{STRINGS.about.cardCCTag}</span>
                  </span>
                  <Globe className="w-5 h-5 text-[#38bdf8] group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="font-editorial text-3xl font-bold text-white mb-2">{STRINGS.about.cardCCTitle}</h3>
                <p className="text-xs text-[#94a3b8] leading-relaxed">
                  {STRINGS.about.cardCCDesc}
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-xs font-mono uppercase font-bold tracking-wider text-[#38bdf8]">
                <span>{STRINGS.about.cardCCCta}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </a>

            {/* Card 3: LØST SØULS */}
            <a
              href="#lostsouls"
              onClick={(e) => handleScroll(e, '#lostsouls')}
              className="p-7 bg-[#000000] text-white border border-[#008cff]/35 hover:border-[#008cff] flex flex-col justify-between group hover:-translate-y-1.5 transition-all duration-300 shadow-xl relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 bg-[#008cff]/20 text-[#E0F7FF] border border-[#008cff]/50 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#008cff] animate-pulse" />
                    <span>{STRINGS.about.cardLSTag}</span>
                  </span>
                  <Music className="w-5 h-5 text-[#008cff] group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="font-editorial text-3xl font-bold text-[#E0F7FF] laser-glow-text mb-2">{STRINGS.about.cardLSTitle}</h3>
                <p className="text-xs text-[#cbd5e1] leading-relaxed">
                  {STRINGS.about.cardLSDesc}
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-xs font-mono uppercase font-bold tracking-wider text-[#008cff]">
                <span>{STRINGS.about.cardLSCta}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </a>

          </div>
        </div>

      </div>

      {/* Seamless transition into Tracks & Taps */}
      <div 
        className="absolute inset-x-0 bottom-0 h-40 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, var(--bg) 100%)',
        }}
        aria-hidden="true"
      />
    </section>
  )
}
