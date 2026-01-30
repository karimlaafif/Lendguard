"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileQuestion, Search, ShieldAlert, Plus } from "lucide-react"

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        {icon && <div className="mb-4 text-muted-foreground">{icon}</div>}
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-6 max-w-md">{description}</p>
        {action && (
          <Button onClick={action.onClick}>
            <Plus className="h-4 w-4 mr-2" />
            {action.label}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export function EmptyStateExamples() {
  return (
    <div className="space-y-6">
      <EmptyState
        icon={<FileQuestion className="h-16 w-16" />}
        title="No loans found"
        description="You haven't processed any loan applications yet. Get started by analyzing your first loan."
        action={{
          label: "Start Analysis",
          onClick: () => {},
        }}
      />
      <EmptyState
        icon={<Search className="h-16 w-16" />}
        title="No search results"
        description="We couldn't find any results matching your search criteria. Try adjusting your filters."
      />
      <EmptyState
        icon={<ShieldAlert className="h-16 w-16" />}
        title="No fraud detected"
        description="Great news! All recent loan applications passed our fraud detection checks."
      />
    </div>
  )
}
