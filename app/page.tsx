import React from 'react';
import CarouselSlider from '@/components/layout/CarouselSlider.tsx';
import { fetchProducts } from "@/lib/supabase/server";
import HomeProducts from "@/components/layout/HomeProducts";


const page = async() => {

  const allProducts = await fetchProducts();
  

  return (
    <main>
      <CarouselSlider />
      <HomeProducts products={allProducts} />
    </main>
  )
}

export default page
