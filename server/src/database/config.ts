import {Pool} from "pg";

const pool: Pool = new Pool({
    user: 'pyssnhvz',
    host: 'balarama.db.elephantsql.com',
    database: 'pyssnhvz',
    password: 'BRHrJhK6ROvEDBiY-vxEizFpZpZMTkvi',
    port: 5432
});

export {
    pool
}