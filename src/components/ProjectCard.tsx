import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'
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
      className="card-premium rounded-2xl overflow-hidden flex flex-col lg:flex-row shadow-xl border border-zinc-800/80 hover:border-zinc-700/80 transition-all duration-300"
    >
      {/* Visual Mockup Area */}
      <div className="lg:w-1/2 p-8 bg-zinc-950/60 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-zinc-800/80 min-h-[300px]">
        {isMobile ? (
          /* Phone Bezel Container */
          <div className="relative mx-auto border-zinc-800 bg-zinc-950 border-[10px] rounded-[2.2rem] h-[340px] w-[170px] shadow-2xl overflow-hidden flex-shrink-0">
            {/* Camera notch / Speaker */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-zinc-800 h-1.5 w-12 rounded-full z-20" />
            {/* Screen */}
            <div className="w-full h-full relative z-10 bg-zinc-900">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-8">
                <span className="text-[8px] font-bold font-mono text-emerald-400 block tracking-wider uppercase mb-0.5">Live Release</span>
                <span className="text-[10px] font-black text-white leading-tight block truncate">{project.title}</span>
              </div>
            </div>
          </div>
        ) : (
          /* Automation Pipeline Bezel / Dashboard Mock */
          <div className="w-full max-w-sm rounded-xl border border-zinc-800 bg-zinc-900/80 shadow-2xl overflow-hidden flex flex-col">
            {/* Window controls */}
            <div className="flex items-center gap-1.5 px-4 py-3 bg-zinc-950 border-b border-zinc-800/60">
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
              <span className="text-[9px] font-mono text-zinc-500 ml-2 uppercase">rpa_pipeline_process.log</span>
            </div>
            {/* Terminal contents */}
            <div className="p-4 flex-grow font-mono text-[10px] text-zinc-400 flex flex-col gap-2 bg-zinc-950/40">
              <div className="flex items-center gap-2 text-emerald-500">
                <span>$</span>
                <span>initialize_model_inference --input_path=data/docs</span>
              </div>
              <div className="text-zinc-500">[SYSTEM] Loaded weights successfully.</div>
              <div className="text-zinc-300">[PROCESS] Matching line items: 99.4% accuracy</div>
              <div className="text-zinc-300">[SUCCESS] Automated DB registry complete (Tata Steel pipeline)</div>
              {/* Architecture tags */}
              <div className="flex flex-wrap gap-1 mt-4">
                {project.stack.map(tag => (
                  <span key={tag} className="text-[8px] px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-zinc-500 font-mono">
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
          <span className="text-[10px] font-bold font-mono tracking-widest text-emerald-400 uppercase mb-3 block">
            {isMobile ? 'iOS & Android Native App' : 'AI Automation & RPA Pipeline'}
          </span>
          <h3 className="text-xl font-bold font-heading text-white mb-3">
            {project.title}
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed mb-6">
            {project.tagline}
          </p>

          <div className="border-t border-zinc-850/80 pt-6 mb-6">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono block mb-3">
              Technical Highlights
            </span>
            <ul className="flex flex-col gap-2.5">
              {project.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-2 text-xs text-zinc-400 leading-relaxed">
                  <span className="text-emerald-500 mt-0.5">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action tray */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-850/60 mt-auto">
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono px-2 py-0.5 bg-zinc-950 border border-zinc-850 text-zinc-400 rounded-md"
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
              className="flex items-center gap-1.5 text-xs px-3.5 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500 hover:text-zinc-950 transition-colors"
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
