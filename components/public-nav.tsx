"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/lib/i18n-navigation"
import { Button } from "@/components/ui/button"
import { Shield } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"

export function PublicNav() {
    const t = useTranslations("nav")

    return (
        <nav className="relative z-10 border-b border-white/10 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <Shield className="h-8 w-8 text-sky-500" />
                    <span className="text-xl font-bold text-white">LendGuard AI</span>
                </Link>
                <div className="hidden md:flex items-center gap-8">
                    <a href="/#features" className="text-sm text-slate-300 hover:text-white transition-colors">
                        {t("features")}
                    </a>
                    <Link href="/dashboard/pricing" className="text-sm text-slate-300 hover:text-white transition-colors">
                        {t("pricing")}
                    </Link>
                    <Link href="/dashboard/docs" className="text-sm text-slate-300 hover:text-white transition-colors">
                        {t("docs")}
                    </Link>
                    <LanguageSwitcher />
                    <Link href="/auth/login">
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                        >
                            {t("signIn")}
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    )
}

