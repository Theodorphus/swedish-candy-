'use client'

import { useState } from 'react'

const faqs = [
  {
    q: 'How do I create a wholesale account?',
    a: "Click \"Create account\" and fill in your business details. Your account is activated immediately — you can start browsing and ordering the same day.",
  },
  {
    q: 'How long does fulfillment take?',
    a: 'Orders from our Santa Fe Springs, CA warehouse ship within 1–2 business days and arrive in 3–5 business days across the USA. Swedish warehouse orders vary by destination.',
  },
  {
    q: 'Do I need to handle customs, FDA paperwork, or tariffs?',
    a: 'No. We take care of the entire import process — FDA requirements, customs clearance, and tariffs are all included. You get a simple door-to-door solution with one invoice.',
  },
  {
    q: 'What payment terms are available?',
    a: 'Starter accounts: NET-15 after three orders. Preferred: NET-30. Enterprise: NET-45. Credit card accepted on all orders.',
  },
  {
    q: 'Do you offer co-packing or private label?',
    a: 'Yes. Our FDA-approved Santa Fe Springs facility can prepare custom candy mixes under your own brand. You purchase the candy from us, we pack it to your specifications, and deliver finished bags ready for sale. Contact us to discuss your needs.',
  },
  {
    q: 'Can I get custom pricing?',
    a: "Yes. All accounts receive individual pricing based on order volume and product mix. Contact your account manager or apply to get started — we'll tailor pricing to your needs.",
  },
  {
    q: 'Which brands do you carry?',
    a: 'We carry leading Swedish candy brands including BUBS, Malaco, Matthijs, Vidal, Bulgari, Franssons, S Marke, and Grahns. Contact us for the full brand list.',
  },
  {
    q: 'Do you ship outside the USA?',
    a: 'Our USA warehouse ships domestically only. For international orders, contact us — our Swedish warehouse ships to select markets.',
  },
]

export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div>
      {faqs.map((item, i) => (
        <div key={i} className="border-b border-[var(--border)]">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-6 py-7 bg-transparent border-none cursor-pointer text-left font-[inherit] hover:text-[var(--accent)] transition-colors"
          >
            <span className={`text-[15px] font-medium transition-colors duration-150 ${open === i ? 'text-[var(--accent)]' : 'text-[var(--text)]'}`}>
              {item.q}
            </span>
            <span className={`shrink-0 w-6 h-6 flex items-center justify-center border text-[14px] leading-none transition-all duration-150 ${
              open === i
                ? 'border-[var(--accent)] text-[var(--accent)] bg-[var(--accent-light)]'
                : 'border-[var(--border)] text-[var(--text-tertiary)]'
            }`}>
              {open === i ? '−' : '+'}
            </span>
          </button>

          <div
            className="overflow-hidden transition-all duration-200"
            style={{ maxHeight: open === i ? 300 : 0, opacity: open === i ? 1 : 0 }}
          >
            <p className="text-[14px] text-[var(--text-secondary)] leading-[1.9] pb-7 max-w-[560px]">
              {item.a}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
