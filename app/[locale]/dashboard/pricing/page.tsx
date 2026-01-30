"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Check, X, Shield, Lock, Server, ChevronDown, ChevronUp, Star, Users, Calculator } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly")
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [showComparison, setShowComparison] = useState(false)
  const [loanVolume, setLoanVolume] = useState(1000)

  const discount = 0.2
  const annualMultiplier = 12 * (1 - discount)

  const plans = [
    {
      name: "Essentials",
      badge: "For small lenders",
      priceMonthly: 299,
      priceAnnual: Math.round(299 * annualMultiplier),
      description: "Perfect for getting started",
      features: [
        "500 loan analyses/month",
        "Real-time fraud detection",
        "Basic dashboard",
        "Email support",
        "API access",
        "Monthly reports",
        "$0.50 per additional loan",
      ],
      cta: "Start Free Trial",
      popular: false,
    },
    {
      name: "Professional",
      badge: "MOST POPULAR",
      priceMonthly: 999,
      priceAnnual: Math.round(999 * annualMultiplier),
      description: "For growing lending platforms",
      features: [
        "5,000 loan analyses/month",
        "Advanced analytics dashboard",
        "Custom risk thresholds",
        "Affordability scoring",
        "Multi-model ensemble",
        "Priority support (phone + chat)",
        "Webhook integrations",
        "API rate: 10 req/sec",
        "$0.35 per additional loan",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      badge: "For high-volume lenders",
      priceMonthly: null,
      priceAnnual: null,
      description: "Unlimited power and flexibility",
      features: [
        "Unlimited loan analyses",
        "White-label solution",
        "Custom model training",
        "Dedicated account manager",
        "99.9% SLA guarantee",
        "On-premise deployment option",
        "SSO & advanced security",
        "Custom integrations",
        "24/7 priority support",
        "No per-loan fees",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  const comparisonFeatures = [
    {
      category: "Core Features",
      features: [
        { name: "Loan analyses per month", essentials: "500", professional: "5,000", enterprise: "Unlimited" },
        { name: "Real-time fraud detection", essentials: true, professional: true, enterprise: true },
        { name: "Risk scoring", essentials: true, professional: true, enterprise: true },
        { name: "Affordability analysis", essentials: false, professional: true, enterprise: true },
        { name: "Multi-model ensemble", essentials: false, professional: true, enterprise: true },
        { name: "Custom model training", essentials: false, professional: false, enterprise: true },
      ],
    },
    {
      category: "Analytics",
      features: [
        { name: "Basic dashboard", essentials: true, professional: true, enterprise: true },
        { name: "Advanced analytics", essentials: false, professional: true, enterprise: true },
        { name: "Custom reports", essentials: false, professional: true, enterprise: true },
        { name: "Real-time metrics", essentials: false, professional: true, enterprise: true },
        { name: "Predictive insights", essentials: false, professional: false, enterprise: true },
      ],
    },
    {
      category: "Integrations",
      features: [
        { name: "API access", essentials: true, professional: true, enterprise: true },
        { name: "Webhook support", essentials: false, professional: true, enterprise: true },
        { name: "Custom integrations", essentials: false, professional: false, enterprise: true },
        { name: "White-label", essentials: false, professional: false, enterprise: true },
        { name: "On-premise deployment", essentials: false, professional: false, enterprise: true },
      ],
    },
    {
      category: "Support",
      features: [
        { name: "Email support", essentials: true, professional: true, enterprise: true },
        { name: "Phone support", essentials: false, professional: true, enterprise: true },
        { name: "Chat support", essentials: false, professional: true, enterprise: true },
        { name: "Dedicated account manager", essentials: false, professional: false, enterprise: true },
        { name: "24/7 priority support", essentials: false, professional: false, enterprise: true },
      ],
    },
    {
      category: "Security",
      features: [
        { name: "256-bit encryption", essentials: true, professional: true, enterprise: true },
        { name: "SSO", essentials: false, professional: false, enterprise: true },
        { name: "Advanced security", essentials: false, professional: false, enterprise: true },
        { name: "SOC 2 Type II", essentials: true, professional: true, enterprise: true },
        { name: "99.9% SLA", essentials: false, professional: false, enterprise: true },
      ],
    },
  ]

  const faqs = [
    {
      question: "How does the free trial work?",
      answer:
        "Start with a 14-day free trial on any plan. No credit card required. You'll get full access to all features of your chosen plan. Cancel anytime during the trial period with no charges.",
    },
    {
      question: "Can I change plans anytime?",
      answer:
        "Yes! You can upgrade or downgrade your plan at any time. When upgrading, you'll get immediate access to new features. When downgrading, changes take effect at the start of your next billing cycle.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, Mastercard, American Express, Discover), ACH transfers, and wire transfers for Enterprise plans. Annual plans can also be paid via invoice.",
    },
    {
      question: "Is there a setup fee?",
      answer:
        "No setup fees for Essentials and Professional plans. Enterprise plans may have a one-time implementation fee depending on customization requirements, which will be discussed during the sales process.",
    },
    {
      question: "What happens if I exceed my limit?",
      answer:
        "Additional loans are automatically processed at the per-loan rate shown in your plan ($0.50 for Essentials, $0.35 for Professional). You'll receive notifications at 80% and 100% of your monthly limit.",
    },
    {
      question: "Do you offer discounts for nonprofits?",
      answer:
        "Yes! We offer a 30% discount on all plans for registered 501(c)(3) nonprofit organizations. Contact our sales team with your nonprofit documentation to apply.",
    },
  ]

  const customerLogos = [
    "Acme Bank",
    "TechLend",
    "QuickLoans",
    "SafeCredit",
    "LoanStar",
    "FinanceFlow",
    "TrustFund",
    "CreditWise",
  ]

  const calculateSavings = () => {
    const essentialsCost = loanVolume * 0.5
    const professionalBase = 999
    const professionalExtra = Math.max(0, loanVolume - 5000) * 0.35
    const professionalCost = professionalBase + professionalExtra

    if (loanVolume <= 500) {
      return { savings: 0, recommended: "Essentials" }
    } else if (loanVolume <= 5000) {
      return { savings: Math.max(0, essentialsCost - professionalCost), recommended: "Professional" }
    } else {
      return { savings: essentialsCost - professionalCost, recommended: "Professional" }
    }
  }

  const savings = calculateSavings()
  const annualSavings = billingPeriod === "annual" ? (plans[0].priceMonthly ?? 0) * 12 - (plans[0].priceAnnual ?? 0) : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-500/10 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 h-96 w-96 bg-sky-500/20 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/4 h-96 w-96 bg-emerald-500/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 text-balance">Simple, transparent pricing</h1>
          <p className="text-xl text-slate-300 mb-12 text-balance">Start free. Scale as you grow. Cancel anytime.</p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-16">
            <span className={`text-sm font-medium ${billingPeriod === "monthly" ? "text-white" : "text-slate-400"}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingPeriod(billingPeriod === "monthly" ? "annual" : "monthly")}
              className="relative w-16 h-8 bg-slate-700 rounded-full transition-colors hover:bg-slate-600"
            >
              <div
                className={`absolute top-1 left-1 h-6 w-6 bg-sky-500 rounded-full transition-transform ${billingPeriod === "annual" ? "translate-x-8" : ""
                  }`}
              />
            </button>
            <span className={`text-sm font-medium ${billingPeriod === "annual" ? "text-white" : "text-slate-400"}`}>
              Annual
            </span>
            {billingPeriod === "annual" && (
              <Badge className="bg-emerald-500 text-white hover:bg-emerald-600">Save 20%</Badge>
            )}
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative p-6 md:p-8 bg-slate-800/50 backdrop-blur-xl border-slate-700 transition-all hover:scale-105 ${plan.popular ? "md:scale-110 border-sky-500 shadow-2xl shadow-sky-500/20" : ""
                  }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-sky-500 to-emerald-500 text-white px-4 py-1 text-sm font-semibold">
                      <Star className="h-3 w-3 mr-1 inline" />
                      {plan.badge}
                    </Badge>
                  </div>
                )}

                {!plan.popular && (
                  <div className="mb-2">
                    <Badge variant="outline" className="text-slate-400 border-slate-600">
                      {plan.badge}
                    </Badge>
                  </div>
                )}

                <h3 className="text-2xl font-bold text-white mt-4 mb-2">{plan.name}</h3>
                <p className="text-slate-400 text-sm mb-6">{plan.description}</p>

                <div className="mb-8">
                  {plan.priceMonthly ? (
                    <>
                      <div className="flex items-baseline justify-center gap-2">
                        <span className="text-5xl font-bold text-white">
                          ${billingPeriod === "monthly" ? plan.priceMonthly : Math.round(plan.priceAnnual / 12)}
                        </span>
                        <span className="text-slate-400">/month</span>
                      </div>
                      {billingPeriod === "annual" && (
                        <p className="text-emerald-400 text-sm mt-2">
                          ${plan.priceAnnual} billed annually - Save ${plan.priceMonthly * 12 - plan.priceAnnual}
                        </p>
                      )}
                    </>
                  ) : (
                    <div className="text-3xl font-bold text-white">Custom pricing</div>
                  )}
                </div>

                <Link href={plan.priceMonthly ? "/dashboard" : "/dashboard/settings?tab=billing"}>
                  <Button
                    className={`w-full mb-8 ${plan.popular
                        ? "bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white shadow-lg shadow-sky-500/30"
                        : "bg-slate-700 hover:bg-slate-600 text-white"
                      }`}
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </Link>

                <ul className="space-y-4 text-left">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          {/* Trial info */}
          <p className="text-slate-400 mt-12 text-sm">14-day free trial • No credit card required • Cancel anytime</p>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="text-center mb-12">
          <Button
            variant="outline"
            onClick={() => setShowComparison(!showComparison)}
            className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
          >
            {showComparison ? "Hide" : "Compare all features"}
            {showComparison ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
          </Button>
        </div>

        {showComparison && (
          <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left p-6 text-white font-semibold">Features</th>
                    <th className="text-center p-6 text-white font-semibold">Essentials</th>
                    <th className="text-center p-6 text-white font-semibold bg-sky-500/10">Professional</th>
                    <th className="text-center p-6 text-white font-semibold">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((category, categoryIndex) => (
                    <>
                      <tr key={`category-${categoryIndex}`} className="bg-slate-700/50">
                        <td colSpan={4} className="p-4 text-slate-300 font-semibold">
                          {category.category}
                        </td>
                      </tr>
                      {category.features.map((feature, featureIndex) => (
                        <tr key={`feature-${categoryIndex}-${featureIndex}`} className="border-b border-slate-700/50">
                          <td className="p-4 text-slate-300">{feature.name}</td>
                          <td className="p-4 text-center">
                            {typeof feature.essentials === "boolean" ? (
                              feature.essentials ? (
                                <Check className="h-5 w-5 text-emerald-500 mx-auto" />
                              ) : (
                                <X className="h-5 w-5 text-slate-600 mx-auto" />
                              )
                            ) : (
                              <span className="text-slate-300">{feature.essentials}</span>
                            )}
                          </td>
                          <td className="p-4 text-center bg-sky-500/5">
                            {typeof feature.professional === "boolean" ? (
                              feature.professional ? (
                                <Check className="h-5 w-5 text-emerald-500 mx-auto" />
                              ) : (
                                <X className="h-5 w-5 text-slate-600 mx-auto" />
                              )
                            ) : (
                              <span className="text-slate-300">{feature.professional}</span>
                            )}
                          </td>
                          <td className="p-4 text-center">
                            {typeof feature.enterprise === "boolean" ? (
                              feature.enterprise ? (
                                <Check className="h-5 w-5 text-emerald-500 mx-auto" />
                              ) : (
                                <X className="h-5 w-5 text-slate-600 mx-auto" />
                              )
                            ) : (
                              <span className="text-slate-300">{feature.enterprise}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>

      {/* Calculator Section */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <Card className="p-8 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="h-6 w-6 text-sky-500" />
            <h2 className="text-2xl font-bold text-white">How much would you save?</h2>
          </div>
          <p className="text-slate-400 mb-6">Enter your monthly loan volume to see which plan is right for you</p>

          <div className="space-y-6">
            <div>
              <label className="text-sm text-slate-300 mb-2 block">Monthly loan volume</label>
              <Input
                type="number"
                value={loanVolume}
                onChange={(e) => setLoanVolume(Number.parseInt(e.target.value) || 0)}
                className="bg-slate-900 border-slate-700 text-white text-lg"
                placeholder="1000"
              />
            </div>

            <div className="p-6 bg-slate-900/50 rounded-lg border border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <span className="text-slate-300">Recommended plan:</span>
                <Badge className="bg-sky-500 text-white">{savings.recommended}</Badge>
              </div>
              {savings.savings > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">You could save:</span>
                  <span className="text-2xl font-bold text-emerald-500">${savings.savings.toFixed(2)}/month</span>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Social Proof */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20 text-center">
        <p className="text-slate-400 mb-8">Trusted by 500+ lenders worldwide</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16">
          {customerLogos.map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-6 bg-slate-800/30 backdrop-blur-sm rounded-lg border border-slate-700 hover:border-slate-600 transition-colors"
            >
              <span className="text-slate-400 font-semibold">{logo}</span>
            </div>
          ))}
        </div>

        <Card className="max-w-3xl mx-auto p-8 bg-slate-800/50 backdrop-blur-xl border-slate-700">
          <div className="flex gap-1 justify-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            ))}
          </div>
          <blockquote className="text-xl text-white mb-4 text-balance">
            "LendGuard saved us $2M in fraud losses in the first year"
          </blockquote>
          <div className="text-slate-400">
            <p className="font-semibold">Michael Chen</p>
            <p className="text-sm">CFO, TechLend Financial</p>
          </div>
        </Card>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <h2 className="text-4xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card
              key={index}
              className="bg-slate-800/50 backdrop-blur-xl border-slate-700 overflow-hidden hover:border-slate-600 transition-colors"
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                className="w-full p-6 text-left flex items-center justify-between"
              >
                <span className="text-lg font-semibold text-white">{faq.question}</span>
                {expandedFaq === index ? (
                  <ChevronUp className="h-5 w-5 text-slate-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-slate-400 flex-shrink-0" />
                )}
              </button>

              {expandedFaq === index && (
                <div className="px-6 pb-6">
                  <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sky-500/10 to-transparent" />

        <div className="relative max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-20 text-center">
          <h2 className="text-4xl font-bold text-white mb-4 text-balance">
            Ready to stop fraud and approve more loans?
          </h2>
          <p className="text-xl text-slate-300 mb-8">Join 500+ lenders using AI-powered risk assessment</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white shadow-lg shadow-sky-500/30"
              >
                Start Free Trial
              </Button>
            </Link>
            <Link href="/dashboard/settings?tab=billing">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
              >
                Contact Sales
              </Button>
            </Link>
          </div>

          <p className="text-slate-400 text-sm">No credit card required • 14-day free trial • Cancel anytime</p>
        </div>
      </div>

      {/* Trust Signals */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="flex flex-col items-center text-center gap-3">
              <Shield className="h-8 w-8 text-sky-500" />
              <p className="text-sm text-slate-300 font-medium">SOC 2 Type II Certified</p>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <Users className="h-8 w-8 text-emerald-500" />
              <p className="text-sm text-slate-300 font-medium">GDPR Compliant</p>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <Lock className="h-8 w-8 text-purple-500" />
              <p className="text-sm text-slate-300 font-medium">256-bit Encryption</p>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <Server className="h-8 w-8 text-amber-500" />
              <p className="text-sm text-slate-300 font-medium">99.9% Uptime SLA</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
