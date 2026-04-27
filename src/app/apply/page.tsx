import Link from 'next/link'
import ApplyForm from './ApplyForm'

export const metadata = {
  title: 'Apply for a Wholesale Account — SwedenSweet',
  description: 'Apply for a B2B wholesale account with SwedenSweet. Get access to 500+ Swedish candy SKUs at wholesale pricing.',
}

const perks = [
  'Access to 500+ Swedish candy SKUs',
  'Wholesale pricing from $300 MOQ',
  'Fulfillment from USA & Sweden warehouses',
  'Dedicated account support',
  'NET-15 to NET-45 payment terms',
]

export default function ApplyPage() {
  return (
    <div>
      <div
        className="section-px"
        style={{ paddingTop: 52, paddingBottom: 64, maxWidth: 960, margin: '0 auto' }}
      >
        {/* Breadcrumb */}
        <div
          className="flex items-center gap-2"
          style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 36 }}
        >
          <Link href="/" style={{ color: 'var(--text-tertiary)', textDecoration: 'none' }}>
            Home
          </Link>
          <span>/</span>
          <span>Apply for account</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_296px] gap-8 md:gap-16 items-start">
          {/* Form */}
          <div>
            <div style={{ marginBottom: 36 }}>
              <div className="eyebrow" style={{ marginBottom: 12 }}>Wholesale application</div>
              <h1
                style={{
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  fontSize: 'clamp(26px, 4vw, 34px)',
                  fontWeight: 700,
                  marginBottom: 12,
                }}
              >
                Apply for a wholesale account
              </h1>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.75 }}>
                Fill out the form below and we&apos;ll review your application within 1–2 business days.
                Once approved, you&apos;ll get access to wholesale pricing across our full catalog.
              </p>
            </div>
            <ApplyForm />
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-4">
            <div
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: 14,
                padding: 28,
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 18 }}>
                What you get
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 13 }}>
                {perks.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3"
                    style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: 'var(--accent)',
                        flexShrink: 0,
                        marginTop: 5,
                        display: 'inline-block',
                      }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: 14,
                padding: 28,
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Questions?</div>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 16 }}>
                Not sure which tier fits your business? We&apos;re happy to help you figure out the right fit.
              </p>
              <Link
                href="/contact"
                style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}
              >
                Contact us →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
