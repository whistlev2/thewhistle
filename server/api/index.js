const express = require('express')

const users = require('./users.js')
const forms = require('./forms.js')

const router = express.Router()
// Set up routes
router.use('/users', users)

router.use('/forms', forms)

module.exports = router
