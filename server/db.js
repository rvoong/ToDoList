//node pg.Pool documentation
const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "rv",
    host: "localhost",
    //default for POSTGRE
    port: 5432,
    database: "todolist"
});

module.exports = pool;