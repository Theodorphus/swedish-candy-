import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  let email: string
  try {
    const body = await req.json()
    email = (body.email as string)?.trim()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  const adminEmails = process.env.ADMIN_NOTIFICATION_EMAILS
    ? process.env.ADMIN_NOTIFICATION_EMAILS.split(',').map(e => e.trim())
    : ['karen@thenordichype.com', 'webbdevstudio@gmail.com']

  await resend.emails.send({
    from: 'SwedenSweet <noreply@swedensweet.com>',
    to: adminEmails,
    subject: `Sweden catalog request — ${email}`,
    text: `Someone requested the Sweden catalog.\n\nEmail: ${email}\n\nReply to send them the catalog when it's ready.`,
  }).catch(err => console.error('[sweden-catalog-request] Email failed:', err))

  return NextResponse.json({ ok: true })
}
