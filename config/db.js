const mysql = require("mysql2");
const config = require("./constant.json");
const pool = mysql.createPool({
  connectionLimit: 5,
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASS,
  port: config.DB_PORT,
  database: config.DB_DATABASE,
});

pool.getConnection((err) => {
  if (err) {
    console.error("Error connecting to DB.", err.stack);
    process.exit(1);
  }
  console.log("Connected to DB.");
});

// Execute SQL query with error handling and promise support
const executeQuery = (query, arrayParams) => {
  return new Promise((resolve, reject) => {
    pool.query(query, arrayParams, (err, data) => {
      if (err) {
        console.error("Error executing the query:", err);
        reject(err); // Reject the promise on error
      } else {
        resolve(data); // Resolve the promise with query results
      }
    });
  });
};

module.exports = { executeQuery };
