import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { Playfair_Display } from 'next/font/google'
import Footer from '@/components/Footer'
import NavWrapper from '@/components/NavWrapper'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' })
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'SwedenSweet — B2B Swedish Candy Wholesale',
  description: 'Wholesale Swedish candy for retailers and distributors across the USA. 500+ SKUs, competitive pricing, fast fulfillment.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${playfair.variable}`}>
      <body>
        <NavWrapper />
        {children}
        <Footer />
      </body>
    </html>
  )
}
