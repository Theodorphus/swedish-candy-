import Link from 'next/link'

export const metadata = { title: 'Reset Password — Sweden Sweet' }

const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const SHOPIFY_ACCOUNT_URL = process.env.NEXT_PUBLIC_SHOPIFY_ACCOUNT_URL
  ?? (storeDomain ? `https://${storeDomain}/account/login` : '/login')

export default function ForgotPasswordPage() {
  return (
    <main className="section-px" style={{ paddingTop: 80, paddingBottom: 80 }}>
      <div className="content-max">
        <h1 className="display" style={{ fontSize: 28, marginBottom: 8 }}>Reset your password</h1>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 32, maxWidth: 400 }}>
          To reset your password, visit your account page. After resetting, come back here and sign in with your new password.
        </p>

        <div style={{ maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <a
            href={SHOPIFY_ACCOUNT_URL}
            style={{
              display: 'block',
              textAlign: 'center',
              background: 'var(--accent)',
              color: '#fff',
              border: 'none',
              padding: '12px 24px',
              borderRadius: 6,
              fontSize: 14,
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            Reset password →
          </a>

          <Link href="/login" style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>
            ← Back to sign in
          </Link>
        </div>
      </div>
    </main>
  )
}
