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
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Categories</h2>
        <CategoriesSection />
      </div>
      <HomeProducts products={allProducts} />
    </main>
  )
}

export default page
