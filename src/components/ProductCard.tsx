import Image from 'next/image'
import Link from 'next/link'
import type { ShopifyProduct } from '@/lib/shopify'

export default function ProductCard({ product }: { product: ShopifyProduct }) {
  const price = parseFloat(product.priceRange.minVariantPrice.amount)
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

        {/* View product overlay */}
        <div className="product-card-view absolute inset-x-0 bottom-0 bg-[var(--accent)] text-white text-[11px] font-semibold tracking-wide text-center py-2.5">
          View product →
        </div>
      </div>

      {/* Info */}
      <div className="p-4 border-t border-[var(--border)]">
        {!vendorIsStore && (
          <p className="text-[10px] font-bold tracking-[1.8px] uppercase text-[var(--text-tertiary)] mb-1.5">
            {product.vendor}
          </p>
        )}

        <p className="text-[13px] font-medium text-[var(--text)] leading-snug mb-3 line-clamp-2">
          {product.title}
        </p>

        <div className="flex items-end justify-between pt-3 border-t border-[var(--border-light)]">
          <div>
            <p className="text-[10px] text-[var(--text-tertiary)] mb-0.5">Per case</p>
            <p className="font-playfair text-xl font-bold text-[var(--accent)] leading-none">
              ${price.toFixed(2)}
            </p>
          </div>
          {product.productType && (
            <span className="text-[9px] font-bold tracking-[1.4px] uppercase text-[var(--text-tertiary)] bg-[var(--bg-secondary)] border border-[var(--border)] px-2 py-1">
              {product.productType}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
