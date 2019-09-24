var _ = require('underscore');
var pgFormat = require('pg-format');

const Pool = require('pg').Pool;
const db = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'thewhistle',
    password: 'postgres',
    port: 5432
});


exports.storeResponse = function(payload) {
  storeRawResponse(payload);
}

function storeRawResponse(payload) {
  const form_id = payload.form_response.form_id
  const query = 'INSERT INTO rawresponse(response_json, form_id) VALUES($1, $2) RETURNING id'
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
      { value: formattedAnswers[definitions[i].ref] }
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
    db.query(`SELECT definition, value, raw_response_id FROM rawresponse JOIN questionresponses ON rawresponse.id = questionresponses.raw_response_id WHERE form_id='${formId}'`, (error, results) => {
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
    //TODO: If val is an array, parse it to a nice looking string for the table
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
    ret.push({ value: value, text: text });
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

function report() {
    return [{
        "form_id": "Bks8di",
        "token": "1cdb10914e1428399fca09d6976e2b29",
        "landed_at": "2019-06-12T12:56:26Z",
        "submitted_at": "2019-06-12T12:56:33Z",
        "definition": {
            "id": "Bks8di",
            "title": "ghjkl",
            "fields": [{
                    "id": "UlkKrBxbI2m1",
                    "title": "How good",
                    "type": "opinion_scale",
                    "ref": "d4b76659-b1c5-4184-b92f-00edccbdad69",
                    "properties": {

                    }
                },
                {
                    "id": "FnkrDwaGeauK",
                    "title": "City",
                    "type": "multiple_choice",
                    "ref": "3447acbd-b470-4889-99ca-61636ac7901f",
                    "properties": {

                    },
                    "choices": [{
                            "id": "UNWxktK1yZgR",
                            "label": "A"
                        },
                        {
                            "id": "bBW8e1vazOwd",
                            "label": "B"
                        },
                        {
                            "id": "wZr53o7oLwwD",
                            "label": "C"
                        },
                        {
                            "id": "ROpK3h0KJNDL",
                            "label": "D"
                        }
                    ]
                },
                {
                    "id": "tXKSSANrdGW0",
                    "title": "A choice",
                    "type": "multiple_choice",
                    "ref": "be8e3452-e4ca-4142-84f5-4aa8f280f378",
                    "properties": {

                    },
                    "choices": [{
                            "id": "jWutiJKgmX6m",
                            "label": "A"
                        },
                        {
                            "id": "JhbG7XW9cQAW",
                            "label": "B"
                        },
                        {
                            "id": "flWvr0GQnY27",
                            "label": "C"
                        }
                    ]
                },
                {
                    "id": "kTUGCk0ROpcd",
                    "title": "Tell us",
                    "type": "short_text",
                    "ref": "9979e48b-e482-4542-b368-0a4fe328d47d",
                    "properties": {

                    }
                }
            ]
        },
        "answers": [{
                "type": "number",
                "number": 2,
                "field": {
                    "id": "UlkKrBxbI2m1",
                    "type": "opinion_scale",
                    "ref": "d4b76659-b1c5-4184-b92f-00edccbdad69"
                }
            },
            {
                "type": "choice",
                "choice": {
                    "label": "A"
                },
                "field": {
                    "id": "FnkrDwaGeauK",
                    "type": "multiple_choice",
                    "ref": "3447acbd-b470-4889-99ca-61636ac7901f"
                }
            },
            {
                "type": "choice",
                "choice": {
                    "label": "A"
                },
                "field": {
                    "id": "tXKSSANrdGW0",
                    "type": "multiple_choice",
                    "ref": "be8e3452-e4ca-4142-84f5-4aa8f280f378"
                }
            },
            {
                "type": "text",
                "text": "dsadsad",
                "field": {
                    "id": "kTUGCk0ROpcd",
                    "type": "short_text",
                    "ref": "9979e48b-e482-4542-b368-0a4fe328d47d"
                }
            }
        ]
    }]
}
