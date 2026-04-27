import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
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
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: 1.8,
                textTransform: 'uppercase',
                color: 'var(--accent)',
                marginBottom: 8,
              }}
            >
              🇺🇸 USA Warehouse — Chicago, IL
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: 28,
                fontWeight: 600,
                marginBottom: 6,
              }}
            >
              USA Catalog
            </h1>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              Core assortment � Fast domestic shipping �{' '}
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
              borderRadius: 10,
              padding: 4,
            }}
          >
            <span
              style={{
                fontSize: 13,
                fontWeight: 500,
                padding: '8px 18px',
                borderRadius: 7,
                background: 'var(--accent)',
                color: '#fff',
              }}
            >
              🇺🇸 USA
            </span>
            <Link
              href="/catalog/sweden"
              style={{
                fontSize: 13,
                color: 'var(--text-secondary)',
                padding: '8px 18px',
                borderRadius: 7,
                textDecoration: 'none',
                transition: 'color var(--transition)',
              }}
            >
              🇸🇪 Sweden
            </Link>
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="section-px" style={{ paddingTop: 48, paddingBottom: 48 }}>
        {products.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '100px 0',
              color: 'var(--text-secondary)',
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.3 }}>🍬</div>
            <p style={{ fontSize: 15, fontWeight: 500, marginBottom: 8 }}>No products yet</p>
            <p style={{ fontSize: 13 }}>
              Products will appear here once added to the USA warehouse catalog.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>

      {/* Sweden upsell */}
      <div
        className="section-px"
        style={{ paddingBottom: 64 }}
      >
        <div
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: 14,
            padding: '28px 32px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>
              🇸🇪 Looking for a wider selection?
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              Our Swedish warehouse carries the full assortment — more products, more variety.
            </p>
          </div>
          <Link
            href="/catalog/sweden"
            style={{
              background: 'var(--accent)',
              color: '#fff',
              padding: '10px 22px',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 500,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            View Swedish catalog →
          </Link>
        </div>
      </div>
    </div>
  )
}
