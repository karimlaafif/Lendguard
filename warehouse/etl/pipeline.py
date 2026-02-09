#!/usr/bin/env python3
"""
LendGuard AI - ETL Pipeline
Three-layer architecture: Bronze (raw) → Silver (clean) → Gold (aggregated)
"""

import logging
import sys
from datetime import datetime
from typing import Optional, Any
from pathlib import Path
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler('etl.log')
    ]
)
logger = logging.getLogger(__name__)


class ClickHouseConnection:
    """ClickHouse database connection handler"""
    
    def __init__(self):
        try:
            from clickhouse_driver import Client
            # Try connecting without password first
            self.client = Client(
                host=os.getenv('CLICKHOUSE_HOST', 'localhost'),
                port=int(os.getenv('CLICKHOUSE_PORT', 9000)),
                user=os.getenv('CLICKHOUSE_USER', 'default'),
            )
            logger.info("ClickHouse connection established")
        except Exception as e:
            logger.error(f"ClickHouse connection failed: {e}")
            raise
    
    def execute(self, query: str) -> Any:
        """Execute a query"""
        try:
            return self.client.execute(query)
        except Exception as e:
            logger.error(f"Query execution failed: {e}")
            raise
    
    def check_databases(self):
        """Verify all databases exist"""
        result = self.execute("SHOW DATABASES")
        databases = [db[0] for db in result]
        
        required_dbs = ['bronze_layer', 'silver_layer', 'gold_layer']
        for db in required_dbs:
            if db in databases:
                logger.info(f"[OK] {db} exists")
            else:
                logger.error(f"[ERROR] {db} missing")
        
        return all(db in databases for db in required_dbs)


class ETLPipeline:
    """ETL Pipeline orchestrator"""
    
    def __init__(self):
        self.ch = ClickHouseConnection()
        self.start_time = datetime.now()
    
    def run(self):
        """Execute the full ETL pipeline"""
        logger.info("Starting ETL Pipeline...")
        
        try:
            # Verify infrastructure
            if not self.ch.check_databases():
                logger.error("Database verification failed")
                return False
            
            logger.info("Pipeline configuration:")
            logger.info(f"   ClickHouse Host: {os.getenv('CLICKHOUSE_HOST', 'localhost')}")
            logger.info(f"   ClickHouse Port: {os.getenv('CLICKHOUSE_PORT', 9000)}")
            
            # Bronze layer: Extract
            logger.info("Extracting data to Bronze layer...")
            self._extract_to_bronze()
            
            # Silver layer: Transform
            logger.info("Transforming Bronze -> Silver...")
            self._transform_to_silver()
            
            # Gold layer: Aggregate
            logger.info("Aggregating to Gold layer...")
            self._aggregate_to_gold()
            
            # Performance metrics
            elapsed_time = (datetime.now() - self.start_time).total_seconds()
            logger.info(f"Pipeline completed in {elapsed_time:.2f} seconds")
            
            return True
            
        except Exception as e:
            logger.error(f"Pipeline failed: {e}")
            return False
    
    def _extract_to_bronze(self):
        """Extract data to Bronze layer"""
        logger.info("[BRONZE] Extraction started")
        # Placeholder: In production, extract from PostgreSQL
        logger.info("[BRONZE] Ready")
    
    def _transform_to_silver(self):
        """Transform Bronze → Silver"""
        logger.info("[SILVER] Transformation started")
        # Placeholder: Apply cleaning and validation
        logger.info("[SILVER] Ready")
    
    def _aggregate_to_gold(self):
        """Aggregate to Gold layer"""
        logger.info("[GOLD] Aggregation started")
        # Placeholder: Apply aggregations and compute metrics
        logger.info("[GOLD] Ready")


def main():
    """Main entry point"""
    try:
        pipeline = ETLPipeline()
        success = pipeline.run()
        sys.exit(0 if success else 1)
    except Exception as e:
        logger.error(f"Fatal error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
