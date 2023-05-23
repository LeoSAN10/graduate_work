
class ResponseCreator {
    response(data) {
        return {
            resultCode: 1,
            data
        }
    }
    error(message) {
        return {
            resultCode: 0,
            message
        }
    }
}

module.exports = new ResponseCreator();