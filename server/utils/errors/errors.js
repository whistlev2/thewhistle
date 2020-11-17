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
    constructor(table, query, values, err) {
        //TODO: Refactor all inserts so they don't use values
        super(`Error inserting into the ${table} table.\nExecuting query '${query}' with values '${values}'\n${err.message}`, 'DBInsertionError');
    }
}

class DBSelectionError extends WhistleError {
    constructor(table, query, err) {
        super(`Error selecting data from the ${table} table.\nExecuting query '${query}'\n${err.message}`, 'DBSelectionError');
    }
}

class DBUpdateError extends WhistleError {
    constructor(table, query, err) {
        super(`Error updating data in the ${table} table.\nExecuting query '${query}'\n${err.message}`, 'DBSelectionError');
    }
}

class UserAuthenticationError extends WhistleError {
    constructor(err) {
        super(`Error authenticating user.\n${err.message}`, 'UserAuthenticationError');
    }
}

class TypeformUpdateError extends WhistleError {
    constructor(form, err) {
        super(`Error updating form. Form JSON:\n${JSON.stringify(form)}\n${err.message}`)
    }
}

class TypeformWebhookError extends WhistleError {
    constructor(url, err) {
        super(`Error creating webhook at URL ${url}\n${err.message}`);
    }
}

exports.InvalidReporterError = InvalidReporterError;
exports.DBInsertionError = DBInsertionError;
exports.DBSelectionError = DBSelectionError;
exports.DBUpdateError = DBUpdateError;
exports.UserAuthenticationError = UserAuthenticationError;
exports.TypeformUpdateError = TypeformUpdateError;
exports.TypeformWebhookError = TypeformWebhookError;
