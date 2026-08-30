import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Quote } from 'lucide-react'
import type { Testimonial } from '../data/portfolioData'
import { STRINGS } from '../data/strings'

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
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
    <section id="testimonials" className="py-24 relative bg-dot-pattern border-t border-theme-20">

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
            {STRINGS.testimonials.badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-slate-850 mt-4 mb-4">
            {STRINGS.testimonials.title}
          </h2>
          <p className="text-slate-650 max-w-xl mx-auto text-sm md:text-base">
            {STRINGS.testimonials.description}
          </p>
          <div className="mt-4">
            <a
              href={STRINGS.links.recommendations}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-theme hover:underline font-mono uppercase tracking-wider"
            >
              <span>Verify Legitimacy on LinkedIn</span>
              <span className="font-sans">→</span>
            </a>
          </div>
        </motion.div>
 
        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => {
            return (
              <motion.div
                key={testimonial.id}
                variants={cardVariants}
                className="card-premium p-8 rounded-2xl flex flex-col justify-between hover:border-theme-30 hover:shadow-theme-10 transition-all duration-300"
              >
                <div>
                  <Quote className="w-8 h-8 text-theme opacity-30 mb-6" />
                  <p className="text-slate-700 text-sm leading-relaxed mb-8 italic font-sans">
                    "{testimonial.quote}"
                  </p>
                </div>
 
                <div className="border-t border-theme-20 pt-4">
                  <h4 className="text-sm font-bold text-slate-850 font-heading">
                    {testimonial.author}
                  </h4>
                  <p className="text-[11px] font-mono text-slate-500 mt-0.5 uppercase">
                    {testimonial.role} &bull; {testimonial.company}
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
