import Link from 'next/link'
import CatalogSearch from '@/components/CatalogSearch'
import { getProducts, getProductsByTag } from '@/lib/shopify'

export const metadata = {
  title: 'USA Catalog — SwedenSweet',
  description: 'Shop Swedish candy from our Chicago warehouse. Fast domestic shipping across the USA.',
}

export default async function UsaCatalogPage() {
  let products = await getProductsByTag('usa-warehouse')
  if (products.length === 0) {
    products = await getProducts(50)
  }

  return (
    <div>
      {/* Header */}
      <div
        className="section-px"
        style={{
          paddingTop: 40,
          paddingBottom: 40,
          borderBottom: '1px solid var(--border)',
          background: 'var(--bg-secondary)',
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="eyebrow" style={{ marginBottom: 8 }}>USA Warehouse — Chicago, IL</p>
            <h1
              style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: '-0.02em',
                marginBottom: 6,
              }}
            >
              USA Catalog
            </h1>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              Core assortment &middot; Fast domestic shipping &middot;{' '}
              <strong style={{ color: 'var(--text)' }}>{products.length}</strong> products
            </p>
          </div>

          {/* Warehouse toggle */}
          <div
            className="flex self-start sm:self-auto"
            style={{
              gap: 4,
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              padding: 4,
            }}
          >
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                padding: '8px 18px',
                borderRadius: 5,
                background: 'var(--accent)',
                color: '#fff',
              }}
            >
              USA
            </span>
            <Link
              href="/catalog/sweden"
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: 'var(--text-secondary)',
                padding: '8px 18px',
                borderRadius: 5,
                textDecoration: 'none',
              }}
            >
              Sweden
            </Link>
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="section-px content-max" style={{ paddingTop: 48, paddingBottom: 48 }}>
        <CatalogSearch products={products} />
      </div>

      {/* Sweden upsell */}
      <div className="section-px content-max" style={{ paddingBottom: 64 }}>
        <div
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            padding: '28px 32px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>
              Looking for a wider selection?
            </p>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              Our Swedish warehouse carries the full assortment — more products, more variety.
            </p>
          </div>
          <Link href="/catalog/sweden" className="btn-secondary" style={{ fontSize: 13 }}>
            View Swedish catalog &rarr;
          </Link>
        </div>
      </div>
    </div>
  )
}
