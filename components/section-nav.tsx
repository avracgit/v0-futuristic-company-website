'use client'

import { useState, useEffect } from 'react'

const SECTIONS = [
  { id: 'hero',         label: 'Home'         },
  { id: 'stats',        label: 'Stats'        },
  { id: 'clients',      label: 'Clients'      },
  { id: 'results',      label: 'Results'      },
  { id: 'features',     label: 'Features'     },
  { id: 'integrations', label: 'Integrations' },
  { id: 'testimonials', label: 'Testimonials' },
]

// Total dot height including connector lines
// Each item = dot (8px) + line (16px), last item no line
const ITEM_H   = 24   // px per item (line + dot)
const TOTAL_H  = ITEM_H * (SECTIONS.length - 1) + 8 // last item no line below

export default function SectionNav() {
  const [active,  setActive]  = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const update = () => {
      setVisible(window.scrollY > 120)
      const mid = window.scrollY + window.innerHeight * 0.4
      let found = 0
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id)
        if (el && el.offsetTop <= mid) { found = i; break }
      }
      setActive(found)
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <nav
      aria-label="Page sections"
      style={{
        // Sit exactly in the left gutter: half viewport minus half max-content-width minus some padding
        // At 1400px viewport and 1280px content: gutter = 60px each side. We sit at 18px from edge.
        left: 'max(18px, calc(50vw - 640px - 56px))',
      }}
      className={`
        fixed top-1/2 -translate-y-1/2 z-40
        hidden 2xl:flex flex-col items-end
        transition-opacity duration-500
        ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
    >
      {/* Vertical track */}
      <div className="relative flex flex-col items-center" style={{ width: 2, height: TOTAL_H }}>
        {/* Full background track */}
        <div
          className="absolute inset-x-0 top-0 rounded-full"
          style={{
            height: '100%',
            background: 'rgba(148,163,184,0.15)',
          }}
        />
        {/* Filled progress track */}
        <div
          className="absolute inset-x-0 top-0 rounded-full transition-all duration-500 ease-out"
          style={{
            height: active === 0
              ? '0%'
              : `${(active / (SECTIONS.length - 1)) * 100}%`,
            background: 'var(--brand-blue)',
            opacity: 0.5,
          }}
        />
      </div>

      {/* Dots + labels — overlaid absolutely on the track */}
      <div
        className="absolute flex flex-col"
        style={{ top: 0, left: '50%', transform: 'translateX(-50%)', height: TOTAL_H }}
      >
        {SECTIONS.map((s, i) => {
          const isActive = i === active
          const isPast   = i < active
          return (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              aria-label={`Go to ${s.label}`}
              aria-current={isActive ? 'true' : undefined}
              className="group relative flex items-center focus:outline-none"
              style={{
                height: i < SECTIONS.length - 1 ? ITEM_H : 8,
                justifyContent: 'center',
              }}
            >
              {/* Dot */}
              <div
                className="rounded-full transition-all duration-300 flex-shrink-0"
                style={{
                  width:      isActive ? 8 : 5,
                  height:     isActive ? 8 : 5,
                  background: isActive
                    ? 'var(--brand-blue)'
                    : isPast
                    ? 'rgba(59,130,246,0.55)'
                    : 'rgba(148,163,184,0.35)',
                  boxShadow: isActive
                    ? '0 0 0 3px rgba(59,130,246,0.18), 0 0 8px rgba(59,130,246,0.25)'
                    : 'none',
                  position: 'relative',
                  zIndex: 1,
                }}
              />

              {/* Label — appears to the right on hover or when active */}
              <span
                className="absolute left-5 whitespace-nowrap text-[10px] font-medium tracking-wider uppercase transition-all duration-200 pointer-events-none"
                style={{
                  color: isActive ? 'var(--brand-blue)' : 'var(--text-muted)',
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'translateX(0)' : 'translateX(-4px)',
                }}
              >
                {s.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
