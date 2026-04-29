'use client'

import { useState, useEffect } from 'react'

const sections = [
  { id: 'hero',         label: 'Home'         },
  { id: 'stats',        label: 'Stats'        },
  { id: 'clients',      label: 'Clients'      },
  { id: 'results',      label: 'Results'      },
  { id: 'features',     label: 'Features'     },
  { id: 'integrations', label: 'Integrations' },
  { id: 'testimonials', label: 'Testimonials' },
]

export default function SectionNav() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setVisible(scrollY > 80)

      const mid = scrollY + window.innerHeight / 2
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
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden md:flex items-center gap-1 transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
      }`}
    >
      {sections.map((section, i) => {
        const isActive = i === activeIndex
        return (
          <button
            key={section.id}
            onClick={() => scrollTo(section.id)}
            aria-label={`Go to ${section.label}`}
            title={section.label}
            className="group relative flex flex-col items-center gap-1 px-1"
          >
            {/* Tick mark / progress bar */}
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width:  isActive ? 24 : 12,
                height: 2,
                background: isActive
                  ? 'var(--brand-blue)'
                  : i < activeIndex
                  ? 'rgba(59,130,246,0.40)'
                  : 'rgba(100,116,139,0.25)',
              }}
            />
            {/* Label — only visible when active */}
            <span
              className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium tracking-wide pointer-events-none transition-all duration-200"
              style={{
                opacity: isActive ? 1 : 0,
                color: 'var(--brand-blue)',
              }}
            >
              {section.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
