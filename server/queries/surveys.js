var _ = require('underscore');
var fs = require('fs');
const typeform = require('../interfaces/typeform.js')

const surveyUtils = require('../surveyUtils.js')

const Pool = require('pg').Pool;
const db = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'thewhistle',
    password: 'postgres',
    port: 5432
});

//TODO: Import DB instead


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

exports.getMyForms = function(uid, res) {
  db.query(`SELECT subforms.slug AS slug, organisations.slug AS organisation, user_role FROM subforms join userforms on userforms.user_id=subforms.id join organisations on subforms.organisation_id=organisations.id WHERE user_id=${uid}`, (error, results) => {
      if (error) {
          res.json(error);
      }
      res.json(results.rows);
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

exports.getFormJSON = function (id, res) {
    fs.readFile('branching_test.json', {
        encoding: 'utf-8'
    }, function (err, data) {
        const formJson = JSON.parse(data);
        const ret = rearrangeFormJson(formJson);
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
    for (let i = 0; i < formLogic.length; i++) {
        if (formLogic[i].ref == questionRef) {
            return formLogic[i].actions;
        }
    }
    return null;
}

function editSurvey(req, res, updateFunction) {
    const id = req.query.surveyID
    db.query(`SELECT form_json FROM subforms WHERE typeform_id='${id}'`, (error, results) => {
        if (error) {
            throw error;
        }
        var query = req.query;
        const survey = results.rows[0].form_json;
        updatedSurvey = updateFunction(survey, query);
        updateSurvey(id, updatedSurvey);
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



updateSurvey = function (id, survey) {
    const ns = JSON.stringify(survey)
    db.query(`UPDATE subforms SET form_json='${ns}' WHERE typeform_id='${id}'`, (error, results) => {
        if (error) {
            console.log(error);
            throw error;
        }
        // console.log(results)
        typeform.updateForm(id, ns);
    });

}


// class Surveys {
//     static getAll(req, res) {
//         db.query('SELECT * FROM surveys ORDER BY id ASC', (error, results) => {
//             if (error) {
//                 throw error;
//             }
//             req.json(results.rows);
//         });
//     }

// static getSurvey(surveyID) {
//   return "BOB"
// }
// }
