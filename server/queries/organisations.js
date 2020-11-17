const db = require('../db.ts');
const { DBInsertionError } = require('../utils/errors/errors');

exports.createOrg = async function (org, userID) {
    let query = `INSERT INTO organisations(name, slug, active) VALUES($1, $2, $3) RETURNING id`;
    let values = [org.name, org.slug, true];
    let results = {};
    try {
        results = await db.query(query, values);
    } catch (err) {
        throw new DBInsertionError('organisations', query, values, err);
    }
    try {
        const orgID = results.rows[0].id;
        query = `INSERT INTO userorgs("user", organisation, "role") VALUES($1, $2, $3)`;
        values = [userID, orgID, 'admin'];
        await db.query(query, values);
    } catch (err) {
        throw new DBInsertionError('userorgs', query, values, err);
    }
    
}
