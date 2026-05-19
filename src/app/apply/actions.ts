'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { shopify, customerLogin } from '@/lib/shopify'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export type ApplyState = { error?: string }

export async function submitApplication(
  _prevState: ApplyState,
  formData: FormData
): Promise<ApplyState> {

  // ── 1. Extract & validate fields ──────────────────────────────
  const firstName        = (formData.get('firstName')  as string ?? '').trim()
  const lastName         = (formData.get('lastName')   as string ?? '').trim()
  const email            = (formData.get('email')      as string ?? '').trim()
  const phone            = (formData.get('phone')      as string ?? '').trim()
  const password         = (formData.get('password')   as string ?? '')
  const confirmPassword  = (formData.get('confirmPassword') as string ?? '')
  const businessName     = (formData.get('businessName')    as string ?? '').trim()
  const businessType     = (formData.get('businessType')    as string ?? '').trim()
  const cityState        = (formData.get('location')        as string ?? '').trim()
  const estimatedMonthly = ''

  if (!firstName || !lastName || !email || !password) {
    return { error: 'Please fill in all required fields.' }
  }
  if (firstName.length > 100 || lastName.length > 100) {
    return { error: 'Name is too long.' }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: 'Please enter a valid email address.' }
  }
  if (phone && !/^[+\d\s\-().]{7,20}$/.test(phone)) {
    return { error: 'Please enter a valid phone number.' }
  }
  if (password !== confirmPassword) {
    return { error: 'Passwords do not match.' }
  }
  if (password.length < 8) {
    return { error: 'Password must be at least 8 characters.' }
  }

  // ── 2. Create customer via Storefront API ──────────────────────
  const { data, errors } = await shopify.request(`
    mutation CustomerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer { id }
        customerUserErrors { code message }
      }
    }
  `, {
    variables: {
      input: { firstName, lastName, email, password, acceptsMarketing: false },
    },
  })

  if (errors) return { error: 'Something went wrong. Please try again.' }

  const userErrors = data?.customerCreate?.customerUserErrors ?? []
  if (userErrors.length > 0) {
    const code = userErrors[0].code
    if (code === 'TAKEN')              return { error: 'An account with this email already exists.' }
    if (code === 'PASSWORD_TOO_SHORT') return { error: 'Password must be at least 8 characters.' }
    return { error: userErrors[0].message }
  }

  const customerId: string | undefined = data?.customerCreate?.customer?.id
  if (!customerId) return { error: 'Something went wrong. Please try again.' }

  // ── 3. Tag customer via Admin API ─────────────────────────────
  const adminToken  = process.env.SHOPIFY_ADMIN_TOKEN
  const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ?? ''

  if (adminToken && storeDomain) {
    const numericId = customerId.replace('gid://shopify/Customer/', '')
    const tags = [
      'wholesale',
      businessName     && `businessName:${businessName}`,
      businessType     && `businessType:${businessType}`,
      cityState        && `cityState:${cityState}`,
      estimatedMonthly && `estMonthly:${estimatedMonthly}`,
    ].filter(Boolean).join(', ')

    await fetch(
      `https://${storeDomain}/admin/api/2026-04/customers/${numericId}.json`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'X-Shopify-Access-Token': adminToken },
        body: JSON.stringify({ customer: { id: numericId, tags } }),
      }
    ).catch((err) => console.error('[apply] Failed to tag customer:', err))
  }

  // ── 4. Log in immediately ──────────────────────────────────────
  const session = await customerLogin(email, password)
  if ('error' in session) {
    // Account created but auto-login failed — send to login page
    redirect('/login')
  }
  const cookieStore = await cookies()
  const expiresDate = new Date(session.expiresAt)
  cookieStore.set('shopify_customer_token', session.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresDate,
    path: '/',
  })
  cookieStore.set('shopify_customer_token_expires', session.expiresAt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresDate,
    path: '/',
  })

  // ── 5. Notify admin (fire-and-forget) ─────────────────────────
  const adminEmails = process.env.ADMIN_NOTIFICATION_EMAILS
    ? process.env.ADMIN_NOTIFICATION_EMAILS.split(',').map(e => e.trim())
    : ['karen@thenordichype.com', 'webbdevstudio@gmail.com']

  resend.emails.send({
    from: 'SwedenSweet <noreply@swedensweet.com>',
    to: adminEmails,
    subject: `New wholesale account — ${firstName} ${lastName}`,
    text: [
      `A new wholesale account was created on SwedenSweet.`,
      ``,
      `Name:         ${firstName} ${lastName}`,
      `Email:        ${email}`,
      `Phone:        ${phone || '—'}`,
      `Business:     ${businessName || '—'}`,
      `Type:         ${businessType || '—'}`,
      `Location:     ${cityState || '—'}`,
      `Est. monthly: ${estimatedMonthly || '—'}`,
      ``,
      `View in Shopify Admin:`,
      process.env.SHOPIFY_ADMIN_CUSTOMERS_URL ?? `https://admin.shopify.com/store/${storeDomain.split('.')[0]}/customers`,
    ].join('\n'),
  }).catch((err) => console.error('[apply] Admin notification failed:', err))

  redirect('/account')
}
