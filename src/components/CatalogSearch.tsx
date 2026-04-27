'use client'

import { useState, useMemo } from 'react'
import ProductCard from './ProductCard'
import type { ShopifyProduct } from '@/lib/shopify'

export default function CatalogSearch({ products }: { products: ShopifyProduct[] }) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return products
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.productType.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    )
  }, [query, products])

  return (
    <div>
      {/* Search bar */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ position: 'relative', maxWidth: 400 }}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }}
          >
            <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.4" />
            <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            placeholder="Search products, brands, types…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="input"
            style={{ paddingLeft: 38 }}
          />
        </div>
      </div>

      {/* Results count */}
      {query && (
        <p style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 20 }}>
          {filtered.length} {filtered.length === 1 ? 'product' : 'products'} found
        </p>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-secondary)' }}>
          <div style={{ fontSize: 40, marginBottom: 16, opacity: 0.3 }}>🍬</div>
          <p style={{ fontSize: 15, fontWeight: 500, marginBottom: 8 }}>No products found</p>
          <p style={{ fontSize: 13 }}>Try a different search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}
