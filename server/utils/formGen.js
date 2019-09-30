const Subforms = require('../queries/subforms.js');
const Typeform = require('../interfaces/typeform.js');

exports.updateOptionJump = async function(slug, question, choice, jumpQuestion, res) {
    const testJSON = await Subforms.getTestJSON(slug);
    const testTypeformID = getTypeformID(testJSON);
    const updatedJSON = updateOptionJump(testJSON, question, choice, jumpQuestion);
    Typeform.updateForm(testTypeformID, slug, updatedJSON);
    res.redirect(`/edit-form/${slug}`);
}

exports.updateQuestionJump = async function(slug, question, jumpQuestion, res) {
    const testJSON = await Subforms.getTestJSON(slug);
    const testTypeformID = getTypeformID(testJSON);
    const updatedJSON = updateQuestionJump(testJSON, question, jumpQuestion);
    Typeform.updateForm(testTypeformID, slug, updatedJSON, res);
}

function updateOptionJump(testJSON, question, choice, jumpQuestion) {
    let ret = updatedJSON;
    return ret;
}

function getQuestionLogic(formJSON, question) {
    const logic = formJSON.logic;
    for (let i = 0; i < logic.length; i++) {
        if (logic[i].ref == question) {
            return logic[i];
        }
    }
    return null;
}

function updateQuestionJump(formJSON, question, jumpQuestion) {
    for (let i = 0; i < formJSON.logic.length; i++) {
        if (formJSON.logic[i].ref == question) {
            for (let j = 0; j < formJSON.logic[i].actions.length; j++) {
                if (formJSON.logic[i].actions[j].condition.op == 'always') {
                    formJSON.logic[i].actions[j].details.to.value = jumpQuestion;
                    return formJSON;
                }
            }
        }
    }
    return formJSON;
}

function getTypeformID(formJSON) {
    return formJSON.id;
}