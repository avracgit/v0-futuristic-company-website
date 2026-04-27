'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface BlogPost {
  id: number
  title: { rendered: string }
  excerpt: { rendered: string }
  link: string
  _embedded?: { 'wp:featuredmedia'?: Array<{ source_url: string }> }
  date: string
}

const PLACEHOLDER_POSTS = [
  {
    id: 1,
    title: { rendered: 'The Future of Enterprise AI: Trends Shaping 2025' },
    excerpt: { rendered: 'Artificial intelligence is no longer a buzzword — it is the backbone of competitive enterprise strategy. Explore how ConglomerateIT is leading the charge.' },
    link: 'https://conglomerateit.com/blog',
    date: '2025-01-15',
    image: null,
    category: 'Technology',
  },
  {
    id: 2,
    title: { rendered: 'Digital Transformation: Beyond the Technology' },
    excerpt: { rendered: 'True transformation requires more than new tools. It demands cultural shift, leadership alignment, and a clear roadmap. Here is how we do it.' },
    link: 'https://conglomerateit.com/blog',
    date: '2025-02-03',
    image: null,
    category: 'Consulting',
  },
  {
    id: 3,
    title: { rendered: 'Building Resilient Teams in a Hybrid World' },
    excerpt: { rendered: 'The modern workforce is distributed and diverse. Our HR vertical shares actionable insights on building high-performance teams that thrive remotely.' },
    link: 'https://conglomerateit.com/blog',
    date: '2025-03-21',
    image: null,
    category: 'Staffing',
  },
]

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, '').replace(/&apos;/g, "'").replace(/&#8217;/g, "'").trim()
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function Blog() {
  const [posts, setPosts] = useState<typeof PLACEHOLDER_POSTS>(PLACEHOLDER_POSTS)

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
              category: 'Insights',
            }))
          )
        }
      })
      .catch(() => {/* use placeholders */})
  }, [])

  return (
    <section id="blog" className="relative py-28 border-b border-white/[0.05]">
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
          <div>
            <p className="section-label">Insights</p>
            <h2 className="font-sans font-bold text-4xl md:text-5xl text-balance text-[var(--foreground)]">
              Latest from the{' '}
              <span className="text-[var(--brand-red)]">CGIT Blog</span>
            </h2>
          </div>
          <Link href="/blog" className="btn-outline text-sm flex-shrink-0">
            View All Posts
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {posts.map((post, i) => (
            <a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="brand-card rounded-lg overflow-hidden group block"
            >
              {/* Image / color band */}
              <div
                className="h-2 w-full"
                style={{
                  background: i % 2 === 0
                    ? 'var(--brand-red)'
                    : 'var(--brand-blue)',
                }}
                aria-hidden="true"
              />

              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="text-[10px] font-mono font-medium px-2 py-0.5 rounded"
                    style={{
                      background: i % 2 === 0 ? 'rgba(224,32,32,0.08)' : 'rgba(26,79,204,0.08)',
                      color: i % 2 === 0 ? 'var(--brand-red)' : 'var(--brand-blue-light)',
                    }}
                  >
                    {post.category}
                  </span>
                  <span className="text-[11px] text-[var(--text-subtle)]">{formatDate(post.date)}</span>
                </div>

                <h3 className="font-sans font-semibold text-sm leading-snug text-[var(--foreground)] group-hover:text-[var(--brand-red)] transition-colors mb-3 line-clamp-2">
                  {stripHtml(post.title.rendered)}
                </h3>
                <p className="text-[var(--text-subtle)] text-xs leading-relaxed line-clamp-3 mb-5">
                  {stripHtml(post.excerpt.rendered)}
                </p>

                <div className="flex items-center gap-1 text-xs font-medium text-[var(--text-subtle)] group-hover:text-[var(--brand-red)] transition-colors">
                  Read article
                  <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
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
