const Pool = require('pg').Pool;
const db = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'thewhistle',
    password: 'postgres',
    port: 5432
});

exports.getUsers = function (res) {
  db.query(`SELECT * FROM users`, (error, results) => {
    res.json(results.rows)
  })
}

exports.getOrgUsers = function(res, orgId) {
  db.query(`SELECT * FROM users where organisation_id=${orgId}`, (error, results) => {
    res.json(results.rows)
  })
}
