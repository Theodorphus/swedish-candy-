import Link from 'next/link'
import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProductByHandle, getAllProductHandles } from '@/lib/shopify'
import VariantSelector from '@/components/VariantSelector'
import ProductGallery from '@/components/ProductGallery'
import BackToCatalog from '@/components/BackToCatalog'
import NotifyMe from '@/components/NotifyMe'

function truncateDescription(text: string, max = 160): string {
  if (text.length <= max) return text
  const cut = text.lastIndexOf(' ', max)
  return text.slice(0, cut > 0 ? cut : max) + '…'
}

export const revalidate = 300

export async function generateStaticParams() {
  const handles = await getAllProductHandles()
  return handles.map((handle) => ({ handle }))
}

export async function generateMetadata(
  props: { params: Promise<{ handle: string }> }
): Promise<Metadata> {
  const { handle } = await props.params
  const product = await getProductByHandle(handle)
  if (!product) return {}
  return {
    title: `${product.title} — SwedenSweet`,
    description: truncateDescription(product.description ?? ''),
    alternates: {
      canonical: `https://swedensweet.com/products/${handle}`,
    },
    openGraph: {
      title: `${product.title} — SwedenSweet`,
      description: truncateDescription(product.description ?? ''),
      images: product.featuredImage ? [{ url: product.featuredImage.url, width: 800, height: 800 }] : [{ url: '/OG2.png', width: 1200, height: 630 }],
    },
  }
}

export default async function ProductPage(props: { params: Promise<{ handle: string }> }) {
  const { handle } = await props.params
  const product = await getProductByHandle(handle)
  if (!product) notFound()

  const minPrice = parseFloat(product.priceRange.minVariantPrice.amount)
  const maxPrice = parseFloat(product.priceRange.maxVariantPrice.amount)

  const currency = product.priceRange.minVariantPrice.currencyCode
  const offerBase = {
    availability: product.availableForSale
      ? 'https://schema.org/InStock'
      : 'https://schema.org/OutOfStock',
    seller: { '@type': 'Organization', name: 'Sweden Sweet Corporation' },
  }
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description || undefined,
    image: product.featuredImage?.url,
    brand: product.vendor ? { '@type': 'Brand', name: product.vendor } : undefined,
    offers: minPrice === maxPrice
      ? { '@type': 'Offer', priceCurrency: currency, price: minPrice.toFixed(2), ...offerBase }
      : {
          '@type': 'AggregateOffer',
          priceCurrency: currency,
          lowPrice: minPrice.toFixed(2),
          highPrice: maxPrice.toFixed(2),
          ...offerBase,
        },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://swedensweet.com' },
      { '@type': 'ListItem', position: 2, name: 'Catalog', item: 'https://swedensweet.com/catalog/usa' },
      { '@type': 'ListItem', position: 3, name: product.title, item: `https://swedensweet.com/products/${handle}` },
    ],
  }
  const priceDisplay =
    minPrice === maxPrice
      ? minPrice.toFixed(2)
      : `${minPrice.toFixed(2)} – ${maxPrice.toFixed(2)}`

  const galleryImages = product.images.length > 0
    ? product.images
    : product.featuredImage ? [product.featuredImage] : []

  // Only show vendor if it's a real brand (not the store URL)
  const vendorIsStore = !product.vendor ||
    product.vendor.toLowerCase().includes('.store') ||
    product.vendor.toLowerCase().includes('.com') ||
    product.vendor.toLowerCase() === 'swedensweet'
  const showVendor = !vendorIsStore

  return (
    <div className="bg-[var(--bg)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="section-px content-max" style={{ paddingTop: 40, paddingBottom: 80 }}>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2" style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 40, flexWrap: 'wrap', overflowWrap: 'anywhere' }}>
          <Link href="/" style={{ color: 'var(--text-tertiary)', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link href="/catalog/usa" style={{ color: 'var(--text-tertiary)', textDecoration: 'none' }}>Catalog</Link>
          <span>/</span>
          <span style={{ color: 'var(--text-secondary)' }}>{product.title}</span>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 items-start">

          {/* ── Left: Image gallery ── */}
          <ProductGallery images={galleryImages} title={product.title} />

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
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 3, flexWrap: 'wrap', overflowWrap: 'anywhere' }}>
                <span style={{ fontSize: 'clamp(14px, 3vw, 18px)', fontWeight: 600, color: 'var(--text-secondary)', lineHeight: 1 }}>$</span>
                <span
                  style={{
                    fontFamily: 'var(--font-playfair), Georgia, serif',
                    fontSize: 'clamp(28px, 7vw, 42px)',
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

            {/* Notify me (out of stock) */}
            {product.variants.every(v => !v.availableForSale) && (
              <div style={{ marginBottom: 20 }}>
                <NotifyMe productTitle={product.title} productHandle={product.handle} />
              </div>
            )}

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

            {/* Description */}
            {product.descriptionHtml && (
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24 }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 16 }}>
                  Product details
                </p>
                <div
                  style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8 }}
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml
                    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                    .replace(/<iframe\b[^>]*>.*?<\/iframe>/gi, '')
                    .replace(/<(?:object|embed|form)\b[^>]*>.*?<\/(?:object|embed|form)>/gi, '')
                    .replace(/\bon\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
                    .replace(/javascript\s*:/gi, '') }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Back */}
        <div style={{ marginTop: 64, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
          <Suspense fallback={<Link href="/catalog/usa" style={{ fontSize: 13, color: 'var(--text-secondary)', textDecoration: 'none' }}>← Back to catalog</Link>}>
            <BackToCatalog />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
