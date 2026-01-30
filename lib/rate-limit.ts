/**
 * Rate Limiting Middleware
 * Prevents abuse by limiting requests per IP address
 */

interface RateLimitStore {
    [key: string]: {
        count: number
        resetTime: number
    }
}

class RateLimiter {
    private store: RateLimitStore = {}
    private cleanupInterval: NodeJS.Timeout | null = null

    constructor() {
        // Clean up expired entries every minute
        this.cleanupInterval = setInterval(() => {
            this.cleanup()
        }, 60 * 1000)
    }

    /**
     * Check if request should be rate limited
     */
    check(identifier: string, limit: number, windowMs: number): boolean {
        const now = Date.now()
        const entry = this.store[identifier]

        if (!entry || now > entry.resetTime) {
            // Create new entry
            this.store[identifier] = {
                count: 1,
                resetTime: now + windowMs,
            }
            return false
        }

        if (entry.count >= limit) {
            return true // Rate limited
        }

        entry.count++
        return false
    }

    /**
     * Get remaining requests for identifier
     */
    getRemaining(identifier: string, limit: number): number {
        const entry = this.store[identifier]
        if (!entry) return limit
        return Math.max(0, limit - entry.count)
    }

    /**
     * Get reset time for identifier
     */
    getResetTime(identifier: string): number | null {
        const entry = this.store[identifier]
        return entry ? entry.resetTime : null
    }

    /**
     * Clean up expired entries
     */
    private cleanup(): void {
        const now = Date.now()
        Object.keys(this.store).forEach((key) => {
            if (now > this.store[key].resetTime) {
                delete this.store[key]
            }
        })
    }

    /**
     * Clear all entries
     */
    clear(): void {
        this.store = {}
    }

    /**
     * Destroy rate limiter
     */
    destroy(): void {
        if (this.cleanupInterval) {
            clearInterval(this.cleanupInterval)
            this.cleanupInterval = null
        }
        this.clear()
    }
}

// Singleton instance
export const rateLimiter = new RateLimiter()

/**
 * Rate limit configuration presets
 */
export const rateLimitPresets = {
    // Strict: 10 requests per minute
    strict: { limit: 10, windowMs: 60 * 1000 },

    // Standard: 30 requests per minute
    standard: { limit: 30, windowMs: 60 * 1000 },

    // Relaxed: 100 requests per minute
    relaxed: { limit: 100, windowMs: 60 * 1000 },

    // Auth: 5 requests per 15 minutes (for login/register)
    auth: { limit: 5, windowMs: 15 * 60 * 1000 },
}

/**
 * Get client identifier from request
 */
export function getClientIdentifier(request: Request): string {
    // Try to get IP from various headers
    const forwarded = request.headers.get("x-forwarded-for")
    const realIp = request.headers.get("x-real-ip")
    const cfConnectingIp = request.headers.get("cf-connecting-ip")

    const ip = cfConnectingIp || realIp || forwarded?.split(",")[0] || "unknown"

    return ip.trim()
}

/**
 * Apply rate limiting to a request
 */
export function applyRateLimit(
    request: Request,
    config: { limit: number; windowMs: number } = rateLimitPresets.standard
): { limited: boolean; remaining: number; resetTime: number | null } {
    const identifier = getClientIdentifier(request)
    const limited = rateLimiter.check(identifier, config.limit, config.windowMs)
    const remaining = rateLimiter.getRemaining(identifier, config.limit)
    const resetTime = rateLimiter.getResetTime(identifier)

    return { limited, remaining, resetTime }
}
