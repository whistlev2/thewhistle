// import db from '../db';

// const db = require('../db.ts')
const surveyUtils = require('../surveyUtils.js')

const Pool = require('pg').Pool;
const db = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'thewhistle',
    password: 'postgres',
    port: 5432
});


exports.getSurveyJSON = function (id) {
  db.query(`SELECT form_json FROM subforms WHERE typeform_id='${id}'`, (error, results) => {
      if (error) {
          throw error;
      }
      return results.rows[0].form_json;
  });
}

exports.getSurvey = function (req, res) {
  const id = req.query.surveyID
  db.query(`SELECT form_json FROM subforms WHERE typeform_id='${id}'`, (error, results) => {
      if (error) {
          throw error;
      }
      var query = req.query;
      const survey = results.rows[0].form_json;
      updatedSurvey = surveyUtils.updateField(survey, query);
      updateSurvey(id, updatedSurvey);
      query.survey = updatedSurvey;
      res.status(200).json(query);
  });
}

updateSurvey = function (id, survey) {
  const ns = JSON.stringify(survey)
  db.query(`UPDATE subforms SET form_json='${ns}' WHERE typeform_id='${id}'`, (error, results) => {
      if (error) {
          console.log(error);
          throw error;
      }
      console.log(results)
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
