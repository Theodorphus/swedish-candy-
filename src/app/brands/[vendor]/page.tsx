import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProductsByVendor, getVendors } from '@/lib/shopify'
import ProductCard from '@/components/ProductCard'

export const revalidate = 3600

export async function generateStaticParams() {
  const vendors = await getVendors()
  return vendors.map((v) => ({ vendor: v }))
}

export async function generateMetadata({ params }: { params: Promise<{ vendor: string }> }): Promise<Metadata> {
  const { vendor } = await params
  const name = decodeURIComponent(vendor)
  return {
    title: `${name} — SwedenSweet`,
    description: `Browse all ${name} products available for wholesale through SwedenSweet.`,
  }
}

export default async function VendorPage({ params }: { params: Promise<{ vendor: string }> }) {
  const { vendor } = await params
  const name = decodeURIComponent(vendor)
  const products = await getProductsByVendor(name)

  if (products.length === 0) notFound()

  const inStock = products.filter((p) => p.availableForSale).length

  return (
    <div>
      {/* Header */}
      <div className="section-px" style={{ paddingTop: 48, paddingBottom: 40, borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
        <div className="content-max">
          <Link
            href="/brands"
            style={{ fontSize: 12, color: 'var(--text-tertiary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 16 }}
          >
            ← All brands
          </Link>
          <p className="eyebrow" style={{ marginBottom: 10 }}>Brand</p>
          <h1 className="display" style={{ fontSize: 'clamp(24px, 3.5vw, 34px)', marginBottom: 8 }}>
            {name}
          </h1>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
            <strong style={{ color: 'var(--text)' }}>{products.length}</strong> products
            {inStock < products.length && (
              <span> · <strong style={{ color: 'var(--text)' }}>{inStock}</strong> in stock</span>
            )}
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="section-px content-max" style={{ paddingTop: 48, paddingBottom: 80 }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  )
}
