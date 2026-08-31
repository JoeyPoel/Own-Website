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
      transition: { type: 'tween', ease: 'easeOut', duration: 0.4 },
    },
  }

  return (
    <section id="testimonials" className="py-24 relative bg-dot-pattern border-t border-theme-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.5 }}
        className="max-w-7xl mx-auto px-6 relative z-10 transform-gpu will-change-transform"
      >
        
        {/* Section Header */}
        <div className="text-center mb-16">
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
        </div>
 
        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => {
            // Define custom outcome badges and avatars based on the company
            let trustBadge = ""
            let avatarBg = "bg-theme-10 text-theme"
            let initial = "JD"
            let logoUrl = ""
            
            if (testimonial.company.toLowerCase().includes('swap')) {
              trustBadge = "Circular App MVP Launched"
              avatarBg = "bg-white border border-slate-200"
              initial = "MK"
              logoUrl = "/swapclub.jpg"
            } else if (testimonial.company.toLowerCase().includes('dept')) {
              trustBadge = "Computer Vision MVP Shipped"
              avatarBg = "bg-black border border-slate-800"
              initial = "RN"
              logoUrl = "/dept.jpg"
            } else if (testimonial.company.toLowerCase().includes('tata')) {
              trustBadge = "90% Process Overhead Reduced"
              avatarBg = "bg-white border border-slate-200"
              initial = "SO"
              logoUrl = "/tata.png"
            }

            return (
              <div
                key={testimonial.id}
                className="card-premium p-8 rounded-2xl flex flex-col justify-between hover:border-theme-30 hover:shadow-theme-10 transition-all duration-300 relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <Quote className="w-8 h-8 text-theme opacity-30" />
                    {trustBadge && (
                      <span className="text-[9px] font-bold font-mono px-2.5 py-1 rounded-full bg-slate-900 text-white shadow-xs tracking-wider uppercase">
                        {trustBadge}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed mb-8 italic font-sans">
                    "{testimonial.quote}"
                  </p>
                </div>
 
                <div className="border-t border-theme-20 pt-4 flex items-center gap-3">
                  {/* Clean Initial Avatar or Company Logo */}
                  <div className={`w-10 h-10 rounded-full ${avatarBg} flex items-center justify-center font-bold text-xs font-mono shadow-inner flex-shrink-0 overflow-hidden`}>
                    {logoUrl ? (
                      <img 
                        src={logoUrl} 
                        alt={`${testimonial.company} Logo`} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      initial
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-850 font-heading">
                      {testimonial.author}
                    </h4>
                    <p className="text-[10px] font-mono text-slate-500 mt-0.5 uppercase">
                      {testimonial.role} &bull; {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
