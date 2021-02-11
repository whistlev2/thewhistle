const db = require('../db.ts');

exports.getForAllReports = async function (sectionID) {
    let query = `SELECT all_reports FROM formsections WHERE id='${sectionID}'`;
    let results = {};

    try {
        results = await db.query(query);
    } catch (err) {
        throw new DBSelectionError('formsections', query, err);
    }

    return results.rows[0].all_reports;
}