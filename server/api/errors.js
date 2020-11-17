const express = require('express');
const router = express.Router()
const Errors = require('../queries/errors.js');
router.get('/', async (req, res, next) => {
    try {
        let errors = await Errors.getErrors();
        res.json({ errors: errors });
    } catch (err) {
        res.status(500);
        res.send('Could not get errors');
        next(err);
    }
})

module.exports = router
