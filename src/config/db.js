
const mysql = require('mysql2');
 
const pool = mysql.createPool({
  host:     process.env.DB_HOST,        
  database: process.env.DB_NAME,            
  waitForConnections: true,
  connectionLimit: 10,
});
 
module.exports = pool.promise();