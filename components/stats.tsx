'use client'

import { useEffect, useRef, useState } from 'react'

const stats = [
  { value: 500, suffix: '+', label: 'Enterprise Clients', color: 'var(--brand-blue)' },
  { value: 6, suffix: '', label: 'Industry Verticals', color: 'var(--brand-red)' },
  { value: 15, suffix: '+', label: 'Years of Excellence', color: 'var(--brand-blue)' },
  { value: 98, suffix: '%', label: 'Client Satisfaction', color: 'var(--brand-red)' },
]

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const observed = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !observed.current) {
          observed.current = true
          let start = 0
          const duration = 1800
          const step = (timestamp: number) => {
            if (!start) start = timestamp
            const progress = Math.min((timestamp - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(step)
            else setCount(target)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section id="stats" className="relative py-24 px-6 overflow-hidden section-stats">
      {/* Top/bottom subtle lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center group">
              <div
                className="font-sans font-bold text-5xl md:text-6xl mb-2 transition-all duration-300"
                style={{ color: stat.color }}
              >
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm text-[var(--text-muted)] tracking-wide">{stat.label}</p>
              <div
                className="mt-4 h-0.5 w-0 group-hover:w-16 mx-auto transition-all duration-500 rounded-full"
                style={{ background: stat.color }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
