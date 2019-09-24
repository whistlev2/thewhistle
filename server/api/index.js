const express = require('express')

const users = require('./users.js')
const forms = require('./forms.js')
const reports = require('./reports.js')

const router = express.Router()
// Set up routes
router.use('/users', users)

router.use('/forms', forms)

router.use('/reports', reports)

module.exports = router
