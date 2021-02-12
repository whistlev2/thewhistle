const db = require('../db.ts');
const { InvalidVerificationCodeError, InvalidReporterError } = require('../utils/errors/errors');
const FormSections = require('./formsections.js');
const Report = require('./report.js');

async function insertReportSessionRelation(reportID, sessionID) {
    const query = 'INSERT INTO reportsessionrelation(report, session) VALUES($1, $2)';
    const values = [reportID, sessionID];
    try {
        await db.query(query, values);
    } catch (err) {
        throw new DBInsertionError('reportsessionrelation', query, values, err);
    }
}

async function updateQueue(sessionID, queue, currentSection) {
    const query = `UPDATE reportsessions SET queue='${JSON.stringify({ value: queue, currentSection: currentSection })}' WHERE id='${sessionID}'`;
    try {
        await db.query(query);
    } catch (err) {
        throw new DBUpdateError('reportsessions', query, err);
    }
}



async function addReporter(sectionID, sessionID, reporterNumber, usedBefore) {
    let reports = await this.getReportsToUpdate(sectionID, sessionID);
    
    let promises = [];
    for (let i = 0; i < reports.length; i++) {
        promises.push(updateReporter(reports[i], reporterNumber));
        promises.push(Report.insertQuestionResponse(reports[i], sectionID, 'usedBefore', { ref: 'usedBefore', title: 'Used before?', type: 'custom' }, usedBefore));
    }

    Promise.all(promises);
}

async function validateReporter(formID, reporter) {
    let query = `SELECT id FROM reports WHERE reporter='${reporter}' AND form=${formID}`;
    try {
        const results = await db.query(query);
        return results.rows.length > 0;
    } catch (err) {
        throw new DBSelectionError('reports', query, err);
    }
}

async function generateNewReporter() {
    //Note potential (but unlikely) race condition here.
    let reporter = '';
    let results = {};
    let foundNewReporter = false;
    let query = '';
    while (!foundNewReporter) {
        reporter = Math.floor(100000 + Math.random() * 900000).toString(10);
        query = `SELECT id FROM reports WHERE reporter='${reporter}'`;
        try {
            results = await db.query(query);
        } catch (err) {
            throw new DBSelectionError('reports', query, err)
        }
        foundNewReporter = results.rows.length == 0;
    }
    return reporter;
}

function generateEmailVerificationBody(verificationCode, reporterNumber) {
    return `Hello!\n\nThank you so much for your interest in reporting an incident of racism to the End Everyday Racism project.\n\nYour verification code is ${verificationCode}. This code helps us verify that you are a member of the Cambridge community. Since we do not store your email address, you will need to generate a new authentication code every time you submit a report.\n\nYour reporter number is ${reporterNumber}. You can use this number to report multiple incidents. That lets us know that a set of reports all come from the same source.\n\nThank you again for participating in this project.\n\nEnd Everyday Racism Team`;
}

exports.getReportsToUpdate = async function (sectionID, sessionID) {
    let allReports = await FormSections.getForAllReports(sectionID);
    let reports = allReports ? await this.getReports() : [ await this.getCurrentReport(sessionID) ];
    return reports;
}

exports.startSession = async function (reportID, sectionQueue) {
    const query = 'INSERT INTO reportsessions(current_report, queue) VALUES($1, $2) RETURNING id'
    const values = [reportID, { value: sectionQueue }];
    let results = {};
    try {
        results = await db.query(query, values);
    } catch (err) {
        throw new DBInsertionError('reportsessions', query, values, err);
    }
    const sessionID = results.rows[0].id;

    await insertReportSessionRelation(reportID, sessionID);

    return sessionID;
}

exports.shiftNextSection = async function (sessionID) {
    let query = `SELECT queue FROM reportsessions WHERE id='${sessionID}'`;
    let results = {};

    try {
        results = await db.query(query);
    } catch (err) {
        throw new DBSelectionError('reportsessions', query, err);
    }

    let queue = results.rows[0].queue.value;

    let nextSection = queue.shift();

    await updateQueue(sessionID, queue, nextSection);

    return nextSection;
}

exports.submitReporterSection = async function (sectionID, sessionID, body) {
    let reporter = body.reporter;
    if (reporter) {
        let validReporter = await validateReporter(formID, reporter);
        if (!validReporter) {
            throw new InvalidReporterError(`${reporter} is not a valid reporter number for this form.`);
        }
    } else {
        reporter = await generateNewReporter();
    }

    await addReporter(sectionID, sessionID, reporter, body.usedBefore);

    let nextSection = await this.shiftNextSection(sessionID);

    return nextSection;
}

exports.sendEmailVerification = async function (sessionID, email) {
    //TODO: Validate email back-end
    let verificationCode = Math.random().toString(36).substring(1, 7);
    let emailTitle = 'End Everyday Racism Email Verification'
    let reporterNumber = getReporterNumberFromSession(sessionID); //TODO: Implement this
    let emailBody = generateEmailVerificationBody(verificationCode, reporterNumber);
    Email.send(email, emailTitle, emailBody); //TODO: Implement this (note: it's async)
    updateVerificationCode(sessionID, verificationCode) //TODO: Implement this
}

exports.submitEmailVerificationSection = async function (sessionID, testVerificationCode) {
    let query = `SELECT verification_code FROM reportsessions WHERE id='${sessionID}'`;
    let results = {};

    try {
        results = await db.query(query);
    } catch (err) {
        throw new DBSelectionError('reportsessions', query, err);
    }

    let verificationCode = results.rows[0].verification_code;

    if (testVerificationCode.toLowerCase() == verificationCode) {
        let nextSection = await this.shiftNextSection(sessionID);
        return nextSection;
    } else {
        throw new InvalidVerificationCodeError();
    }
}

exports.getReports = async function (sessionID) {
    let query = `SELECT report FROM reportsessionrelation WHERE session='${sessionID}'`;
    let results = {};

    try {
        results = await db.query(query);
    } catch (err) {
        throw new DBSelectionError('reportsessions', query, err);
    }

    let reports = results.rows.map((item) => item.report);

    return reports;
}
