'use client'

import { useTransition, useState } from 'react'
import { addToCart } from '@/app/cart/actions'

type Props = {
  variantId: string
  availableForSale: boolean
}

export default function AddToCartButton({ variantId, availableForSale }: Props) {
  const [isPending, startTransition] = useTransition()
  const [added, setAdded] = useState(false)

  function handleAddToCart() {
    startTransition(async () => {
      const result = await addToCart(variantId, 1)
      if (result.success) {
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
      }
    })
  }

  if (!availableForSale) {
    return (
      <button
        disabled
        style={{
          display: 'block',
          width: '100%',
          padding: '13px 24px',
          borderRadius: 8,
          fontSize: 14,
          fontWeight: 500,
          background: 'var(--bg-secondary)',
          color: 'var(--text-secondary)',
          border: '0.5px solid var(--border)',
          cursor: 'not-allowed',
        }}
      >
        Out of stock
      </button>
    )
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={isPending}
      style={{
        display: 'block',
        width: '100%',
        padding: '13px 24px',
        borderRadius: 8,
        fontSize: 14,
        fontWeight: 500,
        background: added ? '#2D7A3A' : isPending ? 'var(--text-secondary)' : 'var(--accent)',
        color: '#fff',
        border: 'none',
        cursor: isPending ? 'not-allowed' : 'pointer',
        transition: 'background 0.2s',
        fontFamily: 'inherit',
      }}
    >
      {added ? '✓ Added to cart' : isPending ? 'Adding…' : 'Add to cart'}
    </button>
  )
}
