const express = require('express');
const Users = require('../queries/users.js')
const Organisations = require('../queries/organisations.js')

const router = express.Router()

router.get('/:userID', async (req, res) => {
    let orgs = await Users.getUserOrgs(req.params.userID);
    res.json({ orgs: orgs });
})

router.post('/create', async (req, res) => {
    await Organisations.createOrg(req.body.org, req.body.user);
    let orgs = await Users.getUserOrgs(req.body.user);
    res.json({ orgs: orgs });
})

module.exports = router