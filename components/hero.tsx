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
      canvas.width  = rect.width
      canvas.height = rect.height
    }
    setSize()
    const ro = new ResizeObserver(setSize)
    ro.observe(canvas.parentElement!)

    const LATS  = 10
    const LNGS  = 16
    // 25-degree tilt around Y-axis (tilts globe left/right)
    const TILT  = (25 * Math.PI) / 180
    const sinT = Math.sin(TILT)
    const cosT = Math.cos(TILT)

    // Apply Y-axis tilt (rotates around vertical axis)
    function applyTilt(wx: number, wy: number, wz: number): [number, number, number] {
      const tx = wx * cosT + wz * sinT
      const tz = -wx * sinT + wz * cosT
      return [tx, wy, tz]
    }

    function project(x: number, y: number, z: number, cx: number, cy: number): [number, number, number] {
      const fov   = 900
      const scale = fov / (fov + z)
      return [cx + x * scale, cy + y * scale, scale]
    }

    // Red = top-right: positive X AND negative Y (after tilt)
    function sphereColor(tx: number, ty: number, R: number): string {
      const nx = tx / R
      const ny = ty / R
      const isRed = nx > 0.05 && ny < -0.05
      const depth = 0.4 + Math.abs(nx) * 0.6

      if (isRed) {
        return `rgba(244, 0, 0, ${(depth * 0.7).toFixed(2)})`
      }
      return `rgba(0, 157, 231, ${(depth * 0.7).toFixed(2)})`
    }

    function drawGlobe(rot: number) {
      const W = canvas.width
      const H = canvas.height
      const cx = W * 0.72
      const cy = H * 0.50
      const R  = Math.min(H * 0.32, 170)

      // ── Always-visible outer ring ──────────────────────
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(0, 157, 231, 0.35)'
      ctx.lineWidth = 2
      ctx.stroke()

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
          const color = sphereColor(pts[s].tx, pts[s].ty, R)
          ctx.beginPath()
          ctx.moveTo(pts[s].px, pts[s].py)
          ctx.lineTo(pts[s + 1].px, pts[s + 1].py)
          ctx.strokeStyle = color
          ctx.lineWidth = 1.5
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
          const color = sphereColor(pts[s].tx, pts[s].ty, R)
          ctx.beginPath()
          ctx.moveTo(pts[s].px, pts[s].py)
          ctx.lineTo(pts[s + 1].px, pts[s + 1].py)
          ctx.strokeStyle = color
          ctx.lineWidth = 1.5
          ctx.stroke()
        }
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
    <section id="hero" className="relative min-h-screen overflow-hidden gradient-hero pt-20">
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
