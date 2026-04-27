'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export type ContactState = { error?: string; success?: boolean }

export async function submitContact(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = (formData.get('name') as string).trim()
  const email = (formData.get('email') as string).trim()
  const subject = ((formData.get('subject') as string) || '').trim()
  const message = (formData.get('message') as string).trim()

  if (!name || !email || !message) {
    return { error: 'Please fill in all required fields.' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { error: 'Please enter a valid email address.' }
  }

  const { error } = await resend.emails.send({
    from: 'SwedenSweet <noreply@swedensweet.com>',
    to: 'karen@thenordichype.com',
    replyTo: email,
    subject: subject ? `Contact: ${subject}` : `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  })

  if (error) return { error: 'Failed to send message. Please try again.' }

  return { success: true }
}
