const express = require('express')

const users = require('./users.js')
const forms = require('./forms.js')
const reports = require('./reports.js')
const report = require('./report.js')
const auth = require('./auth.js')

const router = express.Router()
// Set up routes

router.use('/users', users)

router.use('/forms', forms)

router.use('/reports', reports)

router.use('/report', report)

router.use('/auth', auth)

module.exports = router
