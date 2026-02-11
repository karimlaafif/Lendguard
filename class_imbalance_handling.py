# Class Imbalance Handling for Loan Default Prediction
# Three approaches: Stratified CV, SMOTE, and Class Weights

import pandas as pd
import numpy as np
from sklearn.model_selection import StratifiedKFold, cross_val_score
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import roc_auc_score, roc_curve, confusion_matrix, classification_report
from imblearn.over_sampling import SMOTE
from imblearn.pipeline import Pipeline as ImbPipeline
import xgboost as xgb

# =============================================================================
# APPROACH 1: STRATIFIED K-FOLD CROSS-VALIDATION
# =============================================================================

def stratified_cv_evaluation(X, y, model, cv_folds=5):
    """
    Evaluate model using stratified K-fold cross-validation.
    Maintains class distribution in each fold (critical for imbalanced data).
    """
    print("=" * 80)
    print("APPROACH 1: STRATIFIED K-FOLD CROSS-VALIDATION")
    print("=" * 80)
    
    # Create stratified folds
    skf = StratifiedKFold(n_splits=cv_folds, shuffle=True, random_state=42)
    
    # Evaluate on multiple metrics
    auc_scores = []
    fold_num = 1
    
    for train_idx, val_idx in skf.split(X, y):
        X_train, X_val = X.iloc[train_idx], X.iloc[val_idx]
        y_train, y_val = y.iloc[train_idx], y.iloc[val_idx]
        
        # Scale features
        scaler = StandardScaler()
        X_train_scaled = scaler.fit_transform(X_train)
        X_val_scaled = scaler.transform(X_val)
        
        # Train model
        model.fit(X_train_scaled, y_train)
        
        # Evaluate
        y_pred_proba = model.predict_proba(X_val_scaled)[:, 1]
        auc = roc_auc_score(y_val, y_pred_proba)
        auc_scores.append(auc)
        
        print(f"Fold {fold_num}: AUC = {auc:.4f}")
        fold_num += 1
    
    print(f"\nMean AUC: {np.mean(auc_scores):.4f} (+/- {np.std(auc_scores):.4f})")
    print("✓ Stratified CV ensures each fold has same class ratio as original data\n")
    
    return auc_scores


# =============================================================================
# APPROACH 2: SMOTE (SYNTHETIC MINORITY OVER-SAMPLING TECHNIQUE)
# =============================================================================

def smote_resampling(X_train, y_train, X_test, y_test, model):
    """
    Apply SMOTE to balance training data by creating synthetic minority samples.
    ONLY apply to training set, evaluate on original test set.
    """
    print("=" * 80)
    print("APPROACH 2: SMOTE (SYNTHETIC MINORITY OVER-SAMPLING)")
    print("=" * 80)
    
    print(f"\nBefore SMOTE:")
    print(f"  Class distribution: {pd.Series(y_train).value_counts().to_dict()}")
    print(f"  Ratio: 1:{pd.Series(y_train).value_counts()[0] / pd.Series(y_train).value_counts()[1]:.2f}")
    
    # Apply SMOTE
    smote = SMOTE(random_state=42, k_neighbors=5)
    X_train_smote, y_train_smote = smote.fit_resample(X_train, y_train)  # type: ignore
    X_train_smote = pd.DataFrame(X_train_smote, columns=X_train.columns)
    
    print(f"\nAfter SMOTE:")
    print(f"  Class distribution: {pd.DataFrame(y_train_smote)[0].value_counts().sort_index().to_dict()}")
    print(f"  Ratio: 1:1 (perfectly balanced)")
    
    # Scale features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train_smote)
    X_test_scaled = scaler.transform(X_test)
    
    # Train model on balanced data
    model.fit(X_train_scaled, y_train_smote)
    
    # Evaluate on original (imbalanced) test set
    y_pred_proba = model.predict_proba(X_test_scaled)[:, 1]
    auc = roc_auc_score(y_test, y_pred_proba)
    
    print(f"\nTest Set AUC: {auc:.4f}")
    print("✓ SMOTE creates synthetic minority samples to balance training data")
    print("✓ Model trained on balanced data, evaluated on original test distribution\n")
    
    return auc, model


# =============================================================================
# APPROACH 3: CLASS WEIGHTS
# =============================================================================

def class_weight_adjustment(X_train, y_train, X_test, y_test):
    """
    Use class_weight parameter to penalize misclassification of minority class.
    Automatically adjusts to inverse frequency: w_i = n_samples / (n_classes * n_i)
    """
    print("=" * 80)
    print("APPROACH 3: CLASS WEIGHTS")
    print("=" * 80)
    
    # Calculate automatic weights
    n_samples = len(y_train)
    n_classes = 2
    class_counts = pd.Series(y_train).value_counts().sort_index()
    
    weights = {
        0: n_samples / (n_classes * class_counts[0]),
        1: n_samples / (n_classes * class_counts[1])
    }
    
    print(f"\nAutomatic class weights (inverse frequency):")
    print(f"  Non-default weight: {weights[0]:.4f}")
    print(f"  Default weight: {weights[1]:.4f} (penalizes minority more)")
    
    # Scale features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Logistic Regression with class weights
    print(f"\n--- Logistic Regression with Class Weights ---")
    lr = LogisticRegression(class_weight='balanced', max_iter=1000, random_state=42)
    lr.fit(X_train_scaled, y_train)
    y_pred_proba_lr = lr.predict_proba(X_test_scaled)[:, 1]
    auc_lr = roc_auc_score(y_test, y_pred_proba_lr)
    print(f"Test AUC: {auc_lr:.4f}")
    
    # XGBoost with scale_pos_weight
    print(f"\n--- XGBoost with scale_pos_weight ---")
    scale_pos_weight = weights[0] / weights[1]  # ratio of negative to positive
    print(f"scale_pos_weight parameter: {scale_pos_weight:.4f}")
    
    xgb_model = xgb.XGBClassifier(
        scale_pos_weight=scale_pos_weight,
        max_depth=5,
        learning_rate=0.1,
        n_estimators=100,
        random_state=42,
        verbosity=0
    )
    xgb_model.fit(X_train_scaled, y_train)
    y_pred_proba_xgb = xgb_model.predict_proba(X_test_scaled)[:, 1]
    auc_xgb = roc_auc_score(y_test, y_pred_proba_xgb)
    print(f"Test AUC: {auc_xgb:.4f}")
    
    print(f"\n✓ Class weights penalize misclassification of minority class")
    print(f"✓ Works directly in model objective, no data resampling needed\n")
    
    return auc_lr, auc_xgb


# =============================================================================
# COMPREHENSIVE COMPARISON
# =============================================================================

def compare_all_approaches(df, target_col='Default', random_state=42):
    """
    Compare all three approaches on the same data split.
    """
    from sklearn.model_selection import train_test_split
    
    print("\n" + "=" * 80)
    print("COMPREHENSIVE COMPARISON: ALL THREE APPROACHES")
    print("=" * 80)
    
    # Prepare data
    X = df.drop(columns=[target_col])
    y = df[target_col]
    
    # Train-test split (stratified to preserve class balance)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, stratify=y, random_state=random_state
    )
    
    print(f"\nData Split:")
    print(f"  Training set: {len(X_train)} samples")
    print(f"  Test set: {len(X_test)} samples")
    print(f"  Train default rate: {y_train.mean()*100:.2f}%")
    print(f"  Test default rate: {y_test.mean()*100:.2f}%")
    
    results = {}
    
    # Approach 1: Stratified CV
    cv_scores = stratified_cv_evaluation(X_train, y_train, 
                                         LogisticRegression(max_iter=1000, random_state=42))
    results['Stratified CV (Logistic Regression)'] = np.mean(cv_scores)
    
    # Approach 2: SMOTE
    auc_smote, _ = smote_resampling(X_train, y_train, X_test, y_test,
                                     LogisticRegression(max_iter=1000, random_state=42))
    results['SMOTE + Logistic Regression'] = auc_smote
    
    # Approach 3: Class Weights
    auc_lr_cw, auc_xgb_cw = class_weight_adjustment(X_train, y_train, X_test, y_test)
    results['Class Weights (Logistic Regression)'] = auc_lr_cw
    results['Class Weights (XGBoost)'] = auc_xgb_cw
    
    # Print comparison
    print("\n" + "=" * 80)
    print("RESULTS COMPARISON (Test Set AUC)")
    print("=" * 80)
    for approach, auc in sorted(results.items(), key=lambda x: x[1], reverse=True):
        print(f"  {approach:.<50} {auc:.4f}")
    
    print("\n RECOMMENDATION:")
    print("  ✓ Stratified CV: Use for cross-validation (maintains class ratio per fold)")
    print("  ✓ SMOTE: Use when you need to balance training data explicitly")
    print("  ✓ Class Weights: Use for efficiency (no resampling, built into model)")
    print("  → Best practice: Use STRATIFIED CV + CLASS WEIGHTS together")


# =============================================================================
# USAGE EXAMPLE
# =============================================================================

if __name__ == "__main__":
    # Load your loan default data
    # df = pd.read_csv('../Datasets/Loan_default.csv')
    
    # Compare all approaches
    # compare_all_approaches(df, target_col='Default')
    
    print("Loan Default Prediction - Class Imbalance Handling Guide")
    print("\nThree complementary approaches:")
    print("1. Stratified K-Fold: Maintains class ratio in CV folds")
    print("2. SMOTE: Creates synthetic minority samples for training")
    print("3. Class Weights: Penalizes minority misclassification in model loss")
    print("\nUse together: Stratified CV + Class Weights = Robust solution")
