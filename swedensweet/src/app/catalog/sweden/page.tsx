import Image from 'next/image'
import Link from 'next/link'
import Nav from '@/components/Nav'
import { getProducts, getProductsByTag, type ShopifyProduct } from '@/lib/shopify'

export const metadata = {
  title: 'Sweden Catalog — SwedenSweet',
  description: 'Shop our full Swedish candy assortment from our warehouse in Sweden. Broadest selection available.',
}

export default async function SwedenCatalogPage() {
  let products = await getProductsByTag('sweden-warehouse')
  if (products.length === 0) {
    products = await getProducts(50)
  }

  return (
    <div>
      <Nav />

      {/* Warehouse header */}
      <div className="section-px" style={{ paddingTop: 32, paddingBottom: 32, borderBottom: '0.5px solid var(--border)', background: 'var(--bg-secondary)' }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 6 }}>
              🇸🇪 Swedish Warehouse — Sweden
            </div>
            <h1 style={{ fontSize: 24, fontWeight: 500 }}>Swedish Catalog</h1>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
              Full assortment · Broader selection · {products.length} products
            </p>
          </div>

          {/* Warehouse toggle */}
          <div className="flex self-start sm:self-auto" style={{ gap: 8, background: 'var(--bg)', border: '0.5px solid var(--border)', borderRadius: 8, padding: 4 }}>
            <Link href="/catalog/usa" style={{ fontSize: 13, color: 'var(--text-secondary)', padding: '7px 16px', borderRadius: 6, textDecoration: 'none' }}>
              🇺🇸 USA
            </Link>
            <span style={{ fontSize: 13, fontWeight: 500, padding: '7px 16px', borderRadius: 6, background: 'var(--accent)', color: '#fff' }}>
              🇸🇪 Sweden
            </span>
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="section-px" style={{ paddingTop: 40, paddingBottom: 40 }}>
        {products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-secondary)' }}>
            <p style={{ fontSize: 15 }}>No products found.</p>
            <p style={{ fontSize: 13, marginTop: 8 }}>Products will appear here once added to the Swedish warehouse catalog.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {products.map((p: ShopifyProduct) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>

      {/* USA catalog note */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" style={{ margin: '0 40px 48px', background: 'var(--bg-secondary)', border: '0.5px solid var(--border)', borderRadius: 12, padding: '28px 32px' }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>🇺🇸 Prefer faster US shipping?</div>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
            Our Chicago warehouse ships domestically in 3–5 days from a core assortment.
          </p>
        </div>
        <Link href="/catalog/usa" style={{ background: 'transparent', color: 'var(--text)', border: '0.5px solid var(--border)', padding: '10px 22px', borderRadius: 6, fontSize: 13, fontWeight: 500, textDecoration: 'none', flexShrink: 0, whiteSpace: 'nowrap' }}>
          View USA catalog →
        </Link>
      </div>
    </div>
  )
}

function ProductCard({ product }: { product: ShopifyProduct }) {
  const price = parseFloat(product.priceRange.minVariantPrice.amount)

  return (
    <Link href={`/products/${product.handle}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{ background: 'var(--bg)', border: '0.5px solid var(--border)', borderRadius: 10, overflow: 'hidden', cursor: 'pointer' }}>
        <div style={{ position: 'relative', aspectRatio: '1', background: 'var(--bg-secondary)' }}>
          {product.featuredImage ? (
            <Image
              src={product.featuredImage.url}
              alt={product.featuredImage.altText ?? product.title}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <span style={{ fontSize: 36 }}>🍬</span>
            </div>
          )}
        </div>
        <div style={{ padding: '16px 16px 18px' }}>
          <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 3, lineHeight: 1.3 }}>{product.title}</div>
          {product.productType && (
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 12 }}>{product.productType}</div>
          )}
          <div className="flex items-center justify-between" style={{ paddingTop: 12, borderTop: '0.5px solid var(--border)' }}>
            <span style={{ fontSize: 16, fontWeight: 500, color: 'var(--accent)' }}>${price.toFixed(2)}</span>
            <span style={{ fontSize: 11, color: 'var(--text-secondary)', background: 'var(--bg-secondary)', padding: '3px 9px', borderRadius: 6 }}>Wholesale</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
