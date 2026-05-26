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
  const [ltWhole, ltDec = '00'] = lineTotal.split('.')

  function handleQuantity(newQty: number) {
    startTransition(() => updateCartLine(line.id, newQty))
  }

  function handleRemove() {
    startTransition(() => removeCartLine(line.id))
  }

  const imgSize = 'clamp(72px, 18vw, 88px)'

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `${imgSize} 1fr`,
      gap: 'clamp(12px, 3vw, 20px)',
      padding: '24px 0',
      borderBottom: '1px solid var(--border)',
      opacity: isPending ? 0.4 : 1,
      transition: 'opacity 0.2s ease',
    }}>
      {/* Image */}
      <Link href={`/products/${merchandise.product.handle}`} style={{ display: 'block', flexShrink: 0 }}>
        <div style={{
          position: 'relative',
          width: imgSize,
          height: imgSize,
          borderRadius: 10,
          overflow: 'hidden',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
        }}>
          {merchandise.product.featuredImage ? (
            <Image
              src={merchandise.product.featuredImage.url}
              alt={merchandise.product.featuredImage.altText ?? merchandise.product.title}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 480px) 72px, 88px"
            />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: 28, fontWeight: 700, color: 'var(--sand)' }}>
              S
            </div>
          )}
        </div>
      </Link>

      {/* Details */}
      <div style={{ minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 4, flexWrap: 'wrap' }}>
          <Link
            href={`/products/${merchandise.product.handle}`}
            style={{ fontSize: 14, fontWeight: 600, textDecoration: 'none', color: 'var(--text)', lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
          >
            {merchandise.product.title}
          </Link>
          <div style={{ display: 'inline-flex', alignItems: 'baseline', whiteSpace: 'nowrap' }}>
            <span className="price-currency">$</span>
            <span className="price-num" style={{ fontSize: 20, fontWeight: 700, color: 'var(--accent)', lineHeight: 1 }}>{ltWhole}</span>
            <span className="price-dec" style={{ fontSize: 12 }}>.{ltDec}</span>
          </div>
        </div>

        {merchandise.title !== 'Default Title' && (
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>{merchandise.title}</p>
        )}
        <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 14 }}>
          ${price.toFixed(2)} · per case
        </p>

        {/* Qty + remove */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: 6, overflow: 'hidden', background: 'var(--bg)' }}>
            <button
              onClick={() => handleQuantity(line.quantity - 1)}
              disabled={isPending}
              aria-label="Decrease quantity"
              style={{ width: 40, height: 40, background: 'none', border: 'none', cursor: isPending ? 'not-allowed' : 'pointer', fontSize: 18, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'color 150ms' }}
            >
              −
            </button>
            <span style={{ minWidth: 40, textAlign: 'center', fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>
              {line.quantity}
            </span>
            <button
              onClick={() => handleQuantity(line.quantity + 1)}
              disabled={isPending}
              aria-label="Increase quantity"
              style={{ width: 40, height: 40, background: 'none', border: 'none', cursor: isPending ? 'not-allowed' : 'pointer', fontSize: 18, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'color 150ms' }}
            >
              +
            </button>
          </div>

          <button
            onClick={handleRemove}
            disabled={isPending}
            style={{ background: 'none', border: 'none', fontSize: 12, color: 'var(--text-tertiary)', cursor: isPending ? 'not-allowed' : 'pointer', padding: 0, transition: 'color 150ms' }}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}
