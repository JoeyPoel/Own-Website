import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export interface TabItem {
  id: string
  title: string
  subtitle?: string
  description: string
  tags?: string
  badge?: string
  buttonText: string
  link: string
  image: {
    src: string
    alt: string
  }
  rating?: string
}

interface TabsCardProps {
  items: TabItem[]
  activeId: string
  onSelect: (id: string) => void
  className?: string
}

/**
 * Concave superellipse top-corner SVG fillet replicating Framer Tabs-card geometry.
 * Seamlessly connects the top-right of the active tab to the right card body.
 */
function InvertedCornerTop({ className }: { className?: string }): React.JSX.Element {
  return (
    <div className={`absolute -top-5 right-0 w-5 h-5 pointer-events-none overflow-hidden ${className ?? ''}`}>
      <svg viewBox="0 0 20 20" className="w-5 h-5 fill-current" aria-hidden="true">
        <path d="M 6.018 19.789 C 4.705 20 3.137 20 0 20 L 20 20 L 20 0 C 20 3.137 20 4.705 19.789 6.018 C 18.65 13.098 13.098 18.65 6.018 19.789 Z" />
      </svg>
    </div>
  )
}

/**
 * Concave superellipse bottom-corner SVG fillet replicating Framer Tabs-card geometry.
 * Seamlessly connects the bottom-right of the active tab to the right card body.
 */
function InvertedCornerBottom({ className }: { className?: string }): React.JSX.Element {
  return (
    <div className={`absolute -bottom-5 right-0 w-5 h-5 pointer-events-none overflow-hidden ${className ?? ''}`}>
      <svg viewBox="0 0 20 20" className="w-5 h-5 fill-current" aria-hidden="true">
        <path d="M 6.018 0.211 C 4.705 0 3.137 0 0 0 L 20 0 L 20 20 C 20 16.863 20 15.295 19.789 13.982 C 18.65 6.902 13.098 1.35 6.018 0.211 Z" />
      </svg>
    </div>
  )
}

const springTransition = {
  type: 'spring' as const,
  damping: 40,
  stiffness: 320,
  mass: 1,
}

/**
 * TabsCard Component:
 * Faithfully replicates the Framer "Tabs card" component (qs9tZHZbw.js):
 * - Vertical interactive tabs on the left with expandable description on active state
 * - Signature inverted superellipse fillet corners merging active tab into the showcase card
 * - Right showcase panel displaying active venture screenshot, telemetry tags, and launch link
 * - Responsive mobile fallback stacking tabs cleanly with animated preview panel
 *
 * @param props.items - List of venture tab items.
 * @param props.activeId - Currently selected item ID.
 * @param props.onSelect - Callback fired when a tab is clicked or hovered.
 * @returns {React.JSX.Element} Interactive Tabs Card component.
 */
export default function TabsCard({
  items,
  activeId,
  onSelect,
  className = '',
}: TabsCardProps): React.JSX.Element {
  const activeItem = items.find((it) => it.id === activeId) ?? items[0]

  return (
    <div
      className={`w-full max-w-[1240px] mx-auto rounded-[28px] border border-[#a3b5c4]/40 dark:border-[#a3b5c4]/30 bg-[var(--bg)] p-3 sm:p-5 shadow-[0_4px_30px_rgba(163,181,196,0.12)] transition-colors duration-300 ${className}`}
    >
      <div className="flex flex-col lg:flex-row items-stretch gap-0 min-h-[460px] lg:min-h-[500px]">
        
        {/* ─── Left Tabs Navigation Column ─── */}
        <div className="w-full lg:w-[360px] xl:w-[400px] shrink-0 flex flex-col justify-center py-4 lg:py-6 pr-0 lg:pr-0 z-10">
          <div className="flex flex-col gap-1.5 sm:gap-2">
            {items.map((item) => {
              const isActive = item.id === activeItem.id

              return (
                <div
                  key={item.id}
                  onClick={() => onSelect(item.id)}
                  onMouseEnter={() => onSelect(item.id)}
                  className={`relative cursor-pointer select-none transition-all duration-300 p-5 sm:p-6 lg:p-7 ${
                    isActive
                      ? 'bg-[#a3b5c4]/20 dark:bg-[#a3b5c4]/15 border-l-2 border-[#a3b5c4] rounded-2xl lg:rounded-l-2xl lg:rounded-r-none z-20 shadow-sm'
                      : 'bg-transparent hover:bg-black/[0.02] dark:hover:bg-white/[0.03] rounded-2xl text-[var(--lede)] opacity-70 hover:opacity-100 z-10'
                  }`}
                >
                  {/* Inverted Superellipse Fillets on Desktop */}
                  {isActive && (
                    <>
                      <InvertedCornerTop className="text-[#a3b5c4]/20 dark:text-[#a3b5c4]/15 hidden lg:block" />
                      <InvertedCornerBottom className="text-[#a3b5c4]/20 dark:text-[#a3b5c4]/15 hidden lg:block" />
                    </>
                  )}

                  {/* Tab Title */}
                  <div className="flex items-center justify-between gap-3">
                    <h3
                      className={`text-xl sm:text-2xl lg:text-[26px] font-bold tracking-tight transition-colors ${
                        isActive ? 'text-[#000000] dark:text-[#ffffff]' : 'text-[var(--ink)]'
                      }`}
                    >
                      {item.title}
                    </h3>

                    {item.badge && (
                      <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#a3b5c4]/15 text-[var(--ink)] dark:text-[#a3b5c4] border border-[#a3b5c4]/30 font-medium">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Expandable Active Description */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={springTransition}
                        className="overflow-hidden"
                      >
                        <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#4f5d6b] dark:text-[#a3b5c4] font-normal">
                          {item.description}
                        </p>

                        {item.tags && (
                          <div className="mt-3.5 flex flex-wrap gap-1.5">
                            {item.tags.split(',').map((tag) => (
                              <span
                                key={tag.trim()}
                                className="text-[10px] font-mono tracking-wider px-2 py-0.5 bg-[#a3b5c4]/10 dark:bg-[#a3b5c4]/15 rounded text-[var(--ink)] dark:text-[#a3b5c4] border border-[#a3b5c4]/25"
                              >
                                {tag.trim()}
                              </span>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>

        {/* ─── Right Showcase Panel ─── */}
        <div className="flex-1 rounded-[22px] sm:rounded-[26px] bg-[#a3b5c4]/20 dark:bg-[#a3b5c4]/15 p-2.5 sm:p-3 flex flex-col transition-colors duration-300 relative overflow-hidden min-h-[340px] sm:min-h-[440px] lg:min-h-[500px]">
          <div className="relative w-full h-full flex-1 rounded-[16px] sm:rounded-[20px] overflow-hidden bg-black/5 dark:bg-black/40 border border-[#a3b5c4]/30 dark:border-[#a3b5c4]/25">
            
            {/* Cross-fading Active Venture Screenshot */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.01 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full"
              >
                <img
                  src={activeItem.image.src}
                  alt={activeItem.image.alt}
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                />

                {/* Ambient Bottom Gradient for Contrast */}
                <div
                  className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none"
                  aria-hidden="true"
                />

                {/* Bottom Venture Action Bar */}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                  <div>
                    {activeItem.subtitle && (
                      <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#a3b5c4] block mb-1">
                        {activeItem.subtitle}
                      </span>
                    )}
                    <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {activeItem.title}
                    </h4>
                  </div>

                  {/* Launch Venture CTA */}
                  <a
                    href={activeItem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#fce9c7] text-[#000000] hover:bg-[#ffffff] text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 shadow-xl group hover:scale-[1.02]"
                  >
                    <span>{activeItem.buttonText}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>
        </div>

      </div>
    </div>
  )
}
