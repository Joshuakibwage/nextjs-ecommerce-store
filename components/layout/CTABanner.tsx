import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function CTABanner() {
  return (
    <section className="w-full border-t border-border">
      <div className="w-[90%] mx-auto py-20 flex flex-col md:flex-row items-center justify-between gap-8">

        <div className="flex flex-col gap-3 text-center md:text-left">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground flex items-center justify-center md:justify-start gap-3 before:block before:w-7 before:h-px before:bg-border">
            Ready to shop?
          </p>
          <h2 className="font-serif text-3xl md:text-5xl italic font-semibold text-foreground leading-tight">
            Everything you need,<br className="hidden md:block" /> delivered to your door.
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
          <Button size="lg" className="gap-2 group px-8" asChild>
            <Link href="/categories">
              Shop Now
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="px-8" asChild>
            <Link href="/about">Our Story</Link>
          </Button>
        </div>

      </div>
    </section>
  )
}