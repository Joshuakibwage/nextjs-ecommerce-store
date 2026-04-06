"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { useCartStore } from "@/store/cartStore";
import { createClient } from "@/lib/supabase/client";
import ProductCard from "@/components/layout/ProductCard";
import { ProductCardProduct } from "@/types";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";


const HomeProductsSkeleton = () => {
  return (
    <div className="w-full pb-16">

      {/* Header */}
      <div className="w-[90%] mx-auto py-8">
        <div className="flex items-center gap-4">
          <div className="h-3 w-24 bg-muted rounded animate-pulse" />
          <div className="h-px flex-1 bg-muted" />
          <div className="h-8 w-40 bg-muted rounded animate-pulse" />
          <div className="h-px flex-1 bg-muted" />
          <div className="h-3 w-16 bg-muted rounded animate-pulse" />
        </div>
      </div>

      {/* Grid */}
      <div className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="space-y-3">
            
            {/* Image */}
            <div className="w-full aspect-4/5 bg-muted rounded-xl animate-pulse" />

            {/* Title */}
            <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />

            {/* Price */}
            <div className="h-4 w-1/3 bg-muted rounded animate-pulse" />

            {/* Button */}
            <div className="h-9 w-full bg-muted rounded-lg animate-pulse" />
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="w-[90%] mx-auto mt-10 flex flex-col items-center gap-3">
        <div className="h-3 w-52 bg-muted rounded animate-pulse" />

        <div className="flex items-center gap-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-8 w-8 rounded-md bg-muted animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  )
}


const PRODUCTS_PER_PAGE = 8

const HomeProducts = ({ products }: { products: ProductCardProduct[] }) => {
  const router = useRouter()
  const addItem = useCartStore(s => s.addItem)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE)
  const paginatedProducts = products.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  )

  const handleAddToCart = async (
    e: React.MouseEvent<HTMLButtonElement>,
    product: ProductCardProduct
  ) => {
    e.preventDefault()
    e.stopPropagation()
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/login'); return }
    await addItem(user.id, { product_id: product.id, quantity: 1 })
  }

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) return <HomeProductsSkeleton />

  return (
    <div className="w-full pb-16">

      {/* Header */}
      <div className="w-[90%] mx-auto py-8">
        <div className="flex items-center gap-4">
          <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
            Trending Now
          </span>
          <div className="h-px flex-1 bg-border" />
          <h2 className="font-serif text-3xl md:text-4xl font-semibold italic text-foreground">
            All Products
          </h2>
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs tracking-[0.2em] uppercase text-primary">
            {products.length} Items
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {paginatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="w-[90%] mx-auto mt-10 flex flex-col items-center gap-3">
          <p className="text-xs text-muted-foreground tracking-wide">
            Page {currentPage} of {totalPages} — showing {paginatedProducts.length} of {products.length} products
          </p>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => { e.preventDefault(); if (currentPage > 1) setCurrentPage(p => p - 1) }}
                  aria-disabled={currentPage === 1}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                const showPage = page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1
                const showEllipsisBefore = page === currentPage - 2 && currentPage > 3
                const showEllipsisAfter = page === currentPage + 2 && currentPage < totalPages - 2

                if (showEllipsisBefore || showEllipsisAfter) {
                  return (
                    <PaginationItem key={`ellipsis-${page}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )
                }
                if (!showPage) return null
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => { e.preventDefault(); setCurrentPage(page) }}
                      isActive={page === currentPage}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              })}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => { e.preventDefault(); if (currentPage < totalPages) setCurrentPage(p => p + 1) }}
                  aria-disabled={currentPage === totalPages}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}

export default HomeProducts