"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SearchIcon, CircleUser, ShoppingBag, Heart, Menu, X } from "lucide-react";
import { ModeToggle } from "@/components/layout/ModeToggle";
import { usePathname } from "next/navigation";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useCartStore } from "@/store/cartStore";

const navItems = [
  { label: "Home", link: "/" },
  { label: "Categories", link: "/categories" },
  { label: "About", link: "/about" },
  { label: "Contact", link: "/contact" }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const items = useCartStore(s => s.items)
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`w-full sticky top-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-background/80 backdrop-blur-md border-b border-border shadow-sm'
        : 'bg-background border-b border-transparent'
    }`}>
      <div className="w-[90%] mx-auto">
        <nav className="relative flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center transition-transform group-hover:scale-105">
              <ShoppingBag className="text-primary-foreground" size={16} />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              Kona<span className="text-primary">Shop</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.link}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  pathname === item.link
                    ? 'text-primary bg-primary/8'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {item.label}
                {pathname === item.link && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center gap-2">
            <InputGroup className="w-56">
              <InputGroupInput placeholder="Search..." className="text-sm" />
              <InputGroupAddon>
                <SearchIcon size={15} className="text-muted-foreground" />
              </InputGroupAddon>
            </InputGroup>

            <div className="flex items-center gap-1 ml-1">
              <Link
                href="/favorites"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <Heart size={18} />
              </Link>

              <Link
                href="/cart"
                className="relative w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <ShoppingBag size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </Link>

              <Link
                href="/account"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <CircleUser size={18} />
              </Link>

              <div className="w-px h-5 bg-border mx-1" />
              <ModeToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu — untouched */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-t border-border z-40 shadow-sm">
          <ul className="flex flex-col p-4 gap-1">
            {navItems.map((item, idx) => (
              <li key={idx}>
                <Link
                  href={item.link}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between text-sm font-medium text-foreground py-3 px-4 rounded-lg hover:bg-muted transition-colors group"
                >
                  {item.label}
                  <span className="text-muted-foreground text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="px-4 pb-2">
            <div className="h-px bg-border" />
          </div>

          <div className="px-4 py-3">
            <InputGroup>
              <InputGroupInput placeholder="Search products..." />
              <InputGroupAddon>
                <SearchIcon className="text-muted-foreground" />
              </InputGroupAddon>
            </InputGroup>
          </div>

          <div className="px-4 pb-2">
            <div className="h-px bg-border" />
          </div>

          <div className="px-4 py-3 pb-5 flex items-center justify-around">
            {[
              { icon: Heart, label: 'Wishlist' },
              { icon: ShoppingBag, label: 'Cart' },
              { icon: CircleUser, label: 'Account' },
            ].map(({ icon: Icon, label }) => (
              <button
                key={label}
                className="flex flex-col items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors group"
              >
                <div className="p-2.5 rounded-xl bg-muted group-hover:bg-accent transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] tracking-widest uppercase">{label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;