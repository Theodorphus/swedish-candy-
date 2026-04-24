import Link from 'next/link'
import Nav from '@/components/Nav'
import ApplyForm from './ApplyForm'

export const metadata = {
  title: 'Apply for a Wholesale Account — SwedenSweet',
  description: 'Apply for a B2B wholesale account with SwedenSweet. Get access to 500+ Swedish candy SKUs at wholesale pricing.',
}

export default function ApplyPage() {
  return (
    <div>
      <Nav />

      <div className="section-px" style={{ paddingTop: 48, paddingBottom: 48, maxWidth: 900, margin: '0 auto' }}>
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5" style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 32 }}>
          <Link href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <span>Apply for account</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8 md:gap-16 items-start">
          {/* Form */}
          <div>
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 10 }}>
                Wholesale application
              </div>
              <h1 style={{ fontSize: 28, fontWeight: 500, marginBottom: 10 }}>Apply for a wholesale account</h1>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                Fill out the form below and we&apos;ll review your application within 1–2 business days.
                Once approved, you&apos;ll get access to wholesale pricing across our full catalog.
              </p>
            </div>
            <ApplyForm />
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-3">
            <div style={{ background: 'var(--bg-secondary)', border: '0.5px solid var(--border)', borderRadius: 12, padding: 28 }}>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 16 }}>What you get</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  'Access to 500+ Swedish candy SKUs',
                  'Wholesale pricing from $300 MOQ',
                  'Fulfillment from USA & Sweden',
                  'Dedicated account support',
                  'NET-15 to NET-45 payment terms',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5" style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0, marginTop: 6, display: 'inline-block' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ background: 'var(--bg-secondary)', border: '0.5px solid var(--border)', borderRadius: 12, padding: 28 }}>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Questions?</div>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 14 }}>
                Not sure which tier fits your business? We&apos;re happy to help.
              </p>
              <Link href="/contact" style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>
                Contact us →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
