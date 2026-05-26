import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Playfair_Display } from 'next/font/google'
import Footer from '@/components/Footer'
import NavWrapper from '@/components/NavWrapper'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SwedenSweet — B2B Swedish Candy Wholesale',
  description: 'Wholesale Swedish candy for retailers and distributors across the USA. 500+ SKUs, competitive pricing, fast fulfillment from Santa Fe Springs, CA.',
  metadataBase: new URL('https://swedensweet.com'),
  openGraph: {
    type: 'website',
    url: 'https://swedensweet.com',
    siteName: 'SwedenSweet',
    title: 'SwedenSweet — B2B Swedish Candy Wholesale',
    description: 'Wholesale Swedish candy for retailers and distributors across the USA. 500+ SKUs, no customs hassle, fast fulfillment.',
    images: [{ url: '/OG2.png', width: 1200, height: 630, alt: 'SwedenSweet — B2B Swedish Candy Wholesale' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SwedenSweet — B2B Swedish Candy Wholesale',
    description: 'Wholesale Swedish candy for retailers and distributors across the USA. 500+ SKUs, no customs hassle, fast fulfillment.',
    images: ['/OG2.png'],
  },
  icons: {
    icon: '/Favicon.png',
    apple: '/Favicon.png',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Sweden Sweet Corporation',
  url: 'https://swedensweet.com',
  logo: 'https://swedensweet.com/Favicon.png',
  description: 'B2B wholesale partner for Swedish and European confectionery in the USA.',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'karen@thenordichype.com',
    contactType: 'customer service',
  },
  address: [
    {
      '@type': 'PostalAddress',
      addressLocality: 'Santa Fe Springs',
      addressRegion: 'CA',
      addressCountry: 'US',
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        <a href="#main-content" style={{ position: 'absolute', left: '-9999px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }} className="focus:left-4 focus:top-4 focus:w-auto focus:h-auto focus:overflow-visible focus:z-[9999] focus:bg-white focus:p-4 focus:rounded focus:shadow-lg focus:text-sm focus:font-medium">
          Skip to main content
        </a>
        <NavWrapper />
        <main id="main-content">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
