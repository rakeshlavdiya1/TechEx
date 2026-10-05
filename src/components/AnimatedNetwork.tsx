import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

interface AnimatedNetworkProps {
  className?: string
  color?: string
  density?: number
}

interface Node { x: number; y: number; vx: number; vy: number }

/** Lightweight canvas network: glowing nodes and lines. Pauses off-screen. */
export default function AnimatedNetwork({ className = '', color = '34,211,238', density = 1 }: AnimatedNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let nodes: Node[] = []
    let frame = 0
    let visible = true

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round(Math.min(70, (width * height) / 22000) * density)
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      const maxDist = Math.min(150, width / 4)
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        if (!reduce) {
          a.x += a.vx
          a.y += a.vy
          if (a.x < 0 || a.x > width) a.vx *= -1
          if (a.y < 0 || a.y > height) a.vy *= -1
        }
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < maxDist) {
            ctx.strokeStyle = `rgba(${color},${(1 - dist / maxDist) * 0.22})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
        ctx.fillStyle = `rgba(${color},0.75)`
        ctx.beginPath()
        ctx.arc(a.x, a.y, 1.6, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const loop = () => {
      if (visible) draw()
      frame = requestAnimationFrame(loop)
    }

    resize()
    draw()
    if (!reduce) frame = requestAnimationFrame(loop)

    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting })
    observer.observe(canvas)
    const onResize = () => { resize(); draw() }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('resize', onResize)
    }
  }, [color, density, reduce])

  return <canvas ref={canvasRef} aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />
}
