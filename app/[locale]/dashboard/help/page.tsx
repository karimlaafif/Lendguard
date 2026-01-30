"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
    HelpCircle,
    Search,
    Book,
    Video,
    MessageCircle,
    Mail,
    Phone,
    FileText,
    Lightbulb,
    ChevronRight,
    ExternalLink,
    CheckCircle,
    AlertCircle,
    Info,
    Zap,
    Shield,
    CreditCard,
    Users,
    Settings,
    BarChart,
} from "lucide-react"
import Link from "next/link"

export default function HelpPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")

    const categories = [
        { id: "all", label: "All Topics", icon: Book },
        { id: "getting-started", label: "Getting Started", icon: Lightbulb },
        { id: "loans", label: "Loans", icon: CreditCard },
        { id: "fraud", label: "Fraud Detection", icon: Shield },
        { id: "analytics", label: "Analytics", icon: BarChart },
        { id: "account", label: "Account", icon: Users },
    ]

    const faqs = [
        {
            category: "getting-started",
            question: "How do I get started with LendGuard AI?",
            answer:
                "Getting started is easy! Sign up for a free account, complete your profile, and you can immediately start using our loan scoring and fraud detection features. Check out our interactive tutorials for a guided walkthrough.",
        },
        {
            category: "getting-started",
            question: "What features are included in the free plan?",
            answer:
                "The free plan includes 500 loan assessments per month, basic fraud detection, credit score analysis, and access to our dashboard. Upgrade to Professional or Enterprise for unlimited assessments and advanced features.",
        },
        {
            category: "loans",
            question: "How does the loan scoring system work?",
            answer:
                "Our AI analyzes multiple factors including credit score, income, debt-to-income ratio, employment history, and more. It generates a risk score (0-1000) and provides a recommendation (Approve, Review, or Reject) within seconds.",
        },
        {
            category: "loans",
            question: "Can I export loan reports?",
            answer:
                "Yes! You can export individual loan reports as PDF files from the loan details page. Enterprise plans also include batch export functionality and API access for automated reporting.",
        },
        {
            category: "fraud",
            question: "How accurate is the fraud detection?",
            answer:
                "Our fraud detection system has a 95% accuracy rate, using machine learning to identify patterns like identity theft, document fraud, and suspicious application behavior. It analyzes IP addresses, device fingerprints, and behavioral patterns.",
        },
        {
            category: "fraud",
            question: "What happens when fraud is detected?",
            answer:
                "Flagged applications are automatically marked for review. You'll see the fraud score, risk level, and specific reasons for detection. You can then block the application, investigate further, or clear false positives.",
        },
        {
            category: "analytics",
            question: "What analytics are available?",
            answer:
                "The analytics dashboard provides approval rates, risk distribution, fraud trends, loan performance metrics, and historical comparisons. You can filter by date range, loan type, and risk level.",
        },
        {
            category: "analytics",
            question: "Can I customize the analytics dashboard?",
            answer:
                "Professional and Enterprise plans allow you to create custom dashboards, set up automated reports, and configure alerts for specific metrics or thresholds.",
        },
        {
            category: "account",
            question: "How do I upgrade my plan?",
            answer:
                "Go to Settings > Pricing, select your desired plan, and complete the payment process. Your upgrade takes effect immediately with no downtime.",
        },
        {
            category: "account",
            question: "Is my data secure?",
            answer:
                "Absolutely. We use bank-level encryption (AES-256), all data is transmitted over HTTPS, and we're compliant with SOC 2, GDPR, and industry security standards. Your data is never shared with third parties.",
        },
    ]

    const quickLinks = [
        { title: "API Documentation", description: "Integrate LendGuard AI into your application", icon: FileText, link: "/dashboard/docs" },
        { title: "Video Tutorials", description: "Watch step-by-step guides", icon: Video, link: "#tutorials" },
        { title: "Community Forum", description: "Get help from other users", icon: MessageCircle, link: "#forum" },
        { title: "Contact Support", description: "Reach our support team", icon: Mail, link: "#support" },
    ]

    const tutorials = [
        { title: "Quick Start Guide", duration: "5 min", level: "Beginner", icon: Zap },
        { title: "Understanding Risk Scores", duration: "10 min", level: "Beginner", icon: Info },
        { title: "Advanced Fraud Detection", duration: "15 min", level: "Advanced", icon: Shield },
        { title: "Using the API", duration: "20 min", level: "Intermediate", icon: FileText },
    ]

    const filteredFaqs = faqs.filter((faq) => {
        const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
        const matchesSearch =
            searchQuery === "" ||
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="bg-background/80 backdrop-blur-md border-b border-border">
                <div className="px-4 md:px-6 py-8 text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <HelpCircle className="h-8 w-8 text-sky-500" />
                        <h1 className="text-3xl font-bold text-foreground">Help Center</h1>
                    </div>
                    <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                        Find answers, learn how to use LendGuard AI, and get support
                    </p>

                    {/* Search */}
                    <div className="max-w-2xl mx-auto relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            placeholder="Search for help..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-12 h-12 text-base bg-card border-border text-foreground focus-visible:ring-sky-500"
                        />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="p-4 md:p-6 max-w-7xl mx-auto">
                {/* Quick Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {quickLinks.map((link, index) => (
                        <Link key={index} href={link.link}>
                            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full bg-card border-border hover:bg-muted/50">
                                <link.icon className="h-8 w-8 text-sky-500 mb-3" />
                                <h3 className="font-semibold text-foreground mb-1">{link.title}</h3>
                                <p className="text-sm text-muted-foreground">{link.description}</p>
                            </Card>
                        </Link>
                    ))}
                </div>

                {/* Video Tutorials */}
                <section id="tutorials" className="mb-8">
                    <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                        <Video className="h-6 w-6 text-sky-500" />
                        Video Tutorials
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {tutorials.map((tutorial, index) => (
                            <Card key={index} className="p-4 hover:shadow-lg transition-shadow cursor-pointer bg-card border-border hover:bg-muted/50">
                                <div className="flex items-center justify-between mb-3">
                                    <tutorial.icon className="h-8 w-8 text-sky-500" />
                                    <Badge variant="outline" className="text-xs border-border text-muted-foreground">
                                        {tutorial.level}
                                    </Badge>
                                </div>
                                <h3 className="font-semibold text-foreground mb-2">{tutorial.title}</h3>
                                <p className="text-sm text-muted-foreground">{tutorial.duration}</p>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                        <Book className="h-6 w-6 text-sky-500" />
                        Frequently Asked Questions
                    </h2>

                    {/* Category Filters */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {categories.map((category) => (
                            <Button
                                key={category.id}
                                variant={selectedCategory === category.id ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedCategory(category.id)}
                                className={selectedCategory === category.id ? "bg-sky-500 text-white hover:bg-sky-600" : "bg-card text-muted-foreground border-border hover:bg-muted"}
                            >
                                <category.icon className="h-4 w-4 mr-2" />
                                {category.label}
                            </Button>
                        ))}
                    </div>

                    {/* FAQ List */}
                    <div className="space-y-4">
                        {filteredFaqs.map((faq, index) => (
                            <Card key={index} className="p-6 bg-card border-border">
                                <div className="flex items-start gap-3">
                                    <Info className="h-5 w-5 text-sky-500 flex-shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                                        <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {filteredFaqs.length === 0 && (
                        <Card className="p-12 text-center bg-card border-border">
                            <HelpCircle className="h-12 w-12 mx-auto mb-4 opacity-20 text-muted-foreground" />
                            <p className="text-muted-foreground">No FAQs found matching your search</p>
                        </Card>
                    )}
                </section>

                {/* Contact Support */}
                <section id="support" className="mb-8">
                    <Card className="p-8 bg-gradient-to-r from-sky-500 to-emerald-500 text-white border-none">
                        <div className="text-center">
                            <MessageCircle className="h-12 w-12 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold mb-2">Still Need Help?</h2>
                            <p className="mb-6 opacity-90">Our support team is here to help you 24/7</p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button className="bg-white text-sky-600 hover:bg-slate-100 border-none">
                                    <Mail className="h-4 w-4 mr-2" />
                                    Email Support
                                </Button>
                                <Button variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
                                    <MessageCircle className="h-4 w-4 mr-2" />
                                    Live Chat
                                </Button>
                            </div>
                        </div>
                    </Card>
                </section>

                {/* System Status */}
                <section>
                    <Card className="p-6 bg-card border-border">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center">
                                    <CheckCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">All Systems Operational</h3>
                                    <p className="text-sm text-muted-foreground">Last updated: Just now</p>
                                </div>
                            </div>
                            <Link href="/status">
                                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-muted">
                                    View Status Page
                                    <ExternalLink className="h-4 w-4 ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </Card>
                </section>
            </div>
        </div>
    )
}
