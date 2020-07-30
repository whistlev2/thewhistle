const db = require('../db.ts')
const users = require('./users.js')

exports.getResponses = async function (id) {
    try {
        //TODO: Check ID change still works
        const responses = await db.query(`SELECT * FROM questionresponses where id=${id}`)
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

exports.getReporterID = async function (reportID) {
    return 'REPORTER1';
    //TODO: Implement
}

exports.getMetadata = async function (reportID) {
    try {
        let metadata = await db.query(`SELECT reports.date, reports.status, reports.tags, reports.active, reports.location, users.id AS assigned_to FROM reports JOIN users ON reports.assigned_to=users.id  WHERE reports.id=${parseInt(reportID)}`);
        metadata = metadata.rows[0];
        metadata.tags = metadata.tags.split(',')
        const date = new Date(metadata.date);
        metadata.date = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        metadata.assignedTo = metadata.assigned_to;
        delete metadata.assigned_to;
        return metadata;
    } catch (err) {
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
            let currentTags = reportOptions[i].tags.split(',')
            for(let j = 0; j < currentTags.length; j++) {
                tags.push(currentTags[j]);
            }
        }
        return {
            status: statuses,
            tags: tags
        };
    } catch (err) {
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
        await db.query(`INSERT INTO notes(report, user, time, comment) VALUES (${report}, ${user}, to_timestamp(${Date.now()} / 1000.0), '${comment}')`);
        const audit = {
            report: report,
            user: user,
            action: `Added note ${comment}`
        }
        await addAudit(audit);
        const ret = {
            audit: await exports.getAudit(report),
            notes: await exports.getNotes(report)
        }
        return ret;
    } catch (err) {
    }
}

async function addAudit(audit) {
    try {
        await db.query(`INSERT INTO AUDIT(report, user, time, action) VALUES (${audit.report}, ${audit.user}, to_timestamp(${Date.now()} / 1000.0), '${audit.action}')`);
    } catch (err) {
    }
}