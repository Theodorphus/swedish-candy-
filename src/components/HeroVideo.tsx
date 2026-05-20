'use client'

import { useRef, useEffect } from 'react'

const CROSSFADE = 1.4 // seconds before end to start crossfade

export default function HeroVideo({ src = '/hero.mp4', opacity = 0.65 }: { src?: string; opacity?: number }) {
  const OPACITY = opacity
  const aRef = useRef<HTMLVideoElement>(null)
  const bRef = useRef<HTMLVideoElement>(null)
  const activeRef = useRef<'a' | 'b'>('a')
  const fadingRef = useRef(false)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const a = aRef.current
    const b = bRef.current
    if (!a || !b) return

    function crossfade(from: HTMLVideoElement, to: HTMLVideoElement) {
      if (fadingRef.current) return
      fadingRef.current = true

      to.currentTime = 0
      to.play()

      const start = performance.now()

      function tick(now: number) {
        const progress = Math.min((now - start) / (CROSSFADE * 1000), 1)
        from.style.opacity = String((1 - progress) * OPACITY)
        to.style.opacity = String(progress * OPACITY)

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick)
        } else {
          from.pause()
          from.currentTime = 0
          from.style.opacity = '0'
          activeRef.current = activeRef.current === 'a' ? 'b' : 'a'
          fadingRef.current = false
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    function handleTimeUpdate() {
      if (fadingRef.current) return
      const active = activeRef.current === 'a' ? a : b
      const inactive = activeRef.current === 'a' ? b : a
      if (!active || !inactive || !active.duration) return
      if (active.duration - active.currentTime < CROSSFADE) {
        crossfade(active, inactive)
      }
    }

    a.addEventListener('timeupdate', handleTimeUpdate)
    b.addEventListener('timeupdate', handleTimeUpdate)

    return () => {
      a.removeEventListener('timeupdate', handleTimeUpdate)
      b.removeEventListener('timeupdate', handleTimeUpdate)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const videoStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  }

  return (
    <>
      <video ref={aRef} autoPlay muted playsInline loop style={{ ...videoStyle, opacity: OPACITY }}>
        <source src={src} type="video/mp4" />
      </video>
      <video ref={bRef} muted playsInline loop style={{ ...videoStyle, opacity: 0 }}>
        <source src={src} type="video/mp4" />
      </video>
    </>
  )
}
