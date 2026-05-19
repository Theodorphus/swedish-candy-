'use client'

import { useActionState } from 'react'
import { submitContact, type ContactState } from './actions'

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 12,
  fontWeight: 600,
  color: 'var(--text-secondary)',
  marginBottom: 7,
  letterSpacing: 0.2,
}

export default function ContactForm({ product }: { product?: string }) {
  const [state, action, isPending] = useActionState<ContactState, FormData>(
    submitContact,
    {}
  )

  if (state.success) {
    return (
      <div
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          padding: '56px 40px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: 'var(--accent-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            fontSize: 22,
          }}
        >
          ✓
        </div>
        <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 10 }}>Message sent</div>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.75 }}>
          Thanks for reaching out. We typically respond within one business day.
        </p>
      </div>
    )
  }

  return (
    <form action={action} className="flex flex-col gap-4" style={{ maxWidth: 580 }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex flex-col">
          <label htmlFor="name" style={labelStyle}>
            Name <span style={{ color: 'var(--accent)' }}>*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="input"
            placeholder="Jane Smith"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" style={labelStyle}>
            Email <span style={{ color: 'var(--accent)' }}>*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="input"
            placeholder="jane@company.com"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="subject" style={labelStyle}>Subject</label>
        <select
          id="subject"
          name="subject"
          required
          className="input"
          style={{ cursor: 'pointer' }}
          defaultValue={product ? 'product-question' : ''}
        >
          <option value="" disabled>Select a topic…</option>
          <option value="wholesale-pricing">Wholesale pricing</option>
          <option value="product-question">Product question</option>
          <option value="shipping">Shipping & logistics</option>
          <option value="account">Account support</option>
          <option value="enterprise">Enterprise / large order</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="message" style={labelStyle}>
          Message <span style={{ color: 'var(--accent)' }}>*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="input"
          style={{ resize: 'vertical' }}
          placeholder="Tell us about your business and what you're looking for…"
          defaultValue={product ? `Hi, I'd like to request a quote for: ${product}\n\n` : ''}
        />
      </div>

      {state.error && (
        <div
          style={{
            background: '#FEF2F0',
            border: '1px solid #F5C2BA',
            borderRadius: 8,
            padding: '12px 16px',
            fontSize: 13,
            color: '#993C1D',
          }}
        >
          {state.error}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        style={{
          background: isPending ? 'var(--text-tertiary)' : 'var(--accent)',
          color: '#fff',
          border: 'none',
          padding: '13px 28px',
          borderRadius: 10,
          fontSize: 14,
          fontWeight: 500,
          cursor: isPending ? 'not-allowed' : 'pointer',
          width: '100%',
          transition: 'background var(--transition)',
          fontFamily: 'inherit',
        }}
      >
        {isPending ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}
