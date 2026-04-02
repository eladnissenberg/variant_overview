import { useEffect, useRef } from 'react'

export function Starfield({ starCount = 80 }) {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const mouseRef = useRef({ x: -9999, y: -9999, active: false })
  const starsRef = useRef([])
  const startTimeRef = useRef(Date.now())

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1

    const rand = (min, max) => Math.random() * (max - min) + min

    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
    }

    const layers = [
      { speedMultiplier: 0.3, sizeMultiplier: 0.7, minOpacity: 0.15, maxOpacity: 0.25, pulseAmplitude: 0.08, pulseSpeed: 0.0008 },
      { speedMultiplier: 0.65, sizeMultiplier: 0.9, minOpacity: 0.25, maxOpacity: 0.35, pulseAmplitude: 0.12, pulseSpeed: 0.0012 },
      { speedMultiplier: 1.0, sizeMultiplier: 1.1, minOpacity: 0.35, maxOpacity: 0.5, pulseAmplitude: 0.15, pulseSpeed: 0.0015 },
    ]

    const createStar = () => {
      const angle = rand(0, Math.PI * 2)
      const depth = Math.floor(rand(0, 3))
      const layer = layers[depth]
      const baseSpeed = rand(0.02, 0.1) * dpr * layer.speedMultiplier
      const isTeal = Math.random() < 0.12

      return {
        x: rand(0, canvas.width),
        y: rand(0, canvas.height),
        vx: Math.cos(angle) * baseSpeed,
        vy: Math.sin(angle) * baseSpeed,
        baseOpacity: rand(layer.minOpacity, layer.maxOpacity),
        opacity: 0,
        radius: rand(1.0, 1.8) * dpr * layer.sizeMultiplier,
        depth,
        pulsePhase: rand(0, Math.PI * 2),
        pulseSpeed: layer.pulseSpeed,
        pulseAmplitude: layer.pulseAmplitude,
        isTeal,
      }
    }

    resize()
    starsRef.current = Array.from({ length: starCount }, createStar)

    const margin = 20 * dpr
    const attractRadius = 300 * dpr

    const handleMouseMove = (e) => {
      const d = window.devicePixelRatio || 1
      mouseRef.current = { x: e.clientX * d, y: e.clientY * d, active: true }
    }
    const handleMouseLeave = () => { mouseRef.current.active = false }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    const draw = () => {
      const w = canvas.width
      const h = canvas.height
      const mouse = mouseRef.current
      const currentTime = Date.now() - startTimeRef.current

      ctx.clearRect(0, 0, w, h)

      for (const s of starsRef.current) {
        const pulseValue = Math.sin(currentTime * s.pulseSpeed + s.pulsePhase)
        s.opacity = s.baseOpacity + pulseValue * s.pulseAmplitude

        if (mouse.active) {
          const dx = mouse.x - s.x
          const dy = mouse.y - s.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < attractRadius && dist > 1) {
            const depthMultiplier = 0.6 + s.depth * 0.3
            const force = (1 - dist / attractRadius) * 0.08 * depthMultiplier
            s.vx += (dx / dist) * force
            s.vy += (dy / dist) * force
          }
        }

        const speed = Math.sqrt(s.vx * s.vx + s.vy * s.vy)
        const maxSpd = 0.1 * dpr * layers[s.depth].speedMultiplier * 3
        if (speed > maxSpd) { s.vx *= 0.98; s.vy *= 0.98 }

        s.x += s.vx
        s.y += s.vy

        if (s.x < -margin) s.x += w + margin * 2
        else if (s.x > w + margin) s.x -= w + margin * 2
        if (s.y < -margin) s.y += h + margin * 2
        else if (s.y > h + margin) s.y -= h + margin * 2

        ctx.beginPath()
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2)

        const color = s.isTeal ? '0, 217, 163' : '255, 255, 255'

        if (s.depth === 2) {
          ctx.shadowBlur = s.radius * 2
          ctx.shadowColor = `rgba(${color}, ${s.opacity * 0.3})`
        }

        ctx.fillStyle = `rgba(${color}, ${s.opacity.toFixed(3)})`
        ctx.fill()
        ctx.shadowBlur = 0
      }

      animationRef.current = requestAnimationFrame(draw)
    }

    const handleResize = () => {
      const oldW = canvas.width
      const oldH = canvas.height
      resize()
      const newD = window.devicePixelRatio || 1
      const scaleX = canvas.width / oldW
      const scaleY = canvas.height / oldH
      for (const s of starsRef.current) {
        s.x *= scaleX
        s.y *= scaleY
        s.radius = rand(1.0, 1.8) * newD * layers[s.depth].sizeMultiplier
      }
    }

    window.addEventListener('resize', handleResize)
    draw()

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', handleResize)
    }
  }, [starCount])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  )
}
