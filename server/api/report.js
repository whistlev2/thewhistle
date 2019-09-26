const express = require('express');
const report = require('../queries/report.js')

const router = express.Router()

router.get('/:id', (req, res) => {
  report.getById(req.params.id, res)
})

module.exports = router
