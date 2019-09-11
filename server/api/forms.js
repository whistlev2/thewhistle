const Surveys = require('../queries/surveys');

const express = require('express');

const router = express.Router()


router.get('/myforms', (req, res) => {
    var userID = 1
    Surveys.getMyForms(userID, res);
})

router.get('/:id', (req, res) => {
    Surveys.getFormJSON(req.params.id, res);
})


module.exports = router
