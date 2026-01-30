/**
 * ML Predictor
 * Unified interface for making ML predictions
 */

import { modelLoader } from "./model-loader"
import { modelCache } from "./model-cache"
import { engineerFeatures, type LoanFeatures } from "./feature-engineering"

export interface PredictionResult {
    fraudScore: number
    riskScore: number
    affordabilityIndex: number
    defaultProbability: number
    recommendation: "approve" | "review" | "reject"
    confidence: number
    factors: {
        creditScore: number
        debtToIncome: number
        loanToIncome: number
        employmentStability: number
    }
}

/**
 * Make a comprehensive loan prediction
 */
export async function predictLoanOutcome(features: LoanFeatures): Promise<PredictionResult> {
    // Check cache first
    const cached = modelCache.get<PredictionResult>("loan-predictor", features)
    if (cached) {
        console.log("Cache hit for loan prediction")
        return cached
    }

    // Engineer features
    const engineered = engineerFeatures(features)

    // Load models
    const [fraudModel, riskModel, defaultModel] = await Promise.all([
        modelLoader.loadModel("fraud-detector"),
        modelLoader.loadModel("credit-risk"),
        modelLoader.loadModel("default-predictor"),
    ])

    // Make predictions
    const [fraudPrediction, riskPrediction, defaultPrediction] = await Promise.all([
        fraudModel.predict(features),
        riskModel.predict(features),
        defaultModel.predict(features),
    ])

    // Calculate fraud score (0-1, higher = more likely fraud)
    const fraudScore = calculateFraudScore(features)

    // Calculate default probability
    const defaultProbability = calculateDefaultProbability(features, engineered.riskScore)

    // Determine recommendation
    const recommendation = determineRecommendation(
        fraudScore,
        engineered.riskScore,
        engineered.affordabilityIndex,
        defaultProbability
    )

    // Calculate overall confidence
    const confidence = Math.min(
        fraudPrediction.confidence,
        riskPrediction.confidence,
        defaultPrediction.confidence
    )

    const result: PredictionResult = {
        fraudScore,
        riskScore: engineered.riskScore,
        affordabilityIndex: engineered.affordabilityIndex,
        defaultProbability,
        recommendation,
        confidence,
        factors: {
            creditScore: features.creditScore,
            debtToIncome: features.debtToIncome,
            loanToIncome: engineered.loanToIncomeRatio,
            employmentStability: Math.min(1, features.employmentYears / 10),
        },
    }

    // Cache result
    modelCache.set("loan-predictor", features, result, 30 * 60 * 1000) // 30 min TTL

    return result
}

/**
 * Calculate fraud score based on behavioral patterns
 */
function calculateFraudScore(features: LoanFeatures): number {
    let fraudScore = 0

    // Unusually high loan amount relative to income
    const loanToIncome = features.loanAmount / features.income
    if (loanToIncome > 5) fraudScore += 0.3

    // Very low credit score
    if (features.creditScore < 500) fraudScore += 0.2

    // Very high DTI
    if (features.debtToIncome > 0.6) fraudScore += 0.2

    // Short employment history with high loan
    if (features.employmentYears < 1 && features.loanAmount > 50000) fraudScore += 0.3

    return Math.min(1, fraudScore)
}

/**
 * Calculate default probability
 */
function calculateDefaultProbability(features: LoanFeatures, riskScore: number): number {
    // Base probability from risk score
    let probability = riskScore * 0.5

    // Adjust based on credit score
    if (features.creditScore < 600) probability += 0.2
    else if (features.creditScore < 650) probability += 0.1

    // Adjust based on DTI
    if (features.debtToIncome > 0.5) probability += 0.15

    // Adjust based on employment
    if (features.employmentYears < 2) probability += 0.1

    return Math.min(1, probability)
}

/**
 * Determine loan recommendation
 */
function determineRecommendation(
    fraudScore: number,
    riskScore: number,
    affordabilityIndex: number,
    defaultProbability: number
): "approve" | "review" | "reject" {
    // Reject if high fraud risk
    if (fraudScore > 0.7) return "reject"

    // Reject if very high default risk
    if (defaultProbability > 0.6) return "reject"

    // Reject if very high risk and low affordability
    if (riskScore > 0.7 && affordabilityIndex < 0.3) return "reject"

    // Approve if low risk and good affordability
    if (riskScore < 0.3 && affordabilityIndex > 0.6 && fraudScore < 0.2) return "approve"

    // Everything else needs manual review
    return "review"
}

/**
 * Batch prediction for multiple loan applications
 */
export async function predictBatch(featuresArray: LoanFeatures[]): Promise<PredictionResult[]> {
    return Promise.all(featuresArray.map((features) => predictLoanOutcome(features)))
}
