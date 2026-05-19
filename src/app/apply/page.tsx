import Link from 'next/link'
import ApplyForm from './ApplyForm'

export const metadata = {
  title: 'Create a Wholesale Account — SwedenSweet',
  description: 'Create a free B2B wholesale account with SwedenSweet. Instant access to 500+ Swedish candy SKUs at wholesale pricing.',
  openGraph: {
    title: 'Create a Wholesale Account — SwedenSweet',
    description: 'Instant access to 500+ Swedish candy SKUs at wholesale pricing. No approval wait — start ordering the same day.',
    images: [{ url: '/OG.png', width: 1200, height: 630 }],
  },
}

const perks = [
  { label: 'Instant access — no waiting',        sub: 'Your account is active immediately' },
  { label: 'Access to 500+ Swedish candy SKUs',  sub: 'Full catalog from day one' },
  { label: 'Wholesale pricing from $300 MOQ',    sub: 'Competitive case pricing' },
  { label: 'USA & Sweden warehouse fulfillment', sub: '3–5 day domestic shipping' },
  { label: 'Dedicated account support',          sub: 'Direct line to our team' },
]

export default function ApplyPage() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '70vh' }}>
      <div className="section-px content-max" style={{ paddingTop: 56, paddingBottom: 80 }}>

        {/* Breadcrumb */}
        <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 40, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link href="/" style={{ color: 'var(--text-tertiary)', textDecoration: 'none' }}>Home</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <span>Create account</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-10 md:gap-16 items-start">

          {/* Form side */}
          <div>
            <div style={{ marginBottom: 40 }}>
              <p className="eyebrow" style={{ marginBottom: 12 }}>Free wholesale account</p>
              <h1 className="display" style={{ fontSize: 'clamp(26px, 4vw, 36px)', marginBottom: 14 }}>
                Create your wholesale account
              </h1>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: 520 }}>
                Sign up and get instant access to wholesale pricing across our full catalog.
                No approval process — start browsing and ordering the same day.
              </p>
            </div>
            <ApplyForm />
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* What you get */}
            <div style={{ background: '#1A0A0E', border: '1px solid rgba(255,255,255,0.06)', borderTop: '3px solid var(--accent)', borderRadius: 10, padding: 28 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 20 }}>
                What you get
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 18 }}>
                {perks.map((item) => (
                  <li key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                      <circle cx="8" cy="8" r="7" fill="var(--accent)" opacity="0.2"/>
                      <path d="M5 8l2 2 4-4" stroke="var(--sand)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#FFFFFF', marginBottom: 2 }}>{item.label}</p>
                      <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>{item.sub}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Questions */}
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 10, padding: 24 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>Questions before applying?</p>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 16 }}>
                Not sure which tier fits your business? We're happy to help.
              </p>
              <Link href="/contact" style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>
                Talk to us →
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
