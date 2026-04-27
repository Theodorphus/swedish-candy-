import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import LoginForm from './LoginForm'

export const metadata = {
  title: 'Sign In — SwedenSweet',
  description: 'Sign in to your SwedenSweet wholesale account.',
}

export default async function LoginPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('shopify_customer_token')
  if (token) redirect('/account')

  return (
    <div>
      <div className="section-px" style={{ paddingTop: 64, paddingBottom: 80, maxWidth: 560, margin: '0 auto' }}>
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5" style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 40 }}>
          <Link href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <span>Sign in</span>
        </div>

        <div style={{ marginBottom: 36 }}>
          <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 10 }}>
            Wholesale account
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 500, marginBottom: 10 }}>Sign in</h1>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            Sign in to access your wholesale pricing and place orders.
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  )
}
