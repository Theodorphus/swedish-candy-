import { redirect } from 'next/navigation'
import ResetPasswordForm from './ResetPasswordForm'

export const metadata = { title: 'Set New Password — Sweden Sweet' }

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ url?: string }>
}) {
  const { url } = await searchParams
  if (!url) redirect('/forgot-password')

  let decodedUrl: string
  try {
    decodedUrl = decodeURIComponent(url)
  } catch {
    redirect('/forgot-password')
  }

  return (
    <main className="section-px" style={{ paddingTop: 80, paddingBottom: 80 }}>
      <div className="content-max">
        <h1 className="display" style={{ fontSize: 28, marginBottom: 8 }}>Set new password</h1>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 32 }}>
          Choose a new password for your account.
        </p>
        <ResetPasswordForm resetUrl={decodedUrl} />
      </div>
    </main>
  )
}
