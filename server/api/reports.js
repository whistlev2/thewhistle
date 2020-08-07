const express = require('express');
const responses = require('../queries/responses.js')

const router = express.Router()

router.post('/typeform-webhook/:section', async (req, res) => {
    await responses.storeResponse(req.params.section, req.body)
    res.status(200).json([])
})

router.get('/:slug', async (req, res) => {
    let reports = await responses.getFormResponsesFromSlug(req.params.slug, false);
    res.json(reports);
})

router.get('/:slug/test', async (req, res) => {
    let reports = await responses.getFormResponsesFromSlug(req.params.slug, true);
    res.json(reports);
})

module.exports = router