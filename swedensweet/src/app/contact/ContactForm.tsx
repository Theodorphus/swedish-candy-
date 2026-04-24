'use client'

import { useActionState } from 'react'
import { submitContact, type ContactState } from './actions'

const inputStyle: React.CSSProperties = {
  width: '100%',
  border: '0.5px solid var(--border)',
  borderRadius: 6,
  padding: '10px 14px',
  fontSize: 14,
  background: 'var(--bg)',
  color: 'var(--text)',
  outline: 'none',
  fontFamily: 'inherit',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 12,
  fontWeight: 500,
  color: 'var(--text-secondary)',
  marginBottom: 6,
}

export default function ContactForm() {
  const [state, action, isPending] = useActionState<ContactState, FormData>(
    submitContact,
    {}
  )

  if (state.success) {
    return (
      <div style={{
        background: 'var(--bg-secondary)',
        border: '0.5px solid var(--border)',
        borderRadius: 12,
        padding: '48px 40px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 32, marginBottom: 16 }}>✓</div>
        <div style={{ fontSize: 20, fontWeight: 500, marginBottom: 10 }}>Message sent</div>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          Thanks for reaching out. We typically respond within one business day.
        </p>
      </div>
    )
  }

  return (
    <form action={action} className="flex flex-col gap-4" style={{ maxWidth: 580 }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex flex-col">
          <label htmlFor="name" style={labelStyle}>Name *</label>
          <input id="name" name="name" type="text" required style={inputStyle} placeholder="Jane Smith" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" style={labelStyle}>Email *</label>
          <input id="email" name="email" type="email" required style={inputStyle} placeholder="jane@company.com" />
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="subject" style={labelStyle}>Subject</label>
        <select id="subject" name="subject" style={{ ...inputStyle, cursor: 'pointer' }}>
          <option value="">Select a topic…</option>
          <option value="wholesale-pricing">Wholesale pricing</option>
          <option value="product-question">Product question</option>
          <option value="shipping">Shipping & logistics</option>
          <option value="account">Account support</option>
          <option value="enterprise">Enterprise / large order</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="message" style={labelStyle}>Message *</label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          style={{ ...inputStyle, resize: 'vertical' }}
          placeholder="Tell us about your business and what you're looking for…"
        />
      </div>

      {state.error && (
        <div style={{
          background: '#FEF2F0',
          border: '0.5px solid #F5C2BA',
          borderRadius: 6,
          padding: '10px 14px',
          fontSize: 13,
          color: '#993C1D',
        }}>
          {state.error}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        style={{
          background: isPending ? 'var(--text-secondary)' : 'var(--accent)',
          color: '#fff',
          border: 'none',
          padding: '12px 28px',
          borderRadius: 6,
          fontSize: 14,
          fontWeight: 500,
          cursor: isPending ? 'not-allowed' : 'pointer',
          width: '100%',
        }}
      >
        {isPending ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}
