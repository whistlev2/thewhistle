const Surveys = require('../queries/surveys');

const express = require('express');

const router = express.Router()


router.get('/user/:userID', async (req, res) => {
    var userID = req.params.userID
    const forms = await Surveys.getUserForms(userID);
    res.json({ forms: forms });
})

//TODO: Delete if not needed
router.get('/json/:slug', (req, res) => {
    Surveys.getFormJSON(req.params.slug, res);
})

//TODO: Delete if not needed
router.get('/test-json/:slug', (req, res) => {
    Surveys.getTestFormJSON(req.params.slug, res);
})

router.get('/:slug', async (req, res) => {
    try {
        let ret = await Surveys.getFormFromSlug(req.params.slug, true);
        res.json(ret);
    } catch (err) {
        console.log(err)
        //TODO: Handle errors properly
    }
})

router.get('/edit/:slug', async (req, res) => {
    try {
        console.log('UMP ETTY')
        const form = await Surveys.getEditFormJSON(req.params.slug);
        console.log('J B', form);
        res.json({ form: form });
    } catch (err) {
        console.error(err);
        //TODO: Handle properly
    }
})


module.exports = router
