const { WhistleError } = require("./WhistleError");

class DBInsertionError extends WhistleError {
    constructor(table, err) {
        super(`Error inserting into the ${table} table.\n${err.message}`, 'DBInsertionError');
    }
}

exports.DBInsertionError = DBInsertionError;