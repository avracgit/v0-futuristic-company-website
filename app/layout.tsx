import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  weight: ['400', '500', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ConglomerateIT | AI-First Enterprise Transformation Partner',
  description:
    'ConglomerateIT is an AI-first enterprise transformation partner delivering cloud, AI/ML, DevOps, and digital solutions across multiple industry verticals.',
  keywords: [
    'ConglomerateIT',
    'AI IT services',
    'enterprise transformation',
    'cloud solutions',
    'digital transformation',
    'offshore delivery',
    'Salesforce implementation',
  ],
  openGraph: {
    title: 'ConglomerateIT | AI-First Enterprise Transformation Partner',
    description: 'Transform your business with tomorrow\'s technology. AI-first solutions across QA, Cloud, AI, Infrastructure, Analytics, and Development.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${jetbrainsMono.variable} dark bg-background`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (theme === 'light') {
                  document.documentElement.classList.remove('dark');
                } else if (theme === 'dark' || prefersDark) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
