import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import { getProducts, getProductsByTag } from '@/lib/shopify'

export const metadata = {
  title: 'Sweden Catalog � SwedenSweet',
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
              🇸🇪 Swedish Warehouse — Sweden
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: 28,
                fontWeight: 600,
                marginBottom: 6,
              }}
            >
              Swedish Catalog
            </h1>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              Full assortment � Broadest selection �{' '}
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
            <Link
              href="/catalog/usa"
              style={{
                fontSize: 13,
                color: 'var(--text-secondary)',
                padding: '8px 18px',
                borderRadius: 7,
                textDecoration: 'none',
                transition: 'color var(--transition)',
              }}
            >
              🇺🇸 USA
            </Link>
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
              🇸🇪 Sweden
            </span>
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
              Products will appear here once added to the Swedish warehouse catalog.
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

      {/* USA upsell */}
      <div className="section-px" style={{ paddingBottom: 64 }}>
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
              🇺🇸 Need faster US delivery?
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              Our Chicago warehouse ships domestically in 3–5 days from a core assortment.
            </p>
          </div>
          <Link
            href="/catalog/usa"
            style={{
              background: 'transparent',
              color: 'var(--text)',
              border: '1px solid var(--border)',
              padding: '10px 22px',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 500,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            View USA catalog →
          </Link>
        </div>
      </div>
    </div>
  )
}
