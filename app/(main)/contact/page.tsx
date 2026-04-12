'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function ContactPage() {
  const [form, setForm] = useState<{ name: string; email: string; subject: string; message: string }>(
    { 
      name: '', 
      email: '', 
      subject: '', 
      message: '' 
    }
  )
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    setStatus('loading')
    const supabase = createClient()
    const { error } = await supabase
      .from('contact_messages')
      .insert([form])
    setStatus(error ? 'error' : 'success')
  }

  return (
    <main className="bg-background text-foreground min-h-screen">

      {/* Header */}
      <section className="grid grid-cols-1 md:grid-cols-2 border-b border-border min-h-[40vh]">
        <div className="p-8 md:p-16 border-b md:border-b-0 md:border-r border-border flex flex-col justify-end">
          <p className="text-xs tracking-widest uppercase text-primary mb-6 flex items-center gap-3 before:block before:w-7 before:h-px before:bg-primary">
            Get In Touch
          </p>
          <h1 className="font-serif text-5xl md:text-7xl leading-none font-bold">
            Let&apos;s <em className="italic text-primary">Talk</em>
          </h1>
        </div>
        <div className="p-8 md:p-16 flex flex-col justify-end">
          <p className="text-sm leading-relaxed text-foreground font-light max-w-md">
            Have a question about an order, a product, or just want to say hello? Our team in Nairobi is ready to help. We typically respond within a few hours.
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr]">

        {/* Info */}
        <div className="p-8 md:p-16 border-b md:border-b-0 md:border-r border-border flex flex-col gap-8">
          {[
            { label: 'Email', value: 'hello@konashop.co.ke' },
            { label: 'Phone', value: '+254 700 000 000' },
            { label: 'Location', value: 'Nairobi, Kenya\nWestlands, 00100' },
          ].map((item, i) => (
            <div key={i}>
              <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">{item.label}</p>
              <p className="text-sm text-foreground font-light whitespace-pre-line">{item.value}</p>
              {i < 2 && <div className="mt-8 h-px bg-border" />}
            </div>
          ))}
          <div className="h-px bg-border" />
          <div>
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4">Business Hours</p>
            {[
              { day: 'Mon – Fri', hours: '8am – 6pm' },
              { day: 'Saturday', hours: '9am – 4pm' },
              { day: 'Sunday', hours: 'Closed' },
            ].map((row, i) => (
              <div key={i} className="flex justify-between text-sm text-muted-foreground font-light py-2 border-b border-border">
                <span>{row.day}</span>
                <span className="text-foreground">{row.hours}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="p-8 md:p-16">
          {status === 'success' ? (
            <div className="flex flex-col gap-6 h-full justify-center">
              <div className="w-12 h-12 border border-primary rounded-full flex items-center justify-center text-primary text-xl">✓</div>
              <h3 className="font-serif text-3xl font-normal">Message Sent</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-md">
                Thank you for reaching out. Our team will get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-widest uppercase text-muted-foreground">Your Name</label>
                  <Input 
                    name="name" 
                    placeholder="John doe" 
                    required value={form.name} 
                    onChange={handleChange} 
                    className="border border-accent"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-widest uppercase text-muted-foreground">Email Address</label>
                  <Input 
                    name="email" 
                    type="email" 
                    placeholder="you@email.com" 
                    required value={form.email} 
                    onChange={handleChange} 
                    className="border border-accent"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-widest uppercase text-muted-foreground ">Subject</label>
                <Select 
                  onValueChange={(v) => setForm(prev => ({ ...prev, subject: v }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {['Order Enquiry', 'Product Question', 'Returns & Refunds', 'Delivery Issue', 'Partnership', 'Other'].map(s => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-widest uppercase text-muted-foreground">Message</label>
                <Textarea
                  name="message"
                  placeholder="Tell us how we can help..."
                  required
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  className="border border-accent"
                />
              </div>

              {status === 'error' && (
                <p className="text-sm text-destructive">Something went wrong. Please try again.</p>
              )}

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-muted-foreground">We&apos;ll reply within 24 hours</span>
                <Button type="submit" disabled={status === 'loading'}>
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </section>

    </main>
  )
}