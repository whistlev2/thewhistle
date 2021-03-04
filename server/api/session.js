const express = require('express');
const jwt = require('jsonwebtoken');

const Session = require('../queries/session.js');
const fs = require('fs');
const router = express.Router()

router.get('/download-pdf', sendSessionPDF);

async function sendSessionPDF(req, res, next) {
    try {
        if (req.cookies.reportSession) {
            const payload = await jwt.verify(req.cookies.reportSession, process.env.JWT_SECRET_KEY);
            if (payload && payload.sessionID) {
                let sessionID = payload.sessionID;
                await Session.generatePDF(sessionID);
                let filePath = `../../temp/session-${sessionID}.pdf`;
                res.status(200);
                res.sendFile('C:\\Users\\Louis\\dev\\thewhistle\\temp\\session-46.pdf');
                //fs.unlinkSync(filePath); //Deletes file
            } else {
                res.status(500);
                res.send('Could not get session information.');
            }
        } else {
            res.status(500);
            res.send('Could not access session cookie.');
        }
    } catch (err) {
        res.status(500);
        res.send('Could not send PDF.');
        next(err);
    }
}

module.exports = router
