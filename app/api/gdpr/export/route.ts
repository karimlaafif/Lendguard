import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth-utils"
import { successResponse, unauthorizedResponse, serverErrorResponse } from "@/lib/api-response"
import { auditLogger, AuditEventType } from "@/lib/audit-logger"

/**
 * GDPR Data Export
 * Allows users to export all their personal data
 */
export async function GET(request: Request) {
    try {
        const user = await getCurrentUser()

        if (!user) {
            return unauthorizedResponse()
        }

        // Log the data export request
        await auditLogger.logDataAccess(
            AuditEventType.USER_PROFILE_UPDATE,
            user.id,
            { action: "data_export" },
            true
        )

        // In production, you would:
        // 1. Gather all user data from all tables
        // 2. Format as JSON or CSV
        // 3. Return as downloadable file

        const userData = {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
            // Add more data as needed
            exportedAt: new Date().toISOString(),
        }

        return successResponse(userData, "Data exported successfully")
    } catch (error) {
        console.error("[GDPR_EXPORT_ERROR]", error)
        return serverErrorResponse("Failed to export data")
    }
}
