const LocalStrategy = require('passport-local').Strategy

const auth = require('./queries/auth.js');

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    auth.serializeUser(user, done)
  })

  passport.deserializeUser((id, done) => {
    auth.deserializeUser(id, done)
  })

  passport.use(new LocalStrategy(
    (email, password, done) => { auth.findUser(email, password, done) }
  ))
}
