'use client'
import { useState, useEffect  } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'
import { useCheckoutStore } from '@/store/checkoutStore'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, CreditCard, Smartphone, ChevronRight, Check } from 'lucide-react'

type PaymentMethod = 'mpesa' | 'paystack'

export default function PaymentPage() {
  const router = useRouter()
  const params = useSearchParams()
  const orderId = params.get('orderId')
  const { items, clearCart } = useCartStore()
  const { shipping, reset } = useCheckoutStore()
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('mpesa')
  const [mpesaNumber, setMpesaNumber] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [subtotal, setSubtotal] = useState(0)

  useEffect(() => {
    const total = items.reduce((sum, item) => {
      const price = Number(item.product?.offer_price ?? item.product?.price) || 0
      return sum + price * item.quantity
    }, 0)

    setSubtotal(total)
  }, [items])

  const isValid = () => {
    if (paymentMethod === 'mpesa') return mpesaNumber.trim().length >= 10
    return true
  }

  const handlePay = async () => {
    if (!orderId || !isValid()) return
    setIsSubmitting(true)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/login'); return }

    try {
      // Update order with payment method
      await supabase
        .from('orders')
        .update({
          payment_method: paymentMethod,
          mpesa_number: paymentMethod === 'mpesa' ? mpesaNumber : null,
        })
        .eq('id', orderId)

      if (paymentMethod === 'mpesa') {
        const res = await fetch('/api/mpesa/initiate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone: mpesaNumber, amount: subtotal, orderId }),
        })
        const data = await res.json() as { success: boolean; checkoutRequestId: string }
        if (data.success) {
          await clearCart(user.id)
          reset()
          router.push(`/checkout/verify?orderId=${orderId}&status=success&reference=${data.checkoutRequestId}`)
        }
      } else {
        const res = await fetch('/api/paystack/payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: shipping.email, amount: subtotal, orderId }),
        })
        
        const data = await res.json() as {
          success: boolean
          authorizationUrl: string
          reference: string
        }

        if (data.success && data.authorizationUrl) {
          await clearCart(user.id)
          reset()
          window.location.href = data.authorizationUrl //external redirect
        }
      }
    } catch (err) {
      console.error('Payment error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-[90%] mx-auto py-8 max-w-6xl">

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="h-px flex-1 bg-border" />
        <h1 className="font-serif text-3xl md:text-4xl font-semibold italic text-foreground">
          Payment
        </h1>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Steps */}
      <div className="flex items-center justify-center gap-2 mb-10">
        {[
          { label: 'Shipping', done: true, active: false },
          { label: 'Payment', done: false, active: true },
          { label: 'Confirm', done: false, active: false },
        ].map((s, i) => (
          <div key={s.label} className="flex items-center gap-2">
            <div className={`flex items-center gap-2 text-sm font-medium ${
              s.active ? 'text-foreground' :
              s.done ? 'text-primary' : 'text-muted-foreground'
            }`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs border transition-colors ${
                s.active ? 'bg-primary text-primary-foreground border-primary' :
                s.done ? 'bg-primary/10 border-primary text-primary' :
                'border-border text-muted-foreground'
              }`}>
                {s.done ? <Check className="w-3 h-3" /> : i + 1}
              </div>
              <span className="hidden sm:block">{s.label}</span>
            </div>
            {i < 2 && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">

          {/* Payment method selector */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">Payment Method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPaymentMethod('mpesa')}
                  className={`flex items-center gap-3 p-4 rounded-xl border transition-colors text-left ${
                    paymentMethod === 'mpesa' ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted'
                  }`}
                >
                  <Smartphone className={`w-5 h-5 ${paymentMethod === 'mpesa' ? 'text-primary' : 'text-muted-foreground'}`} />
                  <div>
                    <p className="text-sm font-medium text-foreground">M-Pesa</p>
                    <p className="text-xs text-muted-foreground">Mobile money</p>
                  </div>
                </button>
                <button
                  onClick={() => setPaymentMethod('paystack')}
                  className={`flex items-center gap-3 p-4 rounded-xl border transition-colors text-left ${
                    paymentMethod === 'paystack' ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted'
                  }`}
                >
                  <CreditCard className={`w-5 h-5 ${paymentMethod === 'paystack' ? 'text-primary' : 'text-muted-foreground'}`} />
                  <div>
                    <p className="text-sm font-medium text-foreground">Paystack</p>
                    <p className="text-xs text-muted-foreground">Card / Bank</p>
                  </div>
                </button>
              </div>

              {paymentMethod === 'mpesa' && (
                <div className="space-y-3">
                  <div className="bg-muted/50 border border-border rounded-xl p-4 text-sm text-muted-foreground leading-relaxed">
                    Enter your M-Pesa number. You will receive a payment prompt on your phone to complete the transaction.
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="mpesa_number">M-Pesa Number</Label>
                    <Input
                      id="mpesa_number"
                      placeholder="07XX XXX XXX"
                      value={mpesaNumber}
                      onChange={(e) => setMpesaNumber(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'paystack' && (
                <div className="bg-muted/50 border border-border rounded-xl p-4 text-sm text-muted-foreground leading-relaxed">
                  You will be redirected to Paystack&apos;s secure checkout to complete your payment via card or bank transfer.
                </div>
              )}

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" asChild>
                  <Link href="/checkout">Back</Link>
                </Button>
                <Button
                  className="flex-1"
                  disabled={subtotal <= 0 || !isValid() || isSubmitting}
                  onClick={handlePay}
                >
                  {
                    isSubmitting
                      ? 'Processing...'
                      : subtotal > 0
                        ? `Pay KSh ${subtotal.toLocaleString()}`
                        : 'Loading...'
                  }
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Delivery summary + order summary */}
        <div className="self-start sticky top-6 space-y-4">

          {/* Delivering to */}
          <Card>
            <CardContent className="pt-4 space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Delivering to</p>
              <p className="text-sm font-medium text-foreground">{shipping.full_name}</p>
              <p className="text-xs text-muted-foreground">{shipping.address}</p>
              <p className="text-xs text-muted-foreground">{shipping.city}, {shipping.country}</p>
              <p className="text-xs text-muted-foreground">{shipping.phone}</p>
              <Link href="/checkout" className="text-xs text-primary hover:underline mt-1 block">
                Edit
              </Link>
            </CardContent>
          </Card>

          {/* Order summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
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
      </div>
    </div>
  )
}