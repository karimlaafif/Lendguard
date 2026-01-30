import { prisma } from "@/lib/prisma"
import { forgotPasswordSchema } from "@/lib/validation"
import { successResponse, errorResponse, serverErrorResponse } from "@/lib/api-response"
import { nanoid } from "nanoid"
import { sendPasswordResetEmail } from "@/lib/email"
import { applyRateLimit, rateLimitPresets } from "@/lib/rate-limit"

export async function POST(request: Request) {
  // Apply rate limiting
  const { limited, remaining, resetTime } = applyRateLimit(request, rateLimitPresets.auth)

  if (limited) {
    return errorResponse(
      `Too many password reset attempts. Please try again in ${Math.ceil((resetTime! - Date.now()) / 1000 / 60)} minutes.`,
      429
    )
  }
  try {
    const body = await request.json()

    // Validate input
    const validated = forgotPasswordSchema.safeParse(body)
    if (!validated.success) {
      return errorResponse(validated.error.errors[0].message, 400)
    }

    const { email } = validated.data

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    })

    // Always return success to prevent email enumeration
    if (!user) {
      return successResponse(
        { message: "If an account exists, a password reset email has been sent" },
        "Password reset email sent"
      )
    }

    // Delete any existing reset tokens for this email
    await prisma.passwordResetToken.deleteMany({
      where: { email },
    })

    // Create reset token
    const token = nanoid(32)
    const expires = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    await prisma.passwordResetToken.create({
      data: {
        email,
        token,
        expires,
      },
    })

    // Send email
    await sendPasswordResetEmail(email, token, user.name || "User")

    return successResponse(
      { message: "If an account exists, a password reset email has been sent" },
      "Password reset email sent"
    )
  } catch (error) {
    console.error("[FORGOT_PASSWORD_ERROR]", error)
    return serverErrorResponse("Failed to process password reset request")
  }
}
