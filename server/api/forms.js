const Surveys = require('../queries/surveys');

const express = require('express');

const router = express.Router()


router.get('/user/:userId', (req, res) => {
    var userID = req.params.userID
    Surveys.getMyForms(userID, res);
})

router.get('/json/:slug', (req, res) => {
    Surveys.getFormJSON(req.params.slug, res);
})

router.get('/:slug', (req, res) => {
    Surveys.getFormFromSlug(req.params.slug, res);
})


module.exports = router
