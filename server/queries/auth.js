const Pool = require('pg').Pool;
const db = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'thewhistle',
    password: 'postgres',
    port: 5432
});

const user = {id: 1, name: 'BOB', email: "test@tst.com", org: "TestOrg", password: "bob"}

exports.serializeUser = function (user, done) {
  return done(null, user.id)
}

exports.deserializeUser = function (id, done) {
  db.query(`SELECT * FROM users WHERE id='${id}'`, (error, results) => {
      if (error) {
        done(error)
      }
      var user = results.rows[0]
      return done(error, user)
  })
}

exports.findUser = function (email, password, done) {
  db.query(`SELECT * FROM users WHERE email='${email}'`, (error, results) => {
      if (error) {
        done(error)
      }
      var user = results.rows[0]
      return done(null, user)
  })
}
