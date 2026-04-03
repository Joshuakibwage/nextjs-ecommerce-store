import React from 'react';
import CarouselSlider from '@/components/layout/CarouselSlider.tsx';
import { fetchProducts } from "@/lib/supabase/server";
import HomeProducts from "@/components/layout/HomeProducts";
import CategoriesSection from "@/components/layout/CategoriesSection";


const page = async() => {

  const allProducts = await fetchProducts();
  

  return (
    <main>
      <CarouselSlider />
      <div className="w-[90%] mx-auto my-5 md:my-8">
  <div className="flex items-center gap-4 mb-6">
    <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Explore</span>
    <div className="h-px flex-1 bg-border" />
    <h2 className="font-serif text-3xl md:text-4xl font-semibold italic text-foreground">Categories</h2>
    <div className="h-px flex-1 bg-border" />
    <span className="text-xs tracking-[0.2em] uppercase text-primary">Shop All</span>
  </div>
  <CategoriesSection />
</div>
      <HomeProducts products={allProducts} />
    </main>
  )
}

export default page
