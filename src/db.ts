const sql = require('mssql/msnodesqlv8');

const config = {
    server: 'localhost\\SQLEXPRESS',
    database: 'ct360',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true
    }
};

export async function executeCommmand(cmd: string) {
    try {
        // Create connection pool
        const pool = await sql.connect(config);
        
        // Query to get all users
        const result = await pool.request().query(cmd);
        
        console.log('query executed successfully');
  
        
        // Close the connection
        await sql.close();
        
        return result.recordset;
    } catch (err) {
        console.error('Error executing query:', err);
        // Ensure connection is closed even if there's an error
        await sql.close();
        throw err;
    }
}
