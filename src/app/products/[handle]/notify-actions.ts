'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export type NotifyState = { error?: string; success?: boolean }

export async function submitNotifyMe(
  _prev: NotifyState,
  formData: FormData
): Promise<NotifyState> {
  const email = (formData.get('email') as string ?? '').trim()
  const productTitle = (formData.get('productTitle') as string ?? '').trim()
  const productHandle = (formData.get('productHandle') as string ?? '').trim()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: 'Please enter a valid email address.' }
  }

  const adminEmails = process.env.ADMIN_NOTIFICATION_EMAILS
    ? process.env.ADMIN_NOTIFICATION_EMAILS.split(',').map((e) => e.trim())
    : ['karen@thenordichype.com', 'webbdevstudio@gmail.com']

  const { error } = await resend.emails.send({
    from: 'SwedenSweet <noreply@swedensweet.com>',
    to: adminEmails,
    subject: `Back-in-stock request — ${productTitle}`,
    text: [
      `A customer wants to be notified when a product is back in stock.`,
      ``,
      `Product: ${productTitle}`,
      `Handle:  ${productHandle}`,
      `Email:   ${email}`,
    ].join('\n'),
  })

  if (error) return { error: 'Something went wrong. Please try again.' }

  return { success: true }
}
