-- ClickHouse Data Warehouse Schema for LendGuard AI
-- Three-layer architecture: Bronze (raw), Silver (clean), Gold (aggregated)

-- ===========================
-- BRONZE LAYER (Raw Data)
-- ===========================
CREATE DATABASE IF NOT EXISTS bronze_layer;

CREATE TABLE IF NOT EXISTS bronze_layer.raw_loan_applications (
    application_id UUID,
    user_id UUID,
    loan_amount Float64,
    loan_term_months UInt16,
    annual_income Float64,
    credit_score UInt16,
    employment_status String,
    debt_to_income_ratio Float32,
    existing_debt Float64,
    payment_history String,
    collateral_type String,
    application_date DateTime,
    extraction_timestamp DateTime DEFAULT now()
) ENGINE = MergeTree()
ORDER BY (application_date, user_id);

CREATE TABLE IF NOT EXISTS bronze_layer.raw_user_profiles (
    user_id UUID,
    email String,
    age UInt8,
    occupation String,
    years_employed UInt8,
    education_level String,
    marital_status String,
    num_dependents UInt8,
    residential_status String,
    created_at DateTime,
    extraction_timestamp DateTime DEFAULT now()
) ENGINE = MergeTree()
ORDER BY (created_at, user_id);

CREATE TABLE IF NOT EXISTS bronze_layer.raw_transaction_history (
    transaction_id UUID,
    user_id UUID,
    transaction_amount Float64,
    transaction_date DateTime,
    transaction_type String,
    merchant_category String,
    extraction_timestamp DateTime DEFAULT now()
) ENGINE = MergeTree()
ORDER BY (transaction_date, user_id);

-- ===========================
-- SILVER LAYER (Cleaned Data)
-- ===========================
CREATE DATABASE IF NOT EXISTS silver_layer;

CREATE TABLE IF NOT EXISTS silver_layer.clean_loan_applications (
    application_id UUID,
    user_id UUID,
    loan_amount Float64,
    loan_term_months UInt16,
    normalized_income Float64,
    normalized_credit_score Float32,
    employment_score UInt8,
    debt_to_income_ratio Float32,
    existing_debt Float64,
    payment_history_score Float32,
    collateral_value Float64,
    application_date DateTime,
    risk_category String,
    risk_score Float32,
    processed_timestamp DateTime DEFAULT now()
) ENGINE = MergeTree()
ORDER BY (application_date, user_id);

CREATE TABLE IF NOT EXISTS silver_layer.clean_user_profiles (
    user_id UUID,
    email String,
    age_group String,
    occupation_category String,
    employment_stability_score Float32,
    education_score UInt8,
    family_size UInt8,
    location_type String,
    profile_completeness Float32,
    processed_timestamp DateTime DEFAULT now()
) ENGINE = MergeTree()
ORDER BY (user_id);

CREATE TABLE IF NOT EXISTS silver_layer.transaction_aggregates (
    user_id UUID,
    transaction_period String,
    total_spending Float64,
    avg_transaction_amount Float64,
    transaction_frequency UInt32,
    high_risk_transactions UInt32,
    spending_volatility Float32,
    processed_timestamp DateTime DEFAULT now()
) ENGINE = MergeTree()
ORDER BY (transaction_period, user_id);

-- ===========================
-- GOLD LAYER (Aggregated Analytics)
-- ===========================
CREATE DATABASE IF NOT EXISTS gold_layer;

CREATE TABLE IF NOT EXISTS gold_layer.portfolio_risk_metrics (
    portfolio_id String,
    date DateTime,
    total_applications UInt32,
    total_loan_volume Float64,
    avg_loan_amount Float64,
    total_users UInt32,
    default_risk_distribution String,
    portfolio_concentration Float32,
    seasonal_trend String,
    created_timestamp DateTime DEFAULT now()
) ENGINE = MergeTree()
ORDER BY (date, portfolio_id);

CREATE TABLE IF NOT EXISTS gold_layer.user_risk_clusters (
    user_id UUID,
    cluster_id UInt8,
    tsne_x Float32,
    tsne_y Float32,
    tsne_z Float32,
    default_probability Float32,
    cluster_label String,
    recommendation String,
    created_timestamp DateTime DEFAULT now()
) ENGINE = MergeTree()
ORDER BY (cluster_id, user_id);

CREATE TABLE IF NOT EXISTS gold_layer.daily_portfolio_summary (
    summary_date Date,
    total_active_loans UInt32,
    default_rate Float32,
    avg_loan_to_income Float32,
    portfolio_health_score Float32,
    risk_alerts UInt16,
    top_risk_segment String,
    created_timestamp DateTime DEFAULT now()
) ENGINE = MergeTree()
ORDER BY (summary_date);

-- ===========================
-- MATERIALIZED VIEWS (Optional Aggregations)
-- ===========================
CREATE MATERIALIZED VIEW IF NOT EXISTS gold_layer.user_risk_summary_mv
ENGINE = MergeTree()
ORDER BY (user_id)
AS SELECT
    user_id,
    max(default_probability) as max_risk_score,
    avg(default_probability) as avg_risk_score,
    count(*) as application_count,
    argMax(cluster_label, created_timestamp) as latest_cluster
FROM gold_layer.user_risk_clusters
GROUP BY user_id;
