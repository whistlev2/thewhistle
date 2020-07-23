const jwt = require('jsonwebtoken');

function requiresVerification(path) {
    if (path == '/login') {
        return false;
    } else if (path == '/api/auth/logout') {
        return false;
    } else if (path == '/api/auth/login') {
        return false;
    } else if (path == '/favicon.ico') {
        return false;
    } else if (path.startsWith('/_nuxt/')) {
        return false;
    } else if (path.startsWith('/vuetify.css.map')) {
        return false;
    } else if (path.startsWith('/__webpack_hmr/')) {
        return false;
    }
    return true;
}

async function verify(req, res, next) {
    //TODO: Make login flow work better
    if (requiresVerification(req.originalUrl)) {
        try {
            const payload = await jwt.verify(req.session.token, process.env.JWT_SECRET_KEY);
            if (!payload.user) {
                res.status(401);
            }
        } catch {
            res.status(401);
        }
    }
    next();
}

module.exports = verify;
