import tokenManager from "../security/token-manager.js";
import response  from "../utils/response.js";

async function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
        try {
            const token = authHeader.substring(7).trim();
            const user = await tokenManager.verify(token, process.env.ACCESS_TOKEN_KEY);
            req.user = user;
            return next();
        } catch(error) {
            return response(res, 401, error.message, null);
        }
    }
    return response(res, 401, 'Access token wajib disertakan', null);
};

export default authenticateToken;