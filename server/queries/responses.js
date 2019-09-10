var _ = require('underscore');

exports.getResponse = function () {

    return formatResponse(report())
}

function getVal(res, id) {
    var answer = _.filter(res.answers, function (answer) {
        return answer.field.id == id
    });
    answer = answer[0]
    switch (answer.type) {
        case 'number':
            return answer.number;
            break;
        case 'choice':
            return answer.choice.label;
            break;
        case 'text':
            return answer.text;
            break;
        default:
            "--"
    }
}

function formatResponse(responses) {
    var headers = []
    var answers = []
    _.each(responses[0].definition.fields, function (field) {
        headers.push({
            text: field.title,
            value: field.id
        })
    });

    _.each(responses, function (response) {
        var res = {};
        _.each(headers, function (col) {
            res[col.value] = getVal(response, col.value);
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