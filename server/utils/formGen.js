const Forms = require('../queries/forms.js');
const FormSections = require('../queries/formsections.js');
const Typeform = require('../interfaces/typeform.js');


async function updateSection(sectionID, section, type) {
    if (type == 'Questions') {
        await Typeform.updateForm(section.id, section); //Note: Here, section.id is typeformID
    }
    let retSection = await Forms.updateJSON(sectionID, section);
    return retSection;
}

function generateJumpTo(jump) {
    return jump == 'End of form' || jump == 'default_tys' ? {type: 'thankyou', value: 'default_tys'} : {type: 'field', value: jump};
}

function changeQuestionRefs(actions, oldQuestionRef, newQuestionRef) {
    for (let i = 0; i < actions.length; i++) {
        if (actions[i].details.to.value == oldQuestionRef) {
            actions[i].details.to = generateJumpTo(newQuestionRef);
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

function generateQuestionLogic(questionRef) {
    return {
        type: 'field',
        ref: questionRef,
        actions: []
    };
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
        formLogic.push(generateQuestionLogic(questionRef));
    }
    return formLogic;
}

function generateAlwaysAction(toQuestionRef) {
    let to = generateJumpTo(toQuestionRef);
    return {
        action: 'jump',
        details: {
            to: to
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
                    formLogic[i].actions[j].details.to = generateJumpTo(toQuestionRef);
                    updatedJump = true;
                    break;
                }
            }
            if (!updatedJump) {
                let action = generateAlwaysAction(toQuestionRef);
                formLogic[i].actions.push(action);
            }
            break;
        } 
    }
    return formLogic;
}

function addQuestionBeforeLogic(formLogic, oldQuestionRef, newQuestionRef) {
    formLogic = changeAllQuestionRefs(formLogic, oldQuestionRef, newQuestionRef);
    formLogic = setQuestionJump(formLogic, newQuestionRef, oldQuestionRef);
    return formLogic;
}

function generateStatement(question) {
    return {
        ref: question.ref,
        title: question.title,
        properties: {
            button_text: "Continue",
            hide_marks: false
        },
        type: "statement"
    }
}

function generateAgreement(question) {
    return {
        ref: question.ref,
        title: question.title,
        properties: {},
        validations: {
            "required": false
        },
        type: "legal"
    }
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

function generateNewChoice(choice) {
    return {
        ref: choice.ref,
        label: choice.text
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
            allow_multiple_selection: question.multipleSelection, // eslint-disable-line
            allow_other_choice: false, // eslint-disable-line
            choices: [
                generateNewChoice({
                    ref: question.optionRef,
                    text: question.optionText
                })
            ]
        },
        type: 'multiple_choice'
    }
}

/* function generateDropdownField(question) {
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
} */

function generateDateField(question) {
    return {
        ref: question.ref,
        title: question.title,
        validations: {
            required: false
        },
        properties: {
            structure: 'DDMMYYYY',
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
        case 'Statement':
            return generateStatement(question);
        case 'Agreement':
            return generateAgreement(question);
        case 'Short text':
            return generateShortTextField(question);
        case 'Long text':
            return generateLongTextField(question);
        case 'Multiple choice':
            return generateMultipleChoiceField(question);
        /* case 'Dropdown':
            return generateDropdownField(question); */
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

                    formLogic[i].actions[j].details.to = generateJumpTo(newQuestionRef);

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

function deleteQuestionFromFields(formFields, questionRef) {
    for (let i = 0; i < formFields.length; i++) {
        if (formFields[i].ref == questionRef) {
            formFields.splice(i, 1);
            break;
        }
    }

    return formFields;
}

function deleteQuestionFromActions(actions, questionRef, questionJump) {
    for (let i = actions.length - 1; i >= 0; i--) {
        if (actions[i].details.to.value == questionRef) {
            if (questionJump) {
                actions[i].details.to = generateJumpTo(questionJump);
            } else {
                actions.splice(i, 1);
            }
        }
    }

    return actions;
}

function getAlwaysJump(questionActions) {
    for (let i = 0; i < questionActions.length; i++) {
        if (questionActions[i].action == 'jump' && questionActions[i].condition.op == 'always') {
            return questionActions[i].details.to.value;
        }
    }
}

function deleteQuestionFromLogic(formLogic, questionRef) {
    let questionJump = null;
    for (let i = formLogic.length - 1; i >= 0; i--) {
        if (formLogic[i].ref == questionRef) {
            questionJump = getAlwaysJump(formLogic[i].actions);
            formLogic.splice(i, 1);
        }
    }
    for (let i = formLogic.length - 1; i >= 0; i--) {
        formLogic[i].actions = deleteQuestionFromActions(formLogic[i].actions, questionRef, questionJump);
        if (formLogic[i].actions.length == 0) {
            formLogic.splice(i, 1);
        }
    }

    return formLogic;
}

function generateIsAction(questionRef, optionRef, jump) {
    return {
        action: 'jump',
        details: {
            to: {
                type: 'field',
                value: jump
            }
        },
        condition: {
            op: 'is',
            vars: [
                {
                    type: 'field',
                    value: questionRef
                },
                {
                    type: 'choice',
                    value: optionRef
                }
            ]
        }
    }
}

function generateNewSMSFormJSON(title) {
    return {
        title: title,
        fields: [],
        logic: []
    }
}

function generateReporterSection(title) {
    return {
        title: title
    };
}

function generateEmailVerificationSection(title) {
    return {
        title: title,
        allowedEndings: []
    };
}

function generateNewTypeformJSON(title) {
    /* eslint-disable */
    return {
        title: title,
        workspace: {
            href: "https://api.typeform.com/workspaces/iY5G9Y"
        },
        settings: {
            language: "en",
            progress_bar: "percentage",
            meta: {
                allow_indexing: false
            },
            is_public: true,
            show_progress_bar: true,
            show_typeform_branding: true,
        },
        hidden: [
            "session"
        ],
        fields: [],
        logic: [],
        thankyou_screens: [
            {
                ref: "default_tys",
                title: "Thank you. Your report has been submitted.",
                properties: {
                    show_button: false,
                    share_icons: false
                }
            }
        ]
    }
    /* eslint-enable */
}

async function generateInitialSectionJSON(type, title) {
    let form = {};
    let actualJSON = {};
    let testJSON = {};
    switch (type) {
        case 'Questions':
            form = generateNewTypeformJSON(title);
            actualJSON = await Typeform.createForm(form);
            testJSON = await Typeform.createForm(form);
            break;
        case 'Reporter Number':
            actualJSON = generateReporterSection(title);
            testJSON = actualJSON;
            break;
        case 'Email Verification':
            actualJSON = generateEmailVerificationSection(title);
            testJSON = actualJSON;
            break;
        default:
            //TODO: Throw error
    }
    return {
        actual: actualJSON,
        test: testJSON
    };
}


exports.createForm = async function (slug, title, description, org, web) {
    try {
        let formJSON = web ? generateNewTypeformJSON(title) : generateNewSMSFormJSON(title);
        //TODO: Make type dynamic
        let form = {
            json: formJSON,
            slug: slug,
            title: title,
            description: description,
            org: org,
            web: web
        }
        await Forms.insertForm(form);
    } catch (err) {
        //TODO: Handle errors properly
    }
}

exports.addSection = async function (formSlug, newSection) {
    let json = await generateInitialSectionJSON(newSection.type, newSection.title);
    let formID = await Forms.getFormIDFromSlug(formSlug);
    let sectionID = await FormSections.insertSection(formID, newSection.type, json.actual, json.test, newSection.allReports); //TODO: Implement this
    await Forms.addFormSectionLogicSection(newSection.index, formID, sectionID, newSection.default); //TODO: Implement this
    let retSection = Forms.generateEditJSON(json.test);
    return {
        sectionID: sectionID,
        questions: retSection
    };
}

exports.updateQuestionTitle = async function(sectionID, questionRef, questionTitle) {
    let sectionJSON = await Forms.getSectionJSON(sectionID);
    let section = sectionJSON.form;
    let type = sectionJSON.type;
    //TODO: Handle case that the question doesn't exist
    for (let i = 0; i < form.fields.length; i++) {
        if (section.fields[i].ref == questionRef) {
            section.fields[i].title = questionTitle;
            break;
        }
    }
    let retSection = await updateSection(sectionID, section, type);
    return retSection;
}

exports.addFirstQuestion = async function(sectionID, question) {
    try {
        let sectionJSON = await Forms.getSectionJSON(sectionID);
        let section = sectionJSON.form;
        let type = sectionJSON.type;
        //TODO: Check question ref doesn't already exist
        if (!section.logic) {
            section.logic = [];
        }
        let formattedQuestion = formatQuestion(question);
        section.fields = [ formattedQuestion ];
        let retSection = await updateSection(sectionID, section, type);
        return retSection;
    } catch (err) {
        //Handle properly
    }
}

exports.addQuestionBefore = async function(sectionID, adjacentQuestionRef, question) {
    let sectionJSON = await Forms.getSectionJSON(sectionID);
    let section = sectionJSON.form;
    let type = sectionJSON.type;

    //TODO: Check question ref doesn't already exist

    if (!section.logic) {
        section.logic = [];
    }

    section.logic = addQuestionBeforeLogic(section.logic, adjacentQuestionRef, question.ref);

    let formattedQuestion = formatQuestion(question);
    let index = getQuestionPosition(section.fields, adjacentQuestionRef);
    section.fields = insertQuestion(section.fields, formattedQuestion, index);

    let retSection = await updateSection(sectionID, section, type);
    return retSection;
}

exports.addQuestionAfter = async function(sectionID, adjacentQuestionRef, question) {
    let sectionJSON = await Forms.getSectionJSON(sectionID);
    let section = sectionJSON.form;
    let type = sectionJSON.type;

    //TODO: Check question ref doesn't already exist

    if (!section.logic) {
        section.logic = [];
    }

    section.logic = addQuestionAfterLogic(section.logic, adjacentQuestionRef, question.ref);
    let formattedQuestion = formatQuestion(question);
    let index = getQuestionPosition(section.fields, adjacentQuestionRef) + 1;
    section.fields = insertQuestion(section.fields, formattedQuestion, index);
    let retSection = await updateSection(sectionID, section, type);
    return retSection;
}

exports.deleteQuestion = async function (sectionID, questionRef) {
    let sectionJSON = await Forms.getSectionJSON(sectionID);
    let section = sectionJSON.form;
    let type = sectionJSON.type;

    //TODO: Check if question exists

    section.fields = deleteQuestionFromFields(section.fields, questionRef);

    if (section.logic) {
        section.logic = deleteQuestionFromLogic(section.logic, questionRef);
    }

    let retSection = await updateSection(sectionID, section, type);
    return retSection;
}

exports.updateQuestionJump = async function (sectionID, questionRef, jump) {
    let sectionJSON = await Forms.getSectionJSON(sectionID);
    let section = sectionJSON.form;
    let type = sectionJSON.type;

    //TODO: Check if both questions exist

    if (!section.logic) {
        section.logic = [];
    }

    let updated = false;
    for (let i = 0; i < section.logic.length; i++) {
        if (section.logic[i].ref == questionRef) {
            for (let j = 0; j < section.logic[i].actions.length; j++) {
                if (section.logic[i].actions[j].condition.op == 'always') {
                    section.logic[i].actions[j].details.to = generateJumpTo(jump)
                    updated = true;
                    break;
                }
            }
            if (!updated) {
                section.logic[i].push(generateAlwaysAction(jump));
                updated = true;
            }
            break;
        }
    }

    if (!updated) {
        let questionLogic = generateQuestionLogic(questionRef);
        questionLogic.actions.push(generateAlwaysAction(jump));
        section.logic.push(questionLogic);
        updated = true;
    }

    let retSection = await updateSection(sectionID, section, type);
    return retSection;
}

exports.addOption = async function (sectionID, questionRef, option) {
    let sectionJSON = await Forms.getSectionJSON(sectionID);
    let section = sectionJSON.form;
    let type = sectionJSON.type;

    //TODO: Check if question exists and is multiple choice/dropdown

    for (let i = 0; i < section.fields.length; i++) {
        if (section.fields[i].ref == questionRef) {
            if (!section.fields[i].properties.choices) {
                section.fields[i].properties.choices = [];
            }
            section.fields[i].properties.choices.push(generateNewChoice(option));
        }
    }

    let retSection = await updateSection(sectionID, section, type);
    return retSection;
}

exports.updateOptionJump = async function (sectionID, questionRef, optionRef, jump) {
    let sectionJSON = await Forms.getSectionJSON(sectionID);
    let section = sectionJSON.form;
    let type = sectionJSON.type;

    //TODO: Check questions and jump exist

    if (!section.logic) {
        section.logic = [];
    }

    let updated = false;
    for (let i = 0; i < section.logic.length; i++) {
        if (section.logic[i].ref == questionRef) {
            for (let j = 0; j < section.logic[i].actions.length; j++) {
                if (section.logic[i].actions[j].condition.op == 'is'
                    && section.logic[i].actions[j].condition.vars[1].value == optionRef) {
                    section.logic[i].actions[j].details.to = generateJumpTo(jump)
                    updated = true;
                    break;
                }
            }
            if (!updated) {
                section.logic[i].actions.push(generateIsAction(questionRef, optionRef, jump));
                updated = true;
            }
            break;
        }
    }

    if (!updated) {
        let questionLogic = generateQuestionLogic(questionRef);
        questionLogic.actions.push(generateIsAction(optionRef, jump));
        section.logic.push(questionLogic);
    }

    let retSection = await updateSection(sectionID, section, type);
    return retSection;
}

exports.deleteOption = async function (sectionID, questionRef, choiceRef) {
    let sectionJSON = await Forms.getSectionJSON(sectionID);
    let section = sectionJSON.form;
    let type = sectionJSON.type;

    //TODO: Check question and option exist

    //Remove choice from fields
    for (let i = 0; i < section.fields.length; i++) {
        if (section.fields[i].ref == questionRef) {
            for (let j = 0; j < section.fields[i].properties.choices.length; j++) {
                if (section.fields[i].properties.choices[j].ref == choiceRef) {
                    section.fields[i].properties.choices.splice(j, 1);
                    break;
                }
            }
            break;
        }
    }

    //Remove choice from logic
    if (section.logic) {
        for (let i = 0; i < section.logic.length; i++) {
            if (section.logic[i].ref == questionRef) {
                for (let j = 0; j < section.logic[i].actions.length; j++) {
                    for (let k = 0; k < section.logic[i].actions[j].condition.vars.length; k++) {
                        if (section.logic[i].actions[j].condition.vars[k].type == 'choice' && section.logic[i].actions[j].condition.vars[k].value == choiceRef) {
                            section.logic[i].actions.splice(j, 1);
                            if (section.logic[i].actions.length == 0) {
                                section.logic.splice(i, 1);
                            }
                        }
                    }
                }
            }
        }
    }
    let retSection = await updateSection(sectionID, section, type);
    return retSection;
}

exports.updateRequired = async function (sectionID, questionRef, required) {
    try {
        let sectionJSON = await Forms.getSectionJSON(sectionID);
        let section = sectionJSON.form;
        let type = sectionJSON.type;

        for (let i = 0; i < section.fields.length; i++) {
            if (section.fields[i].ref == questionRef) {
                if (section.fields[i].validations) {
                    section.fields[i].validations.required = required;
                } else {
                    section.fields[i].validations = {
                        required: required
                    }
                }
            }
        }

        let retSection = await updateSection(sectionID, section, type);
        return retSection;
    } catch (err) {
        throw err
    }
}

exports.deleteDescription = async function (sectionID, questionRef) {
    let sectionJSON = await Forms.getSectionJSON(sectionID);
    let section = sectionJSON.form;
    let type = sectionJSON.type;

    for (let i = 0; i < section.fields.length; i++) {
        if (section.fields[i].ref == questionRef) {
            if (section.fields[i].properties.description) {
                delete section.fields[i].properties.description
            }
        }
    }

    let retSection = await updateSection(sectionID, section, type);
    return retSection;
}

exports.updateAllowMultiple = async function (sectionID, questionRef, allowMultiple) {
    let sectionJSON = await Forms.getSectionJSON(sectionID);
    let section = sectionJSON.form;
    let type = sectionJSON.type;

    for (let i = 0; i < section.fields.length; i++) {
        if (section.fields[i].ref == questionRef) {
            if (section.fields[i].properties) {
                section.fields[i].properties.allow_multiple_selection = allowMultiple;
            } else {
                section.fields[i].properties = {
                    allow_multiple_selection: allowMultiple
                }
            }
        }
    }

    let retSection = await updateSection(sectionID, section, type);
    return retSection;
}

exports.updateAllowOther = async function (sectionID, questionRef, allowOther) {
    let sectionJSON = await Forms.getSectionJSON(sectionID);
    let section = sectionJSON.form;
    let type = sectionJSON.type;

    for (let i = 0; i < section.fields.length; i++) {
        if (section.fields[i].ref == questionRef) {
            if (section.fields[i].properties) {
                section.fields[i].properties.allow_other_choice = allowOther;
            } else {
                section.fields[i].properties = {
                    allow_other_choice: allowOther
                }
            }
        }
    }

    let retSection = await updateSection(sectionID, section, type);
    return retSection;
}

exports.updateDescription = async function (sectionID, questionRef, description) {
    let sectionJSON = await Forms.getSectionJSON(sectionID);
    let section = sectionJSON.form;
    let type = sectionJSON.type;

    for (let i = 0; i < section.fields.length; i++) {
        if (section.fields[i].ref == questionRef) {
            if (section.fields[i].properties) {
                section.fields[i].properties.description = description;
            } else {
                section.fields[i].properties = {
                    description: description
                }
            }
        }
    }

    let retSection = await updateSection(sectionID, section, type);
    return retSection;
}
