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

    const LATS  = 12
    const LNGS  = 18
    // 25-degree Y-axis tilt
    const TILT  = (25 * Math.PI) / 180
    const sinT = Math.sin(TILT)
    const cosT = Math.cos(TILT)

    // Floating spheres (like in reference image)
    const orbs = [
      { ox: -0.55, oy: -0.72, r: 18, color: '#f40000', speed: 0.0003 },
      { ox: -1.10, oy: -0.30, r: 14, color: '#009de7', speed: 0.0004 },
      { ox:  0.85, oy: -0.55, r: 10, color: '#fd5d5d', speed: 0.0005 },
      { ox:  0.90, oy:  0.55, r:  9, color: '#f40000', speed: 0.0004 },
      { ox: -0.40, oy:  0.80, r: 16, color: '#009de7', speed: 0.0003 },
      { ox:  0.55, oy:  0.85, r: 12, color: '#009de7', speed: 0.0006 },
    ]

    function applyTilt(wx: number, wy: number, wz: number): [number, number, number] {
      const tx = wx * cosT + wz * sinT
      const tz = -wx * sinT + wz * cosT
      return [tx, wy, tz]
    }

    function project(x: number, y: number, z: number, cx: number, cy: number): [number, number] {
      const fov   = 900
      const scale = fov / (fov + z)
      return [cx + x * scale, cy + y * scale]
    }

    // Blue on left half, red only on top-right corner (~1/3)
    function sphereColor(tx: number, ty: number, tz: number, R: number): { line: string; dot: string } {
      const nx = tx / R
      const ny = ty / R
      const isRed = nx > 0.15 && ny < -0.05
      const depth = 0.35 + Math.max(0, tz / R) * 0.65

      if (isRed) {
        const alpha = (depth * 0.85).toFixed(2)
        return {
          line: `rgba(244,0,0,${alpha})`,
          dot:  `rgba(253,93,93,${Math.min(1, parseFloat(alpha) + 0.15).toFixed(2)})`,
        }
      }
      const alpha = (depth * 0.75).toFixed(2)
      return {
        line: `rgba(0,157,231,${alpha})`,
        dot:  `rgba(96,200,247,${Math.min(1, parseFloat(alpha) + 0.15).toFixed(2)})`,
      }
    }

    function drawGlobe(t: number) {
      const W  = canvas.width  / window.devicePixelRatio
      const H  = canvas.height / window.devicePixelRatio
      const cx = W * 0.68
      const cy = H * 0.50
      const R  = Math.min(H * 0.34, 200)
      const rot = rotRef.current

      ctx.save()
      ctx.clearRect(0, 0, W, H)

      // ── Floating orbs ───────────────────────────────────
      orbs.forEach((orb) => {
        const ox = cx + orb.ox * R + Math.sin(t * orb.speed * 1000) * 8
        const oy = cy + orb.oy * R + Math.cos(t * orb.speed * 800) * 6

        const grd = ctx.createRadialGradient(ox, oy, 0, ox, oy, orb.r * 2.5)
        grd.addColorStop(0,   orb.color + 'cc')
        grd.addColorStop(0.4, orb.color + '66')
        grd.addColorStop(1,   orb.color + '00')
        ctx.beginPath()
        ctx.arc(ox, oy, orb.r * 2.5, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()

        ctx.beginPath()
        ctx.arc(ox, oy, orb.r, 0, Math.PI * 2)
        ctx.fillStyle = orb.color
        ctx.fill()
      })

      // ── Outer always-visible ring ───────────────────────
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(0,157,231,0.28)'
      ctx.lineWidth = 1.8
      ctx.stroke()

      // ── Collect all intersection points ─────────────────
      type Intersection = { px: number; py: number; tx: number; ty: number; tz: number }
      const intersections: Intersection[] = []

      // ── Latitude rings ──────────────────────────────────
      for (let i = 1; i < LATS; i++) {
        const phi = (i / LATS) * Math.PI
        const ry  = R * Math.cos(phi)
        const rr  = R * Math.sin(phi)
        const STEPS = 90

        const pts: { px: number; py: number; tx: number; ty: number; tz: number }[] = []
        for (let s = 0; s <= STEPS; s++) {
          const theta = (s / STEPS) * Math.PI * 2 + rot
          const wx = rr * Math.sin(theta)
          const wz = rr * Math.cos(theta)
          const [tx, ty, tz] = applyTilt(wx, ry, wz)
          const [px, py]     = project(tx, ty, tz, cx, cy)
          pts.push({ px, py, tx, ty, tz })
        }

        // Draw segments
        for (let s = 0; s < STEPS; s++) {
          if (pts[s].tz < -R * 0.05) continue
          const { line } = sphereColor(pts[s].tx, pts[s].ty, pts[s].tz, R)
          ctx.beginPath()
          ctx.moveTo(pts[s].px, pts[s].py)
          ctx.lineTo(pts[s + 1].px, pts[s + 1].py)
          ctx.strokeStyle = line
          ctx.lineWidth = 1.6
          ctx.stroke()
        }

        // Intersection dots at each meridian crossing
        for (let j = 0; j < LNGS; j++) {
          const theta = (j / LNGS) * Math.PI * 2 + rot
          const wx = rr * Math.sin(theta)
          const wz = rr * Math.cos(theta)
          const [tx, ty, tz] = applyTilt(wx, ry, wz)
          if (tz < -R * 0.05) continue
          const [px, py] = project(tx, ty, tz, cx, cy)
          intersections.push({ px, py, tx, ty, tz })
        }
      }

      // ── Meridians ───────────────────────────────────────
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
          if (pts[s].tz < -R * 0.05) continue
          const { line } = sphereColor(pts[s].tx, pts[s].ty, pts[s].tz, R)
          ctx.beginPath()
          ctx.moveTo(pts[s].px, pts[s].py)
          ctx.lineTo(pts[s + 1].px, pts[s + 1].py)
          ctx.strokeStyle = line
          ctx.lineWidth = 1.6
          ctx.stroke()
        }
      }

      // ── Draw all intersection dots on top ───────────────
      for (const { px, py, tx, ty, tz } of intersections) {
        const { dot } = sphereColor(tx, ty, tz, R)
        const depthScale = 0.5 + (tz / R + 1) * 0.35
        const dotR = Math.max(1.2, 2.8 * depthScale)

        // Glow
        const grd = ctx.createRadialGradient(px, py, 0, px, py, dotR * 3)
        grd.addColorStop(0, dot.replace(')', ', 0.5)').replace('rgba(', 'rgba('))
        grd.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(px, py, dotR * 3, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()

        // Solid dot
        ctx.beginPath()
        ctx.arc(px, py, dotR, 0, Math.PI * 2)
        ctx.fillStyle = dot
        ctx.fill()
      }

      ctx.restore()
    }

    let lastT = 0
    function tick(t: number) {
      const dt = t - lastT
      lastT = t

      if (!dragRef.current.active) {
        if (Math.abs(dragRef.current.velocity) > 0.0002) {
          dragRef.current.velocity *= 0.96
          rotRef.current += dragRef.current.velocity
        } else {
          dragRef.current.velocity = 0
          rotRef.current += 0.003
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
    <section id="hero" className="relative min-h-screen overflow-hidden pt-20" style={{ background: 'var(--background)' }}>
      {/* Subtle radial glow behind globe */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 60% 70% at 68% 50%, rgba(0,157,231,0.07) 0%, transparent 65%)',
        }}
      />

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
