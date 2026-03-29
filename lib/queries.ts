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



export const getSubcategoryProducts = async (
  subcategoryId: string,
  options?: {
    onlyActive?: boolean;
    onlyFeatured?: boolean;
    limit?: number;
  }
) => {
  const supabase = createClient();

  let query = supabase
    .from("products")
    .select(`
      id, name, slug, description, price, offer_price,
      image_url_array, quantity, category_id, subcategory_id,
      brand_id, rating, rating_count, is_featured, is_active, created_at
    `)
    .eq("subcategory_id", subcategoryId);

  if (options?.onlyActive) query = query.eq("is_active", true);
  if (options?.onlyFeatured) query = query.eq("is_featured", true);
  if (options?.limit) query = query.limit(options.limit);

  const { data, error } = await query.order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
};