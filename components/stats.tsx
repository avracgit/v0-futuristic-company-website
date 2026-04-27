'use client'

import { useEffect, useRef, useState } from 'react'

const stats = [
  { value: 500, suffix: '+', label: 'Enterprise Clients', desc: 'Across every vertical we serve' },
  { value: 6, suffix: '', label: 'Industry Verticals', desc: 'From tech to real estate' },
  { value: 15, suffix: '+', label: 'Years of Excellence', desc: 'Proven track record since founding' },
  { value: 98, suffix: '%', label: 'Client Satisfaction', desc: 'Measured annually across all engagements' },
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
          const duration = 1600
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
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function Stats() {
  return (
    <section id="stats" className="relative py-20 px-6 border-b border-white/[0.05]">
      <div className="section-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-white/[0.06]">
          {stats.map((stat, i) => (
            <div key={i} className="lg:px-10 text-center lg:text-left first:lg:pl-0 last:lg:pr-0">
              <div
                className="font-sans font-bold text-4xl md:text-5xl mb-1"
                style={{ color: i % 2 === 0 ? 'var(--brand-red)' : 'var(--brand-blue-light)' }}
              >
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="font-medium text-sm text-[var(--foreground)] mb-1">{stat.label}</div>
              <div className="text-xs text-[var(--text-subtle)] leading-relaxed hidden sm:block">{stat.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
