'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { customerLogin, customerLogout } from '@/lib/shopify'

export type LoginState = { error?: string }

export async function login(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = (formData.get('email') as string).trim()
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Please fill in all fields.' }
  }

  const result = await customerLogin(email, password)

  if ('error' in result) {
    return { error: result.error }
  }

  const cookieStore = await cookies()
  const expiresDate = new Date(result.expiresAt)
  cookieStore.set('shopify_customer_token', result.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresDate,
    path: '/',
  })
  cookieStore.set('shopify_customer_token_expires', result.expiresAt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresDate,
    path: '/',
  })

  redirect('/account')
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies()
  const token = cookieStore.get('shopify_customer_token')?.value
  cookieStore.delete('shopify_customer_token')
  cookieStore.delete('shopify_customer_token_expires')
  if (token) await customerLogout(token).catch(() => {})
  redirect('/')
}
