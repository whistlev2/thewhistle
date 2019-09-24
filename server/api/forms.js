const Surveys = require('../queries/surveys');

const express = require('express');

const router = express.Router()


router.get('/', (req, res) => {
    // TODO - BE - add userID to form query
    var userID = 1
    Surveys.getMyForms(userID, res);
})

router.get('/json/:slug', (req, res) => {
    Surveys.getFormJSON(req.params.slug, res);
})

router.get('/:slug', (req, res) => {
    Surveys.getFormFromSlug(req.params.slug, res);
})


module.exports = router
