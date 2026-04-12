import React, { useState } from 'react';
import { ShoppingBag, Package, ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { OrderItem, Order } from '@/types';


const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  confirmed: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  processing: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  shipped: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
  delivered: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
}

const paymentStatusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  paid: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  failed: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
}


const OrderCard = ({ order }: { order: Order }) => {
  const [expanded, setExpanded] = useState(false)
    return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-muted-foreground" />
              <CardTitle className="text-sm font-medium text-foreground">
                Order
              </CardTitle>
              <span className="text-xs font-mono text-muted-foreground">
                #{order.id.slice(0, 8).toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {new Date(order.created_at).toLocaleDateString('en-KE', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${statusColors[order.status] ?? ''}`}>
              {order.status}
            </span>
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${paymentStatusColors[order.payment_status] ?? ''}`}>
              {order.payment_status}
            </span>
            <Badge variant="outline" className="text-xs capitalize">
              {order.payment_method}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="pt-4 space-y-4">

        {/* Order items preview */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {order.order_items.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className="relative w-14 h-14 rounded-lg overflow-hidden bg-muted flex-shrink-0 border border-border"
            >
              {item.product_image ? (
                <Image
                  src={item.product_image}
                  alt={item.product_name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ShoppingBag size={16} className="text-muted-foreground opacity-40" />
                </div>
              )}
            </div>
          ))}
          {order.order_items.length > 4 && (
            <div className="w-14 h-14 rounded-lg bg-muted border border-border flex-shrink-0 flex items-center justify-center">
              <span className="text-xs text-muted-foreground font-medium">
                +{order.order_items.length - 4}
              </span>
            </div>
          )}
        </div>

        {/* Total */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">
              {order.order_items.length} {order.order_items.length === 1 ? 'item' : 'items'}
            </p>
            <p className="text-base font-semibold text-foreground">
              KSh {order.total.toLocaleString()}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs gap-1"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <>Hide details <ChevronUp className="w-3.5 h-3.5" /></>
            ) : (
              <>View details <ChevronDown className="w-3.5 h-3.5" /></>
            )}
          </Button>
        </div>

        {/* Expanded details */}
        {expanded && (
          <div className="space-y-4 pt-2">
            <Separator />

            {/* Items list */}
            <div className="space-y-3">
              {order.order_items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    {item.product_image ? (
                      <Image
                        src={item.product_image}
                        alt={item.product_name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag size={14} className="text-muted-foreground opacity-40" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground line-clamp-1">
                      {item.product_name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Qty: {item.quantity} × KSh {item.price.toLocaleString()}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-foreground flex-shrink-0">
                    KSh {item.subtotal.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <Separator />

            {/* Price breakdown */}
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>KSh {order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>{order.shipping === 0 ? 'Free' : `KSh ${order.shipping.toLocaleString()}`}</span>
              </div>
              <div className="flex justify-between font-semibold text-foreground pt-1">
                <span>Total</span>
                <span>KSh {order.total.toLocaleString()}</span>
              </div>
            </div>

            <Separator />

            {/* Delivery address */}
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
                Delivering to
              </p>
              <p className="text-sm font-medium text-foreground">{order.full_name}</p>
              <p className="text-xs text-muted-foreground">{order.address}</p>
              <p className="text-xs text-muted-foreground">{order.city}, {order.country}</p>
              <p className="text-xs text-muted-foreground">{order.phone}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}


export default OrderCard;
