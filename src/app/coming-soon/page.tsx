export const metadata = {
  title: 'Coming Soon — SwedenSweet',
}

export default function ComingSoonPage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg)',
      textAlign: 'center',
      padding: '40px 24px',
    }}>
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 40 }}>SwedenSweet</p>
      <h1 style={{
        fontFamily: 'var(--font-playfair), Georgia, serif',
        fontSize: 'clamp(32px, 6vw, 56px)',
        fontWeight: 700,
        color: 'var(--text)',
        letterSpacing: '-0.02em',
        marginBottom: 16,
      }}>
        Coming soon
      </h1>
      <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: 400 }}>
        We&apos;re putting the finishing touches on our wholesale platform.
        Check back shortly.
      </p>
    </div>
  )
}
