//TODO: Convert to ts

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'thewhistle',
    password: 'postgres',
    port: 5432,
})
const getSurveys = (request, response) => {
    pool.query('SELECT * FROM surveys ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.json(results.rows);
    })
}

const getReports = (req, res) => {
    const ret = [
        {
            id: 'a',
            name: 'tom',
            date: 'today',
        },
        {
            id: 'b',
            name: 'louis',
        },
    ]
    res.json(ret);
}

module.exports = {
    getSurveys,
    getReports
}