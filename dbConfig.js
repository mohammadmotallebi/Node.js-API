const mysql = require('mysql2');

const pool = mysql.createPool({
   host: 'localhost',
   user: 'root',
    password: '57041362',
    database: 'express_fastjoo',
});

module.exports = pool;