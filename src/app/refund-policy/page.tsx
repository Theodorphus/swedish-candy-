import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Refund Policy — SwedenSweet',
}

const sections = [
  {
    title: 'Wholesale Orders',
    body: 'All wholesale orders are final. We do not accept returns or exchanges on wholesale orders unless the products arrive damaged, defective, or significantly different from what was ordered.',
  },
  {
    title: 'Damaged or Defective Products',
    body: 'If your order arrives damaged or defective, please contact us within 5 business days of delivery. Include your order number and photographs of the damaged items and packaging. We will arrange a replacement or credit at our discretion.',
  },
  {
    title: 'Incorrect Orders',
    body: 'If you receive an incorrect shipment, contact us within 5 business days. We will arrange to ship the correct items at no additional cost.',
  },
  {
    title: 'How to Request a Refund or Replacement',
    body: 'Email karen@thenordichype.com with your order number, a description of the issue, and supporting photographs. We aim to respond within 1–2 business days.',
  },
  {
    title: 'Refund Processing',
    body: 'Approved refunds are processed to the original payment method within 5–10 business days depending on your bank or card issuer.',
  },
]

export default function RefundPolicyPage() {
  return (
    <div style={{ background: 'var(--bg)' }}>
      <div className="section-px content-max" style={{ paddingTop: 80, paddingBottom: 100, maxWidth: 760 }}>
        <p className="eyebrow" style={{ marginBottom: 20 }}>Legal</p>
        <h1 className="display" style={{ fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: 12, color: 'var(--text)' }}>
          Refund Policy
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 64 }}>
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          {sections.map(({ title, body }) => (
            <div key={title} style={{ borderTop: '1px solid var(--border)', paddingTop: 32 }}>
              <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 12 }}>{title}</h2>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8 }}>{body}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 64, padding: '24px 28px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 8 }}>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            Questions about a return or refund? Contact us at{' '}
            <a href="mailto:karen@thenordichype.com" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
              karen@thenordichype.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
