import { createClient } from "@/lib/supabase/client";
import type { Product, Category, Subcategory } from "@/types";


export async function getProducts(): Promise<Products[]> {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('products')
        select(`
            *, 
            category:categories(*),
            subcategory:subcategories(*),
            brand:brands(*)
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false })

    if(error) throw error
    return data ?? []
}


export async function getProductById(id: string): Promise<Product> {
    const supabase = createClient()

    const { data, error } = await supabase
        .from('products')
        .select(`
            *,
            category:categories(*),
            subcategory:subcategories(*),
            brand:brands(*)
        `)
        .eq('id', id)
        .single()

    if (error) throw error
    return data
}


export async function getCategories(): Promise<Category[]> {
    const supabase = createClient()

    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name')

    if (error) throw error
    return data ?? []
}



export async function getSubcategories(categoryId: string): Promise<Subcategory[]> {
    const supabase = createClient()

    const { data, error } = await supabase
        .from('subcategories')
        .select('*')
        .eq('category_id', categoryId)
        .order('name')

    if (error) throw error
    return data ?? []
}


export async function getCart(userId: string) {
    const supabase = createClient()
    
    const { data, error } = await supabase
        .from('cart_items')
        .select(`*, product:products(*)`)
        .eq('user_id', userId)

    if (error) throw error
    return data ?? []
}