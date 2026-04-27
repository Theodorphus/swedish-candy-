'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTransition } from 'react'
import { updateCartLine, removeCartLine } from './actions'
import type { CartLine } from '@/lib/shopify'

export default function CartLineItem({ line }: { line: CartLine }) {
  const [isPending, startTransition] = useTransition()
  const { merchandise } = line
  const price = parseFloat(merchandise.price.amount)
  const lineTotal = (price * line.quantity).toFixed(2)

  function handleQuantity(newQty: number) {
    startTransition(() => updateCartLine(line.id, newQty))
  }

  function handleRemove() {
    startTransition(() => removeCartLine(line.id))
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '72px 1fr',
        gap: 16,
        padding: '20px 0',
        borderBottom: '0.5px solid var(--border)',
        opacity: isPending ? 0.5 : 1,
        transition: 'opacity 0.15s',
      }}
    >
      {/* Image */}
      <Link href={`/products/${merchandise.product.handle}`}>
        <div style={{
          position: 'relative',
          width: 72,
          height: 72,
          borderRadius: 8,
          overflow: 'hidden',
          background: 'var(--bg-secondary)',
          border: '0.5px solid var(--border)',
          flexShrink: 0,
        }}>
          {merchandise.product.featuredImage ? (
            <Image
              src={merchandise.product.featuredImage.url}
              alt={merchandise.product.featuredImage.altText ?? merchandise.product.title}
              fill
              style={{ objectFit: 'cover' }}
              sizes="72px"
            />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', fontSize: 28 }}>
              🍬
            </div>
          )}
        </div>
      </Link>

      {/* Details */}
      <div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link
              href={`/products/${merchandise.product.handle}`}
              style={{ fontSize: 14, fontWeight: 500, textDecoration: 'none', color: 'var(--text)', lineHeight: 1.3, display: 'block', marginBottom: 3 }}
            >
              {merchandise.product.title}
            </Link>
            {merchandise.title !== 'Default Title' && (
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>
                {merchandise.title}
              </div>
            )}
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              ${price.toFixed(2)} / unit
            </div>
          </div>

          <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--accent)', whiteSpace: 'nowrap' }}>
            ${lineTotal}
          </div>
        </div>

        {/* Qty + remove */}
        <div className="flex items-center gap-3" style={{ marginTop: 14 }}>
          <div className="flex items-center" style={{ border: '0.5px solid var(--border)', borderRadius: 6, overflow: 'hidden' }}>
            <button
              onClick={() => handleQuantity(line.quantity - 1)}
              disabled={isPending}
              style={{
                width: 32, height: 32, background: 'none', border: 'none',
                cursor: isPending ? 'not-allowed' : 'pointer',
                fontSize: 16, color: 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              −
            </button>
            <span style={{ minWidth: 32, textAlign: 'center', fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>
              {line.quantity}
            </span>
            <button
              onClick={() => handleQuantity(line.quantity + 1)}
              disabled={isPending}
              style={{
                width: 32, height: 32, background: 'none', border: 'none',
                cursor: isPending ? 'not-allowed' : 'pointer',
                fontSize: 16, color: 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              +
            </button>
          </div>

          <button
            onClick={handleRemove}
            disabled={isPending}
            style={{
              background: 'none', border: 'none',
              fontSize: 12, color: 'var(--text-secondary)',
              cursor: isPending ? 'not-allowed' : 'pointer',
              textDecoration: 'underline', padding: 0,
            }}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}
