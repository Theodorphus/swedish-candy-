import Link from 'next/link'
import CatalogSearch from '@/components/CatalogSearch'
import MarketToggle from '@/components/MarketToggle'
import { getProducts, getProductsByTag } from '@/lib/shopify'

export const revalidate = 3600

export const metadata = {
  title: 'USA Wholesale Candy Catalog — SwedenSweet',
  description: 'Browse 300+ Swedish candy SKUs available from our Santa Fe Springs, CA warehouse. Fast 3–5 day domestic shipping. BUBS, Malaco, Matthijs, Vidal and more.',
  openGraph: {
    title: 'USA Wholesale Candy Catalog — SwedenSweet',
    description: 'Browse 300+ Swedish candy SKUs. Fast 3–5 day domestic shipping from Santa Fe Springs, CA. No customs, no FDA hassle.',
    images: [{ url: '/OG.png', width: 1200, height: 630 }],
  },
}

export default async function UsaCatalogPage() {
  let products = await getProductsByTag('usa-warehouse')
  if (products.length === 0) {
    products = await getProducts(50)
  }

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

          <MarketToggle active="usa" />
        </div>
      </div>

      {/* Product grid */}
      <div className="section-px content-max" style={{ paddingTop: 48, paddingBottom: 48 }}>
        <CatalogSearch products={products} />
      </div>

      {/* Bottom banners */}
      <div className="section-px content-max" style={{ paddingBottom: 72, display: 'flex', flexDirection: 'column', gap: 12 }}>

        {/* Sweden upsell */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderLeft: '3px solid var(--accent)', borderRadius: 8, padding: '24px 28px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>Looking for a wider selection?</p>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              Our Swedish warehouse carries 500+ SKUs — broader selection, same seamless import process.
            </p>
          </div>
          <Link href="/catalog/sweden" className="btn-secondary" style={{ fontSize: 13, flexShrink: 0 }}>
            View Swedish catalog →
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
          <Link href="https://www.faire.com/direct/swedishcandystoreus" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', textDecoration: 'none', flexShrink: 0 }}>
            Order on Faire →
          </Link>
        </div>

      </div>
    </div>
  )
}
