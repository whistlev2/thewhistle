const bcrypt = require('bcrypt')

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


exports.createNewUser = function(email, password, organisation_id) {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) return err
      const query = 'INSERT INTO users(email, password, organisation_id) VALUES($1, $2, $3) RETURNING id'
      const values = [email, hash, organisation_id];

      db.query(query, values, (error, results) => {
        console.log('query', err)
          if (error) {
              console.error(error);
          }
        })
    })
  })
}

exports.updatePassword = function(id, currentPassword, newPassword) {
  db.query(`SELECT * FROM users WHERE id='${id}'`, (error, results) => {
    if (error) {
      done(error)
    }
    var user = results.rows[0]
    bcrypt.compare(currentPassword, user.password, (err, isMatch) => {
      if (err) return next(err)
      saveNewPassword(id, newPassword)
    })
  })
}

function saveNewPassword(id, newPassword) {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(newPassword, salt, (err, hash) => {
      if (err) return err
      db.query(`UPDATE users SET password='${hash}' WHERE id='${id}'`, (error, results) => {
        if (error) {
          throw error;
        }
      })
    })
  })
}

exports.deserializeUser = function (id, done) {
  db.query(`SELECT * FROM users JOIN organisations ON organisations.id = users.organisation_id WHERE users.id='${id}'`, (error, results) => {
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
    if(!user) return done(null, false, { message: 'No such user' })

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return done(err)
      done(null, user)
    })
  })
}
