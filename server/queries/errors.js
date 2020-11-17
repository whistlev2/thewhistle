const db = require('../db.ts');
const { DBInsertionError, DBSelectionError } = require('../utils/errors/errors.js');

exports.insertError = async function (stack, url, body) {
    const query = `INSERT INTO errors(time, stack, url, body) VALUES(to_timestamp(${Date.now()} / 1000.0), $1, $2, $3) RETURNING id`;
    const values = [stack, url, body];
    try {
        const results = await db.query(query, values);
        const errorID = results.rows[0].id;
        return errorID;
    } catch (err) {
        throw new DBInsertionError('errors', query, values, err);
    }
}

exports.getErrors = async function() {
    let query = `SELECT * FROM errors`;
    try {
        const results = await db.query(query)
        return results.rows;
    } catch (err) {
        throw new DBSelectionError('errors', query, err);
    }
}
