'use client'

const clients = [
  { name: 'Accenture',    abbr: 'ACC', color: '#a100ff' },
  { name: 'Deloitte',     abbr: 'DEL', color: '#86bc25' },
  { name: 'McKinsey',     abbr: 'MCK', color: '#003688' },
  { name: 'Goldman Sachs',abbr: 'GS',  color: '#5b9bd5' },
  { name: 'Salesforce',   abbr: 'SF',  color: '#00a1e0' },
  { name: 'HubSpot',      abbr: 'HUB', color: '#ff7a59' },
  { name: 'Stripe',       abbr: 'STR', color: '#635bff' },
  { name: 'Shopify',      abbr: 'SHO', color: '#96bf48' },
  { name: 'Notion',       abbr: 'NTN', color: '#ffffff' },
  { name: 'Atlassian',    abbr: 'ATL', color: '#0052cc' },
]

// Duplicate for seamless loop
const track = [...clients, ...clients]

export default function Clients() {
  return (
    <section id="clients" className="section-base section-blend relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">

        {/* Label */}
        <p className="text-center text-xs font-semibold tracking-widest uppercase text-[var(--text-muted)] mb-8">
          Trusted by industry leaders
        </p>

        {/* Scrolling track — two rows, opposite directions */}
        <div className="space-y-5 overflow-hidden select-none">

          {/* Row 1 — left to right */}
          <div className="relative">
            {/* Fade masks */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10"
              style={{ background: 'linear-gradient(to right, var(--background), transparent)' }} />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10"
              style={{ background: 'linear-gradient(to left, var(--background), transparent)' }} />

            <div className="clients-track-fwd flex gap-5 w-max">
              {track.map((c, i) => (
                <ClientCard key={i} client={c} />
              ))}
            </div>
          </div>

          {/* Row 2 — right to left */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10"
              style={{ background: 'linear-gradient(to right, var(--background), transparent)' }} />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10"
              style={{ background: 'linear-gradient(to left, var(--background), transparent)' }} />

            <div className="clients-track-rev flex gap-5 w-max">
              {[...track].reverse().map((c, i) => (
                <ClientCard key={i} client={c} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

function ClientCard({ client }: { client: typeof clients[0] }) {
  return (
    <div
      className="flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2.5 sm:py-3 rounded-xl glass-card flex-shrink-0 group cursor-default"
      style={{ minWidth: 130 }}
    >
      {/* Color dot / monogram */}
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-[10px] font-bold"
        style={{
          background: client.color + '22',
          color: client.color,
          border: `1px solid ${client.color}44`,
        }}
      >
        {client.abbr}
      </div>
      <span className="text-sm font-medium text-[var(--text-secondary)] group-hover:text-foreground transition-colors whitespace-nowrap">
        {client.name}
      </span>
    </div>
  )
}
