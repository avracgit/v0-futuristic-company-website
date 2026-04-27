'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const partners = [
  { name: 'Salesforce', abbr: 'SF',  color: '#00A1E0' },
  { name: 'AWS',        abbr: 'AWS', color: '#FF9900' },
  { name: 'Azure',      abbr: 'AZ',  color: '#0078D4' },
  { name: 'Google',     abbr: 'GCP', color: '#4285F4' },
  { name: 'ServiceNow', abbr: 'SN',  color: '#62D84E' },
  { name: 'Kubernetes', abbr: 'K8s', color: '#326CE5' },
  { name: 'Docker',     abbr: 'DKR', color: '#2496ED' },
  { name: 'Terraform',  abbr: 'TF',  color: '#7B42BC' },
  { name: 'Jenkins',    abbr: 'JNK', color: '#D24939' },
  { name: 'GitHub',     abbr: 'GH',  color: '#f0f6fc' },
  { name: 'Jira',       abbr: 'JIRA',color: '#0052CC' },
  { name: 'Datadog',    abbr: 'DD',  color: '#632CA6' },
]

// Canvas
const W = 900
const H = 560
const CX = W / 2
const CY = H / 2

// Fixed node positions arranged in two columns on each side (left 3×2, right 3×2, top 2, bottom 2)
const nodePositions: { x: number; y: number }[] = [
  // Left column (outer)
  { x: 60,  y: 120 },
  { x: 60,  y: 280 },
  { x: 60,  y: 440 },
  // Left column (inner)
  { x: 210, y: 160 },
  { x: 210, y: 400 },
  // Top
  { x: 390, y: 60  },
  { x: 510, y: 60  },
  // Right column (inner)
  { x: 690, y: 160 },
  { x: 690, y: 400 },
  // Right column (outer)
  { x: 840, y: 120 },
  { x: 840, y: 280 },
  { x: 840, y: 440 },
]

// Build an orthogonal PCB path from node to center
// Uses an elbow: go horizontal to mid-x, then vertical, then horizontal to CX
function buildPath(nx: number, ny: number): string {
  const midX = nx < CX ? nx + (CX - nx) * 0.45 : nx - (nx - CX) * 0.45
  return `M ${nx} ${ny} L ${midX} ${ny} L ${midX} ${CY} L ${CX} ${CY}`
}

const NODE_W = 64
const NODE_H = 36

// Each pulse has a random delay + color
const PULSE_COLORS = ['#3b82f6', '#60a5fa', '#dc2626', '#3b82f6']

export default function Integrations() {
  const [pulses, setPulses] = useState<{ id: number; nodeIdx: number; progress: number; color: string }[]>([])
  const frameRef = useRef<number | null>(null)
  const nextIdRef = useRef(0)
  const lastSpawnRef = useRef(0)

  useEffect(() => {
    // Store path lengths after mount
    const paths: SVGPathElement[] = []
    const svgEl = document.getElementById('circuit-svg') as SVGSVGElement | null

    let lastTime = 0
    function tick(time: number) {
      const dt = time - lastTime
      lastTime = time

      // Spawn a new pulse every ~400ms
      if (time - lastSpawnRef.current > 380) {
        const nodeIdx = Math.floor(Math.random() * nodePositions.length)
        const color = PULSE_COLORS[Math.floor(Math.random() * PULSE_COLORS.length)]
        setPulses(prev => [
          ...prev.filter(p => p.progress < 1),
          { id: nextIdRef.current++, nodeIdx, progress: 0, color },
        ])
        lastSpawnRef.current = time
      }

      // Advance all pulses
      setPulses(prev =>
        prev
          .map(p => ({ ...p, progress: p.progress + dt * 0.0006 }))
          .filter(p => p.progress <= 1.05),
      )

      frameRef.current = requestAnimationFrame(tick)
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current) }
  }, [])

  return (
    <section className="section-base section-blend relative">
      <div className="absolute inset-0 gradient-radial pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="badge-blue text-xs font-medium px-3 py-1 rounded-full inline-block mb-4">Integrations</span>
          <h2 className="font-semibold text-3xl md:text-4xl lg:text-5xl text-foreground text-balance leading-tight">
            ConglomerateIT Connects You
            <br />
            With{' '}
            <span className="text-[var(--brand-blue)]">25+ Technology Partners</span>
          </h2>
          <p className="text-[var(--text-secondary)] mt-4 text-base max-w-xl mx-auto">
            Seamlessly integrating with your existing tools across cloud, DevOps, CRM, and analytics platforms.
          </p>
        </div>

        {/* Circuit board diagram */}
        <div className="relative mx-auto" style={{ maxWidth: 900 }}>
          <svg
            id="circuit-svg"
            viewBox={`0 0 ${W} ${H}`}
            className="w-full h-auto"
            aria-label="Technology partners circuit diagram"
          >
            <defs>
              {/* Glowing blue trace gradient */}
              <linearGradient id="traceGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#3b82f6" stopOpacity="0.08" />
                <stop offset="50%"  stopColor="#3b82f6" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.08" />
              </linearGradient>

              {/* Hub center glow */}
              <radialGradient id="hubGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor="#3b82f6" stopOpacity="0.25" />
                <stop offset="60%"  stopColor="#1e3a8a" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#06091a" stopOpacity="0" />
              </radialGradient>

              {/* Node background */}
              <filter id="nodeGlow">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
                <feFlood floodColor="#3b82f6" floodOpacity="0.3" result="color" />
                <feComposite in="color" in2="blur" operator="in" result="shadow" />
                <feMerge><feMergeNode in="shadow" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>

              {/* Pulse glow */}
              <filter id="pulseGlow">
                <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* Grid dots for PCB feel */}
            {Array.from({ length: 18 }, (_, r) =>
              Array.from({ length: 30 }, (_, c) => (
                <circle
                  key={`dot-${r}-${c}`}
                  cx={c * 32 + 14}
                  cy={r * 32 + 14}
                  r="1"
                  fill="rgba(59,130,246,0.08)"
                />
              ))
            )}

            {/* PCB traces (static) */}
            {nodePositions.map((pos, i) => (
              <path
                key={`trace-${i}`}
                d={buildPath(pos.x + NODE_W / 2, pos.y + NODE_H / 2)}
                fill="none"
                stroke="rgba(59,130,246,0.18)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}

            {/* Corner junction dots on trace elbows */}
            {nodePositions.map((pos, i) => {
              const nx = pos.x + NODE_W / 2
              const ny = pos.y + NODE_H / 2
              const midX = nx < CX ? nx + (CX - nx) * 0.45 : nx - (nx - CX) * 0.45
              return (
                <g key={`junc-${i}`}>
                  <circle cx={midX} cy={ny} r="3" fill="rgba(59,130,246,0.5)" />
                  <circle cx={midX} cy={CY} r="3" fill="rgba(59,130,246,0.5)" />
                </g>
              )
            })}

            {/* Animated signal pulses */}
            {pulses.map(pulse => {
              const pos = nodePositions[pulse.nodeIdx]
              if (!pos) return null
              const nx = pos.x + NODE_W / 2
              const ny = pos.y + NODE_H / 2
              const midX = nx < CX ? nx + (CX - nx) * 0.45 : nx - (nx - CX) * 0.45
              const t = Math.min(pulse.progress, 1)

              // Interpolate along the 3-segment path
              const seg1End = { x: midX, y: ny }
              const seg2End = { x: midX, y: CY }
              const seg3End = { x: CX,   y: CY }

              const d1 = Math.abs(midX - nx)
              const d2 = Math.abs(CY - ny)
              const d3 = Math.abs(CX - midX)
              const total = d1 + d2 + d3

              let px = nx, py = ny
              const t1 = d1 / total
              const t2 = (d1 + d2) / total
              if (t <= t1) {
                const s = t / t1
                px = nx + (seg1End.x - nx) * s
                py = ny
              } else if (t <= t2) {
                const s = (t - t1) / (t2 - t1)
                px = seg1End.x
                py = ny + (seg2End.y - ny) * s
              } else {
                const s = (t - t2) / (1 - t2)
                px = midX + (seg3End.x - midX) * s
                py = CY
              }

              return (
                <g key={pulse.id} filter="url(#pulseGlow)">
                  <circle cx={px} cy={py} r="4.5" fill={pulse.color} opacity={1 - t * 0.3} />
                  <circle cx={px} cy={py} r="2"   fill="#fff"        opacity={0.9} />
                </g>
              )
            })}

            {/* Hub center glow background */}
            <circle cx={CX} cy={CY} r="70" fill="url(#hubGrad)" />
            <circle cx={CX} cy={CY} r="44" fill="#0d1224" stroke="rgba(59,130,246,0.35)" strokeWidth="1.5" />
            <circle cx={CX} cy={CY} r="52" fill="none"    stroke="rgba(59,130,246,0.10)" strokeWidth="1"   strokeDasharray="3 6" />

            {/* Center CGIT logo */}
            <foreignObject x={CX - 22} y={CY - 22} width="44" height="44">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banner%20logo%20latest-Wy6FwAgjDavAiB9pvHR7pRWJVuZx3Z.png"
                alt="ConglomerateIT"
                width={44}
                height={44}
                className="w-11 h-11 object-contain"
              />
            </foreignObject>

            {/* Partner nodes */}
            {nodePositions.map((pos, i) => {
              const p = partners[i % partners.length]
              return (
                <g key={p.name} filter="url(#nodeGlow)">
                  {/* Node card */}
                  <rect
                    x={pos.x}
                    y={pos.y}
                    width={NODE_W}
                    height={NODE_H}
                    rx="8"
                    fill="#0d1224"
                    stroke="rgba(255,255,255,0.10)"
                    strokeWidth="1"
                  />
                  {/* Color accent bar on top */}
                  <rect
                    x={pos.x + 8}
                    y={pos.y + 3}
                    width={NODE_W - 16}
                    height="2"
                    rx="1"
                    fill={p.color}
                    opacity="0.7"
                  />
                  {/* Abbr */}
                  <text
                    x={pos.x + NODE_W / 2}
                    y={pos.y + NODE_H / 2 - 3}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={p.color}
                    fontSize="9"
                    fontWeight="700"
                    fontFamily="monospace"
                  >
                    {p.abbr}
                  </text>
                  {/* Name */}
                  <text
                    x={pos.x + NODE_W / 2}
                    y={pos.y + NODE_H / 2 + 9}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="rgba(148,163,184,0.85)"
                    fontSize="6.5"
                    fontFamily="sans-serif"
                  >
                    {p.name}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>
      </div>
    </section>
  )
}
