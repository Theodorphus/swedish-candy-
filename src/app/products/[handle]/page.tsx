import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProductByHandle, getAllProductHandles } from '@/lib/shopify'
import VariantSelector from '@/components/VariantSelector'

export const revalidate = 3600

export async function generateStaticParams() {
  const handles = await getAllProductHandles()
  return handles.map((handle) => ({ handle }))
}

export async function generateMetadata(
  props: PageProps<'/products/[handle]'>
): Promise<Metadata> {
  const { handle } = await props.params
  const product = await getProductByHandle(handle)
  if (!product) return {}
  return {
    title: `${product.title} — SwedenSweet`,
    description: product.description.slice(0, 160),
  }
}

export default async function ProductPage(props: PageProps<'/products/[handle]'>) {
  const { handle } = await props.params
  const product = await getProductByHandle(handle)
  if (!product) notFound()

  const minPrice = parseFloat(product.priceRange.minVariantPrice.amount)
  const maxPrice = parseFloat(product.priceRange.maxVariantPrice.amount)
  const priceDisplay =
    minPrice === maxPrice
      ? minPrice.toFixed(2)
      : `${minPrice.toFixed(2)} – $${maxPrice.toFixed(2)}`

  const mainImage = product.images[0] ?? product.featuredImage

  // Only show vendor if it's a real brand (not the store URL)
  const vendorIsStore = !product.vendor ||
    product.vendor.toLowerCase().includes('.store') ||
    product.vendor.toLowerCase().includes('.com') ||
    product.vendor.toLowerCase() === 'swedensweet'
  const showVendor = !vendorIsStore

  return (
    <div className="bg-[var(--bg)]">
      <div className="section-px content-max" style={{ paddingTop: 40, paddingBottom: 80 }}>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2" style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 40 }}>
          <Link href="/" style={{ color: 'var(--text-tertiary)', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link href="/catalog/usa" style={{ color: 'var(--text-tertiary)', textDecoration: 'none' }}>Catalog</Link>
          <span>/</span>
          <span style={{ color: 'var(--text-secondary)' }}>{product.title}</span>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 items-start">

          {/* ── Left: Image ── */}
          <div style={{ position: 'sticky', top: 100 }}>
            <div
              style={{
                position: 'relative',
                aspectRatio: '1',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                overflow: 'hidden',
              }}
            >
              {mainImage ? (
                <Image
                  src={mainImage.url}
                  alt={mainImage.altText ?? product.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full" style={{ fontSize: 80, opacity: 0.1 }}>
                  🍬
                </div>
              )}
            </div>

            {/* Thumbnail strip */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto" style={{ marginTop: 10 }}>
                {product.images.slice(0, 6).map((img, i) => (
                  <div
                    key={i}
                    style={{
                      position: 'relative',
                      width: 68,
                      height: 68,
                      borderRadius: 6,
                      overflow: 'hidden',
                      border: `1.5px solid ${i === 0 ? 'var(--accent)' : 'var(--border)'}`,
                      flexShrink: 0,
                      background: 'var(--bg-secondary)',
                    }}
                  >
                    <Image src={img.url} alt={img.altText ?? ''} fill className="object-cover" sizes="68px" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Right: Details ── */}
          <div>
            {/* Brand badge */}
            {showVendor && (
              <p className="eyebrow-muted" style={{ marginBottom: 10 }}>{product.vendor}</p>
            )}
            {product.productType && (
              <p className="eyebrow" style={{ marginBottom: 10 }}>{product.productType}</p>
            )}

            <h1
              style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: 'clamp(22px, 3.5vw, 32px)',
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                color: 'var(--text)',
                marginBottom: 28,
              }}
            >
              {product.title}
            </h1>

            {/* Price */}
            <div style={{ marginBottom: 28, paddingBottom: 28, borderBottom: '1px solid var(--border)' }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 8 }}>
                Price per case
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
                <span style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-secondary)', lineHeight: 1 }}>$</span>
                <span
                  style={{
                    fontFamily: 'var(--font-playfair), Georgia, serif',
                    fontSize: 42,
                    fontWeight: 700,
                    color: 'var(--accent)',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {priceDisplay}
                </span>
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 6 }}>
                Excl. shipping &middot; USD
              </p>
            </div>

            {/* Variant selector + CTAs */}
            <div style={{ marginBottom: 24 }}>
              <VariantSelector variants={product.variants} />
            </div>

            <Link
              href={`/contact?product=${encodeURIComponent(product.title)}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
                fontSize: 13,
                fontWeight: 500,
                padding: '12px 24px',
                borderRadius: 6,
                textDecoration: 'none',
                marginBottom: 20,
              }}
            >
              Request a quote
            </Link>

            {/* MOQ notice */}
            <div
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: 6,
                padding: '14px 18px',
                marginBottom: 28,
              }}
            >
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                <strong style={{ color: 'var(--text)', fontWeight: 600 }}>$300 minimum order</strong> across all items.
                NET-15 available after 3 orders.{' '}
                <Link href="/contact" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
                  Contact us for volume pricing.
                </Link>
              </p>
            </div>

            {/* Description */}
            {product.descriptionHtml && (
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24 }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 16 }}>
                  Product details
                </p>
                <div
                  style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8 }}
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Back */}
        <div style={{ marginTop: 64, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
          <Link href="/catalog/usa" style={{ fontSize: 13, color: 'var(--text-secondary)', textDecoration: 'none' }}>
            &larr; Back to catalog
          </Link>
        </div>
      </div>
    </div>
  )
}
