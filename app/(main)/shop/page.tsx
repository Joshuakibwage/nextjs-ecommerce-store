'use client'
import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getCategories, getSubcategories, getSubcategoryProducts } from '@/lib/queries'
import { createClient } from '@/lib/supabase/client'
import { useCartStore } from '@/store/cartStore'
import ProductCard, { type ProductCardProduct } from '@/components/layout/ProductCard'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

const PRODUCTS_PER_PAGE = 12

export default function ShopPage() {
  const params = useSearchParams()
  const router = useRouter()
  const categorySlug = params.get('category')
  const subSlug = params.get('sub')
  const currentPage = Number(params.get('page') ?? 1)

  const [wishlist, setWishlist] = useState<string[]>([])
  const addItem = useCartStore(s => s.addItem)

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  const selectedCategory = categories?.find((c) => c.slug === categorySlug)

  const { data: subcategories } = useQuery({
    queryKey: ['subcategories', selectedCategory?.id ?? null],
    queryFn: () => getSubcategories(selectedCategory!.id),
    enabled: !!selectedCategory?.id,
  })

  const selectedSubcategory = subcategories?.find((s) => s.slug === subSlug)

  const { data: products, isLoading } = useQuery({
    queryKey: ['products', selectedSubcategory?.id ?? null],
    queryFn: () => getSubcategoryProducts(selectedSubcategory!.id, { onlyActive: true }),
    enabled: !!selectedSubcategory?.id,
  })

  // Pagination
  const totalPages = Math.ceil((products?.length ?? 0) / PRODUCTS_PER_PAGE)
  const paginatedProducts = products?.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  )

  const goToPage = (page: number) => {
    const newParams = new URLSearchParams(params.toString())
    newParams.set('page', String(page))
    router.push(`?${newParams.toString()}`)
  }

  const toggleWishlist = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault()
    e.stopPropagation()
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>, product: ProductCardProduct) => {
    e.preventDefault()
    e.stopPropagation()
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/login'); return }
    await addItem(user.id, { product_id: product.id, quantity: 1 })
  }

  return (
    <div className="w-[90%] mx-auto py-8">

      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/categories">Categories</BreadcrumbLink>
          </BreadcrumbItem>
          {categorySlug && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/categories/${categorySlug}`}>
                  {selectedCategory?.name ?? categorySlug}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
          {subSlug && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{selectedSubcategory?.name ?? subSlug}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
          {selectedCategory?.name}
        </span>
        <div className="h-px flex-1 bg-border" />
        <h1 className="font-serif text-3xl md:text-4xl font-semibold italic text-foreground">
          {selectedSubcategory?.name ?? 'Shop'}
        </h1>
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs tracking-[0.2em] uppercase text-primary">
          {products?.length ?? 0} Items
        </span>
      </div>

      {/* Loading skeletons */}
      {isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-72 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && products?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-muted-foreground">
          <ShoppingCart size={48} className="opacity-30" />
          <p className="text-lg font-medium">No products found in this subcategory</p>
          <Button variant="outline" onClick={() => router.back()}>Go Back</Button>
        </div>
      )}

      {/* Grid */}
      {!isLoading && paginatedProducts && paginatedProducts.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {paginatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlist.includes(product.id)}
              onWishlistToggle={toggleWishlist}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex flex-col items-center gap-3">
          <p className="text-xs text-muted-foreground tracking-wide">
            Page {currentPage} of {totalPages} — showing {paginatedProducts?.length} of {products?.length} products
          </p>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => { e.preventDefault(); if (currentPage > 1) goToPage(currentPage - 1) }}
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
                      onClick={(e) => { e.preventDefault(); goToPage(page) }}
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
                  onClick={(e) => { e.preventDefault(); if (currentPage < totalPages) goToPage(currentPage + 1) }}
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