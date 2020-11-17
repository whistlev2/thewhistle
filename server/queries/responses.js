var _ = require('underscore');
var pgFormat = require('pg-format');

const db = require('../db.ts');
const { DBSelectionError } = require('../utils/errors/errors');


exports.storeResponse = async function (payload) {
    await storeRawResponse(payload);
}


async function storeRawResponse(payload) {
    //TODO: Now this
    const form_id = payload.form_response.form_id;
    const date = payload.form_response.submitted_at;
    const query = 'INSERT INTO reports(response_json, form_id, date) VALUES($1, $2, $3) RETURNING id'
    const values = [payload, form_id, date];
    db.query(query, values, (error, results) => {
        if (error) {
            //TODO: Handle errors properly
        } else {
            storeQuestionResponses(payload, results.rows[0].id);
        }
    });
}

//TODO: Remove if not needed
function storeQuestionResponses(payload, responseID) {
    const questionResponses = getQuestionResponses(payload, responseID);
    const query = pgFormat('INSERT INTO questionresponses(question_ref, definition, raw_response_id, value) VALUES %L', questionResponses);
    db.query(query, (error, results) => {
        if (error) {
            //TODO: Handle errors properly
        }
    });
}


function getQuestionResponses(payload, responseID) {
    //TODO: Remove if not needed
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

function formatHeaders(headers) {
    let ret = [];
    for (let i = 0; i < headers.length; i++) {
        ret.push({
            text: headers[i],
            value: headers[i]
        })
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

//Used for /reports pages
exports.getReportsFromFormSlug = async function (slug, test) {
    let query = `SELECT reports.id, reports.date, questionresponses.question_ref, questionresponses.value FROM reports JOIN forms ON reports.form = forms.id JOIN questionresponses ON reports.id=questionresponses.report WHERE forms.slug='${slug}' AND reports.test=${test}`;
    let results = {};
    try {
        results = await db.query(query);
    } catch (err) {
        throw new DBSelectionError('reports', query, err);
    }
    let rows = results.rows;
    let headers = [];
    let items = {};
    for (let i = 0; i < rows.length; i++) {
        if (!headers.includes(rows[i].question_ref)) {
            headers.push(rows[i].question_ref);
        }

        if (!items.hasOwnProperty(rows[i].id)) {
            items[rows[i].id] = {
                url: `/report/${rows[i].id}`,
                date: rows[i].date
            };
        }
        items[rows[i].id][rows[i].question_ref] = rows[i].value;
    }
    let ret = {
        headers: formatHeaders(headers),
        items: formatItems(items)
    };
    return ret;
}

async function getFormResponses(formId) {
    //TODO: Edit this or delete if redundant
    let results = await db.query(`SELECT definition, value, raw_response_id FROM reports JOIN questionresponses ON reports.id = questionresponses.raw_response_id WHERE form_id='${formId}'`)
    const formattedResponses = formatResponses(results.rows);
    return formattedResponses;
}

//TODO: Remove if not needed
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

function formatItems(items) {
    //TODO: Delete one of these similar functions
    let ret = [];
    for (let [_, value] of Object.entries(items)) {
        ret.push(value);
    }

    return ret;
}



function getVal(answer) {
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

//TODO: Remove if not needed
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