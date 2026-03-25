"use client"

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useCartStore } from "@/store/cartStore";


export default function CartProvider ({ children }: { children: React.ReactNode }) {
    const fetchCart = useCartStore(s => s.fetchCart )

    useEffect(() => {
        const supabase = createClient()
        supabase.auth.getUser().then(({ data: { user }}) => {
            if( user ) fetchCart(user.id)
        })
    }, [ fetchCart ])

    return <>{children}</>
}