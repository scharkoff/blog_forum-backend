export const createResponse = (res, statusCode, message, status, details = null) => {
    return res.status(statusCode).json({
        message,
        status,
        details
    })
}