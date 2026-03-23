import React from 'react';
import Navbar from '@/components/layout/Navbar.tsx';
import CarouselSlider from '@/components/layout/CarouselSlider.tsx';
import { fetchProducts } from "@/lib/supabase/server";


const page = async() => {
  const allProducts = await fetchProducts();
console.log(allProducts)
  return (
    <main>
      <Navbar />
      <CarouselSlider />
      <HomeProducts products={allProducts} />
    </main>
  )
}

export default page
