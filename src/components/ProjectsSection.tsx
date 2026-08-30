import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectCard from './ProjectCard'
import type { Project } from '../data/portfolioData'

interface ProjectsSectionProps {
  projects: Project[]
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [filter, setFilter] = useState<'all' | 'mobile' | 'automation'>('all')

  const filteredProjects = projects.filter((project) => {
    if (filter === 'all') return true
    return project.category === filter
  })

  return (
    <section id="work" className="py-24 relative border-t border-sky-500/10">
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
            // CASE STUDIES & WORK
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-slate-850 mt-4 mb-4 drop-shadow-sm">
            Shipped Work & Production Builds
          </h2>
          <p className="text-slate-650 max-w-xl mx-auto text-sm md:text-base font-sans">
            No stock screen templates. Functional products and automation pipelines developed for startups and enterprise clients.
          </p>
        </motion.div>

        {/* Filter Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="flex p-1.5 rounded-full bg-white/60 border border-sky-300/40 backdrop-blur-md">
            {(['all', 'mobile', 'automation'] as const).map((category) => {
              const label =
                category === 'all'
                  ? 'All Work'
                  : category === 'mobile'
                  ? 'Mobile Apps'
                  : 'AI & Automation'
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
                      className="absolute inset-0 bg-sky-500/15 border border-sky-400/30 rounded-full"
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
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
