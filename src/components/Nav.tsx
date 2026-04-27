'use client'

import Link from 'next/link'
import { useState } from 'react'

const links = [
  { label: 'Catalog', href: '/catalog' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Contact', href: '/contact' },
]

export default function Nav({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  const [open, setOpen] = useState(false)

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div
        className="section-px content-max flex items-center justify-between"
        style={{ height: 60 }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontSize: 17,
            fontWeight: 600,
            textDecoration: 'none',
            color: 'var(--text)',
            letterSpacing: '-0.3px',
          }}
        >
          Sweden<span style={{ color: 'var(--accent)' }}>Sweet</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center" style={{ gap: 36 }}>
          {links.map(({ label, href }) => (
            <Link key={label} href={href} className="nav-link" style={{ fontSize: 13, fontWeight: 500 }}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <Link
            href={isLoggedIn ? '/account' : '/login'}
            className="hidden md:block"
            style={{ fontSize: 13, color: 'var(--text-secondary)', textDecoration: 'none', padding: '8px 12px' }}
          >
            {isLoggedIn ? 'My account' : 'Sign in'}
          </Link>

          <Link
            href="/cart"
            aria-label="Cart"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 36, height: 36,
              border: '1px solid var(--border)',
              borderRadius: 6,
              color: 'var(--text)',
              textDecoration: 'none',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1 1h2l2 8h7l1.5-5H4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="7" cy="13" r="1" fill="currentColor"/>
              <circle cx="12" cy="13" r="1" fill="currentColor"/>
            </svg>
          </Link>

          <Link href="/apply" className="btn-primary" style={{ padding: '8px 20px', fontSize: 13 }}>
            Apply for account
          </Link>

          {/* Hamburger */}
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close' : 'Menu'}
            style={{
              background: 'none',
              border: '1px solid var(--border)',
              borderRadius: 6,
              cursor: 'pointer',
              padding: '5px 7px',
              color: 'var(--text)',
              lineHeight: 1,
            }}
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

      {/* Mobile menu */}
      {open && (
        <div style={{ borderTop: '1px solid var(--border)', background: 'var(--bg)' }}>
          {links.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              style={{
                display: 'block',
                padding: '14px 24px',
                fontSize: 14,
                color: 'var(--text)',
                textDecoration: 'none',
                borderBottom: '1px solid var(--border-light)',
              }}
            >
              {label}
            </Link>
          ))}
          <div style={{ padding: '12px 24px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Link
              href={isLoggedIn ? '/account' : '/login'}
              onClick={() => setOpen(false)}
              style={{ display: 'block', textAlign: 'center', padding: '11px', fontSize: 14, color: 'var(--text-secondary)', textDecoration: 'none', border: '1px solid var(--border)', borderRadius: 6 }}
            >
              {isLoggedIn ? 'My account' : 'Sign in'}
            </Link>
            <Link
              href="/apply"
              onClick={() => setOpen(false)}
              className="btn-primary"
              style={{ width: '100%', textAlign: 'center', padding: '11px', display: 'block' }}
            >
              Apply for wholesale account
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
