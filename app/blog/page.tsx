import Link from 'next/link'
import type { Metadata } from 'next'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Blog & Insights | ConglomerateIT',
  description: 'Thought leadership, case studies, and insights from the teams behind ConglomerateIT\'s six industry verticals.',
}

const posts = [
  {
    id: 1,
    title: 'The Future of Enterprise AI: Trends Shaping 2025',
    excerpt: 'Artificial intelligence is no longer a buzzword — it is the backbone of competitive enterprise strategy. Here is how forward-looking organizations are deploying AI to create lasting competitive advantage.',
    category: 'Technology',
    date: '2025-01-15',
    readTime: '6 min read',
    color: 'red',
  },
  {
    id: 2,
    title: 'Digital Transformation: Beyond the Technology',
    excerpt: 'True transformation requires more than new tools. It demands cultural alignment, leadership commitment, and an honest assessment of where your organization actually stands today.',
    category: 'Consulting',
    date: '2025-02-03',
    readTime: '5 min read',
    color: 'blue',
  },
  {
    id: 3,
    title: 'Building Resilient Teams in a Hybrid World',
    excerpt: 'The modern workforce is distributed and diverse. Our HR vertical shares actionable insights on building high-performance teams that thrive whether they work remotely, in-office, or somewhere in between.',
    category: 'Staffing',
    date: '2025-03-21',
    readTime: '4 min read',
    color: 'red',
  },
  {
    id: 4,
    title: 'Smart Buildings: How IoT is Reshaping Commercial Real Estate',
    excerpt: 'Connected buildings are no longer a luxury amenity — they are a baseline expectation. Explore how our Real Estate vertical is embedding sensor technology and analytics into every new development.',
    category: 'Real Estate',
    date: '2025-04-08',
    readTime: '7 min read',
    color: 'blue',
  },
  {
    id: 5,
    title: 'Why Corporate Training Programs Fail (and How to Fix Them)',
    excerpt: 'Most L&D investment evaporates within 90 days. Our Education vertical\'s methodology for designing training that actually changes behavior and delivers measurable performance outcomes.',
    category: 'Education',
    date: '2025-04-14',
    readTime: '5 min read',
    color: 'red',
  },
  {
    id: 6,
    title: 'The Embedded Finance Revolution: What Enterprises Need to Know',
    excerpt: 'Financial services are being woven into non-financial products at an accelerating rate. Our Finance & Fintech team breaks down the opportunity and the risk for enterprise leaders.',
    category: 'Finance',
    date: '2025-04-20',
    readTime: '8 min read',
    color: 'blue',
  },
]

const categories = ['All', 'Technology', 'Consulting', 'Staffing', 'Real Estate', 'Education', 'Finance']

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Page hero */}
      <section className="relative pt-32 pb-20 border-b border-white/[0.05] grid-bg">
        <div
          className="absolute top-0 left-0 w-1 h-full"
          aria-hidden="true"
          style={{ background: 'linear-gradient(180deg, transparent, var(--brand-red) 40%, var(--brand-blue) 70%, transparent)' }}
        />
        <div className="section-container">
          <nav className="flex items-center gap-2 text-xs text-[var(--text-subtle)] mb-8 font-mono" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[var(--foreground)] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[var(--foreground)]">Blog</span>
          </nav>
          <p className="section-label">Insights</p>
          <h1 className="font-sans font-bold text-5xl md:text-6xl text-balance text-[var(--foreground)] leading-tight max-w-2xl mb-5">
            Perspectives from<br />
            <span className="text-[var(--brand-red)]">Every Vertical</span>
          </h1>
          <p className="text-[var(--text-muted)] text-lg max-w-xl leading-relaxed">
            Thought leadership, market insights, and practical guidance from the teams inside
            ConglomerateIT&apos;s six industry verticals.
          </p>
        </div>
      </section>

      {/* Category filter (static display) */}
      <section className="py-8 border-b border-white/[0.05]">
        <div className="section-container">
          <div className="flex items-center gap-2 overflow-x-auto pb-1" role="list" aria-label="Post categories">
            {categories.map((cat, i) => (
              <span
                key={cat}
                role="listitem"
                className="flex-shrink-0 px-4 py-1.5 rounded text-xs font-medium border cursor-default"
                style={
                  i === 0
                    ? { background: 'var(--brand-red)', borderColor: 'var(--brand-red)', color: '#fff' }
                    : { background: 'transparent', borderColor: 'rgba(255,255,255,0.08)', color: 'var(--text-subtle)' }
                }
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-16">
        <div className="section-container">
          {/* Featured post */}
          <a
            href="https://conglomerateit.com/blog"
            target="_blank"
            rel="noopener noreferrer"
            className="brand-card rounded-lg overflow-hidden group flex flex-col md:flex-row mb-6 block"
          >
            <div
              className="md:w-2 w-full h-2 md:h-auto flex-shrink-0"
              style={{ background: 'var(--brand-red)' }}
              aria-hidden="true"
            />
            <div className="p-8 flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-[rgba(224,32,32,0.08)] text-[var(--brand-red)]">
                  {posts[0].category}
                </span>
                <span className="text-[11px] text-[var(--text-subtle)]">{formatDate(posts[0].date)}</span>
                <span className="text-[11px] text-[var(--text-subtle)]">{posts[0].readTime}</span>
              </div>
              <h2 className="font-sans font-bold text-2xl text-[var(--foreground)] group-hover:text-[var(--brand-red)] transition-colors mb-3 text-balance">
                {posts[0].title}
              </h2>
              <p className="text-[var(--text-muted)] leading-relaxed mb-5 max-w-2xl">{posts[0].excerpt}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--brand-red)]">
                Read article
                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </span>
            </div>
          </a>

          {/* Rest of posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.slice(1).map((post) => (
              <a
                key={post.id}
                href="https://conglomerateit.com/blog"
                target="_blank"
                rel="noopener noreferrer"
                className="brand-card rounded-lg overflow-hidden group block"
              >
                <div
                  className="h-1.5 w-full"
                  style={{ background: post.color === 'red' ? 'var(--brand-red)' : 'var(--brand-blue)' }}
                  aria-hidden="true"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="text-[10px] font-mono font-medium px-2 py-0.5 rounded"
                      style={{
                        background: post.color === 'red' ? 'rgba(224,32,32,0.08)' : 'rgba(26,79,204,0.08)',
                        color: post.color === 'red' ? 'var(--brand-red)' : 'var(--brand-blue-light)',
                      }}
                    >
                      {post.category}
                    </span>
                    <span className="text-[11px] text-[var(--text-subtle)]">{post.readTime}</span>
                  </div>
                  <h3 className="font-sans font-semibold text-sm text-[var(--foreground)] group-hover:text-[var(--brand-red)] transition-colors mb-3 line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-[var(--text-subtle)] text-xs leading-relaxed line-clamp-3 mb-5">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-[var(--text-subtle)]">{formatDate(post.date)}</span>
                    <span className="flex items-center gap-1 text-xs font-medium text-[var(--text-subtle)] group-hover:text-[var(--brand-red)] transition-colors">
                      Read
                      <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 border-t border-white/[0.05]">
        <div className="section-container">
          <div className="rounded-lg p-10 border border-white/[0.07] text-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(224,32,32,0.06) 0%, rgba(26,79,204,0.08) 100%)' }}
          >
            <div className="absolute inset-0 pointer-events-none opacity-20 stripe-accent" aria-hidden="true" />
            <div className="relative z-10">
              <h2 className="font-sans font-bold text-3xl text-[var(--foreground)] mb-3">
                Stay Informed
              </h2>
              <p className="text-[var(--text-muted)] mb-6 max-w-md mx-auto">
                Get the latest insights from ConglomerateIT delivered to your inbox.
              </p>
              <Link href="/contact" className="btn-primary">
                Subscribe to Newsletter
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
