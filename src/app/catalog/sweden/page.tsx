'use client'

import { useState } from 'react'

export default function SwedenCatalogPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/sweden-catalog-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      if (!res.ok) {
        setError('Something went wrong. Please try again.')
        setLoading(false)
        return
      }
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
      return
    }
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="section-px" style={{ paddingTop: 80, paddingBottom: 80, maxWidth: 560, margin: '0 auto', width: '100%' }}>

        <p className="eyebrow" style={{ marginBottom: 12 }}>Swedish Warehouse</p>
        <h1 className="display" style={{ fontSize: 'clamp(26px, 4vw, 38px)', marginBottom: 16, lineHeight: 1.15 }}>
          Sweden catalog — coming soon
        </h1>
        <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 36 }}>
          We&apos;re finalising MOQ, pricing, and shipping details for our Swedish warehouse.
          Leave your email and we&apos;ll send you the full catalog as soon as it&apos;s ready.
        </p>

        {submitted ? (
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderLeft: '3px solid var(--accent)',
            borderRadius: 10,
            padding: '28px 32px',
          }}>
            <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>You&apos;re on the list!</p>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              We&apos;ll email you the Sweden catalog as soon as it&apos;s available.
            </p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                style={{
                  flex: '1 1 220px',
                  border: '1px solid var(--border)',
                  borderRadius: 6,
                  padding: '12px 16px',
                  fontSize: 14,
                  background: 'var(--bg)',
                  color: 'var(--text)',
                  outline: 'none',
                  fontFamily: 'inherit',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              />
              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{ padding: '12px 24px', fontSize: 14, flexShrink: 0, opacity: loading ? 0.7 : 1 }}
              >
                {loading ? 'Sending…' : 'Send me the catalog'}
              </button>
            </form>
            {error && (
              <p style={{ fontSize: 13, color: 'var(--accent)', marginTop: 10 }}>{error}</p>
            )}
          </>
        )}

        <p style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 16, lineHeight: 1.6 }}>
          In the meantime,{' '}
          <a href="/catalog/usa" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
            browse the USA catalog
          </a>{' '}
          — 3–5 day domestic shipping from Santa Fe Springs, CA.
        </p>
      </div>
    </div>
  )
}
