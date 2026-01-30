"use client"

import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { CheckCircle2, AlertCircle, Info, AlertTriangle } from "lucide-react"

export function ToastExamples() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button
        variant="outline"
        onClick={() =>
          toast.success("Success!", {
            description: "Your loan application has been approved.",
            icon: <CheckCircle2 className="h-4 w-4" />,
          })
        }
      >
        Success Toast
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.error("Error!", {
            description: "Failed to process your request. Please try again.",
            icon: <AlertCircle className="h-4 w-4" />,
          })
        }
      >
        Error Toast
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.info("Information", {
            description: "Your account will be reviewed within 24 hours.",
            icon: <Info className="h-4 w-4" />,
          })
        }
      >
        Info Toast
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.warning("Warning!", {
            description: "Please verify your email address to continue.",
            icon: <AlertTriangle className="h-4 w-4" />,
          })
        }
      >
        Warning Toast
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast("Custom Action", {
            description: "Do you want to continue?",
            action: {
              label: "Confirm",
              onClick: () => toast.success("Confirmed!"),
            },
          })
        }
      >
        Action Toast
      </Button>
    </div>
  )
}
