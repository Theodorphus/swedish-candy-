import Link from 'next/link'

export const revalidate = 3600

import ProductCard from '@/components/ProductCard'
import SectionHeader from '@/components/SectionHeader'
import BrandSection from '@/components/BrandSection'
import FAQAccordion from '@/components/FAQAccordion'
import HeroVideo from '@/components/HeroVideo'
import ScrollReveal from '@/components/ScrollReveal'
import { getProducts } from '@/lib/shopify'

const stats = [
  { value: '500+', label: 'Swedish SKUs' },
  { value: '3–5 days', label: 'USA delivery' },
  { value: '2', label: 'Warehouses' },
]



export default async function Home() {
  const products = await getProducts(8).catch(() => [])
  const featuredProducts = products.slice(0, 8)

  return (
    <div style={{ background: 'var(--bg)' }}>
      {/* ══ HERO ════════════════════════════════════════════ */}
      <section style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#1A0A0E', position: 'relative', overflow: 'hidden' }}>
        <HeroVideo />
        {/* Overlay — låter videon andas men håller texten läsbar */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(26,10,14,0.42) 0%, rgba(26,10,14,0.28) 100%)' }} />

        <div className="section-px content-max" style={{ paddingTop: 'clamp(56px, 8vw, 96px)', paddingBottom: 'clamp(48px, 7vw, 80px)', position: 'relative', zIndex: 1 }}>
          <p className="eyebrow" style={{ marginBottom: 16, color: 'rgba(255,255,255,0.45)' }}>B2B Wholesale · USA Market</p>

          <h1
            className="display"
            style={{
              fontSize: 'clamp(32px, 7vw, 68px)',
              maxWidth: 780,
              marginBottom: 24,
              color: '#FFFFFF',
              lineHeight: 1.1,
            }}
          >
            The complete source of Swedish candy{' '}
            <strong style={{ color: 'var(--sand)', fontWeight: 700 }}>
              for wholesale buyers.
            </strong>
          </h1>

          <p
            style={{
              fontSize: 'clamp(14px, 2vw, 16px)',
              color: 'rgba(255,255,255,0.68)',
              lineHeight: 1.8,
              maxWidth: 480,
              marginBottom: 36,
            }}
          >
            Skip the import hassle. 500+ Swedish candy SKUs delivered to your US shelves in 3–5 days — no customs, no FDA paperwork. We handle it all.
          </p>

          <div className="hero-cta" style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <Link href="/catalog/usa" className="btn-white" style={{ padding: 'clamp(11px, 2vw, 14px) clamp(20px, 4vw, 32px)', fontSize: 13 }}>
              View wholesale pricing
            </Link>
            <Link href="/apply" className="btn-ghost" style={{ padding: 'clamp(11px, 2vw, 14px) clamp(20px, 4vw, 32px)', fontSize: 13 }}>
              Create account
            </Link>
          </div>
        </div>
      </section>

      {/* ══ STATS BAR ════════════════════════════════════════ */}
      <section
        className="grid grid-cols-1 sm:grid-cols-3"
        style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)' }}
      >
        {stats.map((s, i) => (
          <div
            key={i}
            className={`section-px stat-cell${i < 2 ? ' stat-cell-not-last' : ''}`}
            style={{ paddingTop: 28, paddingBottom: 28 }}
          >
            <ScrollReveal delay={i * 80}>
              <div style={{ display: 'inline-flex', alignItems: 'baseline', marginBottom: 6 }}>
                {s.value.startsWith('$') && (
                  <span className="price-currency" style={{ fontSize: 14, paddingTop: 5 }}>$</span>
                )}
                <span className="display price-num" style={{ fontSize: 36, color: 'var(--accent)', lineHeight: 1 }}>
                  {s.value.replace('$', '')}
                </span>
              </div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
                {s.label}
              </div>
            </ScrollReveal>
          </div>
        ))}
      </section>

      {/* ══ PRICE GUARANTEE ══════════════════════════════════════ */}
      <section style={{ background: 'var(--bg-secondary)', padding: 'clamp(48px, 8vw, 88px) clamp(20px, 5vw, 48px)' }}>
        <ScrollReveal>
          <div style={{
            maxWidth: 720,
            margin: '0 auto',
            background: 'linear-gradient(135deg, #ffffff 0%, #f7f7fb 100%)',
            border: '1px solid #e4e4ec',
            borderRadius: 20,
            boxShadow: '0 2px 4px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.06)',
            padding: 'clamp(40px, 6vw, 64px) clamp(32px, 5vw, 56px)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* noise texture overlay */}
            <div style={{
              position: 'absolute', inset: 0, borderRadius: 20, pointerEvents: 'none',
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
              backgroundRepeat: 'repeat', opacity: 0.6,
            }} />

            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <span style={{
                display: 'inline-block', marginBottom: 20,
                fontSize: 11, fontWeight: 700, letterSpacing: '1.8px', textTransform: 'uppercase',
                color: 'var(--accent)', background: 'rgba(155,34,72,0.07)',
                border: '1px solid rgba(155,34,72,0.15)', borderRadius: 100,
                padding: '5px 14px',
              }}>Member benefit</span>

              <h2 className="display" style={{ fontSize: 'clamp(26px, 4vw, 42px)', color: 'var(--text)', marginBottom: 16, lineHeight: 1.15 }}>
                Become a member and get our{' '}
                <em style={{ fontStyle: 'normal', color: 'var(--accent)' }}>price guarantee</em>
              </h2>

              <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 36, maxWidth: 520 }}>
                Already receiving better prices from another distributor? We don't just aim to match the price — we aim to beat it.
              </p>

              <div style={{
                width: '100%',
                background: '#ffffff',
                border: '1px solid #e8e8f0',
                borderLeft: '3px solid var(--accent)',
                borderRadius: 12,
                padding: 'clamp(24px, 4vw, 36px) clamp(24px, 4vw, 40px)',
                textAlign: 'left',
                marginBottom: 40,
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.9, margin: 0 }}>
                  Show us your landed cost — including shipping, duties, and any other fees — and we guarantee a{' '}
                  <strong style={{ color: 'var(--text)', fontWeight: 600 }}>5–10% better price</strong>{' '}
                  whenever possible.
                </p>
                <p style={{ fontSize: 14, color: 'var(--text-tertiary)', lineHeight: 1.9, marginTop: 14, marginBottom: 0 }}>
                  Once you've created an account and shared your volumes, we'll prepare a tailored offer designed to make us your best partner for Swedish and European candy.
                </p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10 }}>
                <Link href="/apply" className="btn-primary" style={{ padding: '13px 30px', fontSize: 13 }}>
                  Create an account
                </Link>
                <Link href="/contact" className="btn-secondary" style={{ padding: '13px 30px', fontSize: 13 }}>
                  Share your current pricing
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ══ USA CATALOG ════════════════════════════════════════ */}
      {featuredProducts.length > 0 && (
        <section style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
          <div className="section-px content-max" style={{ paddingTop: 'clamp(48px, 8vw, 88px)', paddingBottom: 'clamp(48px, 8vw, 88px)' }}>
            <SectionHeader
              eyebrow="USA Catalog"
              title="Bestsellers"
              subtitle="Top-selling lines available from our Santa Fe Springs warehouse."
              link={{ label: 'View full catalog', href: '/catalog/usa' }}
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {featuredProducts.map((p, i) => (
                <ScrollReveal key={p.id} delay={i * 60}>
                  <ProductCard product={p} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* ══ BRANDS ════════════════════════════════════════════ */}
      <section style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>
        <div className="section-px content-max" style={{ paddingTop: 'clamp(48px, 8vw, 88px)', paddingBottom: 'clamp(48px, 8vw, 88px)' }}>
          <SectionHeader
            eyebrow="Brand partners"
            title="Direct from Sweden's leading producers"
            subtitle="Direct relationships with 8 of Sweden's top candy makers — full catalog, no markups, from day one."
          />
          <BrandSection />
        </div>
      </section>

      {/* ══ WAREHOUSES ════════════════════════════════════════ */}
      <section style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="section-px content-max" style={{ paddingTop: 'clamp(48px, 8vw, 88px)', paddingBottom: 'clamp(48px, 8vw, 88px)' }}>
          <SectionHeader eyebrow="Fulfillment" title="USA warehouse" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5" style={{ maxWidth: 760 }}>
            {/* USA */}
            <ScrollReveal delay={0}>
            <div
              className="warehouse-card"
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderTop: '3px solid var(--accent)',
                borderRadius: 8,
                padding: '36px 32px',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <p className="eyebrow-muted" style={{ marginBottom: 12 }}>USA Warehouse</p>
              <h3 className="display" style={{ fontSize: 22, color: 'var(--text)', marginBottom: 10 }}>
                Santa Fe Springs, CA
              </h3>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 16 }}>
                FDA-approved facility. All products are customs-cleared and ready for immediate delivery. Domestic shipping in 3–5 business days.
              </p>
              <p style={{ fontSize: 12, color: 'var(--text-tertiary)', lineHeight: 1.6, marginBottom: 28 }}>
                No import paperwork. No tariffs. One invoice — everything included.
              </p>
              <Link href="/catalog/usa" className="btn-primary" style={{ fontSize: 13, padding: '10px 22px' }}>
                Shop USA catalog →
              </Link>
            </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══ SERVICES ══════════════════════════════════════════ */}
      <section style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
        <div className="section-px content-max" style={{ paddingTop: 'clamp(48px, 8vw, 88px)', paddingBottom: 'clamp(48px, 8vw, 88px)' }}>
          <SectionHeader
            eyebrow="More than wholesale"
            title="A complete candy partner"
            subtitle="From bulk import to branded retail-ready bags — we support your business end to end."
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                    <line x1="12" y1="22.08" x2="12" y2="12"/>
                  </svg>
                ),
                title: 'Bulk wholesale',
                body: 'Full catalog access from two warehouses. Competitive pricing, flexible MOQs, and NET payment terms for approved accounts.',
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                  </svg>
                ),
                title: 'Co-packing',
                body: 'Our FDA-approved Santa Fe Springs facility prepares candy mixes to your specifications. You buy the candy, we pack it — finished bags ready for sale.',
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20.59 13.41 13.42 20.58 6.58 13.42 13.41 6.59 20.59 13.41"/>
                    <line x1="8" y1="8" x2="12" y2="4"/>
                    <line x1="12" y1="4" x2="16" y2="8"/>
                    <line x1="8" y1="16" x2="12" y2="20"/>
                    <line x1="12" y1="20" x2="16" y2="16"/>
                  </svg>
                ),
                title: 'Private label',
                body: 'Launch Swedish candy under your own brand. We support you from concept and product selection through production, import, and delivery.',
              },
            ].map(({ icon, title, body }, i) => (
              <ScrollReveal key={title} delay={i * 100}>
                <div style={{
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: 10,
                  padding: '32px 28px',
                  height: '100%',
                }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>{icon}</div>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 10 }}>{title}</h3>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.75 }}>{body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div style={{ marginTop: 32 }}>
            <Link href="/contact" className="btn-secondary" style={{ fontSize: 13 }}>
              Ask about co-packing & private label →
            </Link>
          </div>
        </div>
      </section>

      {/* ══ WHY US ══════════════════════════════════════════════ */}
      <section style={{
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: '#1A0A0E',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/why-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.45,
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(26,10,14,0.45) 0%, rgba(26,10,14,0.35) 100%)' }} />
        <div className="section-px content-max" style={{ paddingTop: 'clamp(48px, 8vw, 88px)', paddingBottom: 'clamp(48px, 8vw, 88px)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 52, flexWrap: 'wrap', gap: 12, position: 'relative', zIndex: 1 }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: 12, color: 'rgba(255,255,255,0.4)' }}>Why SwedenSweet</p>
              <h2 className="display" style={{ fontSize: 'clamp(24px, 3vw, 36px)', color: '#FFFFFF' }}>Built for B2B</h2>
            </div>
          </div>

          <div className="why-grid grid grid-cols-1 sm:grid-cols-3 gap-12" style={{ maxWidth: 880, position: 'relative', zIndex: 1 }}>
            {[
              { n: '01', title: 'No customs hassle', body: 'We handle FDA requirements, import procedures, and tariffs. You get one clean invoice — door to door.' },
              { n: '02', title: 'Co-packing & private label', body: 'Our FDA-approved Santa Fe Springs facility can prepare custom candy mixes under your own brand, ready for retail.' },
              { n: '03', title: 'Built by retailers', body: 'Our founders ran food stores and candy shops. We understand what your shelves need — and what sells.' },
            ].map(({ n, title, body }, i) => (
              <ScrollReveal key={n} delay={i * 120}>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: 'var(--sand)', opacity: 0.7, marginBottom: 16 }}>
                    {n}
                  </p>
                  <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 10, color: '#FFFFFF' }}>{title}</h3>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.52)', lineHeight: 1.75 }}>{body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ ═════════════════════════════════════════════════ */}
      <section style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
        <div className="section-px content-max" style={{ paddingTop: 'clamp(48px, 8vw, 88px)', paddingBottom: 'clamp(48px, 8vw, 88px)' }}>
          <SectionHeader
            eyebrow="FAQ"
            title="Common questions"
            subtitle="Everything you need to know about wholesaling Swedish candy with us."
          />
          <div style={{ maxWidth: 760, marginTop: 48 }}>
            <FAQAccordion />
            <div style={{ marginTop: 32 }}>
              <Link href="/contact" className="btn-secondary" style={{ fontSize: 13 }}>
                Contact us →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA BAND ════════════════════════════════════════════ */}
      <section style={{ background: '#1A0A0E', position: 'relative', overflow: 'hidden' }}>
        <HeroVideo src="/Slow_cinematic_dolly_shot_over_a_dark_marble_surface_covered_in_colorful___Swedish_candy___gummy_bea_seed2773629280.mp4" opacity={0.55} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(26,10,14,0.45) 0%, rgba(26,10,14,0.35) 100%)' }} />
        <div
          className="section-px content-max"
          style={{ paddingTop: 'clamp(56px, 8vw, 96px)', paddingBottom: 'clamp(56px, 8vw, 96px)', textAlign: 'center', position: 'relative', zIndex: 1 }}
        >
          <p className="eyebrow" style={{ marginBottom: 24, color: 'rgba(255,255,255,0.5)' }}>Get started</p>
          <h2
            className="display"
            style={{ fontSize: 'clamp(28px, 4.5vw, 48px)', maxWidth: 520, margin: '0 auto 16px', color: '#FFFFFF' }}
          >
            Ready to stock Swedish candy?
          </h2>
          <p
            style={{
              fontSize: 15,
              color: 'rgba(255,255,255,0.72)',
              maxWidth: 360,
              margin: '0 auto 48px',
              lineHeight: 1.8,
            }}
          >
            Create a free account and get access to 500+ SKUs at competitive wholesale pricing.
          </p>
          <div className="cta-buttons" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 12 }}>
            <Link href="/apply" className="btn-white" style={{ padding: '14px 34px', fontSize: 14 }}>
              Create your free account
            </Link>
            <Link href="/contact" className="btn-ghost" style={{ padding: '14px 34px', fontSize: 14 }}>
              Talk to sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
