import { useEffect, useRef } from 'react'

interface CloudParticle {
  x: number
  y: number
  radius: number
  speedX: number
  speedY: number
  char: string
  opacity: number
  size: number
  layer: number
}

interface CloudGroup {
  x: number
  y: number
  speedX: number
  particles: CloudParticle[]
  canvas: HTMLCanvasElement
  sunriseCanvas: HTMLCanvasElement
}

const CODE_SNIPPETS = ['0', '1']

export default function CloudToCodeBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      const newWidth = window.innerWidth
      const newHeight = window.innerHeight
      // Only resize canvas if width changed or height changed significantly (ignores mobile address bar collapses)
      if (Math.abs(newWidth - width) > 10 || Math.abs(newHeight - height) > 120) {
        width = canvas.width = newWidth
        height = canvas.height = newHeight
      }
    }

    window.addEventListener('resize', handleResize, { passive: true })
    window.addEventListener('orientationchange', handleResize, { passive: true })

    // 1. Pre-render a white soft cloud puff sprite and a subtle warm tinted puff sprite
    const puffCanvas = document.createElement('canvas')
    puffCanvas.width = 256
    puffCanvas.height = 256
    const puffCtx = puffCanvas.getContext('2d')
    if (puffCtx) {
      const grad = puffCtx.createRadialGradient(128, 128, 4, 128, 128, 120)
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)')
      grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.75)')
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)')
      puffCtx.fillStyle = grad
      puffCtx.beginPath()
      puffCtx.arc(128, 128, 120, 0, Math.PI * 2)
      puffCtx.fill()
    }

    const subtlePuffCanvas = document.createElement('canvas')
    subtlePuffCanvas.width = 256
    subtlePuffCanvas.height = 256
    const sPuffCtx = subtlePuffCanvas.getContext('2d')
    if (sPuffCtx) {
      const grad = sPuffCtx.createRadialGradient(128, 128, 4, 128, 128, 120)
      grad.addColorStop(0, 'rgba(255, 248, 240, 1)')      // Soft warm white core
      grad.addColorStop(0.45, 'rgba(254, 228, 210, 0.85)') // Gentle soft peach
      grad.addColorStop(0.8, 'rgba(252, 205, 195, 0.7)')  // Subtle light rose tint
      grad.addColorStop(1, 'rgba(252, 205, 195, 0)')       // Soft transparent edge
      sPuffCtx.fillStyle = grad
      sPuffCtx.beginPath()
      sPuffCtx.arc(128, 128, 120, 0, Math.PI * 2)
      sPuffCtx.fill()
    }

    // 2. Generate Cloud Formations with Pre-Rendered canvas shapes
    const clouds: CloudGroup[] = []
    const cloudCount = Math.max(9, Math.floor(width / 120))

    for (let i = 0; i < cloudCount; i++) {
      // Spread clouds across the viewport and off-screen to the left to create a continuous stream
      const baseX = Math.random() * (width + 700) - 700
      const baseY = Math.random() * (height * 0.88)
      const speedX = 0.05 + Math.random() * 0.12
      const particles: CloudParticle[] = []
      const pCount = 8 + Math.floor(Math.random() * 6)

      // Create an off-screen canvas for the white morning cloud shape
      const cloudCanvas = document.createElement('canvas')
      cloudCanvas.width = 700
      cloudCanvas.height = 400
      const cCtx = cloudCanvas.getContext('2d')

      // Create an off-screen canvas for the subtle warm tinted cloud shape
      const sunriseCloudCanvas = document.createElement('canvas')
      sunriseCloudCanvas.width = 700
      sunriseCloudCanvas.height = 400
      const sCtx = sunriseCloudCanvas.getContext('2d')

      for (let j = 0; j < pCount; j++) {
        // Flat bottom layout: offset X is wider, offset Y is skewed upwards
        const offsetX = (Math.random() - 0.5) * 210
        const offsetY = -Math.abs(Math.random() * 55) + 12
        const radius = 45 + Math.random() * 40
        const char = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)]

        particles.push({
          x: offsetX,
          y: offsetY,
          radius,
          speedX: 0,
          speedY: 0,
          char,
          opacity: 0.35 + Math.random() * 0.5,
          size: 12 + Math.floor(Math.random() * 4),
          layer: Math.random() > 0.5 ? 1 : 2
        })

        // Draw onto white cloudCanvas (centered at 350, 200)
        const size = radius * 2.9
        if (cCtx) {
          cCtx.save()
          cCtx.globalAlpha = (0.35 + Math.random() * 0.5) * 0.75
          cCtx.drawImage(puffCanvas, 350 + offsetX - size / 2, 200 + offsetY - size / 2, size, size)
          cCtx.restore()
        }

        // Draw onto subtle warm cloudCanvas
        if (sCtx) {
          sCtx.save()
          sCtx.globalAlpha = (0.35 + Math.random() * 0.5) * 0.8
          sCtx.drawImage(subtlePuffCanvas, 350 + offsetX - size / 2, 200 + offsetY - size / 2, size, size)
          sCtx.restore()
        }
      }

      clouds.push({
        x: baseX,
        y: baseY,
        speedX,
        particles,
        canvas: cloudCanvas,
        sunriseCanvas: sunriseCloudCanvas
      })

      // CloudCanvas remains pure white with no gradient at top of page

      // Apply bottom-to-top sunrise gradient to sunriseCloudCanvas for deeper scroll
      if (sCtx) {
        sCtx.save()
        sCtx.globalCompositeOperation = 'source-in'
        const deeperGrad = sCtx.createLinearGradient(0, 265, 0, 135)
        deeperGrad.addColorStop(0, 'rgba(249, 145, 60, 1.0)')      // Bottom underside: glowing golden sunrise peach/orange
        deeperGrad.addColorStop(0.35, 'rgba(251, 185, 125, 0.98)') // Lower-mid: warm golden coral
        deeperGrad.addColorStop(0.7, 'rgba(254, 225, 195, 0.98)')  // Upper-mid: soft morning warmth
        deeperGrad.addColorStop(1, 'rgba(255, 250, 252, 0.98)')    // Top: light clean white/sky tint
        sCtx.fillStyle = deeperGrad
        sCtx.fillRect(0, 0, 700, 400)
        sCtx.restore()
      }
    }

    // Pre-render Binary Grid Pattern Canvas for Code Overlay (Uniform for seamless masking without stripe bands)
    const patternCanvas = document.createElement('canvas')
    patternCanvas.width = 130
    patternCanvas.height = 130
    const pCtx = patternCanvas.getContext('2d')
    let pattern: CanvasPattern | null = null

    if (pCtx) {
      pCtx.fillStyle = 'rgba(255, 255, 255, 0.92)'
      pCtx.font = "600 11px 'JetBrains Mono', Courier New, monospace"
      const step = 13
      for (let y = 0; y < 130; y += step) {
        for (let x = 0; x < 130; x += step) {
          const char = Math.random() > 0.5 ? '1' : '0'
          pCtx.fillText(char, x, y + 9)
        }
      }
      if (ctx) {
        pattern = ctx.createPattern(patternCanvas, 'repeat')
      }
    }

    let lastTime = 0
    const fpsInterval = 1000 / 40 // Capped at 40 FPS to save CPU/GPU cycles
    let lastScrollY = -1
    let lastWidth = -1
    let lastHeight = -1
    let hasDrawnGradient = false
    let lastCpuTime = 0

    const gradCanvas = document.createElement('canvas')
    gradCanvas.width = 1
    gradCanvas.height = 256
    const gradCtx = gradCanvas.getContext('2d')

    // Main Render Loop
    const render = (time?: number) => {
      animationFrameId = requestAnimationFrame(render)

      const currentTime = time || performance.now()
      // 1. Throttle Frame Rate
      const elapsed = currentTime - lastTime
      if (elapsed < fpsInterval) return
      lastTime = currentTime - (elapsed % fpsInterval)

      const scrollY = window.scrollY
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const scrollProgress = Math.min(1, Math.max(0, scrollY / maxScroll))

      // Shift the gradient transition downwards (no gradient at top/hero section)
      const gradientProgress = Math.max(0, (scrollProgress - 0.12) / 0.88)

      // Clear Canvas
      ctx.clearRect(0, 0, width, height)

      // 2. Cache Calculations & CSS variable updates unless scroll or size changes
      if (scrollY !== lastScrollY || width !== lastWidth || height !== lastHeight || !hasDrawnGradient) {
        lastScrollY = scrollY
        lastWidth = width
        lastHeight = height
        hasDrawnGradient = true

        // 1. Interpolate Sky Background Colors (Morning blue sky at top, shifting into soft subtle twilight downwards)
        let r1, g1, b1
        let r2, g2, b2
        let r3, g3, b3

        if (gradientProgress < 0.5) {
          const t = gradientProgress / 0.5
          // Top: Deeper Blue (22, 54, 165) -> Soft Rich Blue (85, 130, 220)
          r1 = Math.round(22 + (85 - 22) * t)
          g1 = Math.round(54 + (130 - 54) * t + Math.sin(t * Math.PI) * 15)
          b1 = Math.round(165 + (220 - 165) * t)

          // Middle: Bright sky blue (40, 155, 235) -> Gentle Peach (240, 180, 150)
          r2 = Math.round(40 + (240 - 40) * t)
          g2 = Math.round(155 + (180 - 155) * t + Math.sin(t * Math.PI) * 25)
          b2 = Math.round(235 + (150 - 235) * t)

          // Bottom: Soft sky blue (180, 220, 250) -> Warm Soft Amber (250, 215, 140)
          r3 = Math.round(180 + (250 - 180) * t)
          g3 = Math.round(220 + (215 - 220) * t + Math.sin(t * Math.PI) * 15)
          b3 = Math.round(250 + (140 - 250) * t)
        } else {
          const t = (gradientProgress - 0.5) / 0.5
          // Top: Soft Rich Blue (85, 130, 220) -> Twilight Lavender (140, 120, 205)
          r1 = Math.round(85 + (140 - 85) * t)
          g1 = Math.round(130 + (120 - 130) * t)
          b1 = Math.round(220 + (205 - 220) * t)

          // Middle: Gentle Peach (240, 180, 150) -> Soft Rose (235, 145, 155)
          r2 = Math.round(240 + (235 - 240) * t)
          g2 = Math.round(180 + (145 - 180) * t)
          b2 = Math.round(150 + (155 - 150) * t)

          // Bottom: Warm Soft Amber (250, 215, 140) -> Horizon Gold (248, 205, 155)
          r3 = Math.round(250 + (248 - 250) * t)
          g3 = Math.round(215 + (205 - 215) * t)
          b3 = Math.round(140 + (155 - 140) * t)
        }

        if (gradCtx) {
          const skyGradient = gradCtx.createLinearGradient(0, 0, 0, 256)
          skyGradient.addColorStop(0, `rgb(${r1}, ${g1}, ${b1})`)
          skyGradient.addColorStop(0.5, `rgb(${r2}, ${g2}, ${b2})`)
          skyGradient.addColorStop(1, `rgb(${r3}, ${g3}, ${b3})`)
          gradCtx.fillStyle = skyGradient
          gradCtx.fillRect(0, 0, 1, 256)
        }

        // 1.5. Interpolate Dynamic UI Accent Colors
        let ar, ag, ab // Accent primary
        let sr, sg, sb // Accent secondary

        if (gradientProgress < 0.5) {
          const t = gradientProgress / 0.5
          // Primary: Sky Blue (2, 132, 199) -> Orange/Coral (234, 88, 12)
          ar = Math.round(2 + (234 - 2) * t)
          ag = Math.round(132 + (88 - 132) * t)
          ab = Math.round(199 + (12 - 199) * t)

          // Secondary: Cyan (8, 145, 178) -> Rose (219, 39, 119)
          sr = Math.round(8 + (219 - 8) * t)
          sg = Math.round(145 + (39 - 145) * t)
          sb = Math.round(178 + (119 - 178) * t)
        } else {
          const t = (gradientProgress - 0.5) / 0.5
          // Primary: Orange/Coral (234, 88, 12) -> Lavender/Violet (124, 58, 237)
          ar = Math.round(234 + (124 - 234) * t)
          ag = Math.round(88 + (58 - 88) * t)
          ab = Math.round(12 + (237 - 12) * t)

          // Secondary: Rose (219, 39, 119) -> Warm Gold (217, 119, 6)
          sr = Math.round(219 + (217 - 219) * t)
          sg = Math.round(39 + (119 - 39) * t)
          sb = Math.round(119 + (6 - 119) * t)
        }

        // Update root CSS custom properties at a throttled rate (~15 FPS) to eliminate layout thrashing
        const currentTime = performance.now()
        if (currentTime - lastCpuTime > 66 || scrollY === 0 || scrollProgress === 1) {
          lastCpuTime = currentTime
          document.documentElement.style.setProperty('--theme-color', `rgb(${ar}, ${ag}, ${ab})`)
          document.documentElement.style.setProperty('--theme-color-rgb', `${ar}, ${ag}, ${ab}`)
          document.documentElement.style.setProperty('--theme-accent', `rgb(${sr}, ${sg}, ${sb})`)
          document.documentElement.style.setProperty('--theme-accent-rgb', `${sr}, ${sg}, ${sb}`)
          document.documentElement.style.setProperty('--sky-top', `rgb(${r1}, ${g1}, ${b1})`)
          document.documentElement.style.setProperty('--sky-mid', `rgb(${r2}, ${g2}, ${b2})`)
          document.documentElement.style.setProperty('--sky-bottom', `rgb(${r3}, ${g3}, ${b3})`)
        }
      }

      ctx.drawImage(gradCanvas, 0, 0, width, height)

      // Morph Ratios: Clouds stay visible much longer and turn into code slower
      const cloudPuffOpacity = Math.max(0.35, 1 - Math.max(0, scrollProgress - 0.15) * 0.5)
      const codeOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.25) / 0.75)) * 0.75

      // 2. Render Animated Floating Clouds with Subtle Warm Shading
      clouds.forEach((cloud) => {
        // Drift the entire cloud group horizontally to the right
        cloud.x += cloud.speedX
        
        const isOffScreenRight = cloud.x - 350 > width
        if (isOffScreenRight) {
          cloud.x = -350 - Math.random() * 700
          cloud.y = Math.random() * (height * 0.88)
        }

        // Check horizontal visibility in the viewport
        const isVisible = cloud.x + 350 > 0 && cloud.x - 350 < width

        if (isVisible && cloudPuffOpacity > 0.01) {
          // No gradient at top (100% white); gradient shifts in smoothly as you scroll downwards
          const sunriseWeight = Math.min(1, gradientProgress * 1.4)
          const whiteWeight = 1 - sunriseWeight

          if (whiteWeight > 0.01) {
            ctx.save()
            ctx.globalAlpha = cloudPuffOpacity * whiteWeight * 0.78
            ctx.drawImage(cloud.canvas, cloud.x - 350, cloud.y - 200)
            ctx.restore()
          }

          if (sunriseWeight > 0.01) {
            ctx.save()
            ctx.globalAlpha = cloudPuffOpacity * sunriseWeight * 0.78
            ctx.drawImage(cloud.sunriseCanvas, cloud.x - 350, cloud.y - 200)
            ctx.restore()
          }
        }
      })

      // 2B. Render Binary Code masked perfectly to the cloud shapes (fades in on scroll)
      if (codeOpacity > 0.01 && pattern) {
        ctx.save()
        ctx.globalAlpha = codeOpacity * 0.85

        // Translate the repeating pattern for smooth horizontal drift
        const matrix = new DOMMatrix()
        const timeDrift = (Date.now() * 0.02) % 130
        pattern.setTransform(matrix.translate(timeDrift, 0))

        ctx.fillStyle = pattern
        ctx.beginPath()
        clouds.forEach((cloud) => {
          const isVisible = cloud.x + 250 > 0 && cloud.x - 250 < width

          if (isVisible) {
            cloud.particles.forEach((p) => {
              const posX = cloud.x + p.x
              const posY = cloud.y + p.y
              ctx.moveTo(posX + p.radius * 1.35, posY)
              ctx.arc(posX, posY, p.radius * 1.35, 0, Math.PI * 2)
            })
          }
        })
        ctx.fill()
        ctx.restore()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full min-w-full min-h-full pointer-events-none z-0 transform-gpu will-change-transform"
    />
  )
}
