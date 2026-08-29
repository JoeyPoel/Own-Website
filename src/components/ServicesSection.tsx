import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Smartphone, Zap, Sparkles } from 'lucide-react'
import type { Service } from '../data/portfolioData'

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
      transition: { type: 'spring', stiffness: 120, damping: 20 },
    },
  }

  return (
    <section id="services" className="py-24 relative bg-dot-pattern border-t border-zinc-900">
      <div className="absolute inset-0 bg-gradient-to-b from-[#09090b] via-transparent to-[#09090b] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-[11px] font-bold tracking-widest text-emerald-400 font-mono uppercase bg-emerald-500/5 px-3 py-1 rounded-full border border-emerald-500/10">
            Consultancy
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-white mt-4 mb-4">
            How I Help Businesses Ship & Automate
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto text-sm md:text-base">
            Structured development models targeting fast deliveries and measurable administrative hour savings.
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
          {services.map((service) => {
            const Icon = iconsMap[service.id as keyof typeof iconsMap] || Sparkles
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className="card-premium p-8 rounded-2xl flex flex-col justify-between hover:border-zinc-700 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-emerald-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-semibold font-mono text-zinc-400 bg-zinc-900 border border-zinc-850 px-2.5 py-1 rounded-full">
                      {service.timeframe}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-heading text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-sans">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
