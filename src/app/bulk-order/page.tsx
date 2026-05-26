import { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getProductsWithVariants } from '@/lib/shopify'
import BulkOrder from '@/components/BulkOrder'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Bulk Order — SwedenSweet',
  description: 'Place large wholesale orders fast. Browse all products, enter quantities, and add everything to cart in one click.',
  alternates: { canonical: 'https://swedensweet.com/bulk-order' },
}

export default async function BulkOrderPage() {
  const allProducts = await getProductsWithVariants(250)
  const products = allProducts.filter((p) => p.availableForSale)

  return (
    <div style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <div className="section-px" style={{ paddingTop: 48, paddingBottom: 40, borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
        <div className="content-max">
          <p className="eyebrow" style={{ marginBottom: 10 }}>Fast ordering</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16 }}>
            <div>
              <h1 className="display" style={{ fontSize: 'clamp(24px, 3.5vw, 34px)', marginBottom: 8 }}>
                Bulk order
              </h1>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                Enter quantities next to each product and add everything to cart at once.{' '}
                <strong style={{ color: 'var(--text)' }}>{products.length}</strong> products available.
              </p>
            </div>
            <Link href="/catalog/usa" style={{ fontSize: 13, color: 'var(--text-secondary)', textDecoration: 'none', border: '1px solid var(--border)', borderRadius: 6, padding: '8px 14px', whiteSpace: 'nowrap' }}>
              ← Back to catalog
            </Link>
          </div>
        </div>
      </div>

      {/* Bulk order table */}
      <div className="section-px content-max" style={{ paddingTop: 40, paddingBottom: 80 }}>
        <Suspense fallback={null}>
          <BulkOrder products={products} />
        </Suspense>
      </div>
    </div>
  )
}
