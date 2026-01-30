/**
 * Model Cache
 * Caches ML prediction results to reduce inference latency
 */

interface CacheEntry<T> {
    value: T
    timestamp: number
    ttl: number
}

class ModelCache {
    private cache: Map<string, CacheEntry<any>> = new Map()
    private maxSize: number = 1000
    private defaultTTL: number = 60 * 60 * 1000 // 1 hour

    /**
     * Generate cache key from prediction input
     */
    private generateKey(modelName: string, features: any): string {
        const featuresStr = JSON.stringify(features)
        return `${modelName}:${featuresStr}`
    }

    /**
     * Get cached prediction
     */
    get<T>(modelName: string, features: any): T | null {
        const key = this.generateKey(modelName, features)
        const entry = this.cache.get(key)

        if (!entry) {
            return null
        }

        // Check if expired
        if (Date.now() - entry.timestamp > entry.ttl) {
            this.cache.delete(key)
            return null
        }

        return entry.value as T
    }

    /**
     * Set cached prediction
     */
    set<T>(modelName: string, features: any, value: T, ttl?: number): void {
        // Evict oldest entries if cache is full
        if (this.cache.size >= this.maxSize) {
            this.evictOldest()
        }

        const key = this.generateKey(modelName, features)
        this.cache.set(key, {
            value,
            timestamp: Date.now(),
            ttl: ttl ?? this.defaultTTL,
        })
    }

    /**
     * Evict oldest cache entries
     */
    private evictOldest(): void {
        const entries = Array.from(this.cache.entries())
        entries.sort((a, b) => a[1].timestamp - b[1].timestamp)

        // Remove oldest 10%
        const toRemove = Math.ceil(entries.length * 0.1)
        for (let i = 0; i < toRemove; i++) {
            this.cache.delete(entries[i][0])
        }
    }

    /**
     * Clear all cache
     */
    clear(): void {
        this.cache.clear()
    }

    /**
     * Get cache statistics
     */
    getStats() {
        return {
            size: this.cache.size,
            maxSize: this.maxSize,
            hitRate: 0, // Would need to track hits/misses
        }
    }

    /**
     * Configure cache settings
     */
    configure(options: { maxSize?: number; defaultTTL?: number }): void {
        if (options.maxSize) this.maxSize = options.maxSize
        if (options.defaultTTL) this.defaultTTL = options.defaultTTL
    }
}

// Singleton instance
export const modelCache = new ModelCache()

// For production, you might want to use Redis instead:
// import { Redis } from "@upstash/redis"
// export const redis = new Redis({
//   url: process.env.UPSTASH_REDIS_REST_URL!,
//   token: process.env.UPSTASH_REDIS_REST_TOKEN!,
// })
