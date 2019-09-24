const express = require('express');
const responses = require('../queries/responses.js')

const router = express.Router()

router.post('/webhook', (req, res) => {
  req.on('data', chunk => {
    // console.log(`Data chunk available: ${chunk}`)
    responses.storeResponse(JSON.parse(`${chunk}`))
  })
  // resonses.storeResponse(req)
  res.status(200).json([])
})

router.get('/:slug', (req, res) => {
  //TODO: Change from form id to slug
  responses.getFormResponsesFromSlug(res, req.params.slug);
})

module.exports = router
