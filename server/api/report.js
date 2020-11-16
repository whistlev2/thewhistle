const express = require('express');
const report = require('../queries/report.js')

const router = express.Router()

router.post('/start/:form', startReport);

router.post('/typeform-webhook/:section', postWebhook);

router.get('/:id', getReport);

router.post('/assigned/:id', postAssigned);

router.post('/status/:id', postStatus);

router.post('/location/:id', postLocation);

router.post('/tags/:id', postTags);

router.post('/active/:id', postActive);

router.post('/note/:id', postNote);

async function startReport(req, res, next) {
    try {
        let reportData = await report.startReport(req.params.form, req.body);
        res.status(200);
        res.json(reportData);
    } catch (err) {
        if (err.name == 'InvalidReporterError') {
            res.status(404);
            res.send(err.message);
        } else {
            console.log(err)
            res.status(500);
            res.send();
            next(err);
        }
    }
}

async function postWebhook(req, res) {
    await report.submitTypeformSection(req.params.section, req.body);
    res.status(200);
    res.send();
}

function getReport(req, res) {
    try {
        let responses = report.getResponses(req.params.id);
        let formSlug = report.getFormSlug(req.params.id);
        let metadata = report.getMetadata(req.params.id);
        let notes = report.getNotes(req.params.id);
        let audit = report.getAudit(req.params.id);
        let files = report.getFiles(req.params.id);
        let userOptions = report.getUserOptions(req.params.id);
        let reportOptions = report.getReportOptions(req.params.id);
        Promise.all([ responses, formSlug, metadata, notes, audit, files, userOptions, reportOptions ])
            .catch(() => {
                res.status(500).send('Could not get report data');
                //TODO: Handle errors properly
            })
            .then( data => {
                const ret = {
                    responses: data[0],
                    formSlug: data[1],
                    metadata: data[2],
                    notes: data[3],
                    audit: data[4],
                    files: data[5],
                    options: {
                        assignedTo: data[6],
                        status: data[7].status,
                        tags: data[7].tags
                    }
                }
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
