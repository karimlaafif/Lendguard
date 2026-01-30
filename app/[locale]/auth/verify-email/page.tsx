"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus("error")
        setMessage("Invalid verification link")
        return
      }

      try {
        const response = await fetch("/api/user/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        })

        const data = await response.json()

        if (response.ok) {
          setStatus("success")
          setMessage(data.message)
          setTimeout(() => {
            router.push("/dashboard")
          }, 3000)
        } else {
          setStatus("error")
          setMessage(data.error || "Verification failed")
        }
      } catch (error) {
        setStatus("error")
        setMessage("Something went wrong. Please try again.")
      }
    }

    verifyEmail()
  }, [token, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <Card className="w-full max-w-md glass border-slate-700/50 relative z-10">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-2">
            {status === "loading" ? (
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            ) : status === "success" ? (
              <CheckCircle className="w-8 h-8 text-white" />
            ) : (
              <AlertCircle className="w-8 h-8 text-white" />
            )}
          </div>
          <CardTitle className="text-3xl font-bold text-white">
            {status === "loading"
              ? "Verifying Email"
              : status === "success"
                ? "Email Verified!"
                : "Verification Failed"}
          </CardTitle>
          <CardDescription className="text-slate-400">
            {status === "loading"
              ? "Please wait while we verify your email address..."
              : status === "success"
                ? "Your email has been successfully verified"
                : "We couldn't verify your email address"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {message && (
            <Alert
              variant={status === "error" ? "destructive" : "default"}
              className={
                status === "error"
                  ? "bg-destructive/10 border-destructive/50"
                  : "bg-success/10 border-success/50 text-success"
              }
            >
              {status === "success" ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          {status === "success" && (
            <p className="text-center text-sm text-slate-400">Redirecting you to dashboard in 3 seconds...</p>
          )}
        </CardContent>

        <CardFooter className="flex flex-col space-y-3">
          {status === "success" && (
            <Button asChild className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          )}

          {status === "error" && (
            <>
              <Button asChild className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/auth/login">Back to Login</Link>
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
