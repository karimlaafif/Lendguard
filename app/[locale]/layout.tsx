import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { Analytics } from "@vercel/analytics/next"
import { notFound } from "next/navigation"
import { Inter, Fira_Code } from "next/font/google"
import "../globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-mono" })
export const metadata = {
    title: "LendGuard AI - AI-Powered Loan Fraud Detection & Credit Risk Scoring",
    description: "Stop fraud and approve more loans with AI-powered loan intelligence. Detect fraud and predict repayment ability with 95% accuracy.",
}
const locales = ["en", "ar", "fr"]

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: Promise<{ locale: string }>
}) {
    // Await params for Next.js 15+ support
    const { locale } = await params

    // Validate locale
    if (!locales.includes(locale)) {
        notFound()
    }

    // Get messages for the locale
    const messages = await getMessages()

    // Set direction based on locale
    const direction = locale === "ar" ? "rtl" : "ltr"

    return (
        <html lang={locale} dir={direction} className="dark" suppressHydrationWarning>
            <body className={`${inter.variable} ${firaCode.variable} font-sans antialiased`}>
                <NextIntlClientProvider messages={messages}>
                    {children}
                    <Analytics />
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
