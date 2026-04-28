import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import SectionHeader from '@/components/SectionHeader'
import BrandSection from '@/components/BrandSection'
import FAQAccordion from '@/components/FAQAccordion'
import HeroVideo from '@/components/HeroVideo'
import ScrollReveal from '@/components/ScrollReveal'
import { getProducts, getCollections } from '@/lib/shopify'

const stats = [
  { value: '500+', label: 'Swedish SKUs' },
  { value: '$300', label: 'Minimum order' },
  { value: '3–5 days', label: 'USA delivery' },
  { value: '2', label: 'Warehouses' },
]

const fallbackCategories = [
  { name: 'Gummies & Sours',   emoji: '🐻' },
  { name: 'Chocolate',         emoji: '🍫' },
  { name: 'Licorice',          emoji: '🖤' },
  { name: 'Hard Candy',        emoji: '🍬' },
  { name: 'Chips & Snacks',    emoji: '🥨' },
  { name: 'Cookies & Wafers',  emoji: '🍪' },
  { name: 'Seasonal',          emoji: '🎄' },
  { name: 'Mixed Assortments', emoji: '🧁' },
]

const tiers = [
  {
    name: 'Starter',
    moq: '$300',
    desc: 'For single-location retailers',
    features: ['Full catalog access', 'Standard wholesale pricing', 'NET-15 after 3 orders', 'Email support'],
    featured: false,
    cta: 'Apply now',
    href: '/apply',
  },
  {
    name: 'Preferred',
    moq: '$1,000',
    desc: 'For multi-location operators',
    features: ['10% below standard pricing', 'Dedicated account manager', 'NET-30 payment terms', 'Priority fulfillment'],
    featured: true,
    cta: 'Apply now',
    href: '/apply',
  },
  {
    name: 'Enterprise',
    moq: '$5,000+',
    desc: 'For chains and distributors',
    features: ['Maximum volume discounts', 'Private label options', 'NET-45 terms', 'Custom assortments'],
    featured: false,
    cta: 'Contact sales',
    href: '/contact',
  },
]

export default async function Home() {
  const [products, collections] = await Promise.allSettled([
    getProducts(8),
    getCollections(),
  ])
  const productList = products.status === 'fulfilled' ? products.value : []
  const collectionList =
    collections.status === 'fulfilled' && collections.value.length > 0
      ? collections.value
      : fallbackCategories

  const featuredProducts = productList.slice(0, 8)

  return (
    <div style={{ background: 'var(--bg)' }}>
      {/* ══ HERO ════════════════════════════════════════════ */}
      <section style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#1A0A0E', position: 'relative', overflow: 'hidden' }}>
        <HeroVideo />
        {/* Overlay — låter videon andas men håller texten läsbar */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(26,10,14,0.55) 0%, rgba(26,10,14,0.45) 100%)' }} />

        <div className="section-px content-max" style={{ paddingTop: 88, paddingBottom: 80, position: 'relative', zIndex: 1 }}>
          <p className="eyebrow" style={{ marginBottom: 28, color: 'rgba(255,255,255,0.45)' }}>B2B Wholesale · USA Market</p>

          <h1
            className="display"
            style={{
              fontSize: 'clamp(40px, 6vw, 68px)',
              maxWidth: 780,
              marginBottom: 28,
              color: '#FFFFFF',
            }}
          >
            The complete source of<br />
            Swedish candy{' '}
            <em style={{ color: 'var(--sand)', fontStyle: 'italic' }}>
              for wholesale buyers.
            </em>
          </h1>

          <p
            style={{
              fontSize: 16,
              color: 'rgba(255,255,255,0.62)',
              lineHeight: 1.8,
              maxWidth: 460,
              marginBottom: 48,
            }}
          >
            500+ SKUs from BUBS, Fazer, Marabou and Cloetta — delivered to
            your US shelves in 3–5 days from our Chicago warehouse.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <Link href="/catalog/usa" className="btn-white" style={{ padding: '14px 32px', fontSize: 14 }}>
              Browse USA catalog
            </Link>
            <Link href="/apply" className="btn-ghost" style={{ padding: '14px 32px', fontSize: 14 }}>
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
              paddingTop: 32,
              paddingBottom: 32,
              borderRight: i < 3 ? '1px solid var(--border)' : 'none',
              borderBottom: i < 2 ? '1px solid var(--border)' : 'none',
            }}
          >
            <ScrollReveal delay={i * 80}>
              <div className="display" style={{ fontSize: 34, color: 'var(--accent)', marginBottom: 4, letterSpacing: '-0.03em', lineHeight: 1 }}>
                {s.value}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-tertiary)', letterSpacing: 0.3 }}>
                {s.label}
              </div>
            </ScrollReveal>
          </div>
        ))}
      </section>

      {/* ══ CATEGORIES ════════════════════════════════════════ */}
      <section style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="section-px content-max" style={{ paddingTop: 88, paddingBottom: 88 }}>
          <SectionHeader
            eyebrow="Assortment"
            title="What we carry"
            subtitle="From beloved Swedish classics to seasonal exclusives — all stocked in our USA warehouse."
            link={{ label: 'Browse full catalog', href: '/catalog/usa' }}
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {collectionList.map(
              (cat: { title?: string; name?: string; emoji?: string; productsCount?: { count: number } }, i: number) => (
                <ScrollReveal key={i} delay={i * 60}>
                  <Link href="/catalog/usa" style={{ textDecoration: 'none' }}>
                    <div
                      className="category-cell"
                      style={{
                        border: '1px solid var(--border)',
                        borderTop: '3px solid var(--accent)',
                        borderRadius: 8,
                        minHeight: 100,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      {cat.emoji && (
                        <div style={{ fontSize: 30, marginBottom: 10 }}>{cat.emoji}</div>
                      )}
                      <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 4, lineHeight: 1.3 }}>
                        {cat.title ?? cat.name}
                      </p>
                      <p style={{ fontSize: 11, color: 'var(--text-tertiary)', letterSpacing: '0.05em' }}>
                        {cat.productsCount ? `${cat.productsCount.count} products` : 'Explore \u2192'}
                      </p>
                    </div>
                  </Link>
                </ScrollReveal>
              )
            )}
          </div>
        </div>
      </section>

      {/* ══ USA CATALOG ════════════════════════════════════════ */}
      {featuredProducts.length > 0 && (
        <section style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
          <div className="section-px content-max" style={{ paddingTop: 88, paddingBottom: 88 }}>
            <SectionHeader
              eyebrow="USA Catalog"
              title="Bestsellers"
              subtitle="Top-selling lines available from our Chicago warehouse."
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
        <div className="section-px content-max" style={{ paddingTop: 88, paddingBottom: 88 }}>
          <SectionHeader
            eyebrow="Brands"
            title="Direct from Sweden"
            subtitle="We source from every major Swedish confectionery brand — giving your customers the full experience."
          />
          <BrandSection />
        </div>
      </section>

      {/* ══ WAREHOUSES ════════════════════════════════════════ */}
      <section style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="section-px content-max" style={{ paddingTop: 88, paddingBottom: 88 }}>
          <SectionHeader eyebrow="Fulfillment" title="Two warehouses, one catalog" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5" style={{ maxWidth: 760 }}>
            {/* USA */}
            <ScrollReveal delay={0}>
            <div
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
                Chicago, IL
              </h3>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 28 }}>
                Core assortment. Domestic shipping in 3–5 business days.
              </p>
              <Link href="/catalog/usa" className="btn-primary" style={{ fontSize: 13, padding: '10px 22px' }}>
                Shop USA catalog →
              </Link>
            </div>
            </ScrollReveal>

            {/* Sweden */}
            <ScrollReveal delay={120}>
            <div
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

      {/* ══ PRICING ════════════════════════════════════════════ */}
      <section id="pricing" style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
        <div className="section-px content-max" style={{ paddingTop: 88, paddingBottom: 88 }}>
          <SectionHeader
            eyebrow="Pricing"
            title="Scales with your volume"
            subtitle="Start at $300 MOQ. Your tier upgrades automatically as your volume grows."
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {tiers.map((tier, i) => (
              <ScrollReveal key={tier.name} delay={i * 100}>
              <div
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderTop: tier.featured ? '3px solid var(--accent)' : '1px solid var(--border)',
                  borderRadius: 8,
                  padding: tier.featured ? '30px 28px 32px' : '32px 28px',
                  position: 'relative',
                  boxShadow: tier.featured ? 'var(--shadow-md)' : 'var(--shadow-xs)',
                }}
              >
                {tier.featured && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      background: 'var(--accent)',
                      color: '#FFFFFF',
                      fontSize: 9,
                      fontWeight: 700,
                      padding: '3px 10px',
                      borderRadius: 20,
                      letterSpacing: 1,
                      textTransform: 'uppercase',
                    }}
                  >
                    Most popular
                  </div>
                )}

                <p
                  className="eyebrow-muted"
                  style={{ marginBottom: 16 }}
                >
                  {tier.name}
                </p>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, marginBottom: 4 }}>
                  <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-tertiary)', lineHeight: 1 }}>$</span>
                  <span className="display" style={{ fontSize: 38, color: 'var(--text)', lineHeight: 1 }}>
                    {tier.moq.replace('$', '').replace('+', '')}
                  </span>
                  {tier.moq.includes('+') && (
                    <span style={{ fontSize: 20, fontWeight: 600, color: 'var(--text-tertiary)', lineHeight: 1 }}>+</span>
                  )}
                </div>
                <p style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 8 }}>
                  minimum order
                </p>
                <p
                  style={{
                    fontSize: 13,
                    color: 'var(--text-secondary)',
                    paddingBottom: 20,
                    marginBottom: 20,
                    borderBottom: '1px solid var(--border-light)',
                  }}
                >
                  {tier.desc}
                </p>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      style={{
                        fontSize: 13,
                        color: 'var(--text-secondary)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 10,
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                        <circle cx="7" cy="7" r="6.5" stroke="var(--accent)" strokeOpacity="0.3" />
                        <path d="M4.5 7l1.8 1.8L9.5 5.5" stroke="var(--accent)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={tier.href}
                  className={tier.featured ? 'btn-primary' : 'btn-secondary'}
                  style={{ display: 'block', textAlign: 'center', padding: '11px' }}
                >
                  {tier.cta}
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
        <div className="section-px content-max" style={{ paddingTop: 88, paddingBottom: 88 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 52, flexWrap: 'wrap', gap: 12, position: 'relative', zIndex: 1 }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: 12, color: 'rgba(255,255,255,0.4)' }}>Why SwedenSweet</p>
              <h2 className="display" style={{ fontSize: 'clamp(24px, 3vw, 36px)', color: '#FFFFFF' }}>Built for B2B</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12" style={{ maxWidth: 880, position: 'relative', zIndex: 1 }}>
            {[
              { n: '01', title: 'Fast fulfillment', body: 'Orders ship from our Chicago warehouse within 1–2 business days.' },
              { n: '02', title: 'Authentic brands', body: 'BUBS, Fazer, Marabou, Cloetta — directly sourced from Sweden.' },
              { n: '03', title: 'Individual pricing', body: 'Every account gets custom pricing based on your order volume.' },
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
        <div className="section-px content-max" style={{ paddingTop: 88, paddingBottom: 88 }}>
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
          style={{ paddingTop: 96, paddingBottom: 96, textAlign: 'center', position: 'relative', zIndex: 1 }}
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
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 12 }}>
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
