var _ = require('underscore');
var fs = require('file-system');
const typeform = require('../interfaces/typeform.js')

const surveyUtils = require('../utils/survey.js')

const db = require('../db.ts')

// TODO - NTH change word survey to form

function extractTestSurvey(survey) {
    return _.each(survey.fields, function (item) {
        var tmpItem = item;

        tmpItem.field_title = "" + item.id + "_" + item.title;

        if (item.hasOwnProperty("properties")) {
            tmpItem.properties.choices = _.each(item.properties.choices, function (choice) {
                var tmpChoice = choice;
                tmpChoice.field_label = "" + item.id + "_" + choice.label;
                return tmpChoice;
            })
        }
        return tmpItem
    })
}

exports.getUserForms = async function(userID) {
    let orgs = await db.query(`SELECT organisation, role FROM userorgs WHERE user='${userID}'`)
    orgs = orgs.rows;
    let forms = [];
    let orgForms = [];
    let role = '';
    for (let i = 0; i < orgs.length; i++) {
        if (orgs[i].role == 'admin') {
            orgForms = await getOrgForms(orgs[i].organisation);
            for (let j = 0; j < orgForms.length; j++) {
                orgForms[j].role = 'admin';
            }
        } else {
            orgForms = await getUserOrgForms(userID, orgs[i].organisation);
        }
        forms = forms.concat(orgForms);
    }
    for (let k = 0; k < forms.length; k++) {
        //TODO: Sort 'cannot read property title of undefined' error
        forms[k].title = forms[k].form_json.title;
        delete forms.form_json;
    }
    return forms;
}

async function getOrgForms(organisationID) {
    let orgs = await db.query(`SELECT forms.slug, title, published, organisations.name AS organisation FROM forms JOIN organisations ON organisations.id=forms.organisation WHERE organisations.id='${organisationID}'`)
    orgs = orgs.rows;
    return orgs
}

async function getUserOrgForms(userID, organisationID) {
    let orgs = await db.query(`SELECT forms.slug, title, published, organisations.name AS organisation, userforms.user_role AS role FROM forms JOIN organisations ON organisations.id=forms.organisation JOIN userforms ON userforms.form=forms.id WHERE organisations.id='${organisationID}' AND userforms.user='${userID}'`)
    orgs = orgs.rows;
    return orgs;
}

//TODO: Remove if not used
exports.getMyForms = function (uid, res) {
    db.query(`SELECT form_json, subforms.slug AS slug, user_role, published FROM subforms left join userforms on userforms.form_id=subforms.id WHERE user=${uid}`, (error, results) => {
        if (error) {
            res.json(error);
        }
        res.json(_.map(results.rows, function (res) {
            return {
                title: res.form_json.title,
                slug: res.slug,
                userRole: res.user_role,
                published: res.published
            }
        }))
    });
}

//TODO: Delete if not needed
exports.getSurveyJSON = function (id, res) {
    db.query(`SELECT form_json FROM subforms WHERE typeform_id='${id}'`, (error, results) => {
        if (error) {
            res.json(error);
        }
        res.json(extractTestSurvey(results.rows[0].form_json));
    });
}


exports.getEditFormJSON = async function(slug) {
    try {
        const results = await db.query(`SELECT test_json FROM formsections JOIN forms ON forms.id=formsections.form WHERE forms.slug='${slug}'`);
        const formDefinitions = results.rows;
        let ret = [];
        for (let i = 0; i < formDefinitions.length; i++) {
            ret.push(generateEditJSON(formDefinitions[i].test_json))
        }
        return ret;
    } catch (err) {
        console.error(err);
    }
}

exports.getTypeformJson = function (res) {
    typeform.getForm('vEz4p9wG', res);
}

//TODO: Delete if not needed
exports.getFormJSON = function (slug, res) {
    db.query(`SELECT form_json FROM subforms WHERE slug='${ slug }'`, (error, results) => {
        if (error) {
            throw error;
        }
        const form = results.rows[0].form_json;
        const ret = rearrangeFormJson(form);
        res.json(ret);
    });
}

//TODO: Delete if not needed
exports.getTestFormJSON = function (slug, res) {
    db.query(`SELECT test_form_json FROM subforms WHERE slug='${ slug }'`, (error, results) => {
        if (error) {
            throw error;
        }
        const form = results.rows[0].test_form_json;
        const ret = rearrangeFormJson(form);
        res.json(ret);
    });
}

exports.getJSONFromSlug = async function (slug) {
    try {
        //TODO: Update so it works for multiple sections
        const results = await db.query(`SELECT test_json FROM formsections JOIN forms ON forms.id=formsections.form WHERE forms.slug='${slug}'`);
        return results.rows[0].test_json;
    } catch (err) {
        console.error(err);
    }
}

function rearrangeFormJSON(formJSON) {
    let formLogic = formJSON.logic;
    let ret = formJSON.fields;
    let questionLogic = [];
    for (let i = 0; i < ret.length; i++) {
        questionLogic = extractQuestionLogic(formLogic, ret[i].ref);
        ret[i].logic = questionLogic ? questionLogic : [];
    }
    return ret;
}


function getQuestionJump(formLogic, questionRef) {
    for (let i = 0; i < formLogic.length; i++) {
        if (formLogic[i].ref == questionRef) {
            let actions = formLogic[i].actions;
            for (let j = 0; j < actions.length; j++) {
                if (actions[j].condition.op == 'always') {
                    return actions[j].details.to.value;
                }
            }
        }
    }
    return null;
}

function getJumpOptions(fields, questionRef) {
    let passedRef = false;
    let jumpOptions = [];
    for (let i = 0; i < fields.length; i++) {
        if (passedRef) {
            jumpOptions.push(fields[i].ref);
        } else if (fields[i].ref == questionRef) {
            passedRef = true;
        }   
    }
    return jumpOptions;
}

function getQuestionLogic(typeformJSON, questionRef) {
    let logic = typeformJSON.logic;
    if (logic) {
        for (let i = 0; i < logic.length; i++) {
            if (logic[i].ref == questionRef) {
                return logic[i].actions;
            }
        }
    }   
    return [];
}

function getChoiceJump(questionLogic, choice) {
    if (questionLogic) {
        for (let i = 0; i < questionLogic.length; i++) {
            if (questionLogic[i].condition.op == 'equal') {
                const logicValue = questionLogic[i].condition.vars[1].value;
                const choiceValue = choice.label;
                if (logicValue == choiceValue) {
                    return questionLogic[i].details.to.value;
                }
            } else if (questionLogic[i].condition.op == 'is') {
                const logicValue = questionLogic[i].condition.vars[1].value;
                const choiceValue = choice.ref;
                if (logicValue == choiceValue) {
                    return questionLogic[i].details.to.value;
                }
            }
        }
    }
    return null;
}

function getQuestionChoices(typeformJSON, questionRef) {
    let questionLogic = getQuestionLogic(typeformJSON, questionRef);
    let fields = typeformJSON.fields;
    let allJumps = [];
    for (let i = 0; i < fields.length; i++) {
        if (fields[i].ref == questionRef) {
            if (fields[i].properties && fields[i].properties.choices) {
                let choices = fields[i].properties.choices;
                for (let j = 0; j < choices.length; j++) {
                    choices[j].jump = getChoiceJump(questionLogic, choices[j])
                    if (choices[j].jump) {
                        allJumps.push(choices[j].jump);
                    }
                }
                return {
                    choices: choices,
                    jumps: allJumps
                };
            }
        }
    }
    return {
        choices: null,
        jumps: []
    };
}

function generateEditJSON(typeformJSON) {
    //TODO: Handle all section types
    let formLogic = typeformJSON.logic;
    let fields = typeformJSON.fields;
    let question = {};
    let editJSON = [];
    let choices = {};
    for (let i = 0; i < fields.length; i++) {
        question = {};
        question.ref = fields[i].ref;
        question.title = fields[i].title;
        question.type = fields[i].type;
        question.jump = formLogic ? getQuestionJump(formLogic, fields[i].ref) : null;
        question.jumpOptions = getJumpOptions(fields, fields[i].ref);
        choices = getQuestionChoices(typeformJSON, fields[i].ref);
        question.choices = choices.choices;
        if (question.jump) {
            choices.jumps.push(question.jump);
        }
        question.jumps = [...new Set(choices.jumps)]
        editJSON.push(question);
    }
    return editJSON;
}

function extractQuestionLogic(formLogic, questionRef) {
    if(!formLogic) {
        return null
    }
    for (let i = 0; i < formLogic.length; i++) {
        if (formLogic[i].ref == questionRef) {
            return formLogic[i].actions;
        }
    }
    return null;
}

//TODO: Delete if not needed
function editSurvey(req, res, updateFunction) {
    const slug = req.query.surveyID

    db.query(`SELECT form_json FROM subforms WHERE slug='${slug}'`, (error, results) => {
        if (error) {
            throw error;
        }
        var query = req.query;
        const survey = results.rows[0].form_json;
        updatedSurvey = updateFunction(survey, query);
        updateSurvey(slug, updatedSurvey);
        query.survey = updatedSurvey;
        res.status(200).json(query);
    });
}

//TODO: Delete if not needed
exports.updateField = function (req, res) {
    editSurvey(req, res, surveyUtils.updateField);
}

//TODO: Delete if not needed
exports.updateSurveyChoice = function (req, res) {
    editSurvey(req, res, surveyUtils.updateChoice);
}

//TODO: Delete if not needed
exports.updateDropdownChoice = function (req, res) {
    editSurvey(req, res, surveyUtils.updateDropdownChoice);
}

exports.getFormFromSlug = function (slug, res) {
    //TODO: Make work for multiple sections
    db.query(`SELECT forms.title AS name, typeforms.test_typeform_id AS id FROM forms JOIN formsections ON formsections.id=forms.first_section JOIN typeforms ON typeforms.form_section=formsections.id WHERE forms.slug='${ slug }'`, (error, results) => {
        if (error) {
            throw error;
        }
        const form = results.rows[0];
        res.json({
            name: form.name,
            id: form.id
        });
    });
}

exports.updateJSON = async function(slug, form) {
    //TODO: Make work for multiple sections
    try {
        //TODO: Remove cyclic keys in db
        //TODO: Add FormSectionLogic table with forms foreign key and array of formsections (in json with other logic)
        //TODO: Remove other logic fields
        await db.query(`UPDATE formsections SET test_json='${JSON.stringify(form)}' JOIN forms ON forms.first_section=formsections.id WHERE forms.slug='${slug}'`);
        const retForm = generateEditJSON(form);
        return retForm;
    } catch (err) {
        console.error(err);
    }
}

//TODO: Delete if not needed
updateSurvey = function (slug, survey) {
    db.query(`UPDATE subforms SET form_json='${JSON.stringify(survey)}' WHERE slug='${slug}'`, (error, results) => {
        if (error) {
            throw error;
        }

        const typeFormResponse = typeform.updateForm(survey.id, survey);        
    });

}

exports.insertForm = async function (form, callback) {
    try {
        let query = 'INSERT INTO forms(organisation, title, description, slug, web) VALUES($1, $2, $3, $4, $5) RETURNING id'
        let values = [form.org, form.title, form.description, form.slug, form.web];
        let results = await db.query(query, values);
        const formID = results.rows[0].id;
        //TODO: Add on completes
        //TODO: Make type dynamic
        query = 'INSERT INTO formsections (form, type, json, test_json) VALUES ($1, $2, $3, $4) RETURNING id';
        values = [formID, 'typeform', JSON.stringify(form.json), JSON.stringify(form.json)];
        results = await db.query(query, values);
        const sectionID = results.rows[0].id;
        await db.query(`UPDATE forms SET first_section=${sectionID} WHERE id=${formID}`);
        return sectionID;
    } catch (err) {
        //TODO: Handle errors properly
        console.log(err)
    }
}

exports.insertTypeform = async function (sectionID, typeformID, testTypeformID) {
    //TODO: Handle errors
    let query = 'INSERT INTO typeforms(form_section, typeform_id, test_typeform_id) VALUES ($1, $2, $3)';
    let values = [sectionID, typeformID, testTypeformID];
    await db.query(query, values);
}