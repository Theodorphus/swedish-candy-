import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us — SwedenSweet',
  description: 'Sweden Sweet Corporation is a modern wholesale partner for Swedish and European confectionery in the USA. Learn about our story, warehouses, and services.',
}

export default function AboutPage() {
  return (
    <div style={{ background: 'var(--bg)' }}>

      {/* Header */}
      <div style={{ background: '#1A0A0E', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: 'clamp(56px, 8vw, 96px) 0 clamp(48px, 7vw, 80px)' }}>
        <div className="section-px content-max">
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 16 }}>
            About us
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: 'clamp(28px, 5vw, 52px)',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.15,
              maxWidth: 640,
              marginBottom: 20,
            }}
          >
            Who is Sweden Sweet Corporation?
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, maxWidth: 560 }}>
            A modern wholesale partner built by people who have been on both sides of the counter.
          </p>
        </div>
      </div>

      <div className="section-px content-max" style={{ paddingTop: 'clamp(48px, 8vw, 88px)', paddingBottom: 'clamp(64px, 10vw, 120px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 80, maxWidth: 760 }}>

          {/* Our story */}
          <section>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>Our story</p>
            <h2 style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 700, color: 'var(--text)', marginBottom: 20, lineHeight: 1.25 }}>
              From retail to wholesale
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.85 }}>
                Sweden Sweet Corporation is operated by two owners with a genuine passion for premium candy and many years of experience in retail, grocery, and candy stores. Our journey began in the retail world, where we built and operated food stores and candy shops ourselves.
              </p>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.85 }}>
                That experience gave us a deep understanding of what our customers truly need: the right products, reliable deliveries, clear terms, and a partner who understands the market from the inside out. Over time, our business evolved from retail into wholesale — with one clear mission: to make it easier for stores, online retailers, and businesses to source Swedish and European candy in a safe, efficient, and profitable way.
              </p>
            </div>
          </section>

          {/* Warehouses */}
          <section>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>Fulfillment</p>
            <h2 style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 700, color: 'var(--text)', marginBottom: 20, lineHeight: 1.25 }}>
              From Sweden to your door
            </h2>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: 32 }}>
              Sweden Sweet currently operates two warehouses: one in Sweden and one in Santa Fe Springs, California. This allows us to offer flexible and efficient deliveries, whether products are shipped from Europe or directly from our U.S. warehouse.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderTop: '3px solid var(--accent)', borderRadius: 8, padding: '24px 24px 28px' }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 8 }}>USA Warehouse</p>
                <p style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)', marginBottom: 12 }}>Santa Fe Springs, CA</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    'FDA-approved co-packing facility',
                    'All products customs-cleared',
                    'Ships in 3–5 business days',
                    'No import paperwork for buyers',
                  ].map(item => (
                    <li key={item} style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 1 }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderTop: '3px solid var(--sand)', borderRadius: 8, padding: '24px 24px 28px' }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 8 }}>Swedish Warehouse</p>
                <p style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)', marginBottom: 12 }}>Sweden</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    '500+ SKUs available',
                    'Full brand assortment',
                    'Ships under same smooth conditions',
                    'Broader selection than US stock',
                  ].map(item => (
                    <li key={item} style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--sand)', flexShrink: 0, marginTop: 1 }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.85, marginTop: 24 }}>
              When you buy from Sweden Sweet, you never have to worry about FDA requirements, customs clearance, import procedures, or tariffs. We take care of the entire process for you — one invoice, everything included.
            </p>
          </section>

          {/* Services */}
          <section>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>Services</p>
            <h2 style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 700, color: 'var(--text)', marginBottom: 20, lineHeight: 1.25 }}>
              More than just a candy supplier
            </h2>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: 32 }}>
              We are a full-service partner for businesses looking to grow within Swedish and European confectionery.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                {
                  title: 'Wholesale',
                  body: 'Full catalog access from two warehouses. Competitive pricing, flexible MOQs ($300 minimum), and NET-15 to NET-45 payment terms for approved accounts.',
                },
                {
                  title: 'Co-packing',
                  body: 'Our FDA-approved Santa Fe Springs facility can prepare your candy mixes directly on site. You purchase the candy from Sweden Sweet, we pack it according to your needs, and we deliver finished bags ready for sale. Saves time, labor, and money while giving you a professional, scalable solution.',
                },
                {
                  title: 'Private label',
                  body: 'Want to create Swedish candy under your own brand? Thanks to our established relationships with Sweden\'s leading candy manufacturers, we can help you develop products tailored to your brand — from concept and product selection through production, import, and final delivery.',
                },
              ].map(({ title, body }) => (
                <div key={title} style={{ borderLeft: '2px solid var(--accent)', paddingLeft: 20 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>{title}</p>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.85 }}>{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 10, padding: '36px 32px' }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 12 }}>Ready to get started?</p>
            <h2 style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: 24, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>
              Apply for a wholesale account
            </h2>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 28, maxWidth: 460 }}>
              Applications are reviewed within 1–2 business days. Once approved you get access to our full catalog and individual pricing.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <Link href="/apply" className="btn-primary" style={{ fontSize: 13 }}>
                Apply now →
              </Link>
              <Link href="/contact" className="btn-secondary" style={{ fontSize: 13 }}>
                Contact us
              </Link>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
