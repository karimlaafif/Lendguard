// warehouse/jobs/etl-scheduler.ts
import cron from 'node-cron';
import { exec } from 'child_process';
import path from 'path';

// Schedule ETL pipeline to run daily at 2 AM
const scheduleETL = () => {
  // Cron expression: 0 2 * * * = 2:00 AM every day
  cron.schedule('0 2 * * *', () => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] 🚀 Starting scheduled ETL pipeline...`);
    
    const pythonScript = path.join(__dirname, '../../warehouse/etl/pipeline.py');
    const pythonExe = path.join(__dirname, '../../warehouse/.venv/Scripts/python.exe');
    
    exec(`"${pythonExe}" "${pythonScript}"`, (error, stdout, stderr) => {
      const timestamp = new Date().toISOString();
      
      if (error) {
        console.error(`[${timestamp}] ❌ ETL Pipeline failed with error:`);
        console.error(`   Code: ${error.code}`);
        console.error(`   Message: ${error.message}`);
        if (stderr) console.error(`   StdErr: ${stderr}`);
        return;
      }
      
      console.log(`[${timestamp}] ✅ ETL Pipeline completed successfully`);
      if (stdout) {
        console.log(`\n--- Pipeline Output ---`);
        console.log(stdout);
        console.log(`--- End Output ---\n`);
      }
    });
  });

  console.log('✅ ETL Scheduler initialized - Running daily at 2:00 AM');
};

// Export for use in main server file
export { scheduleETL };
