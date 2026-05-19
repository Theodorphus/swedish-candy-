'use client'

import { useActionState, useState } from 'react'
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
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const pwMismatch = confirm.length > 0 && password !== confirm

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
            value={password}
            onChange={e => setPassword(e.target.value)}
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
            style={{ ...inputStyle, borderColor: pwMismatch ? '#E53E3E' : undefined }}
            minLength={8}
            placeholder="Repeat your password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
          />
          {pwMismatch && (
            <span style={{ fontSize: 12, color: '#E53E3E', marginTop: 4 }}>Passwords do not match</span>
          )}
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
        disabled={isPending || pwMismatch}
        style={{
          width: '100%',
          background: isPending || pwMismatch ? 'var(--text-secondary)' : 'var(--accent)',
          color: '#fff',
          border: 'none',
          padding: '12px 24px',
          borderRadius: 6,
          fontSize: 14,
          fontWeight: 500,
          cursor: isPending || pwMismatch ? 'not-allowed' : 'pointer',
        }}
      >
        {isPending ? 'Saving…' : 'Set new password'}
      </button>
    </form>
  )
}
