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
      ? `$${minPrice.toFixed(2)}`
      : `$${minPrice.toFixed(2)} – $${maxPrice.toFixed(2)}`

  const mainImage = product.images[0] ?? product.featuredImage
  const isAvailable = product.availableForSale

  // Parse useful tags
  const caseTag = product.tags.find((t) => t.toLowerCase().startsWith('case-'))
  const caseSize = caseTag ? caseTag.replace(/^case-/i, '') : null
  const weightTag = product.tags.find((t) => t.toLowerCase().startsWith('weight-'))
  const weight = weightTag ? weightTag.replace(/^weight-/i, '') : null

  return (
    <div className="bg-[var(--bg)]">
      <div className="section-px content-max" style={{ paddingTop: 40, paddingBottom: 80, maxWidth: 1200 }}>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[12px] text-[var(--text-tertiary)] mb-10">
          <Link href="/" className="no-underline text-[var(--text-tertiary)] hover:text-[var(--accent)] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/catalog/usa" className="no-underline text-[var(--text-tertiary)] hover:text-[var(--accent)] transition-colors">Catalog</Link>
          <span>/</span>
          <span className="text-[var(--text-secondary)]">{product.title}</span>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 items-start">

          {/* ── Left: Images ── */}
          <div className="sticky top-28">
            <div className="relative aspect-square bg-[var(--bg-secondary)] border border-[var(--border)] overflow-hidden">
              {mainImage ? (
                <Image
                  src={mainImage.url}
                  alt={mainImage.altText ?? product.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  style={{ opacity: isAvailable ? 1 : 0.5 }}
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-8xl opacity-15">🍬</div>
              )}
              {!isAvailable && (
                <div className="absolute top-3 left-3 bg-[var(--text)] text-white text-[9px] font-bold tracking-[1.5px] uppercase px-3 py-1.5">
                  Sold out
                </div>
              )}
            </div>

            {/* Thumbnail strip */}
            {product.images.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                {product.images.slice(0, 6).map((img, i) => (
                  <div
                    key={i}
                    className="relative shrink-0 bg-[var(--bg-secondary)] border overflow-hidden"
                    style={{
                      width: 72, height: 72,
                      borderColor: i === 0 ? 'var(--accent)' : 'var(--border)',
                    }}
                  >
                    <Image src={img.url} alt={img.altText ?? ''} fill className="object-cover" sizes="72px" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Right: Details ── */}
          <div>
            {/* Brand + type */}
            <div className="flex items-center gap-2 mb-3">
              {product.vendor && (
                <span className="text-[10px] font-bold tracking-[1.8px] uppercase text-[var(--text-tertiary)] border border-[var(--border)] px-2.5 py-1 bg-[var(--bg-secondary)]">
                  {product.vendor}
                </span>
              )}
              {product.productType && (
                <span className="text-[10px] font-bold tracking-[1.8px] uppercase text-[var(--accent)] border border-[var(--accent-light)] bg-[var(--accent-light)] px-2.5 py-1">
                  {product.productType}
                </span>
              )}
            </div>

            <h1 className="font-playfair text-[clamp(24px,3.5vw,34px)] font-bold leading-tight mb-6 text-[var(--text)]">
              {product.title}
            </h1>

            {/* Specs grid */}
            <div className="grid grid-cols-2 gap-px border border-[var(--border)] mb-6 bg-[var(--border)]">
              <div className="bg-[var(--bg)] p-4">
                <p className="text-[10px] font-bold tracking-[1.5px] uppercase text-[var(--text-tertiary)] mb-1">Price per case</p>
                <p className="font-playfair text-3xl font-bold text-[var(--accent)] leading-none">{priceDisplay}</p>
                <p className="text-[11px] text-[var(--text-tertiary)] mt-1">Excl. shipping</p>
              </div>
              <div className="bg-[var(--bg)] p-4">
                <p className="text-[10px] font-bold tracking-[1.5px] uppercase text-[var(--text-tertiary)] mb-1">Availability</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-green-500' : 'bg-red-400'}`} />
                  <span className="text-[13px] font-medium text-[var(--text)]">
                    {isAvailable ? 'In stock' : 'Out of stock'}
                  </span>
                </div>
              </div>
              {caseSize && (
                <div className="bg-[var(--bg)] p-4">
                  <p className="text-[10px] font-bold tracking-[1.5px] uppercase text-[var(--text-tertiary)] mb-1">Case size</p>
                  <p className="text-[14px] font-medium text-[var(--text)]">{caseSize}</p>
                </div>
              )}
              {weight && (
                <div className="bg-[var(--bg)] p-4">
                  <p className="text-[10px] font-bold tracking-[1.5px] uppercase text-[var(--text-tertiary)] mb-1">Weight</p>
                  <p className="text-[14px] font-medium text-[var(--text)]">{weight}</p>
                </div>
              )}
            </div>

            {/* Warehouse info */}
            <div className="flex gap-3 mb-6">
              <div className="flex-1 border border-[var(--border)] p-3 bg-[var(--bg-secondary)]">
                <p className="text-[11px] font-bold tracking-[1.2px] uppercase text-[var(--text-tertiary)] mb-1">🇺🇸 USA Warehouse</p>
                <p className="text-[12px] text-[var(--text-secondary)]">Chicago · 3–5 day delivery</p>
              </div>
              <div className="flex-1 border border-[var(--border)] p-3 bg-[var(--bg-secondary)]">
                <p className="text-[11px] font-bold tracking-[1.2px] uppercase text-[var(--text-tertiary)] mb-1">🇸🇪 Sweden Warehouse</p>
                <p className="text-[12px] text-[var(--text-secondary)]">Full 500+ SKU range</p>
              </div>
            </div>

            {/* Variant selector + CTAs */}
            <div className="flex flex-col gap-3 mb-8">
              <VariantSelector variants={product.variants} />
              <Link
                href={`/contact?product=${encodeURIComponent(product.title)}`}
                className="flex items-center justify-center gap-2 border border-[var(--accent)] text-[var(--accent)] text-[13px] font-semibold py-3.5 px-6 hover:bg-[var(--accent-light)] transition-colors no-underline"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M14 10c0 .6-.6 1-1 1H4l-3 3V3c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
                </svg>
                Request a quote
              </Link>
            </div>

            {/* MOQ notice */}
            <div className="border border-[var(--sand)] bg-[var(--accent-soft)] p-4 mb-8">
              <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">
                <strong className="text-[var(--text)]">Minimum order:</strong> $300 USD across all items.
                NET-15 terms available after 3 orders. Contact us for volume pricing.
              </p>
            </div>

            {/* Description / Ingredients */}
            {product.descriptionHtml && (
              <div className="border-t border-[var(--border)] pt-6">
                <p className="text-[10px] font-bold tracking-[1.8px] uppercase text-[var(--text-tertiary)] mb-4">
                  Product details
                </p>
                <div
                  className="text-[14px] text-[var(--text-secondary)] leading-relaxed prose-sm"
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                />
              </div>
            )}

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-6 pt-6 border-t border-[var(--border-light)]">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] text-[var(--text-tertiary)] bg-[var(--bg-secondary)] border border-[var(--border-light)] px-2.5 py-1 tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-[var(--border)]">
          <Link href="/catalog/usa" className="text-[13px] text-[var(--text-secondary)] no-underline hover:text-[var(--accent)] transition-colors">
            ← Back to catalog
          </Link>
        </div>
      </div>
    </div>
  )
}
