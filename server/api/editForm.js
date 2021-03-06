const FormGen = require('../utils/formGen');
const Forms = require('../queries/forms.js');
const FormSections = require('../queries/formsections.js')

const express = require('express');

const router = express.Router()

router.get('/:slug', getForm);

router.post('/:slug/create', createForm);

router.post('/:slug/add-section', addSection);

router.patch('/:sectionID/update-section', updateSection);

router.patch('/:slug/update-completed', updateCompleted);

router.patch('/:sectionID/update-question-title/:questionRef', updateQuestionTitle);

router.post('/:sectionID/add-first-question', addFirstQuestion)

router.post('/:sectionID/add-question/:questionRef', addQuestion)

router.delete('/:sectionID/delete-question/:questionRef', deleteQuestion)

router.patch('/:sectionID/update-question-jump/:questionRef', updateQuestionJump);

router.post('/:sectionID/add-option/:questionRef', addOption);

router.patch('/:sectionID/update-option-jump/:questionRef/:choiceRef', updateOptionJump);

router.delete('/:sectionID/delete-option/:questionRef/:choiceRef', deleteOption);

router.patch('/:sectionID/update-required/:questionRef', updateRequired);

router.delete('/:sectionID/delete-description/:questionRef', deleteDescription);

router.patch('/:sectionID/update-allow-multiple/:questionRef', updateAllowMultiple);

router.patch('/:sectionID/update-allow-other/:questionRef', updateAllowOther);

router.patch('/:sectionID/update-description/:questionRef', updateDescription);


async function getForm(req, res, next) {
    try {
        const form = await Forms.getEditFormJSON(req.params.slug);
        res.json(form);
    } catch (err) {
        res.status(500);
        res.send('Could not get form')
        next(err);
    }
}

async function createForm(req, res, next) {
    try {
        //TODO: Input validations
        await FormGen.createForm(req.params.slug, req.body.title, req.body.description, req.body.org, req.body.web)
        res.status(201) //Created
        res.send()
    } catch (err) {
        res.status(500);
        res.send('Could not create form');
        next(err);
    }
}

async function addSection(req, res, next) {
    try {
        //TODO: Input validations
        const section = await FormGen.addSection(req.params.slug, req.body);
        res.json({
            section: section
        });
    } catch (err) {
        res.status(500);
        res.send('Could not add section');
        next(err);
    }
}

async function updateSection(req, res, next) {
    try {
        //TODO: Input validations
        let section = req.body.section;
        section.id = req.params.sectionID;
        section = await FormGen.updateSection(req.body.section);
        res.json({
            section: section
        });
    } catch (err) {
        res.status(500);
        res.send('Could not update section');
        next(err);
    }
}

async function updateCompleted(req, res, next) {
    try {
        //TODO: Input validations
        let section = req.body;
        section.id = await FormSections.getCompletedSectionFromSlug(req.params.slug);
        await FormGen.updateSection(section);
        res.status(200);
        res.send();
    } catch (err) {
        res.status(500);
        res.send('Could not update section');
        next(err);
    }
}

async function updateQuestionTitle(req, res, next) {
    try {
        const section = await FormGen.updateQuestionTitle(req.params.sectionID, req.params.questionRef, req.body.title);
        res.json({
            section: section
        });
    } catch (err) {
        res.status(500);
        res.send('Could not update question title');
        next(err);
    }
}

async function addFirstQuestion(req, res, next) {
    try {
        const section = await FormGen.addFirstQuestion(req.params.sectionID, req.body.question);
        res.json({
            section: section
        });
    } catch (err) {
        res.status(500);
        res.send('Could not add first question');
        next(err);
    }
}

async function addQuestion(req, res, next) {
    try {
        const section = req.body.before ?
            await FormGen.addQuestionBefore(req.params.sectionID, req.params.questionRef, req.body.question) :
            await FormGen.addQuestionAfter(req.params.sectionID, req.params.questionRef, req.body.question);
        
        res.json({
            section: section
        });
    } catch (err) {
        res.status(500);
        res.send('Could not add question');
        next(err);
    }
}

async function deleteQuestion(req, res, next) {
    try {
        const section = await FormGen.deleteQuestion(req.params.sectionID, req.params.questionRef);
        res.json({
            section: section
        });
    } catch (err) {
        res.status(500);
        res.send('Could not delete question');
        next(err)
    }
}

async function updateQuestionJump(req, res, next) {
    try {
        const section = await FormGen.updateQuestionJump(req.params.sectionID, req.params.questionRef, req.body.jump);
        res.json({
            section: section
        });
    } catch (err) {
        res.status(500);
        res.send('Could not update question jump');
        next(err);
    }
}

async function addOption(req, res, next) {
    try {
        const section = await FormGen.addOption(req.params.sectionID, req.params.questionRef, req.body.option);
        res.json({
            section: section
        });
    } catch (err) {
        res.status(500);
        res.send('Could not add option');
        next(err);
    }
}

async function updateOptionJump(req, res, next) {
    try {
        const section = await FormGen.updateOptionJump(req.params.sectionID, req.params.questionRef, req.params.choiceRef, req.body.jump);
        res.json({
            section: section
        });
    } catch (err) {
        res.status(500);
        res.send('Could not update option jump');
        next(err);
    }
}

async function deleteOption(req, res, next) {
    try {
        const section = await FormGen.deleteOption(req.params.sectionID, req.params.questionRef, req.params.choiceRef);
        res.json({
            section: section
        });
    } catch (err) {
        res.status(500);
        res.send('Could not delete option');
        next(err);
    }
}

async function updateRequired(req, res, next) {
    try {
        const section = await FormGen.updateRequired(req.params.sectionID, req.params.questionRef, req.body.required);
        res.json({
            section: section
        });
    } catch (err) {
        res.status(500);
        res.send('Could not update required');
        next(err);
    }
}

async function deleteDescription(req, res, next) {
    try {
        const section = await FormGen.deleteDescription(req.params.sectionID, req.params.questionRef);
        res.json({
            section: section
        });
    } catch (err) {
        res.status(500);
        res.send('Could not delete description');
        next(err);
    }
}

async function updateAllowMultiple(req, res, next) {
    try {
        const section = await FormGen.updateAllowMultiple(req.params.sectionID, req.params.questionRef, req.body.allowMultiple);
        res.json({
            section: section
        });
    } catch (err) {
        res.status(500);
        res.send('Could not update allow multiple');
        next(err);
    }
}

async function updateAllowOther(req, res, next) {
    try {
        const section = await FormGen.updateAllowOther(req.params.sectionID, req.params.questionRef, req.body.allowOther);
        res.json({
            section: section
        });
    } catch (err) {
        res.status(500);
        res.send('Could not update allow other');
        next(err);
    }
}

async function updateDescription(req, res, next) {
    try {
        const section = await FormGen.updateDescription(req.params.sectionID, req.params.questionRef, req.body.description);
        res.json({
            section: section
        });
    } catch (err) {
        res.status(500);
        res.send('Could not update description');
        next(err);
    }
}

module.exports = router
