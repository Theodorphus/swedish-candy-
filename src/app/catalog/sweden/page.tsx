import Link from 'next/link'
import CatalogSearch from '@/components/CatalogSearch'
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
            <p className="eyebrow" style={{ marginBottom: 8 }}>Swedish Warehouse — Sweden</p>
            <h1
              style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: '-0.02em',
                marginBottom: 6,
              }}
            >
              Swedish Catalog
            </h1>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              Full assortment &middot; Broadest selection &middot;{' '}
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
            <Link
              href="/catalog/usa"
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: 'var(--text-secondary)',
                padding: '8px 18px',
                borderRadius: 5,
                textDecoration: 'none',
              }}
            >
              USA
            </Link>
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
              Sweden
            </span>
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="section-px content-max" style={{ paddingTop: 48, paddingBottom: 48 }}>
        <CatalogSearch products={products} />
      </div>

      {/* USA upsell */}
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
              Need faster US delivery?
            </p>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              Our Chicago warehouse ships domestically in 3&ndash;5 days from a core assortment.
            </p>
          </div>
          <Link href="/catalog/usa" className="btn-secondary" style={{ fontSize: 13 }}>
            View USA catalog &rarr;
          </Link>
        </div>
      </div>
    </div>
  )
}
