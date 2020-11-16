const db = require('../db.ts');
const { DBInsertionError } = require('../utils/errors/DBInsertionError.js');

exports.insertError = async function (stack, url, body) {
    try {
        const query = `INSERT INTO errors(time, stack, url, body) VALUES(to_timestamp(${Date.now()} / 1000.0), $1, $2, $3) RETURNING id`;
        const values = [stack, url, body];
        const results = await db.query(query, values);
        const errorID = results.rows[0].id;
        return errorID;
    } catch (err) {
        throw new DBInsertionError('errors', err);
    }
}

exports.getErrors = async function() {
    const results = await db.query(`SELECT * FROM errors`)
    return results.rows;
}
