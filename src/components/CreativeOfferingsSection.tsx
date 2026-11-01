import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Globe,
  Smartphone,
  Cpu,
  ArrowRight,
  Check,
  Zap,
  Eye,
  X,
  ExternalLink,
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const iconMap: Record<string, React.ElementType> = {
  web: Globe,
  mobile: Smartphone,
  ai: Cpu,
}

/**
 * CreativeOfferingsSection:
 * Holographic hairline cards, live metrics, tech stack tags,
 * inline selected work previews, and an interactive Work Showcase modal.
 *
 * @returns {React.JSX.Element} Interactive creative offerings section.
 */
export default function CreativeOfferingsSection(): React.JSX.Element {
  const { strings } = useLanguage()
  const offerings = strings.creativity.offerings

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [activeCategory, setActiveCategory] = useState<string>('all')

  /**
   * Opens the Work Showcase Modal for a selected category.
   *
   * @param {string} [categoryId='all'] - Target category to filter on open.
   */
  const openModal = useCallback((categoryId?: string): void => {
    setActiveCategory(categoryId ?? 'all')
    setIsModalOpen(true)
  }, [])

  /**
   * Closes the Work Showcase Modal.
   */
  const closeModal = useCallback((): void => {
    setIsModalOpen(false)
  }, [])

  // Close modal when pressing Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen, closeModal])

  // Prevent background body scroll when modal is active
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isModalOpen])

  // Aggregate all projects from all offerings
  const allProjects = useMemo(() => {
    return offerings.flatMap((o) =>
      (o.projects || []).map((p) => ({ ...p, parentCategory: o.id }))
    )
  }, [offerings])

  // Filter projects by active tab
  const displayedProjects = useMemo(() => {
    if (activeCategory === 'all') return allProjects
    return allProjects.filter((p) => p.parentCategory === activeCategory)
  }, [allProjects, activeCategory])

  /**
   * Handles smooth scrolling to anchor IDs while closing the modal if open.
   * If target contains a milestone parameter (e.g. ?milestone=dept),
   * dispatches an event to activate the corresponding milestone tab in the timeline.
   *
   * @param {React.MouseEvent} e - Click event.
   * @param {string} target - Anchor target hash or path.
   */
  const handleScroll = (e: React.MouseEvent, target: string): void => {
    e.preventDefault()
    const wasModalOpen = isModalOpen
    if (wasModalOpen) closeModal()

    let targetSelector = target
    let milestoneId: string | undefined

    if (target.includes('?milestone=')) {
      const parts = target.split('?milestone=')
      targetSelector = parts[0]
      milestoneId = parts[1]
    } else if (target.includes('#experience-')) {
      targetSelector = '#experience'
      milestoneId = target.replace('#experience-', '')
    }

    if (milestoneId) {
      window.dispatchEvent(
        new CustomEvent('navigate-experience', {
          detail: { milestoneId },
        })
      )
    }

    const scrollTarget = document.querySelector(targetSelector)
    if (scrollTarget) {
      setTimeout(
        () => {
          scrollTarget.scrollIntoView({ behavior: 'smooth' })
        },
        wasModalOpen ? 120 : 0
      )
    }
  }

  return (
    <section
      id="creative-offerings"
      className="py-12 sm:py-24 lg:py-32 relative bg-[var(--bg)] text-[var(--ink)] overflow-hidden transition-colors duration-400 ease-in-out"
    >
      {/* Top subtle atmospheric feather completing the blend from previous section */}
      <div
        className="absolute inset-x-0 top-0 h-48 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(to bottom, var(--bg) 0%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-10 lg:px-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div className="max-w-2xl">
            <h2 className="font-editorial text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.04] tracking-tight mb-2 sm:mb-4">
              {strings.creativity.title}
            </h2>
            <p className="text-[var(--lede)] text-xs sm:text-base lg:text-lg leading-relaxed">
              {strings.creativity.description}
            </p>
          </div>
        </div>

        {/* 3-Column Framer Bento Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-16">
          <AnimatePresence mode="popLayout">
            {offerings.map((item, idx) => {
              const Icon = iconMap[item.id] || Globe
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="p-5 sm:p-9 card-ruled flex flex-col justify-between group rounded-sm shadow-xl hover:-translate-y-2 hover:shadow-2xl hover:border-[#a3b5c4]/40 transition-all duration-300 relative overflow-hidden"
                >
                  {/* Top Bar with Icon & Live Metric Pill */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-3.5 bg-black/5 dark:bg-white/10 border border-[#a3b5c4]/25 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:border-[#a3b5c4]/50">
                        <Icon className="w-6 h-6 text-[var(--ink)]" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 bg-black/5 dark:bg-white/10 border border-[var(--line)]">
                          {item.badge}
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 bg-[#a3b5c4]/15 text-[var(--ink)] dark:text-[#a3b5c4] border border-[#a3b5c4]/30 font-bold">
                          {item.metric}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-editorial text-3xl font-bold mb-3 tracking-tight">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[var(--lede)] leading-relaxed mb-6 font-normal">
                      {item.desc}
                    </p>

                    {/* Deliverables Checklist */}
                    <div className="space-y-2.5 border-t border-[var(--line)] pt-5 mb-5">
                      {item.deliverables.map((del) => (
                        <div key={del} className="flex items-start gap-2.5 text-xs text-[var(--ink)]">
                          <Check className="w-3.5 h-3.5 text-[#a3b5c4] shrink-0 mt-0.5" />
                          <span>{del}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Tags */}
                    <div className="border-t border-[var(--line)] pt-4 flex flex-wrap gap-1.5 mb-6">
                      {item.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono px-2 py-0.5 bg-[#a3b5c4]/10 dark:bg-[#a3b5c4]/15 border border-[#a3b5c4]/25 text-[var(--ink)] dark:text-[#a3b5c4] font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Dual Action Bar: View Work & Start a Project */}
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => openModal(item.id)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 border border-[var(--line-strong)] hover:border-[#a3b5c4] text-xs font-mono font-semibold tracking-wider uppercase text-[var(--ink)] transition-all rounded-sm cursor-pointer shadow-xs group/view"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#a3b5c4] group-hover/view:scale-110 transition-transform" />
                      <span>{strings.creativity.btnViewWork}</span>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleScroll(e, '#contact')}
                      className="flex-1 btn-originkit text-xs py-2.5 shadow-sm"
                    >
                      <span>{strings.creativity.btnRequest}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Framer Founder Manifesto Quote Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'tween', ease: 'easeOut', duration: 0.5 }}
          className="p-8 sm:p-12 card-ruled border-2 border-[var(--line-strong)] text-center max-w-4xl mx-auto flex flex-col items-center gap-5 shadow-2xl rounded-sm"
        >
          <div className="w-10 h-10 rounded-full bg-[#a3b5c4]/15 flex items-center justify-center border border-[#a3b5c4]/30">
            <Zap className="w-5 h-5 text-[#a3b5c4]" />
          </div>
          <p className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-normal leading-snug">
            "{strings.creativity.manifestoQuote}"
          </p>
          <p className="text-xs sm:text-sm text-[var(--lede)] max-w-xl leading-relaxed">
            {strings.creativity.manifestoSub}
          </p>
          <button
            type="button"
            onClick={(e) => handleScroll(e, '#contact')}
            className="btn-originkit text-xs py-3.5 px-8 mt-2 shadow-lg"
          >
            <span>{strings.creativity.btnDiscussCollab}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      </div>

      {/* ─── Work Showcase Modal Lightbox ─── */}
      <AnimatePresence>
        {isModalOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 md:p-12 pt-16 sm:pt-20 pb-12 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            {/* Backdrop Blur covering entire viewport including top navbar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Floating Modal Box with clear spacing and rounded borders */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className="relative w-full max-w-5xl max-h-[80vh] bg-[var(--bg)] border-2 border-[var(--line-strong)] shadow-[0_25px_70px_rgba(0,0,0,0.65)] rounded-lg overflow-hidden flex flex-col z-10 my-auto ring-1 ring-black/10 dark:ring-white/10"
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-6 border-b border-[var(--line)] flex items-start justify-between gap-4 shrink-0 bg-black/[0.02] dark:bg-white/[0.02]">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#a3b5c4] font-semibold">
                      {strings.creativity.chapterBadge}
                    </span>
                    <span className="text-[10px] text-[var(--line-strong)]">•</span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--lede)]">
                      {displayedProjects.length} {displayedProjects.length === 1 ? 'Project' : 'Projects'}
                    </span>
                  </div>
                  <h3 id="modal-headline" className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight">
                    {strings.creativity.modalTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--lede)] mt-1">
                    {strings.creativity.modalSubtitle}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  className="p-2 border border-[var(--line)] hover:border-[#a3b5c4] bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-[var(--ink)] transition-colors rounded-xs cursor-pointer shrink-0"
                  aria-label={strings.creativity.modalClose}
                >
                  <X className="w-5 h-5 text-[var(--ink)]" />
                </button>
              </div>

              {/* Category Filter Pills */}
              <div className="px-4 sm:px-6 py-3 border-b border-[var(--line)] bg-black/[0.01] dark:bg-white/[0.01] flex flex-wrap items-center gap-2 shrink-0 overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setActiveCategory('all')}
                  className={`px-3 py-1 text-xs font-mono transition-all rounded-xs cursor-pointer border ${
                    activeCategory === 'all'
                      ? 'bg-[#a3b5c4]/25 border-[#a3b5c4] text-[var(--ink)] font-bold'
                      : 'bg-black/5 dark:bg-white/5 border-[var(--line)] text-[var(--lede)] hover:text-[var(--ink)]'
                  }`}
                >
                  {strings.creativity.modalAllCategories} ({allProjects.length})
                </button>
                {offerings.map((cat) => (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 py-1 text-xs font-mono transition-all rounded-xs cursor-pointer border ${
                      activeCategory === cat.id
                        ? 'bg-[#a3b5c4]/25 border-[#a3b5c4] text-[var(--ink)] font-bold'
                        : 'bg-black/5 dark:bg-white/5 border-[var(--line)] text-[var(--lede)] hover:text-[var(--ink)]'
                    }`}
                  >
                    {cat.badge} ({(cat.projects || []).length})
                  </button>
                ))}
              </div>

              {/* Scrollable Projects Grid */}
              <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto space-y-8 flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  {displayedProjects.map((proj) => (
                    <div
                      key={proj.id}
                      className="border border-[var(--line)] hover:border-[#a3b5c4]/40 bg-black/[0.02] dark:bg-white/[0.02] p-4 sm:p-5 rounded-xs flex flex-col justify-between transition-all group"
                    >
                      <div>
                        {/* Image Showcase Plate */}
                        <div className="relative w-full aspect-[16/10] overflow-hidden bg-black/10 dark:bg-white/5 border border-[var(--line)] rounded-xs mb-4">
                          <img
                            src={proj.imageUrl}
                            alt={proj.title}
                            loading="lazy"
                            decoding="async"
                            className={`w-full h-full transition-transform duration-500 ease-out group-hover:scale-105 transform-gpu ${
                              proj.imageUrl.includes('DeptChatbot')
                                ? 'object-contain p-2 bg-[#0c0e14]'
                                : 'object-cover'
                            }`}
                          />
                          <div className="absolute top-2.5 left-2.5">
                            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 bg-black/70 text-white backdrop-blur-xs border border-white/20 font-semibold rounded-xs">
                              {proj.badge}
                            </span>
                          </div>
                        </div>

                        {/* Title & Subtitle */}
                        <div className="mb-2">
                          <span className="font-mono text-[10px] uppercase tracking-widest text-[#a3b5c4] block">
                            {proj.subtitle}
                          </span>
                          <h4 className="font-editorial text-2xl font-bold text-[var(--ink)] tracking-tight mt-0.5">
                            {proj.title}
                          </h4>
                        </div>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-[var(--lede)] leading-relaxed mb-4">
                          {proj.description}
                        </p>

                        {/* Tech Stack Chips */}
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {proj.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="text-[10px] font-mono px-2 py-0.5 bg-[#a3b5c4]/10 dark:bg-[#a3b5c4]/15 border border-[#a3b5c4]/25 text-[var(--ink)] dark:text-[#a3b5c4] font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Link Button */}
                      <div className="pt-2 border-t border-[var(--line)]">
                        {proj.isExternal ? (
                          <a
                            href={proj.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-between w-full px-3.5 py-2 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 border border-[var(--line-strong)] hover:border-[#a3b5c4] text-xs font-mono font-semibold tracking-wider text-[var(--ink)] transition-all rounded-xs group/btn cursor-pointer shadow-xs"
                          >
                            <span>{proj.linkText}</span>
                            <ExternalLink className="w-3.5 h-3.5 text-[#a3b5c4] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                          </a>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => handleScroll(e, proj.link)}
                            className="inline-flex items-center justify-between w-full px-3.5 py-2 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 border border-[var(--line-strong)] hover:border-[#a3b5c4] text-xs font-mono font-semibold tracking-wider text-[var(--ink)] transition-all rounded-xs group/btn cursor-pointer shadow-xs"
                          >
                            <span>{proj.linkText}</span>
                            <ArrowRight className="w-3.5 h-3.5 text-[#a3b5c4] group-hover/btn:translate-x-0.5 transition-transform" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
