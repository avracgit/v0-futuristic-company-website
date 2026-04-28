'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'


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
    // Defined as normalized angles (0 = south pole, 1 = north pole) along the left perimeter
    // Actual pixel positions are computed in drawOrbs() based on current R
    const orbDefs = [
      { t: 0.15, r:  5, color: '#3b82f6' }, // lower-left, smallest
      { t: 0.35, r:  7, color: '#3b82f6' },
      { t: 0.55, r:  9, color: '#3b82f6' },
      { t: 0.75, r: 11, color: '#3b82f6' }, // upper-left, larger
      { t: 0.92, r:  8, color: '#dc2626' }, // just above north pole, red
    ]

    // ── constants ───────────────────────────────────────────
    const LATS  = 12
    const LNGS  = 18

    // 27.5° X-axis tilt — applied to globe AND orbs so they move as one entity
    const TILT_X = (27.5 * Math.PI) / 180
    const cosTX  = Math.cos(TILT_X)
    const sinTX  = Math.sin(TILT_X)

    // Apply X-axis rotation: tilts the top of the sphere away from the viewer
    function tiltX(x: number, y: number, z: number): [number, number, number] {
      return [
        x,
        y * cosTX - z * sinTX,
        y * sinTX + z * cosTX,
      ]
    }

    function project(x: number, y: number, z: number, cx: number, cy: number): [number, number, number] {
      const fov   = 900
      const scale = fov / (fov + z)
      return [cx + x * scale, cy + y * scale, scale]
    }

    // Red = top-right quarter: nx > 0.05 AND ny < -0.15 (pre-tilt world coordinates)
    function sphereColor(wx: number, wy: number, R: number): { line: string; dot: string } {
      const nx = wx / R   // -1 … 1  (right is positive)
      const ny = wy / R   // -1 … 1  (up is negative)
      const isRed = nx > 0.05 && ny < -0.15
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
      const cx = W * 0.72
      const cy = H * 0.50
      const R  = Math.min(H * 0.28, 190)

      // ── latitude rings ──────────────────────────────────
      for (let i = 1; i < LATS; i++) {
        const phi = (i / LATS) * Math.PI
        const ry  = R * Math.cos(phi)
        const rr  = R * Math.sin(phi)
        const STEPS = 80

        const pts: { px: number; py: number; wx: number; wy: number; tz: number }[] = []
        for (let s = 0; s <= STEPS; s++) {
          const theta = (s / STEPS) * Math.PI * 2 + rot
          const wx0 = rr * Math.sin(theta)
          const wz0 = rr * Math.cos(theta)
          const wy0 = ry
          const [tx, ty, tz] = tiltX(wx0, wy0, wz0)
          const [px, py] = project(tx, ty, tz, cx, cy)
          pts.push({ px, py, wx: wx0, wy: wy0, tz })
        }

        for (let s = 0; s < STEPS; s++) {
          if (pts[s].tz < -R * 0.1) continue
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

        const pts: { px: number; py: number; wx: number; wy: number; tz: number }[] = []
        for (let s = 0; s <= STEPS; s++) {
          const phi = (s / STEPS) * Math.PI
          const wx0 = R * Math.sin(phi) * Math.sin(theta)
          const wy0 = R * Math.cos(phi)
          const wz0 = R * Math.sin(phi) * Math.cos(theta)
          const [tx, ty, tz] = tiltX(wx0, wy0, wz0)
          const [px, py] = project(tx, ty, tz, cx, cy)
          pts.push({ px, py, wx: wx0, wy: wy0, tz })
        }

        for (let s = 0; s < STEPS; s++) {
          if (pts[s].tz < -R * 0.1) continue
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
          const wx0 = rr * Math.sin(theta)
          const wz0 = rr * Math.cos(theta)
          const wy0 = ry
          const [tx, ty, tz] = tiltX(wx0, wy0, wz0)
          if (tz < -R * 0.1) continue
          const [px, py, sc] = project(tx, ty, tz, cx, cy)
          const { dot } = sphereColor(wx0, wy0, R)
          const dr = Math.max(0.8, 2.0 * sc + (tz / R) * 0.8)
          ctx.beginPath()
          ctx.arc(px, py, dr, 0, Math.PI * 2)
          ctx.fillStyle = dot
          ctx.fill()
        }
      }
    }

    function drawOrbs() {
      const W  = canvas.width
      const H  = canvas.height
      const cx = W * 0.72
      const cy = H * 0.50
      const R  = Math.min(H * 0.28, 190)
      // Increased gap so dots hug but don't overlap the globe edge
      const GAP = 24

      for (const orb of orbDefs) {
        // Place along left perimeter: phi=0 is north pole, phi=PI is south pole
        const phi = (1 - orb.t) * Math.PI
        const dist = R + GAP + orb.r

        // Pre-tilt world coords (on the left side, z=0 in local space)
        const wx0 =  0
        const wy0 = -dist * Math.cos(phi)
        const wz0 =  dist * Math.sin(phi)

        // Apply same X-axis tilt so orbs move with the globe
        const [tx, ty, tz] = tiltX(-dist * Math.sin(phi), wy0, 0)
        void tz

        const px = cx + tx
        const py = cy + ty

        const base = orb.color === '#dc2626' ? '220,38,38' : '59,130,246'

        // Soft glow halo
        const grd = ctx.createRadialGradient(px, py, 0, px, py, orb.r * 2.8)
        grd.addColorStop(0,   `rgba(${base},0.45)`)
        grd.addColorStop(0.5, `rgba(${base},0.12)`)
        grd.addColorStop(1,   `rgba(${base},0)`)
        ctx.beginPath()
        ctx.arc(px, py, orb.r * 2.8, 0, Math.PI * 2)
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
            Trusted across 5 countries
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


        </div>
      </div>
    </section>
  )
}
