const errors = require('../../queries/errors.js');

async function logError(err, string, req, res) {
    const errorID = await errors.insertError(err.stack, req.originalUrl, req.body);
    console.error(`WHISTLE ERROR ${errorID} - ${err.stack}`);
}

exports.logError = logError;