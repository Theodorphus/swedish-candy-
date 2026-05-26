'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const brands = [
  { name: 'BUBS',      desc: 'Foam & sour gummies',   badge: 'Since 1996',      logo: 'bubs.png',      accent: '#9B2248' },
  { name: 'Malaco',    desc: 'Gummies & licorice',     badge: 'Since 1953',      logo: 'malaco.png',    accent: '#7D1A38' },
  { name: 'Matthijs',  desc: 'Skull candy & jellies',  badge: 'Factory partner', logo: 'matthijs.png',  accent: '#2D0B18' },
  { name: 'Vidal',     desc: 'XL sour gummies',        badge: 'Direct import',   logo: 'vidal.png',     accent: '#B8315A' },
  { name: 'Bulgari',   desc: 'Marshmallow & foam',     badge: 'Made in Sweden',  logo: 'bulgari.jpg',   accent: '#5C1528' },
  { name: 'Franssons', desc: 'Foam & fizzy candy',     badge: 'Made in Sweden',  logo: 'franssons.jpg', accent: '#8A1E3C' },
  { name: 'S Marke',   desc: 'Vegan gummies',          badge: '100% Vegan',      logo: 'smarke.png',    accent: '#3D0E1A' },
  { name: 'Grahns',    desc: 'Sour shots',             badge: 'Direct import',   logo: 'grahns.png',    accent: '#C43A62' },
]

function BrandCard({ brand }: { brand: typeof brands[0] }) {
  // Falls back to styled initial if logo file is missing or fails to load
  const [imgError, setImgError] = useState(false)
  const showLogo = !imgError

  return (
    <Link
      href={`/brands/${encodeURIComponent(brand.name)}`}
      style={{
        scrollSnapAlign: 'start',
        flexShrink: 0,
        width: 196,
        height: 176,
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 16,
        padding: '18px 18px 16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-xs)',
        transition: 'box-shadow 200ms ease, transform 200ms ease, border-color 200ms ease',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        textDecoration: 'none',
        color: 'inherit',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget
        el.style.boxShadow = 'var(--shadow-md)'
        el.style.transform = 'translateY(-3px)'
        el.style.borderColor = 'var(--accent)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget
        el.style.boxShadow = 'var(--shadow-xs)'
        el.style.transform = 'translateY(0)'
        el.style.borderColor = 'var(--border)'
      }}
      onFocus={e => {
        const el = e.currentTarget
        el.style.boxShadow = 'var(--shadow-md)'
        el.style.transform = 'translateY(-3px)'
        el.style.borderColor = 'var(--accent)'
      }}
      onBlur={e => {
        const el = e.currentTarget
        el.style.boxShadow = 'var(--shadow-xs)'
        el.style.transform = 'translateY(0)'
        el.style.borderColor = 'var(--border)'
      }}
      aria-label={`${brand.name} — ${brand.desc}`}
    >
      {/* Subtle corner glow in brand accent color */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: 60, height: 60, background: `radial-gradient(circle at top right, ${brand.accent}18 0%, transparent 70%)`, pointerEvents: 'none' }} />

      {/* Logo or styled initial */}
      <div style={{
        width: 52,
        height: 52,
        borderRadius: 10,
        background: showLogo ? 'var(--bg-secondary)' : brand.accent,
        border: showLogo ? '1px solid var(--border)' : 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        flexShrink: 0,
      }}>
        {showLogo ? (
          <Image
            src={`/Sweet logos/${brand.logo}`}
            alt={`${brand.name} logo`}
            width={40}
            height={40}
            style={{ objectFit: 'contain', width: 40, height: 40 }}
            onError={() => setImgError(true)}
          />
        ) : (
          <span style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: 22, fontWeight: 700, color: '#fff', lineHeight: 1 }}>
            {brand.name[0]}
          </span>
        )}
      </div>

      {/* Text block */}
      <div>
        {/* Badge */}
        <span style={{
          display: 'inline-block',
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: '1.2px',
          textTransform: 'uppercase',
          color: 'var(--text-tertiary)',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          padding: '2px 7px',
          borderRadius: 20,
          marginBottom: 6,
        }}>
          {brand.badge}
        </span>

        {/* Brand name */}
        <p style={{
          fontFamily: 'var(--font-playfair), Georgia, serif',
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: 'var(--text)',
          lineHeight: 1.2,
          marginBottom: 2,
        }}>
          {brand.name}
        </p>

        {/* Description */}
        <p style={{ fontSize: 11, color: 'var(--text-tertiary)', letterSpacing: '0.02em' }}>
          {brand.desc}
        </p>
      </div>
    </Link>
  )
}

export default function BrandSection() {
  return (
    <div className="marquee-container">
      <div className="marquee-track">
        {brands.map((brand) => <BrandCard key={brand.name} brand={brand} />)}
        {brands.map((brand) => <BrandCard key={brand.name + '-2'} brand={brand} />)}
      </div>
    </div>
  )
}
