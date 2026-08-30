import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import type { Project } from '../data/portfolioData'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const isMobile = project.category === 'mobile'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className="card-premium rounded-2xl overflow-hidden flex flex-col lg:flex-row shadow-xl border border-sky-200 hover:border-sky-300 transition-all duration-300"
    >
      {/* Visual Mockup Area */}
      <div className="lg:w-1/2 p-8 bg-white/40 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-sky-200/80 min-h-[300px]">
        {isMobile ? (
          /* Same Phone Bezel Container as Tracks Section (scaled down to fit) */
          <div className="relative border-[6px] border-slate-200 bg-white rounded-[28px] p-1 shadow-2xl overflow-hidden flex-shrink-0 w-[160px] aspect-[9/19.5] border-b-[7px]">
            {/* Dynamic Island / Notch */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-10 h-2 bg-slate-900 rounded-full z-20" />
            {/* Screen container */}
            <div className="w-full h-full rounded-[20px] overflow-hidden bg-slate-100 border border-slate-100 relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover opacity-95 select-none pointer-events-none"
              />
            </div>
          </div>
        ) : (
          /* Terminal Window Mockup displaying its own project image */
          <div className="w-full max-w-sm rounded-xl border border-sky-250 bg-white/90 shadow-2xl overflow-hidden flex flex-col">
            {/* Window controls */}
            <div className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-50 border-b border-sky-200/60">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <div className="w-2 h-2 rounded-full bg-yellow-400" />
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-[9px] font-mono text-slate-500 ml-2 uppercase">automation_monitor.sh</span>
            </div>
            {/* Terminal contents with image */}
            <div className="relative p-2.5 bg-slate-950 flex-grow flex flex-col justify-between">
              <div className="w-full h-40 bg-black rounded border border-slate-850 flex items-center justify-center overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="max-w-full max-h-full object-contain opacity-95 select-none pointer-events-none"
                />
              </div>
              <div className="bg-slate-900 px-3 py-1.5 rounded border border-slate-800 text-[8px] font-mono text-cyan-400 flex items-center justify-between mt-2">
                <span>$ python pipeline.py --run</span>
                <span className="text-emerald-400 animate-pulse font-bold">● Active</span>
              </div>
            </div>
          </div>
        )}
      </div>
 
      {/* Case Details */}
      <div className="lg:w-1/2 p-8 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-[10px] font-bold font-mono tracking-widest text-theme uppercase">
              {isMobile ? 'iOS & Android Native App' : 'AI Automation & RPA Pipeline'}
            </span>
            {project.status && (
              <span className="text-[8px] font-bold font-mono px-2 py-0.5 rounded bg-theme-10 border border-theme-20 text-theme uppercase tracking-wider shadow-xs">
                {project.status}
              </span>
            )}
          </div>
          <h3 className="text-xl font-bold font-heading text-slate-800 mb-3">
            {project.title}
          </h3>
          <p className="text-slate-650 text-sm leading-relaxed mb-6">
            {project.tagline}
          </p>
 
          <div className="border-t border-sky-100 pt-6 mb-6">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono block mb-3">
              Technical Highlights
            </span>
            <ul className="flex flex-col gap-2.5">
              {project.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-2 text-xs text-slate-650 leading-relaxed">
                  <span className="text-theme mt-0.5">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
 
        {/* Action tray */}
        <div className="flex items-center justify-between pt-4 border-t border-sky-100 mt-auto">
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono px-2 py-0.5 bg-white border border-theme-20 text-slate-600 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
 
          {project.linkUrl && (
            <a
              href={project.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs px-3.5 py-2 bg-theme-10 border border-theme-20 text-theme rounded-lg hover:bg-theme hover:text-white transition-colors"
            >
              <span>{project.linkLabel ?? 'View Project'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
