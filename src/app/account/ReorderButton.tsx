'use client'

import { useTransition } from 'react'
import { reorder } from './reorder-action'

export default function ReorderButton({ lineItems }: { lineItems: { variantId: string; quantity: number }[] }) {
  const [isPending, startTransition] = useTransition()

  if (lineItems.length === 0) return null

  return (
    <button
      onClick={() => startTransition(() => reorder(lineItems))}
      disabled={isPending}
      style={{
        fontSize: 12,
        fontWeight: 500,
        color: 'var(--accent)',
        background: 'none',
        border: 'none',
        cursor: isPending ? 'not-allowed' : 'pointer',
        padding: 0,
        whiteSpace: 'nowrap',
        opacity: isPending ? 0.5 : 1,
      }}
    >
      {isPending ? 'Adding…' : 'Reorder →'}
    </button>
  )
}
