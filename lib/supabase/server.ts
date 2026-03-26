import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { ProductParams } from "@/types";

export async function createClient() {
  const cookieStore = await cookies()

  // Create a server's supabase client with newly configured cookie,
  // which could be used to maintain user's session
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have proxy refreshing
            // user sessions.
          }
        },
      },
    }
  )
};



export async function fetchProducts(): Promise<Product[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(*),
      subcategory:subcategories(*),
      brand:brands(*)
    `)
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error(error)
    return []
  }
  return data ?? []
}

export async function fetchProductById(id: string): Promise<Product | null> {
  const supabase = await createClient()
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

  if (error) {
    console.error(error)
    return null
  }
  return data
}

export async function fetchFeaturedProducts(): Promise<Product[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(*),
      subcategory:subcategories(*),
      brand:brands(*)
    `)
    .eq('is_featured', true)
    .eq('is_active', true)

  if (error) {
    console.error(error)
    return []
  }
  return data ?? []
}

export async function fetchCategories(): Promise<Category[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  if (error) {
    console.error(error)
    return []
  }
  return data ?? []
}

export async function fetchSubcategoriesByCategoryId(categoryId: string): Promise<Subcategory[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('subcategories')
    .select('*')
    .eq('category_id', categoryId)
    .order('name')

  if (error) {
    console.error(error)
    return []
  }
  return data ?? []
}