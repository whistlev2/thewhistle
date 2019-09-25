const express = require('express')

const users = require('./users.js')
const forms = require('./forms.js')
const reports = require('./reports.js')
const auth = require('./auth.js')

const router = express.Router()
// Set up routes
router.use('/users', users)

router.use('/forms', forms)

router.use('/reports', reports)

router.use('/auth', auth)


module.exports = router
