const db = require('../db.ts')

exports.createOrg = async function (org, userID) {
    try {
        let query = `INSERT INTO organisations(name, slug, active) VALUES($1, $2, $3) RETURNING id`;
        let values = [org.name, org.slug, true];
        let results = await db.query(query, values);
        const orgID = results.rows[0].id;

        query = `INSERT INTO userorgs("user", organisation, "role") VALUES($1, $2, $3)`;
        values = [userID, orgID, 'admin'];
        await db.query(query, values);
    } catch (err) {
        console.log('Error creating organisation', err);
        //TODO: Handle errors properly
    }
}
