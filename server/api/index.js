const express = require('express')

const users = require('./users.js')
const forms = require('./forms.js')
const reports = require('./reports.js')

const router = express.Router()
// Set up routes
router.use('/users', users)

router.use('/forms', forms)

router.use('/reports', reports)
const auth = require('./auth.js')

const router = express.Router()
// Set up routes
router.use('/auth', auth)

router.get('/tstlogin', (req, res) => {
  const user = {id: 1, name: 'BOB', email: "test@tst.com", org: "TestOrg"}
  res.json(user)
})

module.exports = router
