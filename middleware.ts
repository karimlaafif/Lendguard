import createMiddleware from "next-intl/middleware"
import { NextRequest, NextResponse } from "next/server"
import NextAuth from "next-auth"
import { authConfig } from "./auth.config"

const { auth } = NextAuth(authConfig)

// Create the next-intl middleware
const intlMiddleware = createMiddleware({
    locales: ["en", "ar", "fr"],
    defaultLocale: "fr",
    localePrefix: "always"
})

// Protected routes that require authentication
const protectedRoutes = ["/dashboard", "/score", "/analytics", "/admin"]

// Auth routes that should redirect to dashboard if already logged in
const authRoutes = ["/auth/login", "/auth/register"]

export default async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // First, handle internationalization
    const response = intlMiddleware(request)

    // Extract locale from pathname (e.g., /fr/dashboard -> fr)
    const pathnameLocale = pathname.split("/")[1]
    const locale = ["en", "ar", "fr"].includes(pathnameLocale) ? pathnameLocale : "fr"

    // Remove locale prefix to check the actual path
    const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/"

    // Check authentication using the Edge-compatible auth helper
    const session = await auth()
    const isAuthenticated = !!session?.user

    // Check if path is protected
    const isProtectedRoute = protectedRoutes.some(route => pathWithoutLocale.startsWith(route))
    const isAuthRoute = authRoutes.some(route => pathWithoutLocale.startsWith(route))

    // Redirect to login if accessing protected route without auth
    if (isProtectedRoute && !isAuthenticated) {
        const loginUrl = new URL(`/${locale}/auth/login`, request.url)
        loginUrl.searchParams.set("callbackUrl", pathname)
        return NextResponse.redirect(loginUrl)
    }

    // Redirect to dashboard if accessing auth routes while authenticated
    if (isAuthRoute && isAuthenticated) {
        const dashboardUrl = new URL(`/${locale}/dashboard`, request.url)
        return NextResponse.redirect(dashboardUrl)
    }

    return response
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
