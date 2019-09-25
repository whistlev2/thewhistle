const express = require('express');
const responses = require('../queries/responses.js')

const router = express.Router()

router.get('/:id', (req, res) => {
  //TODO - add DB query
  res.json(report())

})

module.exports = router

function report() {
return {
    questions: [{
    ref: 'UlkKrBxbI2m1',
    key: 'How good',
    value: 2
}, {
    ref: 'FnkrDwaGeauK',
    key: 'City',
    value: 'A'
}, {
    ref: 'tXKSSANrdGW0',
    key: 'A choice',
    value: 'A'
}, {
    ref: 'kTUGCk0ROpcd',
    key: 'Tell us',
    value: 'dsadsad'
}],
users: [
    {
        ref: 'user1',
        name: 'Tom',
        access: true
    },
    {
        ref: 'user2',
        name: 'Louis',
        access: false
    }
]};
}
