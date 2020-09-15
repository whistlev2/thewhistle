const express = require('express');
const Users = require('../queries/users.js')

const router = express.Router()

router.get('/:userID', async (req, res) => {
    let orgs = await Users.getUserOrgs(req.params.userID);
    res.json({ orgs: orgs });
})

module.exports = router