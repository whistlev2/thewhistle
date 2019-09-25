const express = require('express');
const passport = require('passport')

const auth = require('../queries/auth.js');

const router = express.Router()


router.post('/register', (req, res) => {
  const { email, password, organisation_id } = req.body
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }
  auth.createNewUser(email, passport, organisation_id)

})

router.post('/login', passport.authenticate('local'), (req, res) => {
  req.user.password = undefined
  res.json(req.user)
})

router.post('/logout', (req, res) => {
  req.logout()
  res.json({ ok: true })
})

router.patch('/', (req, res) => {
  if (!req.user || !req.user.id) return res.sendStatus(401)
  auth.updatePassword(req.user.id, req.body.currentPassword, req.body.newPassword)
})

module.exports = router
