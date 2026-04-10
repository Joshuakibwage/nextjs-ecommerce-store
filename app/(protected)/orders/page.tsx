'use client'
import { useEffect, useState } from 'react'
import OrderCard from "@/components/layout/OrderCard";
import { Button } from '@/components/ui/button'
import { Package } from 'lucide-react'
import Link from 'next/link'
import { getOrders } from "@/lib/orders";


const OrdersPage = () => {

  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await getOrders();

      if( data ) setOrders(data);

      setLoading(false);
    }

    fetchOrders()
  }, [])

  if (loading) {
    return (
      <div className="w-[90%] mx-auto max-w-3xl py-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-border" />
          <h1 className="font-serif text-3xl italic font-semibold text-foreground">My Orders</h1>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-40 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="w-[90%] mx-auto max-w-3xl py-8 min-h-screen">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-border" />
          <h1 className="font-serif text-3xl italic font-semibold text-foreground">My Orders</h1>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-muted-foreground">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <Package className="w-7 h-7 opacity-40" />
          </div>
          <p className="text-lg font-medium text-foreground">No orders yet</p>
          <p className="text-sm text-muted-foreground">
            When you place an order it will appear here.
          </p>
          <Button asChild>
            <Link href="/categories">Start Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-[90%] mx-auto max-w-3xl py-8 pb-16">
      <div className="flex items-center gap-4 mb-2">
        <div className="h-px flex-1 bg-border" />
        <h1 className="font-serif text-3xl italic font-semibold text-foreground">My Orders</h1>
        <div className="h-px flex-1 bg-border" />
      </div>
      <p className="text-center text-xs text-muted-foreground tracking-widest uppercase mb-8">
        {orders.length} {orders.length === 1 ? 'order' : 'orders'}
      </p>

      <div className="space-y-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  )
}


export default OrdersPage;