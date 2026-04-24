import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="section-px flex items-center justify-between py-4" style={{ borderBottom: '0.5px solid var(--border)' }}>
      <Link href="/" style={{ fontSize: 18, fontWeight: 500, textDecoration: 'none', color: 'var(--text)' }}>
        Sweden<span style={{ color: 'var(--accent)' }}>Sweet</span>
      </Link>

      {/* Hidden on mobile — accessible via homepage sections */}
      <ul className="hidden md:flex items-center" style={{ gap: 28, listStyle: 'none' }}>
        <li><Link href="/catalog" style={{ fontSize: 14, color: 'var(--text-secondary)', textDecoration: 'none' }}>Catalog</Link></li>
        <li><a href="/#pricing" style={{ fontSize: 14, color: 'var(--text-secondary)', textDecoration: 'none' }}>Pricing</a></li>
        <li><Link href="/contact" style={{ fontSize: 14, color: 'var(--text-secondary)', textDecoration: 'none' }}>Contact</Link></li>
      </ul>

      <Link href="/apply" style={{ background: 'var(--accent)', color: '#fff', padding: '9px 20px', borderRadius: 6, fontSize: 13, fontWeight: 500, textDecoration: 'none', whiteSpace: 'nowrap' }}>
        Apply for account
      </Link>
    </nav>
  )
}
