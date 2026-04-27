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
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[var(--border)] border border-[var(--border)]">
      {brands.map((brand) => (
        <div
          key={brand.name}
          className="bg-[var(--bg-card)] px-6 py-7 hover:bg-[var(--bg-secondary)] transition-colors duration-150"
        >
          <p className="font-playfair text-[18px] font-bold tracking-tight text-[var(--text)] mb-1">
            {brand.name}
          </p>
          <p className="text-[12px] text-[var(--text-tertiary)]">
            {brand.desc}
          </p>
        </div>
      ))}
    </div>
  )
}
