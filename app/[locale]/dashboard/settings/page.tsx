"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  User,
  Users,
  Code,
  Plug,
  Shield,
  CreditCard,
  Bell,
  ChevronRight,
  Plus,
  Copy,
  Eye,
  EyeOff,
  Trash2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Download,
  Upload,
  Key,
  Webhook,
  Activity,
  Smartphone,
  Monitor,
  MessageSquare,
  Clock,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account")
  const [showApiKey, setShowApiKey] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)

  const teamMembers = [
    { name: "Sarah Johnson", email: "sarah@company.com", role: "Admin", status: "Active" },
    { name: "Mike Chen", email: "mike@company.com", role: "Analyst", status: "Active" },
    { name: "Emma Davis", email: "emma@company.com", role: "Viewer", status: "Active" },
    { name: "Robert Wilson", email: "robert@company.com", role: "Analyst", status: "Invited" },
  ]

  const webhooks = [
    {
      url: "https://api.yourapp.com/webhooks/loan",
      events: ["loan.scored", "loan.approved"],
      status: "active",
      lastDelivery: "Success - 2 min ago",
    },
    {
      url: "https://hooks.slack.com/services/XXX",
      events: ["fraud.detected"],
      status: "active",
      lastDelivery: "Success - 15 min ago",
    },
  ]

  const integrations = [
    {
      name: "Plaid",
      description: "Bank Account Verification",
      logo: "🏦",
      connected: true,
      lastSync: "2 hours ago",
      stats: "1,234 accounts verified",
    },
    {
      name: "Stripe",
      description: "Payment Processing",
      logo: "💳",
      connected: true,
      lastSync: "Active",
      stats: "1,247 transactions",
    },
    {
      name: "QuickBooks",
      description: "Accounting & Finance",
      logo: "📊",
      connected: false,
      lastSync: null,
      stats: null,
    },
    {
      name: "Salesforce",
      description: "CRM Integration",
      logo: "☁️",
      connected: false,
      lastSync: null,
      stats: null,
    },
    {
      name: "Slack",
      description: "Team Notifications",
      logo: "💬",
      connected: false,
      lastSync: null,
      stats: null,
    },
    {
      name: "Zapier",
      description: "Workflow Automation",
      logo: "⚡",
      connected: false,
      lastSync: null,
      stats: null,
    },
    {
      name: "Google Sheets",
      description: "Data Export & Sync",
      logo: "📑",
      connected: false,
      lastSync: null,
      stats: null,
    },
    {
      name: "HubSpot",
      description: "Marketing Automation",
      logo: "🎯",
      connected: false,
      lastSync: null,
      stats: null,
    },
  ]

  const activityLog = [
    { action: "API key generated", user: "Sarah Johnson", timestamp: "2 hours ago", type: "security" },
    { action: "Team member invited", user: "Sarah Johnson", timestamp: "5 hours ago", type: "team" },
    { action: "Webhook configured", user: "Mike Chen", timestamp: "1 day ago", type: "api" },
    { action: "Login from new device", user: "Sarah Johnson", timestamp: "2 days ago", type: "security" },
    { action: "Payment method updated", user: "Sarah Johnson", timestamp: "3 days ago", type: "billing" },
  ]

  const invoices = [
    { date: "Dec 1, 2024", amount: "$999.00", status: "Paid", invoice: "INV-2024-12" },
    { date: "Nov 1, 2024", amount: "$999.00", status: "Paid", invoice: "INV-2024-11" },
    { date: "Oct 1, 2024", amount: "$999.00", status: "Paid", invoice: "INV-2024-10" },
    { date: "Sep 1, 2024", amount: "$999.00", status: "Paid", invoice: "INV-2024-09" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
            <Link href="/dashboard" className="hover:text-slate-900">
              Dashboard
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-slate-900 font-medium">Settings</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-600 mt-1 text-sm md:text-base">Manage your account, team, and integrations</p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="overflow-x-auto">
            <TabsList className="bg-white border border-slate-200 p-1 h-auto flex w-max min-w-full lg:w-auto">
              <TabsTrigger value="account" className="gap-2">
                <User className="h-4 w-4" />
                Account
              </TabsTrigger>
              <TabsTrigger value="team" className="gap-2">
                <Users className="h-4 w-4" />
                Team & Access
              </TabsTrigger>
              <TabsTrigger value="api" className="gap-2">
                <Code className="h-4 w-4" />
                API & Webhooks
              </TabsTrigger>
              <TabsTrigger value="integrations" className="gap-2">
                <Plug className="h-4 w-4" />
                Integrations
              </TabsTrigger>
              <TabsTrigger value="security" className="gap-2">
                <Shield className="h-4 w-4" />
                Security
              </TabsTrigger>
              <TabsTrigger value="billing" className="gap-2">
                <CreditCard className="h-4 w-4" />
                Billing
              </TabsTrigger>
              <TabsTrigger value="notifications" className="gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Account Settings Tab */}
          <TabsContent value="account" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Profile Information</h2>

              <div className="flex items-start gap-6 mb-8">
                <Avatar className="h-20 w-20 bg-gradient-to-br from-sky-500 to-emerald-500">
                  <AvatarFallback className="text-white font-bold text-2xl">S</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <Upload className="h-4 w-4" />
                      Upload Photo
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 text-red-600 hover:text-red-700 bg-transparent"
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </Button>
                  </div>
                  <p className="text-sm text-slate-500 mt-2">JPG, PNG or GIF. Max size 2MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input id="company" defaultValue="Acme Financial Corp" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input id="name" defaultValue="Sarah Johnson" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="sarah@company.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="pst">
                    <SelectTrigger id="timezone">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                      <SelectItem value="est">Eastern Time (ET)</SelectItem>
                      <SelectItem value="cst">Central Time (CT)</SelectItem>
                      <SelectItem value="mst">Mountain Time (MT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button className="bg-sky-500 hover:bg-sky-600">Save Changes</Button>
              </div>
            </Card>

            {/* Danger Zone */}
            <Card className="p-6 border-red-200 bg-red-50/50">
              <h2 className="text-xl font-bold text-red-900 mb-2">Danger Zone</h2>
              <p className="text-sm text-red-700 mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive" className="gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Delete Account
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete your account and remove all your data
                      from our servers.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button variant="destructive">Yes, Delete Account</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </Card>
          </TabsContent>

          {/* Team & Access Tab */}
          <TabsContent value="team" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Team Members</h2>
                  <p className="text-sm text-slate-600 mt-1">Manage who has access to your account</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-sky-500 hover:bg-sky-600 gap-2">
                      <Plus className="h-4 w-4" />
                      Invite Team Member
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Invite Team Member</DialogTitle>
                      <DialogDescription>Send an invitation to join your LendGuard AI team</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="invite-email">Email Address</Label>
                        <Input id="invite-email" type="email" placeholder="colleague@company.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="invite-role">Role</Label>
                        <Select defaultValue="viewer">
                          <SelectTrigger id="invite-role">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin - Full access</SelectItem>
                            <SelectItem value="analyst">Analyst - Can view and score loans</SelectItem>
                            <SelectItem value="viewer">Viewer - Read-only access</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button className="bg-sky-500 hover:bg-sky-600">Send Invitation</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teamMembers.map((member, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{member.name}</TableCell>
                        <TableCell className="text-slate-600">{member.email}</TableCell>
                        <TableCell>
                          <Select defaultValue={member.role.toLowerCase()}>
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="analyst">Analyst</SelectItem>
                              <SelectItem value="viewer">Viewer</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Badge variant={member.status === "Active" ? "default" : "secondary"}>{member.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                              Remove
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>

            {/* Role Permissions */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Role Permissions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold text-slate-900">Admin</h3>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      Full system access
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      Manage team members
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      Configure integrations
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      Billing & payments
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-slate-900">Analyst</h3>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      View & score loans
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      Access analytics
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      Export reports
                    </li>
                    <li className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-slate-300" />
                      Team management
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-slate-900">Viewer</h3>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      View dashboard
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      View loan details
                    </li>
                    <li className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-slate-300" />
                      Score loans
                    </li>
                    <li className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-slate-300" />
                      Change settings
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* API & Webhooks Tab */}
          <TabsContent value="api" className="space-y-6">
            {/* API Keys */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">API Keys</h2>
                  <p className="text-sm text-slate-600 mt-1">Manage your API authentication keys</p>
                </div>
                <Button className="bg-sky-500 hover:bg-sky-600 gap-2">
                  <Key className="h-4 w-4" />
                  Generate New Key
                </Button>
              </div>

              <div className="space-y-4">
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-slate-900">Production API Key</h3>
                      <p className="text-sm text-slate-600 mt-1">Last used: 2 hours ago</p>
                    </div>
                    <Badge variant="default">Active</Badge>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 font-mono text-sm">
                      {showApiKey ? "sk_live_51HxNBmKg3..." : "••••••••••••••••••••••••••••••••"}
                    </div>
                    <Button variant="outline" size="icon" onClick={() => setShowApiKey(!showApiKey)}>
                      {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button variant="outline" size="icon">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Revoke Key
                    </Button>
                  </div>
                </div>

                {/* API Usage Chart */}
                <div className="border border-slate-200 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-900 mb-4">API Usage (Last 30 Days)</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Total Requests</span>
                      <span className="font-semibold">284,392</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-sky-500 to-emerald-500 w-[68%]"></div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>68% of monthly limit</span>
                      <span>132,108 remaining</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Webhooks */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Webhooks</h2>
                  <p className="text-sm text-slate-600 mt-1">Receive real-time notifications for events</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-sky-500 hover:bg-sky-600 gap-2">
                      <Plus className="h-4 w-4" />
                      Add Webhook
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add Webhook Endpoint</DialogTitle>
                      <DialogDescription>
                        Configure a webhook to receive real-time event notifications
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="webhook-url">Endpoint URL</Label>
                        <Input id="webhook-url" placeholder="https://api.yourapp.com/webhooks" />
                      </div>
                      <div className="space-y-2">
                        <Label>Events to Subscribe</Label>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="event-1" className="rounded" defaultChecked />
                            <Label htmlFor="event-1" className="font-normal cursor-pointer">
                              loan.scored
                            </Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="event-2" className="rounded" />
                            <Label htmlFor="event-2" className="font-normal cursor-pointer">
                              loan.approved
                            </Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="event-3" className="rounded" />
                            <Label htmlFor="event-3" className="font-normal cursor-pointer">
                              loan.declined
                            </Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="event-4" className="rounded" defaultChecked />
                            <Label htmlFor="event-4" className="font-normal cursor-pointer">
                              fraud.detected
                            </Label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button className="bg-sky-500 hover:bg-sky-600">Add Webhook</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-4">
                {webhooks.map((webhook, index) => (
                  <div key={index} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Webhook className="h-4 w-4 text-slate-600" />
                          <code className="text-sm font-mono text-slate-900">{webhook.url}</code>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-slate-600">Events:</span>
                            <div className="flex gap-1">
                              {webhook.events.map((event, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {event}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-500" />
                            <span className="text-slate-600">{webhook.lastDelivery}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch checked={webhook.status === "active"} />
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-2">
                          <Activity className="h-4 w-4" />
                          Test
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations" className="space-y-6">
            <Card className="p-4 md:p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Connected Integrations</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {integrations.map((integration, index) => (
                  <Card
                    key={index}
                    className={`p-6 hover:shadow-lg transition-all ${
                      integration.connected ? "border-sky-200 bg-sky-50/30" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-2xl">
                          {integration.logo}
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900">{integration.name}</h3>
                          {integration.connected && (
                            <Badge variant="default" className="mt-1 bg-emerald-500">
                              Connected
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-slate-600 mb-4">{integration.description}</p>

                    {integration.connected ? (
                      <div className="space-y-3">
                        <div className="text-xs text-slate-600 space-y-1">
                          <div className="flex items-center justify-between">
                            <span>Last sync:</span>
                            <span className="font-medium text-slate-900">{integration.lastSync}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Status:</span>
                            <span className="font-medium text-emerald-600">{integration.stats}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            Configure
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 bg-transparent"
                          >
                            Disconnect
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 bg-sky-500 text-white hover:bg-sky-600">
                          Connect
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-1 text-xs">
                          <ExternalLink className="h-3 w-3" />
                          Docs
                        </Button>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            {/* Two-Factor Authentication */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Two-Factor Authentication</h2>
                  <p className="text-sm text-slate-600 mt-1">Add an extra layer of security to your account</p>
                </div>
                <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
              </div>

              {twoFactorEnabled && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-emerald-900">Two-factor authentication is enabled</p>
                    <p className="text-sm text-emerald-700 mt-1">
                      Your account is protected with 2FA. You'll need to enter a code from your authenticator app when
                      signing in.
                    </p>
                  </div>
                </div>
              )}
            </Card>

            {/* Security Score */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Security Score</h2>
              <div className="flex items-center gap-6">
                <div className="relative h-32 w-32">
                  <svg className="transform -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="10"
                      strokeDasharray="314"
                      strokeDashoffset="31"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-slate-900">90</div>
                      <div className="text-xs text-slate-600">out of 100</div>
                    </div>
                  </div>
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                    <span className="text-sm">Two-factor authentication enabled</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                    <span className="text-sm">Strong password</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                    <span className="text-sm">Email verified</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    <span className="text-sm">No IP whitelist configured</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Active Sessions */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Active Sessions</h2>
              <div className="space-y-4">
                <div className="border border-slate-200 rounded-lg p-4 flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <Monitor className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">MacBook Pro • San Francisco, CA</div>
                      <div className="text-sm text-slate-600 mt-1">Chrome on macOS • Current session</div>
                      <div className="text-xs text-slate-500 mt-1">Last active: Just now</div>
                    </div>
                  </div>
                  <Badge variant="default" className="bg-emerald-500">
                    Current
                  </Badge>
                </div>

                <div className="border border-slate-200 rounded-lg p-4 flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center">
                      <Smartphone className="h-5 w-5 text-slate-600" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">iPhone 15 • San Francisco, CA</div>
                      <div className="text-sm text-slate-600 mt-1">Safari on iOS</div>
                      <div className="text-xs text-slate-500 mt-1">Last active: 2 hours ago</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                    Revoke
                  </Button>
                </div>
              </div>
            </Card>

            {/* Activity Log */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {activityLog.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 text-sm">
                    <div className="h-2 w-2 rounded-full bg-sky-500 flex-shrink-0"></div>
                    <div className="flex-1">
                      <span className="font-medium text-slate-900">{activity.action}</span>
                      <span className="text-slate-600"> by {activity.user}</span>
                    </div>
                    <div className="text-slate-500 text-xs">{activity.timestamp}</div>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent">
                View Full Activity Log
              </Button>
            </Card>

            {/* IP Whitelist */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">IP Whitelist</h2>
                  <p className="text-sm text-slate-600 mt-1">Restrict API access to specific IP addresses</p>
                </div>
                <Button className="bg-sky-500 hover:bg-sky-600 gap-2">
                  <Plus className="h-4 w-4" />
                  Add IP Address
                </Button>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-900">No IP restrictions configured</p>
                  <p className="text-sm text-amber-700 mt-1">
                    Your API can be accessed from any IP address. Add IP restrictions for enhanced security.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            {/* Current Plan */}
            <Card className="p-6 bg-gradient-to-br from-sky-50 to-emerald-50 border-sky-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <Badge className="mb-3 bg-sky-500">Current Plan</Badge>
                  <h2 className="text-2xl font-bold text-slate-900">Professional</h2>
                  <p className="text-slate-600 mt-1">$999/month • Billed monthly</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-slate-900">$999</div>
                  <p className="text-sm text-slate-600 mt-1">per month</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="bg-sky-500 hover:bg-sky-600">Upgrade Plan</Button>
                <Button variant="outline">Change to Annual</Button>
              </div>
            </Card>

            {/* Usage */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Usage This Month</h2>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-slate-600">Loans Analyzed</span>
                    <span className="font-semibold text-slate-900">3,847 / 5,000</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full"
                      style={{ width: "76.9%" }}
                    ></div>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">1,153 loans remaining this billing period</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-slate-600">API Calls</span>
                    <span className="font-semibold text-slate-900">284,392 / 500,000</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full"
                      style={{ width: "56.8%" }}
                    ></div>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">215,608 API calls remaining</p>
                </div>

                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-900">Estimated Overage</p>
                      <p className="text-xs text-slate-600 mt-1">If usage continues at current rate</p>
                    </div>
                    <div className="text-xl font-bold text-slate-900">$0.00</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Payment Method */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">Payment Method</h2>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Plus className="h-4 w-4" />
                  Update Card
                </Button>
              </div>

              <div className="border border-slate-200 rounded-lg p-4 flex items-center gap-4">
                <div className="h-12 w-16 rounded bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-slate-900">Visa ending in 4242</div>
                  <div className="text-sm text-slate-600 mt-1">Expires 12/2025</div>
                </div>
                <Badge variant="default" className="bg-emerald-500">
                  Default
                </Badge>
              </div>
            </Card>

            {/* Billing History */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Billing History</h2>

              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Invoice</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{invoice.date}</TableCell>
                        <TableCell>{invoice.amount}</TableCell>
                        <TableCell>
                          <Badge variant="default" className="bg-emerald-500">
                            {invoice.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono text-sm text-slate-600">{invoice.invoice}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="gap-2">
                            <Download className="h-4 w-4" />
                            Download
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>

            {/* Cancel Subscription */}
            <Card className="p-6 border-red-200 bg-red-50/50">
              <h2 className="text-xl font-bold text-red-900 mb-2">Cancel Subscription</h2>
              <p className="text-sm text-red-700 mb-4">
                Cancelling your subscription will disable all features at the end of your billing period.
              </p>
              <Button variant="outline" className="text-red-600 hover:text-red-700 border-red-300 bg-transparent">
                Cancel Subscription
              </Button>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            {/* Email Notifications */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Email Notifications</h2>

              <div className="space-y-6">
                <div className="flex items-center justify-between py-3 border-b border-slate-200">
                  <div>
                    <div className="font-medium text-slate-900">Fraud Alerts</div>
                    <div className="text-sm text-slate-600 mt-1">Get notified immediately when fraud is detected</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-slate-200">
                  <div>
                    <div className="font-medium text-slate-900">Weekly Reports</div>
                    <div className="text-sm text-slate-600 mt-1">
                      Receive weekly summary of loan activity and metrics
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-slate-200">
                  <div>
                    <div className="font-medium text-slate-900">System Updates</div>
                    <div className="text-sm text-slate-600 mt-1">Get notified about new features and improvements</div>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-slate-200">
                  <div>
                    <div className="font-medium text-slate-900">Marketing Emails</div>
                    <div className="text-sm text-slate-600 mt-1">Receive tips, best practices, and product updates</div>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between py-3">
                  <div>
                    <div className="font-medium text-slate-900">Team Activity</div>
                    <div className="text-sm text-slate-600 mt-1">
                      Get notified when team members perform important actions
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </Card>

            {/* Slack Notifications */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Slack Notifications</h2>
                  <p className="text-sm text-slate-600 mt-1">Send notifications to your Slack workspace</p>
                </div>
                <Button className="bg-sky-500 hover:bg-sky-600 gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Connect Slack
                </Button>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
                <MessageSquare className="h-12 w-12 text-slate-400 mx-auto mb-3" />
                <p className="text-sm text-slate-600">
                  Connect your Slack workspace to receive real-time notifications
                </p>
              </div>
            </Card>

            {/* SMS Alerts */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6">SMS Alerts</h2>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone-sms">Phone Number</Label>
                  <Input id="phone-sms" type="tel" placeholder="+1 (555) 123-4567" defaultValue="+1 (555) 123-4567" />
                  <p className="text-xs text-slate-500">We'll send a verification code to this number</p>
                </div>

                <div className="flex items-center justify-between py-3 border-t border-slate-200">
                  <div>
                    <div className="font-medium text-slate-900">Critical Fraud Alerts</div>
                    <div className="text-sm text-slate-600 mt-1">
                      High-priority fraud detection notifications via SMS
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between py-3 border-t border-slate-200">
                  <div>
                    <div className="font-medium text-slate-900">System Downtime</div>
                    <div className="text-sm text-slate-600 mt-1">
                      Get notified if the API is down or experiencing issues
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </Card>

            {/* Notification Schedule */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Notification Schedule</h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quiet-start">Quiet Hours Start</Label>
                    <Select defaultValue="22">
                      <SelectTrigger id="quiet-start">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="20">8:00 PM</SelectItem>
                        <SelectItem value="21">9:00 PM</SelectItem>
                        <SelectItem value="22">10:00 PM</SelectItem>
                        <SelectItem value="23">11:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quiet-end">Quiet Hours End</Label>
                    <Select defaultValue="8">
                      <SelectTrigger id="quiet-end">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">6:00 AM</SelectItem>
                        <SelectItem value="7">7:00 AM</SelectItem>
                        <SelectItem value="8">8:00 AM</SelectItem>
                        <SelectItem value="9">9:00 AM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <p className="text-xs text-slate-600">
                  <Clock className="h-3 w-3 inline mr-1" />
                  Non-urgent notifications will be paused during quiet hours
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
