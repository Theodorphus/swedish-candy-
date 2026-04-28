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

function BrandCard({ brand }: { brand: typeof brands[0] }) {
  return (
    <div
      style={{
        flexShrink: 0,
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderTop: '3px solid var(--accent)',
        borderRadius: 8,
        padding: '18px 24px',
        minWidth: 160,
        transition: 'box-shadow 200ms ease, transform 200ms ease',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.boxShadow = 'var(--shadow-md)'
        el.style.transform = 'translateY(-3px)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.boxShadow = 'none'
        el.style.transform = 'translateY(0)'
      }}
    >
      <p style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: 17, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: 4 }}>
        {brand.name}
      </p>
      <p style={{ fontSize: 11, color: 'var(--text-tertiary)', letterSpacing: '0.03em' }}>
        {brand.desc}
      </p>
    </div>
  )
}

export default function BrandSection() {
  return (
    <div className="marquee-container">
      <div className="marquee-track">
        {brands.map((brand) => <BrandCard key={brand.name} brand={brand} />)}
        {/* duplicate for seamless loop */}
        {brands.map((brand) => <BrandCard key={brand.name + '-2'} brand={brand} />)}
      </div>
    </div>
  )
}
