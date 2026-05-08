import Link from 'next/link'
import type { Metadata } from 'next'
import { getVendors } from '@/lib/shopify'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Brands — SwedenSweet',
  description: 'Browse all Swedish and European candy brands available for wholesale through SwedenSweet.',
}

export default async function BrandsPage() {
  const vendors = await getVendors()

  return (
    <div>
      <div className="section-px" style={{ paddingTop: 48, paddingBottom: 40, borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
        <div className="content-max">
          <p className="eyebrow" style={{ marginBottom: 10 }}>Wholesale catalog</p>
          <h1 className="display" style={{ fontSize: 'clamp(24px, 3.5vw, 34px)', marginBottom: 8 }}>
            All brands
          </h1>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
            {vendors.length} brands available for wholesale
          </p>
        </div>
      </div>

      <div className="section-px content-max" style={{ paddingTop: 48, paddingBottom: 80 }}>
        {vendors.length === 0 ? (
          <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>No brands found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {vendors.map((vendor) => (
              <Link
                key={vendor}
                href={`/brands/${encodeURIComponent(vendor)}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 8,
                  padding: '18px 20px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  textDecoration: 'none',
                  transition: 'border-color 150ms',
                }}
                className="group"
              >
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{vendor}</span>
                <span style={{ fontSize: 18, color: 'var(--accent)', opacity: 0, transition: 'opacity 150ms' }} className="group-hover:opacity-100">→</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
