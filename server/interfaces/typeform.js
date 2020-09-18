// Interface to speak to Typeform
// https://developer.typeform.com/

const request = require('request');
const axios = require('axios');
const { TypePredicateKind } = require('typescript');


const TYPEFORM_API_BASE_URL = "api.typeform.com"
const ACCESS_TOKEN = "5o33hz2vjVsNbKCu8T4Zb2cYnNM6kWknvqnsfe5mX4Dn"


// TODO - BIG - integrate TS functionality into JS file

const headers = {
    'Authorization': 'Bearer ' + ACCESS_TOKEN,
    'Accept': 'application/json'
}

const bearer = {
    'auth': {
        'bearer': ACCESS_TOKEN
    }
}

function jsonCallback(error, res, body) {
    res.json(body);
}

exports.createWebhook = async function (typeformID, sectionID, test) {
    try {
        const url = `https://${TYPEFORM_API_BASE_URL}/forms/${typeformID}/webhooks/${typeformID}`;

        const data = {
            url: `https://${BASE_URL}/api/report/${test ? 'test-' : ''}typeform-webhook/${sectionID}`,
            enabled: true
        }
        //TODO: Add secret
        //TODO: Set SSL true
        await axios({
            method: 'put',
            url: url,
            headers: headers,
            data: data
        })

    } catch (err) {
        //TODO: Handle errors properly
        console.log(err);
    }
}

exports.getForm = function (form) {
    const url = `https://${TYPEFORM_API_BASE_URL}/forms/${form}`;
    const response = request.get(url, bearer, jsonCallback);
}

function moveAlwaysJump(questionLogic) {
    for (let j = 0; j < questionLogic.actions.length; j++) {
        if (questionLogic.actions[j].condition.op == 'always') {
            if (j < questionLogic.actions.length - 1) {
                let alwaysAction = questionLogic.actions.splice(j, 1);
                questionLogic.actions.push(alwaysAction[0]);
            }
            break;
        }
    }
    return questionLogic
}

function moveAlwaysJumps(formLogic) {
    //'An action with `always` condition always has to be the last in list of actions.'
    for (let i = 0; i < formLogic.length; i++) {
        formLogic[i] = moveAlwaysJump(formLogic[i]);
    }
    return formLogic;
}

function adaptForm(form) {
    if (form.logic) {
        form.logic = moveAlwaysJumps(form.logic);
    }
    return form;
}

exports.updateForm = async function (formID, form) {
    form = adaptForm(form);
    try {
        const url = `https://${TYPEFORM_API_BASE_URL}/forms/${formID}`;
        const data = JSON.stringify(form);
        await axios({
            method: 'put',
            url: url,
            headers: headers,
            data: data
        }).catch((err) => {
            console.log(`Status: ${err.response.status} ${err.response.data.code}\nDescription: ${err.response.data.description}\n`);
        })
    } catch (err) {
        console.log('Error updating Typeform', err)
    }
    return form;
}

exports.createForm = async function (form) {
    try {
        const url = `https://${TYPEFORM_API_BASE_URL}/forms`;
        let response = await axios({
            method: 'post',
            url: url,
            headers: headers,
            data: form
        })
        let ret = response.data;

        return ret;
    } catch (err) {
        //TODO: Handle errors properly
        console.log(err);
    }
}
