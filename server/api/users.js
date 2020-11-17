const express = require('express');

const router = express.Router()

const Users = require('../queries/users.js')
const responseQueries = require('../queries/responses.js')

const usr = {
    id: 1,
    name: "name",
    email: "email"
}

const form = {
    formId: "ASDFG",
    formName: "Test From",
    userAccess: "All",
    editAccess: true

}

// TODO - BIG - integrate user into user API

//TODO: Remove this?
router.get('/', (req, res) => {
    Users.getAllUsers(res)
})

router.get('/:userID', async (req, res, next) => {
    try {
        let users = await Users.getUsers(req.params.userID);
        res.json({ users: users });
    } catch (err) {
        res.status(500);
        res.send('Could not get user');
        next(err);
    }
});

router.post('/create', async (req, res, next) => {
    try {
        //TODO: Validate req.body.currentUserID?
        await Users.createUser(req.body.newUser)
        let users = await Users.getUsers(req.body.currentUserID);
        res.json({ users: users });
    } catch (err) {
        res.status(500);
        res.send('Could not create user');
        next(err)
    }
})

router.get('/organisation/:id/users', async (req, res, next) => {
    try {
        let users = await Users.getOrgUsers(req.params.id);
        res.json(users);
    } catch (err) {
        res.status(500);
        res.send('Could not get users');
        next(err);
    }
})

module.exports = router