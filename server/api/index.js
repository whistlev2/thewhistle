const express = require('express')

const users = require('./users.js')

const router = express.Router()
// Set up routes
router.use('/users', users)


module.exports = router
