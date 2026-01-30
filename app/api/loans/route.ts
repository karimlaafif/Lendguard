import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth-utils"
import { loanApplicationSchema } from "@/lib/validation"
import { successResponse, errorResponse, serverErrorResponse, unauthorizedResponse, createdResponse } from "@/lib/api-response"
import { predictLoanOutcome } from "@/lib/ml/predictor"
import { auditLogger, AuditEventType } from "@/lib/audit-logger"

/**
 * Submit a new loan application
 */
export async function POST(request: Request) {
    try {
        const user = await getCurrentUser()

        if (!user) {
            return unauthorizedResponse()
        }

        const body = await request.json()

        // Validate input
        const validated = loanApplicationSchema.safeParse(body)
        if (!validated.success) {
            return errorResponse(validated.error.errors[0].message, 400)
        }

        const { amount, purpose, term, income, employmentStatus, creditScore } = validated.data

        // Calculate debt-to-income ratio (simplified - would come from user profile in production)
        const debtToIncome = 0.3 // Placeholder

        // Make ML prediction
        const prediction = await predictLoanOutcome({
            loanAmount: amount,
            income,
            creditScore: creditScore || 650,
            debtToIncome,
            employmentYears: 5, // Placeholder - would come from user profile
            loanTerm: term,
        })

        // Create loan application
        const loanApplication = await prisma.loanApplication.create({
            data: {
                userId: user.id,
                amount,
                purpose,
                term,
                income,
                employmentStatus,
                creditScore,
                status: prediction.recommendation === "approve" ? "approved" :
                    prediction.recommendation === "reject" ? "rejected" : "pending",
                riskScore: prediction.riskScore,
                affordabilityIndex: prediction.affordabilityIndex,
                fraudScore: prediction.fraudScore,
                decision: prediction.recommendation,
            },
        })

        // Log the event
        await auditLogger.logDataAccess(
            AuditEventType.LOAN_APPLICATION_SUBMIT,
            user.id,
            { loanApplicationId: loanApplication.id, amount, decision: prediction.recommendation },
            true
        )

        return createdResponse(
            {
                loanApplication,
                prediction,
            },
            "Loan application submitted successfully"
        )
    } catch (error) {
        console.error("[LOAN_APPLICATION_ERROR]", error)
        return serverErrorResponse("Failed to submit loan application")
    }
}

/**
 * Get all loan applications for current user
 */
export async function GET(request: Request) {
    try {
        const user = await getCurrentUser()

        if (!user) {
            return unauthorizedResponse()
        }

        const loanApplications = await prisma.loanApplication.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: "desc" },
        })

        return successResponse({ loanApplications })
    } catch (error) {
        console.error("[LOAN_APPLICATIONS_GET_ERROR]", error)
        return serverErrorResponse("Failed to fetch loan applications")
    }
}
