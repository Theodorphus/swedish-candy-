import Image from 'next/image'
import Link from 'next/link'
import type { ShopifyProduct } from '@/lib/shopify'

export default function ProductCard({ product }: { product: ShopifyProduct }) {
  const price = parseFloat(product.priceRange.minVariantPrice.amount)

  return (
    <Link href={`/products/${product.handle}`} className="product-card">
      {/* Image */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '1 / 1',
          background: 'var(--bg-secondary)',
          overflow: 'hidden',
        }}
      >
        {product.featuredImage ? (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText ?? product.title}
            fill
            className="product-card-img"
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div
            className="flex items-center justify-center w-full h-full"
            style={{ fontSize: 36, opacity: 0.18 }}
          >
            🍬
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '16px 18px 18px' }}>
        {product.productType && (
          <p className="eyebrow-muted" style={{ marginBottom: 6 }}>
            {product.productType}
          </p>
        )}
        <p
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: 'var(--text)',
            lineHeight: 1.45,
            marginBottom: 14,
          }}
        >
          {product.title}
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 12,
            borderTop: '1px solid var(--border-light)',
          }}
        >
          <span
            className="display"
            style={{ fontSize: 16, color: 'var(--accent)' }}
          >
            ${price.toFixed(2)}
          </span>
          <span
            style={{
              fontSize: 9,
              fontWeight: 700,
              color: 'var(--text-tertiary)',
              letterSpacing: 1.4,
              textTransform: 'uppercase',
            }}
          >
            Wholesale
          </span>
        </div>
      </div>
    </Link>
  )
}
