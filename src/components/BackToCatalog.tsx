'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function BackToCatalog() {
  const searchParams = useSearchParams()
  const from = searchParams.get('from')
  const href = from === 'sweden' ? '/catalog/sweden' : '/catalog/usa'
  const label = from === 'sweden' ? '← Back to Swedish catalog' : '← Back to USA catalog'

  return (
    <Link href={href} style={{ fontSize: 13, color: 'var(--text-secondary)', textDecoration: 'none' }}>
      {label}
    </Link>
  )
}
