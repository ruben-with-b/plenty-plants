import {Pool} from "pg";

/**
 * The DB connection data.
 */
export {
    pool
}

const pool: Pool = new Pool({
    user: 'pyssnhvz',
    host: 'balarama.db.elephantsql.com',
    database: 'pyssnhvz',
    password: 'BRHrJhK6ROvEDBiY-vxEizFpZpZMTkvi',
    port: 5432
});