'use client'
import { useQuery } from '@tanstack/react-query'
import { getCategories, getSubcategories, getSubcategoryProducts } from '@/lib/queries'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'
import { Category, Subcategory } from "@/types";


// Single product card in the scroll row
const ScrollProductCard = ({ product, categorySlug }: {
  product: {
    id: string
    name: string
    price: number
    offer_price?: number | null
    image_url_array?: string[] | null
  }
  categorySlug: string
}) => {
  const image = Array.isArray(product.image_url_array) && product.image_url_array[0]?.trim()
    ? product.image_url_array[0]
    : `https://picsum.photos/seed/${product.id}/400/300`

  return (
    <Link
      href={`/product/${product.id}`}
      className="shrink-0 w-40 group"
    >
      <div className="relative w-40 h-40 rounded-xl overflow-hidden bg-muted mb-2">
        <Image
          src={image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <p className="text-xs font-medium text-foreground line-clamp-2 leading-snug">
        {product.name}
      </p>
      <p className="text-xs text-primary font-semibold mt-0.5">
        {process.env.NEXT_PUBLIC_CURRENCY}
        {product.offer_price ?? product.price}
      </p>
    </Link>
  )
}

// Row of products for a single subcategory
const SubcategoryRow = ({
  subcategory,
  categorySlug,
}: {
  subcategory: Subcategory
  categorySlug: string
}) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  const { data: products, isLoading } = useQuery({
    queryKey: ['products', subcategory.id],
    queryFn: () => getSubcategoryProducts(subcategory.id, { onlyActive: true, limit: 10 }),
    enabled: !!subcategory.id,
    staleTime: 1000 * 60 * 60,
  })

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' })
  }

  if (!isLoading && (!products || products.length === 0)) return null

  return (
    <div className="mb-8">
      {/* Subcategory header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {/* <div className="w-1.5 h-1.5 rounded-full bg-primary" /> */}
          <h3 className="text-sm font-medium text-foreground">{subcategory.name}</h3>
        </div>
        <Link
          href={`/shop?category=${categorySlug}&sub=${subcategory.slug}`}
          className="text-xs text-primary hover:underline flex items-center gap-1"
        >
          View all <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Scrollable product row */}
      <div className="relative group/row">
        {/* Left arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-7 h-7 rounded-full bg-background border border-border shadow-sm flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity"
        >
          <ChevronLeft className="w-3.5 h-3.5 text-foreground" />
        </button>

        {/* Scroll container */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide pb-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {isLoading
            ? [...Array(6)].map((_, i) => (
                <div key={i} className="shrink-0 w-40">
                  <div className="w-40 h-40 rounded-xl bg-muted animate-pulse mb-2" />
                  <div className="h-3 bg-muted rounded animate-pulse w-3/4 mb-1" />
                  <div className="h-3 bg-muted rounded animate-pulse w-1/3" />
                </div>
              ))
            : products?.map((product) => (
                <ScrollProductCard
                  key={product.id}
                  product={product}
                  categorySlug={categorySlug}
                />
              ))
          }
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-7 h-7 rounded-full bg-background border border-border shadow-sm flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity"
        >
          <ChevronRight className="w-3.5 h-3.5 text-foreground" />
        </button>
      </div>
    </div>
  )
}

// Full category section with its subcategory rows
const CategorySection = ({ category }: { category: Category }) => {
  const { data: subcategories, isLoading } = useQuery({
    queryKey: ['subcategories', category.id],
    queryFn: () => getSubcategories(category.id),
    staleTime: 1000 * 60 * 60 * 24,
  })

  return (
    <div className="py-10 border-b border-border last:border-b-0">
      {/* Category header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-xl">{category.emoji}</span>
          <h2 className="font-serif text-2xl md:text-3xl italic font-semibold text-foreground">
            {category.name}
          </h2>
        </div>
        <Link
          href={`/categories/${category.slug}`}
          className="flex items-center gap-1.5 text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors group"
        >
          Browse all
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Subcategory rows */}
      {isLoading ? (
        <div className="space-y-6">
          {[...Array(2)].map((_, i) => (
            <div key={i}>
              <div className="h-4 bg-muted rounded animate-pulse w-32 mb-4" />
              <div className="flex gap-3">
                {[...Array(5)].map((_, j) => (
                  <div key={j} className="shrink-0 w-40">
                    <div className="w-40 h-40 rounded-xl bg-muted animate-pulse mb-2" />
                    <div className="h-3 bg-muted rounded animate-pulse w-3/4 mb-1" />
                    <div className="h-3 bg-muted rounded animate-pulse w-1/3" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        subcategories?.map((sub: Subcategory) => (
          <SubcategoryRow
            key={sub.id}
            subcategory={sub}
            categorySlug={category.slug}
          />
        ))
      )}
    </div>
  )
}

// Main export
export default function DepartmentPreview() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 60 * 24,
  })

  return (
    <section className="w-[90%] mx-auto py-8">
      {isLoading ? (
        <div className="space-y-12">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="py-8 border-b border-border">
              <div className="h-8 bg-muted rounded animate-pulse w-40 mb-6" />
              <div className="flex gap-3">
                {[...Array(5)].map((_, j) => (
                  <div key={j} className="shrink-0 w-40">
                    <div className="w-40 h-40 rounded-xl bg-muted animate-pulse mb-2" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        categories?.map((category: Category) => (
          <CategorySection key={category.id} category={category} />
        ))
      )}
    </section>
  )
}