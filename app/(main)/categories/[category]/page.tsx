"use client";
import React from 'react';
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getCategories, getSubcategories } from "@/lib/queries";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


const SubcategoryPage = () => {

    const { category } = useParams();
    const router = useRouter();

    //get categories
    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
    });

    const selectedCategory = categories?.find(
        (c) => c.slug === category
    );

    //fetch subcategories
    const { data: subcategories, isLoading } = useQuery({
        queryKey: ['subcategories', selectedCategory?.id],
        queryFn: () => getSubcategories(selectedCategory!.id),
        enabled: !!selectedCategory?.id,
    });

    if(!selectedCategory) return <div>Not found</div>

    return (
        <section className="w-full min-h-screen">
            <div className="w-[90%] mx-auto">
                <Breadcrumb className="py-4 md:py-8">
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
                            <BreadcrumbPage> {selectedCategory.emoji} {selectedCategory.name}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                    </Breadcrumb>

                <div>
                    {
                        isLoading ? (
                            <Skeleton className="h-[20px] w-[100px] rounded-full" />
                        ) : (
                            <div 
                                className="grid grid-cols-2 md:grid-cols-7 gap-4"
                            >
                                {
                                    subcategories?.map((sub) => (
                                        <Button 
                                            key={sub.id}
                                            onClick={() => router.push(
                                                `/shop?category=${selectedCategory.slug}&sub=${sub.slug}`
                                            )}
                                            className="hover:bg-primary/90"
                                        >
                                            {sub.name}
                                        </Button>
                                    ))
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </section>
    )
}

export default SubcategoryPage
