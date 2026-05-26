import Image from 'next/image'
import Link from 'next/link'
import type { ShopifyProduct } from '@/lib/shopify'

export default function ProductCard({ product, market = 'usa', priority = false }: { product: ShopifyProduct; market?: 'usa' | 'sweden'; priority?: boolean }) {
  const price = parseFloat(product.priceRange.minVariantPrice.amount) || 0
  const [whole, dec = '00'] = price.toFixed(2).split('.')
  const vendorIsStore = !product.vendor ||
    product.vendor.toLowerCase().includes('.store') ||
    product.vendor.toLowerCase().includes('.com') ||
    product.vendor.toLowerCase() === 'swedensweet'

  const productHref = `/products/${product.handle}?from=${market}`

  return (
    <article className="product-card group" style={{ position: 'relative' }}>
      {/* Image — wrapped in primary product link */}
      <Link
        href={productHref}
        aria-label={product.title}
        style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
      >
        <div className="relative aspect-square bg-[var(--bg-secondary)] overflow-hidden">
          {product.featuredImage ? (
            <Image
              src={product.featuredImage.url}
              alt={product.featuredImage.altText ?? product.title}
              fill
              className="product-card-img object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={priority}
            />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: 48, fontWeight: 700, color: 'var(--sand)', background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)' }}>
              S
            </div>
          )}
          {!product.availableForSale && (
            <div style={{ position: 'absolute', top: 8, left: 8, background: 'rgba(26,10,14,0.78)', color: '#fff', fontSize: 9, fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', padding: '4px 9px', borderRadius: 8 }}>
              Out of stock
            </div>
          )}
          {product.productType && (
            <span style={{ position: 'absolute', top: 8, right: 8, fontSize: 9, fontWeight: 700, letterSpacing: '1.4px', textTransform: 'uppercase', color: 'var(--text)', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(6px)', padding: '4px 9px', borderRadius: 8 }}>
              {product.productType}
            </span>
          )}
          <div className="product-card-view absolute inset-x-0 bottom-0 text-white text-[11px] font-semibold tracking-wide text-center py-3" style={{ background: 'linear-gradient(180deg, rgba(155,34,72,0) 0%, rgba(155,34,72,0.92) 60%, rgba(155,34,72,1) 100%)' }}>
            View product →
          </div>
        </div>
      </Link>

      {/* Info */}
      <div style={{ padding: '14px 16px 16px', borderTop: '1px solid var(--border)' }}>
        {!vendorIsStore && (
          <Link
            href={`/brands/${encodeURIComponent(product.vendor)}`}
            style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1.8px', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 5, textDecoration: 'none', display: 'block' }}
          >
            {product.vendor}
          </Link>
        )}

        <Link href={productHref} style={{ textDecoration: 'none', color: 'inherit' }}>
          <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)', lineHeight: 1.4, marginBottom: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {product.title}
          </p>
        </Link>

        <div className="product-card-price-row" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid var(--border-light)', gap: 8 }}>
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1.6px', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 4 }}>
              Per case
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: 1 }}>
              <span className="price-num" style={{ fontSize: 22, fontWeight: 700, color: 'var(--accent)', lineHeight: 1 }}>${whole}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', lineHeight: 1 }}>.{dec}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
