'use server'

import { shopify } from '@/lib/shopify'

export type ApplyState = { error?: string; success?: boolean }

export async function submitApplication(
  _prevState: ApplyState,
  formData: FormData
): Promise<ApplyState> {
  const firstName = (formData.get('firstName') as string).trim()
  const lastName = (formData.get('lastName') as string).trim()
  const email = (formData.get('email') as string).trim()
  const phone = ((formData.get('phone') as string) || '').trim()
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (!firstName || !lastName || !email || !password) {
    return { error: 'Please fill in all required fields.' }
  }

  if (password !== confirmPassword) {
    return { error: 'Passwords do not match.' }
  }

  if (password.length < 5) {
    return { error: 'Password must be at least 5 characters.' }
  }

  const { data, errors } = await shopify.request(`
    mutation CustomerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer { id }
        customerUserErrors { code message }
      }
    }
  `, {
    variables: {
      input: {
        firstName,
        lastName,
        email,
        ...(phone && { phone }),
        password,
        acceptsMarketing: false,
      },
    },
  })

  if (errors) {
    return { error: 'Something went wrong. Please try again.' }
  }

  const userErrors = data?.customerCreate?.customerUserErrors
  if (userErrors?.length > 0) {
    const code = userErrors[0].code
    if (code === 'TAKEN') return { error: 'An account with this email already exists.' }
    if (code === 'PASSWORD_TOO_SHORT') return { error: 'Password must be at least 5 characters.' }
    return { error: userErrors[0].message }
  }

  return { success: true }
}
