import Link from 'next/link'
import ContactForm from './ContactForm'

export const metadata = {
  title: 'Contact Us — SwedenSweet B2B Wholesale',
  description: 'Get in touch with SwedenSweet for wholesale pricing, co-packing, private label, or product questions. We respond within 1 business day.',
  openGraph: {
    title: 'Contact SwedenSweet — B2B Swedish Candy Wholesale',
    description: 'Questions about wholesale pricing, co-packing or private label? We respond within 1 business day.',
    images: [{ url: '/OG2.png', width: 1200, height: 630 }],
  },
}

const details = [
  { label: 'Response time', value: 'Within 1 business day' },
  { label: 'Hours', value: 'Mon–Fri, 9 am – 5 pm EST' },
  { label: 'USA warehouse', value: 'Santa Fe Springs, CA' },
  { label: 'Sweden warehouse', value: 'Sweden' },
]

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ product?: string }> }) {
  const { product } = await searchParams
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
          <span>Contact</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-8 md:gap-16 items-start">

          {/* Form column */}
          <div>
            <div style={{ marginBottom: 36 }}>
              <div className="eyebrow" style={{ marginBottom: 12 }}>Get in touch</div>
              <h1
                style={{
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  fontSize: 'clamp(26px, 4vw, 34px)',
                  fontWeight: 700,
                  marginBottom: 12,
                }}
              >
                Contact us
              </h1>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.75 }}>
                Questions about wholesale pricing, products, or logistics? Fill out the form
                and we&apos;ll get back to you within one business day.
              </p>
            </div>
            <ContactForm product={product} />
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
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 20 }}>
                Contact details
              </div>
              <div className="flex flex-col gap-5">
                {details.map((d) => (
                  <div key={d.label}>
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        color: 'var(--text-tertiary)',
                        textTransform: 'uppercase',
                        letterSpacing: 1.2,
                        marginBottom: 3,
                      }}
                    >
                      {d.label}
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--text)' }}>{d.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: 14,
                padding: 28,
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
                Ready to order?
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: 'var(--text-secondary)',
                  lineHeight: 1.65,
                  marginBottom: 18,
                }}
              >
                Create a free wholesale account to get instant access to pricing and place orders directly.
              </p>
              <Link
                href="/apply"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  background: 'var(--accent)',
                  color: '#fff',
                  padding: '11px 20px',
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 500,
                  textDecoration: 'none',
                }}
              >
                Create account →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
