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

exports.updateForm = async function (formID, form) {
    const url = `https://${TYPEFORM_API_BASE_URL}/forms/${formID}`;
    const body = JSON.stringify(form);
    request.put({
        url: url,
        headers: headers,
        body: body
    }, function (error, response) {
        if (error) {
            console.err(error);
        } else {
            return response
        }
    })
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
