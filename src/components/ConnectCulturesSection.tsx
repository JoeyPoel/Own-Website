import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ExternalLink, ArrowRight, Compass, Users2, Globe2 } from 'lucide-react'
import Starfield from './connectcultures/Starfield'
import GrainOverlay from './connectcultures/GrainOverlay'
import InteractiveGlobe from './connectcultures/InteractiveGlobe'
import { STRINGS } from '../data/strings'

/**
 * ConnectCulturesSection:
 * Replicates the actual hero section from ConnectCultures.world:
 * - Deep space void (#030712) with sparkling cosmic Starfield & analog film grain
 * - Monolithic editorial serif headline ("CONNECT CULTURES.")
 * - Seamless photorealistic 3D Earth globe (TerraDusk WebGL on desktop, high-res fallback on mobile)
 * - Joey's founder ambition and dream company vision, seeking co-founders and strategic partners.
 *
 * @returns {JSX.Element} Connect Cultures shopfront hero section.
 */
export default function ConnectCulturesSection(): React.JSX.Element {
  const handleScroll = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault()
    document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="connectcultures"
      className="relative min-h-screen w-full py-24 sm:py-32 px-6 lg:px-12 flex flex-col justify-center items-center overflow-hidden bg-[#030712] text-[#f8fafc] select-none"
    >
      {/* Living Atmospheric Canvas Layers Scoped Exclusively to Connect Cultures Hero */}
      <Starfield />
      <GrainOverlay />

      {/* Top Transition: Stratosphere dusk feathering from Tracks & Taps */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#030712] via-[#030712]/80 to-transparent pointer-events-none z-10" />

      <div className="max-w-[1254px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-20 my-auto">
        {/* Left Column: Monolithic Editorial Headline & Founder Mission Directives */}
        <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
          
          {/* Chapter Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center gap-2 mb-6"
          >
            <span className="text-[10px] font-bold tracking-[0.2em] font-mono uppercase px-3 py-1 bg-white/5 border border-white/20 inline-flex items-center gap-2 text-[#38bdf8] rounded-sm shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
              <span>{STRINGS.connectCultures.chapterBadge}</span>
            </span>
            <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/40 font-bold rounded-sm">
              {STRINGS.connectCultures.lookingForBadge}
            </span>
          </motion.div>

          {/* Monolithic Editorial Serif Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#f8fafc] leading-[1.02] mb-4 sm:mb-6"
          >
            {STRINGS.connectCultures.brandFirst}
            <br />
            <span className="text-[#38bdf8] italic">{STRINGS.connectCultures.brandSecond}</span>
          </motion.h2>

          {/* Mobile Globe Presentation (visible on mobile/tablet) */}
          <div className="lg:hidden w-full flex items-center justify-center my-6">
            <InteractiveGlobe className="w-full" />
          </div>

          {/* Cultural Manifesto */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-sans text-base sm:text-lg lg:text-xl text-[#f8fafc] max-w-lg font-light leading-relaxed mb-4 sm:mb-6"
          >
            {STRINGS.connectCultures.tagline}
            <span className="block mt-2 text-[#94a3b8] text-sm sm:text-base font-normal">
              {STRINGS.connectCultures.description}
            </span>
          </motion.p>

          {/* Founder Ambition & Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="p-6 sm:p-7 rounded-sm border border-[#38bdf8]/30 bg-[#060c1a]/90 backdrop-blur-xl mb-8 max-w-lg text-left shadow-[0_0_35px_rgba(56,189,248,0.15)]"
          >
            <div className="flex items-center gap-2 mb-2.5 text-xs font-mono tracking-wider text-[#38bdf8] uppercase font-bold">
              <Compass className="w-4 h-4" />
              <span>{STRINGS.connectCultures.founderVisionTitle}</span>
            </div>
            <p className="text-xs sm:text-sm text-[#e2e8f0] leading-relaxed">
              {STRINGS.connectCultures.founderVisionDesc}
            </p>
          </motion.div>

          {/* Primary Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
          >
            <a
              href={STRINGS.connectCultures.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#0066cc] hover:bg-[#38bdf8] hover:text-black text-white font-medium text-xs tracking-wider uppercase transition-all duration-300 shadow-[0_0_25px_rgba(56,189,248,0.4)] hover:shadow-[0_0_35px_rgba(56,189,248,0.7)]"
            >
              <ExternalLink className="w-4 h-4" />
              <span>{STRINGS.connectCultures.btnExploreLive}</span>
            </a>

            <button
              onClick={(e) => handleScroll(e, '#contact')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/20 text-[#f8fafc] hover:border-[#38bdf8]/60 font-medium text-xs tracking-wider uppercase backdrop-blur-md transition-all duration-300"
            >
              <span>{STRINGS.connectCultures.btnCoFound}</span>
              <ArrowRight className="w-4 h-4 text-[#38bdf8]" />
            </button>
          </motion.div>
        </div>

        {/* Right Column: Seamless 3D Earth Globe on Desktop */}
        <div className="hidden lg:flex lg:col-span-6 w-full items-center justify-center relative min-h-[500px] lg:min-h-[620px]">
          <InteractiveGlobe className="w-full h-full" />
        </div>
      </div>

      {/* Philosophy Pillars Strip */}
      <div className="w-full max-w-[1254px] mx-auto mt-16 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-20">
        <div className="p-6 border border-white/10 bg-[#060c1a]/85 backdrop-blur-md hover:border-[#38bdf8]/40 transition-colors">
          <div className="flex items-center gap-2 mb-2 text-[#38bdf8]">
            <Globe2 className="w-4 h-4" />
            <span className="font-mono text-xs uppercase tracking-wider font-bold">{STRINGS.connectCultures.pillar1Title}</span>
          </div>
          <p className="text-xs text-[#cbd5e1] leading-relaxed">
            {STRINGS.connectCultures.pillar1Desc}
          </p>
        </div>

        <div className="p-6 border border-white/10 bg-[#060c1a]/85 backdrop-blur-md hover:border-[#38bdf8]/40 transition-colors">
          <div className="flex items-center gap-2 mb-2 text-[#38bdf8]">
            <Users2 className="w-4 h-4" />
            <span className="font-mono text-xs uppercase tracking-wider font-bold">{STRINGS.connectCultures.pillar2Title}</span>
          </div>
          <p className="text-xs text-[#cbd5e1] leading-relaxed">
            {STRINGS.connectCultures.pillar2Desc}
          </p>
        </div>

        <div className="p-6 border border-white/10 bg-[#060c1a]/85 backdrop-blur-md hover:border-[#38bdf8]/40 transition-colors">
          <div className="flex items-center gap-2 mb-2 text-[#38bdf8]">
            <Sparkles className="w-4 h-4" />
            <span className="font-mono text-xs uppercase tracking-wider font-bold">{STRINGS.connectCultures.pillar3Title}</span>
          </div>
          <p className="text-xs text-[#cbd5e1] leading-relaxed">
            {STRINGS.connectCultures.pillar3Desc}
          </p>
        </div>
      </div>

      {/* Bottom Transition: Deep space easing into Lost Souls pure abyss */}
      <div 
        className="absolute inset-x-0 bottom-0 h-64 sm:h-80 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(3, 7, 18, 0.35) 30%, rgba(2, 6, 17, 0.85) 65%, #000000 100%)',
        }}
        aria-hidden="true"
      />
    </section>
  )
}
