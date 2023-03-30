export function notFoundException(message) {
    return {
        message,
        statusCode: 404
    }
}