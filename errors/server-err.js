const { ERROR_CODE_INTERNAL } = require('../constants');

class ServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_INTERNAL;
  }
}

module.exports = ServerError;
