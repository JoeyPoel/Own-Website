import React from 'react'
import { motion } from 'framer-motion'
import { Quote, Star, CheckCircle, ExternalLink, ShieldCheck, Award } from 'lucide-react'
import type { Testimonial } from '../data/portfolioData'
import { STRINGS } from '../data/strings'

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

/**
 * TestimonialsSection ("the feedback part") styled with Framer Marketplace "Wall of Love" aesthetics:
 * Star rating capsule, trust metrics bar, company identity stamps, and verified endorsement pills.
 *
 * @param props.testimonials - Verified client and manager testimonials.
 * @returns {JSX.Element} Framer Wall of Love feedback section.
 */
export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps): React.JSX.Element {
  return (
    <section id="testimonials" className="py-24 sm:py-32 relative border-t border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] overflow-hidden">
      <div className="max-w-[1254px] mx-auto px-6 relative z-10">
        
        {/* Section Header with Trust Rating Capsule */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-bold tracking-[0.2em] font-mono uppercase px-3 py-1 bg-black/5 dark:bg-white/10 border border-[var(--line-strong)] inline-flex items-center gap-2 rounded-sm shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span>{STRINGS.testimonials.chapterBadge}</span>
              </span>
              <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 font-bold inline-flex items-center gap-1 rounded-sm">
                <CheckCircle className="w-3 h-3 text-emerald-500" />
                <span>{STRINGS.testimonials.verifiedReviewsPill}</span>
              </span>
            </div>

            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.04] tracking-tight mb-3">
              {STRINGS.testimonials.title}
            </h2>

            <p className="text-[var(--lede)] text-base sm:text-lg leading-relaxed">
              {STRINGS.testimonials.description}
            </p>
          </div>

          {/* Framer Star Rating Capsule */}
          <div className="p-4 bg-white/90 dark:bg-[#08070e]/90 backdrop-blur-xl border border-[var(--line-strong)] rounded-sm shadow-lg flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div className="border-t sm:border-t-0 sm:border-l border-[var(--line)] pt-2 sm:pt-0 sm:pl-4 text-center sm:text-left">
              <span className="block font-mono text-xs font-bold uppercase tracking-wider">
                {STRINGS.testimonials.ratingValue}
              </span>
              <a
                href={STRINGS.links.recommendations}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-mono text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 mt-0.5"
              >
                <span>{STRINGS.testimonials.ratingVerifyLink}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Testimonials 3-Column Framer Bento Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, idx) => {
            let trustBadge = STRINGS.testimonials.fallbackTrustBadge
            let initial = 'MK'
            let logoUrl = ''
            let projectRole = STRINGS.testimonials.fallbackRole

            if (testimonial.company.toLowerCase().includes('swap')) {
              trustBadge = STRINGS.testimonials.badgeSwap
              initial = 'MK'
              logoUrl = '/swapclub.jpg'
              projectRole = STRINGS.testimonials.roleSwap
            } else if (testimonial.company.toLowerCase().includes('dept')) {
              trustBadge = STRINGS.testimonials.badgeDept
              initial = 'RN'
              logoUrl = '/dept.jpg'
              projectRole = STRINGS.testimonials.roleDept
            } else if (testimonial.company.toLowerCase().includes('tata')) {
              trustBadge = STRINGS.testimonials.badgeTata
              initial = 'SO'
              logoUrl = '/tata.png'
              projectRole = STRINGS.testimonials.roleTata
            }

            return (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 sm:p-9 card-ruled flex flex-col justify-between group rounded-sm shadow-xl hover:-translate-y-2 hover:shadow-2xl hover:border-[var(--line-strong)] transition-all duration-300 relative overflow-hidden"
              >
                <div>
                  {/* Top Bar with Quote Icon and Project Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <Quote className="w-7 h-7 text-blue-500 opacity-60" />
                    <span className="text-[10px] font-mono uppercase px-2.5 py-1 bg-black/5 dark:bg-white/10 border border-[var(--line)] tracking-wider">
                      {trustBadge}
                    </span>
                  </div>

                  {/* 5-Star Micro Bar */}
                  <div className="flex items-center gap-1 mb-4 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Quote Body */}
                  <p className="text-sm sm:text-base leading-relaxed mb-8 italic text-[var(--lede)] font-sans">
                    "{testimonial.quote}"
                  </p>
                </div>

                {/* Author Info & Verified Company Badge */}
                <div className="border-t border-[var(--line)] pt-5 flex items-center gap-4">
                  <div className="w-11 h-11 border border-[var(--line-strong)] flex items-center justify-center font-bold text-xs font-mono shrink-0 overflow-hidden bg-black/5 dark:bg-white/5 rounded-full shadow-inner">
                    {logoUrl ? (
                      <img
                        src={logoUrl}
                        alt={`${testimonial.company} Logo`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-[var(--ink)]">{initial}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-editorial text-lg font-bold truncate">
                      {testimonial.author}
                    </h4>
                    <p className="text-xs text-[var(--lede)] truncate">
                      {testimonial.role} &bull; <span className="font-semibold text-[var(--ink)]">{testimonial.company}</span>
                    </p>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 block mt-0.5">
                      {projectRole}
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom Trust Directives Strip */}
        <div className="p-6 bg-white/60 dark:bg-black/40 border border-[var(--line)] rounded-sm grid grid-cols-1 sm:grid-cols-3 gap-6 text-center font-mono text-xs">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span>{STRINGS.testimonials.trustItem1}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Award className="w-4 h-4 text-blue-500" />
            <span>{STRINGS.testimonials.trustItem2}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <span>{STRINGS.testimonials.trustItem3}</span>
          </div>
        </div>

      </div>
    </section>
  )
}
