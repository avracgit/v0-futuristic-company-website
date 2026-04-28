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

    const setSize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect()
      canvas.width  = rect.width  * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    setSize()
    const ro = new ResizeObserver(setSize)
    ro.observe(canvas.parentElement!)

    const LATS  = 14   // more rings for density
    const LNGS  = 20   // more meridians
    const STEPS_LAT = 120
    const STEPS_MER = 80

    // Y-axis tilt (25 deg) — rotates around the Y axis (left/right lean)
    const TILT_Y = (25 * Math.PI) / 180
    const sinTY = Math.sin(TILT_Y)
    const cosTY = Math.cos(TILT_Y)

    // Floating orbs matching reference exactly
    const orbs = [
      { ox: -0.30, oy: -1.10, r: 22, col: '#f40000' }, // large red top
      { ox: -1.30, oy: -0.25, r: 16, col: '#009de7' }, // large blue left
      { ox:  1.10, oy: -0.60, r: 11, col: '#fd5d5d' }, // small red right
      { ox:  1.20, oy:  0.50, r:  9, col: '#f40000' }, // tiny red lower-right
      { ox: -0.20, oy:  1.20, r: 18, col: '#009de7' }, // medium blue bottom
      { ox:  0.70, oy:  1.10, r: 13, col: '#253093' }, // blue bottom-right
    ]

    // Tilt around Y axis
    function tilt(wx: number, wy: number, wz: number): [number, number, number] {
      return [wx * cosTY + wz * sinTY, wy, -wx * sinTY + wz * cosTY]
    }

    // Simple perspective projection
    function project(x: number, y: number, z: number, cx: number, cy: number): [number, number] {
      const fov = 1100
      const s   = fov / (fov + z)
      return [cx + x * s, cy + y * s]
    }

    // Returns rgba line + dot colors based on 3D position
    // Red: right half AND upper hemisphere (upper-right ~40%)
    // Blue: everything else
    function getColors(tx: number, ty: number, tz: number, R: number) {
      const nx = tx / R  // -1..1 (left-right)
      const ny = ty / R  // -1..1 (up is negative)
      // depth-based opacity so back-facing lines fade out
      const depth = Math.max(0.15, 0.25 + (tz / R + 1) * 0.55)

      const isRed = nx > 0.0 && ny < 0.10

      if (isRed) {
        return {
          line: `rgba(244,0,0,${(depth * 0.90).toFixed(2)})`,
          dot:  `rgba(253,93,93,${Math.min(1, depth * 1.05).toFixed(2)})`,
          glowR: [253, 93, 93],
        }
      }
      return {
        line: `rgba(0,157,231,${(depth * 0.80).toFixed(2)})`,
        dot:  `rgba(96,200,247,${Math.min(1, depth).toFixed(2)})`,
        glowR: [96, 200, 247],
      }
    }

    function drawOrb(ox: number, oy: number, r: number, col: string) {
      // Outer glow halo — subtler
      const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, r * 2.0)
      g.addColorStop(0,   col + '66')
      g.addColorStop(0.5, col + '22')
      g.addColorStop(1,   col + '00')
      ctx.beginPath()
      ctx.arc(ox, oy, r * 2.0, 0, Math.PI * 2)
      ctx.fillStyle = g
      ctx.fill()
      // Solid core
      ctx.beginPath()
      ctx.arc(ox, oy, r, 0, Math.PI * 2)
      ctx.fillStyle = col
      ctx.fill()
      // Bright specular highlight
      const h = ctx.createRadialGradient(ox - r * 0.3, oy - r * 0.3, 0, ox, oy, r)
      h.addColorStop(0,   'rgba(255,255,255,0.5)')
      h.addColorStop(0.4, 'rgba(255,255,255,0.0)')
      ctx.beginPath()
      ctx.arc(ox, oy, r, 0, Math.PI * 2)
      ctx.fillStyle = h
      ctx.fill()
    }

    function drawGlobe(t: number) {
      const W   = canvas.width  / window.devicePixelRatio
      const H   = canvas.height / window.devicePixelRatio
      // Globe center: right-of-center horizontally, vertically centered
      const cx  = W * 0.65
      const cy  = H * 0.50
      // Smaller globe — fills ~28% of viewport height
      const R   = Math.min(H * 0.28, 190)
      const rot = rotRef.current

      ctx.clearRect(0, 0, W, H)

      // ── Orbs ──────────────────────────────────────────────
      orbs.forEach((orb, i) => {
        const ox = cx + orb.ox * R + Math.sin(t * 0.0003 + i) * 10
        const oy = cy + orb.oy * R + Math.cos(t * 0.0004 + i) *  8
        drawOrb(ox, oy, orb.r, orb.col)
      })

      // ── Outer glow ring (always visible) ──────────────────
      const ringGlow = ctx.createRadialGradient(cx, cy, R - 2, cx, cy, R + 16)
      ringGlow.addColorStop(0,   'rgba(0,157,231,0.10)')
      ringGlow.addColorStop(1,   'rgba(0,157,231,0.00)')
      ctx.beginPath()
      ctx.arc(cx, cy, R + 16, 0, Math.PI * 2)
      ctx.fillStyle = ringGlow
      ctx.fill()
      // Crisp ring
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(0,157,231,0.30)'
      ctx.lineWidth = 1.4
      ctx.stroke()

      // ── Build intersection list ───────────────────────────
      type Pt = { px: number; py: number; tx: number; ty: number; tz: number }
      const dots: Pt[] = []

      // ── Latitude rings ────────────────────────────────────
      for (let i = 1; i < LATS; i++) {
        const phi = (i / LATS) * Math.PI
        const ry  = R * Math.cos(phi)
        const rr  = R * Math.sin(phi)

        const pts: Pt[] = []
        for (let s = 0; s <= STEPS_LAT; s++) {
          const theta = (s / STEPS_LAT) * Math.PI * 2 + rot
          const [tx, ty, tz] = tilt(rr * Math.sin(theta), ry, rr * Math.cos(theta))
          const [px, py] = project(tx, ty, tz, cx, cy)
          pts.push({ px, py, tx, ty, tz })
        }

        for (let s = 0; s < STEPS_LAT; s++) {
          const p = pts[s]
          if (p.tz < -R * 0.08) continue
          const { line } = getColors(p.tx, p.ty, p.tz, R)
          ctx.beginPath()
          ctx.moveTo(p.px, p.py)
          ctx.lineTo(pts[s + 1].px, pts[s + 1].py)
          ctx.strokeStyle = line
          ctx.lineWidth   = 1.8
          ctx.stroke()
        }

        // Collect dots at meridian crossings
        for (let j = 0; j < LNGS; j++) {
          const theta = (j / LNGS) * Math.PI * 2 + rot
          const [tx, ty, tz] = tilt(rr * Math.sin(theta), ry, rr * Math.cos(theta))
          if (tz < -R * 0.08) continue
          const [px, py] = project(tx, ty, tz, cx, cy)
          dots.push({ px, py, tx, ty, tz })
        }
      }

      // ── Meridians ─────────────────────────────────────────
      for (let j = 0; j < LNGS; j++) {
        const theta = (j / LNGS) * Math.PI * 2 + rot
        const sinTh = Math.sin(theta)
        const cosTh = Math.cos(theta)

        const pts: Pt[] = []
        for (let s = 0; s <= STEPS_MER; s++) {
          const phi = (s / STEPS_MER) * Math.PI
          const sp  = Math.sin(phi)
          const [tx, ty, tz] = tilt(R * sp * sinTh, R * Math.cos(phi), R * sp * cosTh)
          const [px, py] = project(tx, ty, tz, cx, cy)
          pts.push({ px, py, tx, ty, tz })
        }

        for (let s = 0; s < STEPS_MER; s++) {
          const p = pts[s]
          if (p.tz < -R * 0.08) continue
          const { line } = getColors(p.tx, p.ty, p.tz, R)
          ctx.beginPath()
          ctx.moveTo(p.px, p.py)
          ctx.lineTo(pts[s + 1].px, pts[s + 1].py)
          ctx.strokeStyle = line
          ctx.lineWidth   = 1.8
          ctx.stroke()
        }
      }

      // ── Intersection dots (drawn last — on top) ────────────
      for (const { px, py, tx, ty, tz } of dots) {
        const { glowR } = getColors(tx, ty, tz, R)
        const depth = Math.max(0.3, 0.3 + (tz / R + 1) * 0.4)
        const dotR  = Math.max(1.2, 2.5 * depth)
        const [r, g, b] = glowR

        // Subtle glow halo
        const grd = ctx.createRadialGradient(px, py, 0, px, py, dotR * 2.5)
        grd.addColorStop(0,   `rgba(${r},${g},${b},${(depth * 0.30).toFixed(2)})`)
        grd.addColorStop(1,   `rgba(${r},${g},${b},0)`)
        ctx.beginPath()
        ctx.arc(px, py, dotR * 2.5, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()

        // Solid bright dot
        ctx.beginPath()
        ctx.arc(px, py, dotR, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(1, depth * 1.1).toFixed(2)})`
        ctx.fill()
      }
    }

    const AUTO_SPIN = 0.0035   // steady auto-rotation speed

    function tick(t: number) {
      if (!dragRef.current.active) {
        if (Math.abs(dragRef.current.velocity) > 0.0003) {
          dragRef.current.velocity *= 0.94   // friction coast-down
          rotRef.current += dragRef.current.velocity
        } else {
          dragRef.current.velocity = 0
          rotRef.current += AUTO_SPIN
        }
      }
      drawGlobe(t)
      rafRef.current = requestAnimationFrame(tick)
    }

    const onMouseDown = (e: MouseEvent) => {
      dragRef.current.active   = true
      dragRef.current.lastX    = e.clientX
      dragRef.current.velocity = 0
      canvas.style.cursor = 'grabbing'
    }
    const onMouseMove = (e: MouseEvent) => {
      if (!dragRef.current.active) return
      const dx = e.clientX - dragRef.current.lastX
      dragRef.current.velocity = dx * 0.004
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
    <section id="hero" className="relative min-h-screen overflow-hidden pt-20" style={{ background: 'var(--background)' }}>
      {/* Sunburst glow — rendered as an SVG so we can make proper rays */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1440 900"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Core radial bloom behind the globe */}
          <radialGradient id="sb-core" cx="65%" cy="50%" r="38%">
            <stop offset="0%"   stopColor="#009de7" stopOpacity="0.10" />
            <stop offset="60%"  stopColor="#009de7" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#009de7" stopOpacity="0"    />
          </radialGradient>
          {/* Conic sunburst rays */}
          <radialGradient id="sb-ray" cx="65%" cy="50%" r="55%">
            <stop offset="0%"   stopColor="#1a5fa8" stopOpacity="0.13" />
            <stop offset="100%" stopColor="#1a5fa8" stopOpacity="0"    />
          </radialGradient>
        </defs>

        {/* 12 subtle rays fanning out from globe center */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angleDeg = i * 30
          const angleRad = (angleDeg * Math.PI) / 180
          const cx = 1440 * 0.65
          const cy = 900  * 0.50
          const len = 720
          const halfW = 18
          const ex = cx + Math.cos(angleRad) * len
          const ey = cy + Math.sin(angleRad) * len
          const px = Math.cos(angleRad + Math.PI / 2) * halfW
          const py = Math.sin(angleRad + Math.PI / 2) * halfW
          return (
            <polygon
              key={i}
              points={`${cx},${cy} ${ex + px},${ey + py} ${ex - px},${ey - py}`}
              fill={`rgba(0,157,231,${i % 2 === 0 ? 0.028 : 0.016})`}
            />
          )
        })}

        {/* Soft bloom on top of rays */}
        <ellipse cx="65%" cy="50%" rx="520" ry="380" fill="url(#sb-core)" />
      </svg>

      {/* Canvas */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <canvas ref={canvasRef} className="w-full h-full" style={{ display: 'block' }} />
      </div>

      {/* Bottom blend */}
      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--background))' }} />

      {/* Text content */}
      <div className="relative z-10 min-h-screen flex items-center px-8 md:px-16 lg:px-24 pointer-events-none">
        <div className="max-w-sm lg:max-w-md fade-in-up pointer-events-auto">
          <p className="text-xs font-semibold tracking-widest uppercase mb-6" style={{ color: 'var(--text-muted)' }}>
            Trusted in 30+ countries
          </p>

          <h1 className="font-semibold text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-balance mb-6">
            <span style={{ color: 'var(--brand-red)' }}>Connected.</span>
            <br />
            <span style={{ color: 'var(--brand-blue)' }}>Global.</span>
            <br />
            <span className="text-foreground">Limitless.</span>
          </h1>

          <p className="text-base md:text-lg leading-relaxed mb-10 max-w-xs" style={{ color: 'var(--text-secondary)' }}>
            Empowering businesses across borders with intelligence and innovation across every industry vertical.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Link href="/services" className="btn-primary">
              Explore Services
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/contact" className="btn-ghost">Contact Us</Link>
          </div>

          <div className="mt-16">
            <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
              <svg className="w-4 h-4 scroll-indicator" style={{ color: 'var(--brand-blue)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
