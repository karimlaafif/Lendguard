"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  FileText,
  CreditCard,
  Briefcase,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Download,
  Share2,
  Printer,
  ChevronDown,
} from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts"

export default function ScorePage() {
  const [loanAmount, setLoanAmount] = useState<number>(25000)
  const [loanTerm, setLoanTerm] = useState<number>(36)
  const [creditScore, setCreditScore] = useState<number>(720)
  const [income, setIncome] = useState<number>(65000)
  const [dtiRatio, setDtiRatio] = useState<number>(35)

  // Calcluate risk score based on inputs (simplified logic)
  const calculateScore = () => {
    let score = 500 // Base score
    score += (creditScore - 600) * 1.5
    score += (income / 1000) * 2
    score -= dtiRatio * 5
    score -= (loanAmount / income) * 100
    return Math.min(Math.max(Math.round(score), 300), 850)
  }

  const riskScore = calculateScore()

  const getRiskLevel = (score: number) => {
    if (score >= 750) return { label: "Excellent", color: "text-emerald-500", bg: "bg-emerald-500" }
    if (score >= 700) return { label: "Good", color: "text-blue-500", bg: "bg-blue-500" }
    if (score >= 650) return { label: "Fair", color: "text-yellow-500", bg: "bg-yellow-500" }
    return { label: "Poor", color: "text-red-500", bg: "bg-red-500" }
  }

  const riskLevel = getRiskLevel(riskScore)

  const factorsData = [
    { name: "Credit History", value: 35, color: "#0ea5e9" },
    { name: "Debt/Income", value: 30, color: "#8b5cf6" },
    { name: "Loan Amount", value: 20, color: "#f59e0b" },
    { name: "Income Stability", value: 15, color: "#10b981" },
  ]

  const comparisonData = [
    { name: "You", score: riskScore },
    { name: "Avg Applicant", score: 680 },
    { name: "Top 10%", score: 780 },
  ]

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Loan Risk Simulator</h1>
            <p className="text-muted-foreground mt-1 text-sm md:text-base">
              Analyze loan eligibility factors and simulate risk scores
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Input Panel */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="p-6 bg-card border-border">
              <h2 className="text-lg font-bold text-foreground mb-4">Applicant Parameters</h2>
              <div className="space-y-6">
                {/* Loan Amount */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-foreground">Loan Amount</label>
                    <span className="text-sm font-bold text-sky-500">${loanAmount.toLocaleString()}</span>
                  </div>
                  <Input
                    type="range"
                    min={1000}
                    max={100000}
                    step={1000}
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="h-2 bg-muted rounded-lg appearance-none cursor-pointer p-0 border-none"
                  />
                </div>

                {/* Term */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-foreground">Loan Term</label>
                    <span className="text-sm font-bold text-sky-500">{loanTerm} months</span>
                  </div>
                  <Input
                    type="range"
                    min={12}
                    max={60}
                    step={12}
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    className="h-2 bg-muted rounded-lg appearance-none cursor-pointer p-0 border-none"
                  />
                </div>

                {/* Credit Score */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-foreground">Credit Score</label>
                    <span className="text-sm font-bold text-sky-500">{creditScore}</span>
                  </div>
                  <Input
                    type="range"
                    min={300}
                    max={850}
                    step={5}
                    value={creditScore}
                    onChange={(e) => setCreditScore(Number(e.target.value))}
                    className="h-2 bg-muted rounded-lg appearance-none cursor-pointer p-0 border-none"
                  />
                </div>

                {/* Income */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-foreground">Annual Income</label>
                    <span className="text-sm font-bold text-sky-500">${income.toLocaleString()}</span>
                  </div>
                  <Input
                    type="range"
                    min={20000}
                    max={200000}
                    step={1000}
                    value={income}
                    onChange={(e) => setIncome(Number(e.target.value))}
                    className="h-2 bg-muted rounded-lg appearance-none cursor-pointer p-0 border-none"
                  />
                </div>

                {/* DTI */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-foreground">Debt-to-Income Ratio</label>
                    <span className="text-sm font-bold text-sky-500">{dtiRatio}%</span>
                  </div>
                  <Input
                    type="range"
                    min={0}
                    max={100}
                    step={1}
                    value={dtiRatio}
                    onChange={(e) => setDtiRatio(Number(e.target.value))}
                    className="h-2 bg-muted rounded-lg appearance-none cursor-pointer p-0 border-none"
                  />
                </div>
              </div>
            </Card>

            {/* Quick Tips */}
            <Card className="p-6 bg-sky-50 dark:bg-sky-900/20 border-sky-100 dark:border-sky-800">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-sky-100 dark:bg-sky-900/50 flex items-center justify-center flex-shrink-0">
                  <HelpCircle className="h-6 w-6 text-sky-600 dark:text-sky-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-sky-900 dark:text-sky-100 mb-1">Improve Your Score</h3>
                  <p className="text-sm text-sky-700 dark:text-sky-300">
                    Reducing your DTI ratio below 30% can significantly improve your loan eligibility.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-8 space-y-6">
            {/* Main Score Card */}
            <Card className="p-8 bg-card border-border">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="relative h-48 w-48 flex items-center justify-center">
                  <svg className="h-full w-full rotate-[-90deg]" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted/30" />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      strokeDasharray={`${(riskScore / 850) * 283} 283`}
                      className={riskLevel.color}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-foreground">{riskScore}</span>
                    <span className={`text-sm font-semibold ${riskLevel.color}`}>{riskLevel.label}</span>
                  </div>
                </div>

                <div className="flex-1 space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Likelihood of Approval</h3>
                    <div className="flex items-center gap-4">
                      <Progress value={(riskScore / 850) * 100} className="h-4" />
                      <span className="font-bold text-foreground">{Math.round((riskScore / 850) * 100)}%</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-sm text-muted-foreground mb-1">Estimated Rate</p>
                      <p className="text-xl font-bold text-foreground">
                        {riskScore > 700 ? "5.4%" : riskScore > 650 ? "7.2%" : "9.8%"}
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-sm text-muted-foreground mb-1">Max Loan Amount</p>
                      <p className="text-xl font-bold text-foreground">
                        ${Math.round(income * (riskScore / 1000) * 0.8).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Factor Contribution */}
              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-bold text-foreground mb-4">Score Factors</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={factorsData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        dataKey="value"
                      >
                        {factorsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'var(--card)',
                          borderColor: 'var(--border)',
                          color: 'var(--foreground)'
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Comparison */}
              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-bold text-foreground mb-4">Benchmarks</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={comparisonData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis hide />
                      <Tooltip
                        cursor={{ fill: 'transparent' }}
                        contentStyle={{
                          backgroundColor: 'var(--card)',
                          borderColor: 'var(--border)',
                          color: 'var(--foreground)'
                        }}
                      />
                      <Bar dataKey="score" fill="#0ea5e9" radius={[4, 4, 0, 0]} barSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
