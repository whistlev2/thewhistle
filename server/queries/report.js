const db = require('../db.ts');
const InvalidReporterError = require('../utils/errors/InvalidReporterError').err;
const users = require('./users.js');

async function getFormFromSection(sectionID) {
    const results = await db.query(`SELECT form FROM formsections where id=${sectionID}`)
    const formID = results.rows[0].form;
    return formID;
}

async function insertReport(formID, test, reporter) {
    const query = `INSERT INTO reports(form, active, test, date, reporter) VALUES($1, $2, $3, to_timestamp(${Date.now()} / 1000.0), $4) RETURNING id`;
    const values = [formID, true, test, reporter];
    const results = await db.query(query, values);
    const reportID = results.rows[0].id;

    return reportID;
}

function getValueFromAnswer(answer) {
    switch (answer.type) {
        case 'short_text':
        case 'long_text':
            return answer.text;
        case 'choices':
            return answer.choices.labels.join();
        case 'choice':
            return answer.choice.label;
        default:
            return answer[answer.type];
    }
}

function getDefinitionFromID(definitions, fieldID) {
    for (let i = 0; i < definitions.length; i++) {
        if (definitions[i].id == fieldID) {
            return definitions[i];
        }
    }
    //TODO: Handle errors
    return {};
}

async function insertQuestionResponse(reportID, sectionID, ref, definition, value) {
    const query = 'INSERT INTO questionresponses(report, section, question_ref, definition, value) VALUES($1, $2, $3, $4, $5)';
    const values = [reportID, sectionID, ref, JSON.stringify(definition), JSON.stringify(value)];
    console.log('here')
    await db.query(query, values);
    console.log('there')
}

async function validateReporter(formID, reporter) {
    const results = await db.query(`SELECT id FROM reports WHERE reporter='${reporter}' AND form=${formID}`);
    return results.rows.length > 0;
}

async function generateNewReporter() {
    //Note potential (but unlikely) race condition here.
    let reporter = '';
    let results = {};
    let foundNewReporter = false;
    while (!foundNewReporter) {
        reporter = Math.floor(100000 + Math.random() * 900000).toString(10);
        results = await db.query(`SELECT id FROM reports WHERE reporter='${reporter}'`);
        foundNewReporter = results.rows.length == 0;
    }
    return reporter;
}

async function insertUsedBefore(reportID, usedBefore) {
    const definition = {
        title: 'Used report form before?',
        type: 'boolean',
        ref: 'Used before?'
    }
    const query = 'INSERT INTO questionresponses(report, question_ref, value, definition) VALUES($1, $2, $3, $4)';
    const values = [reportID, 'Used before?', usedBefore ? 'Yes' : 'No', definition];
    await db.query(query, values);
}

exports.startReport = async function (formID, body) {
    let test = body.test

    let reporter = body.reporter;
    if (reporter) {
        let validReporter = await validateReporter(formID, reporter);
        if (!validReporter) {
            throw new InvalidReporterError(`${reporter} is not a valid reporter number for this form.`);
        }
    } else {
        reporter = await generateNewReporter();
    }

    let reportID = await insertReport(formID, test, reporter);

    await insertUsedBefore(reportID, body.usedBefore);

    return {
        id: reportID,
        reporter: reporter
    };
}

exports.submitTypeformSection = async function (sectionID, payload) {
    try {
        let hiddenFields = payload.form_response.hidden;
        let reportID = hiddenFields.report;
        const definitions = payload.form_response.definition.fields;
        const answers = payload.form_response.answers;
        let promises = [];
        let value = {};
        let ref = '';
        let definition = {};
        for (let i = 0; i < answers.length; i++) {
            value = getValueFromAnswer(answers[i]);
            definition = getDefinitionFromID(definitions, answers[i].field.id);
            ref = definition.ref;
            promises.push(insertQuestionResponse(reportID, sectionID, ref, definition, value))
        }
        Promise.all(promises);
    } catch (err) {
        console.log('Webhook error', err)
    }
}

exports.getResponses = async function (reportID) {
    try {
        //TODO: Check ID change still works
        const responses = await db.query(`SELECT * FROM questionresponses where report=${reportID}`)
        return responses.rows;
    } catch (err) {
        throw err;
        //TODO: Handle errors properly
    }
}

exports.getFormSlug = async function (reportID) {
    try {
        const slugs = await db.query(`SELECT slug FROM forms JOIN reports ON reports.form=forms.id WHERE reports.id=${parseInt(reportID)}`)
        return slugs.rows[0].slug;
    } catch (err) {
        //TODO: Handle errors properly
    }
}

exports.getMetadata = async function (reportID) {
    try {
        let metadata = await db.query(`SELECT reports.date, reports.status, reports.tags, reports.active, reports.location, reports.reporter, assigned_to FROM reports WHERE reports.id=${parseInt(reportID)}`);
        if (metadata.rows.length > 0) {
            metadata = metadata.rows[0];
            if (metadata.tags) {
                metadata.tags = metadata.tags.split(',')
            }

            if (metadata.date) {
                const date = new Date(metadata.date);
                metadata.date = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            } else {
                metadata.date = ''
            }

            metadata.assignedTo = metadata.assigned_to;
            if (metadata.assigned_to) {
                delete metadata.assigned_to;
            }

            return metadata;
        } else {
            return {
                date: '',
                status: '',
                tags: [],
                assignedTo: '',
                active: '',
                location: '',
                reporter: ''
            }
        }
    } catch (err) {
        console.log(err)
        //TODO: Handle errors properly
    }
}

exports.getNotes = async function (reportID) {
    try {
        let notes = await db.query(`SELECT notes.time, notes.comment, CONCAT(users.first_name, ' ', users.surname) AS user FROM notes JOIN users ON notes.user=users.id  WHERE notes.report=${parseInt(reportID)}`);
        notes = notes.rows;
        for (let i = 0; i < notes.length; i++) {
            let date = new Date(notes[i].time);
            notes[i].time = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        }
        return notes;
    } catch (err) {
        console.log('err')
        //TODO: Handle errors properly
    }
}

exports.getAudit = async function (reportID) {
    try {
        let audit = await db.query(`SELECT audit.time, audit.action, CONCAT(users.first_name, ' ', users.surname) AS user FROM audit JOIN users ON audit.user=users.id  WHERE audit.report=${parseInt(reportID)}`);
        audit = audit.rows;
        for (let i = 0; i < audit.length; i++) {
            let date = new Date(audit[i].time);
            audit[i].time = date.toLocaleString('en-GB', { timeZone: 'UTC' });
        }
        return audit;
    } catch (err) {
        console.log(err)
        //TODO: Handle errors properly
    }
}

exports.getFiles = async function (reportID) {
    //TODO: Implement
    return [
        {
            name: 'document1',
            type: 'pdf',
            url: 'www.downloadfile.com'
        },
        {
            name: 'Evidence Video',
            type: 'video',
            url: 'www.video.com'
        }
    ]
}



exports.getUserOptions = async function (reportID) {
    try {
        let userOptions = await db.query(`SELECT users.id, CONCAT(users.first_name, ' ', users.surname) AS name FROM users JOIN userorgs ON users.id=userorgs.user JOIN forms ON forms.organisation=userorgs.organisation JOIN reports ON reports.form=forms.id WHERE reports.id=${parseInt(reportID)}`);
        userOptions = userOptions.rows;
        return userOptions;
    } catch (err) {
        console.log(err)
        //TODO: Handle errors properly
    }
}

exports.getReportOptions = async function (reportID) {
    try {
        let reportOptions = await db.query(`SELECT allreports.status, allreports.tags FROM reports allreports JOIN reports onereport ON onereport.form=allreports.form WHERE onereport.id=${parseInt(reportID)}`);
        reportOptions = reportOptions.rows;
        const statuses = [];
        const tags = [];
        for (let i = 0; i < reportOptions.length; i++) {
            if (reportOptions[i].status) {
                statuses.push(reportOptions[i].status)
            }
            if (reportOptions[i].tags) {
                let currentTags = reportOptions[i].tags.split(',')
                for(let j = 0; j < currentTags.length; j++) {
                    tags.push(currentTags[j]);
                }
            }
        }
        return {
            status: statuses,
            tags: tags
        };
    } catch (err) {
        console.log(err)
        //TODO: Handle errors properly
    }
}

exports.updateAssigned = async function (report, user, assignedID) {
    await db.query(`UPDATE reports SET assigned_to='${assignedID}' WHERE id='${report}'`);
    const assigned = await users.getUser(assignedID);
    const audit = {
        report: report,
        user: user,
        action: `Assigned report to ${assigned.first_name} ${assigned.surname}`
    }
    await addAudit(audit);
    const ret = exports.getAudit(report);
    return ret;
}

exports.updateStatus = async function (report, user, status) {
    try {
        await db.query(`UPDATE reports SET status='${status}' WHERE id='${report}'`);
        const audit = {
            report: report,
            user: user,
            action: `Set status to ${status}`
        }
        await addAudit(audit);
        const ret = exports.getAudit(report);
        return ret;
    } catch (err) {
    }
}

exports.updateLocation = async function (report, user, location) {
    try {
        await db.query(`UPDATE reports SET location='${location}' WHERE id='${report}'`);
        const audit = {
            report: report,
            user: user,
            action: `Set location to ${location}`
        }
        await addAudit(audit);
        const ret = exports.getAudit(report);
        return ret;
    } catch (err) {
    }
}

exports.updateTags = async function (report, user, tags) {
    try {
        await db.query(`UPDATE reports SET tags='${tags}' WHERE id='${report}'`);
        const audit = {
            report: report,
            user: user,
            action: `Set tags to ${tags.join(', ')}`
        }
        await addAudit(audit);
        const ret = exports.getAudit(report);
        return ret;
    } catch (err) {
    }
}

exports.updateActive = async function (report, user, active) {
    try {
        await db.query(`UPDATE reports SET active=${active} WHERE id='${report}'`);
        const audit = {
            report: report,
            user: user,
            action: active ? 'Set report to active' : 'Archived report'
        }
        await addAudit(audit);
        const ret = exports.getAudit(report);
        return ret;
    } catch (err) {
    }
}

exports.addNote = async function (report, user, comment) {
    try {
        await db.query(`INSERT INTO notes(report, "user", time, comment) VALUES (${report}, ${user}, to_timestamp(${Date.now()} / 1000.0), '${comment}')`);
        const audit = {
            report: report,
            user: user,
            action: `Added note ${comment}`
        }
        //await addAudit(audit);
        let auditTrail = await exports.getAudit(report);
        let notes = await exports.getNotes(report);
        const ret = {
            audit: auditTrail,
            notes: notes
        }
        return ret;
    } catch (err) {
        console.log(err)
    }
}

async function addAudit(audit) {
    try {
        await db.query(`INSERT INTO audit(report, user, time, action) VALUES (${audit.report}, ${audit.user}, to_timestamp(${Date.now()} / 1000.0), '${audit.action}')`);
    } catch (err) {
    }
}