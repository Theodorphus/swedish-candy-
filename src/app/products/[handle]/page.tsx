import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProductByHandle, getAllProductHandles } from '@/lib/shopify'
import VariantSelector from '@/components/VariantSelector'

export const revalidate = 3600

export async function generateStaticParams() {
  const handles = await getAllProductHandles()
  return handles.map((handle) => ({ handle }))
}

export async function generateMetadata(props: PageProps<'/products/[handle]'>) {
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
  const hasVariants = product.variants.length > 1
  const priceDisplay =
    minPrice === maxPrice
      ? `$${minPrice.toFixed(2)}`
      : `$${minPrice.toFixed(2)} – $${maxPrice.toFixed(2)}`

  const mainImage = product.images[0] ?? product.featuredImage

  return (
    <div>
      <div
        className="section-px"
        style={{ paddingTop: 36, paddingBottom: 64, maxWidth: 1160, margin: '0 auto' }}
      >
        {/* Breadcrumb */}
        <div
          className="flex items-center gap-2"
          style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 40 }}
        >
          <Link href="/" style={{ color: 'var(--text-tertiary)', textDecoration: 'none' }}>
            Home
          </Link>
          <span>/</span>
          <Link href="/catalog" style={{ color: 'var(--text-tertiary)', textDecoration: 'none' }}>
            Catalog
          </Link>
          <span>/</span>
          <span style={{ color: 'var(--text-secondary)' }}>{product.title}</span>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-start">

          {/* ── Image column ── */}
          <div>
            <div
              style={{
                position: 'relative',
                aspectRatio: '1',
                background: 'var(--bg-secondary)',
                borderRadius: 16,
                overflow: 'hidden',
                border: '1px solid var(--border)',
              }}
            >
              {mainImage ? (
                <Image
                  src={mainImage.url}
                  alt={mainImage.altText ?? product.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div
                  className="flex items-center justify-center w-full h-full"
                  style={{ fontSize: 96, opacity: 0.2 }}
                >
                  🍬
                </div>
              )}
            </div>

            {/* Thumbnail strip */}
            {product.images.length > 1 && (
              <div className="flex gap-2.5 mt-3 overflow-x-auto pb-1">
                {product.images.slice(0, 6).map((img, i) => (
                  <div
                    key={i}
                    style={{
                      position: 'relative',
                      width: 76,
                      height: 76,
                      borderRadius: 10,
                      overflow: 'hidden',
                      border: `1.5px solid ${i === 0 ? 'var(--accent)' : 'var(--border)'}`,
                      flexShrink: 0,
                      background: 'var(--bg-secondary)',
                    }}
                  >
                    <Image
                      src={img.url}
                      alt={img.altText ?? ''}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="76px"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Details column ── */}
          <div>
            {/* Badges */}
            <div className="flex flex-wrap gap-2" style={{ marginBottom: 16 }}>
              {product.vendor && (
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: 0.8,
                    textTransform: 'uppercase',
                    color: 'var(--text-secondary)',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border)',
                    padding: '4px 12px',
                    borderRadius: 20,
                  }}
                >
                  {product.vendor}
                </span>
              )}
              {product.productType && (
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: 0.8,
                    textTransform: 'uppercase',
                    color: 'var(--accent)',
                    background: 'var(--accent-light)',
                    padding: '4px 12px',
                    borderRadius: 20,
                  }}
                >
                  {product.productType}
                </span>
              )}
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: 'clamp(24px, 3.5vw, 32px)',
                fontWeight: 700,
                lineHeight: 1.2,
                marginBottom: 20,
              }}
            >
              {product.title}
            </h1>

            {/* Price block */}
            <div
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                padding: '20px 22px',
                marginBottom: 28,
              }}
            >
              <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 4 }}>
                Wholesale price (USD)
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  fontSize: 38,
                  fontWeight: 700,
                  color: 'var(--accent)',
                  letterSpacing: '-0.5px',
                  lineHeight: 1,
                  marginBottom: 6,
                }}
              >
                {priceDisplay}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
                Excl. shipping · Minimum order $300
              </div>
            </div>


            {/* Description */}
            {product.descriptionHtml && (
              <div
                style={{
                  fontSize: 14,
                  color: 'var(--text-secondary)',
                  lineHeight: 1.8,
                  marginBottom: 32,
                  paddingBottom: 32,
                  borderBottom: '1px solid var(--border-light)',
                }}
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />
            )}

            {/* CTAs */}
            <div className="flex flex-col gap-3">
              <VariantSelector variants={product.variants} />
              <Link
                href="/contact"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  background: 'transparent',
                  color: 'var(--text)',
                  border: '1px solid var(--border)',
                  padding: '14px 24px',
                  borderRadius: 10,
                  fontSize: 14,
                  textDecoration: 'none',
                }}
              >
                Ask about this product
              </Link>
            </div>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5" style={{ marginTop: 24 }}>
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: 11,
                      color: 'var(--text-tertiary)',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-light)',
                      padding: '3px 10px',
                      borderRadius: 20,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Back link */}
        <div style={{ marginTop: 64, paddingTop: 32, borderTop: '1px solid var(--border)' }}>
          <Link
            href="/catalog"
            style={{ fontSize: 13, color: 'var(--text-secondary)', textDecoration: 'none' }}
          >
            ← Back to catalog
          </Link>
        </div>
      </div>
    </div>
  )
}
