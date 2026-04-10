import { createClient } from "@/lib/supabase/client"

export const getOrders = async (limit?: number) => {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { data: [], error: "No user" }

  let query = supabase
    .from("orders")
    .select(`*, order_items (*)`)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (limit) query = query.limit(limit)

  const { data, error } = await query

  return { data, error }
}