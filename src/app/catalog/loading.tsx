export default function Loading() {
  return (
    <div style={{ padding: '48px 40px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} style={{
            background: 'var(--bg-secondary)',
            border: '0.5px solid var(--border)',
            borderRadius: 10,
            padding: 20,
            animation: 'pulse 1.5s ease-in-out infinite',
          }}>
            <div style={{ background: 'var(--border)', borderRadius: 8, height: 180, marginBottom: 14 }} />
            <div style={{ background: 'var(--border)', borderRadius: 4, height: 14, marginBottom: 8, width: '70%' }} />
            <div style={{ background: 'var(--border)', borderRadius: 4, height: 12, width: '40%' }} />
          </div>
        ))}
      </div>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}
