'use client'

import { useState } from 'react'
import AddToCartButton from './AddToCartButton'

type Variant = {
  id: string
  title: string
  availableForSale: boolean
  price: { amount: string; currencyCode: string }
}

export default function VariantSelector({ variants }: { variants: Variant[] }) {
  const firstAvailable = variants.find((v) => v.availableForSale) ?? variants[0]
  const [selected, setSelected] = useState<Variant>(firstAvailable)

  return (
    <div>
      {variants.length > 1 && (
        <div style={{ marginBottom: 16 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              color: 'var(--text-tertiary)',
              marginBottom: 10,
            }}
          >
            Select variant
          </div>
          <div className="flex flex-col gap-2">
            {variants.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelected(v)}
                disabled={!v.availableForSale}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '11px 16px',
                  background: selected.id === v.id ? 'var(--bg-tertiary)' : 'var(--bg-card)',
                  borderRadius: 10,
                  border: selected.id === v.id
                    ? '1.5px solid var(--accent)'
                    : '1px solid var(--border)',
                  cursor: v.availableForSale ? 'pointer' : 'not-allowed',
                  opacity: v.availableForSale ? 1 : 0.5,
                  fontFamily: 'inherit',
                  textAlign: 'left',
                  width: '100%',
                }}
              >
                <span style={{ fontSize: 13, color: 'var(--text)' }}>
                  {v.title}
                  {!v.availableForSale && (
                    <span style={{ fontSize: 11, color: 'var(--text-tertiary)', marginLeft: 8 }}>
                      Out of stock
                    </span>
                  )}
                </span>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent)' }}>
                  ${parseFloat(v.price.amount).toFixed(2)}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      <AddToCartButton
        variantId={selected.id}
        availableForSale={selected.availableForSale}
      />
    </div>
  )
}
