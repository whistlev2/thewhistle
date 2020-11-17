const express = require('express');
const Users = require('../queries/users.js')
const Organisations = require('../queries/organisations.js')

const router = express.Router()

router.get('/:userID', async (req, res, next) => {
    try {
        let orgs = await Users.getUserOrgs(req.params.userID);
        res.json({ orgs: orgs });
    } catch (err) {
        res.status(500);
        res.send('Could not get user organisations');
        next(err);
    }
})

router.post('/create', async (req, res, next) => {
    try {
        await Organisations.createOrg(req.body.org, req.body.user);
        let orgs = await Users.getUserOrgs(req.body.user);
        res.json({ orgs: orgs });
    } catch (err) {
        res.status(500);
        res.send('Could not create organisation');
        next(err);
    }
})

module.exports = router