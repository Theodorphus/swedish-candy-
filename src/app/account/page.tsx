import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getCustomer } from '@/lib/shopify'
import LogoutButton from './LogoutButton'

export const metadata = {
  title: 'My Account — SwedenSweet',
}

export default async function AccountPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('shopify_customer_token')?.value

  if (!token) redirect('/login')

  const customer = await getCustomer(token)
  if (!customer) redirect('/api/clear-session')


  const fullName = [customer.firstName, customer.lastName].filter(Boolean).join(' ')

  return (
    <div>
      <div className="section-px" style={{ paddingTop: 48, paddingBottom: 64, maxWidth: 900, margin: '0 auto' }}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" style={{ marginBottom: 40 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>
              Wholesale account
            </div>
            <h1 style={{ fontSize: 26, fontWeight: 500 }}>
              {fullName || customer.email}
            </h1>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
              {customer.email}
            </p>
          </div>
          <LogoutButton />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-6 items-start">

          {/* Orders */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 16 }}>Order history</div>

            {customer.orders.length === 0 ? (
              <div style={{ background: 'var(--bg-secondary)', border: '0.5px solid var(--border)', borderRadius: 10, padding: '40px 24px', textAlign: 'center' }}>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 16 }}>No orders yet.</p>
                <Link href="/catalog" style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>
                  Browse catalog →
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {customer.orders.map((order) => {
                  const date = new Date(order.processedAt).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'short', day: 'numeric',
                  })
                  const price = parseFloat(order.currentTotalPrice.amount).toFixed(2)
                  const status = order.fulfillmentStatus?.replace(/_/g, ' ').toLowerCase() ?? '—'

                  return (
                    <div
                      key={order.id}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                      style={{ background: 'var(--bg)', border: '0.5px solid var(--border)', borderRadius: 10, padding: '18px 20px' }}
                    >
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 3 }}>
                          Order #{order.orderNumber}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{date}</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span style={{
                          fontSize: 11,
                          fontWeight: 500,
                          textTransform: 'capitalize',
                          background: 'var(--bg-secondary)',
                          border: '0.5px solid var(--border)',
                          padding: '3px 10px',
                          borderRadius: 20,
                          color: 'var(--text-secondary)',
                        }}>
                          {status}
                        </span>
                        <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--accent)' }}>
                          ${price}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-3">
            {/* Account info */}
            <div style={{ background: 'var(--bg-secondary)', border: '0.5px solid var(--border)', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 16 }}>Account details</div>
              <div className="flex flex-col gap-3">
                {[
                  { label: 'Name', value: fullName || '—' },
                  { label: 'Email', value: customer.email },
                  { label: 'Phone', value: customer.phone || '—' },
                  { label: 'Account type', value: 'Wholesale' },
                ].map((row) => (
                  <div key={row.label}>
                    <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 2 }}>
                      {row.label}
                    </div>
                    <div style={{ fontSize: 13 }}>{row.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div style={{ background: 'var(--bg-secondary)', border: '0.5px solid var(--border)', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 14 }}>Quick links</div>
              <div className="flex flex-col gap-2">
                {[
                  { label: 'Browse catalog', href: '/catalog' },
                  { label: 'Contact us', href: '/contact' },
                ].map((l) => (
                  <Link key={l.href} href={l.href} style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none' }}>
                    {l.label} →
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
