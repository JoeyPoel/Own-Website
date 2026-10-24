import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, ArrowRight, Radio, Sparkles, Flame } from 'lucide-react'
import LivingBlueGlow from './lostsouls/LivingBlueGlow'
import Noise from './lostsouls/Noise'
import WaitlistForm from './lostsouls/WaitlistForm'
import { STRINGS } from '../data/strings'

/**
 * LostSoulsSection:
 * Replicates the actual hero section from LostSouls-Events:
 * - Pure abyssal void (#000000) with LivingBlueGlow (Originkit Halftone Bloom WebGL2) & analog grain
 * - Monolithic "LØST SØULS" editorial headline with electric laser text glow
 * - Cryptic subtitle "SOMETHING BIG IS COMING..."
 * - Seamless interactive waitlist transmission gateway
 * - Joey's active venture as a techno rave organizer, seeking venue and production partners.
 *
 * @returns {JSX.Element} Lost Souls shopfront hero section.
 */
export default function LostSoulsSection(): React.JSX.Element {
  const handleScroll = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault()
    document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="lostsouls"
      className="relative min-h-screen w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center overflow-hidden bg-[#000000] text-white select-none"
    >
      {/* Living Ambient Halftone Bloom WebGL2 Canvas & Grain */}
      <LivingBlueGlow />
      <Noise />

      {/* Top Transition: Smooth intake from Connect Cultures deep space into underground abyss */}
      <div 
        className="absolute inset-x-0 top-0 h-64 sm:h-80 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to bottom, #000000 0%, rgba(2, 6, 17, 0.7) 45%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Centerpiece: Monolithic Brand Title + Subtitle + Waitlist Gateway */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center max-w-5xl mx-auto w-full my-auto py-6">
        
        {/* Chapter Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-6"
        >
          <span className="text-[10px] font-bold tracking-[0.2em] font-mono uppercase px-3 py-1 bg-white/5 border border-[#008cff]/40 inline-flex items-center gap-2 text-[#008cff] rounded-sm shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#008cff] animate-pulse" />
            <span>{STRINGS.lostsouls.chapterBadge}</span>
          </span>
          <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 bg-[#008cff]/15 text-[#E0F7FF] border border-[#008cff]/40 font-bold rounded-sm">
            {STRINGS.lostsouls.activeVenturePill}
          </span>
        </motion.div>

        {/* Monolithic Title with Laser Text Glow */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-editorial text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[9.5rem] font-bold tracking-[0.14em] sm:tracking-[0.2em] text-[#E0F7FF] uppercase laser-glow-text whitespace-nowrap transition-all duration-700 leading-none mb-4"
        >
          {STRINGS.lostsouls.brandTitle}
        </motion.h2>

        {/* Cryptic Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-3 sm:mt-5 font-mono text-xs sm:text-sm md:text-base tracking-[0.35em] sm:tracking-[0.55em] text-[#cbd5e1] uppercase opacity-85"
        >
          {STRINGS.lostsouls.subtitle}
        </motion.p>

        {/* Priority Waitlist Transmission Gateway */}
        <WaitlistForm />

        {/* Founder Narrative & Vision Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 sm:mt-12 p-7 sm:p-9 rounded-sm border border-[#008cff]/35 bg-[#050508]/92 backdrop-blur-xl max-w-2xl text-left shadow-[0_0_40px_rgba(0,140,255,0.2)]"
        >
          <div className="flex items-center gap-2 mb-3 text-xs font-mono tracking-widest text-[#008cff] uppercase font-bold">
            <Radio className="w-4 h-4 animate-pulse" />
            <span>{STRINGS.lostsouls.founderVisionTitle}</span>
          </div>
          <p className="text-xs sm:text-sm text-[#e2e8f0] leading-relaxed mb-5">
            {STRINGS.lostsouls.founderVisionDesc}
          </p>
          <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-[#cbd5e1]">
            {STRINGS.lostsouls.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-1 bg-white/5 border border-white/10 font-medium">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Minimalist Action Triggers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <a
            href={STRINGS.lostsouls.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#0055ff] via-[#008cff] to-[#0055ff] text-black font-mono text-xs font-bold uppercase tracking-widest shadow-[0_0_25px_rgba(0,140,255,0.5)] hover:shadow-[0_0_40px_rgba(0,140,255,0.85)] hover:brightness-110 transition-all duration-300"
          >
            <ExternalLink className="w-4 h-4" />
            <span>{STRINGS.lostsouls.btnVisitSite}</span>
          </a>

          <button
            onClick={(e) => handleScroll(e, '#contact')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-black/80 text-[#E0F7FF] border border-white/20 hover:border-[#008cff] hover:text-[#008cff] hover:shadow-[0_0_25px_rgba(0,140,255,0.3)] font-mono text-xs font-bold uppercase tracking-widest backdrop-blur-sm transition-all duration-300"
          >
            <span>{STRINGS.lostsouls.btnCoOrganize}</span>
            <ArrowRight className="w-4 h-4 text-[#008cff]" />
          </button>
        </motion.div>
      </div>

      {/* Bottom Telemetry Strip */}
      <div className="relative z-20 w-full max-w-4xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[#94a3b8] font-mono text-[10px] tracking-[0.25em] uppercase">
        <div className="flex items-center gap-2">
          <Flame className="w-3.5 h-3.5 text-[#008cff]" />
          <span>{STRINGS.lostsouls.telemetryCommunity}</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#008cff]" />
          <span>{STRINGS.lostsouls.telemetryScenography}</span>
        </div>
        <button
          type="button"
          onClick={(e) => handleScroll(e, '#creative-offerings')}
          className="hover:text-[#008cff] transition-colors cursor-pointer"
        >
          {STRINGS.lostsouls.telemetryScrollNext}
        </button>
      </div>

      {/* Outbound Transition: Deep black rave void seamlessly dissolving back into normal canvas */}
      <div 
        className="absolute inset-x-0 bottom-0 h-72 sm:h-96 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.35) 30%, rgba(0, 0, 0, 0.8) 60%, var(--bg) 100%)',
        }}
        aria-hidden="true"
      />
    </section>
  )
}
