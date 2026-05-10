import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shipping Policy — SwedenSweet',
}

const sections = [
  {
    title: 'Processing Time',
    body: 'Orders are processed within 1–2 business days of receipt. You will receive a confirmation email once your order has shipped.',
  },
  {
    title: 'USA Warehouse (Santa Fe Springs, CA)',
    body: 'Orders fulfilled from our Santa Fe Springs warehouse ship via UPS or FedEx Ground. Delivery typically takes 3–5 business days depending on your location within the USA. Expedited shipping options are available upon request — contact us before placing your order.',
  },
  {
    title: 'Swedish Warehouse',
    body: 'Orders fulfilled from our Swedish warehouse ship internationally via DHL or similar carriers. Delivery typically takes 7–14 business days. Import duties and customs fees may apply and are the responsibility of the buyer.',
  },
  {
    title: 'Shipping Costs',
    body: 'Shipping costs are calculated at checkout based on order weight and destination. For large or recurring orders, contact us to discuss freight options and potential volume discounts.',
  },
  {
    title: 'Minimum Order',
    body: 'A minimum order value of $300 USD is required for all wholesale orders.',
  },
  {
    title: 'Tracking',
    body: 'A tracking number will be emailed to you once your order ships. If you have not received tracking information within 3 business days of placing your order, please contact us.',
  },
  {
    title: 'Lost or Delayed Shipments',
    body: 'If your shipment appears lost or significantly delayed, contact us at karen@thenordichype.com and we will work with the carrier to resolve the issue.',
  },
]

export default function ShippingPolicyPage() {
  return (
    <div style={{ background: 'var(--bg)' }}>
      <div className="section-px content-max" style={{ paddingTop: 80, paddingBottom: 100, maxWidth: 760 }}>
        <p className="eyebrow" style={{ marginBottom: 20 }}>Legal</p>
        <h1 className="display" style={{ fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: 12, color: 'var(--text)' }}>
          Shipping Policy
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
            Questions about your shipment? Contact us at{' '}
            <a href="mailto:karen@thenordichype.com" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
              karen@thenordichype.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
