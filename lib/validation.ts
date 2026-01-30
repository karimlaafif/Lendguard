import { z } from "zod"

// Auth validation schemas
export const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
})

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
})

export const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
})

export const resetPasswordSchema = z.object({
    token: z.string().min(1, "Token is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
})

// User validation schemas
export const updateProfileSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").optional(),
    email: z.string().email("Invalid email address").optional(),
})

export const updatePasswordSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "New password must be at least 8 characters"),
})

// Loan application validation schemas
export const loanApplicationSchema = z.object({
    amount: z.number().positive("Amount must be positive"),
    purpose: z.string().min(10, "Purpose must be at least 10 characters"),
    term: z.number().int().positive("Term must be a positive integer"),
    income: z.number().positive("Income must be positive"),
    employmentStatus: z.enum(["employed", "self-employed", "unemployed", "retired"]),
    creditScore: z.number().int().min(300).max(850).optional(),
})

// ML prediction validation schemas
export const predictionRequestSchema = z.object({
    loanAmount: z.number().positive(),
    income: z.number().positive(),
    creditScore: z.number().int().min(300).max(850),
    debtToIncome: z.number().min(0).max(1),
    employmentYears: z.number().int().min(0),
    loanTerm: z.number().int().positive(),
})

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>
export type LoanApplicationInput = z.infer<typeof loanApplicationSchema>
export type PredictionRequestInput = z.infer<typeof predictionRequestSchema>
