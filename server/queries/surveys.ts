import db from '../db';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
var fs = require('fs');

class Surveys {
    static getAll(req, res) {
        db.query('SELECT * FROM surveys ORDER BY id ASC', (error, results) => {
            if (error) {
                throw error;
            }
            req.json(results.rows);
        });
    }

    static getForm() {
        //Will need to change to interact with database.
        return JSON.parse(fs.readFileSync('branching_test.json', 'utf8'));
    }

    static getFormLogic() {
        let form = Surveys.getForm();
        return form.logic;
    }

    static getQuestionLogic(questionRef) {
        let formLogic = Surveys.getFormLogic();
        for (let i = 0; i < formLogic.length; i++) {
            if (formLogic[i].ref === questionRef) {
                return formLogic[i];
            }
        }
        return null;
    }

    static getFormFields() {
        let form = Surveys.getForm();
        return form.fields;
    }

    static getBranches(req, res) {
        res.send(Surveys.);
    }

    static getPage(questionRef) {
        //Returns an array of all the question references up to a conditional branch, starting from the given question.
        let ret = [ questionRef ];
        let currentQuestion = Surveys.getNextQuestion(questionRef);
        while (currentQuestion) {
            ret.push(currentQuestion);
            currentQuestion = Surveys.getNextQuestion(currentQuestion);
        }
        return ret;
    }

    static getNextQuestion(questionRef) {
        //Returns null if the given question branches.
        //Otherwise returns the following question.
        return Surveys.hasLogic(questionRef) ?
            Surveys.getConstantJump(questionRef) : Surveys.getQuestionAfter(questionRef);
    }

    static hasLogic(questionRef) {
        //Returns true if the given question has associated logic in the form definition.
        //Returns false otherwise
        let formLogic = Surveys.getFormLogic();
        for (let i = 0; i < formLogic.length; i++) {
            if (formLogic[i].ref === questionRef) {
                return true;
            }
        }
        return false;
    }

    static getConstantJump(questionRef) {
        //Should only run if the given question has associated logic in the question definition.
        //Should otherwise throw an error.
        //Returns null if the given question's logic doesn't have 'always' condition (constant jump).
        //Otherwise returns the next question according to the 'always' condition.
        let questionLogic = Surveys.getQuestionLogic(questionRef);
        let action = questionLogic.actions[0];
        if (action.condition.op === 'always') {
            return action.details.to.value;
        }
        return null;
    }

    static getQuestionAfter(questionRef) {
        //Should only run if the given question has no associated logic
        //Returns null if the given question is the final question in the form.
        //Otherwise returns the following question in the survey.
        let fields = Surveys.getFormFields();
        for (let i = 0; i < fields.length; i++) {
            if (i == fields.length - 1) {
                //Already at last question
                return null;
            } else {
                if (fields[i].ref === questionRef) {
                    return fields[i + 1].ref;
                }
            }
        }
        //TODO: Throw error
        return null
    }

}

export default Surveys;
