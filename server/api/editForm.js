const FormGen = require('../utils/formGen');

const express = require('express');

const router = express.Router()

router.post('/:slug/create', createForm);

router.patch('/:slug/update-question-title/:questionRef', updateQuestionTitle);

router.post('/:slug/add-question/:questionRef', addQuestion)

router.delete('/:slug/delete-question/:questionRef', deleteQuestion)

router.patch('/:slug/update-question-jump/:questionRef', updateQuestionJump);

router.post('/:slug/add-option/:questionRef', addOption);

router.patch('/:slug/update-option-jump/:questionRef/:choiceRef', updateOptionJump);

router.delete('/:slug/delete-option/:questionRef/:choiceRef', deleteOption);

async function createForm(req, res) {
    try {
        await FormGen.createForm(req.params.slug, req.body.title, req.body.description, req.body.org, req.body.web)
        res.status(201) //Created
    } catch (err) {
        console.error(err)
    }
}

async function updateQuestionTitle(req, res) {
    try {
        const form = await FormGen.updateQuestionTitle(req.params.slug, req.params.questionRef, req.body.title);
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

async function deleteQuestion(req, res) {
    try {
        const form = await FormGen.deleteQuestion(req.params.slug, req.params.questionRef);
        res.json({
            form: form
        });
    } catch (err) {
        console.error(err);
        res.status(500);
        //TODO: Handle errors properly
    }
}

async function updateQuestionJump(req, res) {
    try {
        const form = await FormGen.updateQuestionJump(req.params.slug, req.params.questionRef, req.body.jump);
        res.json({
            form: form
        });
    } catch (err) {
        console.error(err);
        res.status(500);
        //TODO: Handle errors properly
    }
}

async function addOption(req, res) {
    try {
        const form = await FormGen.addOption(req.params.slug, req.params.questionRef, req.body.option);
        res.json({
            form: form
        });
    } catch (err) {
        console.error(err);
        res.status(500);
        //TODO: Handle errors properly
    }
}

async function updateOptionJump(req, res) {
    try {
        const form = await FormGen.updateOptionJump(req.params.slug, req.params.questionRef, req.params.choiceRef, req.body.jump);
        res.json({
            form: form
        });
    } catch (err) {
        console.error(err);
        res.status(500);
        //TODO: Handle errors properly
    }
}

async function deleteOption(req, res) {
    try {
        const form = await FormGen.deleteOption(req.params.slug, req.params.questionRef, req.params.choiceRef);
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
