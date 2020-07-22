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
    let orgs = await db.query(`SELECT organisation_id, role FROM userorgs WHERE user_id='${userID}'`)
    orgs = orgs.rows;
    let forms = [];
    let orgForms = [];
    let role = '';
    for (let i = 0; i < orgs.length; i++) {
        if (orgs[i].role == 'admin') {
            orgForms = await getOrgForms(orgs[i].organisation_id);
            for (let j = 0; j < orgForms.length; j++) {
                orgForms[j].role = 'admin';
            }
        } else {
            orgForms = await getUserOrgForms(userID, orgs[i].organisation_id);
        }
        forms = forms.concat(orgForms);
    }
    for (let k = 0; k < forms.length; k++) {
        forms[k].title = forms[k].form_json.title;
        delete forms.form_json;
    }
    return forms;
}

async function getOrgForms(organisationID) {
    let orgs = await db.query(`SELECT slug, form_json, published, organisations.name AS organisation FROM subforms JOIN organisations ON organisations.id=subforms.organisation_id WHERE organisations.id='${organisationID}'`)
    orgs = orgs.rows;
    return orgs
}

async function getUserOrgForms(userID, organisationID) {
    let orgs = await db.query(`SELECT slug, form_json, published, organisations.name AS organisation, userforms.user_role AS role FROM subforms JOIN organisations ON organisations.id=subforms.organisation_id JOIN userforms ON userforms.form_id=subforms.id WHERE organisations.id='${organisationID}' AND userforms.user_id='${userID}'`)
    orgs = orgs.rows;
    return orgs;
}

exports.getMyForms = function (uid, res) {
    db.query(`SELECT form_json, subforms.slug AS slug, user_role, published FROM subforms left join userforms on userforms.form_id=subforms.id WHERE user_id=${uid}`, (error, results) => {
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
        const results = await db.query(`SELECT form_json FROM subforms WHERE slug='${slug}'`);
        const form = generateEditJSON(results.rows[0].form_json);
        return form;
    } catch (err) {
        console.error(err);
    }
}

exports.getTypeformJson = function (res) {
    typeform.getForm('vEz4p9wG', res);
}

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
        const results = await db.query(`SELECT form_json FROM subforms WHERE slug='${slug}'`);
        return results.rows[0].form_json;
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

exports.updateField = function (req, res) {
    editSurvey(req, res, surveyUtils.updateField);
}

exports.updateSurveyChoice = function (req, res) {
    editSurvey(req, res, surveyUtils.updateChoice);
}

exports.updateDropdownChoice = function (req, res) {
    editSurvey(req, res, surveyUtils.updateDropdownChoice);
}

exports.getFormFromSlug = function (slug, res) {
    db.query(`SELECT typeform_id, form_json FROM subforms WHERE slug='${ slug }'`, (error, results) => {
        if (error) {
            throw error;
        }
        const form = results.rows[0];
        res.json({
            name: form.form_json.title,
            id: form.typeform_id
        });
    });
}

exports.updateJSON = async function(slug, form) {
    try {
        await db.query(`UPDATE subforms SET form_json='${JSON.stringify(form)}' WHERE slug='${slug}'`);
        const retForm = generateEditJSON(form);
        return retForm;
    } catch (err) {
        console.error(err);
    }
}

updateSurvey = function (slug, survey) {
    db.query(`UPDATE subforms SET form_json='${JSON.stringify(survey)}' WHERE slug='${slug}'`, (error, results) => {
        if (error) {
            console.log(error);
            throw error;
        }

        const typeFormResponse = typeform.updateForm(survey.id, survey);        
    });

}