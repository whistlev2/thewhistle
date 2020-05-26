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
        const slugs = await db.query(`SELECT slug FROM subforms JOIN reports ON reports.form_id=subforms.typeform_id WHERE rawresponse.id=${parseInt(reportID)}`);
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
}

exports.getMetadata = async function (reportID) {
    console.log('got metadata');
    return {
        date: '12/05/2020',
        assignedTo: null,
        status: 'Being processed',
        tags: ['test', 'important'],
        notes: [
            {
                user: 'Louis',
                time: '12:00:01 12/05/2020',
                comment: 'This is a comment'
            },
            {
                user: 'Not Louis',
                time: '12:00:01 13/05/2020',
                comment: 'Louis didn\'t write this'
            }
        ],
        active: true,
        location: 'Cambridge',
        auditTrail: [
            {
                user: 'Louis',
                time: '12:00:01 12/05/2020',
                action: 'made test metadata'
            },
            {
                user: 'Louis',
                time: '12:00:04 12/05/2020',
                action: 'made edit'
            }
        ]
    };

    
}

exports.getFiles = async function (reportID) {
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