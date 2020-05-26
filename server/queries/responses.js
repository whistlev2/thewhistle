var _ = require('underscore');
var pgFormat = require('pg-format');

const db = require('../db.ts')


exports.storeResponse = function (payload) {
    storeRawResponse(payload);
}

function storeRawResponse(payload) {
    const form_id = payload.form_response.form_id
    const query = 'INSERT INTO reports(response_json, form_id) VALUES($1, $2) RETURNING id'
    const values = [payload, form_id];
    db.query(query, values, (error, results) => {
        if (error) {
            console.error(error);
        } else {
            storeQuestionResponses(payload, results.rows[0].id);
        }
    });
}

function storeQuestionResponses(payload, responseID) {
    const questionResponses = getQuestionResponses(payload, responseID);
    const query = pgFormat('INSERT INTO questionresponses(question_ref, definition, raw_response_id, value) VALUES %L', questionResponses);
    db.query(query, (error, results) => {
        if (error) {
            console.error(error);
        }
    });
}


function getQuestionResponses(payload, responseID) {
    const definitions = payload.form_response.definition.fields;
    const answers = payload.form_response.answers;
    let questionRef = '';
    let questionResponses = [];
    const formattedAnswers = formatAnswers(answers)
    for (let i = 0; i < definitions.length; i++) {
        questionResponses.push([
            definitions[i].ref,
            definitions[i],
            responseID,
            {
                value: formattedAnswers[definitions[i].ref]
            }
        ]);
    }
    return questionResponses;
}

function formatAnswers(answers) {
    let ret = {};
    for (let i = 0; i < answers.length; i++) {
        ret[answers[i].field.ref] = getVal(answers[i]);
    }
    return ret;
}

exports.getFormResponsesFromSlug = function (res, slug) {
    db.query(`SELECT typeform_id FROM subforms WHERE slug='${slug}'`, (error, results) => {
        getFormResponses(res, results.rows[0].typeform_id);
    })
}

function getFormResponses(res, formId) {
    db.query(`SELECT definition, value, raw_response_id FROM reports JOIN questionresponses ON reports.id = questionresponses.raw_response_id WHERE form_id='${formId}'`, (error, results) => {
        const formattedResponses = formatResponses(results.rows);
        res.json(formattedResponses);
    })
}

function formatResponses(responses) {
    let headers = {};
    let items = {};
    for (let i = 0; i < responses.length; i++) {
        if (!headers[responses[i].definition.ref]) {
            headers[responses[i].definition.ref] = responses[i].definition.title;
        }
        if (!items[`${responses[i].raw_response_id}`]) {
            items[`${responses[i].raw_response_id}`] = {};
        }
        //TODO - NTH - If val is an array, parse it to a nice looking string for the table
        items[`${responses[i].raw_response_id}`][responses[i].definition.ref] = responses[i].value.value;
        items[`${responses[i].raw_response_id}`].url = `/report/${responses[i].raw_response_id}`
    }

    return {
        headers: formatHeaders(headers),
        items: formatItems(items)
    };
}

function formatHeaders(headers) {
    let ret = [];
    for (let [value, text] of Object.entries(headers)) {
        ret.push({
            value: value,
            text: text
        });
    }
    return ret;
}

function formatItems(items) {
    let ret = [];
    for (let [_, value] of Object.entries(items)) {
        ret.push(value);
    }

    return ret;
}



function getVal(answer) {
    //console.log(answer);
    switch (answer.type) {
        case 'boolean':
            return answer.boolean ? 'Yes' : 'No';
            break;
        case 'number':
            return answer.number;
            break;
        case 'choice':
            if (answer.choice.hasOwnProperty('other')) {
                return answer.choice.other;
            } else {
                return answer.choice.label;
            }
            break;
        case 'choices':
            return answer.choices.labels;
            break;
        case 'date':
            return answer.date;
            break;
        case 'text':
            return answer.text;
            break;
        default:
            "--"
    }
}

function formatResponse(response) {
    var definition = response.response_json.form_response.definition
    var responseAnswers = response.response_json.form_response.answers
    var headers = []
    var answers = []
    _.each(definition.fields, function (field) {
        headers.push({
            text: field.title,
            value: field.id
        })
    });

    _.each(responseAnswers, function (ans) {
        var res = {};
        _.each(headers, function (col) {
            res[col.value] = getVal(ans);
        });
        res.url = '/report/' + response.token;
        answers.push(res);
    })

    headers.push({
        text: '',
        value: 'action',
        sortable: false
    });

    return {
        headers: headers,
        items: answers
    }
}