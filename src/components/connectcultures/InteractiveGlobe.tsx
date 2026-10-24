import React, { useState, useEffect } from 'react'
import TerraDuskGlobe from '../originkit/TerraDuskGlobe'

interface InteractiveGlobeProps {
  className?: string
}

/**
 * Responsive Interactive Globe:
 * - On Mobile (< 1024px): Renders high-resolution photorealistic Earth globe asset with
 *   atmospheric Rayleigh cyan rim bloom, subtle floating animation, and crisp performance.
 * - On Desktop (>= 1024px): Renders full 3D interactive TerraDusk WebGL Earth.
 *
 * @param {InteractiveGlobeProps} props - Component props.
 * @returns {JSX.Element} Responsive interactive Earth globe.
 */
export const InteractiveGlobe: React.FC<InteractiveGlobeProps> = ({
  className = '',
}) => {
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024
    }
    return false
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)')
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {isDesktop ? (
        <TerraDuskGlobe className="w-full h-full" />
      ) : (
        /* Mobile Photorealistic High-Res Earth Globe */
        <div className="relative flex items-center justify-center py-2 select-none">
          <img
            src="/images/globe/earth-globe.jpg"
            alt="Connect Cultures 3D Earth Globe"
            className="w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] object-contain pointer-events-none rounded-full shadow-[0_0_60px_rgba(56,189,248,0.4)]"
            loading="eager"
          />
        </div>
      )}
    </div>
  )
}

export default InteractiveGlobe
