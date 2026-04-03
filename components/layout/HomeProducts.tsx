"use client";
import React, { useState } from 'react';
import Image from "next/image";
import { ProductParams } from "@/types";
import { ShoppingCart, Heart } from "lucide-react";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardFooter,
} from "@/components/ui/card"
import StarRating from "@/components/ui/star-rating";
import { useCartStore } from "@/store/cartStore";
import { createClient } from "@/lib/supabase/client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const PRODUCTS_PER_PAGE = 8

const HomeProducts = ({ products }: { products: ProductParams[] }) => {
  const router = useRouter();
  const addItem = useCartStore(s => s.addItem);
  const [currentPage, setCurrentPage] = useState(1)
  const [wishlist, setWishlist] = useState<string[]>([])

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE)
  const paginatedProducts = products.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  )

  async function handleAddToCart(e: React.MouseEvent, product: ProductParams) {
    e.preventDefault()
    e.stopPropagation()
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/login'); return }
    await addItem(user.id, { product_id: String(product.id), quantity: 1 })
  }

  const toggleWishlist = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    e.stopPropagation()
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }

  return (
    <div className="w-full pb-16">

      {/* Header */}
      <div className="w-[90%] mx-auto py-8">
        <div className="flex items-center gap-4">
          <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Trending Now</span>
          <div className="h-px flex-1 bg-border" />
          <h2 className="font-serif text-3xl md:text-4xl font-semibold italic text-foreground">All Products</h2>
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs tracking-[0.2em] uppercase text-primary">{products.length} Items</span>
        </div>
      </div>

      {/* Grid */}
      <div className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {paginatedProducts.map((product) => (
          <Link href={`product/${product.id}`} key={product.id} className="group">
            <Card className="overflow-hidden border-border hover:shadow-lg transition-shadow duration-300 pt-0 gap-0">

              {/* Image */}
              <div className="relative w-full h-56 overflow-hidden bg-muted">
                <Image
                  src={
                    Array.isArray(product.image_url_array) && product.image_url_array[0]?.trim()
                      ? product.image_url_array[0]
                      : `https://picsum.photos/seed/${product.id}/400/300`
                  }
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                />

                {/* Overlay actions */}
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors duration-300" />

                {/* Wishlist */}
                <button
                  onClick={(e) => toggleWishlist(e, product.id)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 z-10"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      wishlist.includes(product.id)
                        ? 'fill-red-500 text-red-500'
                        : 'text-muted-foreground'
                    }`}
                  />
                </button>

                {/* Badge */}
                {product.offer_price && (
                  <Badge className="absolute top-3 left-3 z-10 text-[10px] tracking-wide">
                    Sale
                  </Badge>
                )}

                {/* Stock badge */}
                <div className="absolute bottom-3 left-3 z-10">
                  <Badge variant="secondary" className="text-[10px] backdrop-blur-sm bg-background/70">
                    Qty: {product.quantity}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-medium text-foreground leading-tight line-clamp-2 flex-1">
                    {product.name}
                  </h3>
                </div>

                <StarRating rating={product.rating ?? 4} />

                <p className="text-xs text-muted-foreground line-clamp-1 font-light">
                  {product.description}
                </p>

                {/* Price */}
                <div className="flex items-center gap-2 mt-1">
                  {product.offer_price ? (
                    <>
                      <span className="text-base font-semibold text-primary">
                        {process.env.NEXT_PUBLIC_CURRENCY}{product.offer_price}
                      </span>
                      <span className="text-xs text-muted-foreground line-through">
                        {process.env.NEXT_PUBLIC_CURRENCY}{product.price}
                      </span>
                    </>
                  ) : (
                    <span className="text-base font-semibold text-foreground">
                      {process.env.NEXT_PUBLIC_CURRENCY}{product.price}
                    </span>
                  )}
                </div>
              </div>

              <CardFooter className="px-4 pb-4 pt-0">
                <Button
                  className="w-full gap-2 group/btn"
                  onClick={(e) => handleAddToCart(e, product)}
                >
                  <ShoppingCart className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
                  Add to Cart
                </Button>
              </CardFooter>

            </Card>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="w-[90%] mx-auto mt-10 flex flex-col items-center gap-3">
          <p className="text-xs text-muted-foreground tracking-wide">
            Page {currentPage} of {totalPages} showing {paginatedProducts.length} of {products.length} products
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
                  return <PaginationItem key={`ellipsis-${page}`}><PaginationEllipsis /></PaginationItem>
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