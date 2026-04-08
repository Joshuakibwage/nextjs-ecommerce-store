'use client'
import { useState, useEffect, useRef, useCallback } from "react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { SearchIcon, X } from "lucide-react"
import { getProducts } from "@/lib/queries"
import type { Product } from "@/types"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function SearchBar() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [results, setResults] = useState<Product[]>([])
  const [activeIndex, setActiveIndex] = useState(-1)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(console.error)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = useCallback((searchTerm: string) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (!searchTerm.trim()) {
      setResults([])
      setIsOpen(false)
      return
    }
    timerRef.current = setTimeout(() => {
      const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setResults(filtered)
      setIsOpen(filtered.length > 0)
      setActiveIndex(-1)
    }, 200)
  }, [products])

  useEffect(() => {
    handleSearch(query)
  }, [query, handleSearch])

  const handleSelect = (product: Product) => {
    setQuery("")
    setResults([])
    setIsOpen(false)
    router.push(`/product/${product.id}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveIndex(prev => Math.min(prev + 1, results.length - 1))
    }
    if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIndex(prev => Math.max(prev - 1, -1))
    }
    if (e.key === "Enter") {
      e.preventDefault()
      if (activeIndex >= 0 && results[activeIndex]) {
        handleSelect(results[activeIndex])
      }
    }
    if (e.key === "Escape") {
      setIsOpen(false)
      setActiveIndex(-1)
    }
  }

  const clearSearch = () => {
    setQuery("")
    setResults([])
    setIsOpen(false)
    inputRef.current?.focus()
  }

  return (
    <div className="relative w-56" ref={dropdownRef}>
      <InputGroup>
        <InputGroupInput
          ref={inputRef}
          placeholder="Search..."
          className="text-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => results.length > 0 && setIsOpen(true)}
        />
        <InputGroupAddon>
          {query ? (
            <button onClick={clearSearch}>
              <X size={14} className="text-muted-foreground hover:text-foreground transition-colors" />
            </button>
          ) : (
            <SearchIcon size={15} className="text-muted-foreground" />
          )}
        </InputGroupAddon>
      </InputGroup>

      {isOpen && results.length > 0 && (
        <div className="absolute z-50 w-72 mt-1 bg-background border border-border rounded-xl shadow-md overflow-hidden">

          <div className="px-3 py-2 border-b border-border">
            <p className="text-[10px] tracking-widest uppercase text-muted-foreground">
              {results.length} result{results.length !== 1 ? 's' : ''}
            </p>
          </div>

          <ul className="max-h-72 overflow-y-auto">
            {results.map((product, index) => {
              const image = Array.isArray(product.image_url_array) && product.image_url_array[0]?.trim()
                ? product.image_url_array[0]
                : `https://picsum.photos/seed/${product.id}/400/300`

              return (
                <li
                  key={product.id}
                  className={`flex items-center gap-3 px-3 py-2.5 cursor-pointer transition-colors ${
                    index === activeIndex ? 'bg-muted' : 'hover:bg-muted/50'
                  }`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => handleSelect(product)}
                >
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <Image
                      src={image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-primary font-semibold">
                      {process.env.NEXT_PUBLIC_CURRENCY}
                      {product.offer_price ?? product.price}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>

          {results.length > 5 && (
            <div className="px-3 py-2 border-t border-border">
              <button
                onClick={() => {
                  setIsOpen(false)
                  router.push(`/search?q=${encodeURIComponent(query)}`)
                }}
                className="text-xs text-primary hover:underline w-full text-left"
              >
                See all {results.length} results →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}