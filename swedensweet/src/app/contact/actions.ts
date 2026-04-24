'use server'

export type ContactState = { error?: string; success?: boolean }

export async function submitContact(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = (formData.get('name') as string).trim()
  const email = (formData.get('email') as string).trim()
  const message = (formData.get('message') as string).trim()

  if (!name || !email || !message) {
    return { error: 'Please fill in all required fields.' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { error: 'Please enter a valid email address.' }
  }

  // TODO: Connect to an email service (e.g. Resend) to deliver messages to the store owner.
  // The collected fields are: name, email, subject (formData.get('subject')), message.

  return { success: true }
}
