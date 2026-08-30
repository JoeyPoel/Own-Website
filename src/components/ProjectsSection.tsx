import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectCard from './ProjectCard'
import type { Project } from '../data/portfolioData'
import { STRINGS } from '../data/strings'

interface ProjectsSectionProps {
  projects: Project[]
  loading?: boolean
}

export default function ProjectsSection({ projects, loading }: ProjectsSectionProps) {
  const [filter, setFilter] = useState<'all' | 'mobile' | 'automation'>('all')

  const filteredProjects = projects.filter((project) => {
    if (filter === 'all') return true
    return project.category === filter
  })

  return (
    <section id="work" className="py-24 relative border-t border-theme-20">
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
            {STRINGS.projects.badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-slate-850 mt-4 mb-4 drop-shadow-sm">
            {STRINGS.projects.title}
          </h2>
          <p className="text-slate-650 max-w-xl mx-auto text-sm md:text-base font-sans">
            {STRINGS.projects.description}
          </p>
        </motion.div>

        {/* Filter Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="flex p-1.5 rounded-full bg-white/60 border border-theme-30 backdrop-blur-md">
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
                  onClick={() => setFilter(category)}
                  className={`relative px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors duration-300 ${
                    isActive ? 'text-sky-950 font-bold' : 'text-slate-700 hover:text-sky-950'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterTab"
                      className="absolute inset-0 bg-theme-15 border border-theme-20 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Stacked Cases */}
        <div className="flex flex-col gap-10">
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div 
                key={`skeleton-project-${index}`}
                className="card-premium rounded-2xl overflow-hidden flex flex-col lg:flex-row shadow-xl border border-sky-200 bg-white/40 backdrop-blur-sm h-[320px] animate-pulse"
              >
                {/* Visual Area Skeleton */}
                <div className="lg:w-1/2 p-8 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-sky-200/80">
                  <div className="w-36 h-[200px] bg-slate-200/60 rounded-xl" />
                </div>
                {/* Content Area Skeleton */}
                <div className="lg:w-1/2 p-8 flex flex-col justify-between">
                  <div>
                    <div className="w-1/3 h-3.5 bg-slate-250 rounded mb-4" />
                    <div className="w-2/3 h-6 bg-slate-250 rounded mb-4" />
                    <div className="space-y-2 mb-6">
                      <div className="w-full h-3.5 bg-slate-150 rounded" />
                      <div className="w-5/6 h-3.5 bg-slate-150 rounded" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-16 h-5 bg-slate-200/60 rounded-full" />
                    <div className="w-16 h-5 bg-slate-200/60 rounded-full" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  )
}
