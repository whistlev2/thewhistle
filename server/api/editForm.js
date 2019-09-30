const FormGen = require('../utils/formGen');

const express = require('express');

const router = express.Router()

router.get('/update-option-jump', (req, res) => {
    FormGen.updateOptionJump(req.query.formSlug, req.query.question, req.query.choiceRef, req.query.jump, res);
})

router.get('/update-question-jump', (req, res) => {
    FormGen.updateQuestionJump(req.query.formSlug, req.query.question, req.query.jump, res);
})


module.exports = router
