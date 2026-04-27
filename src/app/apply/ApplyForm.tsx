'use client'

import { useActionState } from 'react'
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
  const [state, action, isPending] = useActionState<ApplyState, FormData>(
    submitApplication,
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
          maxWidth: 520,
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
            fontSize: 24,
          }}
        >
          ✓
        </div>
        <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>
          Application received
        </div>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.75 }}>
          We&apos;ll review your application and get back to you within 1–2 business days.
          Once approved, you&apos;ll be able to log in and see your wholesale pricing.
        </p>
      </div>
    )
  }

  return (
    <form action={action} style={{ maxWidth: 640 }}>
      {/* Business info */}
      <div style={{ marginBottom: 36 }}>
        <div style={sectionHeadingStyle}>Business information</div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="businessName" style={labelStyle}>
              Business name <span style={{ color: 'var(--accent)' }}>*</span>
            </label>
            <input
              id="businessName"
              name="businessName"
              type="text"
              required
              className="input"
              placeholder="Acme Grocery Co."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col">
              <label htmlFor="businessType" style={labelStyle}>
                Business type <span style={{ color: 'var(--accent)' }}>*</span>
              </label>
              <select
                id="businessType"
                name="businessType"
                required
                className="input"
                style={{ cursor: 'pointer' }}
              >
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
              <input
                id="location"
                name="location"
                type="text"
                className="input"
                placeholder="Chicago, IL"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="volume" style={labelStyle}>Estimated monthly order</label>
            <select
              id="volume"
              name="volume"
              className="input"
              style={{ cursor: 'pointer' }}
            >
              <option value="">Select range…</option>
              <option value="300-999">$300 – $999</option>
              <option value="1000-4999">$1,000 – $4,999</option>
              <option value="5000+">$5,000+</option>
            </select>
          </div>
        </div>
      </div>

      {/* Contact info */}
      <div style={{ marginBottom: 36 }}>
        <div style={sectionHeadingStyle}>Your contact details</div>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col">
              <label htmlFor="firstName" style={labelStyle}>
                First name <span style={{ color: 'var(--accent)' }}>*</span>
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                className="input"
                placeholder="Jane"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastName" style={labelStyle}>
                Last name <span style={{ color: 'var(--accent)' }}>*</span>
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                className="input"
                placeholder="Smith"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" style={labelStyle}>
              Email address <span style={{ color: 'var(--accent)' }}>*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="input"
              placeholder="jane@acmegrocery.com"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="phone" style={labelStyle}>Phone number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="input"
              placeholder="+1 (312) 000-0000"
            />
          </div>
        </div>
      </div>

      {/* Account */}
      <div style={{ marginBottom: 36 }}>
        <div style={sectionHeadingStyle}>Create your account</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex flex-col">
            <label htmlFor="password" style={labelStyle}>
              Password <span style={{ color: 'var(--accent)' }}>*</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={5}
              className="input"
              placeholder="Min. 5 characters"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="confirmPassword" style={labelStyle}>
              Confirm password <span style={{ color: 'var(--accent)' }}>*</span>
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              minLength={5}
              className="input"
              placeholder="Repeat password"
            />
          </div>
        </div>
      </div>

      {/* Error */}
      {state.error && (
        <div
          style={{
            background: '#FEF2F0',
            border: '1px solid #F5C2BA',
            borderRadius: 8,
            padding: '12px 16px',
            fontSize: 13,
            color: '#993C1D',
            marginBottom: 20,
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
        {isPending ? 'Submitting…' : 'Submit application'}
      </button>

      <p style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 14, lineHeight: 1.65 }}>
        We review all applications within 1–2 business days. Once approved, you&apos;ll receive
        an email and can log in to see your wholesale pricing.
      </p>
    </form>
  )
}
