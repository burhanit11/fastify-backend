const mysql = require("mysql");
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
    console.log("Error is connecting to DB.", err.stack);
    process.exit(1);
  }
  console.log("Connected To DB.");
});

const excuteQuery = (qyery, arrayParams) => {
  return new Promise((resolve, reject) => {
    try {
      pool.query(qyery, arrayParams, (err, data) => {
        if (err) {
          console.log("Error excuting the query");
          reject(err);
        }
        resolve(data);
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { excuteQuery };
