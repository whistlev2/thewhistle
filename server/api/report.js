const express = require('express');
const report = require('../queries/report.js')

const router = express.Router()

router.post('/test-typeform-webhook/:section', postTestWebhook);

router.post('/typeform-webhook/:section', postWebhook);

router.get('/:id', getReport);

router.post('/assigned/:id', postAssigned);

router.post('/status/:id', postStatus);

router.post('/location/:id', postLocation);

router.post('/tags/:id', postTags);

router.post('/active/:id', postActive);

router.post('/note/:id', postNote);

async function postTestWebhook(req, res) {
    await report.submitTypeformSection(req.params.section, req.body, true);
    res.status(200);
    res.send();
}

async function postWebhook(req, res) {
    await report.submitTypeformSection(req.params.section, req.body, false);
    res.status(200);
    res.send();
}

function getReport(req, res) {
    try {
        let responses = report.getResponses(req.params.id);
        let formSlug = report.getFormSlug(req.params.id);
        let reporterID = report.getReporterID(req.params.id);
        let metadata = report.getMetadata(req.params.id);
        let notes = report.getNotes(req.params.id);
        let audit = report.getAudit(req.params.id);
        let files = report.getFiles(req.params.id);
        let userOptions = report.getUserOptions(req.params.id);
        let reportOptions = report.getReportOptions(req.params.id);
        Promise.all([ responses, formSlug, reporterID, metadata, notes, audit, files, userOptions, reportOptions ])
            .catch(() => {
                res.status(500).send('Could not get report data');
                //TODO: Handle errors properly
            })
            .then( data => {
                
                const ret = {
                    responses: data[0],
                    formSlug: data[1],
                    reporterID: data[2],
                    metadata: data[3],
                    notes: data[4],
                    audit: data[5],
                    files: data[6],
                    options: {
                        assignedTo: data[7],
                        status: data[8].status,
                        tags: data[8].tags
                    }
                }
                console.log('got stuffs', ret);
                res.json(ret)
            })
    } catch {
        res.status(500).send('Could not get report data');
        //TODO: Handle errors properly
    }
}

async function postAssigned(req, res) {
    const audit = await report.updateAssigned(req.body.report, req.body.user, req.body.assigned);
    res.json({ audit: audit });
}

async function postStatus(req, res) {
    const audit = await report.updateStatus(req.body.report, req.body.user, req.body.status);
    res.json({ audit: audit });
}

async function postLocation(req, res) {
    const audit = await report.updateLocation(req.body.report, req.body.user, req.body.location);
    res.json({ audit: audit });
}

async function postTags(req, res) {
    const audit = await report.updateTags(req.body.report, req.body.user, req.body.tags);
    res.json({ audit: audit });
}

async function postActive(req, res) {
    const audit = await report.updateActive(req.body.report, req.body.user, req.body.active);
    res.json({ audit: audit });
}

async function postNote(req, res) {
    const ret = await report.addNote(req.body.report, req.body.user, req.body.comment);
    res.json({ audit: ret.audit, notes: ret.notes });
}

module.exports = router
