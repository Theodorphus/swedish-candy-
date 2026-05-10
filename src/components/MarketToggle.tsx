'use client'

import { useRouter, usePathname } from 'next/navigation'

type Market = 'usa' | 'sweden'

export default function MarketToggle({ active: fallback }: { active: Market }) {
  const router = useRouter()
  const pathname = usePathname()

  // Derive from URL so the toggle always reflects the current page,
  // even after client-side navigation (cookie prop is only the SSR fallback)
  const active: Market = pathname.includes('/catalog/sweden')
    ? 'sweden'
    : pathname.includes('/catalog/usa')
    ? 'usa'
    : fallback

  function switchMarket(market: Market) {
    // Persist for 1 year — low-stakes preference cookie, no HttpOnly needed
    document.cookie = `market=${market}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`
    router.push(`/catalog/${market}`)
  }

  return (
    <div
      style={{
        display: 'flex',
        gap: 3,
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border)',
        borderRadius: 8,
        padding: 3,
        flexShrink: 0,
      }}
    >
      {(['usa', 'sweden'] as Market[]).map((market) => (
        <button
          key={market}
          onClick={() => switchMarket(market)}
          style={{
            fontSize: 12,
            fontWeight: active === market ? 600 : 400,
            padding: '5px 12px',
            borderRadius: 6,
            background: active === market ? 'var(--accent)' : 'transparent',
            color: active === market ? '#fff' : 'var(--text-secondary)',
            border: 'none',
            cursor: active === market ? 'default' : 'pointer',
            transition: 'background 150ms ease, color 150ms ease',
            letterSpacing: '0.02em',
            display: 'flex',
            alignItems: 'center',
            gap: 5,
          }}
        >
          <span style={{ fontSize: 13 }}>{market === 'usa' ? '🇺🇸' : '🇸🇪'}</span>
          {market === 'usa' ? 'USA' : 'Sweden'}
        </button>
      ))}
    </div>
  )
}
