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
          /* Phone Bezel Container */
          <div className="relative mx-auto border-slate-350 bg-white border-[10px] rounded-[2.2rem] h-[340px] w-[170px] shadow-2xl overflow-hidden flex-shrink-0">
            {/* Camera notch / Speaker */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-slate-300 h-1.5 w-12 rounded-full z-20" />
            {/* Screen */}
            <div className="w-full h-full relative z-10 bg-slate-100">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover opacity-95"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent p-3 pt-8">
                <span className="text-[8px] font-bold font-mono text-sky-400 block tracking-wider uppercase mb-0.5">Live Release</span>
                <span className="text-[10px] font-black text-white leading-tight block truncate">{project.title}</span>
              </div>
            </div>
          </div>
        ) : (
          /* Automation Pipeline Bezel / Dashboard Mock */
          <div className="w-full max-w-sm rounded-xl border border-sky-300 bg-white/90 shadow-2xl overflow-hidden flex flex-col">
            {/* Window controls */}
            <div className="flex items-center gap-1.5 px-4 py-3 bg-slate-50 border-b border-sky-200/60">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              <span className="text-[9px] font-mono text-slate-500 ml-2 uppercase">rpa_pipeline_process.log</span>
            </div>
            {/* Terminal contents */}
            <div className="p-4 flex-grow font-mono text-[10px] text-slate-700 flex flex-col gap-2 bg-white/40">
              <div className="flex items-center gap-2 text-sky-600">
                <span>$</span>
                <span>initialize_model_inference --input_path=data/docs</span>
              </div>
              <div className="text-slate-500">[SYSTEM] Loaded weights successfully.</div>
              <div className="text-slate-600">[PROCESS] Matching line items: 99.4% accuracy</div>
              <div className="text-slate-600">[SUCCESS] Automated DB registry complete (Tata Steel pipeline)</div>
              {/* Architecture tags */}
              <div className="flex flex-wrap gap-1 mt-4">
                {project.stack.map(tag => (
                  <span key={tag} className="text-[8px] px-2 py-0.5 bg-white border border-sky-250 text-slate-500 font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
 
      {/* Case Details */}
      <div className="lg:w-1/2 p-8 flex flex-col justify-between">
        <div>
          <span className="text-[10px] font-bold font-mono tracking-widest text-theme uppercase mb-3 block">
            {isMobile ? 'iOS & Android Native App' : 'AI Automation & RPA Pipeline'}
          </span>
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
