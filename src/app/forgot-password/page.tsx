import ForgotPasswordForm from './ForgotPasswordForm'

export const metadata = { title: 'Reset Password — SwedenSweet' }

export default function ForgotPasswordPage() {
  return (
    <main className="section-px" style={{ paddingTop: 80, paddingBottom: 80 }}>
      <div className="content-max">
        <p className="eyebrow" style={{ marginBottom: 12 }}>Account</p>
        <h1 className="display" style={{ fontSize: 28, marginBottom: 8 }}>Reset your password</h1>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 32, maxWidth: 400 }}>
          Enter your email address and we&apos;ll send you a link to reset your password.
        </p>
        <ForgotPasswordForm />
      </div>
    </main>
  )
}
