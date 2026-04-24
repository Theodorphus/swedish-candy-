import Link from 'next/link'
import Nav from '@/components/Nav'
import ContactForm from './ContactForm'

export const metadata = {
  title: 'Contact — SwedenSweet',
  description: 'Get in touch with SwedenSweet for wholesale pricing, product questions, or enterprise inquiries.',
}

const details = [
  {
    label: 'Response time',
    value: 'Within 1 business day',
  },
  {
    label: 'Hours',
    value: 'Mon–Fri, 9 am – 5 pm EST',
  },
  {
    label: 'USA warehouse',
    value: 'Chicago, IL',
  },
  {
    label: 'Sweden warehouse',
    value: 'Sweden',
  },
]

export default function ContactPage() {
  return (
    <div>
      <Nav />

      <div className="section-px" style={{ paddingTop: 48, paddingBottom: 64, maxWidth: 900, margin: '0 auto' }}>
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5" style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 32 }}>
          <Link href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <span>Contact</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-8 md:gap-16 items-start">

          {/* Form column */}
          <div>
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 10 }}>
                Get in touch
              </div>
              <h1 style={{ fontSize: 28, fontWeight: 500, marginBottom: 10 }}>Contact us</h1>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                Questions about wholesale pricing, products, or logistics? Fill out the form and we&apos;ll get back to you within one business day.
              </p>
            </div>
            <ContactForm />
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-3">
            {/* Contact details */}
            <div style={{ background: 'var(--bg-secondary)', border: '0.5px solid var(--border)', borderRadius: 12, padding: 28 }}>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 18 }}>Contact details</div>
              <div className="flex flex-col gap-4">
                {details.map((d) => (
                  <div key={d.label}>
                    <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 2 }}>
                      {d.label}
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--text)' }}>{d.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Apply CTA */}
            <div style={{ background: 'var(--bg-secondary)', border: '0.5px solid var(--border)', borderRadius: 12, padding: 28 }}>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Ready to order?</div>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 16 }}>
                Apply for a wholesale account to get access to pricing and place orders directly.
              </p>
              <Link href="/apply" style={{
                display: 'block', textAlign: 'center',
                background: 'var(--accent)', color: '#fff',
                padding: '10px 20px', borderRadius: 6,
                fontSize: 13, fontWeight: 500, textDecoration: 'none',
              }}>
                Apply for account →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
