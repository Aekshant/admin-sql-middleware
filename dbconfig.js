require('dotenv').config();
const {createPool} = require('mysql');
const pool =createPool({
        host: process.env.HOST,
        user: process.env.USER,
        database: process.env.DB,
        multipleStatements: true
})
module.exports = pool