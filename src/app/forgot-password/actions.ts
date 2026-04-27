'use server'

import { customerRecover } from '@/lib/shopify'

export type ForgotPasswordState = {
  success?: boolean
  error?: string
}

export async function forgotPassword(
  _prev: ForgotPasswordState,
  formData: FormData
): Promise<ForgotPasswordState> {
  const email = formData.get('email')?.toString().trim()
  if (!email) return { error: 'Email is required.' }

  const result = await customerRecover(email)
  if ('error' in result) return { error: result.error }

  return { success: true }
}
