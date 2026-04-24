import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import { getProductByHandle, getAllProductHandles } from '@/lib/shopify'

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
  const priceDisplay = minPrice === maxPrice
    ? `$${minPrice.toFixed(2)}`
    : `$${minPrice.toFixed(2)} – $${maxPrice.toFixed(2)}`

  const mainImage = product.images[0] ?? product.featuredImage

  return (
    <div>
      <Nav />

      <div className="section-px" style={{ paddingTop: 32, paddingBottom: 48, maxWidth: 1100, margin: '0 auto' }}>
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5" style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 36 }}>
          <Link href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link href="/catalog" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Catalog</Link>
          <span>/</span>
          <span style={{ color: 'var(--text)' }}>{product.title}</span>
        </div>

        {/* Main layout — image on top on mobile, side-by-side on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">

          {/* Image column */}
          <div>
            <div style={{ position: 'relative', aspectRatio: '1', background: 'var(--bg-secondary)', borderRadius: 12, overflow: 'hidden', border: '0.5px solid var(--border)' }}>
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
                <div className="flex items-center justify-center w-full h-full" style={{ fontSize: 80 }}>
                  🍬
                </div>
              )}
            </div>

            {/* Thumbnail strip */}
            {product.images.length > 1 && (
              <div className="flex gap-2 mt-2.5 overflow-x-auto">
                {product.images.slice(0, 5).map((img, i) => (
                  <div key={i} style={{ position: 'relative', width: 72, height: 72, borderRadius: 8, overflow: 'hidden', border: `1px solid ${i === 0 ? 'var(--accent)' : 'var(--border)'}`, flexShrink: 0, background: 'var(--bg-secondary)' }}>
                    <Image src={img.url} alt={img.altText ?? ''} fill style={{ objectFit: 'cover' }} sizes="72px" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details column */}
          <div>
            {/* Vendor + type */}
            <div className="flex flex-wrap gap-2 mb-3.5">
              {product.vendor && (
                <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--text-secondary)', background: 'var(--bg-secondary)', border: '0.5px solid var(--border)', padding: '3px 10px', borderRadius: 6 }}>
                  {product.vendor}
                </span>
              )}
              {product.productType && (
                <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--accent)', background: '#FAECE7', padding: '3px 10px', borderRadius: 6 }}>
                  {product.productType}
                </span>
              )}
            </div>

            <h1 style={{ fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: 500, lineHeight: 1.2, marginBottom: 16 }}>{product.title}</h1>

            {/* Price */}
            <div style={{ fontSize: 32, fontWeight: 500, color: 'var(--accent)', marginBottom: 8 }}>
              {priceDisplay}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 28 }}>
              Wholesale price · USD · Excl. shipping
            </div>

            {/* Variants */}
            {hasVariants && (
              <div style={{ marginBottom: 28, padding: '20px 0', borderTop: '0.5px solid var(--border)', borderBottom: '0.5px solid var(--border)' }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 12 }}>
                  AVAILABLE VARIANTS
                </div>
                <div className="flex flex-col gap-2">
                  {product.variants.map((v) => (
                    <div key={v.id} className="flex items-center justify-between" style={{ padding: '10px 14px', background: 'var(--bg-secondary)', borderRadius: 8, border: '0.5px solid var(--border)' }}>
                      <span style={{ fontSize: 13, color: v.availableForSale ? 'var(--text)' : 'var(--text-secondary)' }}>
                        {v.title}
                        {!v.availableForSale && <span style={{ fontSize: 11, color: 'var(--text-secondary)', marginLeft: 8 }}>(out of stock)</span>}
                      </span>
                      <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--accent)' }}>
                        ${parseFloat(v.price.amount).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {product.descriptionHtml && (
              <div
                style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 32 }}
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />
            )}

            {/* CTAs */}
            <div className="flex flex-col gap-2.5">
              <Link href="/apply" style={{
                display: 'block', textAlign: 'center', background: 'var(--accent)', color: '#fff',
                padding: '13px 24px', borderRadius: 8, fontSize: 14, fontWeight: 500, textDecoration: 'none',
              }}>
                Apply to order wholesale
              </Link>
              <Link href="/contact" style={{
                display: 'block', textAlign: 'center', background: 'transparent', color: 'var(--text)',
                border: '0.5px solid var(--border)', padding: '13px 24px', borderRadius: 8, fontSize: 14, textDecoration: 'none',
              }}>
                Ask about this product
              </Link>
            </div>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-7">
                {product.tags.map((tag) => (
                  <span key={tag} style={{ fontSize: 11, color: 'var(--text-secondary)', background: 'var(--bg-secondary)', border: '0.5px solid var(--border)', padding: '3px 10px', borderRadius: 20 }}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Back link */}
        <div style={{ marginTop: 64, paddingTop: 32, borderTop: '0.5px solid var(--border)' }}>
          <Link href="/catalog" style={{ fontSize: 13, color: 'var(--text-secondary)', textDecoration: 'none' }}>
            ← Back to catalog
          </Link>
        </div>
      </div>
    </div>
  )
}
