'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { cartCreate, cartLinesAdd, getCart } from '@/lib/shopify'

const CART_COOKIE = 'shopify_cart_id'

export async function reorder(lineItems: { variantId: string; quantity: number }[]) {
  if (lineItems.length === 0) redirect('/catalog')

  const cookieStore = await cookies()
  const existingCartId = cookieStore.get(CART_COOKIE)?.value

  const lines = lineItems.map((li) => ({ merchandiseId: li.variantId, quantity: li.quantity }))

  let cartId = existingCartId
  if (cartId) {
    const existing = await getCart(cartId)
    if (existing) {
      const updated = await cartLinesAdd(cartId, lines)
      if (updated) redirect('/cart')
    }
  }

  const cart = await cartCreate(lines)
  if (cart) {
    cookieStore.set(CART_COOKIE, cart.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    })
    redirect('/cart')
  }

  redirect('/catalog')
}
