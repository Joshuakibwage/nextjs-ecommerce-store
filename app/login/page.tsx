"use client"
import { useState } from "react"
import Link from "next/link"
import { ShoppingBag, Eye, EyeClosed, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { login, signup } from "./actions"
import Image from "next/image";


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isSignUp, setIsSignUp] = useState<boolean>(false)

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 text-white flex-col justify-between p-14 relative overflow-hidden">
        
        {/* Background image */}
        <Image
          src="/login.jpg"
          alt="KonaShop"
          fill
          className="object-cover rounded-tr-xl rounded-br-xl "
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/55 z-10" />

        {/* Content — must be z-20 to sit above overlay */}
        <div className="flex items-center gap-2 relative z-20">
          <ShoppingBag size={28} />
          <span className="text-2xl font-bold tracking-tight">KonaShop</span>
        </div>

        <div className="relative z-20 space-y-6">
          <div className="space-y-2">
            <p className="text-white/60 text-sm font-medium tracking-widest uppercase">
              {isSignUp ? "Join us today" : "Welcome back"}
            </p>
            <h1 className="text-5xl font-bold leading-tight">
              {isSignUp ? "Start your\nshopping\njourney." : "Shop smarter.\nLive better."}
            </h1>
          </div>
          <p className="text-white/70 text-lg leading-relaxed max-w-sm">
            {isSignUp
              ? "Create an account and get access to thousands of products delivered anywhere in Kenya."
              : "Thousands of products, delivered to your door anywhere in Kenya."}
          </p>
          <div className="flex gap-10 pt-4">
            {[{ value: "10K+", label: "Products" }, { value: "50K+", label: "Customers" }, { value: "4.9★", label: "Rating" }].map(({ value, label }) => (
              <div key={label}>
                <p className="text-2xl font-bold">{value}</p>
                <p className="text-white/60 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-white/40 text-xs relative z-20">
          © {new Date().getFullYear()} KonaShop · Nairobi, Kenya
        </p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-20 bg-background">

        {/* Mobile logo */}
        <div className="flex items-center gap-2 mb-12 lg:hidden">
          <ShoppingBag className="text-primary" size={24} />
          <span className="text-xl font-bold text-foreground">KonaShop</span>
        </div>

        <div className="max-w-md w-full mx-auto space-y-8">

          {/* Toggle tabs */}
          <div className="flex rounded-xl border border-border p-1 bg-muted">
            <button
              type="button"
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                !isSignUp
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                isSignUp
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Create account
            </button>
          </div>

          {/* Heading */}
          <div className="space-y-1">
            <h2 className="text-3xl font-bold text-foreground tracking-tight">
              {isSignUp ? "Create your account" : "Sign in to KonaShop"}
            </h2>
            <p className="text-muted-foreground text-sm">
              {isSignUp
                ? "Already have an account? "
                : "Don't have an account? "}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-primary font-medium hover:underline cursor-pointer"
              >
                {isSignUp ? "Sign in" : "Create one"}
              </button>
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4">
            <input type="hidden" name="redirectTo" value="/" />

            {/* Full name — sign up only */}
            {isSignUp && (
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Full name</label>
                <input
                  name="fullName"
                  type="text"
                  required={isSignUp}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-muted/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Email address</label>
              <input
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg border border-border bg-muted/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Password</label>
                {!isSignUp && (
                  <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </Link>
                )}
              </div>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-muted/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeClosed size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm password — sign up only */}
            {isSignUp && (
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Confirm password</label>
                <div className="relative">
                  <input
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    required={isSignUp}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-muted/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm pr-12"
                  />
                </div>
              </div>
            )}

            <Button
              type="submit"
              formAction={isSignUp ? signup : login}
              className="w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 group"
            >
              {isSignUp ? "Create account" : "Sign in"}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          <p className="text-xs text-muted-foreground text-center">
            By continuing, you agree to our{" "}
            <Link href="/terms" className="text-primary hover:underline">Terms</Link>{" "}and{" "}
            <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
          </p>

        </div>
      </div>
    </div>
  )
}