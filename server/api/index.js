const express = require('express')

const users = require('./users.js')
const forms = require('./forms.js')
const reports = require('./reports.js')
const report = require('./report.js')
const auth = require('./auth.js')

const router = express.Router()
// Set up routes

router.use('/auth', auth)

router.use('/users', users)

router.use('/forms', forms)

router.use('/reports', reports)

router.use('/report', report)

module.exports = router
