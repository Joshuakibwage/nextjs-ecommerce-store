'use client'
import React, { useRef } from 'react'
import { useParams, useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { getCategories, getSubcategories, getSubcategoryProducts } from "@/lib/queries"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Subcategory, ProductCardProduct } from "@/types"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

// Single product card in horizontal scroll
const ScrollCard = ({
  product,
  categorySlug,
}: {
  product: ProductCardProduct
  categorySlug: string
}) => {
  const image = Array.isArray(product.image_url_array) && product.image_url_array[0]?.trim()
    ? product.image_url_array[0]
    : `https://picsum.photos/seed/${product.id}/400/300`

  return (
    <Link href={`/product/${product.id}`} className="group shrink-0 w-44">
      <div className="relative w-44 h-44 rounded-xl overflow-hidden bg-muted mb-3">
        <Image
          src={image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors duration-300" />
        {product.offer_price != null && (
          <Badge className="absolute top-2 left-2 text-[10px] tracking-wide">Sale</Badge>
        )}
      </div>
      <p className="text-sm font-medium text-foreground line-clamp-2 leading-snug mb-1">
        {product.name}
      </p>
      <div className="flex items-center gap-2">
        {product.offer_price != null ? (
          <>
            <span className="text-sm font-semibold text-primary">
              {process.env.NEXT_PUBLIC_CURRENCY}{product.offer_price}
            </span>
            <span className="text-xs text-muted-foreground line-through">
              {process.env.NEXT_PUBLIC_CURRENCY}{product.price}
            </span>
          </>
        ) : (
          <span className="text-sm font-semibold text-foreground">
            {process.env.NEXT_PUBLIC_CURRENCY}{product.price}
          </span>
        )}
      </div>
    </Link>
  )
}

// Horizontal scrollable row per subcategory
const SubcategoryRow = ({
  subcategory,
  categorySlug,
  selectedCategory,
}: {
  subcategory: Subcategory
  categorySlug: string
  selectedCategory: { slug: string }
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const router = useRouter()

  const { data: products, isLoading } = useQuery({
    queryKey: ['products', subcategory.id],
    queryFn: () => getSubcategoryProducts(subcategory.id, { onlyActive: true }),
    enabled: !!subcategory.id,
    staleTime: 1000 * 60 * 60,
  })

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({
      left: dir === 'left' ? -320 : 320,
      behavior: 'smooth',
    })
  }

  if (!isLoading && (!products || products.length === 0)) return null

  return (
    <div className="py-8 border-b border-border last:border-b-0">

      {/* Row header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-5 rounded-full bg-primary" />
          <h3 className="text-lg font-semibold text-foreground">{subcategory.name}</h3>
          {!isLoading && products && (
            <span className="text-xs text-muted-foreground tracking-widest uppercase">
              {products.length} items
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs gap-1 text-primary hover:text-primary"
          onClick={() => router.push(
            `/shop?category=${selectedCategory.slug}&sub=${subcategory.slug}`
          )}
        >
          View all <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>

      {/* Scroll container */}
      <div className="relative group/row">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-8 h-8 rounded-full bg-background border border-border shadow-sm flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity"
        >
          <ChevronLeft className="w-4 h-4 text-foreground" />
        </button>

        {isLoading ? (
          <div className="flex gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="shrink-0 w-44">
                <Skeleton className="w-44 h-44 rounded-xl mb-3" />
                <Skeleton className="h-3 w-3/4 mb-2" />
                <Skeleton className="h-3 w-1/3" />
              </div>
            ))}
          </div>
        ) : (
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products?.map((product) => (
              <ScrollCard
                key={product.id}
                product={product}
                categorySlug={categorySlug}
              />
            ))}
          </div>
        )}

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-8 h-8 rounded-full bg-background border border-border shadow-sm flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity"
        >
          <ChevronRight className="w-4 h-4 text-foreground" />
        </button>
      </div>
    </div>
  )
}

// Main page
const SubcategoryPage = () => {
  const params = useParams()
  const category = params.category as string
  const router = useRouter()

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  const selectedCategory = categories?.find((c) => c.slug === category)

  const { data: subcategories, isLoading } = useQuery({
    queryKey: ['subcategories', selectedCategory?.id],
    queryFn: () => getSubcategories(selectedCategory!.id),
    enabled: !!selectedCategory?.id,
  })

  if (!selectedCategory && categories) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4 text-muted-foreground">
        <p className="text-lg font-medium">Category not found</p>
        <Button variant="outline" onClick={() => router.push('/categories')}>
          Browse Categories
        </Button>
      </div>
    )
  }

  return (
    <section className="w-full min-h-screen pb-16">
      <div className="w-[90%] mx-auto">

        {/* Breadcrumb */}
        <Breadcrumb className="py-4 md:py-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/categories">Categories</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {selectedCategory?.emoji} {selectedCategory?.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Category header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px flex-1 bg-border" />
          <h1 className="font-serif text-3xl md:text-4xl italic font-semibold text-foreground">
            {selectedCategory?.emoji} {selectedCategory?.name}
          </h1>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Subcategory filter pills */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {isLoading ? (
            [...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-24 rounded-full" />
            ))
          ) : (
            subcategories?.map((sub) => (
              <button
                key={sub.id}
                onClick={() => {
                  const el = document.getElementById(`sub-${sub.id}`)
                  el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                className="text-xs px-4 py-1.5 rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
              >
                {sub.name}
              </button>
            ))
          )}
        </div>

        {/* Subcategory rows */}
        {isLoading ? (
          <div className="space-y-12">
            {[...Array(3)].map((_, i) => (
              <div key={i}>
                <Skeleton className="h-6 w-40 mb-5" />
                <div className="flex gap-4">
                  {[...Array(5)].map((_, j) => (
                    <div key={j} className="shrink-0 w-44">
                      <Skeleton className="w-44 h-44 rounded-xl mb-3" />
                      <Skeleton className="h-3 w-3/4 mb-2" />
                      <Skeleton className="h-3 w-1/3" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          subcategories?.map((sub) => (
            <div key={sub.id} id={`sub-${sub.id}`}>
              <SubcategoryRow
                subcategory={sub}
                categorySlug={selectedCategory?.slug ?? ''}
                selectedCategory={{ slug: selectedCategory?.slug ?? '' }}
              />
            </div>
          ))
        )}

      </div>
    </section>
  )
}

export default SubcategoryPage