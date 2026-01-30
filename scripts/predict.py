import sys
import json
import joblib
import numpy as np
import pandas as pd
import os

# Set working directory to project root (where scripts/ is located)
# This assumes the script is run from project root, but let's be safe
project_root = os.getcwd()

def predict(data):
    try:
        # Load models
        # Use absolute paths or relative from execution context
        models_dir = os.path.join(project_root, 'models')
        
        scaler = joblib.load(os.path.join(models_dir, 'scaler.pkl'))
        # Try loading gradient_boosting, fallback to others if needed
        model_path = os.path.join(models_dir, 'gradient_boosting.pkl')
        if not os.path.exists(model_path):
             model_path = os.path.join(models_dir, 'xgboost.pkl')
             
        model = joblib.load(model_path)
        
        le_education = joblib.load(os.path.join(models_dir, 'le_education.pkl'))
        le_employment = joblib.load(os.path.join(models_dir, 'le_employment.pkl'))
        le_marital = joblib.load(os.path.join(models_dir, 'le_marital.pkl'))
        le_purpose = joblib.load(os.path.join(models_dir, 'le_purpose.pkl'))
        
        # Calculate RiskScore
        risk_score = (
            (data['dtiRatio'] * 300) +
            (data['loanAmount'] / data['income'] * 250) +
            ((850 - data['creditScore']) / 850 * 200) +
            (data['interestRate'] * 10 * 150) +
            (1 / (data['monthsEmployed'] + 1) * 100)
        )
        risk_score = min(max(risk_score, 0), 1000)
        
        # Calculate AffordabilityIndex
        monthly_payment = data['loanAmount'] * (data['interestRate']/12) / (1 - (1 + data['interestRate']/12)**(-data['loanTerm']))
        affordability = (data['income'] * (1 - data['dtiRatio'])) / (monthly_payment * data['loanTerm']) * 10
        affordability = min(max(affordability, 0), 10)
        
        # Encode categoricals using safe handling for unknown categories
        def safe_transform(le, value):
            try:
                return le.transform([value])[0]
            except:
                # Fallback to most frequent or 0 if unknown
                return 0

        education_enc = safe_transform(le_education, data['education'])
        employment_enc = safe_transform(le_employment, data['employmentType'])
        marital_enc = safe_transform(le_marital, data['maritalStatus'])
        purpose_enc = safe_transform(le_purpose, data['loanPurpose'])
        
        # Prepare features in the exact order as training
        features = np.array([[
            data['age'],
            data['income'],
            data['loanAmount'],
            data['loanTerm'],
            data['interestRate'],
            data['creditScore'],
            data['dtiRatio'],
            data['numCreditLines'],
            data['monthsEmployed'],
            1 if data['hasMortgage'] else 0,
            1 if data['hasDependents'] else 0,
            1 if data['hasCoSigner'] else 0,
            education_enc,
            employment_enc,
            marital_enc,
            purpose_enc,
            risk_score,
            affordability
        ]])
        
        # Scale
        features_scaled = scaler.transform(features)
        
        # Predict
        prediction = model.predict(features_scaled)[0]
        probability = model.predict_proba(features_scaled)[0][1]
        
        # Decision logic
        if risk_score > 700 or probability > 0.7:
            decision = 'REJECT'
        elif risk_score > 500 or probability > 0.4:
            decision = 'REVIEW'
        else:
            decision = 'APPROVE'
        
        return {
            'riskScore': float(risk_score),
            'affordabilityIndex': float(affordability),
            'defaultProbability': float(probability),
            'fraudProbability': float(probability * 0.8),  # Simplified
            'decision': decision,
            'confidence': float(max(probability, 1 - probability)),
            'reasons': [
                {'factor': 'DTI Ratio', 'weight': 0.30, 'impact': 'negative' if data['dtiRatio'] > 0.4 else 'positive'},
                {'factor': 'Credit Score', 'weight': 0.25, 'impact': 'negative' if data['creditScore'] < 650 else 'positive'},
                {'factor': 'Risk Score', 'weight': 0.20, 'impact': 'negative' if risk_score > 600 else 'positive'},
            ]
        }
    except Exception as e:
        return {'error': str(e)}

if __name__ == '__main__':
    try:
        input_data = json.loads(sys.argv[1])
        result = predict(input_data)
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({'error': 'Invalid input or execution error: ' + str(e)}))
