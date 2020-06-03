var _ = require('underscore');
var fs = require('fs');
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
        console.log('*************************')
        console.log(orgs[i].organisation_id);
        if (orgs[i].role == 'admin') {
            orgForms = await getOrgForms(orgs[i].organisation_id);
            for (let j = 0; j < orgForms.length; j++) {
                orgForms[j].role = 'admin';
            }
        } else {
            orgForms = await getUserOrgForms(userID, orgs[i].organisation_id);
        }
        console.log(orgForms)
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
    console.log("getMyForms", uid)
    db.query(`SELECT form_json, subforms.slug AS slug, user_role, published FROM subforms left join userforms on userforms.form_id=subforms.id WHERE user_id=${uid}`, (error, results) => {
        if (error) {
            res.json(error);
        }
        console.log('ROWROW', results.rows);
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

exports.getTypeformJson = function (res) {
    typeform.getForm('ysuMcf', res);
}

exports.getFormJSON = function (slug, res) {
    db.query(`SELECT form_json FROM subforms WHERE slug='${ slug }'`, (error, results) => {
        if (error) {
            throw error;
        }
        const form = results.rows[0].form_json;
        const ret = rearrangeFormJson(form);
        console.log(ret)
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

function rearrangeFormJson(formJson) {
    let formLogic = formJson.logic;
    let ret = formJson.fields;
    let questionLogic = [];
    for (let i = 0; i < ret.length; i++) {
        questionLogic = getQuestionLogic(formLogic, ret[i].ref);
        ret[i].logic = questionLogic ? questionLogic : [];
    }
    return ret;
}

function getQuestionLogic(formLogic, questionRef) {
    if(!formLogic) {
      return null
    }
    for (let i = 0; i < formLogic.length; i++) {
        if (formLogic[i].ref == questionRef) {
            let questionLogic = formLogic[i].actions;
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

updateSurvey = function (slug, survey) {
    db.query(`UPDATE subforms SET form_json='${JSON.stringify(survey)}' WHERE slug='${slug}'`, (error, results) => {
        if (error) {
            console.log(error);
            throw error;
        }

        const typeFormResponse = typeform.updateForm(survey.id, survey);        
    });

}