'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { login, type LoginState } from './actions'

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

export default function LoginForm() {
  const [state, action, isPending] = useActionState<LoginState, FormData>(login, {})

  return (
    <form action={action} style={{ maxWidth: 400 }}>
      <div className="flex flex-col gap-4" style={{ marginBottom: 24 }}>
        <div className="flex flex-col">
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

        <div className="flex flex-col">
          <label htmlFor="password" style={labelStyle}>Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            style={inputStyle}
            placeholder="Your password"
          />
        </div>
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
        {isPending ? 'Signing in…' : 'Sign in'}
      </button>

      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 20, lineHeight: 1.6 }}>
        <Link href="/forgot-password" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>
          Forgot your password?
        </Link>
      </p>

      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 12, lineHeight: 1.6 }}>
        Don&apos;t have an account?{' '}
        <Link href="/apply" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>
          Apply for wholesale access →
        </Link>
      </p>
    </form>
  )
}
