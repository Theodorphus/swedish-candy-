'use client'

import { useState, useTransition, useMemo } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { addManyToCart } from '@/app/cart/actions'
import type { ShopifyProduct } from '@/lib/shopify'

type BulkLine = {
  merchandiseId: string
  quantity: number
}

type ProductRow = ShopifyProduct & {
  variants: { id: string; title: string; availableForSale: boolean; price: { amount: string } }[]
}

export default function BulkOrder({ products }: { products: ProductRow[] }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [variantSelections, setVariantSelections] = useState<Record<string, string>>({})
  const [search, setSearch] = useState('')
  const [brand, setBrand] = useState('')
  const [added, setAdded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const brands = useMemo(() => {
    const set = new Set<string>()
    for (const p of products) {
      if (p.vendor && !p.vendor.toLowerCase().includes('.store') && !p.vendor.toLowerCase().includes('.com') && p.vendor.toLowerCase() !== 'swedensweet') {
        set.add(p.vendor)
      }
    }
    return Array.from(set).sort()
  }, [products])

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return products.filter((p) => {
      const matchesSearch = !q || p.title.toLowerCase().includes(q) || p.vendor?.toLowerCase().includes(q) || p.productType?.toLowerCase().includes(q)
      const matchesBrand = !brand || p.vendor === brand
      return matchesSearch && matchesBrand
    })
  }, [products, search, brand])

  function getSelectedVariantId(product: ProductRow): string {
    const explicit = variantSelections[product.id]
    if (explicit) return explicit
    const available = product.variants.find((v) => v.availableForSale)
    return available?.id ?? product.variants[0]?.id ?? ''
  }

  function setQty(productId: string, value: string) {
    const n = parseInt(value, 10)
    setQuantities((prev) => ({ ...prev, [productId]: isNaN(n) || n < 0 ? 0 : n }))
  }

  const lines: BulkLine[] = useMemo(() => {
    return products
      .filter((p) => (quantities[p.id] ?? 0) > 0)
      .map((p) => ({
        merchandiseId: getSelectedVariantId(p),
        quantity: quantities[p.id],
      }))
      .filter((l) => l.merchandiseId)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantities, variantSelections, products])

  const totalItems = lines.reduce((s, l) => s + l.quantity, 0)
  const totalPrice = lines.reduce((s, l) => {
    const p = products.find((pr) => getSelectedVariantId(pr) === l.merchandiseId)
    const variantPrice = p?.variants.find((v) => v.id === l.merchandiseId)?.price.amount
    const price = parseFloat(variantPrice ?? p?.priceRange.minVariantPrice.amount ?? '0')
    return s + price * l.quantity
  }, 0)

  function handleAddToCart() {
    if (lines.length === 0) return
    setError(null)
    startTransition(async () => {
      const result = await addManyToCart(lines)
      if (result.success) {
        setAdded(true)
        setTimeout(() => setAdded(false), 3000)
      } else {
        setError(result.error ?? 'Something went wrong.')
      }
    })
  }

  const inputStyle: React.CSSProperties = {
    width: 72,
    height: 36,
    textAlign: 'center',
    border: '1px solid var(--border)',
    borderRadius: 6,
    fontSize: 14,
    fontFamily: 'inherit',
    background: 'var(--bg)',
    color: 'var(--text)',
    outline: 'none',
  }

  const selectStyle: React.CSSProperties = {
    height: 36,
    padding: '0 28px 0 8px',
    fontSize: 12,
    color: 'var(--text)',
    background: 'var(--bg)',
    border: '1px solid var(--border)',
    borderRadius: 6,
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 12 12'%3E%3Cpath fill='%23888' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 8px center',
    cursor: 'pointer',
    minWidth: 0,
    maxWidth: 160,
  }

  return (
    <div>
      {/* Filters */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
        <div style={{ position: 'relative', flex: '1 1 200px', maxWidth: 360 }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)', pointerEvents: 'none' }}>
            <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.4" />
            <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input"
            style={{ paddingLeft: 32, height: 36, fontSize: 13, width: '100%' }}
          />
        </div>
        {brands.length > 0 && (
          <select value={brand} onChange={(e) => setBrand(e.target.value)} style={{ ...selectStyle, flex: '0 0 auto' }}>
            <option value="">All brands</option>
            {brands.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        )}
        {(search || brand) && (
          <button onClick={() => { setSearch(''); setBrand('') }} style={{ height: 36, padding: '0 12px', fontSize: 12, color: 'var(--text-secondary)', background: 'none', border: '1px solid var(--border)', borderRadius: 6, cursor: 'pointer' }}>
            Clear
          </button>
        )}
      </div>

      {/* Table */}
      <div style={{ border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 12, padding: '10px 16px', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', fontSize: 10, fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
          <span>Product</span>
          <span style={{ textAlign: 'right', minWidth: 80 }}>Price / case</span>
          <span style={{ textAlign: 'center', minWidth: 72 }}>Qty</span>
        </div>

        {filtered.length === 0 ? (
          <div style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: 14 }}>
            No products found.
          </div>
        ) : (
          <div>
            {filtered.map((product, i) => {
              const qty = quantities[product.id] ?? 0
              const selectedVariantId = getSelectedVariantId(product)
              const selectedVariant = product.variants.find((v) => v.id === selectedVariantId)
              const price = parseFloat(selectedVariant?.price.amount ?? product.priceRange.minVariantPrice.amount)
              const isActive = qty > 0
              const multiVariant = product.variants.length > 1
              const vendorIsStore = !product.vendor || product.vendor.toLowerCase().includes('.store') || product.vendor.toLowerCase().includes('.com') || product.vendor.toLowerCase() === 'swedensweet'

              return (
                <div
                  key={product.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto auto',
                    gap: 12,
                    alignItems: 'center',
                    padding: '12px 16px',
                    borderBottom: i < filtered.length - 1 ? '1px solid var(--border-light)' : 'none',
                    background: isActive ? 'rgba(155,34,72,0.03)' : 'transparent',
                    transition: 'background 150ms ease',
                  }}
                >
                  {/* Product info */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                    {product.featuredImage ? (
                      <div style={{ width: 44, height: 44, borderRadius: 6, overflow: 'hidden', flexShrink: 0, border: '1px solid var(--border)', background: 'var(--bg-secondary)', position: 'relative' }}>
                        <Image src={product.featuredImage.url} alt={product.featuredImage.altText ?? product.title} fill className="object-cover" sizes="44px" />
                      </div>
                    ) : (
                      <div style={{ width: 44, height: 44, borderRadius: 6, background: 'var(--bg-secondary)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 20, opacity: 0.3 }}>🍬</div>
                    )}
                    <div style={{ minWidth: 0 }}>
                      {!vendorIsStore && (
                        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1.4px', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 2 }}>{product.vendor}</p>
                      )}
                      <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)', lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{product.title}</p>
                      {multiVariant && (
                        <select
                          value={selectedVariantId}
                          onChange={(e) => setVariantSelections((prev) => ({ ...prev, [product.id]: e.target.value }))}
                          style={{ ...selectStyle, marginTop: 4, maxWidth: '100%' }}
                        >
                          {product.variants.map((v) => (
                            <option key={v.id} value={v.id} disabled={!v.availableForSale}>
                              {v.title}{!v.availableForSale ? ' (out of stock)' : ''}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>

                  {/* Price */}
                  <div style={{ textAlign: 'right', minWidth: 80 }}>
                    <span style={{ fontSize: 10, color: 'var(--text-tertiary)', marginRight: 1 }}>$</span>
                    <span style={{ fontSize: 15, fontWeight: 700, color: isActive ? 'var(--accent)' : 'var(--text)', fontFamily: 'var(--font-playfair), Georgia, serif' }}>{price.toFixed(2)}</span>
                  </div>

                  {/* Quantity input */}
                  <input
                    type="number"
                    min="0"
                    value={qty === 0 ? '' : qty}
                    placeholder="0"
                    onChange={(e) => setQty(product.id, e.target.value)}
                    style={{ ...inputStyle, borderColor: isActive ? 'var(--accent)' : 'var(--border)' }}
                    aria-label={`Quantity for ${product.title}`}
                  />
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Sticky footer */}
      <div style={{
        position: 'sticky',
        bottom: 0,
        marginTop: 16,
        background: '#fff',
        border: '1px solid var(--border)',
        borderRadius: 10,
        padding: '16px 20px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        boxShadow: '0 -4px 24px rgba(0,0,0,0.07)',
        zIndex: 10,
      }}>
        <div>
          {totalItems > 0 ? (
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>
                {totalItems} {totalItems === 1 ? 'case' : 'cases'} · <span style={{ color: 'var(--accent)' }}>${totalPrice.toFixed(2)}</span>
              </p>
              <p style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>Excl. shipping · USD</p>
            </div>
          ) : (
            <p style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>Enter quantities above to start your order.</p>
          )}
          {error && <p style={{ fontSize: 12, color: '#c0392b', marginTop: 4 }}>{error}</p>}
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {totalItems > 0 && (
            <button
              onClick={() => setQuantities({})}
              style={{ height: 40, padding: '0 16px', fontSize: 13, color: 'var(--text-secondary)', background: 'none', border: '1px solid var(--border)', borderRadius: 6, cursor: 'pointer' }}
            >
              Clear all
            </button>
          )}
          <button
            onClick={handleAddToCart}
            disabled={lines.length === 0 || isPending}
            className="btn-primary"
            style={{ height: 40, padding: '0 24px', fontSize: 13, opacity: lines.length === 0 ? 0.4 : 1, cursor: lines.length === 0 ? 'not-allowed' : 'pointer' }}
          >
            {isPending ? 'Adding…' : added ? '✓ Added to cart' : `Add ${totalItems > 0 ? totalItems + ' cases' : ''} to cart`}
          </button>
          {added && (
            <button
              onClick={() => router.push('/cart')}
              className="btn-secondary"
              style={{ height: 40, padding: '0 16px', fontSize: 13 }}
            >
              View cart →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
