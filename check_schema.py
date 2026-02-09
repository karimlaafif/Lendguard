#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import psycopg2
from urllib.parse import urlparse

db_url = "postgresql://user:password@localhost:5432/lendguard"

try:
    parsed = urlparse(db_url)
    conn = psycopg2.connect(
        user=parsed.username,
        password=parsed.password,
        host=parsed.hostname,
        port=parsed.port or 5432,
        database=parsed.path.lstrip('/')
    )
    cursor = conn.cursor()
    
    # Get all tables
    cursor.execute('''SELECT table_name FROM information_schema.tables 
                      WHERE table_schema = 'public' ORDER BY table_name;''')
    tables = cursor.fetchall()
    
    print('=== PostgreSQL Schema ===\n')
    print('Tables in lendguard database:')
    print('-' * 50)
    
    for table in tables:
        table_name = table[0]
        print(f'\n[TABLE] {table_name}')
        
        # Get columns for each table
        cursor.execute(f'''SELECT column_name, data_type, is_nullable 
                          FROM information_schema.columns 
                          WHERE table_name = %s ORDER BY ordinal_position;''', (table_name,))
        columns = cursor.fetchall()
        
        if columns:
            for col in columns:
                nullable = 'NULL' if col[2] == 'YES' else 'NOT NULL'
                print(f'  - {col[0]:<30} {col[1]:<15} {nullable}')
        else:
            print('  (no columns found)')
    
    conn.close()
    print('\n' + '='*50)
except Exception as e:
    print(f'Error: {e}')
    import traceback
    traceback.print_exc()
