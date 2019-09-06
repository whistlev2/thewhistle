const express = require('express');
const passport = require('passport')

const router = express.Router()


router.post('/register', (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }
  const user = new User({ email, password })
  user.save(err => {
    if (err) {
      return res.status(409).json({ message: 'Already exists' })
    }
    req.logIn(user, (err) => {
      if (err) return res.sendStatus(500)
      user.password = undefined
      res.json(user)
    })
  })
})

router.post('/tstlogin', (req, res) => {
  const user = {id: 1, name: 'BOB', email: "test@tst.com", org: "TestOrg"}
  res.json(user)
})

router.post('/login', passport.authenticate('local'), (req, res) => {
  console.log('Login user with params')
  req.user.password = undefined
  res.json(req.user)
})

router.post('/logout', (req, res) => {
  req.logout()
  res.json({ ok: true })
})

router.patch('/', (req, res) => {
  if (!req.user || !req.user.id) return res.sendStatus(401)
  User.findById(req.user.id, (err, user) => {
    if (err) return res.sendStatus(404)
    user.comparePassword(req.body.currentPassword, (err, isMatch) => {
      if (err || !isMatch) return res.sendStatus(400)
      user.password = req.body.newPassword
      user.save(err => res.sendStatus(err ? 500 : 200))
    })
  })
})

module.exports = router
