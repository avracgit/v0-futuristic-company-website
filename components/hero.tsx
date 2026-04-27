'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const WORDS = ['Innovation', 'Technology', 'Excellence', 'Disruption', 'Growth']

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [wordIndex, setWordIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const animFrameRef = useRef<number>(0)
  const mouseRef = useRef({ x: 0, y: 0 })

  // Typewriter effect
  useEffect(() => {
    const target = WORDS[wordIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 90)
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 1800)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 50)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setWordIndex((i) => (i + 1) % WORDS.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, deleting, wordIndex])

  // Interactive particle canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Particles
    const count = window.innerWidth < 768 ? 60 : 140
    const particles: {
      x: number; y: number; vx: number; vy: number
      size: number; color: string; opacity: number
    }[] = []
    const colors = ['#00d4ff', '#0066ff', '#7c3aed', '#00d4ff', '#ffffff']

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.5 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.6 + 0.2,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const mouseRadius = 120

      // Update & draw particles
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        const dx = mx - p.x
        const dy = my - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < mouseRadius) {
          const force = (mouseRadius - dist) / mouseRadius * 0.015
          p.vx -= (dx / dist) * force
          p.vy -= (dy / dist) * force
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.opacity
        ctx.fill()
        ctx.globalAlpha = 1
      }

      // Draw connections
      const connectionDist = 130
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const pa = particles[i]
          const pb = particles[j]
          const dx = pa.x - pb.x
          const dy = pa.y - pb.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < connectionDist) {
            const opacity = (1 - dist / connectionDist) * 0.25
            ctx.beginPath()
            ctx.moveTo(pa.x, pa.y)
            ctx.lineTo(pb.x, pb.y)
            ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg"
    >
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,102,255,0.08) 0%, rgba(0,212,255,0.04) 40%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Side accent glows */}
      <div
        className="absolute top-1/3 -left-32 w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-20"
        style={{ background: 'var(--neon-violet)' }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/4 -right-32 w-80 h-80 rounded-full pointer-events-none blur-3xl opacity-15"
        style={{ background: 'var(--neon-cyan)' }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(0,212,255,0.3)] bg-[rgba(0,212,255,0.05)] mb-8 fade-in-up">
          <span className="w-2 h-2 rounded-full bg-[var(--neon-cyan)] pulse-glow" />
          <span className="font-mono text-xs text-[var(--neon-cyan)] tracking-widest uppercase">
            Multi-Domain Powerhouse
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-sans font-bold text-5xl md:text-7xl lg:text-8xl leading-none tracking-tight text-balance mb-6 fade-in-up">
          <span className="text-foreground">Driving</span>{' '}
          <span className="shimmer-text">{displayed}</span>
          <span className="text-[var(--neon-cyan)] cursor-blink">|</span>
          <br />
          <span className="text-foreground">Across Every</span>{' '}
          <span className="text-[var(--neon-cyan)]">Domain</span>
        </h1>

        {/* Subheadline */}
        <p className="text-[#a0a8c0] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10 fade-in-up">
          ConglomerateIT is a multi-vertical enterprise that has consistently delivered exceptional
          results across technology, business, and industry — redefining what&apos;s possible.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 fade-in-up">
          <Link
            href="#verticals"
            className="px-8 py-3.5 rounded-xl bg-[var(--neon-cyan)] text-black font-semibold text-sm tracking-wide hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] hover:scale-105 transition-all duration-300"
          >
            Explore Verticals
          </Link>
          <Link
            href="#about"
            className="px-8 py-3.5 rounded-xl border border-[rgba(255,255,255,0.15)] text-foreground font-semibold text-sm tracking-wide hover:border-[var(--neon-cyan)] hover:text-[var(--neon-cyan)] transition-all duration-300"
          >
            About Us
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="mt-20 flex flex-col items-center gap-2 opacity-50">
          <span className="font-mono text-xs text-[#6b7494] tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-[var(--neon-cyan)] to-transparent" />
        </div>
      </div>
    </section>
  )
}
