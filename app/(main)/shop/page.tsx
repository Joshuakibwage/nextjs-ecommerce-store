'use client'

import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getCategories, getSubcategories, getSubcategoryProducts } from '@/lib/queries'
import Image from "next/image"

export default function ShopPage() {
  const params = useSearchParams()
  const categorySlug = params.get('category')
  const subSlug = params.get('sub')

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



  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Shop</h1>
      <p>Category: {categorySlug}</p>
      <p>Subcategory: {subSlug}</p>

      {isLoading && <p>Loading products...</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {products?.map((product) => (
          <div key={product.id} className="border rounded-lg p-3">
            {product.image_url_array?.[0] && (
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
            )}
            <p className="font-medium text-sm">{product.name}</p>
            <div className="flex items-center gap-2 mt-1">
              {product.offer_price ? (
                <>
                  <span className="text-primary font-bold">KSh {product.offer_price}</span>
                  <span className="text-muted-foreground line-through text-xs">KSh {product.price}</span>
                </>
              ) : (
                <span className="font-bold">KSh {product.price}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}