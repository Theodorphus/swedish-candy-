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
  { value: '$300', label: 'Minimum order' },
  { value: '3–5 days', label: 'USA delivery' },
  { value: '2', label: 'Warehouses' },
]

const categories = [
  { name: 'Gummies & Sours',   img: '/Bilder kategorier/Gummies.png' },
  { name: 'Licorice',          img: '/Bilder kategorier/Licorice.png' },
  { name: 'Hard Candy',        img: '/Bilder kategorier/Hard candy.png' },
  { name: 'Marshmallow',       img: '/Bilder kategorier/Marshmallow.png' },
  { name: 'Mixed Assortments', img: '/Bilder kategorier/Mixed.png' },
]

const tiers = [
  {
    name: 'Starter',
    moq: '$300',
    // Direct Faire comparison — no platform cut
    tag: 'Faire alternative',
    desc: 'For independent retailers & single-location stores',
    features: [
      'Full catalog access',
      'Faire-matched wholesale pricing',
      'Fast domestic shipping from Santa Fe Springs, CA',
      'NET-15 terms after 3 orders',
      'Email support',
      'No platform fees',
    ],
    featured: false,
    dark: false,
    cta: 'Apply now',
    href: '/apply',
  },
  {
    name: 'Preferred',
    moq: '$1,000',
    // Highlighted as best value for growing retailers
    tag: 'Most popular',
    desc: 'For multi-location retailers & recurring buyers',
    features: [
      '10% below standard wholesale pricing',
      'Free shipping on orders over $1,500',
      'Dedicated account manager',
      'NET-30 payment terms',
      'Priority fulfillment',
      'Early access to restocks',
    ],
    featured: true,
    dark: false,
    cta: 'Apply now',
    href: '/apply',
  },
  {
    name: 'Enterprise',
    moq: '$5,000+',
    // Dark card signals exclusivity for high-volume buyers
    tag: 'High volume',
    desc: 'For chains, distributors & high-volume buyers',
    features: [
      '15–20% below standard wholesale',
      'Private label options',
      'Custom assortments & pallet pricing',
      'NET-45 payment terms',
      'Dedicated logistics support',
      'Priority production & restock allocation',
    ],
    featured: false,
    dark: true,
    cta: 'Contact sales',
    href: '/contact',
  },
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
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(26,10,14,0.55) 0%, rgba(26,10,14,0.45) 100%)' }} />

        <div className="section-px content-max" style={{ paddingTop: 'clamp(56px, 8vw, 96px)', paddingBottom: 'clamp(48px, 7vw, 80px)', position: 'relative', zIndex: 1 }}>
          <p className="eyebrow" style={{ marginBottom: 20, color: 'rgba(255,255,255,0.45)' }}>B2B Wholesale · USA Market</p>

          <h1
            className="display"
            style={{
              fontSize: 'clamp(32px, 7vw, 68px)',
              maxWidth: 780,
              marginBottom: 20,
              color: '#FFFFFF',
              lineHeight: 1.1,
            }}
          >
            The complete source of Swedish candy{' '}
            <em style={{ color: 'var(--sand)', fontStyle: 'italic' }}>
              for wholesale buyers.
            </em>
          </h1>

          <p
            style={{
              fontSize: 'clamp(14px, 2vw, 16px)',
              color: 'rgba(255,255,255,0.62)',
              lineHeight: 1.8,
              maxWidth: 460,
              marginBottom: 36,
            }}
          >
            Bulk Swedish candy from BUBS, Malaco, Matthijs, Vidal and more —
            delivered to your US shelves in 3–5 days from our Santa Fe Springs warehouse.
            No customs, no FDA hassle — we handle it all.
          </p>

          <div className="hero-cta" style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <Link href="/catalog/usa" className="btn-white" style={{ padding: 'clamp(11px, 2vw, 14px) clamp(20px, 4vw, 32px)', fontSize: 13 }}>
              Browse USA catalog
            </Link>
            <Link href="/apply" className="btn-ghost" style={{ padding: 'clamp(11px, 2vw, 14px) clamp(20px, 4vw, 32px)', fontSize: 13 }}>
              Apply for account
            </Link>
          </div>
        </div>
      </section>

      {/* ══ STATS BAR ════════════════════════════════════════ */}
      <section
        className="grid grid-cols-2 sm:grid-cols-4"
        style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)' }}
      >
        {stats.map((s, i) => (
          <div
            key={i}
            className="section-px"
            style={{
              paddingTop: 28,
              paddingBottom: 28,
              borderRight: i % 2 === 0 ? '1px solid var(--border)' : 'none',
              borderBottom: i < 2 ? '1px solid var(--border)' : 'none',
            }}
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

      {/* ══ CATEGORIES ════════════════════════════════════════ */}
      <section style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="section-px content-max" style={{ paddingTop: 'clamp(48px, 8vw, 88px)', paddingBottom: 'clamp(48px, 8vw, 88px)' }}>
          <SectionHeader
            eyebrow="Assortment"
            title="What we carry"
            subtitle="Bulk Swedish candy across every category — all available from our USA warehouse."
            link={{ label: 'Browse full catalog', href: '/catalog/usa' }}
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {categories.map((cat, i) => (
              <ScrollReveal key={cat.name} delay={i * 70}>
                <Link href="/catalog/usa" style={{ textDecoration: 'none', display: 'block' }}>
                  <div
                    className="category-img-card"
                    style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', aspectRatio: '3/4', background: '#1A0A0E', cursor: 'pointer' }}
                  >
                    <img
                      src={cat.img}
                      alt={cat.name}
                      className="category-img"
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 400ms ease' }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,10,14,0.88) 0%, rgba(26,10,14,0.18) 55%, transparent 100%)' }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '14px' }}>
                      <p style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: 15, fontWeight: 700, color: '#FFFFFF', lineHeight: 1.2, marginBottom: 3 }}>
                        {cat.name}
                      </p>
                      <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
                        Explore
                      </p>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
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
            subtitle="Every brand sourced and imported directly — no middlemen, no markups, full catalog access from day one."
          />
          <BrandSection />
        </div>
      </section>

      {/* ══ WAREHOUSES ════════════════════════════════════════ */}
      <section style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="section-px content-max" style={{ paddingTop: 'clamp(48px, 8vw, 88px)', paddingBottom: 'clamp(48px, 8vw, 88px)' }}>
          <SectionHeader eyebrow="Fulfillment" title="Two warehouses, one catalog" />

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

            {/* Sweden */}
            <ScrollReveal delay={120}>
            <div
              className="warehouse-card"
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderTop: '3px solid var(--sand)',
                borderRadius: 8,
                padding: '36px 32px',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <p className="eyebrow-muted" style={{ marginBottom: 12 }}>Swedish Warehouse</p>
              <h3 className="display" style={{ fontSize: 22, color: 'var(--text)', marginBottom: 10 }}>
                Sweden
              </h3>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 28 }}>
                Full 500+ SKU assortment. Broader selection, competitive pricing.
              </p>
              <Link href="/catalog/sweden" className="btn-secondary" style={{ fontSize: 13, padding: '10px 22px' }}>
                Shop Sweden catalog →
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
                icon: '📦',
                title: 'Bulk wholesale',
                body: 'Full catalog access from two warehouses. Competitive pricing, flexible MOQs, and NET payment terms for approved accounts.',
              },
              {
                icon: '🏭',
                title: 'Co-packing',
                body: 'Our FDA-approved Santa Fe Springs facility prepares candy mixes to your specifications. You buy the candy, we pack it — finished bags ready for sale.',
              },
              {
                icon: '🏷️',
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
                  <div style={{ fontSize: 28, marginBottom: 16 }}>{icon}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)', marginBottom: 10 }}>{title}</h3>
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

      {/* ══ PRICING ════════════════════════════════════════════ */}
      <section id="pricing" style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
        <div className="section-px content-max" style={{ paddingTop: 'clamp(48px, 8vw, 88px)', paddingBottom: 'clamp(48px, 8vw, 88px)' }}>
          <SectionHeader
            eyebrow="Pricing"
            title="Direct pricing beats Faire every time"
            subtitle="No platform fees. No 15–25% commission. Start at $300 MOQ and keep more margin."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {tiers.map((tier, i) => (
              <ScrollReveal key={tier.name} delay={i * 100}>
              <div
                className="tier-card"
                style={{
                  background: tier.dark
                    ? 'linear-gradient(160deg, #2D0B18 0%, #1A0A0E 100%)'
                    : 'var(--bg-card)',
                  border: tier.dark
                    ? '1px solid rgba(215,201,184,0.15)'
                    : '1px solid var(--border)',
                  borderTop: tier.featured
                    ? '3px solid var(--accent)'
                    : tier.dark
                    ? '3px solid var(--sand)'
                    : '1px solid var(--border)',
                  borderRadius: 10,
                  padding: '32px 28px',
                  position: 'relative',
                  boxShadow: tier.featured
                    ? 'var(--shadow-md)'
                    : tier.dark
                    ? '0 8px 40px rgba(45,11,24,0.5), inset 0 1px 0 rgba(215,201,184,0.08)'
                    : 'var(--shadow-xs)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Subtle radial shine in top-right corner for Enterprise card */}
                {tier.dark && (
                  <div style={{
                    position: 'absolute', top: 0, right: 0,
                    width: 180, height: 180, borderRadius: '0 10px 0 0',
                    background: 'radial-gradient(circle at top right, rgba(215,201,184,0.07) 0%, transparent 70%)',
                    pointerEvents: 'none',
                  }} />
                )}

                {/* Tier badge — "Faire alternative", "Most popular", "High volume" */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                  <p style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: tier.dark ? 'rgba(255,255,255,0.4)' : 'var(--text-tertiary)',
                  }}>
                    {tier.name}
                  </p>
                  <span style={{
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    padding: '3px 9px',
                    borderRadius: 20,
                    // Featured = accent fill, Dark = sand fill, default = outlined
                    background: tier.featured
                      ? 'var(--accent)'
                      : tier.dark
                      ? 'rgba(215,201,184,0.15)'
                      : 'transparent',
                    color: tier.featured
                      ? '#fff'
                      : tier.dark
                      ? 'var(--sand)'
                      : 'var(--text-tertiary)',
                    border: tier.featured
                      ? 'none'
                      : tier.dark
                      ? '1px solid rgba(215,201,184,0.25)'
                      : '1px solid var(--border)',
                  }}>
                    {tier.tag}
                  </span>
                </div>

                {/* MOQ — split $ and number for visual clarity */}
                <div style={{ display: 'inline-flex', alignItems: 'baseline', marginBottom: 4 }}>
                  <span className="price-currency" style={{
                    paddingTop: 7,
                    fontSize: 15,
                    color: tier.dark ? 'rgba(255,255,255,0.3)' : 'var(--text-tertiary)',
                  }}>$</span>
                  <span className="price-num display" style={{
                    fontSize: 52,
                    lineHeight: 1,
                    color: tier.featured
                      ? 'var(--accent)'
                      : tier.dark
                      ? '#FFFFFF'
                      : 'var(--text)',
                  }}>
                    {tier.moq.replace('$', '').replace('+', '').replace(',', '')}
                  </span>
                  {tier.moq.includes('+') && (
                    <span style={{
                      fontSize: 26,
                      fontWeight: 600,
                      lineHeight: 1,
                      marginLeft: 2,
                      color: tier.dark ? 'rgba(255,255,255,0.3)' : 'var(--text-tertiary)',
                    }}>+</span>
                  )}
                </div>

                {/* Uppercase MOQ label */}
                <p style={{
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: tier.dark ? 'rgba(255,255,255,0.3)' : 'var(--text-tertiary)',
                  marginBottom: 12,
                }}>
                  Minimum order
                </p>

                {/* Desc — ideal customer type */}
                <p style={{
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: tier.dark ? 'rgba(255,255,255,0.5)' : 'var(--text-secondary)',
                  paddingBottom: 20,
                  marginBottom: 20,
                  borderBottom: `1px solid ${tier.dark ? 'rgba(255,255,255,0.08)' : 'var(--border-light)'}`,
                }}>
                  {tier.desc}
                </p>

                {/* Feature list */}
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 11, marginBottom: 28, flex: 1 }}>
                  {tier.features.map((f) => (
                    <li key={f} style={{ fontSize: 13, display: 'flex', alignItems: 'flex-start', gap: 10,
                      color: tier.dark ? 'rgba(255,255,255,0.65)' : 'var(--text-secondary)',
                    }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                        <circle cx="7" cy="7" r="6.5"
                          stroke={tier.dark ? 'var(--sand)' : 'var(--accent)'}
                          strokeOpacity={tier.dark ? '0.4' : '0.3'}
                        />
                        <path d="M4.5 7l1.8 1.8L9.5 5.5"
                          stroke={tier.dark ? 'var(--sand)' : 'var(--accent)'}
                          strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"
                        />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA — Preferred = btn-primary, Enterprise = btn-white, Starter = btn-secondary */}
                <Link
                  href={tier.href}
                  className={tier.featured ? 'btn-primary' : tier.dark ? 'btn-white' : 'btn-secondary'}
                  style={{ display: 'block', textAlign: 'center', padding: '13px', fontWeight: 600, letterSpacing: '0.02em' }}
                >
                  {tier.cta} →
                </Link>
              </div>
              </ScrollReveal>
            ))}
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

      {/* ══ FAIRE CALLOUT ════════════════════════════════════════ */}
      <section style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>
        <div className="section-px content-max" style={{ paddingTop: 40, paddingBottom: 40 }}>
          <ScrollReveal>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16, background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderLeft: '3px solid var(--sand)', borderRadius: 8, padding: '20px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>🏪</span>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 3 }}>Prefer to order via Faire?</p>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Get 50% off and free shipping on your first Faire order.</p>
                </div>
              </div>
              <Link href="https://www.faire.com/direct/swedishcandystoreus" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', textDecoration: 'none', flexShrink: 0 }}>
                Order on Faire →
              </Link>
            </div>
          </ScrollReveal>
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
            Apply for a wholesale account and get access to 500+ SKUs at competitive pricing.
          </p>
          <div className="cta-buttons" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 12 }}>
            <Link href="/apply" className="btn-white" style={{ padding: '14px 34px', fontSize: 14 }}>
              Apply for wholesale account
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
