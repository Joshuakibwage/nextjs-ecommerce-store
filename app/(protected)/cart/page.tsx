"use client";
import React, { useEffect, useState } from 'react';
import { ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { createClient } from '@/lib/supabase/client';
import Image from 'next/image';

const CartPage = () => {
  const { items, loading, removeItem, updateQuantity, clearCart } = useCartStore()
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    createClient().auth.getUser().then(({ data: { user } }) => {
      if (user) setUserId(user.id)
    })
  }, [])

  const total = items.reduce((sum, item) => {
    const price = Number(item.product?.offer_price ?? item.product?.price) || 0
    return sum + price * item.quantity
  }, 0)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 text-muted-foreground py-32 min-h-screen">
        <ShoppingBag size={48} className="opacity-60" />
        <p className="text-lg font-medium">Your Cart is empty!</p>
        <Button variant="outline" asChild>
          <Link href="/categories">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 min-h-screen md:py-32">

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Your Cart</h1>
        <button
          onClick={() => userId && clearCart(userId)}
          className="text-sm text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
        >
          Clear all
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const image = item.product?.image_url_array?.[0] ?? null
            const name = item.product?.name ?? 'Unknown Product'
            const price = Number(item.product?.offer_price ?? item.product?.price) || 0

            return (
              <div
                key={item.id}
                className="flex gap-4 bg-background border border-border rounded-2xl p-4 items-center"
              >
                {/* Image */}
                <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                  {image ? (
                    <Image
                      src={image}
                      alt={name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ShoppingBag size={24} className="text-muted-foreground opacity-40" />
                    </div>
                  )}
                </div>

                {/* Name & Price */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground truncate">{name}</p>
                  <p className="text-primary font-medium text-sm mt-1">
                    KSh {(price * item.quantity).toLocaleString()}
                  </p>
                  {item.product?.offer_price != null && (
                    <p className="text-xs text-muted-foreground line-through">
                      KSh {Number(item.product.price).toLocaleString()}
                    </p>
                  )}
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => userId && updateQuantity(userId, item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted cursor-pointer hover:scale-105 transition-transform"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                  <button
                    onClick={() => userId && updateQuantity(userId, item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted cursor-pointer hover:scale-105 transition-transform"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Remove */}
                <button
                  onClick={() => userId && removeItem(userId, item.id)}
                  className="text-muted-foreground hover:text-destructive ml-2 cursor-pointer hover:scale-110 transition-transform"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )
          })}
        </div>

        {/* Order Summary */}
        <div className="self-start sticky top-6 bg-background border border-border rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Order summary</h2>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Subtotal ({items.length} {items.length === 1 ? 'item' : 'items'})</span>
            <span>KSh {total.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Shipping</span>
            <span className="text-green-600 font-medium">Free</span>
          </div>
          <div className="border-t border-border pt-4 flex justify-between font-bold text-foreground">
            <span>Total</span>
            <span>KSh {total.toLocaleString()}</span>
          </div>
          <Button className="w-full" asChild>
            <Link href="/checkout">Proceed to checkout</Link>
          </Button>
        </div>

      </div>
    </div>
  )
}

export default CartPage