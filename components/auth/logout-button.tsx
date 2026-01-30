"use client"

import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

interface LogoutButtonProps {
  className?: string
  variant?: "default" | "ghost" | "outline"
}

export function LogoutButton({ className, variant = "ghost" }: LogoutButtonProps) {
  return (
    <Button variant={variant} onClick={() => signOut({ callbackUrl: "/auth/login" })} className={className}>
      <LogOut className="w-4 h-4 mr-2" />
      Sign Out
    </Button>
  )
}
