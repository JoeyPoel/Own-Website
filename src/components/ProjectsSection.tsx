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
    <section id="work" className="py-24 relative bg-dot-pattern border-t border-zinc-900">
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
            Case Studies
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-white mt-4 mb-4">
            Shipped Work & Prototypes
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto text-sm md:text-base">
            No stock screen templates. These are functional products and production automation pipelines developed for startups and enterprise teams.
          </p>
        </motion.div>

        {/* Filter Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="flex p-1.5 rounded-full bg-zinc-900/60 border border-zinc-800 backdrop-blur-md">
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
                  className={`relative px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterTab"
                      className="absolute inset-0 bg-zinc-800/40 border border-zinc-700/60 rounded-full"
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
