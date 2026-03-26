'use client';
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getCategories } from '@/lib/queries'
import { queryKeys } from '@/lib/queryKeys'
import Link from "next/link";

import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


const CategoriesSection = () => {
    const queryClient = useQueryClient();

    const { data: categories, isLoading: loadingCategories } = useQuery({
        queryKey: queryKeys.categories.all,
        queryFn: getCategories,
        staleTime: 1000 * 60 * 60 * 24
    });

    if (loadingCategories) return <div>Loading...</div>

    return (
        <section className="">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {
                    categories?.map(( category ) => { 
                        return (
                            <Link key={category.id} href={`/categories/${category.slug}`}>
                                <Card
                                    className="cursor-pointer hover:shadow-md transition "
                                    onMouseEnter={() => {
                                        queryClient.prefetchQuery({
                                            queryKey: queryKeys.subcategories.byCategory(category.id),
                                            queryFn: () => getSubcategories(category.id),
                                            staleTime: 1000 * 60 * 60 * 24,
                                        })
                                    }}
                                >
                                    <CardHeader 
                                        className="flex items-center gap-2"
                                    >
                                        <span>{category.emoji}</span>
                                        <CardTitle className="text-center">{category.name}</CardTitle>
                                    </CardHeader>
                                </Card>
                            </Link>
                        )
                    })
                }
            </div>

        
        </section>
    )
}

export default CategoriesSection;
