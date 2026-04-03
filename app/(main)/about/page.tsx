import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  return (
    <main className="bg-background text-foreground font-sans overflow-x-hidden">

      {/* Hero */}
      <section className="grid grid-cols-1 md:grid-cols-2 border-b border-border min-h-[60vh]">
        <div className="p-8 md:p-16 border-b md:border-b-0 md:border-r border-border flex flex-col justify-end">
          <p className="text-xs tracking-widest uppercase text-primary mb-6 flex items-center gap-3 before:block before:w-7 before:h-px before:bg-primary">
            Our Story
          </p>
          <h1 className="font-serif text-5xl md:text-7xl leading-none font-bold mb-6">
            Where <em className="italic text-primary">Nairobi</em><br />Meets the<br />World
          </h1>
          <p className="text-sm leading-relaxed text-foreground font-light max-w-md">
            KonaShop was born from a simple belief that quality products and effortless shopping should be accessible to everyone in Kenya and beyond.
          </p>
        </div>
        <div className="relative overflow-hidden bg-muted min-h-75">
          <Image
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200"
            alt="KonaShop"
            fill
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-linear-to-br from-background/40 to-transparent" />
          <div className="absolute bottom-8 right-8 text-right">
            <p className="font-serif text-5xl font-bold text-primary leading-none">2024</p>
            <p className="text-xs tracking-widest uppercase text-muted-foreground mt-1">Est. Nairobi, Kenya</p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="grid grid-cols-[80px_1fr] md:grid-cols-[120px_1fr] border-b border-border">
        <div className="p-6 md:p-12 border-r border-border flex items-start justify-center">
          <span className="text-[10px] tracking-widest uppercase text-muted-foreground [writing-mode:vertical-lr] rotate-180">
            Mission
          </span>
        </div>
        <div className="p-8 md:p-16">
          <p className="font-serif text-2xl md:text-4xl leading-snug font-normal border-l-2 border-primary pl-6 md:pl-8 mb-8 text-foreground">
            &quot;We set out to create more than a shop we built a destination where discovery meets convenience.&quot;
          </p>
          <p className="text-sm leading-relaxed text-foreground font-light max-w-xl">
            From fashion to electronics, beauty to home essentials — every product in our catalogue is carefully selected to meet the needs of modern Kenyan life. We partner with trusted brands and independent suppliers to bring you the best of both worlds: global quality at local prices.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="border-b border-border">
        <div className="flex items-baseline justify-between px-8 md:px-16 py-8 border-b border-border">
          <h2 className="font-serif text-3xl font-normal">What We Stand For</h2>
          <span className="text-xs tracking-widest uppercase text-muted-foreground hidden md:block">Our Values</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {[
            { num: "01", title: "Quality First", text: "Every product is vetted before it reaches our shelves. We don't list it if we wouldn't buy it ourselves." },
            { num: "02", title: "Customer Trust", text: "Transparent pricing, honest descriptions, and a returns process that doesn't give you a headache." },
            { num: "03", title: "Built for Kenya", text: "M-Pesa payments, local delivery partners, and a team that understands the Nairobi lifestyle." },
          ].map((v, i) => (
            <div key={i} className={`p-8 md:p-12 group hover:bg-muted transition-colors ${i < 2 ? 'border-b md:border-b-0 md:border-r border-border' : ''}`}>
              <p className="font-serif text-5xl font-bold text-border group-hover:text-primary transition-colors leading-none mb-6">{v.num}</p>
              <p className="text-xs tracking-widest uppercase text-foreground font-medium mb-3">{v.title}</p>
              <p className="text-sm leading-relaxed text-muted-foreground font-light">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 border-b border-border bg-muted/30">
        {[
          { num: "65+", label: "Products" },
          { num: "6", label: "Categories" },
          { num: "24h", label: "Delivery" },
          { num: "100%", label: "Secure Checkout" },
        ].map((s, i) => (
          <div key={i} className={`py-10 px-8 text-center ${i < 3 ? 'border-r border-border' : ''} ${i < 2 ? 'border-b md:border-b-0' : ''}`}>
            <p className="font-serif text-4xl font-bold text-primary leading-none mb-2">{s.num}</p>
            <p className="text-xs tracking-widest uppercase text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </section>

      {/* Nairobi */}
      <section className="grid grid-cols-1 md:grid-cols-[2fr_1fr] border-b border-border min-h-75">
        <div className="p-8 md:p-16 flex flex-col justify-center border-b md:border-b-0 md:border-r border-border">
          <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-6">
            Proudly <span className="italic text-primary">Nairobi</span><br />Built
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground font-light max-w-lg">
            We&apos;re not a global giant trying to fit into the Kenyan market — we were built here, for here. Our team understands the city, the culture, and what it means to shop with confidence in Kenya.
          </p>
        </div>
        <div className="bg-muted flex items-center justify-center relative min-h-50">
          <div className="relative">
            <div className="w-3 h-3 bg-primary rounded-full" />
            <div className="absolute -inset-2 rounded-full border border-primary/40 animate-ping" />
          </div>
          <p className="absolute bottom-6 left-6 text-xs tracking-widest uppercase text-muted-foreground">
            Nairobi, Kenya
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 px-8 md:px-16 py-20">
        <p className="font-serif text-3xl md:text-5xl font-normal leading-snug max-w-xl">
          Ready to experience shopping <em className="italic text-primary">done right?</em>
        </p>
        <Link
          href="/"
          className="shrink-0 px-10 py-4 bg-primary text-primary-foreground text-xs tracking-widest uppercase font-medium hover:bg-primary/90 transition-colors rounded-3xl"
        >
          Start Shopping
        </Link>
      </section>

    </main>
  )
}