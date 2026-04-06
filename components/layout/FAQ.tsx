'use client'
import { useState } from 'react'
import { Plus, X } from 'lucide-react'

const faqs = [
  {
    q: "How long does delivery take?",
    a: "We offer same-day delivery for orders placed before 12pm within Nairobi, and next-day delivery for all other orders. Orders outside Nairobi typically arrive within 2–3 business days.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept M-Pesa, Visa, and Mastercard. All payments are processed securely. M-Pesa is our most popular option and requires no card details whatsoever.",
  },
  {
    q: "Can I return or exchange a product?",
    a: "Yes. You have 7 days from the date of delivery to return any item in its original condition. Contact our support team and we'll arrange a pickup at no extra cost.",
  },
  {
    q: "Is shipping free?",
    a: "Shipping is free on all orders within Nairobi. For orders outside Nairobi, a flat delivery fee applies depending on your location, shown at checkout.",
  },
  {
    q: "How do I track my order?",
    a: "Once your order is confirmed you'll receive an SMS and email with a tracking link. You can also view your order status anytime from the Orders section in your account.",
  },
  {
    q: "Are the products authentic?",
    a: "Absolutely. Every product on KonaShop is sourced directly from verified suppliers and brand partners. We have a strict quality control process before anything goes live.",
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="w-[90%] mx-auto py-20">
      <div className="text-center mb-12">
        <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4 flex items-center justify-center gap-3 before:block before:w-7 before:h-px before:bg-border after:block after:w-7 after:h-px after:bg-border">
          Common Questions
        </p>
        <h2 className="font-serif text-3xl md:text-4xl italic font-semibold text-foreground">
          Good to know
        </h2>
      </div>

      <div className="max-w-2xl mx-auto divide-y divide-border border-y border-border">
        {faqs.map((faq, i) => (
          <div key={i}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between gap-4 py-5 text-left group"
            >
              <span className="text-sm font-medium text-foreground">
                {faq.q}
              </span>
              <span className="w-6 h-6 rounded-full border border-border flex items-center justify-center flex-shrink-0 group-hover:bg-muted transition-colors">
                {open === i
                  ? <X className="w-3 h-3 text-muted-foreground" />
                  : <Plus className="w-3 h-3 text-muted-foreground" />
                }
              </span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${
              open === i ? 'max-h-48 pb-5' : 'max-h-0'
            }`}>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                {faq.a}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}