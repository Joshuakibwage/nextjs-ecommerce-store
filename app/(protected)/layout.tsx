import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}