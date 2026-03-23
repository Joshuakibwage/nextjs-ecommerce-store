// components/layout/Footer.tsx
import Link from "next/link"
import { ShoppingBag, Instagram, Twitter, Facebook, Youtube, Mail, MapPin, Phone } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      
      {/* Top band */}
      <div className="bg-primary text-primary-foreground py-4 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-sm font-medium tracking-widest uppercase">Free shipping on orders over KSh 5,000</p>
          <p className="text-sm font-medium tracking-widest uppercase">New arrivals every week</p>
          <p className="text-sm font-medium tracking-widest uppercase">Secure payments</p>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand */}
        <div className="flex flex-col gap-5 md:col-span-1">
          <Link href="/" className="flex items-center gap-2">
            <ShoppingBag className="text-primary" size={26} />
            <span className="text-2xl font-bold tracking-tight text-foreground">
              Kona<span className="text-primary">Shop</span>
            </span>
          </Link>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Your go-to destination for quality products delivered right to your door, anywhere in Kenya.
          </p>
          {/* Socials */}
          <div className="flex items-center gap-3 mt-2">
            {[
              { icon: Instagram, href: "#" },
              { icon: Twitter, href: "#" },
              { icon: Facebook, href: "#" },
              { icon: Youtube, href: "#" },
            ].map(({ icon: Icon, href }, i) => (
              <Link
                key={i}
                href={href}
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              >
                <Icon size={16} />
              </Link>
            ))}
          </div>
        </div>

        {/* Shop */}
        <div className="flex flex-col gap-4">
          <p className="text-foreground font-semibold text-sm tracking-widest uppercase">Shop</p>
          <div className="flex flex-col gap-2.5">
            {["New Arrivals", "Best Sellers", "Electronics", "Fashion", "Home & Living", "Offers"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-muted-foreground hover:text-primary text-sm transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        {/* Help */}
        <div className="flex flex-col gap-4">
          <p className="text-foreground font-semibold text-sm tracking-widest uppercase">Help</p>
          <div className="flex flex-col gap-2.5">
            {["FAQ", "Track Order", "Returns & Refunds", "Shipping Info", "Size Guide", "Contact Us"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-muted-foreground hover:text-primary text-sm transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-4">
          <p className="text-foreground font-semibold text-sm tracking-widest uppercase">Contact</p>
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <MapPin size={16} className="text-primary mt-0.5 shrink-0" />
              <p className="text-muted-foreground text-sm">Nairobi, Kenya<br />Westlands, Waiyaki Way</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-primary shrink-0" />
              <p className="text-muted-foreground text-sm">+254 700 000 000</p>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-primary shrink-0" />
              <p className="text-muted-foreground text-sm">hello@konashop.co.ke</p>
            </div>
          </div>

          {/* Newsletter */}
          <div className="mt-2">
            <p className="text-sm font-medium text-foreground mb-2">Subscribe to our newsletter</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 text-sm px-3 py-2 rounded-md border border-border bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button className="px-3 py-2 bg-primary text-primary-foreground text-sm rounded-md hover:opacity-90 transition-opacity">
                Join
              </button>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Bottom bar */}
      <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-muted-foreground text-xs">
          © {new Date().getFullYear()} KonaShop. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
            <Link
              key={item}
              href="#"
              className="text-muted-foreground hover:text-primary text-xs transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>

    </footer>
  )
}

export default Footer