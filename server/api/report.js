const express = require('express');
const report = require('../queries/report.js')

const router = express.Router()

router.get('/:id', (req, res) => {
    try {
        console.log('GETTING REPORT');
        let responses = report.getResponses(req.params.id);
        let formSlug = report.getFormSlug(req.params.id);
        let reporterID = report.getReporterID(req.params.id);
        let metadata = report.getMetadata(req.params.id);
        let files = report.getFiles(req.params.id);
        let options = report.getOptions(req.params.id);
        //TODO - now - get org and options
        Promise.all([ responses, formSlug, reporterID, metadata, files, options ]).then( data => {
            res.json({
                responses: data[0],
                formSlug: data[1],
                reporterID: data[2],
                metadata: data[3],
                files: data[4],
                options: data[5]
            })
        })
    } catch {
        res.status(500).send('Could not get report data');
        //TODO: Handle errors properly
    }

})

router.post('/assigned/:id', (req, res) => {
    console.log('backend sheeeeit')
    console.log(req.body);
})

module.exports = router
