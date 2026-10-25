import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import {
  Calendar,
  ChevronRight,
  ChevronLeft,
  MapPin,
  CheckCircle2,
} from 'lucide-react'

export interface TimelineMilestone {
  id: string
  num: string
  company: string
  shortName: string
  role: string
  period: string
  type: string
  location: string
  headline: string
  summary: string
  highlights: string[]
  skills: string[]
  imageUrl: string
  caption: string
}

const MILESTONES: TimelineMilestone[] = [
  {
    id: 'auas',
    num: '01',
    company: 'University of Applied Sciences',
    shortName: 'Univ. Applied Sci',
    role: 'Student Mentor',
    period: 'Sep 2026 – Present',
    type: 'Academic • Parttime',
    location: 'Amsterdam, NL',
    headline: 'Mentoring Future AI & Software Engineers',
    summary:
      'Guiding students through core applied AI curricula, delivering structural feedback on algorithmic implementations, and coaching students on software design principles.',
    highlights: [
      'Delivered constructive technical reviews on code quality and AI models',
      'Coached cohorts in software design patterns and mathematical problem-solving',
      'Fostered collaborative engineering habits and autonomous troubleshooting',
    ],
    skills: ['Applied AI', 'Code Review', 'Academic Mentorship', 'Python'],
    imageUrl: '/auas_logo.jpg',
    caption: 'University of Applied Sciences',
  },
  {
    id: 'tracks-taps',
    num: '02',
    company: 'Tracks&Taps',
    shortName: 'Tracks&Taps',
    role: 'Founder & Lead Developer',
    period: 'Jun 2025 – Present',
    type: 'Product Owner • Solo Build',
    location: 'App Store Worldwide',
    headline: 'Solo-Engineered Travel Quest App Live on iOS App Store',
    summary:
      'Spent over a year architecting, building, and deploying Tracks&Taps solo from initial wireframes to production release on the Apple App Store.',
    highlights: [
      'Engineered cross-platform mobile client with offline-first local caching',
      'Integrated gamified real-world scavenger quests, canals, and Pub Golf challenges',
      'Navigated complete Apple App Store review, TestFlight cycles, and StoreKit deployment',
    ],
    skills: ['React Native', 'Expo', 'TypeScript', 'App Store Publishing', 'StoreKit'],
    imageUrl: '/tracks_icon.png',
    caption: 'Tracks&Taps',
  },
  {
    id: 'tata-steel',
    num: '03',
    company: 'TATA STEEL',
    shortName: 'TATA STEEL',
    role: 'Strategic HR Analytics & RPA Engineer',
    period: 'Sep 2024 – Jun 2026',
    type: 'Enterprise Systems • 1 yr 10 mnd',
    location: 'IJmuiden, NL (Hybrid)',
    headline: 'SAP SuccessFactors Restructuring & Core RPA Pipelines',
    summary:
      'Graduation research diagnosing and optimizing Tata Steel talent pipelines within SAP SuccessFactors, coupled with building enterprise-scale document understanding automations.',
    highlights: [
      'Formulated strategic framework replacing subjective potential labels with growth tracking in SAP SuccessFactors',
      'Engineered Digital Order Entry RPA utilizing Document Understanding models for unstructured data',
      'Automated legacy mainframe price lists, eliminating 90% of repetitive manual data entry',
      'Spearheaded TSP Non-Prime order automation and executed critical server migrations',
    ],
    skills: ['SAP SuccessFactors', 'Enterprise RPA', 'Document Understanding', 'OCR Pipelines', 'Process Redesign'],
    imageUrl: '/tatasteel_logo.png',
    caption: 'TATA STEEL',
  },
  {
    id: 'swap-club',
    num: '04',
    company: 'The SwapClub',
    shortName: 'The SwapClub',
    role: 'Mobile Application Developer',
    period: 'Nov 2025 – Jan 2026',
    type: 'Circular Economy • Internship',
    location: 'Amsterdam, NL (Hybrid)',
    headline: 'Cross-Platform React Native App for Circular Economy',
    summary:
      'Engineered the mobile client for The SwapClub, focusing on strict architectural stability, modular design patterns, and real-time inventory trading flows.',
    highlights: [
      'Built production client in React Native with Expo and end-to-end TypeScript strict typing',
      'Architected reactive state flows and Supabase PostgreSQL data persistence',
      'Enforced component-driven reusability and strict linting standards from day one',
    ],
    skills: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'PostgreSQL', 'Clean Architecture'],
    imageUrl: '/swapclub_logo.jpg',
    caption: 'The SwapClub',
  },
  {
    id: 'dept',
    num: '05',
    company: 'DEPT®',
    shortName: 'DEPT®',
    role: 'Android Developer',
    period: 'Mar 2025 – Jun 2025',
    type: 'Agency Project • 5-Person Team',
    location: 'Rotterdam, NL (Hybrid)',
    headline: 'Native Kotlin App with OpenAI & Universal Accessibility',
    summary:
      'Engineered a native Android application prioritizing intelligent AI integration, geospatial features with Mapbox, and full TalkBack screen reader accessibility.',
    highlights: [
      'Built native dynamic UI with Jetpack Compose featuring full TalkBack and high-contrast scaling',
      'Integrated intelligent OpenAI chatbot API and custom on-device computer vision models',
      'Implemented real-time authentication and cloud synchronization with Firebase and Mapbox SDK',
    ],
    skills: ['Kotlin', 'Jetpack Compose', 'OpenAI API', 'Computer Vision', 'Firebase', 'Mapbox SDK'],
    imageUrl: '/dept.jpg',
    caption: 'DEPT® Global Agency',
  },
  {
    id: 'youngones',
    num: '06',
    company: 'YoungOnes',
    shortName: 'YoungOnes',
    role: 'Independent Freelance Professional',
    period: 'Feb 2023 – Mar 2025',
    type: 'Freelance Operations • 2 yr 2 mnd',
    location: 'North Holland, NL',
    headline: 'Dynamic On-Demand Operations & Adaptability',
    summary:
      'Executed diverse commercial operations across retail, events, and logistics while managing full entrepreneurial responsibilities, invoicing, and tax accounting.',
    highlights: [
      'Demonstrated rapid adaptability across varied fast-paced customer-facing environments',
      'Managed full independent freelance administration, financial reporting, and invoicing',
      'Cultivated hands-on problem-solving, real-time crisis triage, and team coordination',
    ],
    skills: ['Entrepreneurial Agility', 'Operations', 'Client Relations', 'Financial Accounting'],
    imageUrl: '/youngones_logo.jpg',
    caption: 'YoungOnes Platform',
  },
]

/**
 * ExperienceTimelineSection:
 * Framer-grade Flowing Timeline and Archival Experience Section.
 * Synthesized from ConnectCultures with interactive progress rail, connected milestone nodes,
 * 3D perspective mouse tilt memory card, and concise LinkedIn achievements.
 *
 * @returns {React.JSX.Element} Interactive career timeline section.
 */
export default function ExperienceTimelineSection(): React.JSX.Element {
  const [activeIdx, setActiveIdx] = useState<number>(0)
  const [direction, setDirection] = useState<number>(1)

  const activeMilestone = MILESTONES[activeIdx]

  /**
   * Advances to next milestone.
   */
  const handleNext = React.useCallback((): void => {
    setActiveIdx((prev) => {
      if (prev < MILESTONES.length - 1) {
        setDirection(1)
        return prev + 1
      }
      return prev
    })
  }, [])

  /**
   * Rewinds to previous milestone.
   */
  const handlePrev = React.useCallback((): void => {
    setActiveIdx((prev) => {
      if (prev > 0) {
        setDirection(-1)
        return prev - 1
      }
      return prev
    })
  }, [])

  /**
   * Directly selects a milestone by index.
   *
   * @param idx - Target milestone index.
   */
  const handleSelect = (idx: number): void => {
    setDirection(idx > activeIdx ? 1 : -1)
    setActiveIdx(idx)
  }

  // 3D Perspective Tilt on archival card
  const cardRef = useRef<HTMLDivElement | null>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 160,
    damping: 22,
  })
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 160,
    damping: 22,
  })

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>): void => {
    if (e.pointerType !== 'mouse' || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handlePointerLeave = (): void => {
    mouseX.set(0)
    mouseY.set(0)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      const el = document.getElementById('experience')
      if (!el) return
      const rect = el.getBoundingClientRect()
      const inView = rect.top < window.innerHeight && rect.bottom > 0
      if (!inView) return

      if (e.key === 'ArrowRight') {
        handleNext()
      } else if (e.key === 'ArrowLeft') {
        handlePrev()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleNext, handlePrev])

  return (
    <section
      id="experience"
      className="py-12 sm:py-24 lg:py-32 relative border-t border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] overflow-hidden transition-colors duration-300"
    >
      {/* Background Subtle Radial Accent using Slate Mist */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] dark:opacity-[0.10]" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[600px] blur-[150px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(163,181,196,0.35) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="max-w-[1254px] mx-auto px-5 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-14">
          <div>
            <div className="mb-3 sm:mb-4">
              <span className="text-[10px] font-bold tracking-[0.2em] font-mono uppercase px-3 py-1 bg-black/5 dark:bg-white/10 border border-[#a3b5c4]/30 inline-flex items-center gap-2 rounded-sm shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#a3b5c4] animate-pulse" />
                <span>CAREER & EXPERIENCE TIMELINE</span>
              </span>
            </div>

            <h2 className="font-editorial text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.04] tracking-tight">
              Engineering Journey
            </h2>

            <p className="text-[var(--lede)] text-xs sm:text-base leading-relaxed max-w-2xl mt-2 sm:mt-3">
              Hands-on enterprise engineering, startup publishing, and academic leadership.
              Click or scrub through the milestones below.
            </p>
          </div>
        </div>

        {/* ─── 1. Flowing Interactive Progress Scrubber Rail ─── */}
        <div className="relative mb-8 sm:mb-14 max-w-5xl mx-auto overflow-x-auto pb-3 pt-2">
          <div className="grid grid-cols-6 min-w-[680px] relative">
            {MILESTONES.map((m, idx) => {
              const isSelected = activeIdx === idx
              const isPassed = idx < activeIdx

              return (
                <div key={m.id} className="relative flex flex-col items-center">
                  
                  {/* Connecting Rail Segment to next ball */}
                  {idx < MILESTONES.length - 1 && (
                    <div className="absolute top-[20px] -translate-y-1/2 left-1/2 w-full h-[2px] bg-[var(--line)] pointer-events-none z-0">
                      <motion.div
                        className="h-full bg-[#a3b5c4] origin-left"
                        initial={false}
                        animate={{ scaleX: isPassed ? 1 : 0 }}
                        transition={{ type: 'spring', stiffness: 240, damping: 26 }}
                      />
                    </div>
                  )}

                  {/* Milestone Node Button */}
                  <button
                    type="button"
                    onClick={() => handleSelect(idx)}
                    className="group relative z-10 flex flex-col items-center focus:outline-none cursor-pointer w-full px-1"
                    aria-label={`Jump to ${m.company}`}
                  >
                    {/* Milestone Node Ball */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs transition-all duration-300 relative z-10 ${
                        isSelected
                          ? 'bg-[#a3b5c4] text-[#000000] ring-4 ring-[#a3b5c4]/30 scale-110 shadow-md font-bold'
                          : isPassed
                          ? 'bg-[var(--bg)] border-2 border-[#a3b5c4] text-[#a3b5c4] group-hover:scale-105'
                          : 'bg-[var(--bg)] border-2 border-[var(--line-strong)] text-[var(--lede)] group-hover:border-[#a3b5c4] group-hover:text-[#a3b5c4]'
                      }`}
                    >
                      {m.num}
                    </div>

                    {/* Milestone Company & Short Date */}
                    <div className="mt-2.5 text-center transition-colors">
                      <span
                        className={`block font-mono text-[11px] uppercase tracking-wider ${
                          isSelected
                            ? 'text-[var(--ink)] font-bold'
                            : 'text-[var(--lede)] group-hover:text-[var(--ink)]'
                        }`}
                      >
                        {m.shortName}
                      </span>
                      <span className="block font-mono text-[9px] text-[var(--lede)]/70">
                        {m.period.split('–')[0].trim()}
                      </span>
                    </div>
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        {/* ─── 2. Dual-Panel Experience Dispatch & 3D Archival Card ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center p-4 sm:p-10 lg:p-12 border border-[var(--line)] bg-black/[0.015] dark:bg-white/[0.015] rounded-sm shadow-xl">
          
          {/* Left Column: Milestone Narrative Dispatch */}
          <div className="lg:col-span-7 overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeMilestone.id}
                custom={direction}
                variants={{
                  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 28 : -28 }),
                  center: { opacity: 1, x: 0 },
                  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -28 : 28 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-6"
              >
                {/* Telemetry Metadata Pills */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#fce9c7]/20 border border-[#fce9c7]/40 text-xs font-mono font-semibold text-[var(--ink)] dark:text-[#fce9c7]">
                    <div className="w-4 h-4 rounded-xs overflow-hidden shrink-0 bg-white p-0.5 flex items-center justify-center border border-black/10">
                      <img
                        src={activeMilestone.imageUrl}
                        alt=""
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span>{activeMilestone.company}</span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-black/5 dark:bg-white/10 border border-[#a3b5c4]/20 text-xs font-mono text-[var(--lede)]">
                    <Calendar className="w-3 h-3 shrink-0 text-[#a3b5c4]" />
                    <span>{activeMilestone.period}</span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-black/5 dark:bg-white/10 border border-[#a3b5c4]/20 text-xs font-mono text-[var(--lede)]">
                    <MapPin className="w-3 h-3 shrink-0 text-[#a3b5c4]" />
                    <span>{activeMilestone.location}</span>
                  </div>
                </div>

                {/* Role Headline */}
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-[#a3b5c4] block mb-1">
                    {activeMilestone.type}
                  </span>
                  <h3 className="font-editorial text-3xl sm:text-4xl font-normal text-[var(--ink)] tracking-tight leading-tight">
                    {activeMilestone.role}
                  </h3>
                  <h4 className="text-sm sm:text-base font-semibold text-[var(--ink)] mt-1.5">
                    {activeMilestone.headline}
                  </h4>
                </div>

                {/* Executive Summary */}
                <p className="font-sans text-xs sm:text-sm text-[var(--lede)] leading-relaxed font-normal">
                  {activeMilestone.summary}
                </p>

                {/* Concise Highlights Checklist */}
                <div className="space-y-2 border-t border-[var(--line)] pt-4">
                  {activeMilestone.highlights.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-[var(--ink)]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#a3b5c4] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {activeMilestone.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-mono px-2 py-0.5 bg-[#a3b5c4]/10 dark:bg-[#a3b5c4]/15 border border-[#a3b5c4]/25 text-[var(--ink)] dark:text-[#a3b5c4] font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: 3D Perspective Tilt Memory Card */}
          <div
            ref={cardRef}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            className="lg:col-span-5 flex flex-col items-center select-none w-full"
            style={{ perspective: 1200 }}
          >
            <div className="relative w-full max-w-[420px] min-h-[280px] xs:min-h-[340px] sm:min-h-[400px] flex items-center justify-center">
              <AnimatePresence mode="popLayout" custom={direction}>
                <motion.div
                  key={activeMilestone.id}
                  custom={direction}
                  variants={{
                    enter: (dir: number) => ({
                      x: dir > 0 ? '100%' : '-100%',
                      opacity: 0,
                      scale: 0.95,
                    }),
                    center: {
                      x: 0,
                      opacity: 1,
                      scale: 1,
                      transition: {
                        x: { type: 'spring', stiffness: 280, damping: 28 },
                        opacity: { duration: 0.25 },
                        scale: { duration: 0.28 },
                      },
                    },
                    exit: (dir: number) => ({
                      x: dir > 0 ? '-100%' : '100%',
                      opacity: 0,
                      scale: 0.95,
                      transition: {
                        x: { type: 'spring', stiffness: 280, damping: 28 },
                        opacity: { duration: 0.2 },
                        scale: { duration: 0.22 },
                      },
                    }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  style={{
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                  }}
                  className="w-full border border-[var(--line-strong)] bg-[var(--bg)] p-3 shadow-xl will-change-transform group"
                >
                  {/* Architectural Logo Showcase Stage */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/[0.02] dark:bg-white/[0.02] border border-[var(--line)] flex flex-col items-center justify-center p-6 sm:p-8">
                    {/* Subtle dot matrix watermark */}
                    <div
                      className="absolute inset-0 opacity-[0.18] dark:opacity-[0.08] pointer-events-none"
                      style={{
                        backgroundImage: 'radial-gradient(var(--line-strong) 1px, transparent 1px)',
                        backgroundSize: '16px 16px',
                      }}
                    />

                    {/* Centered Logo Badge Pedestal */}
                    <div className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-white dark:bg-[#0c0c0d] border border-[var(--line-strong)] shadow-md flex items-center justify-center p-3.5 transition-transform duration-300 group-hover:scale-105">
                      <img
                        src={activeMilestone.imageUrl}
                        alt={`${activeMilestone.company} logo`}
                        className="w-full h-full object-contain rounded-lg"
                        loading="lazy"
                      />
                    </div>

                    {/* Telemetry pill & caption */}
                    <div className="mt-4 text-center z-10">
                      <span className="font-mono text-[9px] tracking-widest uppercase bg-[#fce9c7] text-[#000000] font-bold px-2 py-0.5 inline-block mb-1">
                        {activeMilestone.period}
                      </span>
                      <p className="font-editorial text-sm sm:text-base font-medium text-[var(--ink)]">
                        {activeMilestone.caption}
                      </p>
                    </div>
                  </div>

                  {/* Card Telemetry Footer */}
                  <div className="pt-3 px-1 flex items-center justify-between font-mono text-[11px] text-[var(--lede)]">
                    <span className="truncate max-w-[200px]">{activeMilestone.company}</span>
                    <span className="text-[#a3b5c4] font-bold">
                      {activeMilestone.num} / 06
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Stepper Navigation Buttons */}
            <div className="flex items-center justify-between w-full max-w-[420px] mt-6 gap-3">
              <button
                type="button"
                disabled={activeIdx === 0}
                onClick={handlePrev}
                className="inline-flex items-center gap-1.5 px-4 py-2 border border-[var(--line-strong)] text-xs font-mono font-semibold text-[var(--ink)] disabled:opacity-30 hover:bg-[var(--line)] transition-all cursor-pointer shadow-xs"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev</span>
              </button>

              <span className="font-mono text-xs font-semibold text-[var(--ink)]">
                {activeIdx + 1} of {MILESTONES.length}
              </span>

              <button
                type="button"
                disabled={activeIdx === MILESTONES.length - 1}
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[var(--btn-bg)] text-[var(--btn-fg)] text-xs font-mono font-semibold disabled:opacity-30 hover:opacity-90 transition-all cursor-pointer shadow-xs"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
