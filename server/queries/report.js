const db = require('../db.ts')

exports.getById = function(id, res) {
  db.query(`SELECT * FROM questionresponses where raw_response_id=${id}`, (error, results) => {
      if (error) {
          throw error;
      }
  res.json(results.rows)
})
}
