import Image from 'next/image'
import Link from 'next/link'
import Nav from '@/components/Nav'
import { getProducts, getProductsByTag, type ShopifyProduct } from '@/lib/shopify'

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
      <Nav />

      {/* Warehouse header */}
      <div className="section-px" style={{ paddingTop: 32, paddingBottom: 32, borderBottom: '0.5px solid var(--border)', background: 'var(--bg-secondary)' }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 6 }}>
              🇺🇸 USA Warehouse — Chicago, IL
            </div>
            <h1 style={{ fontSize: 24, fontWeight: 500 }}>USA Catalog</h1>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
              Core assortment · Fast domestic shipping · {products.length} products
            </p>
          </div>

          {/* Warehouse toggle */}
          <div className="flex self-start sm:self-auto" style={{ gap: 8, background: 'var(--bg)', border: '0.5px solid var(--border)', borderRadius: 8, padding: 4 }}>
            <span style={{ fontSize: 13, fontWeight: 500, padding: '7px 16px', borderRadius: 6, background: 'var(--accent)', color: '#fff' }}>
              🇺🇸 USA
            </span>
            <Link href="/catalog/sweden" style={{ fontSize: 13, color: 'var(--text-secondary)', padding: '7px 16px', borderRadius: 6, textDecoration: 'none' }}>
              🇸🇪 Sweden
            </Link>
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="section-px" style={{ paddingTop: 40, paddingBottom: 40 }}>
        {products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-secondary)' }}>
            <p style={{ fontSize: 15 }}>No products found.</p>
            <p style={{ fontSize: 13, marginTop: 8 }}>Products will appear here once added to the USA warehouse catalog.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {products.map((p: ShopifyProduct) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>

      {/* Sweden upsell banner */}
      <div className="section-px flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" style={{ marginBottom: 48, background: 'var(--bg-secondary)', border: '0.5px solid var(--border)', borderRadius: 12, padding: '28px 32px', marginLeft: 40, marginRight: 40 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>🇸🇪 Vill du ha ett bredare sortiment?</div>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
            Handla från vårt svenska lager — fler produkter och ett fullständigt sortiment.
          </p>
        </div>
        <Link href="/catalog/sweden" style={{ background: 'var(--accent)', color: '#fff', padding: '10px 22px', borderRadius: 6, fontSize: 13, fontWeight: 500, textDecoration: 'none', flexShrink: 0, whiteSpace: 'nowrap' }}>
          Visa svenska lagret →
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
