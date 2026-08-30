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
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    // Generate Cloud Formations (Larger, flatter bottom shape)
    const clouds: CloudGroup[] = []
    const cloudCount = Math.max(9, Math.floor(width / 120))

    for (let i = 0; i < cloudCount; i++) {
      // Spread clouds across the viewport and off-screen to the left to create a continuous stream
      const baseX = Math.random() * (width + 600) - 600
      const baseY = Math.random() * (height * 0.85)
      const speedX = 0.06 + Math.random() * 0.12
      const particles: CloudParticle[] = []
      const pCount = 15 + Math.floor(Math.random() * 10)

      for (let j = 0; j < pCount; j++) {
        // Flat bottom layout: offset X is wider, offset Y is skewed upwards (restricted positive range)
        const offsetX = (Math.random() - 0.5) * 190
        const offsetY = -Math.abs(Math.random() * 55) + 15
        // Bigger radius
        const radius = 32 + Math.random() * 32
        const char = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)]

        particles.push({
          x: offsetX,
          y: offsetY,
          radius,
          speedX: (Math.random() - 0.5) * 0.04,
          speedY: (Math.random() - 0.5) * 0.04,
          char,
          opacity: 0.35 + Math.random() * 0.5,
          size: 11 + Math.floor(Math.random() * 4),
          layer: Math.random() > 0.5 ? 1 : 2
        })
      }

      clouds.push({
        x: baseX,
        y: baseY,
        speedX,
        particles
      })
    }

    // Pre-render Binary Grid Pattern Canvas (Highly Optimized)
    const patternCanvas = document.createElement('canvas')
    patternCanvas.width = 130
    patternCanvas.height = 130
    const pCtx = patternCanvas.getContext('2d')
    let pattern: CanvasPattern | null = null

    if (pCtx) {
      pCtx.fillStyle = 'rgba(255, 255, 255, 0.95)'
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

    // Pre-render a white soft cloud puff sprite to avoid createRadialGradient calls on every frame
    const puffCanvas = document.createElement('canvas')
    puffCanvas.width = 128
    puffCanvas.height = 128
    const puffCtx = puffCanvas.getContext('2d')
    if (puffCtx) {
      const grad = puffCtx.createRadialGradient(64, 64, 2, 64, 64, 60)
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)')
      grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.75)')
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)')
      puffCtx.fillStyle = grad
      puffCtx.beginPath()
      puffCtx.arc(64, 64, 60, 0, Math.PI * 2)
      puffCtx.fill()
    }

    let lastTime = 0
    const fpsInterval = 1000 / 40 // Capped at 40 FPS to save CPU/GPU cycles
    let lastScrollY = -1
    let lastWidth = -1
    let lastHeight = -1
    let cachedSkyGradient: CanvasGradient | null = null

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

      // Clear Canvas
      ctx.clearRect(0, 0, width, height)

      // 2. Cache Calculations & CSS variable updates unless scroll or size changes
      if (scrollY !== lastScrollY || width !== lastWidth || height !== lastHeight || !cachedSkyGradient) {
        lastScrollY = scrollY
        lastWidth = width
        lastHeight = height

        // 1. Interpolate Sky Background Colors (Morning blue sky to soft light sunset/twilight)
        let r1, g1, b1
        let r2, g2, b2
        let r3, g3, b3

        if (scrollProgress < 0.5) {
          const t = scrollProgress / 0.5
          // Top: Deeper Blue (22, 54, 165) -> Richer Blue (130, 175, 240)
          r1 = Math.round(22 + (130 - 22) * t)
          g1 = Math.round(54 + (175 - 54) * t + Math.sin(t * Math.PI) * 15)
          b1 = Math.round(165 + (240 - 165) * t)

          // Middle: Bright sky blue (40, 155, 235) -> Deep peach (240, 180, 135)
          // Add a curved transition to keep the colors saturated and avoid a gray/muddy midpoint
          r2 = Math.round(40 + (240 - 40) * t)
          g2 = Math.round(155 + (180 - 155) * t + Math.sin(t * Math.PI) * 35)
          b2 = Math.round(235 + (135 - 235) * t + Math.sin(t * Math.PI) * 15)

          // Bottom: Soft sky blue (180, 220, 250) -> Warm yellow (245, 220, 115)
          r3 = Math.round(180 + (245 - 180) * t)
          g3 = Math.round(220 + (220 - 220) * t + Math.sin(t * Math.PI) * 20)
          b3 = Math.round(250 + (115 - 250) * t)
        } else {
          const t = (scrollProgress - 0.5) / 0.5
          // Top: Richer Blue (130, 175, 240) -> Twilight Purple (200, 150, 225)
          r1 = Math.round(130 + (200 - 130) * t)
          g1 = Math.round(175 + (150 - 175) * t)
          b1 = Math.round(240 + (225 - 240) * t)

          // Middle: Deep peach (240, 180, 135) -> Sunset Pink (235, 130, 150)
          r2 = Math.round(240 + (235 - 240) * t)
          g2 = Math.round(180 + (130 - 180) * t)
          b2 = Math.round(135 + (150 - 135) * t)

          // Bottom: Warm yellow (245, 220, 115) -> Deep Horizon Gold (245, 210, 155)
          r3 = Math.round(245 + (245 - 245) * t)
          g3 = Math.round(220 + (210 - 220) * t)
          b3 = Math.round(115 + (155 - 115) * t)
        }

        cachedSkyGradient = ctx.createLinearGradient(0, 0, 0, height)
        cachedSkyGradient.addColorStop(0, `rgb(${r1}, ${g1}, ${b1})`)
        cachedSkyGradient.addColorStop(0.5, `rgb(${r2}, ${g2}, ${b2})`)
        cachedSkyGradient.addColorStop(1, `rgb(${r3}, ${g3}, ${b3})`)

        // 1.5. Interpolate Dynamic UI Accent Colors
        let ar, ag, ab // Accent primary
        let sr, sg, sb // Accent secondary

        if (scrollProgress < 0.5) {
          const t = scrollProgress / 0.5
          // Primary: Sky Blue (2, 132, 199) -> Orange/Coral (234, 88, 12)
          ar = Math.round(2 + (234 - 2) * t)
          ag = Math.round(132 + (88 - 132) * t)
          ab = Math.round(199 + (12 - 199) * t)

          // Secondary: Cyan (8, 145, 178) -> Rose (219, 39, 119)
          sr = Math.round(8 + (219 - 8) * t)
          sg = Math.round(145 + (39 - 145) * t)
          sb = Math.round(178 + (119 - 178) * t)
        } else {
          const t = (scrollProgress - 0.5) / 0.5
          // Primary: Orange/Coral (234, 88, 12) -> Lavender/Violet (124, 58, 237)
          ar = Math.round(234 + (124 - 234) * t)
          ag = Math.round(88 + (58 - 88) * t)
          ab = Math.round(12 + (237 - 12) * t)

          // Secondary: Rose (219, 39, 119) -> Warm Gold (217, 119, 6)
          sr = Math.round(219 + (217 - 219) * t)
          sg = Math.round(39 + (119 - 39) * t)
          sb = Math.round(119 + (6 - 119) * t)
        }

        // Update root CSS custom properties (only runs when scroll changes, preventing layout thrashing)
        document.documentElement.style.setProperty('--theme-color', `rgb(${ar}, ${ag}, ${ab})`)
        document.documentElement.style.setProperty('--theme-color-rgb', `${ar}, ${ag}, ${ab}`)
        document.documentElement.style.setProperty('--theme-accent', `rgb(${sr}, ${sg}, ${sb})`)
        document.documentElement.style.setProperty('--theme-accent-rgb', `${sr}, ${sg}, ${sb}`)
        document.documentElement.style.setProperty('--sky-top', `rgb(${r1}, ${g1}, ${b1})`)
        document.documentElement.style.setProperty('--sky-mid', `rgb(${r2}, ${g2}, ${b2})`)
        document.documentElement.style.setProperty('--sky-bottom', `rgb(${r3}, ${g3}, ${b3})`)
      }

      ctx.fillStyle = cachedSkyGradient
      ctx.fillRect(0, 0, width, height)

      // Calculate Morph Ratios (stretched transition to morph clouds into code slower)
      const cloudPuffOpacity = Math.max(0, 1 - scrollProgress * 1.05)
      const codeOpacity = Math.min(1, scrollProgress * 0.95)



      // 2. Render Animated Floating Clouds & Code
      clouds.forEach((cloud) => {
        // Drift the entire cloud group horizontally to the right
        cloud.x += cloud.speedX
        
        const isOffScreenRight = cloud.x - 220 > width
        if (isOffScreenRight) {
          // Stagger starting coordinate off-screen to the left so clouds enter one by one at intervals
          cloud.x = -220 - Math.random() * 600
          cloud.y = Math.random() * (height * 0.85)
          
          // Reset particles to a tight cluster to clear any long-term shape dispersion
          cloud.particles.forEach((p) => {
            p.x = (Math.random() - 0.5) * 190
            p.y = -Math.abs(Math.random() * 55) + 15
          })
        }

        // Update particle offsets
        cloud.particles.forEach((p) => {
          p.x += p.speedX
          p.y += p.speedY

          // Gently reverse drift directions if particles drift too far, keeping cloud shape cohesive
          if (Math.abs(p.x) > 110) p.speedX *= -1
          if (p.y < -70 || p.y > 35) p.speedY *= -1
        })

        // Check horizontal visibility in the viewport
        const isVisible = cloud.x + 250 > 0 && cloud.x - 250 < width

        if (cloudPuffOpacity > 0.01 && isVisible) {
          cloud.particles.forEach((p) => {
            const posX = cloud.x + p.x
            const posY = cloud.y + p.y
            ctx.save()
            // Blend opacity
            ctx.globalAlpha = p.opacity * cloudPuffOpacity * 0.75
            
            // Draw pre-rendered sprite scaled to particle radius (128x128 center is 64)
            const size = p.radius * 2.8
            ctx.drawImage(puffCanvas, posX - size / 2, posY - size / 2, size, size)
            ctx.restore()
          })
        }
      })

      // 2B. Render Binary Code masked perfectly to the cloud shapes (fades in on scroll)
      if (codeOpacity > 0.01 && pattern) {
        ctx.save()
        ctx.globalAlpha = codeOpacity * 0.85

        // Translate the repeating pattern for smooth horizontal drift (scroll translation removed for optimization)
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
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-300"
    />
  )
}
