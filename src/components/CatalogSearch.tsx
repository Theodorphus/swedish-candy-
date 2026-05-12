'use client'

import React, { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import ProductCard from './ProductCard'
import type { ShopifyProduct } from '@/lib/shopify'

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc'

export default function CatalogSearch({ products, market = 'usa' }: { products: ShopifyProduct[]; market?: 'usa' | 'sweden' }) {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(() => searchParams.get('q') ?? '')
  const [brand, setBrand] = useState(() => searchParams.get('brand') ?? '')
  const [type, setType] = useState(() => searchParams.get('type') ?? '')
  const [sort, setSort] = useState<SortOption>('default')

  const brands = useMemo(() => {
    const set = new Set<string>()
    for (const p of products) {
      if (p.vendor && !p.vendor.toLowerCase().includes('.store') && !p.vendor.toLowerCase().includes('.com') && p.vendor.toLowerCase() !== 'swedensweet') {
        set.add(p.vendor)
      }
    }
    return Array.from(set).sort()
  }, [products])

  const types = useMemo(() => {
    const set = new Set<string>()
    for (const p of products) {
      if (p.productType) set.add(p.productType)
    }
    return Array.from(set).sort()
  }, [products])

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()

    let result = products.filter((p) => {
      const matchesQuery = !q || (
        p.title.toLowerCase().includes(q) ||
        (p.productType?.toLowerCase().includes(q) ?? false) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.vendor?.toLowerCase().includes(q)
      )
      const matchesBrand = !brand || p.vendor === brand
      const matchesType = !type || p.productType === type
      return matchesQuery && matchesBrand && matchesType
    })

    if (sort === 'price-asc') {
      result = [...result].sort((a, b) => parseFloat(a.priceRange.minVariantPrice.amount) - parseFloat(b.priceRange.minVariantPrice.amount))
    } else if (sort === 'price-desc') {
      result = [...result].sort((a, b) => parseFloat(b.priceRange.minVariantPrice.amount) - parseFloat(a.priceRange.minVariantPrice.amount))
    } else if (sort === 'name-asc') {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title))
    }

    return result
  }, [query, brand, type, sort, products])

  const hasFilters = query || brand || type || sort !== 'default'

  function clearFilters() {
    setQuery('')
    setBrand('')
    setType('')
    setSort('default')
  }

  const selectStyle: React.CSSProperties = {
    height: 40,
    padding: '0 32px 0 12px',
    fontSize: 13,
    color: 'var(--text)',
    background: 'var(--bg)',
    border: '1px solid var(--border)',
    borderRadius: 6,
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 10px center',
    cursor: 'pointer',
    minWidth: 0,
  }

  return (
    <div>
      {/* Controls row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24, alignItems: 'center' }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: '1 1 200px', maxWidth: 320 }}>
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)', pointerEvents: 'none' }}>
            <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.4" />
            <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search products, brands…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="input"
            style={{ paddingLeft: 34, height: 40, fontSize: 13 }}
          />
        </div>

        {/* Brand filter */}
        {brands.length > 0 && (
          <select value={brand} onChange={(e) => setBrand(e.target.value)} style={selectStyle}>
            <option value="">All brands</option>
            {brands.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        )}

        {/* Type filter */}
        {types.length > 0 && (
          <select value={type} onChange={(e) => setType(e.target.value)} style={selectStyle}>
            <option value="">All types</option>
            {types.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        )}

        {/* Sort */}
        <select value={sort} onChange={(e) => setSort(e.target.value as SortOption)} style={selectStyle}>
          <option value="default">Sort: Default</option>
          <option value="price-asc">Price: Low to high</option>
          <option value="price-desc">Price: High to low</option>
          <option value="name-asc">Name: A–Z</option>
        </select>

        {/* Clear */}
        {hasFilters && (
          <button
            onClick={clearFilters}
            style={{ height: 40, padding: '0 14px', fontSize: 12, color: 'var(--text-secondary)', background: 'none', border: '1px solid var(--border)', borderRadius: 6, cursor: 'pointer' }}
          >
            Clear
          </button>
        )}
      </div>

      {/* Results count */}
      {hasFilters && (
        <p style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 20 }}>
          {filtered.length} {filtered.length === 1 ? 'product' : 'products'} found
        </p>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-secondary)' }}>
          <div style={{ fontSize: 40, marginBottom: 16, opacity: 0.3 }}>🍬</div>
          <p style={{ fontSize: 15, fontWeight: 500, marginBottom: 8 }}>No products found</p>
          <p style={{ fontSize: 13 }}>Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} market={market} />
          ))}
        </div>
      )}
    </div>
  )
}
