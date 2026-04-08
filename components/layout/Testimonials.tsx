"use client"

const testimonials = [
  {
    name: "Amina sosa",
    location: "Westlands, Nairobi",
    initials: "AK",
    featured: true,
    text: "Ordered on a Friday evening and it was at my door by Saturday morning. The packaging was immaculate and the quality exceeded my expectations. KonaShop is now my go-to.",
  },
  {
    name: "James Mutua",
    location: "Karen, Nairobi",
    initials: "JM",
    featured: false,
    text: "The M-Pesa checkout is seamless. Takes 30 seconds and I get an instant confirmation. Finally an e-commerce platform that understands how Kenyans shop.",
  },
  {
    name: "Faith mwikali",
    location: "Kilimani, Nairobi",
    initials: "FW",
    featured: false,
    text: "The skincare products I ordered were exactly as described. Free shipping sealed the deal for me. I've already recommended KonaShop to my entire group chat.",
  },
]

const Stars = () => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className="w-3 h-3 fill-blue-400" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ))}
  </div>
)

export default function Testimonials() {
  return (
    <section className="w-[90%] mx-auto py-20">
      <div className="text-center mb-12">
        <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4 flex items-center justify-center gap-3 before:block before:w-7 before:h-px before:bg-border after:block after:w-7 after:h-px after:bg-border">
          Customer Stories
        </p>
        <h2 className="font-serif text-3xl md:text-4xl italic font-semibold text-foreground">
          Loved across Nairobi
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className={`flex flex-col gap-4 p-6 rounded-xl border bg-background ${
              t.featured ? 'border-border shadow-sm' : 'border-border'
            }`}
          >
            <Stars />
            <p className="text-sm text-muted-foreground leading-relaxed font-light flex-1">
              &quot;{t.text}&quot;
            </p>
            <div className="flex items-center gap-3 border-t border-border pt-4">
              <div className="w-9 h-9 rounded-full bg-muted border border-border flex items-center justify-center text-xs font-medium text-muted-foreground flex-shrink-0">
                {t.initials}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}