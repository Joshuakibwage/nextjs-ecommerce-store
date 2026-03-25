'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { type User } from '@supabase/supabase-js'
import Avatar from './avatar'
import { Button } from '@/components/ui/button'
import { ShoppingBag, LogOut, Pencil, Package } from 'lucide-react'

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [editing, setEditing] = useState(false)
  const [fullname, setFullname] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [website, setWebsite] = useState<string | null>(null)
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)
      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, website, avatar_url`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) throw error

      if (data) {
        setFullname(data.full_name)
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      console.error('Error loading profile:', error)
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  async function updateProfile() {
    try {
      setUpdating(true)
      const { error } = await supabase.from('profiles').upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      setEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30 py-12 px-4">
      <div className="max-w-xl mx-auto space-y-6">

        {/* Header card — avatar + name */}
        <div className="bg-background rounded-2xl border border-border p-8 flex flex-col items-center text-center gap-4">
          <Avatar
            uid={user?.id ?? null}
            url={avatar_url}
            size={96}
            onUpload={(url) => {
              setAvatarUrl(url)
            }}
          />
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {fullname || 'Your Name'}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">{user?.email}</p>
            {username && (
              <p className="text-primary text-sm font-medium mt-1">@{username}</p>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setEditing(!editing)}
            className="gap-2"
          >
            <Pencil size={14} />
            {editing ? 'Cancel' : 'Edit profile'}
          </Button>
        </div>

        {/* Edit profile form */}
        {editing && (
          <div className="bg-background rounded-2xl border border-border p-6 space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Edit profile</h2>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Full name</label>
              <input
                type="text"
                value={fullname || ''}
                onChange={(e) => setFullname(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border bg-muted/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Username</label>
              <input
                type="text"
                value={username || ''}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border bg-muted/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
                placeholder="johndoe"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Website</label>
              <input
                type="url"
                value={website || ''}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border bg-muted/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
                placeholder="https://yourwebsite.com"
              />
            </div>

            <Button
              onClick={updateProfile}
              disabled={updating}
              className="w-full"
            >
              {updating ? 'Saving...' : 'Save changes'}
            </Button>
          </div>
        )}

        {/* Order history summary */}
        <div className="bg-background rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Package size={18} />
              Recent orders
            </h2>
            <Button variant="ghost" size="sm" asChild>
              <a href="/orders">View all</a>
            </Button>
          </div>
          <div className="text-center py-8 text-muted-foreground">
            <ShoppingBag size={32} className="mx-auto mb-3 opacity-40" />
            <p className="text-sm">No orders yet</p>
            <Button variant="outline" size="sm" className="mt-4" asChild>
              <a href="/shop">Start shopping</a>
            </Button>
          </div>
        </div>

        {/* Sign out */}
        <div className="bg-background rounded-2xl border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Account</h2>
          <form action="/auth/signout" method="post">
            <Button
              type="submit"
              variant="outline"
              className="w-full gap-2 text-destructive border-destructive/30 hover:bg-destructive/10"
            >
              <LogOut size={16} />
              Sign out
            </Button>
          </form>
        </div>

      </div>
    </div>
  )
}