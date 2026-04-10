'use client'
import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Check, X, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

type VerifyStatus = 'verifying' | 'success' | 'failed'

const VerifyPage = () => {
  const params = useSearchParams()
  const router = useRouter()
  const orderId = params.get('orderId')
  const reference = params.get('reference') ?? params.get('trxref')

  const [verifyStatus, setVerifyStatus] = useState<VerifyStatus>('verifying')

  useEffect(() => {
    if (!reference) {
      router.push('/')
      return
    }

    const verify = async () => {
        const res = await fetch('/api/paystack/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reference, orderId }),
        })
        const data = await res.json() as { success: boolean }
        setVerifyStatus(data.success ? 'success' : 'failed')
    }

    verify()
  }, [reference, orderId, router])

  return (
    <div className="w-[90%] mx-auto min-h-screen max-w-lg py-20 px-4">

      {/* Steps indicator */}
      <div className="flex items-center justify-center gap-2 mb-10">
        {[
          { label: 'Shipping', done: true },
          { label: 'Payment', done: true },
          { label: 'Confirm', done: verifyStatus === 'success' },
        ].map((s, i) => (
          <div key={s.label} className="flex items-center gap-2">
            <div className={`flex items-center gap-2 text-sm font-medium ${
              i === 2 ? 'text-foreground' : 'text-primary'
            }`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs border transition-colors ${
                i === 2 && verifyStatus === 'verifying'
                  ? 'border-border text-muted-foreground'
                  : i === 2 && verifyStatus === 'failed'
                  ? 'bg-destructive/10 border-destructive text-destructive'
                  : 'bg-primary/10 border-primary text-primary'
              }`}>
                {i < 2
                  ? <Check className="w-3 h-3" />
                  : verifyStatus === 'verifying'
                  ? 3
                  : verifyStatus === 'success'
                  ? <Check className="w-3 h-3" />
                  : <X className="w-3 h-3" />
                }
              </div>
              <span className="hidden sm:block">{s.label}</span>
            </div>
            {i < 2 && <span className="text-muted-foreground">›</span>}
          </div>
        ))}
      </div>

      <Card>
        <CardContent className="pt-10 pb-10 flex flex-col items-center gap-6 text-center">

          {/* Verifying */}
          {verifyStatus === 'verifying' && (
            <>
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
              </div>
              <div>
                <h1 className="font-serif text-2xl font-bold text-foreground mb-2">
                  Verifying Payment
                </h1>
                <p className="text-sm text-muted-foreground">
                  Please wait while we confirm your payment...
                </p>
              </div>
            </>
          )}

          {/* Success */}
          {verifyStatus === 'success' && (
            <>
              <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary flex items-center justify-center">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="font-serif text-2xl font-bold text-foreground mb-2">
                  Order Confirmed!
                </h1>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Thank you for shopping with KonaShop. Your order is being processed and you&apos;ll receive updates via email.
                </p>
              </div>
              {orderId && (
                <div className="w-full bg-muted/50 border border-border rounded-xl p-4 text-left">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Order ID</p>
                  <p className="text-sm font-mono text-foreground break-all">{orderId}</p>
                </div>
              )}
              {reference && (
                <div className="w-full bg-muted/50 border border-border rounded-xl p-4 text-left">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Payment Reference</p>
                  <p className="text-sm font-mono text-foreground break-all">{reference}</p>
                </div>
              )}
              <div className="flex gap-3 w-full pt-2">
                <Button variant="outline" className="flex-1" asChild>
                  <Link href="/">Back to Home</Link>
                </Button>
                <Button className="flex-1" asChild>
                  <Link href="/orders">View Orders</Link>
                </Button>
              </div>
            </>
          )}

          {/* Failed */}
          {verifyStatus === 'failed' && (
            <>
              <div className="w-16 h-16 rounded-full bg-destructive/10 border border-destructive flex items-center justify-center">
                <X className="w-8 h-8 text-destructive" />
              </div>
              <div>
                <h1 className="font-serif text-2xl font-bold text-foreground mb-2">
                  Payment Failed
                </h1>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Something went wrong with your payment. Your order has not been confirmed. Please try again.
                </p>
              </div>
              {orderId && (
                <div className="w-full bg-muted/50 border border-border rounded-xl p-4 text-left">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Order ID</p>
                  <p className="text-sm font-mono text-foreground break-all">{orderId}</p>
                </div>
              )}
              <div className="flex gap-3 w-full pt-2">
                <Button variant="outline" className="flex-1" asChild>
                  <Link href="/">Back to Home</Link>
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => router.push(`/checkout/payment?orderId=${orderId}`)}
                >
                  Try Again
                </Button>
              </div>
            </>
          )}

        </CardContent>
      </Card>
    </div>
  )
}


export default VerifyPage;