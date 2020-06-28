const { createPool } = require("mysql");

const db_conn = createPool({
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectionLimit: 5,
    connectTimeout: 30
});

module.exports = db_conn;