const db = require('../db.ts')

// TODO - combine the users.js API functions with this file

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
