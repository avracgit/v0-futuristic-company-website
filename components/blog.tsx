'use client'

import { useEffect, useState } from 'react'

interface BlogPost {
  id: number
  title: { rendered: string }
  excerpt: { rendered: string }
  link: string
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>
  }
  date: string
}

const PLACEHOLDER_POSTS = [
  {
    id: 1,
    title: { rendered: 'The Future of Enterprise AI: Trends Shaping 2025' },
    excerpt: { rendered: '<p>Artificial intelligence is no longer a buzzword — it&apos;s the backbone of competitive enterprise strategy. Explore how ConglomerateIT is leading the charge.</p>' },
    link: 'https://conglomerateit.com/blog',
    date: '2025-01-15',
    image: null,
  },
  {
    id: 2,
    title: { rendered: 'Digital Transformation: Beyond Technology' },
    excerpt: { rendered: '<p>True transformation requires more than new tools. It demands a cultural shift, leadership alignment, and a clear roadmap. Here&apos;s how we do it.</p>' },
    link: 'https://conglomerateit.com/blog',
    date: '2025-02-03',
    image: null,
  },
  {
    id: 3,
    title: { rendered: 'Building Resilient Teams in a Hybrid World' },
    excerpt: { rendered: '<p>The modern workforce is distributed and diverse. Our HR vertical shares actionable insights on building high-performance teams that thrive remotely.</p>' },
    link: 'https://conglomerateit.com/blog',
    date: '2025-03-21',
    image: null,
  },
]

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, '').replace(/&apos;/g, "'").replace(/&#8217;/g, "'").trim()
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function Blog() {
  const [posts, setPosts] = useState<typeof PLACEHOLDER_POSTS>(PLACEHOLDER_POSTS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://conglomerateit.com/blog/wp-json/wp/v2/posts?_embed&per_page=3')
      .then((res) => res.json())
      .then((data: BlogPost[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setPosts(
            data.map((p) => ({
              id: p.id,
              title: p.title,
              excerpt: p.excerpt,
              link: p.link,
              date: p.date,
              image: p._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? null,
            }))
          )
        }
      })
      .catch(() => {
        // Use placeholder posts on error
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <section id="blog" className="relative py-28 px-6 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(0,102,255,0.05) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-badge badge-blue mb-6">
              <span className="w-2 h-2 rounded-full bg-[var(--brand-blue)]" />
              <span className="font-mono text-xs text-[var(--brand-blue)] tracking-widest uppercase">
                Insights
              </span>
            </div>
            <h2 className="font-sans font-bold text-4xl md:text-5xl text-balance text-foreground">
              Latest from{' '}
              <span className="text-[var(--neon-cyan)]">CGIT Blog</span>
            </h2>
          </div>
          <a
            href="https://conglomerateit.com/blog"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-2 text-sm text-[var(--neon-cyan)] font-medium hover:opacity-80 transition-opacity"
          >
            View All Posts
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </a>
        </div>

        {/* Blog cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card rounded-2xl overflow-hidden group block fade-in-up hover:scale-[1.02] transition-transform duration-300"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Image area */}
              <div
                className="h-44 flex items-center justify-center relative overflow-hidden"
                style={{
                  background: i % 2 === 0
                    ? 'linear-gradient(135deg, rgba(0,102,255,0.15) 0%, rgba(0,212,255,0.08) 100%)'
                    : 'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(0,212,255,0.08) 100%)',
                }}
              >
                {(post as { image?: string | null }).image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={(post as { image?: string | null }).image!}
                    alt={stripHtml(post.title.rendered)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex items-center justify-center w-16 h-16 rounded-2xl border border-[rgba(0,212,255,0.2)]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth={1} className="w-8 h-8 opacity-50">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                    </svg>
                  </div>
                )}
                {/* Date badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full glass-badge">
                  <span className="font-mono text-[10px] text-[var(--brand-blue)]">{formatDate(post.date)}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-sans font-semibold text-base text-foreground leading-snug mb-3 group-hover:text-[var(--neon-cyan)] transition-colors line-clamp-2">
                  {stripHtml(post.title.rendered)}
                </h3>
                <p className="text-[#6b7494] text-sm leading-relaxed line-clamp-3">
                  {stripHtml(post.excerpt.rendered)}
                </p>
                <div className="mt-5 flex items-center gap-1.5 text-[var(--neon-cyan)] text-xs font-medium">
                  Read More
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 group-hover:translate-x-1 transition-transform">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
