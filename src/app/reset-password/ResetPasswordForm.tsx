'use client'

import { useActionState } from 'react'
import { resetPassword, type ResetPasswordState } from './actions'

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

export default function ResetPasswordForm({ resetUrl }: { resetUrl: string }) {
  const [state, action, isPending] = useActionState<ResetPasswordState, FormData>(resetPassword, {})

  return (
    <form action={action} style={{ maxWidth: 400 }}>
      <input type="hidden" name="resetUrl" value={resetUrl} />

      <div className="flex flex-col gap-4" style={{ marginBottom: 24 }}>
        <div className="flex flex-col">
          <label htmlFor="password" style={labelStyle}>New password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="new-password"
            style={inputStyle}
            minLength={8}
            placeholder="At least 8 characters"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="confirmPassword" style={labelStyle}>Confirm new password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            autoComplete="new-password"
            style={inputStyle}
            placeholder="Repeat your password"
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
        {isPending ? 'Saving…' : 'Set new password'}
      </button>
    </form>
  )
}
