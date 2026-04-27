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
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {brands.map((brand) => (
        <div
          key={brand.name}
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderLeft: '3px solid var(--accent)',
            borderRadius: 6,
            padding: '20px 20px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: 17,
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: 'var(--text)',
              marginBottom: 4,
            }}
          >
            {brand.name}
          </p>
          <p style={{ fontSize: 11, color: 'var(--text-tertiary)', letterSpacing: '0.03em' }}>
            {brand.desc}
          </p>
        </div>
      ))}
    </div>
  )
}
