import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import SectionHeader from '@/components/SectionHeader'
import BrandSection from '@/components/BrandSection'
import FAQAccordion from '@/components/FAQAccordion'
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
  const newArrivals = productList.slice(0, 4)

  return (
    <div style={{ background: 'var(--bg)' }}>
      {/* ══ HERO ════════════════════════════════════════════ */}
      <section style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="section-px content-max" style={{ paddingTop: 80, paddingBottom: 72 }}>
          <p className="eyebrow" style={{ marginBottom: 28 }}>B2B Wholesale · USA Market</p>

          <h1
            className="display"
            style={{
              fontSize: 'clamp(40px, 6vw, 68px)',
              maxWidth: 780,
              marginBottom: 28,
              color: 'var(--text)',
            }}
          >
            The complete source of<br />
            Swedish candy{' '}
            <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>
              for wholesale buyers.
            </em>
          </h1>

          <p
            style={{
              fontSize: 16,
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              maxWidth: 460,
              marginBottom: 48,
            }}
          >
            500+ SKUs from BUBS, Fazer, Marabou and Cloetta — delivered to
            your US shelves in 3–5 days from our Chicago warehouse.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <Link href="/catalog/usa" className="btn-primary" style={{ padding: '14px 32px', fontSize: 14 }}>
              Browse USA catalog
            </Link>
            <Link href="/apply" className="btn-secondary" style={{ padding: '14px 32px', fontSize: 14 }}>
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
              borderRight: i < 3 ? '1px solid var(--border)' : 'none',
              borderBottom: i < 2 ? '1px solid var(--border)' : 'none',
            }}
          >
            <div className="display" style={{ fontSize: 26, color: 'var(--accent)', marginBottom: 5 }}>
              {s.value}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-tertiary)', letterSpacing: 0.3 }}>
              {s.label}
            </div>
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

          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-px"
            style={{
              background: 'var(--border)',
              borderRadius: 8,
              overflow: 'hidden',
              border: '1px solid var(--border)',
            }}
          >
            {collectionList.map(
              (cat: { title?: string; name?: string; emoji?: string; productsCount?: { count: number } }, i: number) => (
                <Link key={i} href="/catalog/usa" style={{ textDecoration: 'none' }}>
                  <div className="category-cell">
                    {cat.emoji && (
                      <div style={{ fontSize: 22, marginBottom: 10 }}>{cat.emoji}</div>
                    )}
                    <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--text)', marginBottom: 3 }}>
                      {cat.title ?? cat.name}
                    </p>
                    <p style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
                      {cat.productsCount ? `${cat.productsCount.count} products` : 'Explore →'}
                    </p>
                  </div>
                </Link>
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
              {featuredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ NEW ARRIVALS ════════════════════════════════════════ */}
      {newArrivals.length > 0 && (
        <section style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="section-px content-max" style={{ paddingTop: 88, paddingBottom: 88 }}>
            <SectionHeader
              eyebrow="New Arrivals"
              title="Just in"
              subtitle="Fresh additions to the SwedenSweet lineup."
              link={{ label: 'See all new products', href: '/catalog/usa' }}
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {newArrivals.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ BRANDS ════════════════════════════════════════════ */}
      <section style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
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
            <div
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                padding: '36px 32px',
              }}
            >
              <p className="eyebrow-muted" style={{ marginBottom: 12 }}>🇺🇸 USA Warehouse</p>
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

            {/* Sweden */}
            <div
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                padding: '36px 32px',
              }}
            >
              <p className="eyebrow-muted" style={{ marginBottom: 12 }}>🇸🇪 Swedish Warehouse</p>
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
            {tiers.map((tier) => (
              <div
                key={tier.name}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderTop: tier.featured ? '3px solid var(--gold)' : '1px solid var(--border)',
                  borderRadius: 8,
                  padding: tier.featured ? '30px 28px 32px' : '32px 28px',
                  position: 'relative',
                }}
              >
                {tier.featured && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      background: 'var(--gold)',
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

                <div className="display" style={{ fontSize: 38, color: 'var(--text)', marginBottom: 4 }}>
                  {tier.moq}
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
                      <span
                        style={{
                          marginTop: 5,
                          width: 4,
                          height: 4,
                          borderRadius: '50%',
                          background: 'var(--text-tertiary)',
                          flexShrink: 0,
                          display: 'inline-block',
                        }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={tier.href}
                  className="btn-primary"
                  style={{ display: 'block', textAlign: 'center', padding: '11px' }}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY US ══════════════════════════════════════════════ */}
      <section style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="section-px content-max" style={{ paddingTop: 88, paddingBottom: 88 }}>
          <SectionHeader eyebrow="Why SwedenSweet" title="Built for B2B" />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12" style={{ maxWidth: 880 }}>
            {[
              { n: '01', title: 'Fast fulfillment', body: 'Orders ship from our Chicago warehouse within 1–2 business days.' },
              { n: '02', title: 'Authentic brands', body: 'BUBS, Fazer, Marabou, Cloetta — directly sourced from Sweden.' },
              { n: '03', title: 'Individual pricing', body: 'Every account gets custom pricing based on your order volume.' },
            ].map(({ n, title, body }) => (
              <div key={n}>
                <p
                  className="display"
                  style={{ fontSize: 12, color: 'var(--text-tertiary)', fontStyle: 'italic', marginBottom: 18 }}
                >
                  {n}
                </p>
                <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 10 }}>{title}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.75 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ ═════════════════════════════════════════════════ */}
      <section style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
        <div className="section-px content-max" style={{ paddingTop: 88, paddingBottom: 88 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <SectionHeader
                eyebrow="FAQ"
                title="Common questions"
                subtitle="Everything you need to know about wholesaling Swedish candy with us."
              />
              <div style={{ marginTop: 32 }}>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 28 }}>
                  Can't find your answer? We're happy to help.
                </p>
                <Link href="/contact" className="btn-secondary" style={{ fontSize: 13 }}>
                  Contact us →
                </Link>
              </div>
            </div>
            <FAQAccordion />
          </div>
        </div>
      </section>

      {/* ══ CTA BAND ════════════════════════════════════════════ */}
      <section style={{ borderBottom: '1px solid var(--border)' }}>
        <div
          className="section-px content-max"
          style={{ paddingTop: 96, paddingBottom: 96, textAlign: 'center' }}
        >
          <p className="eyebrow" style={{ marginBottom: 24 }}>Get started</p>
          <h2
            className="display"
            style={{ fontSize: 'clamp(28px, 4.5vw, 48px)', maxWidth: 520, margin: '0 auto 16px', color: 'var(--text)' }}
          >
            Ready to stock Swedish candy?
          </h2>
          <p
            style={{
              fontSize: 15,
              color: 'var(--text-secondary)',
              maxWidth: 360,
              margin: '0 auto 48px',
              lineHeight: 1.8,
            }}
          >
            Apply for a wholesale account and get access to 500+ SKUs at competitive pricing.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 12 }}>
            <Link href="/apply" className="btn-primary" style={{ padding: '14px 34px', fontSize: 14 }}>
              Apply for wholesale account
            </Link>
            <Link href="/contact" className="btn-secondary" style={{ padding: '14px 34px', fontSize: 14 }}>
              Talk to sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
