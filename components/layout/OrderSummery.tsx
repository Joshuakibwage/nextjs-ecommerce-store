// Reusable order summary
import {
    Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { ShoppingBag } from 'lucide-react'


const OrderSummary = ({ items, subtotal }: {
  items: ReturnType<typeof useCartStore>['items']
  subtotal: number
}) => {
  return (
    <div className="self-start sticky top-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {items.map((item) => {
              const image = item.product?.image_url_array?.[0] ?? null
              const name = item.product?.name ?? 'Unknown Product'
              const price = Number(item.product?.offer_price ?? item.product?.price) || 0
              return (
                <div key={item.id} className="flex gap-3 items-center">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    {image ? (
                      <Image src={image} alt={name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag size={16} className="text-muted-foreground opacity-40" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground line-clamp-1">{name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-xs font-semibold text-foreground">
                    KSh {(price * item.quantity).toLocaleString()}
                  </p>
                </div>
              )
            })}
          </div>
          <Separator />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>KSh {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <Badge variant="secondary" className="text-xs">Free</Badge>
            </div>
          </div>
          <Separator />
          <div className="flex justify-between font-bold text-foreground">
            <span>Total</span>
            <span>KSh {subtotal.toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


export default OrderSummary;