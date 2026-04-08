"use client";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import StarRating from "@/components/ui/star-rating";
import { ProductCardProduct } from "@/types";
import { useWishlistStore } from "@/store/wishlistStore";
import { createClient } from "@/lib/supabase/client";

type ProductCardProps = {
  product: ProductCardProduct
  onAddToCart: (e: React.MouseEvent<HTMLButtonElement>, product: ProductCardProduct) => void
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const { isWishlisted, addToWishlist, removeFromWishlist } = useWishlistStore()
  const wishlisted = isWishlisted(product.id)

  const handleWishlistToggle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    if (wishlisted) {
      await removeFromWishlist(user.id, product.id)
    } else {
      await addToWishlist(user.id, product.id)
    }
  }

  return (
    <Link href={`/product/${product.id}`} className="group">
      <Card className="overflow-hidden border-border hover:shadow-lg transition-shadow duration-300 pt-0 gap-0">

        {/* Image */}
        <div className="relative w-full h-56 overflow-hidden bg-muted">
          <Image
            src={
              Array.isArray(product.image_url_array) && product.image_url_array[0]?.trim()
                ? product.image_url_array[0]
                : `https://picsum.photos/seed/${product.id}/400/300`
            }
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors duration-300" />

          {/* Wishlist button */}
          <button
            onClick={handleWishlistToggle}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 z-10"
          >
            <Heart className={`w-4 h-4 transition-colors ${
              wishlisted ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
            }`} />
          </button>

          {product.offer_price != null && (
            <Badge className="absolute top-3 left-3 z-10 text-[10px] tracking-wide">Sale</Badge>
          )}

          {product.quantity != null && (
            <div className="absolute bottom-3 left-3 z-10">
              <Badge
                variant="secondary"
                className="text-xs font-bold backdrop-blur-sm bg-gray-200/30 dark:bg-gray-800/30 text-gray-800 dark:text-gray-200"
              >
                Qty: {product.quantity}
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col gap-2">
          <h3 className="text-sm font-medium text-foreground leading-tight line-clamp-2">
            {product.name}
          </h3>
          <StarRating rating={product.rating ?? 4} />
          {product.description != null && (
            <p className="text-xs text-muted-foreground line-clamp-1 font-light">
              {product.description}
            </p>
          )}
          <div className="flex items-center gap-2 mt-1">
            {product.offer_price != null ? (
              <>
                <span className="text-base font-semibold text-primary">
                  {process.env.NEXT_PUBLIC_CURRENCY}{product.offer_price}
                </span>
                <span className="text-xs text-muted-foreground line-through">
                  {process.env.NEXT_PUBLIC_CURRENCY}{product.price}
                </span>
              </>
            ) : (
              <span className="text-base font-semibold text-foreground">
                {process.env.NEXT_PUBLIC_CURRENCY}{product.price}
              </span>
            )}
          </div>
        </div>

        <CardFooter className="p-2">
          <Button
            className="w-full gap-2 group/btn"
            onClick={(e) => onAddToCart(e, product)}
          >
            <ShoppingCart className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
            Add to Cart
          </Button>
        </CardFooter>

      </Card>
    </Link>
  )
}

export default ProductCard