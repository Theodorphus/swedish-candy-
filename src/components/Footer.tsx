'use client'

import Link from 'next/link'

const navLinks = [
  { label: 'USA Catalog',    href: '/catalog/usa' },
  { label: 'Sweden Catalog', href: '/catalog/sweden' },
  { label: 'Apply',          href: '/apply' },
  { label: 'Contact',        href: '/contact' },
]

const legalLinks = [
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Privacy Policy',   href: '/privacy' },
  { label: 'Refund Policy',    href: '/refund-policy' },
  { label: 'Shipping Policy',  href: '/shipping-policy' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#0F0608', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="section-px content-max" style={{ paddingTop: 72, paddingBottom: 48 }}>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: '#FFFFFF', marginBottom: 14 }}>
              Sweden<span style={{ color: 'var(--sand)' }}>Sweet</span>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, maxWidth: 220, marginBottom: 28 }}>
              Premium Swedish confectionery, sourced direct and shipped to your US shelves.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
              {['Visa', 'Mastercard', 'ACH'].map((m) => (
                <span key={m} style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  color: 'rgba(255,255,255,0.4)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 3,
                  padding: '3px 7px',
                }}>
                  {m}
                </span>
              ))}
            </div>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L2 4v4c0 3.3 2.5 6.4 6 7.2C12 14.4 14 11.3 14 8V4L8 1z" stroke="currentColor" strokeWidth="1.4" fill="none"/>
              </svg>
              Secure checkout by Shopify
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="eyebrow" style={{ marginBottom: 20, color: 'rgba(255,255,255,0.3)' }}>Navigation</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', textDecoration: 'none', transition: 'color 150ms ease' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#FFFFFF')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="eyebrow" style={{ marginBottom: 20, color: 'rgba(255,255,255,0.3)' }}>Legal</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {legalLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', textDecoration: 'none', transition: 'color 150ms ease' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#FFFFFF')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Fulfillment */}
          <div>
            <p className="eyebrow" style={{ marginBottom: 20, color: 'rgba(255,255,255,0.3)' }}>Fulfillment</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ paddingLeft: 12, borderLeft: '2px solid var(--accent)' }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#FFFFFF', marginBottom: 4 }}>Chicago, IL — USA</p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>3–5 day domestic shipping</p>
              </div>
              <div style={{ paddingLeft: 12, borderLeft: '2px solid var(--sand)' }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#FFFFFF', marginBottom: 4 }}>Sweden</p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>500+ SKU full assortment</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div style={{ marginTop: 56, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>
            © {new Date().getFullYear()} SwedenSweet · Gramlux Foods AB
          </span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.05em' }}>
            $300 MOQ · USD · B2B only
          </span>
        </div>

      </div>
    </footer>
  )
}
