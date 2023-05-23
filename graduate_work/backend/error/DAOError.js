class DAOError extends Error {
    constructor(message) {
      super();
      this.message = message;
    }

    static notFound(message) {
        return new NotFoundDAOError(message);
    }
}

class NotFoundDAOError extends DAOError {}

module.exports = {  DAOError, NotFoundDAOError  };
