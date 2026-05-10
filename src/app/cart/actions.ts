'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import {
  cartCreate,
  cartLinesAdd,
  cartLinesUpdate,
  cartLinesRemove,
  cartBuyerIdentityUpdate,
  getCart,
  type Cart,
} from '@/lib/shopify'

const CART_COOKIE = 'shopify_cart_id'

async function getOrCreateCart(
  cookieStore: Awaited<ReturnType<typeof cookies>>,
  lines?: { merchandiseId: string; quantity: number }[]
): Promise<Cart | null> {
  const cartId = cookieStore.get(CART_COOKIE)?.value

  if (cartId) {
    const existing = await getCart(cartId)
    if (existing) return existing
  }

  // Cart expired or doesn't exist — create new
  const newCart = await cartCreate(lines ?? [])
  if (newCart) {
    cookieStore.set(CART_COOKIE, newCart.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })
  }
  return newCart
}

export async function addToCart(
  merchandiseId: string,
  quantity: number = 1
): Promise<{ success: boolean; error?: string }> {
  const cookieStore = await cookies()
  const cartId = cookieStore.get(CART_COOKIE)?.value

  let cart: Cart | null = null

  if (cartId) {
    const existing = await getCart(cartId)
    if (existing) {
      cart = await cartLinesAdd(cartId, [{ merchandiseId, quantity }])
    }
  }

  if (!cart) {
    cart = await cartCreate([{ merchandiseId, quantity }])
    if (cart) {
      cookieStore.set(CART_COOKIE, cart.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      })
    }
  }

  if (!cart) return { success: false, error: 'Could not add item to cart.' }

  revalidatePath('/cart')
  return { success: true }
}

export async function updateCartLine(
  lineId: string,
  quantity: number
): Promise<void> {
  const cookieStore = await cookies()
  const cartId = cookieStore.get(CART_COOKIE)?.value
  if (!cartId) return

  if (quantity <= 0) {
    await cartLinesRemove(cartId, [lineId])
  } else {
    await cartLinesUpdate(cartId, [{ id: lineId, quantity }])
  }

  revalidatePath('/cart')
}

export async function removeCartLine(lineId: string): Promise<void> {
  const cookieStore = await cookies()
  const cartId = cookieStore.get(CART_COOKIE)?.value
  if (!cartId) return

  await cartLinesRemove(cartId, [lineId])
  revalidatePath('/cart')
}

export async function getCurrentCart(): Promise<Cart | null> {
  const cookieStore = await cookies()
  const cartId = cookieStore.get(CART_COOKIE)?.value
  if (!cartId) return null
  return getCart(cartId)
}

export async function proceedToCheckout(): Promise<void> {
  const cookieStore = await cookies()
  const cartId = cookieStore.get(CART_COOKIE)?.value
  if (!cartId) redirect('/catalog/usa')

  const customerToken = cookieStore.get('shopify_customer_token')?.value
  let cart = await getCart(cartId)
  if (!cart || cart.lines.length === 0) redirect('/cart')

  if (customerToken) {
    const updated = await cartBuyerIdentityUpdate(cartId, customerToken)
    if (updated) cart = updated
  }

  redirect(cart.checkoutUrl)
}
