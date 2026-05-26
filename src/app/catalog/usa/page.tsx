import Link from 'next/link'
import { Suspense } from 'react'
import CatalogSearch from '@/components/CatalogSearch'
import MarketToggle from '@/components/MarketToggle'
import { getProducts } from '@/lib/shopify'



export const revalidate = 300

export const metadata = {
  title: 'USA Wholesale Candy Catalog — SwedenSweet',
  description: 'Browse 300+ Swedish candy SKUs available from our Santa Fe Springs, CA warehouse. Fast 3–5 day domestic shipping. BUBS, Malaco, Matthijs, Vidal and more.',
  alternates: { canonical: 'https://swedensweet.com/catalog/usa' },
  openGraph: {
    title: 'USA Wholesale Candy Catalog — SwedenSweet',
    description: 'Browse 300+ Swedish candy SKUs. Fast 3–5 day domestic shipping from Santa Fe Springs, CA. No customs, no FDA hassle.',
    images: [{ url: '/OG2.png', width: 1200, height: 630 }],
  },
}

export default async function UsaCatalogPage() {
  let products = await getProducts(250)
  products = products.filter((p) => p.availableForSale)

  return (
    <div>
      {/* Header */}
      <div className="section-px" style={{ paddingTop: 48, paddingBottom: 40, borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
        <div className="content-max" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16 }}>
          <div>
            <p className="eyebrow" style={{ marginBottom: 10 }}>Santa Fe Springs, CA — Ships in 3–5 days</p>
            <h1 className="display" style={{ fontSize: 'clamp(24px, 3.5vw, 34px)', marginBottom: 8 }}>
              USA Catalog
            </h1>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              Core assortment · Fast domestic shipping ·{' '}
              <strong style={{ color: 'var(--text)' }}>{products.length}</strong> products
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <Link
              href="/bulk-order"
              style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', textDecoration: 'none', border: '1px solid var(--accent)', borderRadius: 6, padding: '7px 14px', whiteSpace: 'nowrap', letterSpacing: '0.02em' }}
            >
              Bulk order →
            </Link>
            <MarketToggle active="usa" />
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="section-px content-max" style={{ paddingTop: 48, paddingBottom: 48 }}>
        <Suspense fallback={null}>
          <CatalogSearch products={products} />
        </Suspense>
      </div>

    </div>
  )
}
