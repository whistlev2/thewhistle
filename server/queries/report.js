const db = require('../db.ts')

exports.getResponses = async function (id) {
    try {
        const responses = await db.query(`SELECT * FROM questionresponses where raw_response_id=${id}`)
        console.log('Got responses')
        return responses.rows;
    } catch (err) {
        throw err;
        //TODO: Handle errors properly
    }
}

exports.getFormSlug = async function (reportID) {
    try {
        console.log('TESTS');
        console.log(typeof reportID);
        console.log(reportID);
        console.log(typeof parseInt(reportID));
        console.log(parseInt(reportID))
        const slugs = await db.query(`SELECT slug FROM subforms JOIN reports ON reports.form_id=subforms.typeform_id WHERE reports.id=${parseInt(reportID)}`);
        console.log('Got slug')
        return slugs.rows[0].slug;
    } catch (err) {
        console.log('CHECK THIS', err);
        //TODO: Handle errors properly
    }
}

exports.getReporterID = async function (reportID) {
    console.log('got reporter')
    return 'REPORTER1';
    //TODO: Implement
}

exports.getMetadata = async function (reportID) {
    console.log('got metadata');
    let metadata = await db.query(`SELECT reports.date, reports.status, reports.tags, reports.active, reports.location, CONCAT(users.first_name, ' ', users.surname) AS assigned_to FROM reports JOIN users ON reports.assigned_to=users.id  WHERE reports.id=${parseInt(reportID)}`);
    metadata = metadata.rows[0];
    metadata.tags = metadata.tags.split(',')
    const date = new Date(metadata.date);
    metadata.date = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    console.log(metadata)
    return metadata;
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

exports.getOptions = async function (reportID) {
    return {
        assignedTo: [
            'Louis',
            'Matt'
        ],
        status: [
            'In progress',
            'Being processed'
        ],
        tags: [
            'important',
            'test',
            'tag2',
            'tag3'
        ]
    }
}