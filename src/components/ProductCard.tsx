import Image from 'next/image'
import Link from 'next/link'
import type { ShopifyProduct } from '@/lib/shopify'

export default function ProductCard({ product }: { product: ShopifyProduct }) {
  const price = parseFloat(product.priceRange.minVariantPrice.amount)
  const [whole, dec] = price.toFixed(2).split('.')
  const vendorIsStore = !product.vendor ||
    product.vendor.toLowerCase().includes('.store') ||
    product.vendor.toLowerCase().includes('.com') ||
    product.vendor.toLowerCase() === 'swedensweet'

  return (
    <Link href={`/products/${product.handle}`} className="product-card group">
      {/* Image */}
      <div className="relative aspect-square bg-[var(--bg-secondary)] overflow-hidden">
        {product.featuredImage ? (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText ?? product.title}
            fill
            className="product-card-img object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-4xl opacity-15">
            🍬
          </div>
        )}
        <div className="product-card-view absolute inset-x-0 bottom-0 bg-[var(--accent)] text-white text-[11px] font-semibold tracking-wide text-center py-2.5">
          View product →
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '14px 16px 16px', borderTop: '1px solid var(--border)' }}>
        {!vendorIsStore && (
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1.8px', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 5 }}>
            {product.vendor}
          </p>
        )}

        <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)', lineHeight: 1.4, marginBottom: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {product.title}
        </p>

        <div className="product-card-price-row" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid var(--border-light)', gap: 8 }}>
          <div>
            <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 4 }}>
              Per case
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'baseline' }}>
              <span className="price-currency">$</span>
              <span className="price-num" style={{ fontSize: 22, fontWeight: 700, color: 'var(--accent)', lineHeight: 1 }}>{whole}</span>
              <span className="price-dec">.{dec}</span>
            </div>
          </div>
          {product.productType && (
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '1.4px', textTransform: 'uppercase', color: 'var(--text-tertiary)', background: 'var(--bg-secondary)', border: '1px solid var(--border)', padding: '3px 7px', borderRadius: 3 }}>
              {product.productType}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
