import { motion } from 'framer-motion'
import { Target, Shuffle, Send } from 'lucide-react'

export default function ProcessSection() {
  const steps = [
    {
      num: "01",
      icon: Target,
      title: "Kickoff & Scope",
      desc: "I align with you on a short 20-minute call to map out features, construct user flows, determine timelines, and establish fixed targets."
    },
    {
      num: "02",
      icon: Shuffle,
      title: "Iterative Build Sprints",
      desc: "Gain live access to staging applications and databases from week one. Rapid milestones with direct communication and zero red tape."
    },
    {
      num: "03",
      icon: Send,
      title: "Launch & Handoff",
      desc: "I deploy to the App Store, Google Play, or AWS cloud environments. Delivered with documentation and a week of post-launch monitoring."
    }
  ]

  return (
    <section id="process" className="py-24 relative border-t border-theme-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[11px] font-bold tracking-widest text-theme font-mono uppercase bg-theme-10 px-3 py-1 rounded-full border border-theme-20">
            Process Model
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-slate-850 mt-4 mb-4">
            How Working Together Looks
          </h2>
          <p className="text-slate-800 max-w-xl mx-auto text-sm md:text-base font-medium">
            No endless corporate meetings or administrative delays. Just speed, outcome-focused shipping milestones, and direct collaboration.
          </p>
        </div>

        {/* Connected Timeline Flow wrapped in a premium dashboard card */}
        <div className="relative mt-20 card-premium p-10 md:p-12 rounded-3xl shadow-lg">
          {/* Horizontal Line connector (Desktop only, positioned at center of step badges) */}
          <div className="hidden md:block absolute top-[88px] left-[15%] right-[15%] h-[1.5px] bg-gradient-to-r from-theme/20 via-theme/40 to-theme/20 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Step Circle Badge */}
                  <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-white border border-theme-30 shadow-lg group-hover:border-theme group-hover:shadow-theme-10 transition-all duration-300 mb-8 z-15">
                    {/* Pulsing overlay */}
                    <div className="absolute inset-0 rounded-full bg-theme-10 scale-100 group-hover:scale-110 transition-transform duration-300 opacity-0 group-hover:opacity-100" />
                    
                    <div className="flex flex-col items-center justify-center relative z-20">
                      <Icon className="w-5 h-5 text-theme mb-1 group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] font-mono font-bold text-slate-500 group-hover:text-theme transition-colors">
                        {step.num}
                      </span>
                    </div>
                  </div>

                  {/* Title & Desc */}
                  <div className="px-4">
                    <h3 className="text-lg font-bold text-slate-850 font-heading mb-3 group-hover:text-theme transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-slate-800 text-xs md:text-sm leading-relaxed font-sans max-w-xs mx-auto">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
