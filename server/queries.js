//TODO: Convert to ts

const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'thewhistle',
    password: 'postgres',
    port: 5432
});
const getSurveys = (request, response) => {
    pool.query('SELECT * FROM surveys ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error;
        }
        response.json(results.rows);
    });
};

function processJson(rows) {
    let ret = [];
    for (let i = 0; i < rows.length; i++) {
        let el = {};
        for (var key in rows[i].response_json) {
            el[key] = rows[i].response_json[key];
        }
        ret.push(el);
    }
    return ret;
}

const getReports = (req, res) => {
    pool.query('SELECT response_json FROM rawresponse ORDER BY id ASC LIMIT 1', (error, results) => {
        if (error) {
            throw error;
        }
        let ret = processJson(results.rows);
        res.json(ret);
    });
};

function saveTypeformResponse(data) {
    console.log(data);
    const query = 'INSERT INTO rawresponse(response_json) VALUES($1)'
    const values = [data]
    pool.query(query, values, (error, results) => {
        if (error) {
            console.log(error);
        }
        console.log(results)
    });
}


module.exports = {
    getSurveys,
    getReports,
    saveTypeformResponse
};