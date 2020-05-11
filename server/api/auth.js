const express = require('express');
const passport = require('passport')

const auth = require('../queries/auth.js');

const router = express.Router()


router.post('/register', (req, res) => {
    /* const {
        email,
        password,
        organisation_id
    } = req.body */
    const email = 'lmcs2@cam.ac.uk';
    const password = 'test123';
    const organisation_id = 1;
    if (!email || !password) {
        return res.status(400).json({
            message: 'Email and password are required'
        })
    }
    auth.createNewUser(email, password, organisation_id)
    //TODO: Add response

})

router.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }), (req, res) => {
    console.log(req.user);
    req.user.password = undefined
    //TODO: Find out what happens when user JSON is returned - store stuff in cookies?
    res.json(req.user)
})

router.post('/logout', (req, res) => {
    req.logout()
    res.json({
        ok: true
    })
})

router.patch('/', (req, res) => {
    if (!req.user || !req.user.id) return res.sendStatus(401)
    auth.updatePassword(req.user.id, req.body.currentPassword, req.body.newPassword)
})

module.exports = router