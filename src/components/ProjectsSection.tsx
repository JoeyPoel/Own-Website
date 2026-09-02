import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import ProjectCard from './ProjectCard'
import type { Project } from '../data/portfolioData'
import { STRINGS } from '../data/strings'

interface ProjectsSectionProps {
  projects: Project[]
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [filter, setFilter] = useState<'all' | 'mobile' | 'automation'>('all')
  const [visibleCount, setVisibleCount] = useState<number>(5)

  // Sort projects automatically based on order field starting at 1
  const getOrderVal = (p: Project): number => {
    if (p.order !== undefined && p.order !== null) {
      const val = typeof p.order === 'number' ? p.order : parseInt(String(p.order), 10)
      if (!isNaN(val)) return val
    }
    const parsedId = parseInt(p.id, 10)
    return isNaN(parsedId) ? 9999 : parsedId
  }

  const sortedProjects = [...projects].sort((a, b) => getOrderVal(a) - getOrderVal(b))

  const filteredProjects = sortedProjects.filter((project) => {
    if (filter === 'all') return true
    return project.category === filter
  })

  const visibleProjects = filteredProjects.slice(0, visibleCount)

  const handleFilterChange = (newFilter: 'all' | 'mobile' | 'automation') => {
    setFilter(newFilter)
    setVisibleCount(5)
  }

  return (
    <section id="work" className="py-24 relative">
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
            {STRINGS.projects.badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-slate-850 mt-4 mb-4 drop-shadow-sm">
            {STRINGS.projects.title}
          </h2>
          <p className="text-slate-650 max-w-xl mx-auto text-sm md:text-base font-sans">
            {STRINGS.projects.description}
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex p-1.5 rounded-full bg-white/60 border border-white/70 backdrop-blur-md">
            {(['all', 'mobile', 'automation'] as const).map((category) => {
              const label =
                category === 'all'
                  ? STRINGS.projects.filters.all
                  : category === 'mobile'
                  ? STRINGS.projects.filters.mobile
                  : STRINGS.projects.filters.automation
              const isActive = filter === category

              return (
                <button
                  key={category}
                  onClick={() => handleFilterChange(category)}
                  className={`relative px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors duration-300 ${
                    isActive ? 'text-sky-950 font-bold' : 'text-slate-700 hover:text-sky-950'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterTab"
                      className="absolute inset-0 bg-theme-15 border border-theme-20 rounded-full"
                      transition={{ type: 'tween', ease: 'easeOut', duration: 0.25 }}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Stacked Cases */}
        <div className="flex flex-col gap-10">
          <AnimatePresence mode="wait">
            {visibleProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </div>

        {/* Clean Load More Button */}
        {visibleProjects.length < filteredProjects.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setVisibleCount((prev) => prev + 5)}
              className="px-6 py-2.5 rounded-full bg-white/70 hover:bg-white border border-white/80 text-theme hover:text-sky-950 text-xs font-bold font-mono tracking-wider uppercase shadow-xs backdrop-blur-md transition-all hover:scale-105 cursor-pointer flex items-center gap-2"
            >
              <span>Load More Projects</span>
              <ChevronDown className="w-3.5 h-3.5 text-theme" />
            </button>
          </div>
        )}
      </motion.div>
    </section>
  )
}
