"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Download,
  TrendingUp,
  TrendingDown,
  Shield,
  DollarSign,
  FileText,
  Target,
  ChevronDown,
} from "lucide-react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Sample data for charts
const loanDecisionData = [
  { day: "Day 1", approved: 45, rejected: 15, underReview: 8 },
  { day: "Day 5", approved: 52, rejected: 12, underReview: 10 },
  { day: "Day 10", approved: 48, rejected: 18, underReview: 7 },
  { day: "Day 15", approved: 65, rejected: 10, underReview: 12 },
  { day: "Day 20", approved: 58, rejected: 14, underReview: 9 },
  { day: "Day 25", approved: 70, rejected: 16, underReview: 11 },
  { day: "Day 30", approved: 75, rejected: 13, underReview: 8 },
]

const fraudBreakdownData = [
  { name: "Application Fraud", value: 45, color: "#ef4444" },
  { name: "Identity Fraud", value: 30, color: "#f97316" },
  { name: "Income Fraud", value: 15, color: "#eab308" },
  { name: "Other", value: 10, color: "#94a3b8" },
]

const riskDistributionData = [
  { range: "0-200", count: 1250 },
  { range: "201-400", count: 2100 },
  { range: "401-600", count: 1580 },
  { range: "601-800", count: 720 },
  { range: "801-1000", count: 197 },
]

const approvalRateData = [
  { purpose: "Auto", rate: 81, previousRate: 78 },
  { purpose: "Personal", rate: 72, previousRate: 70 },
  { purpose: "Education", rate: 69, previousRate: 71 },
  { purpose: "Business", rate: 65, previousRate: 62 },
  { purpose: "Home", rate: 58, previousRate: 60 },
]

const modelPerformanceData = [
  { week: "Week 1", precision: 89, recall: 86, f1Score: 87.5, rocAuc: 91 },
  { week: "Week 3", precision: 90, recall: 87, f1Score: 88.5, rocAuc: 92 },
  { week: "Week 6", precision: 91, recall: 88, f1Score: 89.5, rocAuc: 93 },
  { week: "Week 9", precision: 92, recall: 90, f1Score: 91, rocAuc: 94 },
  { week: "Week 12", precision: 94, recall: 92, f1Score: 93, rocAuc: 95 },
]

const fraudIndicators = [
  { indicator: "Synthetic Identity", frequency: 89, avgLoss: "$8,500", detectionRate: "92%" },
  { indicator: "Income Misrepresentation", frequency: 67, avgLoss: "$6,200", detectionRate: "88%" },
  { indicator: "Employment Fraud", frequency: 45, avgLoss: "$5,800", detectionRate: "95%" },
  { indicator: "Document Forgery", frequency: 33, avgLoss: "$7,100", detectionRate: "85%" },
]

export default function AnalyticsDashboard() {
  const [dateRange, setDateRange] = useState("Last 30 days")
  const [showExportMenu, setShowExportMenu] = useState(false)
  const [hiddenLines, setHiddenLines] = useState<{ [key: string]: boolean }>({})

  const toggleLine = (dataKey: string) => {
    // TODO: Restore line toggling functionality once build error is resolved.
    // setHiddenLines((prev) => ({ ...prev, [dataKey]: !prev[dataKey] }))
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-[1800px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Analytics Dashboard</h1>
            <p className="text-muted-foreground mt-1 text-sm md:text-base">
              Comprehensive insights into loan portfolio performance
            </p>
          </div>

          {/* Export Button */}
          <div className="relative w-full sm:w-auto">
            <Button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="w-full sm:w-auto bg-sky-500 hover:bg-sky-600 text-white"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Dashboard
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
            {showExportMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-popover text-popover-foreground rounded-lg shadow-lg border border-border py-2 z-50">
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors">
                  Download PDF Report
                </button>
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors">
                  Export to CSV
                </button>
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors">
                  Schedule Email Report
                </button>
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors">
                  Share Dashboard Link
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Date Range Selector */}
        <Card className="p-4 md:p-6 bg-card border-border">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Date Range:</span>
            <div className="flex flex-wrap gap-2">
              {["Last 7 days", "Last 30 days", "Last 90 days", "Custom"].map((range) => (
                <Button
                  key={range}
                  variant={dateRange === range ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDateRange(range)}
                  className={dateRange === range ? "bg-sky-500 hover:bg-sky-600" : "bg-background text-foreground border-input hover:bg-muted"}
                >
                  {range}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <Card className="p-6 bg-card border-border hover:shadow-lg transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-emerald-500" />
              </div>
              <div className="flex items-center gap-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="h-4 w-4" />
                18%
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-foreground">$2.3M</div>
              <div className="text-sm text-muted-foreground">Total Revenue Impact</div>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border hover:shadow-lg transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="h-12 w-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-red-500" />
              </div>
              <div className="flex items-center gap-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="h-4 w-4" />
                22%
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-foreground">$850K</div>
              <div className="text-sm text-muted-foreground">Fraud Prevented</div>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border hover:shadow-lg transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-500" />
              </div>
              <div className="flex items-center gap-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="h-4 w-4" />
                14%
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-foreground">5,847</div>
              <div className="text-sm text-muted-foreground">Loans Processed</div>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border hover:shadow-lg transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Target className="h-6 w-6 text-purple-500" />
              </div>
              <div className="flex items-center gap-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="h-4 w-4" />
                1.2%
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-foreground">94.2%</div>
              <div className="text-sm text-muted-foreground">Model Accuracy</div>
            </div>
          </Card>
        </div>

        {/* Main Layout - 2 Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Left Column - Main Charts */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* Loan Decision Trends */}
            <Card className="p-6 bg-card border-border">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-foreground">Loan Decision Trends</h2>
                <p className="text-sm text-muted-foreground mt-1">Daily loan decisions over the last 30 days</p>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={loanDecisionData}>
                  <defs>
                    <linearGradient id="colorApproved" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorRejected" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorUnderReview" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#eab308" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#eab308" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="day" stroke="#94a3b8" style={{ fontSize: "12px" }} />
                  <YAxis stroke="#94a3b8" style={{ fontSize: "12px" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      color: "var(--foreground)"
                    }}
                  />
                  <Legend onClick={(e) => toggleLine(String(e.dataKey))} wrapperStyle={{ cursor: "pointer" }} />

                  <Area
                    type="monotone"
                    dataKey="approved"
                    stroke="#10b981"
                    fillOpacity={1}
                    fill="url(#colorApproved)"
                    strokeWidth={2}
                    name="Approved"
                  />

                  <Area
                    type="monotone"
                    dataKey="rejected"
                    stroke="#ef4444"
                    fillOpacity={1}
                    fill="url(#colorRejected)"
                    strokeWidth={2}
                    name="Rejected"
                  />

                  <Area
                    type="monotone"
                    dataKey="underReview"
                    stroke="#eab308"
                    fillOpacity={1}
                    fill="url(#colorUnderReview)"
                    strokeWidth={2}
                    name="Under Review"
                  />

                </AreaChart>
              </ResponsiveContainer>
            </Card>

            {/* Risk Score Distribution */}
            <Card className="p-6 bg-card border-border">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-foreground">Risk Score Distribution</h2>
                <p className="text-sm text-muted-foreground mt-1">Distribution of loan applications by risk score</p>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={riskDistributionData}>
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0ea5e9" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="range" stroke="#94a3b8" style={{ fontSize: "12px" }} />
                  <YAxis stroke="#94a3b8" style={{ fontSize: "12px" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      color: "var(--foreground)"
                    }}
                  />
                  <Bar dataKey="count" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Approval Rate by Loan Purpose */}
            <Card className="p-6 bg-card border-border">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-foreground">Approval Rate by Loan Purpose</h2>
                <p className="text-sm text-muted-foreground mt-1">Comparison with previous period</p>
              </div>
              <div className="space-y-4">
                {approvalRateData.map((item) => (
                  <div key={item.purpose} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">{item.purpose}</span>
                        <span
                          className={`text-xs flex items-center gap-1 ${item.rate > item.previousRate ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
                            }`}
                        >
                          {item.rate > item.previousRate ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}
                          {Math.abs(item.rate - item.previousRate)}%
                        </span>
                      </div>
                      <span className="text-sm font-bold text-foreground">{item.rate}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full transition-all duration-500"
                        style={{ width: `${item.rate}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Model Performance Over Time */}
            <Card className="p-6 bg-card border-border">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-foreground">Model Performance Over Time</h2>
                <p className="text-sm text-muted-foreground mt-1">Last 12 weeks of model metrics</p>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={modelPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="week" stroke="#94a3b8" style={{ fontSize: "12px" }} />
                  <YAxis stroke="#94a3b8" style={{ fontSize: "12px" }} domain={[80, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      color: "var(--foreground)"
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="precision"
                    stroke="#0ea5e9"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    name="Precision"
                  />
                  <Line
                    type="monotone"
                    dataKey="recall"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    name="Recall"
                  />
                  <Line
                    type="monotone"
                    dataKey="f1Score"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    name="F1-Score"
                  />
                  <Line
                    type="monotone"
                    dataKey="rocAuc"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    name="ROC-AUC"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Top Fraud Indicators Table */}
            <Card className="p-6 bg-card border-border">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-foreground">Top Fraud Indicators</h2>
                <p className="text-sm text-muted-foreground mt-1">Most common fraud patterns detected</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Indicator</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Frequency</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Avg Loss</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Detection Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fraudIndicators.map((item, index) => (
                      <tr key={index} className="border-b border-border hover:bg-muted/50 transition-colors">
                        <td className="py-3 px-4 text-sm text-foreground font-medium">{item.indicator}</td>
                        <td className="py-3 px-4">
                          <Badge variant="secondary">{item.frequency} cases</Badge>
                        </td>
                        <td className="py-3 px-4 text-sm text-foreground font-semibold">{item.avgLoss}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden max-w-[100px]">
                              <div
                                className="h-full bg-emerald-500 rounded-full"
                                style={{ width: item.detectionRate }}
                              />
                            </div>
                            <span className="text-sm font-medium text-foreground">{item.detectionRate}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Right Column - Fraud Breakdown & Filters */}
          <div className="space-y-4 md:space-y-6">
            {/* Fraud Detection Breakdown */}
            <Card className="p-6 bg-card border-border">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-foreground">Fraud Detection</h2>
                <p className="text-sm text-muted-foreground mt-1">Breakdown by fraud type</p>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={fraudBreakdownData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {fraudBreakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      color: "var(--foreground)"
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-foreground">234</div>
                <div className="text-sm text-muted-foreground">Total Cases</div>
              </div>
              <div className="space-y-2">
                {fraudBreakdownData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-foreground">{item.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-foreground">{item.value}%</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Filters */}
            <Card className="p-6 bg-card border-border">
              <h2 className="text-lg font-bold text-foreground mb-4">Filters</h2>

              <div className="space-y-6">
                {/* Loan Amount */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Loan Amount</label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="100000"
                      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>$0</span>
                      <span>$100,000</span>
                    </div>
                  </div>
                </div>

                {/* Credit Score */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Credit Score</label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="300"
                      max="850"
                      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>300</span>
                      <span>850</span>
                    </div>
                  </div>
                </div>

                {/* Loan Purpose */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-3 block">Loan Purpose</label>
                  <div className="space-y-2">
                    {["Personal", "Business", "Auto", "Home", "Education"].map((purpose) => (
                      <label key={purpose} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="h-4 w-4 rounded border-border" />
                        <span className="text-sm text-muted-foreground">{purpose}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Risk Level */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-3 block">Risk Level</label>
                  <div className="space-y-2">
                    {["Low", "Medium", "High"].map((level) => (
                      <label key={level} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="h-4 w-4 rounded border-border" />
                        <span className="text-sm text-muted-foreground">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-sky-500 hover:bg-sky-600 text-white">Apply Filters</Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
