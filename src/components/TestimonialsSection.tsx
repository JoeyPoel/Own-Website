import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Quote } from 'lucide-react'
import type { Testimonial } from '../data/portfolioData'

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
          <span className="text-[11px] font-bold tracking-widest text-sky-600 font-mono uppercase bg-sky-500/5 px-3 py-1 rounded-full border border-sky-500/10">
            Endorsements
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-slate-850 mt-4 mb-4">
            Feedback from Past Teams
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto text-sm md:text-base">
            Real recommendations from clients and managers at DEPT®, SwapClub, and Tata Steel.
          </p>
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
                className="card-premium p-8 rounded-2xl flex flex-col justify-between hover:border-sky-300 transition-all duration-300"
              >
                <div>
                  <Quote className="w-8 h-8 text-sky-550/20 mb-6" />
                  <p className="text-slate-700 text-sm leading-relaxed mb-8 italic font-sans">
                    "{testimonial.quote}"
                  </p>
                </div>

                <div className="border-t border-sky-100 pt-4">
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
