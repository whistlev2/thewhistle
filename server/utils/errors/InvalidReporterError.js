const { WhistleError } = require("./WhistleError");

class InvalidReporterError extends WhistleError {
    constructor(message) {
        super(message, 'InvalidReporterError');
    }
}

exports.InvalidReporterError = InvalidReporterError;