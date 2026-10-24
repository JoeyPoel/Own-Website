import React from 'react'
import { motion } from 'framer-motion'
import { Landmark, Compass, Award, TrendingUp, Download, ArrowRight, Smartphone, Sparkles, ChevronRight } from 'lucide-react'
import { STRINGS } from '../data/strings'

/**
 * TracksSection styled with minimalist luxury dark theme:
 * Showcases the published iOS app, authentic iPhone device displays with Dynamic Island,
 * and a prominent callout for a marketing and growth co-pilot.
 *
 * @returns {JSX.Element} Tracks & Taps shopfront section.
 */
export default function TracksSection(): React.JSX.Element {
  const screenshots = STRINGS.tracks.screenshots

  const handleScroll = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault()
    document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="tracks" className="relative min-h-screen pt-24 pb-36 sm:pt-32 sm:pb-48 overflow-hidden bg-[var(--bg)] text-[var(--ink)]">
      {/* Subtle Minimalist Ambient Lighting & Subtle Grid Depth */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Soft Emerald / Cyan Ambient Depth Accent for Tracks & Taps */}
        <div 
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[550px] opacity-20 blur-[140px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.28) 0%, rgba(56, 189, 248, 0.12) 45%, transparent 75%)',
          }}
        />

        {/* Minimalist Micro Dot Architecture */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />

        {/* Smooth Outbound Gradient Blending seamlessly into Connect Cultures (#030712) */}
        <div 
          className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, #030712 100%)',
          }}
        />
      </div>

      <div className="max-w-[1254px] mx-auto px-6 relative z-10">
        
        {/* Header Block: Product Headline & iOS Badges */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'tween', ease: 'easeOut', duration: 0.5 }}
            className="max-w-2xl p-8 sm:p-10 card-ruled shadow-2xl rounded-sm"
          >
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-[10px] font-bold tracking-[0.2em] font-mono uppercase px-3 py-1 bg-white/5 border border-[var(--line-strong)] inline-flex items-center gap-1.5 rounded-sm shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span>{STRINGS.tracks.chapterBadge}</span>
              </span>
              <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 bg-blue-500/15 text-blue-300 border border-blue-400/30 font-bold inline-flex items-center gap-1.5 rounded-sm">
                <Smartphone className="w-3 h-3" />
                <span>{STRINGS.tracks.liveStatus}</span>
              </span>
            </div>

            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.04] tracking-tight mb-3">
              {STRINGS.tracks.title}
            </h2>

            <p className="text-sm sm:text-base font-mono font-medium opacity-90 mb-3 text-blue-400">
              {STRINGS.tracks.tagline}
            </p>

            <p className="text-[var(--lede)] text-sm sm:text-base leading-relaxed mb-6">
              {STRINGS.tracks.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={STRINGS.links.appStore}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-originkit text-xs shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>{STRINGS.tracks.btnDownload}</span>
              </a>
              <button
                onClick={(e) => handleScroll(e, '#contact')}
                className="btn-originkit-outline text-xs"
              >
                <span>{STRINGS.tracks.btnPartner}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Key Metrics Floating Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'tween', ease: 'easeOut', duration: 0.5 }}
            className="flex gap-4 shrink-0"
          >
            <div className="p-6 card-ruled shadow-xl text-center min-w-[145px] rounded-sm">
              <span className="block font-editorial text-3xl sm:text-4xl font-bold">{STRINGS.tracks.metricSoloTitle}</span>
              <span className="text-[10px] font-mono uppercase tracking-wider opacity-70 mt-1 block">{STRINGS.tracks.metricSoloDesc}</span>
            </div>
            <div className="p-6 card-ruled shadow-xl text-center min-w-[145px] rounded-sm">
              <span className="block font-editorial text-3xl sm:text-4xl font-bold">{STRINGS.tracks.metricIosTitle}</span>
              <span className="text-[10px] font-mono uppercase tracking-wider opacity-70 mt-1 block">{STRINGS.tracks.metricIosDesc}</span>
            </div>
          </motion.div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 card-ruled shadow-md rounded-sm hover:border-[var(--line-strong)] transition-colors">
            <Compass className="w-5 h-5 mb-3 opacity-90 text-blue-400" />
            <h3 className="font-mono text-xs uppercase tracking-wider font-bold mb-2">{STRINGS.tracks.inspiredTitle}</h3>
            <p className="text-xs text-[var(--lede)] leading-relaxed">
              {STRINGS.tracks.inspiredDesc}
            </p>
          </div>
          <div className="p-6 card-ruled shadow-md rounded-sm hover:border-[var(--line-strong)] transition-colors">
            <Award className="w-5 h-5 mb-3 opacity-90 text-blue-400" />
            <h3 className="font-mono text-xs uppercase tracking-wider font-bold mb-2">{STRINGS.tracks.soloTitle}</h3>
            <p className="text-xs text-[var(--lede)] leading-relaxed">
              {STRINGS.tracks.soloDesc}
            </p>
          </div>
          <div className="p-6 card-ruled shadow-md rounded-sm hover:border-[var(--line-strong)] transition-colors">
            <Landmark className="w-5 h-5 mb-3 opacity-90 text-blue-400" />
            <h3 className="font-mono text-xs uppercase tracking-wider font-bold mb-2">{STRINGS.tracks.aiWorkflowTitle}</h3>
            <p className="text-xs text-[var(--lede)] leading-relaxed">
              {STRINGS.tracks.aiWorkflowDesc}
            </p>
          </div>
        </div>

        {/* Marketing Partner Callout Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'tween', ease: 'easeOut', duration: 0.5 }}
          className="p-8 sm:p-10 card-ruled border-2 border-[var(--line-strong)] mb-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl rounded-sm"
        >
          <div className="flex items-start gap-5">
            <div className="p-3.5 bg-white/5 border border-[var(--line)] shrink-0">
              <TrendingUp className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 bg-white/5 border border-[var(--line)]">
                  {STRINGS.tracks.partnerBadge}
                </span>
                <h4 className="font-editorial text-2xl sm:text-3xl font-bold">
                  {STRINGS.tracks.partnerNeedTitle}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-[var(--lede)] max-w-2xl leading-relaxed">
                {STRINGS.tracks.partnerNeedDesc}
              </p>
            </div>
          </div>
          <button
            onClick={(e) => handleScroll(e, '#contact')}
            className="btn-originkit text-xs py-3.5 px-6 shrink-0"
          >
            <span>{STRINGS.tracks.btnDiscussPartner}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Authentic iPhone Displays Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'tween', ease: 'easeOut', duration: 0.6 }}
          className="relative"
        >
          <div className="flex items-center justify-between border-b border-[var(--line-strong)] pb-3 mb-10">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-mono tracking-[0.2em] uppercase font-bold">
                {STRINGS.tracks.galleryTitle}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono opacity-70">
              <span>{STRINGS.tracks.galleryScrollHint}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Realistic iPhone Phone Mockups Row */}
          <div className="flex gap-6 sm:gap-8 overflow-x-auto pb-8 pt-2 scrollbar-thin scrollbar-thumb-blue-500/30 scrollbar-track-transparent snap-x">
            {screenshots.map((img) => (
              <div
                key={img.title}
                className="shrink-0 w-[270px] sm:w-[290px] flex flex-col items-center group snap-center"
              >
                {/* iPhone Chassis Container */}
                <div className="relative w-full bg-[#0b0c13] border-[6px] border-[#222436] rounded-[44px] p-2.5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.85)] border-b-[8px] hover:-translate-y-3 transition-all duration-500 hover:shadow-[0_30px_60px_-12px_rgba(56,189,248,0.25)] hover:border-[#38bdf8]/40">
                  
                  {/* Dynamic Island Pill with Camera & Sensor */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-30 shadow-md flex items-center justify-end px-2">
                    {/* Camera Lens Reflection */}
                    <span className="w-2 h-2 rounded-full bg-[#1a1a2e] border border-blue-400/40 inline-block" />
                  </div>

                  {/* Speaker Ear Piece Slit */}
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-10 h-1 bg-slate-700/50 rounded-full z-30" />

                  {/* High-Resolution Screen Container */}
                  <div className="rounded-[32px] overflow-hidden aspect-[9/19.5] bg-black border border-slate-800 relative">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 group-hover:scale-[1.03]"
                      loading="lazy"
                    />

                    {/* Subtle Glass Light Glare Reflection */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none opacity-40 group-hover:opacity-75 transition-opacity duration-500" />
                  </div>
                </div>

                {/* Caption Card Beneath Each Device */}
                <div className="mt-4 text-center px-2">
                  <div className="inline-block px-2 py-0.5 mb-1 bg-black/5 dark:bg-white/10 border border-[var(--line)] text-[9px] font-mono uppercase tracking-wider">
                    {img.tag}
                  </div>
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
                    {img.title}
                  </h4>
                  <p className="text-[11px] text-[var(--lede)] mt-0.5">
                    {img.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
