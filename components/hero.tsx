'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

interface Sphere {
  x: number
  y: number
  z: number
  r: number
  color: string
  vx: number
  vy: number
  vz: number
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rotRef = useRef(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // ── sizing ──────────────────────────────────────────────
    const setSize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }
    setSize()
    const ro = new ResizeObserver(setSize)
    ro.observe(canvas.parentElement!)

    // ── floating orbital spheres ────────────────────────────
    const orbs: Sphere[] = [
      { x: -260, y: -200, z: 0, r: 18, color: '#dc2626', vx: 0.12, vy: 0.07, vz: 0 },
      { x: -310, y:  60,  z: 0, r: 14, color: '#3b82f6', vx: -0.09, vy: 0.12, vz: 0 },
      { x:  280, y: -130, z: 0, r: 10, color: '#dc2626', vx: 0.14, vy: -0.09, vz: 0 },
      { x:  260, y:  220, z: 0, r: 16, color: '#3b82f6', vx: -0.11, vy: -0.08, vz: 0 },
      { x:   60, y:  280, z: 0, r: 11, color: '#3b82f6', vx: 0.08, vy: 0.14, vz: 0 },
      { x:  320, y:   90, z: 0, r:  8, color: '#dc2626', vx: -0.13, vy: 0.06, vz: 0 },
    ]

    // ── draw ────────────────────────────────────────────────
    const LATS  = 12   // latitude rings
    const LNGS  = 18   // longitude meridians
    const R     = Math.min(canvas.height * 0.40, 260)

    function project(x: number, y: number, z: number, cx: number, cy: number): [number, number, number] {
      // simple perspective
      const fov = 900
      const scale = fov / (fov + z)
      return [cx + x * scale, cy + y * scale, scale]
    }

    function sphereColor(x: number, _y: number, _z: number): { line: string; dot: string } {
      // normalised -1 … +1 in rotated space
      const t = Math.max(-1, Math.min(1, x / R))
      if (t > 0) {
        const a = 0.35 + t * 0.65
        return {
          line: `rgba(220,38,38,${(a * 0.55).toFixed(2)})`,
          dot:  `rgba(220,38,38,${(a * 0.90).toFixed(2)})`,
        }
      } else {
        const a = 0.35 + (-t) * 0.65
        return {
          line: `rgba(59,130,246,${(a * 0.55).toFixed(2)})`,
          dot:  `rgba(59,130,246,${(a * 0.90).toFixed(2)})`,
        }
      }
    }

    function drawGlobe(rot: number) {
      const cx = canvas.width  * 0.62
      const cy = canvas.height * 0.50

      // ── latitude rings ──
      for (let i = 1; i < LATS; i++) {
        const phi = (i / LATS) * Math.PI   // 0 … π
        const ry  = R * Math.cos(phi)
        const rr  = R * Math.sin(phi)

        const pts: [number, number, number, number, number][] = []
        const STEPS = 80
        for (let s = 0; s <= STEPS; s++) {
          const theta = (s / STEPS) * Math.PI * 2 + rot
          const wx = rr * Math.sin(theta)
          const wz = rr * Math.cos(theta)
          const wy = ry
          const { line } = sphereColor(wx, wy, wz)
          pts.push([...project(wx, wy, wz, cx, cy), wx] as any)
        }

        ctx.beginPath()
        for (let s = 0; s <= STEPS; s++) {
          const [px, py, sc] = pts[s]
          // only draw front-facing arcs (z > -R/2)
          if (s === 0) ctx.moveTo(px, py)
          else ctx.lineTo(px, py)
        }
        // color based on starting wx
        const { line } = sphereColor(pts[Math.floor(STEPS / 2)][3], 0, 0)
        ctx.strokeStyle = line
        ctx.lineWidth = 0.9
        ctx.stroke()
      }

      // ── meridians ──
      for (let j = 0; j < LNGS; j++) {
        const theta = (j / LNGS) * Math.PI * 2 + rot
        const pts: [number, number, number, number][] = []
        const STEPS = 60
        for (let s = 0; s <= STEPS; s++) {
          const phi = (s / STEPS) * Math.PI
          const wx  = R * Math.sin(phi) * Math.sin(theta)
          const wy  = R * Math.cos(phi)
          const wz  = R * Math.sin(phi) * Math.cos(theta)
          pts.push([...project(wx, wy, wz, cx, cy), wx] as any)
        }
        ctx.beginPath()
        for (let s = 0; s <= STEPS; s++) {
          const [px, py] = pts[s]
          if (s === 0) ctx.moveTo(px, py)
          else ctx.lineTo(px, py)
        }
        const { line } = sphereColor(pts[30][3], 0, 0)
        ctx.strokeStyle = line
        ctx.lineWidth = 0.9
        ctx.stroke()
      }

      // ── intersection dots ──
      for (let i = 1; i < LATS; i++) {
        const phi = (i / LATS) * Math.PI
        const ry  = R * Math.cos(phi)
        const rr  = R * Math.sin(phi)
        for (let j = 0; j < LNGS; j++) {
          const theta = (j / LNGS) * Math.PI * 2 + rot
          const wx = rr * Math.sin(theta)
          const wz = rr * Math.cos(theta)
          const wy = ry
          // cull back-face dots
          if (wz < -R * 0.15) continue
          const [px, py, sc] = project(wx, wy, wz, cx, cy)
          const { dot } = sphereColor(wx, wy, wz)
          const dr = 2.2 * sc + (wz / R) * 1.0
          ctx.beginPath()
          ctx.arc(px, py, Math.max(0.8, dr), 0, Math.PI * 2)
          ctx.fillStyle = dot
          ctx.fill()
        }
      }
    }

    function drawOrbs(rot: number) {
      const cx = canvas.width  * 0.62
      const cy = canvas.height * 0.50
      for (const orb of orbs) {
        // slow drift
        orb.x += orb.vx
        orb.y += orb.vy
        const maxX = canvas.width  * 0.50
        const maxY = canvas.height * 0.50
        if (Math.abs(orb.x) > maxX) orb.vx *= -1
        if (Math.abs(orb.y) > maxY) orb.vy *= -1

        const [px, py] = project(orb.x, orb.y, orb.z, cx, cy)
        // glow
        const grd = ctx.createRadialGradient(px, py, 0, px, py, orb.r * 3.5)
        const base = orb.color === '#dc2626' ? '220,38,38' : '59,130,246'
        grd.addColorStop(0,   `rgba(${base},0.55)`)
        grd.addColorStop(0.4, `rgba(${base},0.22)`)
        grd.addColorStop(1,   `rgba(${base},0)`)
        ctx.beginPath()
        ctx.arc(px, py, orb.r * 3.5, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()
        // solid core
        ctx.beginPath()
        ctx.arc(px, py, orb.r, 0, Math.PI * 2)
        ctx.fillStyle = orb.color
        ctx.fill()
      }
    }

    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      rotRef.current += 0.004   // steady rotation speed
      drawOrbs(rotRef.current)
      drawGlobe(rotRef.current)
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden gradient-hero pt-20">
      {/* Canvas fills the whole section */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* Gradient fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-[var(--background)] pointer-events-none z-10" />

      {/* Text content — left column */}
      <div className="relative z-10 min-h-screen flex items-center px-8 md:px-16 lg:px-24">
        <div className="max-w-sm lg:max-w-md fade-in-up">
          <p className="text-xs font-semibold tracking-widest uppercase text-[var(--text-muted)] mb-6">
            Trusted in 30+ countries
          </p>

          <h1 className="font-semibold text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-balance mb-6">
            <span className="text-[var(--brand-red)]">Connected.</span>
            <br />
            <span className="text-[var(--brand-blue)]">Global.</span>
            <br />
            <span className="text-foreground">Limitless.</span>
          </h1>

          <p className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed mb-10 max-w-xs">
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

          <div className="mt-16 flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
              <span className="scroll-indicator inline-block">
                <svg className="w-4 h-4 text-[var(--brand-blue)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </span>
              Scroll to explore
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
