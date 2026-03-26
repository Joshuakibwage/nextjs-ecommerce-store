"use client";

import React, { useState } from "react";
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
  const items = useCartStore(s => s.items)
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const pathname = usePathname()

  return (
    <header className="w-full shadow-sm ">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <nav className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <ShoppingBag className="text-primary" size={26} />
            <span className="text-2xl font-bold tracking-tight text-foreground">
              Kona<span className="text-primary">Shop</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-6 font-medium">
            {navItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.link}
                className={`transition-colors font-medium ${
                  pathname === item.link ? "text-primary font-semibold" : "hover:text-primary/30"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <InputGroup className="w-64">
              <InputGroupInput placeholder="Search products..." />
              <InputGroupAddon>
                <SearchIcon className="text-gray-500" />
              </InputGroupAddon>
            </InputGroup>

            <Link href="/favorites">
              <Heart className="cursor-pointer hover:text-red-500 transition-colors" />
            </Link>

            <Link href="/cart" className="relative">
              <ShoppingBag className="cursor-pointer hover:text-blue-600 transition-colors" />
              {
                cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ">
                      {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )
              }
            </Link>

            <Link href="/account">
              <CircleUser className="cursor-pointer transition-colors" />
            </Link>
            <ModeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-200 z-40">
          <ul className="flex flex-col space-y-4 p-4">
            {navItems.map((item, idx) => (
              <li key={idx}>
                <Link
                  href={item.link}
                  onClick={() => setIsOpen(false)}
                  className="block text-gray-800 font-medium py-2 px-2 rounded hover:bg-gray-100 transition"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-col space-y-3 p-4">
            <InputGroup>
              <InputGroupInput placeholder="Search products..." />
              <InputGroupAddon>
                <SearchIcon className="text-gray-500" />
              </InputGroupAddon>
            </InputGroup>

            <div className="flex justify-around items-center">
              <Heart className="cursor-pointer hover:text-red-500 transition-colors" />
              <ShoppingBag className="cursor-pointer hover:text-blue-600 transition-colors" />
              <CircleUser className="cursor-pointer hover:text-gray-700 transition-colors" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;