import response from '../utils/response.js';
import { ClientError } from '../exceptions/index.js';

const ErrorHandler = (err, req, res, next) => {
    // Handle ClientError and its subclasses (InvariantError, NotFoundError)
    if (err instanceof ClientError) {
        return response(res, err.statusCode, err.message, null);
    }
     // Handle Joi validation errors
     if (err.isJoi) {
        return response(res, 400, err.details[0].message, null);
     }
     // Handle PostgreSQL constraint violations (23502: not null)
     if (err.code === '23502') {
        return response(res, 400, 'Required field cannot be null: ' + (err.detail || err.message), null);
     }
     // Handle repository null check errors
     if (err.statusCode === 400 && err.message === 'Title cannot be null') {
        return response(res, 400, err.message, null);
     }

    const status = err.statusCode || err.status || 500;
    const message = err.message || 'Internal Server Error'; 

    console.error('Unhandled error', err);
    return response(res, status, message, null);
};

export default ErrorHandler;
