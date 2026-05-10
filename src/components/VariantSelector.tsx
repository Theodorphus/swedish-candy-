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
  const [selected, setSelected] = useState<Variant | undefined>(firstAvailable)

  if (!selected) return null

  return (
    <div className="flex flex-col gap-3">
      {variants.length > 1 && (
        <div>
          <p className="text-[10px] font-bold tracking-[1.8px] uppercase text-[var(--text-tertiary)] mb-2.5">
            Select variant
          </p>
          <div className="flex flex-col gap-1.5">
            {variants.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelected(v)}
                disabled={!v.availableForSale}
                className={`flex items-center justify-between w-full px-4 py-3 border text-left transition-all duration-150 ${
                  selected.id === v.id
                    ? 'border-[var(--accent)] bg-[var(--accent-light)]'
                    : 'border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent)]'
                } ${!v.availableForSale ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <span className="text-[13px] text-[var(--text)]">
                  {v.title}
                  {!v.availableForSale && (
                    <span className="text-[11px] text-[var(--text-tertiary)] ml-2">Out of stock</span>
                  )}
                </span>
                <span className="text-[13px] font-semibold text-[var(--accent)]">
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
