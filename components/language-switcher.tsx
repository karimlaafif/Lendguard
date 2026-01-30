"use client"

import { usePathname, useRouter } from "@/lib/i18n-navigation"
import { useParams } from "next/navigation"
import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const languages = [
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
    { code: "en", name: "English", flag: "🇬🇧" },
]

export function LanguageSwitcher() {
    const router = useRouter()
    const pathname = usePathname()
    const params = useParams()

    const currentLocale = (params?.locale as string) || "fr"
    const currentLanguage = languages.find((lang) => lang.code === currentLocale) || languages[0]

    const switchLanguage = (locale: string) => {
        // Navigate to the same path with new locale
        router.push(pathname, { locale: locale as any })

        // Set document direction for RTL languages
        if (locale === "ar") {
            document.documentElement.dir = "rtl"
            document.documentElement.lang = "ar"
        } else {
            document.documentElement.dir = "ltr"
            document.documentElement.lang = locale
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="border-white/20 text-white hover:bg-white/10 bg-transparent gap-2"
                >
                    <Globe className="h-4 w-4" />
                    <span className="hidden sm:inline">{currentLanguage.flag} {currentLanguage.name}</span>
                    <span className="sm:hidden">{currentLanguage.flag}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-slate-900 border-white/20">
                {languages.map((language) => (
                    <DropdownMenuItem
                        key={language.code}
                        onClick={() => switchLanguage(language.code)}
                        className={`cursor-pointer text-white hover:bg-white/10 ${currentLocale === language.code ? "bg-white/5" : ""
                            }`}
                    >
                        <span className="mr-2">{language.flag}</span>
                        {language.name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

