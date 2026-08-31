import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Smartphone, Zap, Sparkles } from 'lucide-react'
import type { Service } from '../data/portfolioData'
import { STRINGS } from '../data/strings'

const iconsMap = {
  '1': Smartphone,
  '2': Zap,
  '3': Sparkles,
}

interface ServicesSectionProps {
  services: Service[]
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'tween', ease: 'easeOut', duration: 0.4 },
    },
  }

  return (
    <section id="services" className="py-24 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.5 }}
        className="max-w-7xl mx-auto px-6 relative z-10 transform-gpu will-change-transform"
      >
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[11px] font-bold tracking-widest text-theme font-mono uppercase bg-theme-10 px-3 py-1 rounded-full">
            {STRINGS.services.badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-slate-850 mt-4 mb-4 drop-shadow-sm">
            {STRINGS.services.title}
          </h2>
          <p className="text-slate-650 max-w-xl mx-auto text-sm md:text-base font-sans">
            {STRINGS.services.description}
          </p>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = iconsMap[(index + 1).toString() as keyof typeof iconsMap] || Sparkles
            return (
              <div
                key={service.id}
                className="card-premium p-8 rounded-2xl flex flex-col justify-between hover:border-white hover:shadow-theme-10 transition-all duration-300 group"
              >
                <div>
                  <div className="mb-6">
                    <div className="w-max p-3 bg-white/80 border border-white/80 rounded-xl text-theme group-hover:scale-110 transition-transform shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold font-heading text-slate-850 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-slate-700 text-sm leading-relaxed mb-6 font-sans">
                    {service.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
