export class ErrorHandeler extends Error {

    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }

}

export const errorHandeler = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error.";

    if (err.name === "CastError") err = new ErrorHandeler(`Invalid${err.path}.`, 400);

    if (err.name === "JsonWebTokenError") err = new ErrorHandeler(`Json Web Token is Invalid, Try again.`, 400);

    if (err.name === "TokenExpireError") err = new ErrorHandeler(`Json Web Token is Expired, Try again.`, 400);

    if (err.code === 11000) err = new ErrorHandeler(`Already ${Object.keys(err.keyValue)} Exist.`, 400);

    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
}

export const catchError = (func) => {
    return (req, res, next) => {
        Promise.resolve(func(req, res, next)).catch(next)
    }
} 