'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useWishlistStore } from '@/store/wishlistStore'
import { useCartStore } from '@/store/cartStore'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingCart, Trash2, PackageSearch } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardFooter } from '@/components/ui/card'
import StarRating from '@/components/ui/star-rating'

export default function FavoritesPage() {
  const router = useRouter()
  const { items, loading, fetchWishlist, removeFromWishlist } = useWishlistStore()
  const { addItem } = useCartStore()
  const [userId, setUserId] = useState<string | null>(null)
  const [addingToCart, setAddingToCart] = useState<string | null>(null)
  const [removing, setRemoving] = useState<string | null>(null)

  useEffect(() => {
    createClient().auth.getUser().then(({ data: { user } }) => {
      if (!user) { router.push('/login'); return }
      setUserId(user.id)
      fetchWishlist(user.id)
    })
  }, [router, fetchWishlist])

  const handleAddToCart = async (productId: string) => {
    if (!userId) return
    setAddingToCart(productId)
    await addItem(userId, { product_id: productId, quantity: 1 })
    setAddingToCart(null)
  }

  const handleRemove = async (productId: string) => {
    if (!userId) return
    setRemoving(productId)
    await removeFromWishlist(userId, productId)
    setRemoving(null)
  }

  // Loading
  if (loading) {
    return (
      <div className="w-[90%] mx-auto py-8 max-w-6xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-border" />
          <h1 className="font-serif text-3xl md:text-4xl font-semibold italic text-foreground">Favourites</h1>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-80 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  // Empty
  if (items.length === 0) {
    return (
      <div className="w-[90%] mx-auto max-w-6xl min-h-screen">
        <div className="flex items-center gap-4 my-8">
          <div className="h-px flex-1 bg-border" />
          <h1 className="font-serif text-3xl md:text-4xl font-semibold italic text-foreground">Favorites</h1>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div className="flex flex-col items-center justify-center py-24 gap-6 text-muted-foreground">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
            <Heart className="w-9 h-9 opacity-30" />
          </div>
          <div className="text-center">
            <p className="text-lg font-medium text-foreground mb-1">Your wishlist is empty</p>
            <p className="text-sm text-muted-foreground">Save items you love and come back to them anytime.</p>
          </div>
          <Button asChild>
            <Link href="/categories">Start Browsing</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-[90%] mx-auto py-8 max-w-6xl pb-16 min-h-screen">

      {/* Header */}
      <div className="flex items-center gap-4 mb-2">
        <div className="h-px flex-1 bg-border" />
        <h1 className="font-serif text-3xl md:text-4xl font-semibold italic text-foreground">
          Favorites
        </h1>
        <div className="h-px flex-1 bg-border" />
      </div>
      <p className="text-center text-xs text-muted-foreground tracking-widest uppercase mb-8">
        {items.length} {items.length === 1 ? 'item' : 'items'} saved
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {items.map((item) => {
          const product = item.product
          const image = product.image_url_array?.[0] ?? null
          const price = product.offer_price ?? product.price
          const isRemoving = removing === product.id
          const isAddingToCart = addingToCart === product.id

          return (
            <div
              key={item.id}
              className={`transition-opacity duration-300 ${isRemoving ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}
            >
              <Link href={`/product/${product.id}`} className="group block">
                <Card className="overflow-hidden border-border hover:shadow-lg transition-shadow duration-300 pt-0 gap-0">

                  {/* Image */}
                  <div className="relative w-full h-56 overflow-hidden bg-muted">
                    {image ? (
                      <Image
                        src={image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <PackageSearch className="w-10 h-10 text-muted-foreground opacity-30" />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors duration-300" />

                    {/* Sale badge */}
                    {product.offer_price != null && (
                      <Badge className="absolute top-3 left-3 z-10 text-[10px] tracking-wide">
                        Sale
                      </Badge>
                    )}

                    {/* Remove button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleRemove(product.id)
                      }}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 z-10 hover:border-destructive hover:text-destructive text-muted-foreground"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    {/* Saved indicator */}
                    <div className="absolute bottom-3 right-3 z-10">
                      <div className="w-7 h-7 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center">
                        <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col gap-2">
                    <h3 className="text-sm font-medium text-foreground leading-tight line-clamp-2">
                      {product.name}
                    </h3>
                    <StarRating rating={product.rating ?? 4} />
                    {product.description && (
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

                  <CardFooter className="px-4 pb-4 pt-0 flex gap-2">
                    <Button
                      className="flex-1 gap-2 group/btn"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleAddToCart(product.id)
                      }}
                      disabled={isAddingToCart}
                    >
                      <ShoppingCart className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
                      {isAddingToCart ? 'Adding...' : 'Add to Cart'}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleRemove(product.id)
                      }}
                      className="hover:border-destructive hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </CardFooter>

                </Card>
              </Link>
            </div>
          )
        })}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 flex flex-col items-center gap-3">
        <p className="text-xs text-muted-foreground tracking-widest uppercase">
          Looking for more?
        </p>
        <Button variant="outline" asChild>
          <Link href="/categories">Continue Browsing</Link>
        </Button>
      </div>

    </div>
  )
}