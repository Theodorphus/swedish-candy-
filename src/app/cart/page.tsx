import Link from 'next/link'
import { getCurrentCart, proceedToCheckout } from './actions'
import CartLineItem from './CartLineItem'

export const metadata = {
  title: 'Cart — SwedenSweet',
}

export default async function CartPage() {
  const cart = await getCurrentCart()
  const isEmpty = !cart || cart.lines.length === 0

  const subtotal = cart ? parseFloat(cart.cost.subtotalAmount.amount).toFixed(2) : '0.00'
  const total    = cart ? parseFloat(cart.cost.totalAmount.amount).toFixed(2) : '0.00'
  const currency = cart?.cost.totalAmount.currencyCode ?? 'USD'

  const belowMoq = cart && parseFloat(cart.cost.subtotalAmount.amount) < 300

  return (
    <div style={{ background: 'var(--bg)', minHeight: '60vh' }}>
      <div className="section-px content-max" style={{ paddingTop: 56, paddingBottom: 96 }}>

        {/* Header */}
        <div style={{ marginBottom: 48, borderBottom: '1px solid var(--border)', paddingBottom: 24 }}>
          <p className="eyebrow" style={{ marginBottom: 10 }}>Wholesale order</p>
          <h1 className="display" style={{ fontSize: 32, color: 'var(--text)' }}>
            Your cart
            {!isEmpty && (
              <span style={{ fontSize: 15, fontWeight: 400, fontFamily: 'var(--font-sans)', color: 'var(--text-secondary)', marginLeft: 14 }}>
                {cart.totalQuantity} {cart.totalQuantity === 1 ? 'item' : 'items'}
              </span>
            )}
          </h1>
        </div>

        {isEmpty ? (
          <div style={{ textAlign: 'center', padding: '96px 24px', maxWidth: 480, margin: '0 auto' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--accent-light)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: 26 }}>
              🛒
            </div>
            <h2 className="display" style={{ fontSize: 24, marginBottom: 12 }}>Your cart is empty</h2>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 32 }}>
              Browse our catalog and add products to start your wholesale order. Minimum order is $300.
            </p>
            <Link href="/catalog/usa" className="btn-primary" style={{ padding: '13px 32px' }}>
              Browse USA catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-10 items-start">

            {/* Line items */}
            <div>
              {cart.lines.map((line) => (
                <CartLineItem key={line.id} line={line} />
              ))}
              <div style={{ marginTop: 28 }}>
                <Link href="/catalog/usa" style={{ fontSize: 13, color: 'var(--text-secondary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, transition: 'color 150ms' }}
                  onMouseEnter={undefined} onMouseLeave={undefined}
                >
                  ← Continue shopping
                </Link>
              </div>
            </div>

            {/* Order summary */}
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderTop: '3px solid var(--accent)', borderRadius: 10, padding: 28, position: 'sticky', top: 88 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 20 }}>Order summary</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                    Subtotal ({cart.totalQuantity} {cart.totalQuantity === 1 ? 'item' : 'items'})
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>${subtotal}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Shipping</span>
                  <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>Calculated at checkout</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>B2B discount</span>
                  <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>Applied at checkout</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>Total</span>
                <div style={{ display: 'inline-flex', alignItems: 'baseline' }}>
                  <span className="price-currency" style={{ fontSize: 13, paddingTop: 5 }}>$</span>
                  <span className="price-num display" style={{ fontSize: 32, color: 'var(--accent)', lineHeight: 1 }}>
                    {total.split('.')[0]}
                  </span>
                  <span className="price-dec" style={{ fontSize: 15 }}>.{total.split('.')[1]}</span>
                  <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-tertiary)', letterSpacing: '1px', textTransform: 'uppercase', marginLeft: 6, alignSelf: 'flex-end', paddingBottom: 3 }}>{currency}</span>
                </div>
              </div>

              {/* MOQ warning */}
              {belowMoq && (
                <div style={{ background: '#FEF9EC', border: '1px solid #F5E2A0', borderRadius: 6, padding: '10px 14px', marginBottom: 16, fontSize: 12, color: '#8A6800', lineHeight: 1.55 }}>
                  Add ${(300 - parseFloat(cart.cost.subtotalAmount.amount)).toFixed(2)} more to reach the $300 minimum order.
                </div>
              )}

              <form action={proceedToCheckout}>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ width: '100%', display: 'block', padding: '14px', fontSize: 14, borderRadius: 8, marginBottom: 12 }}
                >
                  Proceed to checkout →
                </button>
              </form>

              <p style={{ fontSize: 11, color: 'var(--text-tertiary)', textAlign: 'center', lineHeight: 1.65 }}>
                Secure checkout by Shopify · Wholesale pricing applied to approved accounts
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
