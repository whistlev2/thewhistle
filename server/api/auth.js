const Auth = require('../queries/auth');

const express = require('express');
//TODO: Change requires to imports everywhere
const jwt = require('jsonwebtoken');
const router = express.Router()


async function checkCookie(cookie) {
    let validToken = cookie.startsWith('Bearer ');
    if (!validToken) {
        return false;
    }
    const token = cookie.substr(7);
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
        const token = await jwt.sign({ user: user }, process.env.JWT_SECRET_KEY);
        res.status(200);
        res.json({ token: token });
    } catch (err) {
        //TODO: Catch err
    }
})

router.post('/logout', (req, res) => {   
    console.log('LOGLOGOUT') 
    res.clearCookie('auth._token.local');
    res.status(200);
    res.redirect('/login')
})

router.get('/user', async (req, res) => {    
    const tokenCookie = req.cookies['auth._token.local'];
    const validatedUser = await checkCookie(tokenCookie);
    if (!validatedUser) {
        res.status(401).json({ msg: "Unauthorised"})
    } else {
        res.status(200).json({user: validatedUser})
    }
})

module.exports = router
