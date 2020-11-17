const Forms = require('../queries/forms');

const express = require('express');

const router = express.Router()


router.get('/user/:userID', async (req, res) => {
    var userID = req.params.userID
    const forms = await Forms.getUserForms(userID);
    res.json({ forms: forms });
})

//TODO: Delete if not needed
router.get('/json/:slug', (req, res) => {
    Forms.getFormJSON(req.params.slug, res);
})

//TODO: Delete if not needed
router.get('/test-json/:slug', (req, res) => {
    Forms.getTestFormJSON(req.params.slug, res);
})

//Used to get /submit-report page
router.get('/:slug', async (req, res) => {
    try {
        let ret = await Forms.getFormFromSlug(req.params.slug, false);
        res.json(ret);
    } catch (err) {
        console.log(err)
        //TODO: Handle errors properly
    }
})

//Used to get /submit-test-report page
router.get('/:slug/test', async (req, res) => {
    try {
        let ret = await Forms.getFormFromSlug(req.params.slug, true);
        res.json(ret);
    } catch (err) {
        console.log(err)
        //TODO: Handle errors properly
    }
})

router.get('/edit/:slug', async (req, res) => {
    try {
        const form = await Forms.getEditFormJSON(req.params.slug);
        res.json({ form: form });
    } catch (err) {
        console.error(err);
        //TODO: Handle properly
    }
})


module.exports = router
