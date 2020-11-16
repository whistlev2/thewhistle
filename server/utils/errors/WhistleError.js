class WhistleError extends Error {
    constructor(message, name) {
        super();
        this.name = name;
        this.message = message
    }
}

exports.WhistleError = WhistleError;