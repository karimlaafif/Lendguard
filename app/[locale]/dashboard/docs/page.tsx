"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Search,
  Copy,
  Check,
  Terminal,
  Code2,
  Book,
  Play,
  ChevronRight,
  Lock,
  Zap,
  ExternalLink,
  Webhook,
  AlertCircle,
  Clock,
} from "lucide-react"

export default function DocsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState<"curl" | "python" | "node" | "ruby">("curl")
  const [playgroundInput, setPlaygroundInput] = useState(`{
  "applicant": {
    "name": "John Doe",
    "email": "john@example.com",
    "age": 32,
    "income": 75000
  },
  "loan": {
    "amount": 25000,
    "term": 36,
    "purpose": "debt_consolidation"
  },
  "credit": {
    "score": 680,
    "dti_ratio": 0.35,
    "months_employed": 24
  }
}`)
  const [playgroundResponse, setPlaygroundResponse] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const handlePlaygroundRequest = () => {
    setIsLoading(true)
    setTimeout(() => {
      setPlaygroundResponse(`{
  "status": "success",
  "decision": "review",
  "risk_score": 487,
  "fraud_probability": 0.23,
  "affordability_index": 7.2,
  "confidence": 0.87,
  "reasons": [
    "High DTI ratio",
    "Moderate credit score"
  ],
  "processing_time_ms": 187
}`)
      setIsLoading(false)
    }, 1500)
  }

  const navSections = [
    { id: "getting-started", label: "Getting Started" },
    { id: "authentication", label: "Authentication" },
    {
      id: "endpoints",
      label: "Endpoints",
      children: [
        { id: "score-loan", label: "Score Loan" },
        { id: "batch-processing", label: "Batch Processing" },
        { id: "get-loan-details", label: "Get Loan Details" },
        { id: "webhooks", label: "Webhooks" },
      ],
    },
    { id: "sdks", label: "SDKs & Libraries" },
    { id: "rate-limits", label: "Rate Limits" },
    { id: "error-codes", label: "Error Codes" },
    { id: "changelog", label: "Changelog" },
  ]

  const codeExamples = {
    curl: `curl https://api.lendguard.ai/v1/score-loan \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "applicant": {
      "name": "John Doe",
      "email": "john@example.com",
      "age": 32,
      "income": 75000
    },
    "loan": {
      "amount": 25000,
      "term": 36,
      "purpose": "debt_consolidation"
    },
    "credit": {
      "score": 680,
      "dti_ratio": 0.35,
      "months_employed": 24
    }
  }'`,
    python: `from lendguard import Client

client = Client(api_key='YOUR_API_KEY')

result = client.score_loan({
  'applicant': {
    'name': 'John Doe',
    'email': 'john@example.com',
    'age': 32,
    'income': 75000
  },
  'loan': {
    'amount': 25000,
    'term': 36,
    'purpose': 'debt_consolidation'
  },
  'credit': {
    'score': 680,
    'dti_ratio': 0.35,
    'months_employed': 24
  }
})

print(result)`,
    node: `import { LendGuard } from 'lendguard-node';

const client = new LendGuard({
  apiKey: 'YOUR_API_KEY'
});

const result = await client.scoreLoan({
  applicant: {
    name: 'John Doe',
    email: 'john@example.com',
    age: 32,
    income: 75000
  },
  loan: {
    amount: 25000,
    term: 36,
    purpose: 'debt_consolidation'
  },
  credit: {
    score: 680,
    dti_ratio: 0.35,
    months_employed: 24
  }
});

console.log(result);`,
    ruby: `require 'lendguard'

client = LendGuard::Client.new(
  api_key: 'YOUR_API_KEY'
)

result = client.score_loan({
  applicant: {
    name: 'John Doe',
    email: 'john@example.com',
    age: 32,
    income: 75000
  },
  loan: {
    amount: 25000,
    term: 36,
    purpose: 'debt_consolidation'
  },
  credit: {
    score: 680,
    dti_ratio: 0.35,
    months_employed: 24
  }
})

puts result`,
  }

  const parameters = [
    { name: "applicant.name", type: "string", required: true, description: "Full name of the loan applicant" },
    { name: "applicant.email", type: "string", required: true, description: "Email address for communication" },
    { name: "applicant.age", type: "integer", required: true, description: "Age of applicant (18+)" },
    { name: "applicant.income", type: "number", required: true, description: "Annual income in USD" },
    { name: "loan.amount", type: "number", required: true, description: "Requested loan amount" },
    { name: "loan.term", type: "integer", required: true, description: "Loan term in months" },
    {
      name: "loan.purpose",
      type: "string",
      required: true,
      description: "Purpose: personal, business, auto, home, etc.",
    },
    { name: "credit.score", type: "integer", required: true, description: "FICO credit score (300-850)" },
    { name: "credit.dti_ratio", type: "float", required: true, description: "Debt-to-income ratio (0-1)" },
    { name: "credit.months_employed", type: "integer", required: false, description: "Months at current employer" },
  ]

  const errorCodes = [
    {
      code: "400",
      message: "Bad Request",
      description: "Invalid parameters or malformed JSON",
      resolution: "Check request format and required fields",
    },
    {
      code: "401",
      message: "Unauthorized",
      description: "Invalid or missing API key",
      resolution: "Verify your API key is correct and included in Authorization header",
    },
    {
      code: "403",
      message: "Forbidden",
      description: "API key doesn't have required permissions",
      resolution: "Check your account permissions or upgrade plan",
    },
    {
      code: "404",
      message: "Not Found",
      description: "Endpoint or resource doesn't exist",
      resolution: "Verify the endpoint URL and API version",
    },
    {
      code: "429",
      message: "Rate Limit Exceeded",
      description: "Too many requests",
      resolution: "Wait before retrying or upgrade your plan",
    },
    {
      code: "500",
      message: "Internal Server Error",
      description: "Something went wrong on our end",
      resolution: "Retry the request or contact support if persists",
    },
    {
      code: "503",
      message: "Service Unavailable",
      description: "API is temporarily offline",
      resolution: "Check status page and retry with exponential backoff",
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 border-border backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 md:px-6 py-4">
          <div className="flex items-center gap-2">
            <Code2 className="h-5 w-5 md:h-6 md:w-6 text-sky-500" />
            <span className="font-bold text-base md:text-lg">LendGuard AI</span>
            <Badge variant="outline" className="ml-2 hidden sm:inline-flex">
              v1.0
            </Badge>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Book className="h-4 w-4 mr-2" />
              Guides
            </Button>
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <ExternalLink className="h-4 w-4 mr-2" />
              Status
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Left Sidebar */}
        <aside className="w-64 fixed left-0 top-[73px] h-[calc(100vh-73px)] border-r bg-muted/30 border-border overflow-y-auto hidden lg:block">
          <div className="p-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search docs..."
                className="pl-10 bg-background border-input"
              />
            </div>

            <nav className="space-y-1">
              {navSections.map((section) => (
                <div key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-muted text-foreground transition-colors"
                  >
                    {section.label}
                  </a>
                  {section.children && (
                    <div className="ml-4 space-y-1 mt-1">
                      {section.children.map((child) => (
                        <a
                          key={child.id}
                          href={`#${child.id}`}
                          className="block px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:ml-64 flex-1 p-4 md:p-8 max-w-5xl">
          {/* Hero Section */}
          <section className="mb-8 md:mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-sky-500 to-emerald-500 bg-clip-text text-transparent">
              LendGuard AI API Documentation
            </h1>
            <p className="text-lg md:text-xl mb-6 text-muted-foreground">
              Build intelligent lending experiences with our fraud detection and credit scoring API
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-sm text-foreground">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-emerald-500" />
                <span>200ms avg response time</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-500" />
                <span>99.9% uptime</span>
              </div>
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-emerald-500" />
                <span>RESTful API</span>
              </div>
            </div>
          </section>

          {/* Getting Started */}
          <section id="getting-started" className="mb-8 md:mb-12 scroll-mt-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">Getting Started</h2>
            <Card className="p-6 bg-card border-border">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Get your API key in 60 seconds</h3>
              <div className="space-y-3 mb-6">
                {[
                  "Sign up for free account",
                  "Navigate to API settings",
                  "Generate API key",
                  "Make your first request",
                ].map((step, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-semibold">
                      {index + 1}
                    </div>
                    <span className="text-foreground">{step}</span>
                  </div>
                ))}
              </div>
              <Link href="/dashboard">
                <Button className="bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white">
                  Start Free Trial
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </Card>
          </section>

          {/* Authentication */}
          <section id="authentication" className="mb-8 md:mb-12 scroll-mt-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">Authentication</h2>
            <p className="mb-4 text-muted-foreground">
              Authenticate your API requests using Bearer token authentication. Include your API key in the
              Authorization header.
            </p>

            <Card className="bg-slate-950 border-slate-800 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Terminal className="h-4 w-4" />
                  <span>Authentication Example</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    copyToClipboard(
                      'curl https://api.lendguard.ai/v1/score \\\n  -H "Authorization: Bearer YOUR_API_KEY"',
                      "auth",
                    )
                  }
                  className="text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  {copiedCode === "auth" ? (
                    <Check className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <pre className="p-4 text-sm text-slate-300 overflow-x-auto">
                <code>{`curl https://api.lendguard.ai/v1/score \\
  -H "Authorization: Bearer YOUR_API_KEY"`}</code>
              </pre>
            </Card>

            <div className="mt-4 flex items-center gap-2 text-sm text-emerald-500">
              <Lock className="h-4 w-4" />
              <span>All requests over HTTPS</span>
            </div>
          </section>

          {/* Main Endpoint - Score Loan */}
          <section id="score-loan" className="mb-8 md:mb-12 scroll-mt-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">Score Loan</h2>
            <p className="mb-4 text-muted-foreground">
              Evaluate a loan application and receive real-time risk scoring, fraud detection, and decision
              recommendations.
            </p>

            <div className="mb-6">
              <Badge className="bg-emerald-500 text-white">POST</Badge>
              <code className="ml-2 text-sm font-mono text-muted-foreground">/v1/score-loan</code>
            </div>

            {/* Language Tabs */}
            <div className="flex gap-2 mb-4">
              {(["curl", "python", "node", "ruby"] as const).map((lang) => (
                <Button
                  key={lang}
                  variant={selectedLanguage === lang ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLanguage(lang)}
                  className={selectedLanguage === lang ? "bg-sky-500 text-white" : "border-input"}
                >
                  {lang.toUpperCase()}
                </Button>
              ))}
            </div>

            <Card className="bg-slate-950 border-slate-800 overflow-hidden mb-6">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Terminal className="h-4 w-4" />
                  <span>Request</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(codeExamples[selectedLanguage], "request")}
                  className="text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  {copiedCode === "request" ? (
                    <Check className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <pre className="p-4 text-sm text-slate-300 overflow-x-auto">
                <code>{codeExamples[selectedLanguage]}</code>
              </pre>
            </Card>

            <h3 className="text-xl font-semibold mb-4 text-foreground">Response</h3>
            <Card className="bg-slate-950 border-slate-800 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Terminal className="h-4 w-4" />
                  <span>200 OK</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    copyToClipboard(
                      `{
  "status": "success",
  "decision": "review",
  "risk_score": 487,
  "fraud_probability": 0.23,
  "affordability_index": 7.2,
  "confidence": 0.87,
  "reasons": [
    "High DTI ratio",
    "Moderate credit score"
  ],
  "processing_time_ms": 187
}`,
                      "response",
                    )
                  }
                  className="text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  {copiedCode === "response" ? (
                    <Check className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <pre className="p-4 text-sm text-slate-300 overflow-x-auto">
                <code>{`{
  "status": "success",
  "decision": "review",
  "risk_score": 487,
  "fraud_probability": 0.23,
  "affordability_index": 7.2,
  "confidence": 0.87,
  "reasons": [
    "High DTI ratio",
    "Moderate credit score"
  ],
  "processing_time_ms": 187
}`}</code>
              </pre>
            </Card>
          </section>

          {/* Interactive Playground */}
          <section className="mb-8 md:mb-12">
            <h3 className="text-2xl font-bold mb-6 text-foreground">Try it yourself</h3>
            <Card className="p-6 bg-card border-border">
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium mb-2 block text-foreground">Request Body</label>
                  <textarea
                    value={playgroundInput}
                    onChange={(e) => setPlaygroundInput(e.target.value)}
                    className="w-full h-64 p-4 rounded-lg font-mono text-sm bg-background border-input border text-foreground"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block text-foreground">Response</label>
                  <div className="w-full h-64 p-4 rounded-lg font-mono text-sm bg-background border-input border overflow-auto">
                    {isLoading ? (
                      <div className="flex items-center justify-center h-full">
                        <Clock className="h-6 w-6 animate-spin text-sky-500" />
                      </div>
                    ) : playgroundResponse ? (
                      <pre className="text-sm text-emerald-500">{playgroundResponse}</pre>
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        Click "Send Request" to see response
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <Button
                onClick={handlePlaygroundRequest}
                disabled={isLoading}
                className="bg-sky-500 hover:bg-sky-600 text-white"
              >
                <Play className="h-4 w-4 mr-2" />
                Send Request
              </Button>
              {playgroundResponse && <span className="ml-4 text-sm text-emerald-500">Response time: 187ms</span>}
            </Card>
          </section>

          {/* Parameters Table */}
          <section className="mb-8 md:mb-12">
            <h3 className="text-2xl font-bold mb-6 text-foreground">Parameters</h3>
            <Card className="overflow-hidden bg-card border-border">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">Parameter</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">Type</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">Required</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {parameters.map((param) => (
                      <tr key={param.name}>
                        <td className="px-4 py-3 text-sm font-mono text-sky-500">{param.name}</td>
                        <td className="px-4 py-3 text-sm">
                          <Badge variant="outline" className="font-mono text-xs">
                            {param.type}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {param.required ? (
                            <Badge className="bg-red-500 text-white text-xs">Required</Badge>
                          ) : (
                            <Badge variant="outline" className="text-xs">
                              Optional
                            </Badge>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">
                          {param.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </section>

          {/* SDKs Section */}
          <section id="sdks" className="mb-8 md:mb-12 scroll-mt-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">SDKs & Libraries</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {[
                {
                  lang: "Python",
                  install: "pip install lendguard",
                  code: `from lendguard import Client\n\nclient = Client(api_key='your_key')\nresult = client.score_loan(data)`,
                },
                {
                  lang: "Node.js",
                  install: "npm install lendguard-node",
                  code: `import { LendGuard } from 'lendguard-node';\n\nconst client = new LendGuard();\nconst result = await client.scoreLoan(data);`,
                },
                {
                  lang: "Ruby",
                  install: "gem install lendguard",
                  code: `require 'lendguard'\n\nclient = LendGuard::Client.new\nresult = client.score_loan(data)`,
                },
              ].map((sdk) => (
                <Card key={sdk.lang} className="p-6 bg-card border-border">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-foreground">{sdk.lang}</h3>
                  <div className="mb-4 p-3 rounded bg-muted/50">
                    <code className="text-sm text-emerald-500">{sdk.install}</code>
                  </div>
                  <pre className="p-3 rounded text-xs overflow-x-auto bg-muted/50">
                    <code className="text-muted-foreground">{sdk.code}</code>
                  </pre>
                </Card>
              ))}
            </div>
          </section>

          {/* Webhooks */}
          <section id="webhooks" className="mb-8 md:mb-12 scroll-mt-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">Webhooks</h2>
            <p className="mb-4 text-muted-foreground">
              Receive real-time notifications when loan decisions are made or fraud is detected.
            </p>

            <Card className="p-6 mb-4 bg-card border-border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-foreground">
                <Webhook className="h-5 w-5 text-sky-500" />
                Event Types
              </h3>
              <div className="space-y-3">
                {[
                  { event: "loan.scored", desc: "Triggered when a loan is successfully scored" },
                  { event: "fraud.detected", desc: "Triggered when fraud probability exceeds threshold" },
                  { event: "decision.made", desc: "Triggered when AI makes approval/decline decision" },
                  { event: "batch.completed", desc: "Triggered when batch processing finishes" },
                ].map((item) => (
                  <div key={item.event} className="p-3 rounded bg-muted/50">
                    <code className="text-sm font-mono text-sky-500">{item.event}</code>
                    <p className="text-sm mt-1 text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          {/* Rate Limits */}
          <section id="rate-limits" className="mb-8 md:mb-12 scroll-mt-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">Rate Limits</h2>
            <Card className="overflow-hidden bg-card border-border">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px]">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">Plan</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">Requests/Month</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">Rate</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="px-4 py-3 font-semibold text-foreground">Essentials</td>
                      <td className="px-4 py-3 text-foreground">500</td>
                      <td className="px-4 py-3 text-foreground">10 req/min</td>
                      <td className="px-4 py-3 text-emerald-500 font-semibold">Free</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-foreground">Professional</td>
                      <td className="px-4 py-3 text-foreground">5,000</td>
                      <td className="px-4 py-3 text-foreground">100 req/min</td>
                      <td className="px-4 py-3 text-foreground">$99/month</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-foreground">Enterprise</td>
                      <td className="px-4 py-3 text-foreground">Unlimited</td>
                      <td className="px-4 py-3 text-foreground">Custom</td>
                      <td className="px-4 py-3 text-foreground">Contact sales</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>

            <div className="mt-4 p-4 rounded-lg flex items-start gap-3 bg-amber-100 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
              <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-700 dark:text-amber-400">Rate Limit Exceeded</p>
                <p className="text-sm mt-1 text-amber-600 dark:text-amber-500">
                  When rate limit is exceeded, you'll receive a{" "}
                  <code className="px-1 py-0.5 rounded bg-amber-500/20">429</code> status code. Implement exponential
                  backoff for retries.
                </p>
              </div>
            </div>
          </section>

          {/* Error Codes */}
          <section id="error-codes" className="mb-8 md:mb-12 scroll-mt-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">Error Codes</h2>
            <Card className="overflow-hidden bg-card border-border">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">Code</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">Message</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">Description</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">Resolution</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {errorCodes.map((error) => (
                      <tr key={error.code}>
                        <td className="px-4 py-3">
                          <Badge variant="outline" className="font-mono">
                            {error.code}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 font-semibold text-foreground">{error.message}</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">
                          {error.description}
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">
                          {error.resolution}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </section>
        </main>
      </div>
    </div>
  )
}
