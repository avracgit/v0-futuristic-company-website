'use client'

import { useState, useEffect } from 'react'

const sections = [
  { id: 'hero',         label: 'Home'     },
  { id: 'stats',        label: 'Stats'    },
  { id: 'results',      label: 'Results'  },
  { id: 'features',     label: 'Features' },
  { id: 'integrations', label: 'Partners' },
  { id: 'testimonials', label: 'Reviews'  },
]

export default function SectionNav() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const mid = window.scrollY + window.innerHeight / 2
      let found = 0
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id)
        if (el && el.offsetTop <= mid) { found = i; break }
      }
      setActiveIndex(found)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      aria-label="Page sections"
      className="fixed left-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-0"
    >
      {sections.map((section, i) => (
        <button
          key={section.id}
          onClick={() => scrollTo(section.id)}
          aria-label={`Go to ${section.label}`}
          className="group relative flex items-center"
        >
          {/* Connecting line segment above dot (skip for first) */}
          {i > 0 && (
            <span
              className="absolute left-1/2 -translate-x-1/2 bottom-full w-px h-5 transition-colors duration-300"
              style={{
                background: i <= activeIndex
                  ? 'var(--brand-blue)'
                  : 'rgba(100,116,139,0.25)',
              }}
            />
          )}

          {/* Dot */}
          <span
            className="relative flex items-center justify-center w-6 h-6"
          >
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width:  i === activeIndex ? 8 : 5,
                height: i === activeIndex ? 8 : 5,
                background: i === activeIndex
                  ? 'var(--brand-blue)'
                  : i < activeIndex
                  ? 'rgba(59,130,246,0.45)'
                  : 'rgba(100,116,139,0.30)',
                boxShadow: i === activeIndex
                  ? '0 0 0 3px rgba(59,130,246,0.18)'
                  : 'none',
              }}
            />
          </span>

          {/* Label — appears on hover to the right */}
          <span
            className="absolute left-8 whitespace-nowrap text-xs font-medium pointer-events-none
                       opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0
                       transition-all duration-200"
            style={{
              color: i === activeIndex ? 'var(--brand-blue)' : 'var(--text-muted)',
            }}
          >
            {section.label}
          </span>
        </button>
      ))}
    </nav>
  )
}
