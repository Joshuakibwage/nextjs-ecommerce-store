'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'
import { useCheckoutStore } from '@/store/checkoutStore'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { ShoppingBag, ChevronRight } from 'lucide-react'
import OrderSummary from '@/components/layout/OrderSummery';

const CheckoutPage = () => {
  const router = useRouter()
  const { items } = useCartStore()
  const { shipping, setShipping, setOrderId } = useCheckoutStore()
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [form, setForm] = useState(shipping)

  useEffect(() => {
    createClient().auth.getUser().then(({ data: { user } }) => {
      if (!user) { router.push('/login'); return }
      setUserId(user.id)
      if (!form.email) setForm(prev => ({ ...prev, email: user.email ?? '' }))
    })
  }, [router])

  const subtotal = items.reduce((sum, item) => {
    const price = Number(item.product?.offer_price ?? item.product?.price) || 0
    return sum + price * item.quantity
  }, 0)

  const isValid = () =>
    form.full_name.trim() !== '' &&
    form.email.trim() !== '' &&
    form.phone.trim() !== '' &&
    form.address.trim() !== '' &&
    form.city.trim() !== ''

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleContinue = async (): Promise<void> => {
    if (!userId || !isValid()) return
    setIsSubmitting(true)

    const supabase = createClient()

    try {
      // Create order with pending status
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: userId,
          status: 'pending',
          payment_status: 'pending',
          subtotal,
          shipping: 0,
          total: subtotal,
          ...form,
        })
        .select()
        .single()

      if (orderError || !order) throw orderError

      // Create order items
      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        product_name: item.product?.name ?? '',
        product_image: item.product?.image_url_array?.[0] ?? null,
        price: Number(item.product?.offer_price ?? item.product?.price) || 0,
        quantity: item.quantity,
        subtotal: (Number(item.product?.offer_price ?? item.product?.price) || 0) * item.quantity,
      }))

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems)

      if (itemsError) throw itemsError

      // Save to store and move to payment
      setShipping(form)
      setOrderId(order.id)
      router.push(`/checkout/payment?orderId=${order.id}`)
    } catch (err) {
      console.error('Checkout error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 text-muted-foreground py-32">
        <ShoppingBag size={48} className="opacity-60" />
        <p className="text-lg font-medium">Your cart is empty</p>
        <Button variant="outline" asChild>
          <Link href="/categories">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="w-[90%] mx-auto py-8 max-w-6xl min-h-screen">

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="h-px flex-1 bg-border" />
        <h1 className="font-serif text-3xl md:text-4xl font-semibold italic text-foreground">
          Checkout
        </h1>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Steps indicator */}
      <div className="flex items-center justify-center gap-2 mb-10">
        {[
          { label: 'Shipping', active: true, done: false },
          { label: 'Payment', active: false, done: false },
          { label: 'Confirm', active: false, done: false },
        ].map((s, i) => (
          <div key={s.label} className="flex items-center gap-2">
            <div className={`flex items-center gap-2 text-sm font-medium ${
              s.active ? 'text-foreground' : 'text-muted-foreground'
            }`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs border transition-colors ${
                s.active
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border text-muted-foreground'
              }`}>
                {i + 1}
              </div>
              <span className="hidden sm:block">{s.label}</span>
            </div>
            {i < 2 && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Shipping Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">Shipping Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input 
                    id="full_name" 
                    name="full_name" 
                    placeholder="John doe" 
                    value={form.full_name} 
                    onChange={handleChange} 
                    className="rounded-md"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="you@email.com" 
                    value={form.email} 
                    onChange={handleChange} 
                    className="rounded-md "
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    placeholder="+254 700 000 000" 
                    value={form.phone} 
                    onChange={handleChange} 
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="city">City</Label>
                  <Input 
                    id="city" 
                    name="city" 
                    placeholder="Nairobi" 
                    value={form.city} 
                    onChange={handleChange} 
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="address">Address</Label>
                <Input 
                  id="address" 
                  name="address" 
                  placeholder="123 Westlands, Nairobi" 
                  value={form.address} 
                  onChange={handleChange} 
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="country">Country</Label>
                <Input 
                  id="country" 
                  name="country" 
                  value={form.country} 
                  onChange={handleChange} 
                />
              </div>

              <Button
                className="w-full mt-2 cursor-pointer"
                disabled={!isValid() || isSubmitting}
                onClick={handleContinue}
              >
                {isSubmitting ? 'Saving...' : 'Continue to Payment'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <OrderSummary items={items} subtotal={subtotal} />
      </div>
    </div>
  )
};


export default CheckoutPage;

