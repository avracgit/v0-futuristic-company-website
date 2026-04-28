'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

interface Orb {
  x: number; y: number; z: number
  r: number; color: string
  vx: number; vy: number
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rotRef    = useRef(0)
  const rafRef    = useRef<number>(0)
  const dragRef   = useRef({ active: false, lastX: 0, velocity: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // ── sizing ──────────────────────────────────────────────
    const setSize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect()
      canvas.width  = rect.width
      canvas.height = rect.height
    }
    setSize()
    const ro = new ResizeObserver(setSize)
    ro.observe(canvas.parentElement!)

    // ── floating orbs ───────────────────────────────────────
    // Positions match hand-drawn sketch (offsets relative to globe center)
    const orbs: Orb[] = [
      // Large red — far top-left, well clear of globe
      { x: -340, y: -220, z: 0, r: 18, color: '#dc2626', vx: 0, vy: 0 },
      // Medium blue — upper-left, between large red and globe
      { x: -270, y: -145, z: 0, r: 11, color: '#3b82f6', vx: 0, vy: 0 },
      // Small red — just above globe top-center (above north pole)
      { x:  -40, y: -235, z: 0, r:  8, color: '#dc2626', vx: 0, vy: 0 },
      // Small teal — close to globe, upper-left edge
      { x: -215, y:  -90, z: 0, r:  6, color: '#06b6d4', vx: 0, vy: 0 },
      // Medium teal — mid-left, slightly further out
      { x: -290, y:   10, z: 0, r:  9, color: '#06b6d4', vx: 0, vy: 0 },
      // Large blue — mid-left, close to left edge
      { x: -330, y:  -30, z: 0, r: 14, color: '#3b82f6', vx: 0, vy: 0 },
      // Largest teal — lower-left, biggest orb
      { x: -305, y:  140, z: 0, r: 20, color: '#06b6d4', vx: 0, vy: 0 },
      // Medium blue — lower-left below large teal
      { x: -240, y:  195, z: 0, r: 10, color: '#3b82f6', vx: 0, vy: 0 },
      // Small teal — bottom center-left
      { x: -100, y:  255, z: 0, r:  6, color: '#06b6d4', vx: 0, vy: 0 },
    ]

    // ── constants ───────────────────────────────────────────
    const LATS  = 12
    const LNGS  = 18

    function project(x: number, y: number, z: number, cx: number, cy: number): [number, number, number] {
      const fov   = 900
      const scale = fov / (fov + z)
      return [cx + x * scale, cy + y * scale, scale]
    }

    // Red only for top-left ~third of the globe: wx < 0 AND wy < -R*0.2
    // Everything else is blue
    function sphereColor(wx: number, wy: number, R: number): { line: string; dot: string } {
      const nx = wx / R   // -1 … 1
      const ny = wy / R   // -1 … 1
      const isRed = nx < -0.05 && ny < -0.15
      const depth = 0.35 + Math.abs(nx) * 0.65

      if (isRed) {
        return {
          line: `rgba(220,38,38,${(depth * 0.55).toFixed(2)})`,
          dot:  `rgba(220,38,38,${(depth * 0.90).toFixed(2)})`,
        }
      }
      return {
        line: `rgba(59,130,246,${(depth * 0.55).toFixed(2)})`,
        dot:  `rgba(59,130,246,${(depth * 0.90).toFixed(2)})`,
      }
    }

    function drawGlobe(rot: number) {
      const W = canvas.width
      const H = canvas.height
      // Globe sits far right, centered vertically
      const cx = W * 0.72
      const cy = H * 0.50
      const R  = Math.min(H * 0.28, 190)

      // ── latitude rings ──────────────────────────────────
      for (let i = 1; i < LATS; i++) {
        const phi = (i / LATS) * Math.PI
        const ry  = R * Math.cos(phi)
        const rr  = R * Math.sin(phi)
        const STEPS = 80

        // Collect all points first for per-segment coloring
        const pts: { px: number; py: number; wx: number; wy: number; wz: number }[] = []
        for (let s = 0; s <= STEPS; s++) {
          const theta = (s / STEPS) * Math.PI * 2 + rot
          const wx = rr * Math.sin(theta)
          const wz = rr * Math.cos(theta)
          const wy = ry
          const [px, py] = project(wx, wy, wz, cx, cy)
          pts.push({ px, py, wx, wy, wz })
        }

        // Draw segment-by-segment so color transitions smoothly
        for (let s = 0; s < STEPS; s++) {
          const { line } = sphereColor(pts[s].wx, pts[s].wy, R)
          ctx.beginPath()
          ctx.moveTo(pts[s].px, pts[s].py)
          ctx.lineTo(pts[s + 1].px, pts[s + 1].py)
          ctx.strokeStyle = line
          ctx.lineWidth = 0.8
          ctx.stroke()
        }
      }

      // ── meridians ───────────────────────────────────────
      for (let j = 0; j < LNGS; j++) {
        const theta = (j / LNGS) * Math.PI * 2 + rot
        const STEPS = 60

        const pts: { px: number; py: number; wx: number; wy: number; wz: number }[] = []
        for (let s = 0; s <= STEPS; s++) {
          const phi = (s / STEPS) * Math.PI
          const wx  = R * Math.sin(phi) * Math.sin(theta)
          const wy  = R * Math.cos(phi)
          const wz  = R * Math.sin(phi) * Math.cos(theta)
          const [px, py] = project(wx, wy, wz, cx, cy)
          pts.push({ px, py, wx, wy, wz })
        }

        for (let s = 0; s < STEPS; s++) {
          const { line } = sphereColor(pts[s].wx, pts[s].wy, R)
          ctx.beginPath()
          ctx.moveTo(pts[s].px, pts[s].py)
          ctx.lineTo(pts[s + 1].px, pts[s + 1].py)
          ctx.strokeStyle = line
          ctx.lineWidth = 0.8
          ctx.stroke()
        }
      }

      // ── intersection dots ────────────────────────────────
      for (let i = 1; i < LATS; i++) {
        const phi = (i / LATS) * Math.PI
        const ry  = R * Math.cos(phi)
        const rr  = R * Math.sin(phi)
        for (let j = 0; j < LNGS; j++) {
          const theta = (j / LNGS) * Math.PI * 2 + rot
          const wx = rr * Math.sin(theta)
          const wz = rr * Math.cos(theta)
          const wy = ry
          // Cull back-face
          if (wz < -R * 0.1) continue
          const [px, py, sc] = project(wx, wy, wz, cx, cy)
          const { dot } = sphereColor(wx, wy, R)
          const dr = Math.max(0.8, 2.0 * sc + (wz / R) * 0.8)
          ctx.beginPath()
          ctx.arc(px, py, dr, 0, Math.PI * 2)
          ctx.fillStyle = dot
          ctx.fill()
        }
      }
    }

    function drawOrbs() {
      const W = canvas.width
      const H = canvas.height
      const cx = W * 0.72
      const cy = H * 0.50

      for (const orb of orbs) {
        // Static positioning — no animation
        const [px, py] = project(orb.x, orb.y, orb.z, cx, cy)
        const base = orb.color === '#dc2626' ? '220,38,38' : orb.color === '#06b6d4' ? '6,182,212' : '59,130,246'
        
        // Glow halo
        const grd  = ctx.createRadialGradient(px, py, 0, px, py, orb.r * 3.2)
        grd.addColorStop(0,   `rgba(${base},0.50)`)
        grd.addColorStop(0.4, `rgba(${base},0.18)`)
        grd.addColorStop(1,   `rgba(${base},0)`)
        ctx.beginPath()
        ctx.arc(px, py, orb.r * 3.2, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()

        // Solid core
        ctx.beginPath()
        ctx.arc(px, py, orb.r, 0, Math.PI * 2)
        ctx.fillStyle = orb.color
        ctx.fill()
      }
    }

    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Auto-spin when not dragging; coast with velocity after drag release
      if (!dragRef.current.active) {
        if (Math.abs(dragRef.current.velocity) > 0.0002) {
          dragRef.current.velocity *= 0.96   // friction
          rotRef.current += dragRef.current.velocity
        } else {
          dragRef.current.velocity = 0
          rotRef.current += 0.004            // steady auto-spin
        }
      }

      drawOrbs()
      drawGlobe(rotRef.current)
      rafRef.current = requestAnimationFrame(tick)
    }

    // ── mouse drag handlers ─────────────────────────────────
    const onMouseDown = (e: MouseEvent) => {
      dragRef.current.active = true
      dragRef.current.lastX  = e.clientX
      dragRef.current.velocity = 0
      canvas.style.cursor = 'grabbing'
    }
    const onMouseMove = (e: MouseEvent) => {
      if (!dragRef.current.active) return
      const dx = e.clientX - dragRef.current.lastX
      dragRef.current.velocity = dx * 0.003
      rotRef.current += dragRef.current.velocity
      dragRef.current.lastX = e.clientX
    }
    const onMouseUp = () => {
      dragRef.current.active = false
      canvas.style.cursor = 'grab'
    }

    canvas.style.cursor = 'grab'
    canvas.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup',   onMouseUp)

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      canvas.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup',   onMouseUp)
    }
  }, [])

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden gradient-hero pt-20">
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* Gradient fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-[var(--background)] pointer-events-none z-10" />

      {/* Text — left column */}
      <div className="relative z-10 min-h-screen flex items-center px-8 md:px-16 lg:px-20 pointer-events-none">
        <div className="max-w-lg lg:max-w-xl fade-in-up pointer-events-auto">
          <p className="text-xs font-semibold tracking-widest uppercase text-[var(--text-muted)] mb-8">
            Trusted in 30+ countries
          </p>

          <h1 className="font-semibold text-5xl md:text-6xl lg:text-7xl leading-[1.2] tracking-tight text-balance mb-8">
            <span className="text-[var(--brand-red)]">Connected.</span>
            <br />
            <span className="text-[var(--brand-blue)]">Global.</span>
            <br />
            <span className="text-foreground">Limitless.</span>
          </h1>

          <p className="text-[var(--text-secondary)] text-lg md:text-xl leading-8 mb-12 max-w-md">
            Empowering businesses across borders with intelligence and innovation across every industry vertical.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Link href="/services" className="btn-primary">
              Explore Services
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/contact" className="btn-ghost">
              Contact Us
            </Link>
          </div>

          <div className="mt-20">
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
              <svg className="w-4 h-4 text-[var(--brand-blue)] scroll-indicator" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              Scroll to explore
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
