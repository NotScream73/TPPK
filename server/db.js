require("dotenv").config;

const pg = require("pg");
const pool = new pg.Pool({
  user: 'postgres',
  password: '250303zyzf',
  host: '109.197.199.134',
  database: 'postgres',
  port: 5432
});
module.exports = pool