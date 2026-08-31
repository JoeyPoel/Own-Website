import { motion } from 'framer-motion'
import { Sparkles, Smartphone } from 'lucide-react'
import { STRINGS } from '../data/strings'

export default function AboutSection() {
  return (
    <section id="about" className="py-24 relative border-t border-theme-20">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Column: Advertisement */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'tween', ease: 'easeOut', duration: 0.6 }}
            className="flex-1 flex flex-col gap-6 transform-gpu will-change-transform"
          >
            <span className="text-[11px] font-bold tracking-widest text-theme font-mono uppercase bg-theme-10 px-3 py-1 rounded-full border border-theme-20 w-max">
              {STRINGS.about.badge}
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-slate-850">
              {STRINGS.about.title}
            </h2>
            <p className="text-slate-650 text-sm md:text-base leading-relaxed">
              {STRINGS.about.description}
            </p>

            <div className="flex flex-col gap-4 mt-4">
              <div className="flex gap-4 p-5 rounded-2xl bg-white/60 border border-theme-20 shadow-sm">
                <div className="p-3 bg-theme-10 text-theme rounded-xl h-max">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wider mb-1 font-mono">{STRINGS.about.mobileAppsTitle}</h3>
                  <p className="text-slate-650 text-xs md:text-sm leading-relaxed">
                    {STRINGS.about.mobileAppsDesc}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-5 rounded-2xl bg-white/60 border border-theme-20 shadow-sm">
                <div className="p-3 bg-theme-10 text-theme rounded-xl h-max">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wider mb-1 font-mono">{STRINGS.about.aiAutomationsTitle}</h3>
                  <p className="text-slate-650 text-xs md:text-sm leading-relaxed">
                    {STRINGS.about.aiAutomationsDesc}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'tween', ease: 'easeOut', duration: 0.6 }}
            className="w-full lg:w-[420px] flex-shrink-0 flex justify-center transform-gpu will-change-transform"
          >
            <div className="relative group max-w-sm lg:max-w-none">
              {/* Dynamic scroll-colored glow border */}
              <div className="absolute -inset-1.5 bg-theme rounded-2xl opacity-15 blur-sm transition duration-1000 group-hover:opacity-30" />
              
              <div className="relative rounded-2xl overflow-hidden border border-theme-20 shadow-xl bg-white/80 p-3">
                <img 
                  src="/joey.jpg" 
                  alt="Joey van der Poel" 
                  className="rounded-xl w-full h-[380px] lg:h-[460px] object-cover object-top shadow-inner filter brightness-105"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
