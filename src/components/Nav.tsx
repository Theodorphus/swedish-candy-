'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import MarketToggle from './MarketToggle'

const links = [
  { label: 'Catalog',  href: '/catalog' },
  { label: 'Brands',   href: '/brands' },
  { label: 'Pricing',  href: '/#pricing' },
  { label: 'About',    href: '/about' },
  { label: 'Contact',  href: '/contact' },
]

export default function Nav({ isLoggedIn = false, market = 'usa' }: { isLoggedIn?: boolean; market?: 'usa' | 'sweden' }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [searching, setSearching] = useState(false)
  const router = useRouter()

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim() && !searching) {
      setSearching(true)
      const catalogPath = market === 'sweden' ? '/catalog/sweden' : '/catalog/usa'
      router.push(`${catalogPath}?q=${encodeURIComponent(query.trim())}`)
      setQuery('')
      setSearching(false)
    }
  }

  return (
    <header className="sticky top-0 z-50">

      {/* Announcement bar */}
      <div style={{ background: 'var(--accent)', color: '#fff', fontSize: 11, textAlign: 'center', padding: '12px 16px', letterSpacing: '0.05em', fontWeight: 500 }}>
        <span style={{ fontWeight: 700 }}>✓</span>
        <span> $300 MOQ</span>
        <span style={{ opacity: 0.45, margin: '0 10px' }}>·</span>
        <span className="hidden sm:inline">
          <span>Free customs &amp; FDA handling</span>
          <span style={{ opacity: 0.45, margin: '0 10px' }}>·</span>
        </span>
        <span>Ships in 3–5 days from Santa Fe Springs</span>
      </div>

      {/* Main nav */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid var(--border)' }}>
        <div className="section-px content-max" style={{ height: 62, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>

          {/* Logo */}
          <Link href="/" style={{ flexShrink: 0, textDecoration: 'none', fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text)' }}>
            Sweden<span style={{ color: 'var(--accent)' }}>Sweet</span>
          </Link>

          {/* Desktop links */}
          <nav className="hidden lg:flex" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            {links.map(({ label, href }) => (
              <Link key={label} href={href} style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 150ms ease', letterSpacing: '0.01em' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Market toggle — desktop only */}
          <div className="hidden lg:block">
            <MarketToggle active={market} />
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:flex" style={{ position: 'relative', width: 192 }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: searching ? 'var(--accent)' : 'var(--text-tertiary)', pointerEvents: 'none', transition: 'color 150ms ease' }}>
              <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.4"/>
              <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="Search by brand, SKU or type…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={searching}
              style={{ width: '100%', border: '1px solid var(--border)', borderRadius: 4, fontSize: 12, padding: '8px 12px 8px 30px', background: 'var(--bg-secondary)', color: 'var(--text)', outline: 'none', fontFamily: 'inherit', transition: 'border-color 150ms ease', opacity: searching ? 0.6 : 1 }}
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            />
          </form>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <Link href={isLoggedIn ? '/account' : '/login'} className="hidden md:block" style={{ fontSize: 14, color: 'var(--text-secondary)', textDecoration: 'none', padding: '8px 12px', borderRadius: 6, transition: 'color 150ms ease, background 150ms ease' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.background = 'var(--bg-secondary)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'transparent' }}
            >
              {isLoggedIn ? 'My account' : 'Sign in'}
            </Link>

            <Link href="/cart" aria-label="Cart" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, border: '1px solid var(--border)', borderRadius: 4, color: 'var(--text)', textDecoration: 'none', transition: 'border-color 150ms ease, color 150ms ease' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)' }}
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path d="M1 1h2l2 8h7l1.5-5H4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="7" cy="13" r="1" fill="currentColor"/>
                <circle cx="12" cy="13" r="1" fill="currentColor"/>
              </svg>
            </Link>

            <Link href="/apply" className="btn-primary hidden md:inline-flex" style={{ padding: '8px 16px', fontSize: 12, borderRadius: 4, letterSpacing: '0.02em' }}>
              Apply
            </Link>

            {/* Hamburger */}
            <button
              className="lg:hidden"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, border: '1px solid var(--border)', borderRadius: 4, background: 'transparent', cursor: 'pointer', color: 'var(--text)' }}
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Close' : 'Menu'}
            >
              {open ? (
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M2 4.5h12M2 8h12M2 11.5h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: '#fff', borderBottom: '1px solid var(--border)' }}>
          <form onSubmit={handleSearch} style={{ padding: '12px 24px 8px', position: 'relative' }}>
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ position: 'absolute', left: 34, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)', pointerEvents: 'none' }}>
              <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.4"/>
              <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="Search by brand, SKU or type…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ width: '100%', border: '1px solid var(--border)', borderRadius: 4, fontSize: 13, padding: '10px 12px 10px 30px', background: 'var(--bg-secondary)', color: 'var(--text)', outline: 'none', fontFamily: 'inherit' }}
            />
          </form>

          {links.map(({ label, href }) => (
            <Link key={label} href={href} onClick={() => setOpen(false)} style={{ display: 'block', padding: '14px 24px', fontSize: 14, color: 'var(--text)', textDecoration: 'none', borderBottom: '1px solid var(--border-light)' }}>
              {label}
            </Link>
          ))}

          <div style={{ padding: '12px 24px', borderBottom: '1px solid var(--border-light)' }}>
            <MarketToggle active={market} />
          </div>

          <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Link href={isLoggedIn ? '/account' : '/login'} onClick={() => setOpen(false)} className="btn-secondary" style={{ textAlign: 'center', display: 'block', padding: '12px' }}>
              {isLoggedIn ? 'My account' : 'Sign in'}
            </Link>
            <Link href="/apply" onClick={() => setOpen(false)} className="btn-primary" style={{ textAlign: 'center', display: 'block', padding: '12px' }}>
              Apply for wholesale account
            </Link>
          </div>
        </div>
      )}

    </header>
  )
}
