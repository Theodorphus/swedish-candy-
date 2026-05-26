'use client'

import React, { useState, useMemo, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import ProductCard from './ProductCard'
import type { ShopifyProduct } from '@/lib/shopify'

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc'

const PAGE_SIZE = 24

export default function CatalogSearch({ products, market = 'usa' }: { products: ShopifyProduct[]; market?: 'usa' | 'sweden' }) {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(() => searchParams.get('q') ?? '')
  const [brand, setBrand] = useState(() => searchParams.get('brand') ?? '')
  const [type, setType] = useState(() => searchParams.get('type') ?? '')
  const [page, setPage] = useState(1)
  const topRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setQuery(searchParams.get('q') ?? '')
    setPage(1)
  }, [searchParams])
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
    setPage(1)
  }

  function handleFilterChange(setter: (v: string) => void) {
    return (e: React.ChangeEvent<HTMLSelectElement>) => {
      setter(e.target.value)
      setPage(1)
    }
  }

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function goToPage(p: number) {
    setPage(p)
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
    <div ref={topRef}>
      {/* Controls row */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
        {/* Search — full width */}
        <div style={{ position: 'relative', width: '100%', maxWidth: 480 }}>
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)', pointerEvents: 'none' }}>
            <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.4" />
            <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search products, brands…"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1) }}
            className="input"
            style={{ paddingLeft: 34, height: 40, fontSize: 13, width: '100%' }}
          />
        </div>

        {/* Filters row — wraps on mobile */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
          {/* Brand filter */}
          {brands.length > 0 && (
            <select value={brand} onChange={handleFilterChange(setBrand)} style={{ ...selectStyle, flex: '1 1 120px' }}>
              <option value="">All brands</option>
              {brands.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          )}

          {/* Type filter */}
          {types.length > 0 && (
            <select value={type} onChange={handleFilterChange(setType)} style={{ ...selectStyle, flex: '1 1 120px' }}>
              <option value="">All types</option>
              {types.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          )}

          {/* Sort */}
          <select value={sort} onChange={(e) => { setSort(e.target.value as SortOption); setPage(1) }} style={{ ...selectStyle, flex: '1 1 140px' }}>
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low to high</option>
            <option value="price-desc">Price: High to low</option>
            <option value="name-asc">Name: A–Z</option>
          </select>

          {/* Clear */}
          {hasFilters && (
            <button
              onClick={clearFilters}
              style={{ height: 40, padding: '0 14px', fontSize: 12, color: 'var(--text-secondary)', background: 'none', border: '1px solid var(--border)', borderRadius: 6, cursor: 'pointer', whiteSpace: 'nowrap' }}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Results count */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
        <p style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>
          {hasFilters
            ? <>{filtered.length} {filtered.length === 1 ? 'product' : 'products'} found</>
            : <>{filtered.length} products</>
          }
        </p>
        {totalPages > 1 && (
          <p style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>
            Page {page} of {totalPages}
          </p>
        )}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-secondary)' }}>
          <div style={{ fontSize: 40, marginBottom: 16, opacity: 0.3 }}>🍬</div>
          <p style={{ fontSize: 15, fontWeight: 500, marginBottom: 8 }}>No products found</p>
          <p style={{ fontSize: 13 }}>Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {paginated.map((p) => (
            <ProductCard key={p.id} product={p} market={market} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 48 }}>
          <button
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
            className="touch-target"
            style={{ height: 36, padding: '0 14px', fontSize: 13, color: page === 1 ? 'var(--text-tertiary)' : 'var(--text-secondary)', background: 'none', border: '1px solid var(--border)', borderRadius: 6, cursor: page === 1 ? 'default' : 'pointer', opacity: page === 1 ? 0.4 : 1 }}
          >
            ← Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
            .reduce<(number | 'gap')[]>((acc, p, i, arr) => {
              if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push('gap')
              acc.push(p)
              return acc
            }, [])
            .map((item, i) =>
              item === 'gap' ? (
                <span key={`gap-${i}`} style={{ fontSize: 13, color: 'var(--text-tertiary)', padding: '0 4px' }}>…</span>
              ) : (
                <button
                  key={item}
                  onClick={() => goToPage(item as number)}
                  className="touch-target"
                  style={{
                    width: 36, height: 36, fontSize: 13, fontWeight: item === page ? 600 : 400,
                    color: item === page ? '#fff' : 'var(--text-secondary)',
                    background: item === page ? 'var(--accent)' : 'none',
                    border: `1px solid ${item === page ? 'var(--accent)' : 'var(--border)'}`,
                    borderRadius: 6, cursor: item === page ? 'default' : 'pointer',
                    transition: 'background 150ms ease, color 150ms ease, border-color 150ms ease',
                  }}
                >
                  {item}
                </button>
              )
            )
          }

          <button
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
            className="touch-target"
            style={{ height: 36, padding: '0 14px', fontSize: 13, color: page === totalPages ? 'var(--text-tertiary)' : 'var(--text-secondary)', background: 'none', border: '1px solid var(--border)', borderRadius: 6, cursor: page === totalPages ? 'default' : 'pointer', opacity: page === totalPages ? 0.4 : 1 }}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  )
}
