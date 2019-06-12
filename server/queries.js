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

const getReports = (req, res) => {
    const ret = [
        {
            id: 'a',
            name: 'tom',
            date: 'today'
        },
        {
            id: 'b',
            name: 'louis'
        }
    ];
    res.json(ret);
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
