import { prisma } from "@/lib/prisma"
import { resetPasswordSchema } from "@/lib/validation"
import { successResponse, errorResponse, serverErrorResponse, notFoundResponse } from "@/lib/api-response"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate input
    const validated = resetPasswordSchema.safeParse(body)
    if (!validated.success) {
      return errorResponse(validated.error.errors[0].message, 400)
    }

    const { token, password } = validated.data

    // Find valid token
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    })

    if (!resetToken) {
      return notFoundResponse("Invalid or expired reset token")
    }

    // Check if token is expired
    if (resetToken.expires < new Date()) {
      await prisma.passwordResetToken.delete({
        where: { token },
      })
      return errorResponse("Reset token has expired", 400)
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: resetToken.email },
    })

    if (!user) {
      return notFoundResponse("User not found")
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Update password
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    })

    // Delete used token
    await prisma.passwordResetToken.delete({
      where: { token },
    })

    return successResponse(
      { message: "Password reset successfully" },
      "Password has been reset"
    )
  } catch (error) {
    console.error("[RESET_PASSWORD_ERROR]", error)
    return serverErrorResponse("Failed to reset password")
  }
}
