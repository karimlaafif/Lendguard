"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Shield,
    TrendingUp,
    Users,
    AlertTriangle,
    ArrowRight,
    FileText,
    Activity,
    CheckCircle2
} from "lucide-react"
import Link from "next/link"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from "recharts"

const data = [
    { name: 'Mon', apps: 45, risk: 12 },
    { name: 'Tue', apps: 52, risk: 8 },
    { name: 'Wed', apps: 48, risk: 15 },
    { name: 'Thu', apps: 61, risk: 10 },
    { name: 'Fri', apps: 55, risk: 14 },
    { name: 'Sat', apps: 40, risk: 5 },
    { name: 'Sun', apps: 38, risk: 7 },
]

export default function DashboardPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Portfolio Overview</h1>
                    <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
                </div>
                <div className="flex gap-3">
                    <Link href="/dashboard/score">
                        <Button className="bg-sky-500 hover:bg-sky-600 text-white border-0">
                            <FileText className="mr-2 h-4 w-4" />
                            New Application
                        </Button>
                    </Link>
                    <Button variant="outline" className="bg-card text-foreground border-border hover:bg-muted/50">
                        <Activity className="mr-2 h-4 w-4 text-sky-500" />
                        Generate Report
                    </Button>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                    title="Total Applications"
                    value="1,284"
                    change="+12.5%"
                    trend="up"
                    icon={FileText}
                    color="blue"
                />
                <MetricCard
                    title="Approval Rate"
                    value="72.4%"
                    change="+3.2%"
                    trend="up"
                    icon={CheckCircle2}
                    color="emerald"
                />
                <MetricCard
                    title="Fraud Prevented"
                    value="$842K"
                    change="+18%"
                    trend="up"
                    icon={Shield}
                    color="sky"
                />
                <MetricCard
                    title="High Risk Alerts"
                    value="24"
                    change="-5%"
                    trend="down"
                    icon={AlertTriangle}
                    color="amber"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart */}
                <Card className="lg:col-span-2 p-6 bg-card border-border">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-foreground">Application Activity</h3>
                        <select className="text-sm border-border rounded-md bg-background text-foreground p-1">
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                        </select>
                    </div>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.3} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'var(--card)',
                                        borderColor: 'var(--border)',
                                        borderRadius: '8px',
                                        color: 'var(--foreground)'
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="apps"
                                    stroke="#0ea5e9"
                                    fillOpacity={1}
                                    fill="url(#colorApps)"
                                    strokeWidth={2}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Quick Stats/Links */}
                <div className="space-y-6">
                    <Card className="p-6 bg-slate-900 text-white border-slate-800">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-emerald-400" />
                            ML Performance
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1 text-slate-400">
                                    <span>Accuracy Rate</span>
                                    <span className="text-white">94.2%</span>
                                </div>
                                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-400 w-[94.2%]" />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1 text-slate-400">
                                    <span>Fraud Recall</span>
                                    <span className="text-white">88.5%</span>
                                </div>
                                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-400 w-[88.5%]" />
                                </div>
                            </div>
                            <Link href="/dashboard/analytics">
                                <Button variant="link" className="text-sky-400 p-0 h-auto mt-2 hover:text-sky-300">
                                    View Detailed Metrics <ArrowRight className="ml-1 h-3 w-3" />
                                </Button>
                            </Link>
                        </div>
                    </Card>

                    <Card className="p-6 bg-card border-border">
                        <h3 className="font-bold text-foreground mb-4">Inference Engine</h3>
                        <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 border border-border mb-4">
                            <div className="h-10 w-10 rounded-full bg-sky-100 dark:bg-sky-900/20 flex items-center justify-center">
                                <Shield className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-foreground">Model: GB-V1.28</p>
                                <p className="text-xs text-muted-foreground">Status: Optimized (Active)</p>
                            </div>
                        </div>
                        <Link href="/dashboard/score">
                            <Button variant="outline" className="w-full bg-card text-foreground border-border hover:bg-muted/50">
                                Run Simulation
                            </Button>
                        </Link>
                    </Card>
                </div>
            </div>
        </div>
    )
}

function MetricCard({ title, value, change, trend, icon: Icon, color }: any) {
    const colorMap: any = {
        blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
        emerald: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400",
        sky: "bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400",
        amber: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400",
    }

    return (
        <Card className="p-6 bg-card border-border hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${colorMap[color]}`}>
                    <Icon className="h-5 w-5" />
                </div>
                <div className={`text-xs font-bold px-2 py-1 rounded-full ${trend === 'up' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                    }`}>
                    {change}
                </div>
            </div>
            <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
                <p className="text-2xl font-bold text-foreground">{value}</p>
            </div>
        </Card>
    )
}
