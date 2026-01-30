/**
 * Security Headers Middleware
 * Implements security best practices via HTTP headers
 */

export function getSecurityHeaders() {
    return {
        // Prevent clickjacking
        "X-Frame-Options": "DENY",

        // Prevent MIME type sniffing
        "X-Content-Type-Options": "nosniff",

        // Enable XSS protection
        "X-XSS-Protection": "1; mode=block",

        // Referrer policy
        "Referrer-Policy": "strict-origin-when-cross-origin",

        // Permissions policy
        "Permissions-Policy": "camera=(), microphone=(), geolocation=()",

        // Content Security Policy
        "Content-Security-Policy": [
            "default-src 'self'",
            "script-src 'self' 'unsafe-eval' 'unsafe-inline'", // Next.js requires unsafe-eval
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: https:",
            "font-src 'self' data:",
            "connect-src 'self' https:",
            "frame-ancestors 'none'",
        ].join("; "),
    }
}

/**
 * CORS configuration
 */
export const corsConfig = {
    allowedOrigins: process.env.NODE_ENV === "production"
        ? [process.env.NEXTAUTH_URL || "https://lendguard.ai"]
        : ["http://localhost:3000", "http://localhost:3001"],

    allowedMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "Accept",
    ],

    exposedHeaders: ["X-RateLimit-Remaining", "X-RateLimit-Reset"],

    credentials: true,

    maxAge: 86400, // 24 hours
}

/**
 * Apply CORS headers to response
 */
export function applyCorsHeaders(
    response: Response,
    origin: string | null
): Response {
    const headers = new Headers(response.headers)

    // Check if origin is allowed
    const isAllowed = origin && corsConfig.allowedOrigins.includes(origin)

    if (isAllowed) {
        headers.set("Access-Control-Allow-Origin", origin)
        headers.set("Access-Control-Allow-Credentials", "true")
    }

    headers.set("Access-Control-Allow-Methods", corsConfig.allowedMethods.join(", "))
    headers.set("Access-Control-Allow-Headers", corsConfig.allowedHeaders.join(", "))
    headers.set("Access-Control-Expose-Headers", corsConfig.exposedHeaders.join(", "))
    headers.set("Access-Control-Max-Age", corsConfig.maxAge.toString())

    return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
    })
}

/**
 * Sanitize user input to prevent XSS
 */
export function sanitizeInput(input: string): string {
    return input
        .replace(/[<>]/g, "") // Remove < and >
        .replace(/javascript:/gi, "") // Remove javascript: protocol
        .replace(/on\w+=/gi, "") // Remove event handlers
        .trim()
}

/**
 * Validate and sanitize email
 */
export function sanitizeEmail(email: string): string {
    return email.toLowerCase().trim()
}

/**
 * Generate secure random token
 */
export function generateSecureToken(length: number = 32): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let token = ""

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length)
        token += chars[randomIndex]
    }

    return token
}

/**
 * Hash sensitive data (for logging)
 */
export function hashForLogging(data: string): string {
    if (data.length <= 4) return "****"
    return data.substring(0, 2) + "****" + data.substring(data.length - 2)
}
