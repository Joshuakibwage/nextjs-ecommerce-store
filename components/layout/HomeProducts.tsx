"use client";
import React, { useState } from 'react';
import Image from "next/image";
import { ProductParams } from "@/types";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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

  // pagination logic
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
    if (!user) {
      router.push('/login')
      return
    }
    await addItem(user.id, {
      product_id: String(product.id),
      quantity: 1,
    })
  }

  return (
    <div className="w-full">
      <div className="w-[90%] mx-auto py-4">
        <p className="text-2xl md:text-3xl font-semibold">All Products</p>
      </div>

      <div className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {paginatedProducts.map((product) => (
          <Link href={`product/${product.id}`} key={product.id}>
            <Card className="relative mx-auto w-full max-w-sm pt-0">
              {/* image container */}
              <div className="relative w-full h-48 shrink-0 overflow-hidden group">
                <div className="absolute inset-0 z-30 bg-black/35" />
                <Image
                  src={
                    Array.isArray(product.image_url_array) && product.image_url_array[0]?.trim()
                      ? product.image_url_array[0]
                      : `https://placehold.co/400x300?text=${encodeURIComponent(product.name)}`
                  }
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardAction>
                  <Badge variant="secondary">Qty: {product.quantity}</Badge>
                </CardAction>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {product.description}
                </CardDescription>
                <StarRating rating={4} />
              </CardHeader>
              <CardFooter className="flex justify-between items-center">
                <div>
                  <span className="text-lg font-semibold">
                    {process.env.NEXT_PUBLIC_CURRENCY}{product.price}
                  </span>
                </div>
                <Button
                  className="flex gap-2"
                  onClick={(e) => handleAddToCart(e, product)}
                >
                  Add to Cart
                  <ShoppingCart />
                </Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-8 mb-4">
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
      )}
    </div>
  )
}

export default HomeProducts