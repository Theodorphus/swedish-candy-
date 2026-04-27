import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--bg)' }}>
      <div
        className="section-px content-max"
        style={{ paddingTop: 56, paddingBottom: 56 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-10 sm:gap-16">

          {/* Brand */}
          <div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: '-0.3px',
                marginBottom: 12,
                color: 'var(--text)',
              }}
            >
              Sweden<span style={{ color: 'var(--accent)' }}>Sweet</span>
            </div>
            <p
              style={{
                fontSize: 13,
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                maxWidth: 260,
              }}
            >
              B2B wholesale Swedish candy for US retailers and distributors.
              500+ SKUs, competitive pricing, fast fulfillment.
            </p>
          </div>

          {/* Links */}
          <div>
            <p
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: 'var(--text-tertiary)',
                marginBottom: 16,
              }}
            >
              Navigation
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Catalog', href: '/catalog' },
                { label: 'Apply', href: '/apply' },
                { label: 'Contact', href: '/contact' },
                { label: 'Terms', href: '/terms' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="nav-link"
                    style={{ fontSize: 13 }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Warehouses */}
          <div>
            <p
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: 'var(--text-tertiary)',
                marginBottom: 16,
              }}
            >
              Warehouses
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div>
                <p style={{ fontSize: 13, color: 'var(--text)', marginBottom: 1 }}>🇺🇸 Chicago, IL</p>
                <p style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>3–5 day shipping</p>
              </div>
              <div>
                <p style={{ fontSize: 13, color: 'var(--text)', marginBottom: 1 }}>🇸🇪 Sweden</p>
                <p style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>Full assortment</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            marginTop: 48,
            paddingTop: 20,
            borderTop: '1px solid var(--border-light)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
            © {new Date().getFullYear()} SwedenSweet
          </span>
          <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
            $300 MOQ · USD · B2B only
          </span>
        </div>
      </div>
    </footer>
  )
}
