'use client'

import { useRef, useEffect, useState } from 'react'

interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
  style?: React.CSSProperties
}

export default function ScrollReveal({ children, delay = 0, className, style }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.01, rootMargin: '0px 0px -20px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: !mounted || visible ? 1 : 0,
        transform: !mounted || visible ? 'translateY(0px)' : 'translateY(28px)',
        transition: mounted ? `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms` : 'none',
      }}
    >
      {children}
    </div>
  )
}
