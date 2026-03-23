import React from 'react';
import Image from 'next/image';
import { ProductParams } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, MapPin, Truck } from "lucide-react";
import StarRating from "@/components/ui/star-rating";

const ProductDetails = ({ product }: { product: ProductParams | null }) => {
  if (!product) return <div className="p-10 text-center">Product not found</div>

  return (
    <div className="w-[90%] mx-auto py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
      
      {/* Left — Image */}
      <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
        <Image
          src={product.image_url_array[0]}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Right — Details */}
      <div className="flex flex-col gap-4">
        
        {/* Name & Badge */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <Badge variant="secondary">In stock: {product.quantity}</Badge>
        </div>

        {/* Rating */}
        <StarRating rating={4} />

        {/* Price */}
        <div className="flex items-center gap-3">
          {product.offer_price ? (
            <>
              <span className="text-2xl font-bold">{process.env.NEXT_PUBLIC_CURRENCY}{product.offer_price}</span>
              <span className="text-lg text-muted-foreground line-through">{process.env.NEXT_PUBLIC_CURRENCY}{product.price}</span>
            </>
          ) : (
            <span className="text-2xl font-bold">{process.env.NEXT_PUBLIC_CURRENCY}{product.price}</span>
          )}
        </div>

        {/* Description */}
        <p className="text-muted-foreground">{product.description}</p>

        {/* Location & Shipping */}
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          {product.location && (
            <span className="flex items-center gap-2">
              <MapPin size={16} /> {product.location}
            </span>
          )}
          {product.product_shipping_fee && (
            <span className="flex items-center gap-2">
              <Truck size={16} /> Shipping: {process.env.NEXT_PUBLIC_CURRENCY} {product.product_shipping_fee}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 mt-4">
          <Button className="w-full flex items-center gap-2 py-2 hover:primary/60">
            <ShoppingCart size={18} /> Add to Cart
          </Button>
          <Button variant="outline" className="py-2">
            <Heart size={18} />
          </Button>
        </div>

      </div>
    </div>
  )
}

export default ProductDetails