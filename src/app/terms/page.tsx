import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions — SwedenSweet',
}

const sections = [
  {
    title: 'Eligibility',
    body: 'SwedenSweet is a B2B wholesale platform open to registered businesses only. By placing an order you confirm that you are purchasing for resale or business use, not personal consumption.',
  },
  {
    title: 'Minimum Order',
    body: 'A minimum order value of $300 USD applies to all orders. Orders below this threshold will not be processed.',
  },
  {
    title: 'Pricing',
    body: 'All prices are listed in USD and are exclusive of applicable taxes and shipping. Pricing is subject to change without notice. Your confirmed order price is locked at the time of checkout.',
  },
  {
    title: 'Payment',
    body: 'Payment is processed securely through Shopify Payments at checkout. NET payment terms (NET-15, NET-30, NET-45) may be available to qualifying accounts as determined by SwedenSweet.',
  },
  {
    title: 'Shipping & Fulfillment',
    body: 'Orders from our USA warehouse (Santa Fe Springs, CA) ship within 1–2 business days and arrive within 3–5 business days. Orders from our Swedish warehouse may take longer due to international transit. Shipping costs are calculated at checkout.',
  },
  {
    title: 'Returns & Damages',
    body: 'We do not accept returns on wholesale orders unless goods arrive damaged or defective. Claims for damaged goods must be submitted within 5 business days of delivery with photographic evidence. Approved claims will be credited or replaced at our discretion.',
  },
  {
    title: 'Account Approval',
    body: 'Wholesale accounts are subject to approval by SwedenSweet. We reserve the right to decline or revoke account access at any time.',
  },
  {
    title: 'Limitation of Liability',
    body: 'SwedenSweet shall not be liable for indirect, incidental, or consequential damages arising from the use of our products or platform. Our total liability shall not exceed the value of the order in question.',
  },
  {
    title: 'Governing Law',
    body: 'These terms are governed by the laws of the State of Illinois, USA. Any disputes shall be resolved in the courts of Cook County, Illinois.',
  },
  {
    title: 'Changes to Terms',
    body: 'We reserve the right to update these terms at any time. Continued use of the platform after changes constitutes acceptance of the revised terms.',
  },
]

export default function TermsPage() {
  return (
    <div style={{ background: 'var(--bg)' }}>
      <div className="section-px content-max" style={{ paddingTop: 80, paddingBottom: 100, maxWidth: 760 }}>

        <p className="eyebrow" style={{ marginBottom: 20 }}>Legal</p>
        <h1 className="display" style={{ fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: 12, color: 'var(--text)' }}>
          Terms & Conditions
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 64 }}>
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          {sections.map(({ title, body }) => (
            <div key={title} style={{ borderTop: '1px solid var(--border)', paddingTop: 32 }}>
              <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 12 }}>
                {title}
              </h2>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                {body}
              </p>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 64,
            padding: '24px 28px',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: 8,
          }}
        >
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            Questions about these terms? Contact us at{' '}
            <a href="mailto:karen@thenordichype.com" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
              karen@thenordichype.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
