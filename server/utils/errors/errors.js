class WhistleError extends Error {
    constructor(message, name) {
        super();
        this.name = name;
        this.message = message
    }
}

class InvalidReporterError extends WhistleError {
    constructor(message) {
        super(message, 'InvalidReporterError');
    }
}

class DBInsertionError extends WhistleError {
    constructor(table, err) {
        super(`Error inserting into the ${table} table.\n${err.message}`, 'DBInsertionError');
    }
}

class DBSelectionError extends WhistleError {
    constructor(table, err) {
        super(`Error selecting data from the ${table} table.\n${err.message}`, 'DBSelectionError');
    }
}

exports.WhistleError = WhistleError;
exports.InvalidReporterError = InvalidReporterError;
exports.DBInsertionError = DBInsertionError;
exports.DBSelectionError = DBSelectionError;