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



export async function fetchProducts():Promise<ProductParams[]> {
  const supabase = await createClient()

  const { data: products, error } = await supabase
    .from('products')
    .select('*')

  console.log('data:', products)
  console.log('error:', error)  

  if (error) {
    console.error(error)
    return []
  }

  return products ?? []
}



export async function fetchProductById(id: string) {
  const supabase = await createClient();
  console.log('fetching product with id:', id) // ✅ add this
  try {
    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if(error) {
      console.error(error)
      return null;
    }

    return product;
  } catch (error) {
    console.log(error);
    return null;
  }
}