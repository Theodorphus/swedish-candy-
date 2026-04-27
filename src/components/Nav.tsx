'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const links = [
  { label: 'USA Catalog', href: '/catalog/usa' },
  { label: 'Sweden Catalog', href: '/catalog/sweden' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Contact', href: '/contact' },
]

export default function Nav({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const router = useRouter()

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/catalog/usa?q=${encodeURIComponent(query.trim())}`)
      setQuery('')
    }
  }

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-[var(--accent)] text-white text-[11px] font-medium tracking-wide text-center py-2 px-4">
        $300 MOQ &nbsp;·&nbsp; Ships from Chicago &nbsp;·&nbsp; 3–5 day delivery
      </div>

      {/* Main nav */}
      <div
        className="bg-white/95 backdrop-blur-md border-b border-[var(--border)]"
        style={{ backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' } as React.CSSProperties}
      >
        <div className="section-px content-max flex items-center justify-between gap-6" style={{ height: 60 }}>

          {/* Logo */}
          <Link
            href="/"
            className="shrink-0 text-[17px] font-semibold no-underline text-[var(--text)] tracking-tight"
          >
            Sweden<span className="text-[var(--accent)]">Sweet</span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-8">
            {links.map(({ label, href }) => (
              <Link key={label} href={href} className="nav-link text-[13px] font-medium">
                {label}
              </Link>
            ))}
          </nav>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center w-44 lg:w-56">
            <input
              type="text"
              placeholder="Search products…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full border border-[var(--border)] rounded-sm text-[13px] py-2 px-3 outline-none bg-[var(--bg-secondary)] text-[var(--text)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--accent)] transition-colors"
            />
          </form>

          {/* Right actions */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href={isLoggedIn ? '/account' : '/login'}
              className="hidden md:block text-[13px] text-[var(--text-secondary)] no-underline px-3 py-2 hover:text-[var(--accent)] transition-colors"
            >
              {isLoggedIn ? 'My account' : 'Sign in'}
            </Link>

            <Link
              href="/cart"
              aria-label="Cart"
              className="flex items-center justify-center w-9 h-9 border border-[var(--border)] text-[var(--text)] no-underline hover:border-[var(--accent)] transition-colors"
              style={{ borderRadius: 2 }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M1 1h2l2 8h7l1.5-5H4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="7" cy="13" r="1" fill="currentColor"/>
                <circle cx="12" cy="13" r="1" fill="currentColor"/>
              </svg>
            </Link>

            <Link href="/apply" className="btn-primary hidden md:inline-flex" style={{ padding: '8px 18px', fontSize: 12, borderRadius: 2 }}>
              Apply for account
            </Link>

            {/* Hamburger */}
            <button
              className="lg:hidden border border-[var(--border)] cursor-pointer bg-transparent text-[var(--text)] p-1.5"
              style={{ borderRadius: 2 }}
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Close' : 'Menu'}
            >
              {open ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 4.5h12M2 8h12M2 11.5h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="bg-white border-b border-[var(--border)] lg:hidden">
          {/* Mobile search */}
          <form onSubmit={handleSearch} className="px-6 pt-4 pb-2">
            <input
              type="text"
              placeholder="Search products…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full border border-[var(--border)] text-[13px] py-2.5 px-3 outline-none bg-[var(--bg-secondary)] text-[var(--text)] placeholder:text-[var(--text-tertiary)]"
            />
          </form>

          {links.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="block px-6 py-3.5 text-[14px] text-[var(--text)] no-underline border-b border-[var(--border-light)] hover:bg-[var(--bg-secondary)] transition-colors"
            >
              {label}
            </Link>
          ))}
          <div className="px-6 py-4 flex flex-col gap-2">
            <Link
              href={isLoggedIn ? '/account' : '/login'}
              onClick={() => setOpen(false)}
              className="block text-center py-3 text-[14px] text-[var(--text-secondary)] no-underline border border-[var(--border)]"
            >
              {isLoggedIn ? 'My account' : 'Sign in'}
            </Link>
            <Link
              href="/apply"
              onClick={() => setOpen(false)}
              className="btn-primary block text-center py-3"
            >
              Apply for wholesale account
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
