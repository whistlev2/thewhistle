const Auth = require('../queries/auth');

const express = require('express');
//TODO: Change requires to imports everywhere
const jwt = require('jsonwebtoken');
const router = express.Router()


async function checkToken(token) {
    try {
        const payload = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        return payload.user;
    } catch {
        return false;
    }
    
}

router.post('/login', async (req, res) => {
    try {
        const user = await Auth.authenticateUser(req.body.email, req.body.password);
        if (!user) {
            res.status(401)
            res.send('Incorrect email/password')
            return;
        }
        //Logout after 1 week
        const token = await jwt.sign({ user: user }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
        //Store token here
        res.cookie('authtoken', token);
        res.json(user);
    } catch (err) {
        res.status(401)
        res.send('Could not authorise you, please try again.')
    }
})

router.post('/logout', (req, res) => {   
    delete req.session.token;
    res.redirect('/')
})

router.get('/user', async (req, res) => {
    try {
        const tokenCookie = req.cookies['auth._token.local'];
        let validToken = tokenCookie.startsWith('Bearer ');
        if (!validToken) {
            return false;
        }
        const token = tokenCookie.substr(7);
        const validatedUser = await checkToken(token);
        if (validatedUser) {
            validatedUser.token = token;
            res.status(200).json({user: validatedUser})
        } else {
            res.status(401).json({ msg: "Unauthorised"})
        }
    } catch {
        res.status(401).json({ msg: "Not authorised"})
    }
})

module.exports = router
