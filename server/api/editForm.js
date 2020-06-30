const FormGen = require('../utils/formGen');

const express = require('express');

const router = express.Router()

router.get('/update-option-jump', (req, res) => {
    FormGen.updateOptionJump(req.query.formSlug, req.query.question, req.query.choiceRef, req.query.jump, res);
})

router.get('/update-question-jump', (req, res) => {
    FormGen.updateQuestionJump(req.query.formSlug, req.query.question, req.query.jump, res);
})

router.post('/:slug/update-question/:questionRef', updateQuestion);

router.post('/:slug/add-question/:questionRef', addQuestion)

async function updateQuestion(req, res) {
    try {
        const form = await FormGen.updateQuestion(req.params.slug, req.params.questionRef, req.body.title);
        res.json({
            form: form
        });
    } catch (err) {
        console.error(err);
        res.status(500);
        //TODO: Handle errors properly
    }
}

async function addQuestion(req, res) {
    try {
        const form = req.body.before ?
            await FormGen.addQuestionBefore(req.params.slug, req.params.questionRef, req.body.question) :
            await FormGen.addQuestionAfter(req.params.slug, req.params.questionRef, req.body.question);
        
        res.json({
            form: form
        });
    } catch (err) {
        console.error(err);
        res.status(500);
        //TODO: Handle errors properly
    }
}


module.exports = router
