'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { forgotPassword, type ForgotPasswordState } from './actions'

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

export default function ForgotPasswordForm() {
  const [state, action, isPending] = useActionState<ForgotPasswordState, FormData>(forgotPassword, {})

  if (state.success) {
    return (
      <div style={{ maxWidth: 400 }}>
        <div style={{
          background: '#F0FAF4',
          border: '0.5px solid #A8D5B5',
          borderRadius: 6,
          padding: '14px 16px',
          fontSize: 14,
          color: '#1A6B35',
          marginBottom: 20,
        }}>
          If an account with that email exists, you&apos;ll receive a password reset link shortly.
        </div>
        <Link href="/login" style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>
          ← Back to sign in
        </Link>
      </div>
    )
  }

  return (
    <form action={action} style={{ maxWidth: 400 }}>
      <div style={{ marginBottom: 24 }}>
        <label htmlFor="email" style={labelStyle}>Email address</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          style={inputStyle}
          placeholder="jane@acmegrocery.com"
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
          marginBottom: 20,
        }}>
          {state.error}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        style={{
          width: '100%',
          background: isPending ? 'var(--text-secondary)' : 'var(--accent)',
          color: '#fff',
          border: 'none',
          padding: '12px 24px',
          borderRadius: 6,
          fontSize: 14,
          fontWeight: 500,
          cursor: isPending ? 'not-allowed' : 'pointer',
        }}
      >
        {isPending ? 'Sending…' : 'Send reset link'}
      </button>

      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 20 }}>
        <Link href="/login" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>
          ← Back to sign in
        </Link>
      </p>
    </form>
  )
}
