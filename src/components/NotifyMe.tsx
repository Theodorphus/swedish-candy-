'use client'

import { useActionState, useRef } from 'react'
import { submitNotifyMe, type NotifyState } from '@/app/products/[handle]/notify-actions'

const initial: NotifyState = {}

export default function NotifyMe({ productTitle, productHandle }: { productTitle: string; productHandle: string }) {
  const [state, action, pending] = useActionState(submitNotifyMe, initial)
  const formRef = useRef<HTMLFormElement>(null)

  if (state.success) {
    return (
      <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 6, padding: '14px 18px' }}>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          <strong style={{ color: 'var(--text)' }}>You're on the list.</strong> We'll let you know as soon as this product is back in stock.
        </p>
      </div>
    )
  }

  return (
    <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 6, padding: '16px 18px' }}>
      <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>Notify me when back in stock</p>
      <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 12 }}>Leave your email and we'll reach out when it's available.</p>
      <form ref={formRef} action={action} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <input type="hidden" name="productTitle" value={productTitle} />
        <input type="hidden" name="productHandle" value={productHandle} />
        <input
          type="email"
          name="email"
          placeholder="your@email.com"
          required
          className="input"
          style={{ flex: '1 1 180px', height: 38, fontSize: 13 }}
        />
        <button
          type="submit"
          disabled={pending}
          className="btn-primary"
          style={{ height: 38, padding: '0 16px', fontSize: 12, flexShrink: 0 }}
        >
          {pending ? 'Sending…' : 'Notify me'}
        </button>
      </form>
      {state.error && (
        <p style={{ fontSize: 12, color: '#c0392b', marginTop: 8 }}>{state.error}</p>
      )}
    </div>
  )
}
