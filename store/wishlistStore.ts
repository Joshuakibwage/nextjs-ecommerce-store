import { create } from 'zustand'
import { createClient } from '@/lib/supabase/client'
import { WishlistProduct, WishlistItem, WishlistStore } from "@/types";


export const useWishlistStore = create<WishlistStore>((set, get) => ({
  items: [],
  loading: false,

  fetchWishlist: async (userId) => {
    const supabase = createClient()
    set({ loading: true })
    const { data, error } = await supabase
      .from('wishlists')
      .select(`*, product:products(id, name, price, offer_price, image_url_array, description, rating, slug)`)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    if (!error && data) set({ items: data as WishlistItem[] })
    set({ loading: false })
  },

  addToWishlist: async (userId, productId) => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('wishlists')
      .insert({ user_id: userId, product_id: productId })
      .select(`*, product:products(id, name, price, offer_price, image_url_array, description, rating, slug)`)
      .single()
    if (!error && data) set({ items: [data as WishlistItem, ...get().items] })
  },

  removeFromWishlist: async (userId, productId) => {
    const supabase = createClient()
    const { error } = await supabase
      .from('wishlists')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId)
    if (!error) set({ items: get().items.filter(i => i.product_id !== productId) })
  },

  isWishlisted: (productId) => get().items.some(i => i.product_id === productId),
}))