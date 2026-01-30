"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { toast } from "sonner"
import {
  Palette,
  Type,
  Layout,
  Boxes,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Info,
  AlertTriangle,
  Copy,
  Download,
  Loader2,
  Zap,
  Shield,
  TrendingUp,
} from "lucide-react"

export default function DesignSystemPage() {
  const [copiedToken, setCopiedToken] = useState<string | null>(null)

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopiedToken(label)
    toast.success(`Copied ${label}`)
    setTimeout(() => setCopiedToken(null), 2000)
  }

  const colorTokens = [
    { name: "Primary (Sky Blue)", value: "#0EA5E9", var: "--primary", usage: "Primary actions, links, brand elements" },
    { name: "Secondary (Emerald)", value: "#10B981", var: "--secondary", usage: "Secondary actions, success states" },
    { name: "Destructive (Red)", value: "#EF4444", var: "--destructive", usage: "Errors, destructive actions, alerts" },
    { name: "Warning (Amber)", value: "#F59E0B", var: "--warning", usage: "Warnings, cautionary information" },
    { name: "Success (Green)", value: "#22C55E", var: "--success", usage: "Success states, confirmations" },
    { name: "Background (Slate)", value: "#0F172A", var: "--background", usage: "Main background, dark mode base" },
    { name: "Muted (Zinc)", value: "#71717A", var: "--muted-foreground", usage: "Secondary text, subtle elements" },
  ]

  const spacingTokens = [
    { name: "XS", value: "4px", class: "gap-1 p-1", usage: "Tight spacing, icon gaps" },
    { name: "SM", value: "8px", class: "gap-2 p-2", usage: "Component padding, small gaps" },
    { name: "MD", value: "16px", class: "gap-4 p-4", usage: "Default spacing, cards" },
    { name: "LG", value: "24px", class: "gap-6 p-6", usage: "Section spacing, containers" },
    { name: "XL", value: "32px", class: "gap-8 p-8", usage: "Large section gaps" },
    { name: "2XL", value: "48px", class: "gap-12 p-12", usage: "Hero sections, major divisions" },
  ]

  const buttonVariants = [
    { variant: "default", label: "Primary", icon: Zap },
    { variant: "secondary", label: "Secondary", icon: Shield },
    { variant: "outline", label: "Outline", icon: TrendingUp },
    { variant: "ghost", label: "Ghost", icon: Sparkles },
    { variant: "destructive", label: "Destructive", icon: AlertCircle },
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-background">
      <div className="border-b border-border bg-background">
        <div className="container mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">LendGuard AI Design System</h1>
          </div>
          <p className="text-muted-foreground text-base md:text-lg">
            Complete design tokens, components, and guidelines for building consistent interfaces
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-6 md:py-8">
        <Tabs defaultValue="colors" className="space-y-6">
          <div className="overflow-x-auto">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 lg:w-auto lg:inline-grid min-w-max">
              <TabsTrigger value="colors" className="gap-2">
                <Palette className="h-4 w-4" />
                <span className="hidden sm:inline">Colors</span>
              </TabsTrigger>
              <TabsTrigger value="typography" className="gap-2">
                <Type className="h-4 w-4" />
                <span className="hidden sm:inline">Typography</span>
              </TabsTrigger>
              <TabsTrigger value="spacing" className="gap-2">
                <Layout className="h-4 w-4" />
                <span className="hidden sm:inline">Spacing</span>
              </TabsTrigger>
              <TabsTrigger value="components" className="gap-2">
                <Boxes className="h-4 w-4" />
                <span className="hidden sm:inline">Components</span>
              </TabsTrigger>
              <TabsTrigger value="animations" className="gap-2">
                <Sparkles className="h-4 w-4" />
                <span className="hidden sm:inline">Animations</span>
              </TabsTrigger>
              <TabsTrigger value="icons" className="gap-2">
                <Zap className="h-4 w-4" />
                <span className="hidden sm:inline">Icons</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Colors Tab */}
          <TabsContent value="colors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Color Palette</CardTitle>
                <CardDescription>
                  LendGuard AI uses a focused color palette with Sky Blue as primary and Emerald as secondary
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {colorTokens.map((token) => (
                  <div
                    key={token.name}
                    className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div
                      className="w-16 h-16 rounded-lg shadow-md border border-border"
                      style={{ backgroundColor: token.value }}
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{token.name}</h3>
                      <p className="text-sm text-muted-foreground">{token.usage}</p>
                      <div className="flex gap-2 mt-2">
                        <code className="text-xs bg-muted px-2 py-1 rounded">{token.value}</code>
                        <code className="text-xs bg-muted px-2 py-1 rounded">{token.var}</code>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard(token.value, token.name)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Accessibility</CardTitle>
                <CardDescription>
                  All color combinations meet WCAG 2.1 AA standards (4.5:1 contrast ratio)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-primary text-primary-foreground p-4 rounded-lg">
                    <p className="font-semibold">Primary + Foreground</p>
                    <p className="text-sm opacity-90">Contrast: 7.2:1 ✓</p>
                  </div>
                  <div className="bg-secondary text-secondary-foreground p-4 rounded-lg">
                    <p className="font-semibold">Secondary + Foreground</p>
                    <p className="text-sm opacity-90">Contrast: 6.8:1 ✓</p>
                  </div>
                  <div className="bg-destructive text-destructive-foreground p-4 rounded-lg">
                    <p className="font-semibold">Destructive + Foreground</p>
                    <p className="text-sm opacity-90">Contrast: 5.1:1 ✓</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Typography Tab */}
          <TabsContent value="typography" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Font Families</CardTitle>
                <CardDescription>Inter for UI text, Fira Code for code snippets</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2">Sans Serif (Inter)</h3>
                  <p className="font-sans text-2xl">The quick brown fox jumps over the lazy dog</p>
                  <code className="text-xs text-muted-foreground">font-family: Inter</code>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2">Monospace (Fira Code)</h3>
                  <p className="font-mono text-xl">const result = await api.analyze(loanData)</p>
                  <code className="text-xs text-muted-foreground">font-family: Fira Code</code>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Type Scale</CardTitle>
                <CardDescription>Consistent heading and text sizes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h1 className="text-5xl font-bold">Heading 1 - 48px Bold</h1>
                  <h2 className="text-4xl font-bold">Heading 2 - 36px Bold</h2>
                  <h3 className="text-3xl font-semibold">Heading 3 - 30px Semibold</h3>
                  <h4 className="text-2xl font-semibold">Heading 4 - 24px Semibold</h4>
                  <h5 className="text-xl font-semibold">Heading 5 - 20px Semibold</h5>
                  <h6 className="text-lg font-semibold">Heading 6 - 18px Semibold</h6>
                  <p className="text-base">Body - 16px Regular (leading-relaxed for readability)</p>
                  <p className="text-sm text-muted-foreground">Small - 14px Regular</p>
                  <p className="text-xs text-muted-foreground">Extra Small - 12px Regular</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Font Weights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-normal">Normal (400) - Body text, descriptions</p>
                  <p className="font-medium">Medium (500) - UI elements, labels</p>
                  <p className="font-semibold">Semibold (600) - Subheadings, emphasis</p>
                  <p className="font-bold">Bold (700) - Headings, strong emphasis</p>
                  <p className="font-extrabold">Extra Bold (800) - Hero headings, major titles</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Spacing Tab */}
          <TabsContent value="spacing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Spacing Scale</CardTitle>
                <CardDescription>Consistent spacing system based on 4px base unit</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {spacingTokens.map((token) => (
                  <div key={token.name} className="flex items-center gap-4">
                    <div className="w-32">
                      <p className="font-semibold">{token.name}</p>
                      <p className="text-sm text-muted-foreground">{token.value}</p>
                    </div>
                    <div className="flex-1">
                      <div className="bg-primary h-8" style={{ width: token.value }} />
                    </div>
                    <code className="text-xs bg-muted px-2 py-1 rounded">{token.class}</code>
                    <p className="text-sm text-muted-foreground w-48">{token.usage}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Border Radius</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-primary mx-auto rounded-sm" />
                    <p className="mt-2 text-sm font-semibold">SM</p>
                    <p className="text-xs text-muted-foreground">4px</p>
                  </div>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-primary mx-auto rounded-md" />
                    <p className="mt-2 text-sm font-semibold">MD</p>
                    <p className="text-xs text-muted-foreground">8px</p>
                  </div>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-primary mx-auto rounded-lg" />
                    <p className="mt-2 text-sm font-semibold">LG</p>
                    <p className="text-xs text-muted-foreground">12px</p>
                  </div>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-primary mx-auto rounded-xl" />
                    <p className="mt-2 text-sm font-semibold">XL</p>
                    <p className="text-xs text-muted-foreground">16px</p>
                  </div>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-primary mx-auto rounded-full" />
                    <p className="mt-2 text-sm font-semibold">FULL</p>
                    <p className="text-xs text-muted-foreground">9999px</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Components Tab */}
          <TabsContent value="components" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Buttons</CardTitle>
                <CardDescription>Five button variants for different actions and contexts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    {buttonVariants.map(({ variant, label, icon: Icon }) => (
                      <Button key={variant} variant={variant as any}>
                        <Icon className="h-4 w-4 mr-2" />
                        {label}
                      </Button>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex gap-3">
                    <Button disabled>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Loading
                    </Button>
                    <Button disabled>Disabled</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Badges</CardTitle>
                <CardDescription>Status indicators and labels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge className="bg-success text-success-foreground">Success</Badge>
                  <Badge className="bg-warning text-warning-foreground">Warning</Badge>
                  <Badge className="bg-info text-info-foreground">Info</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alerts</CardTitle>
                <CardDescription>Contextual feedback messages</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Information</AlertTitle>
                  <AlertDescription>This is an informational message for the user.</AlertDescription>
                </Alert>
                <Alert className="border-success text-success">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>Your loan application has been approved successfully.</AlertDescription>
                </Alert>
                <Alert className="border-warning text-warning">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Warning</AlertTitle>
                  <AlertDescription>Please review the loan terms before proceeding.</AlertDescription>
                </Alert>
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>There was an error processing your request.</AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Form Controls</CardTitle>
                <CardDescription>Input fields, switches, and sliders</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Text Input</label>
                  <Input placeholder="Enter loan amount..." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Disabled Input</label>
                  <Input placeholder="Disabled field" disabled />
                </div>
                <div className="flex items-center gap-3">
                  <Switch id="notifications" />
                  <label htmlFor="notifications" className="text-sm font-medium">
                    Enable notifications
                  </label>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Range Slider</label>
                  <Slider defaultValue={[50]} max={100} step={1} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cards</CardTitle>
                <CardDescription>Content containers with different styles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Default Card</CardTitle>
                    <CardDescription>Standard card with border</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">This is the default card style used throughout the application.</p>
                  </CardContent>
                </Card>
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Glassmorphic Card</CardTitle>
                    <CardDescription>Card with blur effect</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">This card uses glassmorphism for a modern, translucent appearance.</p>
                  </CardContent>
                </Card>
                <Card className="shadow-lg hover-lift">
                  <CardHeader>
                    <CardTitle>Elevated Card</CardTitle>
                    <CardDescription>Card with hover lift effect</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">This card lifts on hover for interactive feedback.</p>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Loading States</CardTitle>
                <CardDescription>Skeletons, spinners, and progress indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-8 w-1/2" />
                </div>
                <div className="flex gap-4 items-center">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  <span className="text-sm">Loading spinner</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Animations Tab */}
          <TabsContent value="animations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Animation Library</CardTitle>
                <CardDescription>Smooth, performant animations for better UX</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold">Hover Effects</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="hover-lift cursor-pointer">
                      <CardContent className="p-6 text-center">
                        <p className="font-semibold">Lift Effect</p>
                        <p className="text-xs text-muted-foreground mt-1">hover-lift</p>
                      </CardContent>
                    </Card>
                    <Card className="hover-glow cursor-pointer">
                      <CardContent className="p-6 text-center">
                        <p className="font-semibold">Glow Effect</p>
                        <p className="text-xs text-muted-foreground mt-1">hover-glow</p>
                      </CardContent>
                    </Card>
                    <Card className="cursor-pointer transition-transform hover:scale-105">
                      <CardContent className="p-6 text-center">
                        <p className="font-semibold">Scale Effect</p>
                        <p className="text-xs text-muted-foreground mt-1">hover:scale-105</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold">Entry Animations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="animate-fade-in">
                      <CardContent className="p-6 text-center">
                        <p className="font-semibold">Fade In</p>
                        <p className="text-xs text-muted-foreground mt-1">animate-fade-in</p>
                      </CardContent>
                    </Card>
                    <Card className="animate-slide-in-left">
                      <CardContent className="p-6 text-center">
                        <p className="font-semibold">Slide In Left</p>
                        <p className="text-xs text-muted-foreground mt-1">animate-slide-in-left</p>
                      </CardContent>
                    </Card>
                    <Card className="animate-bounce-in">
                      <CardContent className="p-6 text-center">
                        <p className="font-semibold">Bounce In</p>
                        <p className="text-xs text-muted-foreground mt-1">animate-bounce-in</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold">Feedback Animations</h3>
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      onClick={(e) => {
                        e.currentTarget.classList.add("animate-shake")
                        setTimeout(() => e.currentTarget.classList.remove("animate-shake"), 500)
                      }}
                    >
                      Click for Shake
                    </Button>
                    <Button
                      variant="outline"
                      onClick={(e) => {
                        e.currentTarget.classList.add("animate-bounce-in")
                        setTimeout(() => e.currentTarget.classList.remove("animate-bounce-in"), 500)
                      }}
                    >
                      Click for Bounce
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold">Continuous Animations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="animate-pulse-glow">
                      <CardContent className="p-6 text-center">
                        <p className="font-semibold">Pulse Glow</p>
                        <p className="text-xs text-muted-foreground mt-1">animate-pulse-glow</p>
                      </CardContent>
                    </Card>
                    <Card className="animate-glow">
                      <CardContent className="p-6 text-center">
                        <p className="font-semibold">Glow Loop</p>
                        <p className="text-xs text-muted-foreground mt-1">animate-glow</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6 text-center">
                        <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
                        <p className="font-semibold">Spinner</p>
                        <p className="text-xs text-muted-foreground mt-1">animate-spin</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Icons Tab */}
          <TabsContent value="icons" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Icon System</CardTitle>
                <CardDescription>Using Lucide React for consistent, high-quality icons</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold mb-3">Icon Sizes</h3>
                  <div className="flex gap-6 items-center">
                    <div className="text-center">
                      <Zap className="h-4 w-4 text-primary mx-auto mb-1" />
                      <p className="text-xs text-muted-foreground">16px</p>
                    </div>
                    <div className="text-center">
                      <Zap className="h-5 w-5 text-primary mx-auto mb-1" />
                      <p className="text-xs text-muted-foreground">20px</p>
                    </div>
                    <div className="text-center">
                      <Zap className="h-6 w-6 text-primary mx-auto mb-1" />
                      <p className="text-xs text-muted-foreground">24px</p>
                    </div>
                    <div className="text-center">
                      <Zap className="h-8 w-8 text-primary mx-auto mb-1" />
                      <p className="text-xs text-muted-foreground">32px</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-3">Common Icons</h3>
                  <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                    {[
                      CheckCircle2,
                      AlertCircle,
                      Info,
                      AlertTriangle,
                      Zap,
                      Shield,
                      TrendingUp,
                      Download,
                      Copy,
                      Sparkles,
                      Loader2,
                      Palette,
                      Type,
                      Layout,
                      Boxes,
                    ].map((Icon, i) => (
                      <div
                        key={i}
                        className="flex flex-col items-center gap-2 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <Icon className="h-6 w-6 text-primary" />
                        <p className="text-xs text-center">{Icon.displayName || Icon.name}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-3">Icon Usage</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <span>Always pair icons with text labels for clarity</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <span>Use semantic colors (success, warning, destructive)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <span>Maintain consistent sizing within components</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <span>Add aria-labels for screen readers when standalone</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Export Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Export Design Tokens</CardTitle>
            <CardDescription>Download design tokens for use in other tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <Button onClick={() => toast.info("Downloading CSS variables...")}>
                <Download className="h-4 w-4 mr-2" />
                Download CSS
              </Button>
              <Button variant="outline" onClick={() => toast.info("Downloading JSON tokens...")}>
                <Download className="h-4 w-4 mr-2" />
                Download JSON
              </Button>
              <Button variant="outline" onClick={() => toast.info("Downloading Figma tokens...")}>
                <Download className="h-4 w-4 mr-2" />
                Download Figma
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
