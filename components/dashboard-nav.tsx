"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { LanguageSwitcher } from "@/components/language-switcher"
import {
    Home,
    List,
    AlertTriangle,
    BarChart3,
    Code,
    Plug,
    Settings,
    BookOpen,
    Search,
    Bell,
    ChevronLeft,
    ChevronRight,
    Shield,
    LogOut,
    User,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "next-auth/react"

interface DashboardNavProps {
    userName?: string
    userEmail?: string
    userRole?: string
}

export function DashboardNav({ userName = "User", userEmail, userRole = "User" }: DashboardNavProps) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    const pathname = usePathname()

    const navItems = [
        { icon: Home, label: "Overview", href: "/dashboard", badge: null },
        { icon: List, label: "Loan Queue", href: "/dashboard/loans", badge: "12" },
        { icon: AlertTriangle, label: "Fraud Alerts", href: "/dashboard/fraud", badge: "3", badgeVariant: "destructive" },
        { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics", badge: null },
        { icon: Code, label: "API & Webhooks", href: "/dashboard/docs", badge: null },
        { icon: Plug, label: "Integrations", href: "/dashboard/integrations", badge: null },
        { icon: Settings, label: "Settings", href: "/dashboard/settings", badge: null },
        { icon: BookOpen, label: "Help & Docs", href: "/dashboard/help", badge: null },
    ]

    const handleSignOut = async () => {
        await signOut({ callbackUrl: "/" })
    }

    return (
        <>
            {/* Sidebar - Always Dark */}
            <aside
                className={`fixed left-0 top-0 h-full bg-slate-950 text-white transition-all duration-300 z-50 ${sidebarCollapsed ? "w-16" : "w-64"
                    }`}
            >
                <div className="flex items-center justify-between p-4 border-b border-slate-800">
                    {!sidebarCollapsed && (
                        <Link href="/" className="flex items-center gap-2">
                            <Shield className="h-6 w-6 text-sky-500" />
                            <span className="font-bold text-lg">LendGuard AI</span>
                        </Link>
                    )}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        className="text-slate-400 hover:text-white hover:bg-slate-800"
                    >
                        {sidebarCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
                    </Button>
                </div>

                <nav className="p-2 space-y-1">
                    {navItems.map((item, index) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors relative ${isActive ? "bg-sky-500/10 text-sky-400" : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                    }`}
                            >
                                <item.icon className="h-5 w-5 flex-shrink-0" />
                                {!sidebarCollapsed && (
                                    <>
                                        <span className="text-sm font-medium">{item.label}</span>
                                        {item.badge && (
                                            <Badge
                                                variant={item.badgeVariant === "destructive" ? "destructive" : "default"}
                                                className="ml-auto text-xs"
                                            >
                                                {item.badge}
                                            </Badge>
                                        )}
                                    </>
                                )}
                                {sidebarCollapsed && item.badge && (
                                    <div className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                                        {item.badge}
                                    </div>
                                )}
                            </Link>
                        )
                    })}
                </nav>
            </aside>

            {/* Top Navbar - Theme Aware */}
            <header
                className={`fixed top-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border transition-all duration-300 ${sidebarCollapsed ? "left-16" : "left-64"
                    }`}
            >
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-4 flex-1 max-w-xl">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search loans, applicants, or transactions..."
                                className="pl-10 bg-muted/50 border-input text-foreground"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <LanguageSwitcher />

                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="h-5 w-5 text-muted-foreground" />
                            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                        </Button>

                        <div className="flex items-center gap-3 pl-4 border-l border-border">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                                        <div className="text-right">
                                            <div className="text-sm font-medium text-foreground">{userName}</div>
                                            <div className="text-xs text-muted-foreground">{userRole}</div>
                                        </div>
                                        <Avatar className="h-10 w-10 bg-gradient-to-br from-sky-500 to-emerald-500">
                                            <AvatarFallback className="text-white font-semibold">
                                                {userName.charAt(0).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard/profile" className="cursor-pointer">
                                            <User className="mr-2 h-4 w-4" />
                                            Profile
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard/settings" className="cursor-pointer">
                                            <Settings className="mr-2 h-4 w-4" />
                                            Settings
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Sign Out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}
