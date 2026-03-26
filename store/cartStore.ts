import { create } from "zustand";
import { createClient } from "@/lib/supabase/client";
import { CartItem, CartStore } from "@/types";

export const useCartStore = create<CartStore>((set, get) => ({
    items: [],
    loading: false,

    fetchCart: async (userId) => {
        const supabase = createClient();
        set({ loading: true });

        const { data, error } = await supabase
            .from('cart_items')
            .select(`*, product:products(*)`)  
            .eq('user_id', userId)

        if (!error && data) set({ items: data })
        set({ loading: false })
    },

    addItem: async (userId, item) => {
        const supabase = createClient()
        const existing = get().items.find(i => i.product_id === item.product_id)

        if (existing) {
        await get().updateQuantity(userId, existing.id, existing.quantity + 1)
        return
        }

        const { data, error } = await supabase
            .from('cart_items')
            .insert({ user_id: userId, product_id: item.product_id, quantity: item.quantity })
            .select(`*, product:products(*)`)  // ← return with product data
            .single()

        if (!error && data) set({ items: [...get().items, data] })
    },

    removeItem: async (userId, cartItemId) => {
        const supabase = createClient();

        const { error } = await supabase
            .from('cart_items')
            .delete()
            .eq('id', cartItemId)
            .eq('user_id', userId)

        if (!error) set({ items: get().items.filter(i => i.id !== cartItemId) })
    },

    updateQuantity: async (userId, cartItemId, quantity) => {
        if (quantity < 1) return
        const supabase = createClient()
        const { error } = await supabase
            .from('cart_items')
            .update({ quantity })
            .eq('id', cartItemId)
            .eq('user_id', userId)

        if (!error) {
            set({
                items: get().items.map(i =>
                i.id === cartItemId ? { ...i, quantity } : i
                )
            })
        }
    },

    clearCart: async (userId) => {
        const supabase = createClient();

        const { error } = await supabase
            .from('cart_items')
            .delete()
            .eq('user_id', userId)

        if (!error) set({ items: [] })
    }
}))