'use client'

const brands = [
  { name: 'BUBS',     desc: 'Gummies & sours' },
  { name: 'Fazer',    desc: 'Chocolate & candy' },
  { name: 'Marabou',  desc: 'Premium chocolate' },
  { name: 'Cloetta',  desc: 'Classic confections' },
  { name: 'Ahlgrens', desc: 'Foam candy' },
  { name: 'Läkerol',  desc: 'Pastilles & mints' },
  { name: 'Malaco',   desc: 'Licorice & gummies' },
  { name: 'OLW',      desc: 'Chips & snacks' },
]

export default function BrandSection() {
  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-4 gap-px"
      style={{
        background: 'var(--border)',
        border: '1px solid var(--border)',
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      {brands.map((brand) => (
        <div
          key={brand.name}
          style={{
            background: 'var(--bg-card)',
            padding: '28px 24px',
            transition: 'background 150ms ease',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'var(--bg-secondary)')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'var(--bg-card)')}
        >
          <p
            style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: 'var(--text)',
              marginBottom: 4,
            }}
          >
            {brand.name}
          </p>
          <p style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
            {brand.desc}
          </p>
        </div>
      ))}
    </div>
  )
}
