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
  loading?: boolean
}

export default function ServicesSection({ services, loading }: ServicesSectionProps) {
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
      transition: { type: 'spring', stiffness: 120, damping: 20 },
    },
  }

  return (
    <section id="services" className="py-24 relative border-t border-theme-20">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-[11px] font-bold tracking-widest text-theme font-mono uppercase bg-theme-10 px-3 py-1 rounded-full border border-theme-20">
            {STRINGS.services.badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-slate-850 mt-4 mb-4 drop-shadow-sm">
            {STRINGS.services.title}
          </h2>
          <p className="text-slate-650 max-w-xl mx-auto text-sm md:text-base font-sans">
            {STRINGS.services.description}
          </p>
        </motion.div>

        {/* Services Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={`skeleton-service-${index}`}
                className="card-premium p-8 rounded-2xl flex flex-col justify-between border border-theme-20 relative overflow-hidden bg-white/40 backdrop-blur-sm"
              >
                <div>
                  <div className="mb-6">
                    <div className="w-12 h-12 bg-slate-200/60 animate-pulse rounded-xl" />
                  </div>
                  <div className="w-2/3 h-5 bg-slate-200/60 animate-pulse rounded mb-4" />
                  <div className="space-y-2">
                    <div className="w-full h-3.5 bg-slate-100/60 animate-pulse rounded" />
                    <div className="w-5/6 h-3.5 bg-slate-100/60 animate-pulse rounded" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            services.map((service, index) => {
              const Icon = iconsMap[(index + 1).toString() as keyof typeof iconsMap] || Sparkles
              return (
                <motion.div
                  key={service.id}
                  variants={cardVariants}
                  className="card-premium p-8 rounded-2xl flex flex-col justify-between hover:border-theme-30 hover:shadow-theme-10 transition-all duration-300 group"
                >
                  <div>
                    <div className="mb-6">
                      <div className="w-max p-3 bg-white/80 border border-theme-30 rounded-xl text-theme group-hover:scale-110 transition-transform shadow-xs">
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
                </motion.div>
              )
            })
          )}
        </motion.div>
      </div>
    </section>
  )
}
