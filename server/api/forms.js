const Forms = require('../queries/forms');

const express = require('express');

const router = express.Router()


router.get('/user/:userID', async (req, res, next) => {
    try {
        var userID = req.params.userID
        const forms = await Forms.getUserForms(userID);
        res.json({ forms: forms });
    } catch (err) {
        res.status(500);
        res.send('Could not get user forms');
        next(err);
    }
})

/* //TODO: Delete if not needed
router.get('/json/:slug', (req, res) => {
    Forms.getFormJSON(req.params.slug, res);
})

//TODO: Delete if not needed
router.get('/test-json/:slug', (req, res) => {
    Forms.getTestFormJSON(req.params.slug, res);
}) */

//Used to get /submit-report page
router.get('/:slug', async (req, res, next) => {
    try {
        let ret = await Forms.getFormFromSlug(req.params.slug, false);
        res.json(ret);
    } catch (err) {
        res.status(500);
        res.send('Could not get report form');
        next(err);
    }
})

//Used to get /submit-test-report page
router.get('/:slug/test', async (req, res, next) => {
    try {
        let ret = await Forms.getFormFromSlug(req.params.slug, true);
        res.json(ret);
    } catch (err) {
        res.status(500);
        res.send('Could not get test report form');
        next(err);
    }
})

router.get('/edit/:slug', async (req, res, next) => {
    try {
        const form = await Forms.getEditFormJSON(req.params.slug);
        res.json({ form: form });
    } catch (err) {
        res.status(500);
        res.send('Could not get form JSON');
        next(err)
    }
})


module.exports = router
