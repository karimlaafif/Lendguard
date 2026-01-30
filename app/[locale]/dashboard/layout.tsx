import { ReactNode } from "react"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { DashboardNav } from "@/components/dashboard-nav"

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await auth()

  if (!session?.user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav
        userName={session.user.name || "User"}
        userEmail={session.user.email || ""}
        userRole={session.user.role || "user"}
      />

      {/* Main content with proper spacing for fixed nav */}
      <div className="ml-64 pt-[73px]">
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
