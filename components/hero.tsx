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

    const setSize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect()
      canvas.width  = rect.width
      canvas.height = rect.height
    }
    setSize()
    const ro = new ResizeObserver(setSize)
    ro.observe(canvas.parentElement!)

    // ── floating orbs ──────────────────────────────────────
    const orbs: Orb[] = [
      { x: -200, y: -160, z: 0, r: 14, color: '#dc2626', vx:  0.11, vy:  0.06 },
      { x: -240, y:   50, z: 0, r: 10, color: '#3b82f6', vx: -0.08, vy:  0.10 },
      { x:  220, y: -110, z: 0, r:  8, color: '#dc2626', vx:  0.12, vy: -0.08 },
      { x:  200, y:  180, z: 0, r: 12, color: '#3b82f6', vx: -0.09, vy: -0.07 },
      { x:   50, y:  220, z: 0, r:  9, color: '#3b82f6', vx:  0.07, vy:  0.11 },
      { x:  240, y:   70, z: 0, r:  7, color: '#dc2626', vx: -0.10, vy:  0.05 },
    ]

    const LATS  = 12
    const LNGS  = 18
    // 25-degree tilt in radians
    const TILT  = (25 * Math.PI) / 180

    // Pre-compute tilt sin/cos
    const sinT = Math.sin(TILT)
    const cosT = Math.cos(TILT)

    // Apply Y-axis tilt to a world-space point
    function applyTilt(wx: number, wy: number, wz: number): [number, number, number] {
      // Rotate around X-axis by TILT: tilts the north pole toward viewer
      const ty =  wy * cosT - wz * sinT
      const tz =  wy * sinT + wz * cosT
      return [wx, ty, tz]
    }

    function project(x: number, y: number, z: number, cx: number, cy: number): [number, number, number] {
      const fov   = 900
      const scale = fov / (fov + z)
      return [cx + x * scale, cy + y * scale, scale]
    }

    // Red = top-right third: tx > R*0.10 AND ty < -R*0.15
    // Everything else = blue
    function sphereColor(tx: number, ty: number, R: number): { line: string; dot: string } {
      const nx = tx / R
      const ny = ty / R
      const isRed = nx > 0.10 && ny < -0.15
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

    // Dots rising from south pole: size grows small→large, color blue→red
    function drawPoleDots(rot: number, cx: number, cy: number, R: number) {
      const RINGS  = 14  // number of rings of dots from pole upward
      const SPREAD = 0.55 * Math.PI // how far up from south pole (half of sphere)

      for (let i = 0; i < RINGS; i++) {
        const t = i / (RINGS - 1)           // 0 = pole, 1 = top of spread
        const phi = Math.PI - t * SPREAD    // phi: south pole = π, equator = π/2

        const sinPhi = Math.sin(phi)
        const cosPhi = Math.cos(phi)
        const rr     = R * sinPhi
        const ry     = R * cosPhi

        // Number of dots in this ring — fewer near pole, more further up
        const count = Math.max(1, Math.round(4 + t * 10))

        // Dot radius: starts tiny at pole, grows toward spread edge
        const dotR = 1.2 + t * 4.5

        // Color: interpolate blue→red
        const cr = Math.round(59  + t * (220 - 59))
        const cg = Math.round(130 + t * (38  - 130))
        const cb = Math.round(246 + t * (38  - 246))

        for (let j = 0; j < count; j++) {
          const theta = (j / count) * Math.PI * 2 + rot * 0.7

          const wx = rr * Math.sin(theta)
          const wy = ry
          const wz = rr * Math.cos(theta)

          const [tx, ty, tz] = applyTilt(wx, wy, wz)
          if (tz < -R * 0.1) continue  // cull back-face

          const [px, py, sc] = project(tx, ty, tz, cx, cy)
          const alpha = 0.5 + (tz / R + 1) * 0.35
          ctx.beginPath()
          ctx.arc(px, py, dotR * sc, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${cr},${cg},${cb},${Math.min(alpha, 0.95).toFixed(2)})`
          ctx.fill()
        }
      }
    }

    function drawGlobe(rot: number) {
      const W = canvas.width
      const H = canvas.height
      const cx = W * 0.63
      const cy = H * 0.50
      const R  = Math.min(H * 0.28, 190)

      // ── latitude rings ─────────────────────────────────
      for (let i = 1; i < LATS; i++) {
        const phi = (i / LATS) * Math.PI
        const ry  = R * Math.cos(phi)
        const rr  = R * Math.sin(phi)
        const STEPS = 80

        const pts: { px: number; py: number; tx: number; ty: number; tz: number }[] = []
        for (let s = 0; s <= STEPS; s++) {
          const theta = (s / STEPS) * Math.PI * 2 + rot
          const wx = rr * Math.sin(theta)
          const wz = rr * Math.cos(theta)
          const wy = ry
          const [tx, ty, tz] = applyTilt(wx, wy, wz)
          const [px, py]     = project(tx, ty, tz, cx, cy)
          pts.push({ px, py, tx, ty, tz })
        }

        for (let s = 0; s < STEPS; s++) {
          if (pts[s].tz < -R * 0.05 && pts[s + 1].tz < -R * 0.05) continue
          const { line } = sphereColor(pts[s].tx, pts[s].ty, R)
          ctx.beginPath()
          ctx.moveTo(pts[s].px, pts[s].py)
          ctx.lineTo(pts[s + 1].px, pts[s + 1].py)
          ctx.strokeStyle = line
          ctx.lineWidth = 0.8
          ctx.stroke()
        }
      }

      // ── meridians ──────────────────────────────────────
      for (let j = 0; j < LNGS; j++) {
        const theta = (j / LNGS) * Math.PI * 2 + rot
        const STEPS = 60

        const pts: { px: number; py: number; tx: number; ty: number; tz: number }[] = []
        for (let s = 0; s <= STEPS; s++) {
          const phi = (s / STEPS) * Math.PI
          const wx  = R * Math.sin(phi) * Math.sin(theta)
          const wy  = R * Math.cos(phi)
          const wz  = R * Math.sin(phi) * Math.cos(theta)
          const [tx, ty, tz] = applyTilt(wx, wy, wz)
          const [px, py]     = project(tx, ty, tz, cx, cy)
          pts.push({ px, py, tx, ty, tz })
        }

        for (let s = 0; s < STEPS; s++) {
          if (pts[s].tz < -R * 0.05 && pts[s + 1].tz < -R * 0.05) continue
          const { line } = sphereColor(pts[s].tx, pts[s].ty, R)
          ctx.beginPath()
          ctx.moveTo(pts[s].px, pts[s].py)
          ctx.lineTo(pts[s + 1].px, pts[s + 1].py)
          ctx.strokeStyle = line
          ctx.lineWidth = 0.8
          ctx.stroke()
        }
      }

      // ── intersection dots ───────────────────────────────
      for (let i = 1; i < LATS; i++) {
        const phi = (i / LATS) * Math.PI
        const ry  = R * Math.cos(phi)
        const rr  = R * Math.sin(phi)
        for (let j = 0; j < LNGS; j++) {
          const theta = (j / LNGS) * Math.PI * 2 + rot
          const wx = rr * Math.sin(theta)
          const wz = rr * Math.cos(theta)
          const wy = ry
          const [tx, ty, tz] = applyTilt(wx, wy, wz)
          if (tz < -R * 0.1) continue
          const [px, py, sc] = project(tx, ty, tz, cx, cy)
          const { dot } = sphereColor(tx, ty, R)
          const dr = Math.max(0.8, 2.0 * sc + (tz / R) * 0.8)
          ctx.beginPath()
          ctx.arc(px, py, dr, 0, Math.PI * 2)
          ctx.fillStyle = dot
          ctx.fill()
        }
      }

      // ── pole dots ───────────────────────────────────────
      drawPoleDots(rot, cx, cy, R)
    }

    function drawOrbs() {
      const W = canvas.width
      const H = canvas.height
      const cx = W * 0.63
      const cy = H * 0.50

      for (const orb of orbs) {
        orb.x += orb.vx
        orb.y += orb.vy
        if (Math.abs(orb.x) > W * 0.48) orb.vx *= -1
        if (Math.abs(orb.y) > H * 0.48) orb.vy *= -1

        const [px, py] = project(orb.x, orb.y, orb.z, cx, cy)
        const base = orb.color === '#dc2626' ? '220,38,38' : '59,130,246'
        const grd  = ctx.createRadialGradient(px, py, 0, px, py, orb.r * 3.2)
        grd.addColorStop(0,   `rgba(${base},0.50)`)
        grd.addColorStop(0.4, `rgba(${base},0.18)`)
        grd.addColorStop(1,   `rgba(${base},0)`)
        ctx.beginPath()
        ctx.arc(px, py, orb.r * 3.2, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()

        ctx.beginPath()
        ctx.arc(px, py, orb.r, 0, Math.PI * 2)
        ctx.fillStyle = orb.color
        ctx.fill()
      }
    }

    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (!dragRef.current.active) {
        if (Math.abs(dragRef.current.velocity) > 0.0002) {
          dragRef.current.velocity *= 0.96
          rotRef.current += dragRef.current.velocity
        } else {
          dragRef.current.velocity = 0
          rotRef.current += 0.004
        }
      }

      drawOrbs()
      drawGlobe(rotRef.current)
      rafRef.current = requestAnimationFrame(tick)
    }

    // ── mouse drag handlers ────────────────────────────────
    const onMouseDown = (e: MouseEvent) => {
      dragRef.current.active   = true
      dragRef.current.lastX    = e.clientX
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
    <section className="relative min-h-screen overflow-hidden gradient-hero pt-20">
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-[var(--background)] pointer-events-none z-10" />

      <div className="relative z-10 min-h-screen flex items-center px-8 md:px-16 lg:px-24 pointer-events-none">
        <div className="max-w-sm lg:max-w-md fade-in-up pointer-events-auto">
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

          <div className="mt-16">
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
