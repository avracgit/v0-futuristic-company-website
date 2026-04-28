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

    const LATS  = 18   // dense latitude rings
    const LNGS  = 24   // dense meridians
    const STEPS_LAT = 100
    const STEPS_MER = 60

    // Slight tilt for visual interest (15 deg on Y axis)
    const TILT = (15 * Math.PI) / 180
    const sinT = Math.sin(TILT)
    const cosT = Math.cos(TILT)

    // Floating spheres matching the reference exactly:
    // 1 large red (top), 1 medium blue (upper-left), several small blue (bottom area)
    const orbs = [
      { ox: -0.15, oy: -1.25, r: 16, col: '#f40000' }, // large red top
      { ox: -1.20, oy: -0.40, r: 12, col: '#009de7' }, // medium blue upper-left
      { ox: -0.95, oy:  0.85, r:  5, col: '#009de7' }, // tiny blue bottom-left
      { ox: -0.10, oy:  1.15, r:  8, col: '#009de7' }, // small blue bottom-center
      { ox:  0.85, oy:  0.95, r:  6, col: '#009de7' }, // tiny blue bottom-right
      { ox:  1.10, oy:  0.20, r:  4, col: '#009de7' }, // tiny blue mid-right
    ]

    function tilt(wx: number, wy: number, wz: number): [number, number, number] {
      return [wx * cosT + wz * sinT, wy, -wx * sinT + wz * cosT]
    }

    function project(x: number, y: number, z: number, cx: number, cy: number): [number, number] {
      const fov = 1000
      const s = fov / (fov + z)
      return [cx + x * s, cy + y * s]
    }

    // Color logic: blue on left (~65%), red on upper-right (~35%), purple transition zone
    function getColor(tx: number, ty: number, tz: number, R: number) {
      const nx = tx / R  // -1 (left) to 1 (right)
      const ny = ty / R  // -1 (top) to 1 (bottom)
      const depth = Math.max(0.20, 0.30 + (tz / R + 1) * 0.50)

      // Transition zone: blend from blue to purple to red
      // Full blue when nx < -0.2, full red when nx > 0.4 && ny < 0
      const blueR = 0, blueG = 157, blueB = 231
      const redR = 244, redG = 0, redB = 0
      const purpleR = 120, purpleG = 60, purpleB = 180

      let r: number, g: number, b: number

      if (nx < -0.15) {
        // Left side: pure blue
        r = blueR; g = blueG; b = blueB
      } else if (nx > 0.35 && ny < 0.15) {
        // Upper-right: pure red
        r = redR; g = redG; b = redB
      } else if (nx >= -0.15 && nx <= 0.35) {
        // Transition zone: blue -> purple -> red
        const t = (nx + 0.15) / 0.5  // 0 to 1
        if (ny < 0.15) {
          // Upper half transitions to red via purple
          if (t < 0.5) {
            const t2 = t * 2
            r = blueR + (purpleR - blueR) * t2
            g = blueG + (purpleG - blueG) * t2
            b = blueB + (purpleB - blueB) * t2
          } else {
            const t2 = (t - 0.5) * 2
            r = purpleR + (redR - purpleR) * t2
            g = purpleG + (redG - purpleG) * t2
            b = purpleB + (redB - purpleB) * t2
          }
        } else {
          // Lower half stays more blue-ish purple
          r = blueR + (purpleR - blueR) * t * 0.6
          g = blueG + (purpleG - blueG) * t * 0.6
          b = blueB + (purpleB - blueB) * t * 0.4
        }
      } else {
        // Lower-right: stays blue-purple
        r = blueR + 40; g = blueG - 50; b = blueB - 30
      }

      return {
        line: `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},${(depth * 0.75).toFixed(2)})`,
        dot: [Math.round(r), Math.round(g), Math.round(b), depth] as [number, number, number, number],
      }
    }

    function drawOrb(ox: number, oy: number, r: number, col: string) {
      // Soft outer glow
      const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, r * 1.8)
      g.addColorStop(0, col + '55')
      g.addColorStop(0.6, col + '18')
      g.addColorStop(1, col + '00')
      ctx.beginPath()
      ctx.arc(ox, oy, r * 1.8, 0, Math.PI * 2)
      ctx.fillStyle = g
      ctx.fill()

      // Solid sphere
      ctx.beginPath()
      ctx.arc(ox, oy, r, 0, Math.PI * 2)
      ctx.fillStyle = col
      ctx.fill()

      // Specular highlight
      const h = ctx.createRadialGradient(ox - r * 0.25, oy - r * 0.25, 0, ox, oy, r)
      h.addColorStop(0, 'rgba(255,255,255,0.40)')
      h.addColorStop(0.5, 'rgba(255,255,255,0.0)')
      ctx.beginPath()
      ctx.arc(ox, oy, r, 0, Math.PI * 2)
      ctx.fillStyle = h
      ctx.fill()
    }

    function drawGlobe(t: number) {
      const W = canvas.width / window.devicePixelRatio
      const H = canvas.height / window.devicePixelRatio
      const cx = W * 0.58
      const cy = H * 0.50
      const R = Math.min(H * 0.34, 220)
      const rot = rotRef.current

      ctx.clearRect(0, 0, W, H)

      // Draw floating orbs
      orbs.forEach((orb, i) => {
        const ox = cx + orb.ox * R + Math.sin(t * 0.0002 + i * 1.5) * 6
        const oy = cy + orb.oy * R + Math.cos(t * 0.00025 + i * 1.2) * 5
        drawOrb(ox, oy, orb.r, orb.col)
      })

      type Pt = { px: number; py: number; tx: number; ty: number; tz: number }
      const dots: Pt[] = []

      // Latitude rings
      for (let i = 1; i < LATS; i++) {
        const phi = (i / LATS) * Math.PI
        const ry = R * Math.cos(phi)
        const rr = R * Math.sin(phi)

        const pts: Pt[] = []
        for (let s = 0; s <= STEPS_LAT; s++) {
          const theta = (s / STEPS_LAT) * Math.PI * 2 + rot
          const [tx, ty, tz] = tilt(rr * Math.sin(theta), ry, rr * Math.cos(theta))
          const [px, py] = project(tx, ty, tz, cx, cy)
          pts.push({ px, py, tx, ty, tz })
        }

        for (let s = 0; s < STEPS_LAT; s++) {
          const p = pts[s]
          if (p.tz < -R * 0.12) continue
          const { line } = getColor(p.tx, p.ty, p.tz, R)
          ctx.beginPath()
          ctx.moveTo(p.px, p.py)
          ctx.lineTo(pts[s + 1].px, pts[s + 1].py)
          ctx.strokeStyle = line
          ctx.lineWidth = 1.0
          ctx.stroke()
        }

        for (let j = 0; j < LNGS; j++) {
          const theta = (j / LNGS) * Math.PI * 2 + rot
          const [tx, ty, tz] = tilt(rr * Math.sin(theta), ry, rr * Math.cos(theta))
          if (tz < -R * 0.12) continue
          const [px, py] = project(tx, ty, tz, cx, cy)
          dots.push({ px, py, tx, ty, tz })
        }
      }

      // Meridians
      for (let j = 0; j < LNGS; j++) {
        const theta = (j / LNGS) * Math.PI * 2 + rot
        const sinTh = Math.sin(theta)
        const cosTh = Math.cos(theta)

        const pts: Pt[] = []
        for (let s = 0; s <= STEPS_MER; s++) {
          const phi = (s / STEPS_MER) * Math.PI
          const sp = Math.sin(phi)
          const [tx, ty, tz] = tilt(R * sp * sinTh, R * Math.cos(phi), R * sp * cosTh)
          const [px, py] = project(tx, ty, tz, cx, cy)
          pts.push({ px, py, tx, ty, tz })
        }

        for (let s = 0; s < STEPS_MER; s++) {
          const p = pts[s]
          if (p.tz < -R * 0.12) continue
          const { line } = getColor(p.tx, p.ty, p.tz, R)
          ctx.beginPath()
          ctx.moveTo(p.px, p.py)
          ctx.lineTo(pts[s + 1].px, pts[s + 1].py)
          ctx.strokeStyle = line
          ctx.lineWidth = 1.0
          ctx.stroke()
        }
      }

      // Intersection dots — small and subtle
      for (const { px, py, tx, ty, tz } of dots) {
        const { dot } = getColor(tx, ty, tz, R)
        const [r, g, b, depth] = dot
        const dotR = Math.max(1.0, 1.8 * depth)

        // Tiny glow
        const grd = ctx.createRadialGradient(px, py, 0, px, py, dotR * 2)
        grd.addColorStop(0, `rgba(${r},${g},${b},${(depth * 0.35).toFixed(2)})`)
        grd.addColorStop(1, `rgba(${r},${g},${b},0)`)
        ctx.beginPath()
        ctx.arc(px, py, dotR * 2, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()

        // Solid dot
        ctx.beginPath()
        ctx.arc(px, py, dotR, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(1, depth * 0.9).toFixed(2)})`
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
