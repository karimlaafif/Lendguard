"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { Link } from "@/lib/i18n-navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Shield, Brain, Wallet, Zap, Eye, Plug, Play, Check, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { AnimatedCounter } from "@/components/animated-counter"
import { ParticleBackground } from "@/components/particle-background"
import { FloatingElements } from "@/components/floating-elements"
import { PublicNav } from "@/components/public-nav"

const features = [
    { icon: Shield, key: "fraud" },
    { icon: Brain, key: "scoring" },
    { icon: Wallet, key: "affordability" },
    { icon: Zap, key: "speed" },
    { icon: Eye, key: "explainable" },
    { icon: Plug, key: "integrations" },
]

const testimonials = [
    {
        name: "Sarah Chen",
        role: "CTO, QuickLend",
        text: "LendGuard AI reduced our fraud losses by 85% in just 3 months. Game-changer.",
        rating: 5,
    },
    {
        name: "Michael Rodriguez",
        role: "VP Risk, CapitalFlow",
        text: "The explainable AI feature helped us approve 30% more loans with confidence.",
        rating: 5,
    },
    {
        name: "Emma Thompson",
        role: "CEO, FastCredit",
        text: "Best lending intelligence platform. ROI in under 2 months.",
        rating: 5,
    },
]

const companies = ["LendTech", "QuickLoan", "FinanceNow", "CreditPro", "MoneyFlow", "LoanHub", "FastFund", "TrustBank"]

export default function LendGuardAI() {
    const t = useTranslations()
    const [email, setEmail] = useState("")
    const [currentTestimonial, setCurrentTestimonial] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
            <ParticleBackground />

            {/* Navigation */}
            <PublicNav />

            {/* Hero Section */}
            <section className="relative pt-20 pb-32 overflow-hidden">
                <FloatingElements />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-5xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 backdrop-blur-sm mb-8 animate-fade-in">
                            <div className="h-2 w-2 rounded-full bg-sky-500 animate-pulse" />
                            <span className="text-sm text-sky-400">{t("hero.badge")}</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-sky-200 to-emerald-200 bg-clip-text text-transparent animate-fade-in text-balance">
                            {t("hero.title")}
                        </h1>

                        <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto animate-fade-in text-pretty">
                            {t("hero.subtitle")}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in">
                            <Link href="/auth/register">
                                <Button
                                    size="lg"
                                    className="bg-sky-500 hover:bg-sky-600 text-white px-8 h-12 text-base font-semibold shadow-lg shadow-sky-500/30"
                                >
                                    {t("hero.cta.trial")}
                                </Button>
                            </Link>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-white/20 text-white hover:bg-white/10 px-8 h-12 text-base bg-transparent"
                                onClick={() => window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank")}
                            >
                                <Play className="h-4 w-4 mr-2" />
                                {t("hero.cta.demo")}
                            </Button>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex flex-wrap items-center justify-center gap-6 mb-12 animate-fade-in">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                                <Check className="h-4 w-4 text-emerald-400" />
                                <span className="text-sm text-slate-300">{t("hero.trust.soc2")}</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                                <Check className="h-4 w-4 text-emerald-400" />
                                <span className="text-sm text-slate-300">{t("hero.trust.uptime")}</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                                <Check className="h-4 w-4 text-emerald-400" />
                                <span className="text-sm text-slate-300">{t("hero.trust.loans")}</span>
                            </div>
                        </div>

                        {/* Animated Metrics */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-in">
                            <Card className="bg-white/5 backdrop-blur-md border-white/10 p-6 hover:bg-white/10 transition-all hover:scale-105">
                                <div className="text-3xl font-bold text-sky-400 mb-2">
                                    <AnimatedCounter target={2.1} decimals={1} suffix="B" prefix="$" />
                                </div>
                                <div className="text-sm text-slate-400">{t("hero.metrics.fraudPrevented")}</div>
                            </Card>
                            <Card className="bg-white/5 backdrop-blur-md border-white/10 p-6 hover:bg-white/10 transition-all hover:scale-105">
                                <div className="text-3xl font-bold text-emerald-400 mb-2">
                                    <AnimatedCounter target={850} suffix="M" prefix="$" />
                                </div>
                                <div className="text-sm text-slate-400">{t("hero.metrics.loansApproved")}</div>
                            </Card>
                            <Card className="bg-white/5 backdrop-blur-md border-white/10 p-6 hover:bg-white/10 transition-all hover:scale-105">
                                <div className="text-3xl font-bold text-purple-400 mb-2">
                                    <AnimatedCounter target={500} suffix="+" />
                                </div>
                                <div className="text-sm text-slate-400">{t("hero.metrics.lenders")}</div>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 relative">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                            {t("features.title")}
                        </h2>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                            {t("features.subtitle")}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {features.map((feature, index) => (
                            <Card
                                key={index}
                                className="bg-white/5 backdrop-blur-md border-white/10 p-8 hover:bg-white/10 transition-all hover:scale-105 group"
                            >
                                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <feature.icon className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3 text-white">{t(`features.list.${feature.key}.title`)}</h3>
                                <p className="text-slate-400 leading-relaxed">{t(`features.list.${feature.key}.description`)}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Social Proof Section */}
            <section className="py-20 relative">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">{t("testimonials.title")}</h2>
                        <div className="flex items-center justify-center gap-2 mb-8">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <span className="text-slate-400">{t("testimonials.rating")}</span>
                        </div>
                    </div>

                    {/* Testimonial Carousel */}
                    <div className="max-w-3xl mx-auto mb-16 relative">
                        <Card className="bg-white/5 backdrop-blur-md border-white/10 p-8 min-h-[200px]">
                            <div className="flex flex-col items-center text-center">
                                <div className="flex mb-4">
                                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-lg text-slate-300 mb-6 italic">"{testimonials[currentTestimonial].text}"</p>
                                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center mb-3">
                                    <span className="text-white font-semibold">{testimonials[currentTestimonial].name[0]}</span>
                                </div>
                                <div className="font-semibold">{testimonials[currentTestimonial].name}</div>
                                <div className="text-sm text-slate-400">{testimonials[currentTestimonial].role}</div>
                            </div>
                        </Card>

                        <div className="flex items-center justify-center gap-4 mt-6">
                            <Button
                                variant="outline"
                                size="icon"
                                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                                onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <div className="flex gap-2">
                                {testimonials.map((_, i) => (
                                    <button
                                        key={i}
                                        className={`h-2 w-2 rounded-full transition-all ${i === currentTestimonial ? "bg-sky-500 w-8" : "bg-white/20"
                                            }`}
                                        onClick={() => setCurrentTestimonial(i)}
                                    />
                                ))}
                            </div>
                            <Button
                                variant="outline"
                                size="icon"
                                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                                onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Company Logos */}
                    <div className="flex flex-wrap items-center justify-center gap-8 opacity-50">
                        {companies.map((company, index) => (
                            <div key={index} className="text-slate-400 font-semibold text-lg">
                                {company}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-20 relative">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <Card className="bg-gradient-to-br from-sky-500/10 to-emerald-500/10 backdrop-blur-md border-white/10 p-12 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-emerald-500/5" />

                            <div className="grid md:grid-cols-2 gap-8 relative z-10">
                                <div>
                                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("cta.title")}</h2>
                                    <p className="text-slate-300 mb-6">
                                        {t("cta.subtitle")}
                                    </p>

                                    <div className="flex flex-col sm:flex-row gap-3 mb-6">
                                        <Input
                                            type="email"
                                            placeholder={t("cta.emailPlaceholder")}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                                        />
                                        <Link href="/auth/register">
                                            <Button className="bg-sky-500 hover:bg-sky-600 text-white whitespace-nowrap">{t("cta.getStarted")}</Button>
                                        </Link>
                                    </div>

                                    <p className="text-xs text-slate-400">{t("cta.trial")}</p>
                                </div>

                                <div className="bg-slate-950/50 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                                    <div className="text-xs text-emerald-400 mb-2">{t("cta.codeComment")}</div>
                                    <pre className="text-sm text-slate-300 overflow-x-auto">
                                        <code>{`const response = await fetch(
  'https://api.lendguard.ai/v1/score',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: JSON.stringify({
      applicant_id: '12345',
      loan_amount: 50000
    })
  }
);

const { score, risk_level } = 
  await response.json();`}</code>
                                    </pre>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/10 py-12">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <Shield className="h-6 w-6 text-sky-500" />
                            <span className="font-bold">LendGuard AI</span>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-slate-400">
                            <Link href="/privacy" className="hover:text-white transition-colors">
                                {t("footer.privacy")}
                            </Link>
                            <Link href="/terms" className="hover:text-white transition-colors">
                                {t("footer.terms")}
                            </Link>
                            <Link href="/security" className="hover:text-white transition-colors">
                                {t("footer.security")}
                            </Link>
                            <Link href="/contact" className="hover:text-white transition-colors">
                                {t("footer.contact")}
                            </Link>
                        </div>
                        <div className="text-sm text-slate-400">{t("footer.copyright")}</div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
