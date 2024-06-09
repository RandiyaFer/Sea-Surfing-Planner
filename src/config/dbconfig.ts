// Importing necessary modules from 'mysql2'
import mysql, { createConnection, Connection } from 'mysql2';

// Creating a MySQL connection using createConnection function
export const db: Connection = createConnection({
  
    host: 'localhost',       
    user: 'root',            
    password: 'pamindu123',
    database: 'surfy_backend'
});