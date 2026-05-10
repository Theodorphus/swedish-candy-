export default function Loading() {
  return (
    <div>
      {/* Header skeleton */}
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', padding: '48px 40px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ background: 'var(--border)', borderRadius: 4, height: 11, width: 220, marginBottom: 10 }} />
            <div style={{ background: 'var(--border)', borderRadius: 6, height: 34, width: 240, marginBottom: 8 }} />
            <div style={{ background: 'var(--border)', borderRadius: 4, height: 13, width: 260 }} />
          </div>
          <div style={{ background: 'var(--border)', borderRadius: 8, height: 36, width: 140 }} />
        </div>
      </div>

      <div style={{ padding: '48px 40px', maxWidth: 1200, margin: '0 auto' }}>
        {/* Filter controls skeleton */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
          <div style={{ background: 'var(--border)', borderRadius: 6, height: 40, width: 220 }} />
          <div style={{ background: 'var(--border)', borderRadius: 6, height: 40, width: 140 }} />
          <div style={{ background: 'var(--border)', borderRadius: 6, height: 40, width: 140 }} />
          <div style={{ background: 'var(--border)', borderRadius: 6, height: 40, width: 140 }} />
        </div>

        {/* Product grid skeleton */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} style={{
              background: 'var(--bg-secondary)',
              border: '0.5px solid var(--border)',
              borderRadius: 10,
              overflow: 'hidden',
              animation: 'pulse 1.5s ease-in-out infinite',
              animationDelay: `${i * 50}ms`,
            }}>
              <div style={{ background: 'var(--border)', height: 180 }} />
              <div style={{ padding: 16 }}>
                <div style={{ background: 'var(--border)', borderRadius: 4, height: 10, marginBottom: 8, width: '40%' }} />
                <div style={{ background: 'var(--border)', borderRadius: 4, height: 14, marginBottom: 6, width: '90%' }} />
                <div style={{ background: 'var(--border)', borderRadius: 4, height: 12, width: '60%' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.45; }
        }
      `}</style>
    </div>
  )
}
