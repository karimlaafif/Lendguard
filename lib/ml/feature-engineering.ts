/**
 * Feature Engineering for Loan Risk Assessment
 * Calculates RiskScore and AffordabilityIndex from loan application data
 */

export interface LoanFeatures {
    loanAmount: number
    income: number
    creditScore: number
    debtToIncome: number
    employmentYears: number
    loanTerm: number
}

export interface EngineeringResult {
    riskScore: number
    affordabilityIndex: number
    debtToIncomeRatio: number
    loanToIncomeRatio: number
    monthlyPayment: number
}

/**
 * Calculate monthly payment for a loan
 */
function calculateMonthlyPayment(principal: number, annualRate: number, termMonths: number): number {
    const monthlyRate = annualRate / 12
    if (monthlyRate === 0) return principal / termMonths

    return (principal * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
        (Math.pow(1 + monthlyRate, termMonths) - 1)
}

/**
 * Calculate Risk Score (0-1, higher = riskier)
 * Factors: credit score, DTI, employment stability, loan size
 */
export function calculateRiskScore(features: LoanFeatures): number {
    const {
        creditScore,
        debtToIncome,
        employmentYears,
        loanAmount,
        income,
    } = features

    // Credit score component (0-1, inverted so higher score = lower risk)
    const creditRisk = Math.max(0, Math.min(1, (850 - creditScore) / 550))

    // Debt-to-income risk (0-1)
    const dtiRisk = Math.min(1, debtToIncome / 0.5) // 50% DTI = max risk

    // Employment stability risk (0-1, inverted)
    const employmentRisk = Math.max(0, Math.min(1, (10 - employmentYears) / 10))

    // Loan-to-income ratio risk
    const ltiRisk = Math.min(1, (loanAmount / income) / 5) // 5x income = max risk

    // Weighted average
    const riskScore =
        creditRisk * 0.35 +
        dtiRisk * 0.30 +
        employmentRisk * 0.20 +
        ltiRisk * 0.15

    return Math.round(riskScore * 1000) / 1000 // Round to 3 decimals
}

/**
 * Calculate Affordability Index (0-1, higher = more affordable)
 * Measures ability to repay based on income and existing debt
 */
export function calculateAffordabilityIndex(features: LoanFeatures): number {
    const { loanAmount, income, debtToIncome, loanTerm } = features

    // Estimate interest rate based on credit score
    const estimatedRate = features.creditScore >= 750 ? 0.05 :
        features.creditScore >= 700 ? 0.07 :
            features.creditScore >= 650 ? 0.10 :
                0.15

    // Calculate monthly payment
    const monthlyPayment = calculateMonthlyPayment(loanAmount, estimatedRate, loanTerm)
    const monthlyIncome = income / 12

    // Calculate payment-to-income ratio
    const paymentToIncome = monthlyPayment / monthlyIncome

    // Calculate available income after existing debt
    const existingDebtPayment = monthlyIncome * debtToIncome
    const availableIncome = monthlyIncome - existingDebtPayment

    // Affordability based on available income
    const affordability = Math.max(0, Math.min(1, 1 - (monthlyPayment / availableIncome)))

    return Math.round(affordability * 1000) / 1000
}

/**
 * Engineer all features for a loan application
 */
export function engineerFeatures(features: LoanFeatures): EngineeringResult {
    const riskScore = calculateRiskScore(features)
    const affordabilityIndex = calculateAffordabilityIndex(features)

    const estimatedRate = features.creditScore >= 750 ? 0.05 :
        features.creditScore >= 700 ? 0.07 :
            features.creditScore >= 650 ? 0.10 :
                0.15

    const monthlyPayment = calculateMonthlyPayment(
        features.loanAmount,
        estimatedRate,
        features.loanTerm
    )

    return {
        riskScore,
        affordabilityIndex,
        debtToIncomeRatio: features.debtToIncome,
        loanToIncomeRatio: features.loanAmount / features.income,
        monthlyPayment,
    }
}
