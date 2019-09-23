const Surveys = require('../queries/surveys');

const express = require('express');

const router = express.Router()


router.get('/', (req, res) => {
    var userID = 1
    Surveys.getMyForms(userID, res);
})

router.get('/json/:id', (req, res) => {
    Surveys.getFormJSON(req.params.id, res);
})

router.get('/:slug', (req, res) => {
    Surveys.getFormFromSlug(req.params.slug, res);
})


module.exports = router
