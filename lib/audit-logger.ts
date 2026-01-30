/**
 * Audit Logger
 * Logs important security and business events
 */

export enum AuditEventType {
    // Authentication events
    USER_LOGIN = "USER_LOGIN",
    USER_LOGOUT = "USER_LOGOUT",
    USER_REGISTER = "USER_REGISTER",
    PASSWORD_RESET_REQUEST = "PASSWORD_RESET_REQUEST",
    PASSWORD_RESET_COMPLETE = "PASSWORD_RESET_COMPLETE",
    EMAIL_VERIFICATION = "EMAIL_VERIFICATION",

    // Authorization events
    UNAUTHORIZED_ACCESS = "UNAUTHORIZED_ACCESS",
    PERMISSION_DENIED = "PERMISSION_DENIED",

    // Data events
    USER_PROFILE_UPDATE = "USER_PROFILE_UPDATE",
    USER_PASSWORD_CHANGE = "USER_PASSWORD_CHANGE",
    USER_DELETE = "USER_DELETE",

    // Loan events
    LOAN_APPLICATION_SUBMIT = "LOAN_APPLICATION_SUBMIT",
    LOAN_APPLICATION_APPROVE = "LOAN_APPLICATION_APPROVE",
    LOAN_APPLICATION_REJECT = "LOAN_APPLICATION_REJECT",

    // ML events
    ML_PREDICTION_REQUEST = "ML_PREDICTION_REQUEST",
    ML_PREDICTION_COMPLETE = "ML_PREDICTION_COMPLETE",
    ML_PREDICTION_ERROR = "ML_PREDICTION_ERROR",

    // Security events
    RATE_LIMIT_EXCEEDED = "RATE_LIMIT_EXCEEDED",
    SUSPICIOUS_ACTIVITY = "SUSPICIOUS_ACTIVITY",
    FRAUD_DETECTED = "FRAUD_DETECTED",
}

export interface AuditLog {
    timestamp: Date
    eventType: AuditEventType
    userId?: string
    userEmail?: string
    ipAddress?: string
    userAgent?: string
    metadata?: Record<string, any>
    success: boolean
    errorMessage?: string
}

class AuditLogger {
    /**
     * Log an audit event
     */
    async log(event: Omit<AuditLog, "timestamp">): Promise<void> {
        const auditLog: AuditLog = {
            timestamp: new Date(),
            ...event,
        }

        // In production, you would:
        // 1. Store in database (Prisma model)
        // 2. Send to logging service (Datadog, LogTail, etc.)
        // 3. Alert on critical events (Sentry, PagerDuty, etc.)

        console.log("[AUDIT]", JSON.stringify(auditLog, null, 2))

        // TODO: Implement database storage
        // await prisma.auditLog.create({ data: auditLog })
    }

    /**
     * Log authentication event
     */
    async logAuth(
        eventType: AuditEventType,
        userId: string | undefined,
        userEmail: string,
        success: boolean,
        ipAddress?: string,
        errorMessage?: string
    ): Promise<void> {
        await this.log({
            eventType,
            userId,
            userEmail,
            ipAddress,
            success,
            errorMessage,
        })
    }

    /**
     * Log data access event
     */
    async logDataAccess(
        eventType: AuditEventType,
        userId: string,
        metadata: Record<string, any>,
        success: boolean
    ): Promise<void> {
        await this.log({
            eventType,
            userId,
            metadata,
            success,
        })
    }

    /**
     * Log security event
     */
    async logSecurity(
        eventType: AuditEventType,
        ipAddress: string,
        metadata?: Record<string, any>
    ): Promise<void> {
        await this.log({
            eventType,
            ipAddress,
            metadata,
            success: false, // Security events are typically failures
        })
    }

    /**
     * Log ML prediction event
     */
    async logMLPrediction(
        userId: string,
        success: boolean,
        metadata?: Record<string, any>,
        errorMessage?: string
    ): Promise<void> {
        await this.log({
            eventType: success ? AuditEventType.ML_PREDICTION_COMPLETE : AuditEventType.ML_PREDICTION_ERROR,
            userId,
            metadata,
            success,
            errorMessage,
        })
    }
}

// Singleton instance
export const auditLogger = new AuditLogger()
