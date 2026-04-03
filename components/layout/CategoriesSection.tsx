'use client';
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getCategories, getSubcategories } from '@/lib/queries'
import { queryKeys } from '@/lib/queryKeys'
import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"

const CategoriesSection = () => {
  const queryClient = useQueryClient()

  const { data: categories, isLoading } = useQuery({
    queryKey: queryKeys.categories.all,
    queryFn: getCategories,
    staleTime: 1000 * 60 * 60 * 24,
  })

  if (isLoading) return <div>Loading...</div>

  return (
    <section className=" py-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-3 h-105">
        {categories?.map((category, i) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className={i === 0 || i === 3 ? "row-span-2" : ""}            
            onMouseEnter={() => {
              queryClient.prefetchQuery({
                queryKey: queryKeys.subcategories.byCategory(category.id),
                queryFn: () => getSubcategories(category.id),
                staleTime: 1000 * 60 * 60 * 24,
              })
            }}
          >
            <Card className="relative h-full overflow-hidden p-0 group border-0">
              <Image
                src={category.image_url ?? `https://picsum.photos/seed/${category.slug}/800/600`}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/65 to-black/10" />
              <div className="absolute bottom-0 left-0 p-4">
                <p className="text-white font-medium text-base leading-tight">
                  {category.emoji} {category.name}
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default CategoriesSection