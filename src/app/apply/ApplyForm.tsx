'use client'

import { useActionState, useState } from 'react'
import { submitApplication, type ApplyState } from './actions'

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 12,
  fontWeight: 600,
  color: 'var(--text-secondary)',
  marginBottom: 7,
  letterSpacing: 0.2,
}

const sectionHeadingStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: 1.8,
  textTransform: 'uppercase' as const,
  color: 'var(--accent)',
  marginBottom: 20,
}

export default function ApplyForm() {
  const [state, action, isPending] = useActionState<ApplyState, FormData>(submitApplication, {})
  const [pw, setPw]           = useState('')
  const [confirmPw, setConfirmPw] = useState('')

  // Derived: show mismatch hint only once confirm field has content
  const pwMismatch = confirmPw.length > 0 && pw !== confirmPw

  if (state.success) {
    return (
      <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderTop: '3px solid var(--accent)', borderRadius: 10, padding: '56px 40px', textAlign: 'center', maxWidth: 520 }}>
        <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--accent-light)', border: '1px solid rgba(155,34,72,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M5 11l4.5 4.5L17 7" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className="display" style={{ fontSize: 22, marginBottom: 12 }}>Application received</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.75 }}>
          We&apos;ll review your application within 1–2 business days.
          Once approved you&apos;ll receive an email and can log in to access wholesale pricing.
        </p>
      </div>
    )
  }

  return (
    <form action={action} style={{ maxWidth: 640 }}>

      {/* ── Business information ── */}
      <div style={{ marginBottom: 36 }}>
        <div style={sectionHeadingStyle}>Business information</div>
        <div className="flex flex-col gap-4">

          <div className="flex flex-col">
            <label htmlFor="businessName" style={labelStyle}>
              Business name <span style={{ color: 'var(--accent)' }}>*</span>
            </label>
            <input id="businessName" name="businessName" type="text" required className="input" placeholder="Acme Grocery Co." />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col">
              <label htmlFor="businessType" style={labelStyle}>
                Business type <span style={{ color: 'var(--accent)' }}>*</span>
              </label>
              <select id="businessType" name="businessType" required className="input" style={{ cursor: 'pointer' }}>
                <option value="">Select type…</option>
                <option value="retailer">Retailer / Grocery</option>
                <option value="restaurant">Restaurant / Café</option>
                <option value="hotel">Hotel / Hospitality</option>
                <option value="online">Online Store</option>
                <option value="distributor">Distributor</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="location" style={labelStyle}>City, State</label>
              <input id="location" name="location" type="text" className="input" placeholder="Chicago, IL" />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="volume" style={labelStyle}>Estimated monthly order</label>
            <select id="volume" name="volume" className="input" style={{ cursor: 'pointer' }}>
              <option value="">Select range…</option>
              <option value="300-999">$300 – $999</option>
              <option value="1000-4999">$1,000 – $4,999</option>
              <option value="5000+">$5,000+</option>
            </select>
          </div>
        </div>
      </div>

      {/* ── Contact details ── */}
      <div style={{ marginBottom: 36 }}>
        <div style={sectionHeadingStyle}>Your contact details</div>
        <div className="flex flex-col gap-4">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col">
              <label htmlFor="firstName" style={labelStyle}>
                First name <span style={{ color: 'var(--accent)' }}>*</span>
              </label>
              <input id="firstName" name="firstName" type="text" required className="input" placeholder="Jane" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastName" style={labelStyle}>
                Last name <span style={{ color: 'var(--accent)' }}>*</span>
              </label>
              <input id="lastName" name="lastName" type="text" required className="input" placeholder="Smith" />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" style={labelStyle}>
              Email address <span style={{ color: 'var(--accent)' }}>*</span>
            </label>
            <input id="email" name="email" type="email" required className="input" placeholder="jane@acmegrocery.com" />
          </div>

          <div className="flex flex-col">
            <label htmlFor="phone" style={labelStyle}>Phone number</label>
            <input id="phone" name="phone" type="tel" className="input" placeholder="+1 (312) 000-0000" />
          </div>
        </div>
      </div>

      {/* ── Create account ── */}
      <div style={{ marginBottom: 36 }}>
        <div style={sectionHeadingStyle}>Create your account</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex flex-col">
            <label htmlFor="password" style={labelStyle}>
              Password <span style={{ color: 'var(--accent)' }}>*</span>
            </label>
            <input
              id="password" name="password" type="password" required minLength={5}
              className="input" placeholder="Min. 5 characters"
              value={pw} onChange={e => setPw(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="confirmPassword" style={labelStyle}>
              Confirm password <span style={{ color: 'var(--accent)' }}>*</span>
            </label>
            <input
              id="confirmPassword" name="confirmPassword" type="password" required minLength={5}
              className="input" placeholder="Repeat password"
              value={confirmPw} onChange={e => setConfirmPw(e.target.value)}
              style={pwMismatch ? { borderColor: '#E53935' } : undefined}
            />
            {pwMismatch && (
              <p style={{ fontSize: 11, color: '#E53935', marginTop: 5 }}>Passwords do not match</p>
            )}
          </div>
        </div>
      </div>

      {/* ── Server error ── */}
      {state.error && (
        <div style={{ background: '#FEF2F0', border: '1px solid #F5C2BA', borderLeft: '3px solid #E53935', borderRadius: 8, padding: '12px 16px', fontSize: 13, color: '#993C1D', marginBottom: 20, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
            <circle cx="8" cy="8" r="7" stroke="#E53935" strokeWidth="1.4"/>
            <path d="M8 5v4M8 11v.5" stroke="#E53935" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          {state.error}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending || pwMismatch}
        className="btn-primary"
        style={{ width: '100%', display: 'block', padding: '14px', fontSize: 14, opacity: (isPending || pwMismatch) ? 0.6 : 1, cursor: (isPending || pwMismatch) ? 'not-allowed' : 'pointer', borderRadius: 8 }}
      >
        {isPending ? 'Submitting…' : 'Submit application →'}
      </button>

      <p style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 14, lineHeight: 1.65 }}>
        We review all applications within 1–2 business days. You&apos;ll receive an email once approved.
      </p>
    </form>
  )
}
