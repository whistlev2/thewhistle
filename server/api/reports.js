const express = require('express');
const responses = require('../queries/responses.js')

const router = express.Router()

//TODO: Remove if not needed
router.post('/webhook', (req, res) => {
    responses.storeResponse(req.body)
    // req.on('data', chunk => {
    //   responses.storeResponse(JSON.parse(`${chunk}`))
    // })
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