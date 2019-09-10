const Surveys = require('../queries/surveys');

const express = require('express');

const router = express.Router()


router.get('/:id', (req, res) => {
    Surveys.getFormJSON(req.params.id, res);
})


module.exports = router
