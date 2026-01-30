import type { NextAuthConfig } from "next-auth"

export const authConfig = {
    pages: {
        signIn: "/auth/login",
        error: "/auth/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const pathname = nextUrl.pathname

            // Extract path without locale (e.g., /fr/dashboard -> /dashboard)
            const pathWithoutLocale = pathname.replace(/^\/(en|ar|fr)/, "") || "/"

            const isAuthPage = pathWithoutLocale.startsWith('/auth/login') || pathWithoutLocale.startsWith('/auth/register')
            const isProtectedPage = pathWithoutLocale.startsWith('/dashboard') || pathWithoutLocale.startsWith('/score') || pathWithoutLocale.startsWith('/analytics') || pathWithoutLocale.startsWith('/admin')

            if (isProtectedPage) {
                if (isLoggedIn) return true
                return false // Redirect to login
            }

            if (isAuthPage && isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl))
            }

            return true
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.role = user.role
            }
            return token
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string
                session.user.role = token.role as string
            }
            return session
        },
    },
    providers: [], // Configured in lib/auth.ts
} satisfies NextAuthConfig

