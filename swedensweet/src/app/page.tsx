import Link from 'next/link'
import Nav from '@/components/Nav'
import { getProducts, getCollections } from '@/lib/shopify'

const stats = [
  { value: '500+', label: 'Swedish SKUs' },
  { value: '$300', label: 'Minimum order' },
  { value: '3–5 days', label: 'Average delivery' },
  { value: '2 warehouses', label: 'USA & Sweden' },
]

const fallbackCategories = [
  { name: 'Gummies & sours', count: null },
  { name: 'Chocolate', count: null },
  { name: 'Licorice', count: null },
  { name: 'Hard candy', count: null },
  { name: 'Chips & snacks', count: null },
  { name: 'Cookies & wafers', count: null },
  { name: 'Seasonal', count: null },
  { name: 'Mixed assortments', count: null },
]

const tiers = [
  {
    name: 'Starter',
    moq: '$300 MOQ',
    sub: 'For single-location retailers',
    features: ['Full catalog access', 'Standard wholesale pricing', 'NET-15 after 3 orders', 'Email support'],
    featured: false,
    cta: 'Apply now',
  },
  {
    name: 'Preferred',
    moq: '$1,000 MOQ',
    sub: 'For multi-location operators',
    features: ['10% below standard pricing', 'Dedicated account manager', 'NET-30 payment terms', 'Priority fulfillment'],
    featured: true,
    cta: 'Apply now',
  },
  {
    name: 'Enterprise',
    moq: '$5,000+ MOQ',
    sub: 'For chains and distributors',
    features: ['Maximum volume discounts', 'Private label options', 'NET-45 terms', 'Custom assortments'],
    featured: false,
    cta: 'Contact sales',
  },
]

export default async function Home() {
  const [products, collections] = await Promise.allSettled([
    getProducts(6),
    getCollections(),
  ])

  const productList = products.status === 'fulfilled' ? products.value : []
  const collectionList = collections.status === 'fulfilled' && collections.value.length > 0
    ? collections.value
    : fallbackCategories

  return (
    <div>
      <Nav />

      {/* Hero */}
      <div className="section-px" style={{ paddingTop: 64, paddingBottom: 56, borderBottom: '0.5px solid var(--border)', maxWidth: 640 }}>
        <div style={{ display: 'inline-block', background: 'var(--bg-secondary)', border: '0.5px solid var(--border)', color: 'var(--text-secondary)', fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', padding: '4px 12px', borderRadius: 6, marginBottom: 20 }}>
          B2B Swedish Candy Wholesale — USA
        </div>
        <h1 style={{ fontSize: 'clamp(26px, 5vw, 36px)', fontWeight: 500, lineHeight: 1.2, marginBottom: 16 }}>
          Authentic Swedish candy,<br />delivered <span style={{ color: 'var(--accent)' }}>nationwide.</span>
        </h1>
        <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 28, maxWidth: 480 }}>
          SwedenSweet supplies retailers and hospitality groups with 500+ Swedish candy SKUs — BUBS, Fazer, Marabou, Cloetta and more — at competitive wholesale pricing.
        </p>
        <div className="flex flex-wrap gap-2.5">
          <Link href="/catalog" style={{ background: 'var(--accent)', color: '#fff', padding: '11px 24px', borderRadius: 6, fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>
            Browse catalog
          </Link>
          <a href="#pricing" style={{ background: 'transparent', color: 'var(--text)', border: '0.5px solid var(--border)', padding: '11px 24px', borderRadius: 6, fontSize: 14, textDecoration: 'none' }}>
            Request pricing
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4" style={{ borderBottom: '0.5px solid var(--border)' }}>
        {stats.map((s, i) => (
          <div key={i} className="section-px" style={{ paddingTop: 24, paddingBottom: 24, borderRight: i % 2 === 0 ? '0.5px solid var(--border)' : 'none', borderBottom: i < 2 ? '0.5px solid var(--border)' : 'none' }}>
            <div style={{ fontSize: 26, fontWeight: 500 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 3 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Warehouse selector */}
      <div className="section-px" style={{ paddingTop: 48, paddingBottom: 48, borderBottom: '0.5px solid var(--border)', background: 'var(--bg-secondary)' }}>
        <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 10 }}>
          Two warehouses
        </div>
        <div style={{ fontSize: 22, fontWeight: 500, marginBottom: 28 }}>Choose your warehouse</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" style={{ maxWidth: 700 }}>
          <div style={{ background: 'var(--bg)', border: '2px solid var(--accent)', borderRadius: 10, padding: '28px 24px' }}>
            <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 6 }}>🇺🇸 USA Warehouse</div>
            <div style={{ fontSize: 20, fontWeight: 500, marginBottom: 6 }}>Chicago, IL</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>Core assortment, fast domestic shipping</div>
            <Link href="/catalog/usa" style={{ display: 'inline-block', background: 'var(--accent)', color: '#fff', padding: '9px 20px', borderRadius: 6, fontSize: 13, fontWeight: 500, textDecoration: 'none' }}>
              Shop USA catalog →
            </Link>
          </div>
          <div style={{ background: 'var(--bg)', border: '0.5px solid var(--border)', borderRadius: 10, padding: '28px 24px' }}>
            <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 6 }}>🇸🇪 Swedish Warehouse</div>
            <div style={{ fontSize: 20, fontWeight: 500, marginBottom: 6 }}>Sweden</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>Full assortment, broader selection & pricing</div>
            <Link href="/catalog/sweden" style={{ display: 'inline-block', background: 'transparent', color: 'var(--text)', border: '0.5px solid var(--border)', padding: '9px 20px', borderRadius: 6, fontSize: 13, fontWeight: 500, textDecoration: 'none' }}>
              Shop Sweden catalog →
            </Link>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="section-px" style={{ paddingTop: 48, paddingBottom: 48, borderBottom: '0.5px solid var(--border)' }}>
        <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 10 }}>Categories</div>
        <div style={{ fontSize: 22, fontWeight: 500, marginBottom: 28 }}>What we carry</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {collectionList.map((cat: { title?: string; name?: string; productsCount?: { count: number }; count?: null }, i: number) => (
            <div key={i} style={{ background: 'var(--bg-secondary)', border: '0.5px solid var(--border-light)', borderRadius: 10, padding: '20px 16px' }}>
              <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 3 }}>{cat.title ?? cat.name}</div>
              {cat.productsCount && (
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{cat.productsCount.count} products</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Products */}
      {productList.length > 0 && (
        <div className="section-px" style={{ paddingTop: 48, paddingBottom: 48, borderBottom: '0.5px solid var(--border)' }}>
          <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 10 }}>Featured products</div>
          <div style={{ fontSize: 22, fontWeight: 500, marginBottom: 28 }}>Bestsellers</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {productList.map((p: { id: string; title: string; productType: string; priceRange: { minVariantPrice: { amount: string; currencyCode: string } } }) => (
              <div key={p.id} style={{ background: 'var(--bg)', border: '0.5px solid var(--border)', borderRadius: 10, padding: 20 }}>
                <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>{p.title}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 14 }}>{p.productType || 'Swedish candy'}</div>
                <div className="flex items-center justify-between" style={{ paddingTop: 12, borderTop: '0.5px solid var(--border)' }}>
                  <span style={{ fontSize: 16, fontWeight: 500, color: 'var(--accent)' }}>
                    ${parseFloat(p.priceRange.minVariantPrice.amount).toFixed(2)}
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--text-secondary)', background: 'var(--bg-secondary)', padding: '3px 9px', borderRadius: 6 }}>
                    Wholesale
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pricing tiers */}
      <div id="pricing" className="section-px" style={{ paddingTop: 48, paddingBottom: 48, borderBottom: '0.5px solid var(--border)' }}>
        <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 10 }}>Pricing tiers</div>
        <div style={{ fontSize: 22, fontWeight: 500, marginBottom: 28 }}>Scales with your volume</div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {tiers.map((tier) => (
            <div key={tier.name} style={{ background: 'var(--bg)', border: tier.featured ? '2px solid var(--accent)' : '0.5px solid var(--border)', borderRadius: 10, padding: 24 }}>
              {tier.featured && (
                <div style={{ display: 'inline-block', background: '#FAECE7', color: '#993C1D', fontSize: 11, fontWeight: 500, padding: '3px 10px', borderRadius: 6, marginBottom: 14 }}>
                  Most popular
                </div>
              )}
              <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 6 }}>{tier.name}</div>
              <div style={{ fontSize: 28, fontWeight: 500, marginBottom: 4 }}>{tier.moq}</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 20, paddingBottom: 20, borderBottom: '0.5px solid var(--border)' }}>{tier.sub}</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 22 }}>
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center" style={{ fontSize: 13, color: 'var(--text-secondary)', gap: 8 }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0, display: 'inline-block' }} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href={tier.cta === 'Contact sales' ? '/contact' : '/apply'} style={{
                display: 'block', width: '100%', padding: 10, borderRadius: 6, fontSize: 13, fontWeight: 500, textDecoration: 'none', textAlign: 'center',
                background: tier.featured ? 'var(--accent)' : 'transparent',
                color: tier.featured ? '#fff' : 'var(--text)',
                border: tier.featured ? 'none' : '0.5px solid var(--border)',
                boxSizing: 'border-box',
              }}>
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="section-px flex flex-col sm:flex-row items-center justify-between gap-4 py-8" style={{ borderTop: '0.5px solid var(--border)' }}>
        <span style={{ fontSize: 15, fontWeight: 500 }}>
          Sweden<span style={{ color: 'var(--accent)' }}>Sweet</span>
        </span>
        <div className="flex gap-6">
          {[
            { label: 'Catalog', href: '/catalog' },
            { label: 'Terms', href: '/terms' },
            { label: 'Contact', href: '/contact' },
          ].map((l) => (
            <Link key={l.label} href={l.href} style={{ fontSize: 13, color: 'var(--text-secondary)', textDecoration: 'none' }}>{l.label}</Link>
          ))}
        </div>
        <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>USA · Sweden</span>
      </footer>
    </div>
  )
}
