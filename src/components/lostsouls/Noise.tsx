import React, { useState } from 'react'

/**
 * Noise Component:
 * High-performance analog film grain overlay for Lost Souls rave atmosphere.
 * Generates an ultra-lightweight 128x128 static noise tile once in memory on mount.
 *
 * @returns {JSX.Element} Grain overlay.
 */
export const Noise: React.FC = () => {
  const [noiseDataUrl] = useState<string>(() => {
    if (typeof document === 'undefined') return ''
    const canvas = document.createElement('canvas')
    canvas.width = 128
    canvas.height = 128
    const ctx = canvas.getContext('2d')
    if (ctx) {
      const imgData = ctx.createImageData(128, 128)
      const data = imgData.data
      for (let i = 0; i < data.length; i += 4) {
        const val = Math.floor(Math.random() * 255)
        data[i] = val
        data[i + 1] = val
        data[i + 2] = val
        data[i + 3] = 18
      }
      ctx.putImageData(imgData, 0, 0)
      return canvas.toDataURL('image/png')
    }
    return ''
  })

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none z-10 select-none opacity-40 transform-gpu"
      style={{
        backgroundImage: noiseDataUrl ? `url("${noiseDataUrl}")` : undefined,
        backgroundRepeat: 'repeat',
      }}
    />
  )
}

export default Noise
