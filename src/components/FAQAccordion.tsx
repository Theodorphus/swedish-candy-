'use client'

import { useState } from 'react'

const faqs = [
  {
    q: 'What is the minimum order quantity?',
    a: 'Our minimum order is $300 per order. This applies to all account tiers. For Preferred accounts the minimum is $1,000, and Enterprise starts at $5,000.',
  },
  {
    q: 'How do I apply for a wholesale account?',
    a: 'Click "Apply for account" and fill in the form with your business details. We review all applications within 1–2 business days. Once approved, you\'ll receive individual wholesale pricing.',
  },
  {
    q: 'How long does fulfillment take?',
    a: 'Orders from our Chicago, IL warehouse ship within 1–2 business days and typically arrive in 3–5 business days across the USA. Swedish warehouse orders vary by destination.',
  },
  {
    q: 'What payment terms are available?',
    a: 'Starter accounts: NET-15 after three completed orders. Preferred accounts: NET-30. Enterprise accounts: NET-45. We also accept credit card for all orders.',
  },
  {
    q: 'Can I get custom pricing?',
    a: 'Yes. All accounts receive individual pricing based on order volume and product mix. Contact your account manager or apply to get started — we\'ll tailor pricing to your needs.',
  },
  {
    q: 'Which brands do you carry?',
    a: 'We carry all major Swedish candy brands: BUBS, Fazer, Marabou, Cloetta, Ahlgrens, Läkerol, Malaco, OLW, and more. New arrivals are added regularly.',
  },
  {
    q: 'Do you ship outside the USA?',
    a: 'Our USA warehouse ships domestically only. For international orders, please contact us — our Swedish warehouse can ship to select markets.',
  },
]

export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div style={{ maxWidth: 720 }}>
      {faqs.map((item, i) => (
        <div
          key={i}
          style={{ borderTop: i === 0 ? '1px solid var(--border)' : 'none' }}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
              padding: '20px 0',
              background: 'none',
              border: 'none',
              borderBottom: '1px solid var(--border)',
              cursor: 'pointer',
              textAlign: 'left',
              fontFamily: 'inherit',
            }}
          >
            <span
              style={{
                fontSize: 15,
                fontWeight: 500,
                color: open === i ? 'var(--accent)' : 'var(--text)',
                transition: 'color 150ms ease',
              }}
            >
              {item.q}
            </span>
            <span
              style={{
                flexShrink: 0,
                width: 20,
                height: 20,
                borderRadius: '50%',
                border: `1px solid ${open === i ? 'var(--accent)' : 'var(--border)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: open === i ? 'var(--accent)' : 'var(--text-tertiary)',
                fontSize: 14,
                transition: 'all 150ms ease',
                lineHeight: 1,
              }}
            >
              {open === i ? '−' : '+'}
            </span>
          </button>

          {open === i && (
            <div
              style={{
                padding: '16px 0 20px',
                borderBottom: '1px solid var(--border)',
              }}
            >
              <p
                style={{
                  fontSize: 14,
                  color: 'var(--text-secondary)',
                  lineHeight: 1.75,
                  maxWidth: 600,
                }}
              >
                {item.a}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
