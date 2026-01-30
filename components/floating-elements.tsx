"use client"

import { CreditCard, Shield, TrendingUp } from "lucide-react"

export function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-10 animate-float-slow">
        <div className="h-32 w-32 rounded-2xl bg-gradient-to-br from-sky-500/20 to-emerald-500/20 backdrop-blur-sm border border-white/10 flex items-center justify-center rotate-12">
          <CreditCard className="h-16 w-16 text-sky-400" />
        </div>
      </div>

      <div className="absolute top-40 right-20 animate-float-medium">
        <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-sky-500/20 backdrop-blur-sm border border-white/10 flex items-center justify-center -rotate-12">
          <Shield className="h-12 w-12 text-emerald-400" />
        </div>
      </div>

      <div className="absolute bottom-40 left-1/4 animate-float-fast">
        <div className="h-28 w-28 rounded-2xl bg-gradient-to-br from-purple-500/20 to-sky-500/20 backdrop-blur-sm border border-white/10 flex items-center justify-center rotate-6">
          <TrendingUp className="h-14 w-14 text-purple-400" />
        </div>
      </div>
    </div>
  )
}
