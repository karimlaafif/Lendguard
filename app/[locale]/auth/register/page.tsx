"use client"

import { useTranslations } from "next-intl"
import { Link, useRouter } from "@/lib/i18n-navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Mail, Lock, User, AlertCircle, ArrowLeft, CheckCircle } from "lucide-react"
import { useState } from "react"

export default function RegisterPage() {
    const t = useTranslations("auth.register")
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError(t("passwordMismatch"))
            setIsLoading(false)
            return
        }

        if (formData.password.length < 8) {
            setError(t("passwordTooShort"))
            setIsLoading(false)
            return
        }

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || t("error"))
            }

            setSuccess(true)

            // Redirect to login after 2 seconds
            setTimeout(() => {
                router.push("/auth/login")
            }, 2000)
        } catch (error: any) {
            setError(error.message || t("error"))
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4">
            {/* Back to Home Button */}
            <Link
                href="/"
                className="fixed top-4 left-4 z-50 flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
            >
                <ArrowLeft className="h-5 w-5" />
                <span className="text-sm font-medium">{t("backToHome")}</span>
            </Link>

            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
            </div>

            <Card className="w-full max-w-md glass border-slate-700/50 relative z-10">
                <CardHeader className="space-y-3 text-center">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-sky-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-2">
                        <Shield className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-3xl font-bold text-white">{t("title")}</CardTitle>
                    <CardDescription className="text-slate-400">{t("subtitle")}</CardDescription>
                </CardHeader>

                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        {error && (
                            <Alert variant="destructive" className="bg-red-500/10 border-red-500/50">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription className="text-red-200">{error}</AlertDescription>
                            </Alert>
                        )}

                        {success && (
                            <Alert className="bg-emerald-500/10 border-emerald-500/50">
                                <CheckCircle className="h-4 w-4 text-emerald-400" />
                                <AlertDescription className="text-emerald-200">
                                    {t("success")}
                                </AlertDescription>
                            </Alert>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-slate-300">
                                {t("name")}
                            </Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder={t("namePlaceholder")}
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-sky-500 focus:ring-sky-500"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-slate-300">
                                {t("email")}
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder={t("emailPlaceholder")}
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-sky-500 focus:ring-sky-500"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-slate-300">
                                {t("password")}
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder={t("passwordPlaceholder")}
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    minLength={8}
                                    className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-sky-500 focus:ring-sky-500"
                                />
                            </div>
                            <p className="text-xs text-slate-400">{t("passwordHint")}</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-slate-300">
                                {t("confirmPassword")}
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder={t("passwordPlaceholder")}
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    minLength={8}
                                    className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-sky-500 focus:ring-sky-500"
                                />
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-4">
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-sky-500 to-emerald-500 hover:opacity-90 transition-opacity text-white font-semibold h-11"
                            disabled={isLoading || success}
                        >
                            {isLoading ? t("creating") : t("createButton")}
                        </Button>

                        <p className="text-sm text-slate-400 text-center">
                            {t("haveAccount")}{" "}
                            <Link href="/auth/login" className="text-sky-400 hover:text-sky-300 font-semibold transition-colors">
                                {t("signIn")}
                            </Link>
                        </p>

                        <p className="text-xs text-slate-500 text-center">
                            {t("termsText")}{" "}
                            <a href="#" className="text-sky-400 hover:text-sky-300">
                                {t("termsLink")}
                            </a>{" "}
                            {t("and")}{" "}
                            <a href="#" className="text-sky-400 hover:text-sky-300">
                                {t("privacyLink")}
                            </a>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
