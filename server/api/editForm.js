const FormGen = require('../utils/formGen');
const Surveys = require('../queries/surveys.js');

const express = require('express');

const router = express.Router()

router.get('/:slug', getForm);

router.post('/:slug/create', createForm);

router.patch('/:sectionID/update-question-title/:questionRef', updateQuestionTitle);

router.post('/:sectionID/add-first-question', addFirstQuestion)

router.post('/:sectionID/add-question/:questionRef', addQuestion)

router.delete('/:sectionID/delete-question/:questionRef', deleteQuestion)

router.patch('/:sectionID/update-question-jump/:questionRef', updateQuestionJump);

router.post('/:sectionID/add-option/:questionRef', addOption);

router.patch('/:sectionID/update-option-jump/:questionRef/:choiceRef', updateOptionJump);

router.delete('/:sectionID/delete-option/:questionRef/:choiceRef', deleteOption);

async function getForm(req, res) {
    try {
        const form = await Surveys.getEditFormJSON(req.params.slug);
        res.json(form);
    } catch (err) {
        console.log(err);
    }
}

async function createForm(req, res) {
    try {
        //TODO: Input validations
        await FormGen.createForm(req.params.slug, req.body.title, req.body.description, req.body.org, req.body.web)
        res.status(201) //Created
        res.send()
    } catch (err) {
        //TODO: Handle errors properly
        console.error(err)
    }
}

async function updateQuestionTitle(req, res) {
    try {
        const form = await FormGen.updateQuestionTitle(req.params.sectionID, req.params.questionRef, req.body.title);
        res.json({
            form: form
        });
    } catch (err) {
        console.error(err);
        res.status(500);
        //TODO: Handle errors properly
    }
}

async function addFirstQuestion(req, res) {
    try {
        console.log('HEE', req.params.sectionID)
        const form = FormGen.addFirstQuestion(req.params.sectionID, req.body.question);
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
            await FormGen.addQuestionBefore(req.params.sectionID, req.params.questionRef, req.body.question) :
            await FormGen.addQuestionAfter(req.params.sectionID, req.params.questionRef, req.body.question);
        
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
        const form = await FormGen.deleteQuestion(req.params.sectionID, req.params.questionRef);
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
        const form = await FormGen.updateQuestionJump(req.params.sectionID, req.params.questionRef, req.body.jump);
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
        const form = await FormGen.addOption(req.params.sectionID, req.params.questionRef, req.body.option);
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
        const form = await FormGen.updateOptionJump(req.params.sectionID, req.params.questionRef, req.params.choiceRef, req.body.jump);
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
        const form = await FormGen.deleteOption(req.params.sectionID, req.params.questionRef, req.params.choiceRef);
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
