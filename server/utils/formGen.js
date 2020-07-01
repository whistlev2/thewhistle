const Subforms = require('../queries/subforms.js');
const Surveys = require('../queries/surveys.js');
const Typeform = require('../interfaces/typeform.js');

/* exports.updateOptionJump = async function(slug, question, choice, jumpQuestion, res) {
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
} */

async function updateForm(slug, form) {
    let retForm = await Surveys.updateJSON(slug, form);
    Typeform.updateForm(form.id, form);
    return retForm;
}

function changeQuestionRefs(actions, oldQuestionRef, newQuestionRef) {
    for (let i = 0; i < actions.length; i++) {
        if (actions[i].details.to.value == oldQuestionRef) {
            actions[i].details.to.value = newQuestionRef
        }
    }
    return actions;
}

function changeAllQuestionRefs(formLogic, oldQuestionRef, newQuestionRef) {
    for (let i = 0; i < formLogic.length; i++) {
        formLogic[i].actions = changeQuestionRefs(formLogic[i].actions, oldQuestionRef, newQuestionRef);
    }
    return formLogic;
}

function addQuestionLogic(formLogic, questionRef) {
    let hasLogic = false;
    for (let i = 0; i < formLogic.length; i++) {
        if (formLogic[i].ref == questionRef) {
            hasLogic = true;
            break;
        }
    }
    if (!hasLogic) {
        formLogic.push({
            type: 'field',
            ref: questionRef,
            actions: []
        });
    }
    return formLogic;
}

function generateAlwaysAction(toQuestionRef) {
    return {
        action: 'jump',
        details: {
            to: {
                type: 'field',
                value: toQuestionRef
            }
        },
        condition: {
            op: 'always',
            vars: []
        }
    }
}

function setQuestionJump(formLogic, fromQuestionRef, toQuestionRef) {
    formLogic = addQuestionLogic(formLogic, fromQuestionRef);
    let updatedJump = false;
    for (let i = 0; i < formLogic.length; i++) {
        if (formLogic[i].ref == fromQuestionRef) {
            for (let j = 0; j < formLogic[i].actions.length; j++) {
                if (formLogic[i].actions[j].condition.op == 'always') {
                    formLogic[i].actions[j].details.to.value = toQuestionRef;
                    updatedJump = true;
                    break;
                }
            }
            if (!updatedJump) {
                formLogic[i].actions.push(generateAlwaysAction(toQuestionRef));
            }
        }
        break;
    }
    return formLogic;
}

function addQuestionBeforeLogic(formLogic, oldQuestionRef, newQuestionRef) {
    formLogic = changeAllQuestionRefs(formLogic, oldQuestionRef, newQuestionRef);
    formLogic = setQuestionJump(formLogic, newQuestionRef, oldQuestionRef);
    return formLogic;
}

function generateShortTextField(question) {
    return {
        ref: question.ref,
        title: question.title,
        validations: {
            required: false
        },
        type: 'short_text'
    }
}

function generateLongTextField(question) {
    return {
        ref: question.ref,
        title: question.title,
        validations: {
            required: false
        },
        type: 'long_text'
    }
}

function generateMultipleChoiceField(question) {
    return {
        ref: question.ref,
        title: question.title,
        validations: {
            required: false
        },
        properties: {
            randomize: false,
            allow_multiple_selection: question.multipleSelection, // eslint-disable-line
            allow_other_choice: false, // eslint-disable-line
            vertical_alignment: true // eslint-disable-line
        },
        choices: [],
        type: 'multiple_choice'
    }
}

function generateDropdownField(question) {
    return {
        ref: question.ref,
        title: question.title,
        validations: {
            required: false
        },
        properties: {
            alphabetical_order: false, // eslint-disable-line
            choices: []
        },
        type: 'dropdown'
    }
}

function generateDateField(question) {
    return {
        ref: question.ref,
        title: question.title,
        validations: {
            required: false
        },
        properties: {
            structure: 'MMDDYYYY',
            separator: '/' 
        },
        type: 'date'
    }
}

function generateFileField(question) {
    return {
        ref: question.ref,
        title: question.title,
        validations: {
            required: false
        },
        type: 'file_upload'
    }
}

function formatQuestion(question) {
    switch (question.type) {
        case 'Short text':
            return generateShortTextField(question);
        case 'Long text':
            return generateLongTextField(question);
        case 'Multiple choice':
            return generateMultipleChoiceField(question);
        case 'Dropdown':
            return generateDropdownField(question);
        case 'Date':
            return generateDateField(question);
        case 'File upload':
            return generateFileField(question);
    }
}

function getQuestionPosition(formFields, questionRef) {
    for (let i = 0; i < formFields.length; i++) {
        if (formFields[i].ref == questionRef) {
            return i;
        }
    }
    return null;
}

function addQuestionAfterLogic(formLogic, oldQuestionRef, newQuestionRef) {
    //Change question jump to new question
    //Set new question's jump to jump of old question
    formLogic = addQuestionLogic(formLogic, oldQuestionRef);

    let hasQuestionJump = false;

    for (let i = 0; i < formLogic.length; i++) {
        if (formLogic[i].ref == oldQuestionRef) {
            for (let j = 0; j < formLogic[i].actions.length; j++) {
                if (formLogic[i].actions[j].condition.op == 'always') {
                    hasQuestionJump = true;

                    formLogic.push({
                        type: 'field',
                        ref: newQuestionRef,
                        actions: [
                            generateAlwaysAction(formLogic[i].actions[j].details.to.value)
                        ]
                    });

                    formLogic[i].actions[j].details.to.value = newQuestionRef;

                    break;
                }
            }
            
            if (!hasQuestionJump) {
                formLogic[i].actions.push(generateAlwaysAction(newQuestionRef));
            }
            break;
        }
    }
    return formLogic;
}

function insertQuestion(formFields, question, index) {
    formFields.splice(index, 0, question)
    return formFields;
}

exports.updateQuestionTitle = async function(slug, questionRef, questionTitle) {
    let form = await Surveys.getJSONFromSlug(slug);
    //TODO: Handle case that the question doesn't exist
    for (let i = 0; i < form.fields.length; i++) {
        if (form.fields[i].ref == questionRef) {
            form.fields[i].title = questionTitle;
            break;
        }
    }
    let retForm = await updateForm(slug, form);
    return retForm;
}

exports.addQuestionBefore = async function(slug, adjacentQuestionRef, question) {
    let form = await Surveys.getJSONFromSlug(slug);

    //TODO: Check question ref doesn't already exist

    if (!form.logic) {
        form.logic = [];
    }

    form.logic = addQuestionBeforeLogic(form.logic, adjacentQuestionRef, question.ref);

    let formattedQuestion = formatQuestion(question);
    let index = getQuestionPosition(form.fields, adjacentQuestionRef);
    form.fields = insertQuestion(form.fields, formattedQuestion, index);

    let retForm = await updateForm(slug, form);
    return retForm;
}

exports.addQuestionAfter = async function(slug, adjacentQuestionRef, question) {
    let form = await Surveys.getJSONFromSlug(slug);

    //TODO: Check question ref doesn't already exist

    if (!form.logic) {
        form.logic = [];
    }

    form.logic = addQuestionAfterLogic(form.logic, adjacentQuestionRef, question.ref);
    let formattedQuestion = formatQuestion(question);
    let index = getQuestionPosition(form.fields, adjacentQuestionRef) + 1;
    form.fields = insertQuestion(form.fields, formattedQuestion, index);
    let retForm = await updateForm(slug, form);
    return retForm;
}

exports.deleteQuestion = async function (slug, questionRef) {

}

exports.updateQuestionJump = async function (slug, questionRef, jump) {

}

exports.addOption = async function (slug, questionRef, option) {

}

exports.updateOptionLabel = async function (slug, questionRef, optionRef, label) {

}

exports.updateOptionJump = async function (slug, questionRef, optionRef, jump) {

}

exports.deleteOption = async function (slug, questionRef, choiceRef) {

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