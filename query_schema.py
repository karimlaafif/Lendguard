import psycopg2

try:
    conn = psycopg2.connect(
        host='localhost',
        port=5432,
        user='user',
        password='password',
        database='lendguard'
    )
    cursor = conn.cursor()
    
    cursor.execute('''SELECT table_name FROM information_schema.tables 
                      WHERE table_schema = 'public' ORDER BY table_name;''')
    tables = cursor.fetchall()
    
    print('=== PostgreSQL Schema ===\n')
    print('Tables in lendguard database:')
    print('-' * 60)
    
    for table in tables:
        table_name = table[0]
        print(f'\n[TABLE] {table_name}')
        print('  Columns:')
        
        cursor.execute(f'''SELECT column_name, data_type, is_nullable 
                          FROM information_schema.columns 
                          WHERE table_name = %s ORDER BY ordinal_position;''', (table_name,))
        columns = cursor.fetchall()
        
        if columns:
            for col in columns:
                nullable = 'NULL' if col[2] == 'YES' else 'NOT NULL'
                print(f'    {col[0]:<35} {col[1]:<20} {nullable}')
        else:
            print('    (no columns)')
    
    conn.close()
    print('\n' + '='*60)
    print('Schema retrieval complete!')
except Exception as e:
    print(f'Connection Error: {e}')
