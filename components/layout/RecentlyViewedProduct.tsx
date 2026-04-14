"use client";
import { useEffect, useState } from "react";
import { addRecentlyViewed, getRecentlyViewed } from "@/lib/recentlyViewed";
import ProductCard from "@/components/layout/ProductCard";
import type { ProductCardProduct } from "@/types"


export default function RecentlyViewedProduct({ product }: { product: ProductCardProduct }) {
  const [recentProducts, setRecentProducts] = useState<ProductCardProduct[]>([]);

  useEffect(() => {
    if (!product) return; // safeguard
    addRecentlyViewed(product); 
    const recent = getRecentlyViewed().filter(( p: ProductCardProduct) => p.id !== product.id );

    setTimeout(() => {
        setRecentProducts(recent);
    }, 0);
   
  }, [product]);

  if (!recentProducts.length) return null;

  return (
    <section className="my-10 w-[90%] mx-auto">
      <h2 className="text-xl font-serif font-bold mb-4">Recently Viewed</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {
          recentProducts.map((p) => (
            <ProductCard 
              key={p.id} 
              product={p} 
              onAddToCart={(product) => addToCart(product)}
            />
          ))
        }
      </div>
    </section>
  );
}