import Link from 'next/link'

function VisaIcon() {
  return (
    <svg width="38" height="24" viewBox="0 0 38 24" fill="none" className="opacity-60">
      <rect width="38" height="24" rx="3" fill="#f0f0f0"/>
      <text x="19" y="16" textAnchor="middle" fontSize="10" fontWeight="700" fontFamily="Arial" fill="#1A1F71">VISA</text>
    </svg>
  )
}

function MastercardIcon() {
  return (
    <svg width="38" height="24" viewBox="0 0 38 24" fill="none" className="opacity-60">
      <rect width="38" height="24" rx="3" fill="#f0f0f0"/>
      <circle cx="14" cy="12" r="6" fill="#EB001B" opacity="0.9"/>
      <circle cx="24" cy="12" r="6" fill="#F79E1B" opacity="0.9"/>
      <path d="M19 7.5a6 6 0 0 1 0 9 6 6 0 0 1 0-9z" fill="#FF5F00"/>
    </svg>
  )
}

function AchIcon() {
  return (
    <svg width="38" height="24" viewBox="0 0 38 24" fill="none" className="opacity-60">
      <rect width="38" height="24" rx="3" fill="#f0f0f0"/>
      <text x="19" y="16" textAnchor="middle" fontSize="9" fontWeight="700" fontFamily="Arial" fill="#2A4E6E">ACH</text>
    </svg>
  )
}

const navLinks = [
  { label: 'USA Catalog', href: '/catalog/usa' },
  { label: 'Sweden Catalog', href: '/catalog/sweden' },
  { label: 'Apply', href: '/apply' },
  { label: 'Contact', href: '/contact' },
]

const legalLinks = [
  { label: 'Terms', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Refund Policy', href: '/refund-policy' },
  { label: 'Shipping Policy', href: '/shipping-policy' },
]

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg)]">
      <div className="section-px content-max" style={{ paddingTop: 64, paddingBottom: 48 }}>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="text-[17px] font-semibold tracking-tight mb-3 text-[var(--text)]">
              Sweden<span className="text-[var(--accent)]">Sweet</span>
            </div>
            <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed max-w-[220px] mb-5">
              B2B wholesale Swedish candy for US retailers and distributors.
            </p>
            {/* Trust badges */}
            <div className="flex items-center gap-2 mb-3">
              <VisaIcon />
              <MastercardIcon />
              <AchIcon />
            </div>
            <p className="text-[11px] text-[var(--text-tertiary)] flex items-center gap-1.5">
              <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L2 4v4c0 3.3 2.5 6.4 6 7.2C12 14.4 14 11.3 14 8V4L8 1z" stroke="currentColor" strokeWidth="1.4" fill="none"/>
              </svg>
              Secure checkout by Shopify
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[10px] font-bold tracking-[2px] uppercase text-[var(--text-tertiary)] mb-4">
              Navigation
            </p>
            <ul className="flex flex-col gap-2.5 list-none">
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="nav-link text-[13px]">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-[10px] font-bold tracking-[2px] uppercase text-[var(--text-tertiary)] mb-4">
              Legal
            </p>
            <ul className="flex flex-col gap-2.5 list-none">
              {legalLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="nav-link text-[13px]">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Warehouses */}
          <div>
            <p className="text-[10px] font-bold tracking-[2px] uppercase text-[var(--text-tertiary)] mb-4">
              Fulfillment
            </p>
            <div className="flex flex-col gap-5">
              <div className="border-l-2 border-[var(--accent)] pl-3">
                <p className="text-[13px] font-medium text-[var(--text)] mb-0.5">🇺🇸 Chicago, IL</p>
                <p className="text-[12px] text-[var(--text-secondary)]">3–5 day domestic shipping</p>
                <p className="text-[11px] text-[var(--text-tertiary)] mt-0.5">Core assortment · Fast fulfillment</p>
              </div>
              <div className="border-l-2 border-[var(--sand)] pl-3">
                <p className="text-[13px] font-medium text-[var(--text)] mb-0.5">🇸🇪 Sweden</p>
                <p className="text-[12px] text-[var(--text-secondary)]">500+ SKU full assortment</p>
                <p className="text-[11px] text-[var(--text-tertiary)] mt-0.5">International shipping available</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-5 border-t border-[var(--border-light)] flex flex-wrap justify-between items-center gap-3">
          <span className="text-[12px] text-[var(--text-tertiary)]">
            © {new Date().getFullYear()} SwedenSweet · Gramlux Foods AB
          </span>
          <span className="text-[12px] text-[var(--text-tertiary)]">
            $300 MOQ · USD · B2B only
          </span>
        </div>
      </div>
    </footer>
  )
}
