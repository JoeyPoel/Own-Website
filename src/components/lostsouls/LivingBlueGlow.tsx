import React from 'react'
import HalftoneBloom from '../originkit/ui/halftone-bloom'

/**
 * LivingBlueGlow Component:
 * Renders the living visual background for Lost Souls:
 * - Originkit "Halftone Bloom" 86-layer WebGL2 folded ribbon field with rotated halftone grid
 * - Interactive pointer tracking: halftone dots swell and bloom toward the cursor.
 *
 * @returns {JSX.Element} Ambient halftone bloom field.
 */
export const LivingBlueGlow: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-auto z-0 overflow-hidden select-none"
    >
      <HalftoneBloom
        background="#000000"
        color1="#008cff"
        color2="#0044ff"
        speed={35}
        size={140}
        angle={180}
        dotSize={6}
        hover={180}
        reach={380}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.65,
        }}
      />
    </div>
  )
}

export default LivingBlueGlow
