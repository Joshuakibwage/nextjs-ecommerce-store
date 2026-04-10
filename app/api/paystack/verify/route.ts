import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const { reference, orderId } = await request.json() as {
    reference: string
    orderId: string
  }

  const res = await fetch(
    `https://api.paystack.co/transaction/verify/${reference}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    }
  )

  const data = await res.json() as {
    status: boolean
    data: { status: string }
  }

  const paid = data.status && data.data.status === 'success'

  if (paid && orderId) {
    const supabase = await createClient()
    await supabase
      .from('orders')
      .update({ payment_status: 'paid', status: 'confirmed' })
      .eq('id', orderId)
  }

  return NextResponse.json({ success: paid })
}