import Link from 'next/link'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  link?: { label: string; href: string }
}

export default function SectionHeader({ eyebrow, title, subtitle, link }: SectionHeaderProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginBottom: 40,
        flexWrap: 'wrap',
        gap: 12,
      }}
    >
      <div>
        {eyebrow && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <span aria-hidden style={{ display: 'block', width: 24, height: 1, background: 'var(--sand-dark)', opacity: 0.7 }} />
            <p className="eyebrow" style={{ margin: 0 }}>
              {eyebrow}
            </p>
          </div>
        )}
        <h2
          className="display"
          style={{ fontSize: 'clamp(24px, 3vw, 36px)', color: 'var(--text)', letterSpacing: '-0.015em' }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            style={{
              fontSize: 14,
              color: 'var(--text-secondary)',
              marginTop: 8,
              lineHeight: 1.6,
              maxWidth: 440,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
      {link && (
        <Link
          href={link.href}
          style={{
            fontSize: 13,
            color: 'var(--accent)',
            textDecoration: 'none',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          {link.label} →
        </Link>
      )}
    </div>
  )
}
