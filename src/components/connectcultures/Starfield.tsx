import React, { useMemo } from 'react'

interface Star {
  id: number
  top: number
  left: number
  size: number
  opacity: number
  duration: number
  delay: number
  glow?: boolean
}

/**
 * Deterministic Starfield component rendering sparkling cosmic stars across the hero section.
 * Optimized with static calculations and pure CSS animation for 60-120fps performance.
 *
 * @returns {JSX.Element} Ambient cosmic starfield canvas.
 */
export const Starfield: React.FC = () => {
  const stars: Star[] = useMemo(() => {
    const list: Star[] = []
    const count = 90

    for (let i = 0; i < count; i++) {
      const seed1 = (i * 9301 + 49297) % 233280
      const seed2 = (i * 49297 + 9301) % 233280
      const seed3 = (i * 12345 + 6789) % 233280

      const top = (seed1 / 233280) * 100
      const left = (seed2 / 233280) * 100
      const r = seed3 / 233280

      const size = r > 0.85 ? 2.5 : r > 0.5 ? 1.8 : 1.2
      const opacity = 0.25 + (r * 0.7)
      const duration = 3 + (r * 4)
      const delay = (i % 7) * 0.7
      const glow = r > 0.9

      list.push({
        id: i,
        top,
        left,
        size,
        opacity,
        duration,
        delay,
        glow,
      })
    }
    return list
  }, [])

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-10"
    >
      {stars.map((star) => (
        <span
          key={star.id}
          className={`absolute rounded-full will-change-transform ${
            star.glow
              ? 'bg-[#38bdf8] shadow-[0_0_12px_#38bdf8]'
              : 'bg-[#f8fafc]'
          }`}
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `pulseSubtle ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      {/* Atmospheric Horizon Veil */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[150px] bg-[#4fa8ff]/20 pointer-events-none -z-20" />
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] rounded-full blur-[140px] bg-[#0066cc]/15 pointer-events-none -z-20" />
    </div>
  )
}

export default Starfield
