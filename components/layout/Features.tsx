const features = [
  {
    title: "Fast Nairobi Delivery",
    text: "Same-day and next-day delivery across Nairobi. Your order, on your doorstep — fast.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-muted-foreground fill-none stroke-[1.5] stroke-round">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    ),
  },
  {
    title: "Secure Checkout",
    text: "M-Pesa and card payments with end-to-end encryption. Your data stays safe.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-muted-foreground fill-none stroke-[1.5]">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
      </svg>
    ),
  },
  {
    title: "24h Support",
    text: "Our team is available around the clock to help with orders, returns, and questions.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-muted-foreground fill-none stroke-[1.5]">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
  {
    title: "Easy Returns",
    text: "Not happy? Return it within 7 days, no questions asked. We make it simple.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-muted-foreground fill-none stroke-[1.5]">
        <polyline points="1 4 1 10 7 10"/>
        <path d="M3.51 15a9 9 0 102.13-9.36L1 10"/>
      </svg>
    ),
  },
  {
    title: "Curated Quality",
    text: "Every product is hand-picked and quality-checked before it goes live on KonaShop.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-muted-foreground fill-none stroke-[1.5]">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
    ),
  },
  {
    title: "Best Prices",
    text: "Competitive local pricing with regular deals and offers exclusively for KonaShop customers.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-muted-foreground fill-none stroke-[1.5]">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
      </svg>
    ),
  },
]

export default function Features() {
  return (
    <section className="w-[90%] mx-auto py-20">
      <div className="text-center mb-12">
        <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4 flex items-center justify-center gap-3 before:block before:w-7 before:h-px before:bg-border after:block after:w-7 after:h-px after:bg-border">
          Why KonaShop
        </p>
        <h2 className="font-serif text-3xl md:text-4xl italic font-semibold text-foreground">
          Built around you
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 divide-x divide-y divide-border border border-border rounded-xl overflow-hidden">
        {features.map((f, i) => (
          <div
            key={i}
            className="p-8 flex flex-col gap-4 bg-background hover:bg-muted/50 transition-colors"
          >
            <div className="w-9 h-9 rounded-lg border border-border flex items-center justify-center">
              {f.icon}
            </div>
            <p className="text-sm font-medium text-foreground">{f.title}</p>
            <p className="text-xs text-muted-foreground leading-relaxed font-light">{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}