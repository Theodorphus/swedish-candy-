'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { customerResetByUrl } from '@/lib/shopify'

export type ResetPasswordState = {
  error?: string
}

export async function resetPassword(
  _prev: ResetPasswordState,
  formData: FormData
): Promise<ResetPasswordState> {
  const resetUrl = formData.get('resetUrl')?.toString()
  const password = formData.get('password')?.toString()
  const confirm = formData.get('confirmPassword')?.toString()

  if (!resetUrl || !password) return { error: 'Invalid reset link.' }
  if (password !== confirm) return { error: 'Passwords do not match.' }
  if (password.length < 8) return { error: 'Password must be at least 8 characters.' }

  const result = await customerResetByUrl(resetUrl, password)
  if ('error' in result) return { error: result.error }

  const cookieStore = await cookies()
  cookieStore.set('shopify_customer_token', result.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: new Date(result.expiresAt),
    path: '/',
  })
  cookieStore.set('shopify_customer_token_expires', result.expiresAt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: new Date(result.expiresAt),
    path: '/',
  })

  redirect('/account')
}
