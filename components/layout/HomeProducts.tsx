"use client";

import React from 'react';
import Image from "next/image";
import { ProductParams } from "@/types";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import StarRating from "@/components/ui/star-rating";
import { useCartStore } from "@/store/cartStore";
import { createClient } from "@/lib/supabase/client";

const HomeProducts = ( {products}: {products: ProductParams[]}) => {

    const router = useRouter();

    const addItem = useCartStore(s => s.addItem);

    async function handleAddToCart(e: React.MouseEvent, product: ProductParams ) {
      e.preventDefault()
      e.stopPropagation()

      const supabase = createClient()
      const { data: { user }} = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
        return
      }


      await addItem(user.id, {
        product_id: String(product.id),
        quantity: 1,
      })
  }


  return (
    <div className="w-full py-24">

    <div className="w-[90%] mx-auto py-4">
      <p className="text-4xl md:text-5xl font-semibold">Popular Products</p>
    </div>

      <div className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
        {
          products.map((product) => (
            <Link href={`product/${product.id}`} key={product.id} >
              <Card className="relative mx-auto w-full max-w-sm pt-0">
                {/* image container */}
                <div className="relative w-full h-48 shrink-0 overflow-hidden group">
                  <div className="absolute inset-0 z-30 bg-black/35" />
                  <Image
                    src={product.image_url_array[0]}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                  />
                </div>

                <CardHeader>
                  <CardAction>
                    <Badge variant="secondary">Qty: {product.quantity}</Badge>
                  </CardAction>
                  <CardTitle>{product.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {product.description}
                  </CardDescription>
                  <StarRating rating={4} />  
                </CardHeader>
                <CardFooter className="flex justify-between items-center">
                  <div className="">
                    <span className="text-lg font-semibold">{process.env.NEXT_PUBLIC_CURRENCY}{product.price}</span>
                  </div>
                  <Button 
                    className="flex gap-2"
                    onClick={(e) => handleAddToCart(e, product)}
                  >
                    Add to Cart
                    <ShoppingCart />
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default HomeProducts
