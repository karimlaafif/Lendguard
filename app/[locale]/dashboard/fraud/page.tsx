"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
    Shield,
    AlertTriangle,
    TrendingUp,
    Activity,
    Eye,
    Search,
    FileWarning,
    CheckCircle2,
    XCircle,
    Ban,
    DollarSign,
    Calendar,
    User,
    MapPin,
    CreditCard,
    Phone,
} from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar } from "recharts"

export default function FraudDetectionPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCase, setSelectedCase] = useState<any>(null)

    // Mock fraud cases
    const fraudCases = [
        {
            id: "FR-2024-001",
            applicantName: "Robert Wilson",
            email: "r.wilson@example.com",
            loanAmount: 45000,
            fraudScore: 87,
            riskLevel: "HIGH",
            status: "FLAGGED",
            detectedDate: "2024-01-26",
            reasons: ["Suspicious income verification", "Multiple applications", "IP address mismatch"],
            ipAddress: "192.168.1.100",
            location: "Unknown",
            deviceFingerprint: "High risk",
        },
        {
            id: "FR-2024-002",
            applicantName: "Lisa Anderson",
            email: "lisa.a@example.com",
            loanAmount: 30000,
            fraudScore: 62,
            riskLevel: "MEDIUM",
            status: "INVESTIGATING",
            detectedDate: "2024-01-25",
            reasons: ["Unusual transaction pattern", "New credit profile"],
            ipAddress: "10.0.0.50",
            location: "Chicago, IL",
            deviceFingerprint: "Medium risk",
        },
        {
            id: "FR-2024-003",
            applicantName: "James Martinez",
            email: "j.martinez@fake.com",
            loanAmount: 75000,
            fraudScore: 95,
            riskLevel: "CRITICAL",
            status: "BLOCKED",
            detectedDate: "2024-01-24",
            reasons: ["Stolen identity", "Fake documents", "Email domain blacklisted", "Previous fraud record"],
            ipAddress: "203.0.113.45",
            location: "International",
            deviceFingerprint: "Critical threat",
        },
        {
            id: "FR-2024-004",
            applicantName: "Emma Davis",
            email: "emma.d@example.com",
            loanAmount: 18000,
            fraudScore: 35,
            riskLevel: "LOW",
            status: "CLEARED",
            detectedDate: "2024-01-23",
            reasons: ["Minor inconsistencies - resolved"],
            ipAddress: "192.168.0.1",
            location: "New York, NY",
            deviceFingerprint: "Low risk",
        },
    ]

    const stats = [
        { label: "Total Cases", value: fraudCases.length, icon: FileWarning, color: "text-muted-foreground", bgColor: "bg-muted" },
        { label: "High Risk", value: fraudCases.filter((c) => c.riskLevel === "HIGH" || c.riskLevel === "CRITICAL").length, icon: AlertTriangle, color: "text-red-600 dark:text-red-400", bgColor: "bg-red-100 dark:bg-red-900/20" },
        { label: "Under Investigation", value: fraudCases.filter((c) => c.status === "INVESTIGATING" || c.status === "FLAGGED").length, icon: Activity, color: "text-amber-600 dark:text-amber-400", bgColor: "bg-amber-100 dark:bg-amber-900/20" },
        { label: "Blocked", value: fraudCases.filter((c) => c.status === "BLOCKED").length, icon: Ban, color: "text-purple-600 dark:text-purple-400", bgColor: "bg-purple-100 dark:bg-purple-900/20" },
    ]

    const fraudTrends = [
        { month: "Jan", cases: 12 },
        { month: "Feb", cases: 18 },
        { month: "Mar", cases: 15 },
        { month: "Apr", cases: 22 },
        { month: "May", cases: 19 },
        { month: "Jun", cases: 16 },
    ]

    const fraudTypes = [
        { name: "Identity Theft", value: 35, color: "#ef4444" },
        { name: "Document Fraud", value: 28, color: "#f59e0b" },
        { name: "Income Misrepresentation", value: 22, color: "#eab308" },
        { name: "Multiple Applications", value: 15, color: "#84cc16" },
    ]

    const getRiskColor = (level: string) => {
        switch (level) {
            case "CRITICAL":
                return "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800"
            case "HIGH":
                return "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800"
            case "MEDIUM":
                return "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800"
            case "LOW":
                return "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
            default:
                return "bg-muted text-muted-foreground border-border"
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "BLOCKED":
                return "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800"
            case "FLAGGED":
                return "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800"
            case "INVESTIGATING":
                return "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800"
            case "CLEARED":
                return "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
            default:
                return "bg-muted text-muted-foreground border-border"
        }
    }

    const filteredCases = fraudCases.filter((fraudCase) =>
        fraudCase.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fraudCase.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fraudCase.email.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-40">
                <div className="px-4 md:px-6 py-4">
                    <div className="flex items-center gap-2 mb-4">
                        <Shield className="h-6 w-6 text-red-500" />
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">Fraud Detection</h1>
                            <p className="text-sm text-muted-foreground">Real-time monitoring and fraud prevention</p>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {stats.map((stat, index) => (
                            <Card key={index} className="p-4 bg-card border-border">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                                    </div>
                                    <div className={`h-12 w-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="p-4 md:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Charts */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Fraud Trends */}
                        <Card className="p-6 bg-card border-border">
                            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-sky-500" />
                                Monthly Trends
                            </h3>
                            <ResponsiveContainer width="100%" height={200}>
                                <LineChart data={fraudTrends}>
                                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                                    <YAxis stroke="#94a3b8" fontSize={12} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                                    />
                                    <Line type="monotone" dataKey="cases" stroke="#ef4444" strokeWidth={2} dot={{ fill: "#ef4444" }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </Card>

                        {/* Fraud Types */}
                        <Card className="p-6 bg-card border-border">
                            <h3 className="text-lg font-bold text-foreground mb-4">Fraud Types</h3>
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie
                                        data={fraudTypes}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={50}
                                        outerRadius={80}
                                        dataKey="value"
                                        label
                                    >
                                        {fraudTypes.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="mt-4 space-y-2">
                                {fraudTypes.map((type, index) => (
                                    <div key={index} className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: type.color }} />
                                            <span className="text-muted-foreground">{type.name}</span>
                                        </div>
                                        <span className="font-semibold text-foreground">{type.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Right Column - Cases Table */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Search */}
                        <Card className="p-4 bg-card border-border">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search fraud cases..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 bg-background border-input text-foreground"
                                />
                            </div>
                        </Card>

                        {/* Cases List */}
                        <div className="space-y-4">
                            {filteredCases.map((fraudCase) => (
                                <Card key={fraudCase.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer bg-card border-border hover:bg-muted/50" onClick={() => setSelectedCase(fraudCase)}>
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`h-12 w-12 rounded-lg ${fraudCase.riskLevel === "CRITICAL" || fraudCase.riskLevel === "HIGH" ? "bg-red-100 dark:bg-red-900/20" : fraudCase.riskLevel === "MEDIUM" ? "bg-amber-100 dark:bg-amber-900/20" : "bg-emerald-100 dark:bg-emerald-900/20"} flex items-center justify-center`}>
                                                <AlertTriangle className={`h-6 w-6 ${fraudCase.riskLevel === "CRITICAL" || fraudCase.riskLevel === "HIGH" ? "text-red-600 dark:text-red-400" : fraudCase.riskLevel === "MEDIUM" ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400"}`} />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-foreground">{fraudCase.applicantName}</h3>
                                                <p className="text-sm text-muted-foreground">{fraudCase.id}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <Badge className={`${getRiskColor(fraudCase.riskLevel)} border`}>
                                                {fraudCase.riskLevel}
                                            </Badge>
                                            <Badge className={`${getStatusColor(fraudCase.status)} border`}>
                                                {fraudCase.status}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                                        <div>
                                            <p className="text-xs text-muted-foreground">Fraud Score</p>
                                            <p className="text-lg font-bold text-red-600 dark:text-red-400">{fraudCase.fraudScore}%</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Loan Amount</p>
                                            <p className="text-lg font-semibold text-foreground">${fraudCase.loanAmount.toLocaleString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Detected</p>
                                            <p className="text-sm font-medium text-muted-foreground">{fraudCase.detectedDate}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-xs text-muted-foreground mb-2">Detection Reasons:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {fraudCase.reasons.map((reason, index) => (
                                                <Badge key={index} variant="outline" className="text-xs border-border text-muted-foreground">
                                                    {reason}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">{fraudCase.email}</span>
                                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                                            <Eye className="h-4 w-4 mr-2" />
                                            View Details
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        {filteredCases.length === 0 && (
                            <Card className="p-12 text-center bg-card border-border">
                                <Shield className="h-12 w-12 mx-auto mb-4 opacity-20 text-muted-foreground" />
                                <p className="text-muted-foreground">No fraud cases found</p>
                            </Card>
                        )}
                    </div>
                </div>
            </div>

            {/* Case Details Modal */}
            {selectedCase && (
                <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => setSelectedCase(null)}>
                    <Card className="max-w-3xl w-full max-h-[90vh] overflow-y-auto bg-card border-border shadow-lg" onClick={(e) => e.stopPropagation()}>
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-foreground">Fraud Case Details</h2>
                                <Button variant="ghost" size="sm" onClick={() => setSelectedCase(null)}>
                                    ✕
                                </Button>
                            </div>

                            {/* Risk Alert */}
                            <div className={`p-4 rounded-lg mb-6 ${selectedCase.riskLevel === "CRITICAL" ? "bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800" : selectedCase.riskLevel === "HIGH" ? "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800" : selectedCase.riskLevel === "MEDIUM" ? "bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800" : "bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800"}`}>
                                <div className="flex items-center gap-3">
                                    <AlertTriangle className={`h-6 w-6 ${selectedCase.riskLevel === "CRITICAL" ? "text-purple-600 dark:text-purple-400" : selectedCase.riskLevel === "HIGH" ? "text-red-600 dark:text-red-400" : selectedCase.riskLevel === "MEDIUM" ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400"}`} />
                                    <div>
                                        <p className="font-semibold text-foreground">{selectedCase.riskLevel} Risk Level</p>
                                        <p className="text-sm text-muted-foreground">Fraud Score: {selectedCase.fraudScore}%</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {/* Applicant Info */}
                                <div>
                                    <h3 className="text-lg font-semibold text-foreground mb-3">Applicant Information</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <p className="text-xs text-muted-foreground">Name</p>
                                                <p className="text-sm font-medium text-foreground">{selectedCase.applicantName}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <p className="text-xs text-muted-foreground">Loan Amount</p>
                                                <p className="text-sm font-semibold text-foreground">${selectedCase.loanAmount.toLocaleString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Technical Details */}
                                <div>
                                    <h3 className="text-lg font-semibold text-foreground mb-3">Technical Analysis</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Card className="p-3 bg-muted/50 border-border">
                                            <p className="text-xs text-muted-foreground mb-1">IP Address</p>
                                            <p className="text-sm font-mono font-medium text-foreground">{selectedCase.ipAddress}</p>
                                        </Card>
                                        <Card className="p-3 bg-muted/50 border-border">
                                            <p className="text-xs text-muted-foreground mb-1">Location</p>
                                            <p className="text-sm font-medium text-foreground">{selectedCase.location}</p>
                                        </Card>
                                        <Card className="p-3 bg-muted/50 border-border">
                                            <p className="text-xs text-muted-foreground mb-1">Device Risk</p>
                                            <p className="text-sm font-medium text-foreground">{selectedCase.deviceFingerprint}</p>
                                        </Card>
                                        <Card className="p-3 bg-muted/50 border-border">
                                            <p className="text-xs text-muted-foreground mb-1">Status</p>
                                            <Badge className={`${getStatusColor(selectedCase.status)} border`}>
                                                {selectedCase.status}
                                            </Badge>
                                        </Card>
                                    </div>
                                </div>

                                {/* Red Flags */}
                                <div>
                                    <h3 className="text-lg font-semibold text-foreground mb-3">Detection Reasons</h3>
                                    <div className="space-y-2">
                                        {selectedCase.reasons.map((reason: string, index: number) => (
                                            <div key={index} className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-800">
                                                <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                                                <p className="text-sm text-foreground">{reason}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3 pt-4 border-t border-border">
                                    <Button className="flex-1 bg-red-500 hover:bg-red-600 text-white">
                                        <Ban className="h-4 w-4 mr-2" />
                                        Block Application
                                    </Button>
                                    <Button variant="outline" className="flex-1 border-input" onClick={() => setSelectedCase(null)}>
                                        Close
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    )
}
