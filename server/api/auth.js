const Auth = require('../queries/auth');

const express = require('express');
//TODO: Change requires to imports everywhere
const jwt = require('jsonwebtoken');
const router = express.Router()


router.post('/login', async (req, res) => {
    try {
        console.log('deets', req.body.email, req.body.password);
        const user = await Auth.authenticateUser(req.body.email, req.body.password);
        if (!user) {
            res.status(401)
            res.send('Incorrect email/password')
            return;
        }
        console.log(process.env.JWT_SECRET_KEY);
        const token = await jwt.sign({ user: user }, process.env.JWT_SECRET_KEY);
        console.log(token);
        res.status(200);
        res.send(token);
    } catch (err) {
        //TODO: Catch err
    }
})

router.post('/logout', (req, res) => {    
    
})

router.get('/user', (req, res) => {    
    
})

module.exports = router
