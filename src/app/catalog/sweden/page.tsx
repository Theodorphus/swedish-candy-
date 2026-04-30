import Link from 'next/link'
import CatalogSearch from '@/components/CatalogSearch'
import MarketToggle from '@/components/MarketToggle'
import { getProducts, getProductsByTag } from '@/lib/shopify'

export const metadata = {
  title: 'Swedish Catalog — SwedenSweet',
  description: 'Shop our full Swedish candy assortment from our warehouse in Sweden. Broadest selection available.',
}

export default async function SwedenCatalogPage() {
  let products = await getProductsByTag('sweden-warehouse')
  if (products.length === 0) {
    products = await getProducts(50)
  }

  return (
    <div>
      {/* Header */}
      <div className="section-px" style={{ paddingTop: 48, paddingBottom: 40, borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
        <div className="content-max" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16 }}>
          <div>
            <p className="eyebrow" style={{ marginBottom: 10 }}>Swedish Warehouse — Full assortment</p>
            <h1 className="display" style={{ fontSize: 'clamp(24px, 3.5vw, 34px)', marginBottom: 8 }}>
              Swedish Catalog
            </h1>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              Broadest selection · 500+ SKUs ·{' '}
              <strong style={{ color: 'var(--text)' }}>{products.length}</strong> products
            </p>
          </div>

          <MarketToggle active="sweden" />
        </div>
      </div>

      {/* Product grid */}
      <div className="section-px content-max" style={{ paddingTop: 48, paddingBottom: 48 }}>
        <CatalogSearch products={products} />
      </div>

      {/* Bottom banners */}
      <div className="section-px content-max" style={{ paddingBottom: 72, display: 'flex', flexDirection: 'column', gap: 12 }}>

        {/* USA upsell */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderLeft: '3px solid var(--accent)', borderRadius: 8, padding: '24px 28px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>Need faster US delivery?</p>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              Our Chicago warehouse ships domestically in 3–5 days from a core assortment.
            </p>
          </div>
          <Link href="/catalog/usa" className="btn-secondary" style={{ fontSize: 13, flexShrink: 0 }}>
            View USA catalog →
          </Link>
        </div>

        {/* Faire callout */}
        <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderLeft: '3px solid var(--sand)', borderRadius: 8, padding: '20px 28px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 20 }}>🏪</span>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>Prefer to order via Faire?</p>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Get 50% off and free shipping on your first Faire order.</p>
            </div>
          </div>
          <span style={{ fontSize: 12, color: 'var(--text-tertiary)', fontStyle: 'italic' }}>Available on Faire</span>
        </div>

      </div>
    </div>
  )
}
