import Link from 'next/link'
import { getCurrentCart } from './actions'
import CartLineItem from './CartLineItem'

export const metadata = {
  title: 'Cart — SwedenSweet',
}

export default async function CartPage() {
  const cart = await getCurrentCart()
  const isEmpty = !cart || cart.lines.length === 0

  const subtotal = cart
    ? parseFloat(cart.cost.subtotalAmount.amount).toFixed(2)
    : '0.00'
  const total = cart
    ? parseFloat(cart.cost.totalAmount.amount).toFixed(2)
    : '0.00'
  const currency = cart?.cost.totalAmount.currencyCode ?? 'USD'

  return (
    <div>
      <div className="section-px" style={{ paddingTop: 48, paddingBottom: 80, maxWidth: 900, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 10 }}>
            Wholesale order
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 500 }}>
            Your cart
            {!isEmpty && (
              <span style={{ fontSize: 15, fontWeight: 400, color: 'var(--text-secondary)', marginLeft: 12 }}>
                {cart.totalQuantity} {cart.totalQuantity === 1 ? 'item' : 'items'}
              </span>
            )}
          </h1>
        </div>

        {isEmpty ? (
          /* Empty state */
          <div style={{
            textAlign: 'center',
            padding: '80px 24px',
            background: 'var(--bg-secondary)',
            border: '0.5px solid var(--border)',
            borderRadius: 12,
          }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>🛒</div>
            <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 10 }}>Your cart is empty</div>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 28, lineHeight: 1.7 }}>
              Browse our catalog and add products to start your wholesale order.
            </p>
            <Link href="/catalog" style={{
              display: 'inline-block',
              background: 'var(--accent)',
              color: '#fff',
              padding: '11px 28px',
              borderRadius: 6,
              fontSize: 14,
              fontWeight: 500,
              textDecoration: 'none',
            }}>
              Browse catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8 items-start">

            {/* Line items */}
            <div>
              {cart.lines.map((line) => (
                <CartLineItem key={line.id} line={line} />
              ))}

              <div style={{ marginTop: 24 }}>
                <Link href="/catalog" style={{ fontSize: 13, color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  ← Continue shopping
                </Link>
              </div>
            </div>

            {/* Order summary */}
            <div style={{ background: 'var(--bg-secondary)', border: '0.5px solid var(--border)', borderRadius: 12, padding: 28, position: 'sticky', top: 80 }}>
              <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 20 }}>Order summary</div>

              <div className="flex flex-col gap-3" style={{ marginBottom: 20, paddingBottom: 20, borderBottom: '0.5px solid var(--border)' }}>
                <div className="flex justify-between">
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                    Subtotal ({cart.totalQuantity} {cart.totalQuantity === 1 ? 'item' : 'items'})
                  </span>
                  <span style={{ fontSize: 13 }}>${subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Shipping</span>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Calculated at checkout</span>
                </div>
              </div>

              <div className="flex justify-between" style={{ marginBottom: 24 }}>
                <span style={{ fontSize: 14, fontWeight: 500 }}>Total</span>
                <span style={{ fontSize: 20, fontWeight: 500, color: 'var(--accent)' }}>
                  {currency} ${total}
                </span>
              </div>

              <a
                href={cart.checkoutUrl}
                style={{
                  display: 'block',
                  textAlign: 'center',
                  background: 'var(--accent)',
                  color: '#fff',
                  padding: '13px 24px',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 500,
                  textDecoration: 'none',
                  marginBottom: 12,
                }}
              >
                Proceed to checkout →
              </a>

              <p style={{ fontSize: 11, color: 'var(--text-secondary)', textAlign: 'center', lineHeight: 1.6 }}>
                Secure checkout powered by Shopify.
                {' '}Wholesale pricing applied to approved accounts.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
