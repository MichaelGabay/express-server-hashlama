const mysql = require("mysql2");
require("dotenv").config();
const fs = require('fs');
const path = require("path");

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.ROOT_USER_PASSWORD,
    database: process.env.DB_NAME
}).promise();




const sqlContent = fs.readFileSync(path.join(__dirname, "createTables.sql"), "utf8");

const queries = sqlContent.split(';').map((query) => query.trim());




const createTables = async () => {
    try {
        queries.forEach(async query => await pool.query(query))
        console.log("tables created");
    }
    catch (error) {
        console.log(error);
    }
}
createTables();

module.exports = pool;