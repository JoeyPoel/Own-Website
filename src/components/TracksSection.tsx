import { motion } from 'framer-motion'
import { Landmark, Compass, Award } from 'lucide-react'
import { STRINGS } from '../data/strings'

export default function TracksSection() {
  const screenshots = [
    { src: '/tracks1.png', alt: 'Adventure Join screen' },
    { src: '/tracks2.png', alt: 'Stop challenges screen' },
    { src: '/tracks3.png', alt: 'Amsterdam Map overlay' },
    { src: '/tracks4.png', alt: 'Explore screen' }
  ]

  return (
    <section id="tracks" className="py-24 relative border-t border-theme-20">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'tween', ease: 'easeOut', duration: 0.5 }}
            className="max-w-2xl transform-gpu will-change-transform"
          >
            <span className="text-[11px] font-bold tracking-widest text-theme font-mono uppercase bg-theme-10 px-3 py-1 rounded-full border border-theme-20 w-max">
              {STRINGS.tracks.badge}
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-slate-850 mt-4 mb-4 drop-shadow-sm">
              {STRINGS.tracks.title}
            </h2>
            <p className="text-slate-650 text-sm md:text-base leading-relaxed">
              {STRINGS.tracks.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={STRINGS.links.appStore}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-theme hover:brightness-110 text-white font-bold text-xs tracking-wider transition-all shadow-theme-10 hover:-translate-y-0.5"
              >
                <span>Download on App Store</span>
              </a>
            </div>
          </motion.div>

          {/* Key Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'tween', ease: 'easeOut', duration: 0.5 }}
            className="flex gap-4 transform-gpu will-change-transform"
          >
            <div className="px-5 py-3 rounded-2xl bg-white/60 border border-theme-20 text-center shadow-xs">
              <span className="block text-xl font-extrabold text-theme font-mono">{STRINGS.tracks.metricSoloTitle}</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase font-mono tracking-wider">{STRINGS.tracks.metricSoloDesc}</span>
            </div>
            <div className="px-5 py-3 rounded-2xl bg-white/60 border border-theme-20 text-center shadow-xs">
              <span className="block text-xl font-extrabold text-theme font-mono">{STRINGS.tracks.metricIosTitle}</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase font-mono tracking-wider">{STRINGS.tracks.metricIosDesc}</span>
            </div>
          </motion.div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-white/50 border border-theme-10 shadow-xs">
            <Compass className="w-5 h-5 text-theme mb-3" />
            <h3 className="font-bold text-slate-800 text-sm font-mono uppercase tracking-wide mb-2">{STRINGS.tracks.inspiredTitle}</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              {STRINGS.tracks.inspiredDesc}
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/50 border border-theme-10 shadow-xs">
            <Award className="w-5 h-5 text-theme mb-3" />
            <h3 className="font-bold text-slate-800 text-sm font-mono uppercase tracking-wide mb-2">{STRINGS.tracks.soloTitle}</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              {STRINGS.tracks.soloDesc}
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/50 border border-theme-10 shadow-xs">
            <Landmark className="w-5 h-5 text-theme mb-3" />
            <h3 className="font-bold text-slate-800 text-sm font-mono uppercase tracking-wide mb-2">{STRINGS.tracks.aiWorkflowTitle}</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              {STRINGS.tracks.aiWorkflowDesc}
            </p>
          </div>
        </div>

        {/* Horizontal Screenshot Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'tween', ease: 'easeOut', duration: 0.6 }}
          className="flex gap-6 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-theme scrollbar-track-transparent snap-x transform-gpu will-change-transform"
        >
          {screenshots.map((img, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-64 md:w-72 bg-white border-[7px] border-slate-200 rounded-[38px] p-2 shadow-xl snap-center hover:-translate-y-2 transition-transform duration-300 relative border-b-[8px]"
            >
              {/* Dynamic Island / Notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-slate-900 rounded-full z-20" />
              
              {/* Screen container */}
              <div className="rounded-[26px] overflow-hidden aspect-[9/19.5] bg-white border border-slate-100 relative">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover select-none pointer-events-none"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
