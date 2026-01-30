import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth-utils"
import { successResponse, unauthorizedResponse, serverErrorResponse } from "@/lib/api-response"
import { auditLogger, AuditEventType } from "@/lib/audit-logger"

/**
 * GDPR Data Deletion
 * Allows users to delete all their personal data (Right to be Forgotten)
 */
export async function DELETE(request: Request) {
    try {
        const user = await getCurrentUser()

        if (!user) {
            return unauthorizedResponse()
        }

        // Log the deletion request
        await auditLogger.logDataAccess(
            AuditEventType.USER_DELETE,
            user.id,
            { action: "account_deletion" },
            true
        )

        // Delete user data (cascading deletes will handle related records)
        await prisma.user.delete({
            where: { id: user.id },
        })

        return successResponse(
            { message: "Account and all associated data have been permanently deleted" },
            "Account deleted successfully"
        )
    } catch (error) {
        console.error("[GDPR_DELETE_ERROR]", error)
        return serverErrorResponse("Failed to delete account")
    }
}
