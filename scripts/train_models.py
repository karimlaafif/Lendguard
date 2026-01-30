import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from xgboost import XGBClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score
import json
from pathlib import Path

# Create models directory
Path('models').mkdir(exist_ok=True)

# Load dataset
print('Loading dataset...')
# Adjusted path based on file exploration
df = pd.read_csv('Datasets/Loan_default.csv')

print(f'Dataset shape: {df.shape}')
print(f'Columns: {df.columns.tolist()}')

# Feature Engineering: RiskScore
def calculate_risk_score(row):
    score = (
        (row['DTIRatio'] * 300) +
        (row['LoanAmount'] / row['Income'] * 250) +
        ((850 - row['CreditScore']) / 850 * 200) +
        (row['InterestRate'] * 10 * 150) +
        (1 / (row['MonthsEmployed'] + 1) * 100)
    )
    return min(max(score, 0), 1000)  # Clamp to 0-1000

# Feature Engineering: AffordabilityIndex
def calculate_affordability_index(row):
    monthly_payment = row['LoanAmount'] * (row['InterestRate']/12) / (1 - (1 + row['InterestRate']/12)**(-row['LoanTerm']))
    affordability = (row['Income'] * (1 - row['DTIRatio'])) / (monthly_payment * row['LoanTerm']) * 10
    return min(max(affordability, 0), 10)  # Clamp to 0-10

print('Engineering features...')
df['RiskScore'] = df.apply(calculate_risk_score, axis=1)
df['AffordabilityIndex'] = df.apply(calculate_affordability_index, axis=1)

# Encode categorical variables
le_education = LabelEncoder()
le_employment = LabelEncoder()
le_marital = LabelEncoder()
le_purpose = LabelEncoder()

df['Education_Encoded'] = le_education.fit_transform(df['Education'])
df['EmploymentType_Encoded'] = le_employment.fit_transform(df['EmploymentType'])
df['MaritalStatus_Encoded'] = le_marital.fit_transform(df['MaritalStatus'])
df['LoanPurpose_Encoded'] = le_purpose.fit_transform(df['LoanPurpose'])

# Map binary features
binary_map = {'Yes': 1, 'No': 0}
df['HasMortgage'] = df['HasMortgage'].map(binary_map)
df['HasDependents'] = df['HasDependents'].map(binary_map)
df['HasCoSigner'] = df['HasCoSigner'].map(binary_map)

# Select features
feature_cols = [
    'Age', 'Income', 'LoanAmount', 'LoanTerm', 'InterestRate',
    'CreditScore', 'DTIRatio', 'NumCreditLines', 'MonthsEmployed',
    'HasMortgage', 'HasDependents', 'HasCoSigner',
    'Education_Encoded', 'EmploymentType_Encoded', 'MaritalStatus_Encoded', 'LoanPurpose_Encoded',
    'RiskScore', 'AffordabilityIndex'
]

X = df[feature_cols]
y = df['Default']

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42, stratify=y)

print(f'Training set: {X_train.shape}')
print(f'Test set: {X_test.shape}')
print(f'Default rate in training: {y_train.mean():.2%}')

# Scale features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Save scaler and encoders
joblib.dump(scaler, 'models/scaler.pkl')
joblib.dump(le_education, 'models/le_education.pkl')
joblib.dump(le_employment, 'models/le_employment.pkl')
joblib.dump(le_marital, 'models/le_marital.pkl')
joblib.dump(le_purpose, 'models/le_purpose.pkl')

print('Scaler and encoders saved.')

# Train models
models = {
    'logistic_regression': LogisticRegression(max_iter=1000, random_state=42),
    'random_forest': RandomForestClassifier(n_estimators=100, max_depth=15, random_state=42),
    'gradient_boosting': GradientBoostingClassifier(n_estimators=100, learning_rate=0.1, random_state=42),
    'xgboost': XGBClassifier(n_estimators=200, learning_rate=0.05, max_depth=8, random_state=42)
}

results = {}

for name, model in models.items():
    print(f'\nTraining {name}...')
    model.fit(X_train_scaled, y_train)
    
    # Predictions
    y_pred = model.predict(X_test_scaled)
    y_proba = model.predict_proba(X_test_scaled)[:, 1]
    
    # Metrics
    metrics = {
        'accuracy': accuracy_score(y_test, y_pred),
        'precision': precision_score(y_test, y_pred),
        'recall': recall_score(y_test, y_pred),
        'f1_score': f1_score(y_test, y_pred),
        'roc_auc': roc_auc_score(y_test, y_proba)
    }
    
    results[name] = metrics
    
    print(f'Accuracy: {metrics["accuracy"]:.4f}')
    print(f'Precision: {metrics["precision"]:.4f}')
    print(f'Recall: {metrics["recall"]:.4f}')
    print(f'F1-Score: {metrics["f1_score"]:.4f}')
    print(f'ROC-AUC: {metrics["roc_auc"]:.4f}')
    
    # Save model
    joblib.dump(model, f'models/{name}.pkl')
    print(f'Model saved: models/{name}.pkl')

# Save results
with open('models/model_metrics.json', 'w') as f:
    json.dump(results, f, indent=2)

print('\n✅ All models trained and saved successfully!')
print('\n📊 Best model:', max(results, key=lambda x: results[x]['roc_auc']))
