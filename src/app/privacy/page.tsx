import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — SwedenSweet',
}

const sections = [
  {
    title: 'Personal Information We Collect',
    body: 'We collect information you provide directly, including your name, business name, billing and shipping address, phone number, and email address when you apply for a wholesale account, place an order, or contact us. We also collect financial information processed through Shopify Payments (we do not store payment card data ourselves), account credentials, transaction history, and standard device and usage data such as IP address, browser type, and page interactions.',
  },
  {
    title: 'How We Use Your Information',
    body: 'We use your information to process wholesale account applications, fulfill and ship orders, send order confirmations and shipping updates, manage your account, respond to support inquiries, and improve our services. We may also send you relevant business communications. We do not sell your personal information to third parties.',
  },
  {
    title: 'Our Relationship with Shopify',
    body: 'SwedenSweet is powered by Shopify. Your order and payment data is transmitted to and processed by Shopify in accordance with their Privacy Policy. Shopify may use your data to provide and improve their services across merchants. To learn more or exercise your rights regarding Shopify\'s processing, visit the Shopify Privacy Portal at privacy.shopify.com.',
  },
  {
    title: 'Disclosure of Personal Information',
    body: 'We may share your information with third-party service providers who perform services on our behalf (e.g. payment processing, shipping carriers, IT management, data analytics). We do not share your data with third parties for their own marketing purposes. We may disclose information as required by law, in connection with a business transaction such as a merger, or to protect our rights and the rights of our users.',
  },
  {
    title: 'Cookies',
    body: 'We use cookies to maintain your shopping cart session and login state. These are strictly necessary cookies required for the platform to function. We do not use third-party tracking cookies for advertising purposes.',
  },
  {
    title: 'Data Retention',
    body: 'We retain your personal data for as long as necessary to maintain your account, fulfill orders, comply with legal obligations, and resolve disputes. You may request deletion of your data at any time by contacting us.',
  },
  {
    title: 'Your Rights and Choices',
    body: 'Depending on where you live, you may have the right to access, correct, delete, or receive a copy of your personal data. You may also have the right to opt out of targeted advertising and to lodge a complaint with your local data protection authority. To exercise any of these rights, contact us at karen@thenordichype.com. We will respond in a timely manner as required by applicable law.',
  },
  {
    title: 'Children\'s Data',
    body: 'SwedenSweet is a B2B wholesale platform intended for business use only. We do not knowingly collect personal information from individuals under the age of majority.',
  },
  {
    title: 'International Transfers',
    body: 'Your personal information may be transferred to and processed in countries other than where you reside, including the United States and Sweden. Where required, we rely on recognized transfer mechanisms such as Standard Contractual Clauses to ensure adequate protection.',
  },
  {
    title: 'Changes to This Policy',
    body: 'We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. Changes will be posted on this page with an updated "Last updated" date.',
  },
]

export default function PrivacyPage() {
  return (
    <div style={{ background: 'var(--bg)' }}>
      <div className="section-px content-max" style={{ paddingTop: 80, paddingBottom: 100, maxWidth: 760 }}>
        <p className="eyebrow" style={{ marginBottom: 20 }}>Legal</p>
        <h1 className="display" style={{ fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: 12, color: 'var(--text)' }}>
          Privacy Policy
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
            Questions? Contact us at{' '}
            <a href="mailto:karen@thenordichype.com" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
              karen@thenordichype.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
