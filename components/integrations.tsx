'use client'

import Image from 'next/image'

// Positioned integration nodes with exact coordinates for line connections
const integrationNodes = [
  // Top arc
  { name: 'Salesforce', x: 15, y: 10 },
  { name: 'AWS', x: 35, y: 5 },
  { name: 'Azure', x: 50, y: 3 },
  { name: 'GCP', x: 65, y: 5 },
  { name: 'ServiceNow', x: 85, y: 10 },
  
  // Upper sides
  { name: 'Kubernetes', x: 8, y: 30 },
  { name: 'Terraform', x: 92, y: 30 },
  
  // Middle sides
  { name: 'Docker', x: 5, y: 50 },
  { name: 'GitHub', x: 95, y: 50 },
  
  // Lower sides
  { name: 'Jenkins', x: 8, y: 70 },
  { name: 'Datadog', x: 92, y: 70 },
  
  // Bottom arc
  { name: 'Jira', x: 15, y: 90 },
  { name: 'Slack', x: 35, y: 95 },
  { name: 'Teams', x: 65, y: 95 },
  { name: 'Splunk', x: 85, y: 90 },
]

const IntegrationIcon = ({ name }: { name: string }) => {
  const icons: Record<string, JSX.Element> = {
    Salesforce: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10.006 5.415a4.195 4.195 0 013.045-1.306c1.56 0 2.954.9 3.69 2.205.63-.3 1.35-.45 2.1-.45 2.85 0 5.16 2.34 5.16 5.22s-2.31 5.22-5.16 5.22c-.45 0-.9-.06-1.35-.15-.6 1.2-1.8 2.01-3.21 2.01-.45 0-.9-.09-1.29-.24a4.164 4.164 0 01-3.54 2.01c-1.56 0-2.94-.87-3.66-2.16-.3.06-.6.09-.93.09-2.55 0-4.62-2.1-4.62-4.68 0-1.8 1.02-3.36 2.49-4.14-.15-.45-.24-.93-.24-1.44 0-2.28 1.83-4.14 4.08-4.14 1.29 0 2.43.6 3.18 1.53z"/>
      </svg>
    ),
    AWS: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.75 11.35a4.32 4.32 0 01-.79-.08 3.55 3.55 0 01-.73-.2l-.14-.07-.12.09a4.35 4.35 0 01-4.16 1.14l-.13-.04-.1.1a5.3 5.3 0 01-3.85 1.63 5.34 5.34 0 01-3.85-1.63l-.1-.1-.14.04a4.34 4.34 0 01-1.14.15A4.35 4.35 0 010 8.02a4.35 4.35 0 014.35-4.35c.38 0 .76.05 1.13.15l.13.04.1-.1a5.34 5.34 0 017.7 0l.1.1.14-.04a4.2 4.2 0 011.13-.15c.26 0 .52.02.77.08a3.45 3.45 0 01.73.2l.14.07.11-.09a4.35 4.35 0 015.32 6.87 4.35 4.35 0 01-2.85 2.55z"/>
      </svg>
    ),
    Azure: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M5.483 21.3H24L14.025 4.013l-3.038 8.347 5.836 6.938L5.483 21.3zM13.23 2.7L6.105 8.677 0 19.253h5.505v.014L13.23 2.7z"/>
      </svg>
    ),
    GCP: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.19 2.38a9.344 9.344 0 00-9.234 6.893c.053-.02-.055.013 0 0-3.875 2.551-3.922 8.11-.247 10.941l.006-.007-.007.03a6.717 6.717 0 005.752 3.288h7.208c3.142.001 5.912-2.074 6.786-5.09.875-3.016-.23-6.29-2.709-8.026l-.003.012.004-.011a9.344 9.344 0 00-7.556-8.03z"/>
      </svg>
    ),
    ServiceNow: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
    Kubernetes: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10.204 14.35l.007.01-.999 2.413a5.171 5.171 0 01-2.075-2.597l2.578-.437.004.005a.44.44 0 01.485.606zm-.833-2.129a.44.44 0 00.173-.756l.002-.011L7.585 9.7a5.143 5.143 0 00-.73 3.255l2.514-.725.002-.009z"/>
      </svg>
    ),
    Docker: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.186"/>
      </svg>
    ),
    Terraform: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.44 0v7.575l6.561 3.79V3.79zm7.409 4.256v7.574l6.56 3.786V7.998zm6.56-4.256L8.849 3.79v7.574l6.56-3.787z"/>
      </svg>
    ),
    Jenkins: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
    GitHub: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
    ),
    Jira: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.571 11.513H0a5.218 5.218 0 005.232 5.215h2.13v2.057A5.215 5.215 0 0012.575 24V12.518a1.005 1.005 0 00-1.005-1.005z"/>
      </svg>
    ),
    Slack: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M5.042 15.165a2.528 2.528 0 01-2.52 2.523A2.528 2.528 0 010 15.165a2.527 2.527 0 012.522-2.52h2.52v2.52z"/>
      </svg>
    ),
    Teams: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.625 8.03h-5.25V6h6.75a1.5 1.5 0 011.5 1.5v9a1.5 1.5 0 01-1.5 1.5h-6.75v-2.03h5.25V8.03z"/>
      </svg>
    ),
    Datadog: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
    Splunk: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
  }

  return icons[name] || (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="10" />
    </svg>
  )
}

export default function Integrations() {
  const centerX = 50
  const centerY = 50

  return (
    <section className="relative py-24 px-6 overflow-hidden section-integrations">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-semibold text-3xl md:text-4xl lg:text-5xl text-[var(--foreground)] mb-4 text-balance">
            ConglomerateIT Connects You
            <br />
            With <span className="text-[var(--brand-blue)]">25+ Technology Partners</span>
          </h2>
        </div>

        {/* Integration Network */}
        <div className="relative max-w-4xl mx-auto">
          <div className="relative bg-white rounded-2xl border border-[var(--border)] shadow-xl p-8 aspect-square max-h-[600px]">
            {/* SVG for connection lines */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none" 
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--brand-blue)" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="var(--brand-blue)" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="var(--brand-blue)" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              
              {/* Connection lines from center to each node */}
              {integrationNodes.map((node, i) => (
                <line
                  key={`line-${i}`}
                  x1={centerX}
                  y1={centerY}
                  x2={node.x}
                  y2={node.y}
                  stroke="url(#lineGrad)"
                  strokeWidth="0.3"
                  className="connection-line"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </svg>

            {/* Center logo with pulse effect */}
            <div 
              className="absolute z-20"
              style={{ 
                left: '50%', 
                top: '50%', 
                transform: 'translate(-50%, -50%)' 
              }}
            >
              {/* Pulse rings */}
              <div className="absolute inset-0 -m-4 rounded-full border border-[var(--brand-blue)]/20 pulse-ring" />
              <div className="absolute inset-0 -m-8 rounded-full border border-[var(--brand-blue)]/10 pulse-ring" style={{ animationDelay: '0.5s' }} />
              
              <div className="w-20 h-20 rounded-2xl bg-white border-2 border-[var(--brand-blue)]/30 flex items-center justify-center shadow-lg shadow-[var(--brand-blue)]/10">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banner%20logo%20latest-Wy6FwAgjDavAiB9pvHR7pRWJVuZx3Z.png"
                  alt="ConglomerateIT"
                  width={48}
                  height={48}
                  className="w-12 h-12 object-contain"
                />
              </div>
            </div>

            {/* Integration nodes */}
            {integrationNodes.map((node, i) => (
              <div
                key={node.name}
                className="integration-node absolute w-14 h-14 flex flex-col items-center justify-center gap-1 z-10"
                style={{ 
                  left: `${node.x}%`, 
                  top: `${node.y}%`,
                  transform: 'translate(-50%, -50%)',
                  animationDelay: `${i * 0.1}s`
                }}
              >
                <div className="text-[var(--text-secondary)]">
                  <IntegrationIcon name={node.name} />
                </div>
                <span className="text-[8px] text-[var(--text-muted)] font-medium text-center leading-tight">{node.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
