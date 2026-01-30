"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
    FileText,
    Search,
    Filter,
    Download,
    Eye,
    MoreHorizontal,
    CheckCircle,
    XCircle,
    Clock,
    TrendingUp,
    DollarSign,
    Calendar,
    User,
    Mail,
    Phone,
    MapPin,
    Briefcase,
    CreditCard,
} from "lucide-react"

export default function LoansPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [selectedLoan, setSelectedLoan] = useState<any>(null)

    // Mock loan data
    const loans = [
        {
            id: "LN-2024-001",
            applicantName: "John Doe",
            email: "john.doe@example.com",
            amount: 25000,
            status: "APPROVED",
            riskScore: 290,
            date: "2024-01-15",
            purpose: "Debt Consolidation",
            creditScore: 720,
            income: 85000,
            employment: "Software Engineer",
            phone: "+1 (555) 000-0000",
            address: "123 Main St, New York, NY",
        },
        {
            id: "LN-2024-002",
            applicantName: "Jane Smith",
            email: "jane.smith@example.com",
            amount: 50000,
            status: "UNDER_REVIEW",
            riskScore: 520,
            date: "2024-01-18",
            purpose: "Home Improvement",
            creditScore: 680,
            income: 92000,
            employment: "Architect",
            phone: "+1 (555) 000-0001",
            address: "456 Park Ave, Boston, MA",
        },
        {
            id: "LN-2024-003",
            applicantName: "Mike Johnson",
            email: "mike.j@example.com",
            amount: 15000,
            status: "REJECTED",
            riskScore: 780,
            date: "2024-01-20",
            purpose: "Auto",
            creditScore: 580,
            income: 45000,
            employment: "Sales Representative",
            phone: "+1 (555) 000-0002",
            address: "789 Oak Ln, Chicago, IL",
        },
        {
            id: "LN-2024-004",
            applicantName: "Sarah Williams",
            email: "sarah.w@example.com",
            amount: 35000,
            status: "APPROVED",
            riskScore: 310,
            date: "2024-01-22",
            purpose: "Business",
            creditScore: 750,
            income: 120000,
            employment: "Business Owner",
            phone: "+1 (555) 000-0003",
            address: "321 Pine Rd, Seattle, WA",
        },
        {
            id: "LN-2024-005",
            applicantName: "David Brown",
            email: "david.b@example.com",
            amount: 20000,
            status: "PENDING",
            riskScore: 450,
            date: "2024-01-25",
            purpose: "Education",
            creditScore: 650,
            income: 55000,
            employment: "Teacher",
            phone: "+1 (555) 000-0004",
            address: "654 Elm St, Austin, TX",
        },
    ]

    const getStatusColor = (status: string) => {
        switch (status) {
            case "APPROVED":
                return "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
            case "REJECTED":
                return "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800"
            case "UNDER_REVIEW":
                return "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800"
            case "PENDING":
                return "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800"
            default:
                return "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400 border-slate-200 dark:border-slate-700"
        }
    }

    const getRiskColor = (score: number) => {
        if (score < 400) return "text-emerald-600 dark:text-emerald-400"
        if (score < 700) return "text-amber-600 dark:text-amber-400"
        return "text-red-600 dark:text-red-400"
    }

    const stats = [
        { label: "Total Loans", value: loans.length, icon: FileText, color: "text-sky-500", bgColor: "bg-sky-100 dark:bg-sky-900/20" },
        { label: "Approved", value: loans.filter((l) => l.status === "APPROVED").length, icon: CheckCircle, color: "text-emerald-500", bgColor: "bg-emerald-100 dark:bg-emerald-900/20" },
        { label: "Under Review", value: loans.filter((l) => l.status === "UNDER_REVIEW").length, icon: Clock, color: "text-amber-500", bgColor: "bg-amber-100 dark:bg-amber-900/20" },
        { label: "Rejected", value: loans.filter((l) => l.status === "REJECTED").length, icon: XCircle, color: "text-red-500", bgColor: "bg-red-100 dark:bg-red-900/20" },
    ]

    const filteredLoans = loans.filter((loan) => {
        const matchesSearch =
            loan.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            loan.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            loan.email.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = statusFilter === "all" || loan.status === statusFilter
        return matchesSearch && matchesStatus
    })

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-40">
                <div className="px-4 md:px-6 py-4">
                    <div className="flex items-center gap-2 mb-4">
                        <FileText className="h-6 w-6 text-sky-500" />
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">Loan Management</h1>
                            <p className="text-sm text-muted-foreground">Track and manage all loan applications</p>
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
                <Card className="overflow-hidden bg-card border-border">
                    {/* Filters Bar */}
                    <div className="p-4 border-b border-border flex flex-col md:flex-row gap-4 items-center justify-between bg-card">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by name, ID, or email..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 bg-background border-input text-foreground"
                            />
                        </div>
                        <div className="flex gap-2 w-full md:w-auto">
                            <select
                                className="h-10 px-3 rounded-md border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="all">All Status</option>
                                <option value="APPROVED">Approved</option>
                                <option value="UNDER_REVIEW">Under Review</option>
                                <option value="PENDING">Pending</option>
                                <option value="REJECTED">Rejected</option>
                            </select>
                            <Button variant="outline" className="border-input text-foreground hover:bg-muted">
                                <Download className="h-4 w-4 mr-2" />
                                Export
                            </Button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-muted/50 border-b border-border">
                                tr text-left
                                <tr className="text-left">
                                    <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Loan ID</th>
                                    <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Applicant</th>
                                    <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Amount</th>
                                    <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Purpose</th>
                                    <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Risk Score</th>
                                    <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                                    <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                                    <th className="px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border bg-card">
                                {filteredLoans.map((loan) => (
                                    <tr key={loan.id} className="hover:bg-muted/50 transition-colors">
                                        <td className="px-4 py-3 text-sm font-mono text-sky-600 dark:text-sky-400">{loan.id}</td>
                                        <td className="px-4 py-3">
                                            <div>
                                                <div className="text-sm font-medium text-foreground">{loan.applicantName}</div>
                                                <div className="text-xs text-muted-foreground">{loan.email}</div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-sm font-semibold text-foreground">
                                            ${loan.amount.toLocaleString()}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-muted-foreground">{loan.purpose}</td>
                                        <td className="px-4 py-3">
                                            <span className={`font-bold ${getRiskColor(loan.riskScore)}`}>
                                                {loan.riskScore}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <Badge className={`${getStatusColor(loan.status)} border px-2 py-0.5 text-xs font-semibold`}>
                                                {loan.status.replace("_", " ")}
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-muted-foreground">{loan.date}</td>
                                        <td className="px-4 py-3 text-right">
                                            <Button variant="ghost" size="icon" onClick={() => setSelectedLoan(loan)} className="hover:bg-muted">
                                                <Eye className="h-4 w-4 text-muted-foreground" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>

            {/* Loan Details Modal */}
            {selectedLoan && (
                <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-hidden" onClick={() => setSelectedLoan(null)}>
                    <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-card border-border shadow-lg" onClick={(e) => e.stopPropagation()}>
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-foreground">Loan Details</h2>
                                <Button variant="ghost" size="sm" onClick={() => setSelectedLoan(null)} className="hover:bg-muted">
                                    ✕
                                </Button>
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
                                                <p className="text-sm font-medium text-foreground">{selectedLoan.applicantName}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Mail className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <p className="text-xs text-muted-foreground">Email</p>
                                                <p className="text-sm font-medium text-foreground">{selectedLoan.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Phone className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <p className="text-xs text-muted-foreground">Phone</p>
                                                <p className="text-sm font-medium text-foreground">{selectedLoan.phone}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <p className="text-xs text-muted-foreground">Address</p>
                                                <p className="text-sm font-medium text-foreground">{selectedLoan.address}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Loan Details */}
                                <div>
                                    <h3 className="text-lg font-semibold text-foreground mb-3">Loan Details</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex items-center gap-2">
                                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <p className="text-xs text-muted-foreground">Amount</p>
                                                <p className="text-sm font-medium text-foreground">${selectedLoan.amount.toLocaleString()}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <p className="text-xs text-muted-foreground">Purpose</p>
                                                <p className="text-sm font-medium text-foreground">{selectedLoan.purpose}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <p className="text-xs text-muted-foreground">Date</p>
                                                <p className="text-sm font-medium text-foreground">{selectedLoan.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <p className="text-xs text-muted-foreground">ID</p>
                                                <p className="text-sm font-medium text-foreground">{selectedLoan.id}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Risk Assessment */}
                                <div>
                                    <h3 className="text-lg font-semibold text-foreground mb-3">Risk Assessment</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Card className="p-4 bg-muted/50 border-border">
                                            <p className="text-xs text-muted-foreground mb-1">Risk Score</p>
                                            <p className={`text-2xl font-bold ${getRiskColor(selectedLoan.riskScore)}`}>{selectedLoan.riskScore}</p>
                                        </Card>
                                        <Card className="p-4 bg-muted/50 border-border">
                                            <p className="text-xs text-muted-foreground mb-1">Credit Score</p>
                                            <p className="text-2xl font-bold text-foreground">{selectedLoan.creditScore}</p>
                                        </Card>
                                    </div>
                                </div>

                                {/* Status and Decision */}
                                <div>
                                    <h3 className="text-lg font-semibold text-foreground mb-3">Decision</h3>
                                    <div className="flex items-center gap-3">
                                        <Badge className={`${getStatusColor(selectedLoan.status)} border px-4 py-2 text-sm`}>
                                            {selectedLoan.status.replace("_", " ")}
                                        </Badge>
                                        <Button className="ml-auto" variant="outline">
                                            <Download className="h-4 w-4 mr-2" />
                                            Download Report
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    )
}
