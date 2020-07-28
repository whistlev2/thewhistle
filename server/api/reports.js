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

router.get('/:slug', (req, res) => {
    responses.getFormResponsesFromSlug(res, req.params.slug);
})

module.exports = router