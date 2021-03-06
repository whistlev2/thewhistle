const express = require('express')

const users = require('./users.js')
const forms = require('./forms.js')
const reports = require('./reports.js')
const report = require('./report.js')
const auth = require('./auth.js')
const editForm = require('./editForm.js')
const organisations = require('./organisations.js')
const errors = require('./errors.js');
const session = require('./session.js');

const router = express.Router()
// Set up routes

router.use('/users', users);

router.use('/forms', forms);

router.use('/reports', reports);

router.use('/report', report);

router.use('/edit-form', editForm);

router.use('/auth', auth);

router.use('/organisations', organisations);

router.use('/errors', errors);

router.use('/session', session);

module.exports = router
