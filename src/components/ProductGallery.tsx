'use client'

import { useState } from 'react'
import Image from 'next/image'

type GalleryImage = { url: string; altText: string | null }

export default function ProductGallery({ images, title }: { images: GalleryImage[]; title: string }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = images[activeIndex] ?? null

  return (
    <div style={{ position: 'sticky', top: 100 }}>
      {/* Main image */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '1',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          borderRadius: 8,
          overflow: 'hidden',
        }}
      >
        {active ? (
          <Image
            src={active.url}
            alt={active.altText ?? title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full" style={{ fontSize: 80, opacity: 0.1 }}>
            🍬
          </div>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar" style={{ marginTop: 10 }}>
          {images.slice(0, 6).map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`View image ${i + 1}`}
              style={{
                position: 'relative',
                width: 68,
                height: 68,
                borderRadius: 6,
                overflow: 'hidden',
                border: `1.5px solid ${i === activeIndex ? 'var(--accent)' : 'var(--border)'}`,
                flexShrink: 0,
                background: 'var(--bg-secondary)',
                padding: 0,
                cursor: 'pointer',
                transition: 'border-color 150ms ease',
              }}
            >
              <Image src={img.url} alt={img.altText ?? ''} fill className="object-cover" sizes="68px" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
