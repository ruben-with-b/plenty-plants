import * as CONFIG from "./config";

const getDemos = (request: any, response: any) => {
    CONFIG.pool.query('SELECT * FROM Demo', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

export {
    getDemos
}